from datetime import datetime
from datetime import timedelta
import calendar
import json
import os
import urllib

from flask import Flask
from flask import make_response
from flask import redirect
from flask import request
from flask import session
from flask import url_for
from flask_stache import render_template
from jose import jws
from jose import jwt
from requests.auth import HTTPBasicAuth
import jose
import requests

cwd = os.path.dirname(os.path.realpath(__file__))
app = Flask(__name__,
            static_folder='dist',
            static_url_path='/assets',
            template_folder='{}/tools/templates'.format(cwd))
app.secret_key = 'SECRET KEY THAT YOU **MUST** CHANGE ON PRODUCTION SYSTEMS!'
allowed_issuers = []

public_key_cache = {}


config = None
with open('.samples.config.json') as config_file:
    config_json = json.load(config_file)
    config = config_json['oktaSample']


# Get allowed issuer from the OKTA_ALLOWED_ISSUER environment variable,
# use the 'oktaUrl' from our config file if that doesn't exist
allowed_issuer = os.getenv('OKTA_ALLOWED_ISSUER', config['oidc']['issuer'])
allowed_issuers.append(allowed_issuer)


def fetch_jwk_for(id_token=None):
    if id_token is None:
        raise NameError('id_token is required')

    jwks_uri = "{}/v1/keys".format(config['oidc']['issuer'])

    unverified_header = jws.get_unverified_header(id_token)
    key_id = None
    if 'kid' in unverified_header:
        key_id = unverified_header['kid']
    else:
        raise ValueError('The id_token header must contain a "kid"')
    if key_id in public_key_cache:
        return public_key_cache[key_id]

    r = requests.get(jwks_uri)
    jwks = r.json()
    for key in jwks['keys']:
        jwk_id = key['kid']
        public_key_cache[jwk_id] = key

    if key_id in public_key_cache:
        return public_key_cache[key_id]
    else:
        raise RuntimeError("Unable to fetch public key from jwks_uri")


@app.route("/")
def scenarios():
    return render_template('overview',
                           config=config)


@app.route("/authorization-code/login-redirect")
def auth_login_redirect():
    return render_template('login-redirect',
                           config=config)


@app.route("/authorization-code/login-custom")
def auth_login_custom():
    return render_template('login-custom',
                           config=config)


@app.route("/authorization-code/logout")
def auth_logout():
    session.clear()
    return redirect(url_for('scenarios'))


@app.route("/authorization-code/profile")
def auth_profile():
    if 'user' not in session:
        return redirect(url_for('scenarios'))
    return make_response(render_template('profile',
                                         user=session['user'],
                                         config=config))


@app.route("/authorization-code/callback")
def auth_callback():
    nonce = None
    state = None

    cookies = request.cookies
    if (('okta-oauth-nonce' in cookies) and ('okta-oauth-state' in cookies)):
        nonce = cookies['okta-oauth-nonce']
        state = cookies['okta-oauth-state']
    else:
        return "invalid nonce or state", 401
    if (request.args.get('state') != state):
        err = "'{}' != '{}'".format(
            request.args.get('state'),
            state)
        return "invalid state: {}".format(err), 401
    if 'code' not in request.args:
        return "no code in request arguments", 401

    auth = HTTPBasicAuth(config['oidc']['clientId'],
                         config['oidc']['clientSecret'])
    querystring = {
        'grant_type': 'authorization_code',
        'code': request.args.get('code'),
        'redirect_uri': config['oidc']['redirectUri']
    }
    url = "{}/v1/token".format(config['oidc']['issuer'])

    qs = "grant_type=authorization_code&code={}&redirect_uri={}".format(
        urllib.quote_plus(querystring['code']),
        urllib.quote_plus(querystring['redirect_uri'])
        )
    url = "{}/v1/token?{}".format(config['oidc']['issuer'], qs)
    
    headers = {
        'User-Agent': None,
        'Connection': 'close',
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    r = requests.post(url,
                      # params=querystring,
                      stream=False,
                      auth=auth,
                      headers=headers)
    return_value = r.json()
    if 'id_token' not in return_value:
        return "no id_token in response from /token endpoint", 401
    id_token = return_value['id_token']

    five_minutes_in_seconds = 300
    leeway = five_minutes_in_seconds
    jwt_kwargs = {
        'algorithms': 'RS256',
        'options': {
            'verify_at_hash': False,
            # Used for leeway on the "exp" claim
            'leeway': leeway
        },
        'issuer': config['oidc']['issuer'],
        'audience': config['oidc']['clientId']
        }
    if 'access_token' in return_value:
        jwt_kwargs['access_token'] = return_value['access_token']
    try:
        jwks_with_public_key = fetch_jwk_for(id_token)
        claims = jwt.decode(
            id_token,
            jwks_with_public_key,
            **jwt_kwargs)

    except (jose.exceptions.JWTClaimsError,
            jose.exceptions.JWTError,
            jose.exceptions.JWSError,
            jose.exceptions.ExpiredSignatureError,
            NameError,
            ValueError), err:
        return str(err), 401
    if nonce != claims['nonce']:
        return "invalid nonce", 401
    # Validate 'iat' claim
    # FIXME: Open PR for moving this code here: https://git.io/v1D8M
    time_now_with_leeway = datetime.utcnow() + timedelta(seconds=leeway)
    acceptable_iat = calendar.timegm((time_now_with_leeway).timetuple())
    if 'iat' in claims and claims['iat'] > acceptable_iat:
        return "invalid iat claim", 401

    session['user'] = {
        'email': claims['email'],
        'claims': claims
        }
    return redirect(url_for('auth_profile'))


# FIXME: I shouldn't need to define this once we get static assets
#        in a dedicated statics directory:
@app.route('/bundle.js')
def bundlejs():
    return app.send_static_file('bundle.js')


if __name__ == "__main__":
    app.debug = True
    app.run(port=3000)
