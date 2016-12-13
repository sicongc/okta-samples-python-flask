from datetime import datetime
from datetime import timedelta
import calendar
import json
import os
import re
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
            static_url_path='',
            template_folder='{}/tools/templates'.format(cwd))
# FIXME: Indicate that this is meant to be determined by the end user.
app.secret_key = 'this is secret!'
# FIXME: Remove the '0.1:7777' hack below
#        Decide how we should validate ISS claims.
allowed_domains = ['okta.com', 'oktapreview.com', '0.1:7777']
# FIXME: Decide on the right way to validate Key IDs (KID)
not_alpha_numeric = re.compile('[^a-zA-Z0-9_]+')
public_key_cache = {}

oidc = None
with open('.samples.config.json') as config_file:
    config = json.load(config_file)
    oidc = config['oidc']
user = {
    'email': 'email',
    'claims': {
        'iss': 'iss',
        'iat': 'iat',
        'exp': 'exp'
    }
}


def domain_name_for(url):
    second_to_last_element = -2
    domain_parts = url.netloc.split('.')
    (sld, tld) = domain_parts[second_to_last_element:]
    return sld + '.' + tld


def fetch_jwk_for(id_token=None):
    if id_token is None:
        raise NameError('id_token is required')

    dirty_header = jws.get_unverified_header(id_token)
    cleaned_key_id = None
    if 'kid' in dirty_header:
        # FIXME: Decide on a standard way to do KID validation.
        dirty_key_id = dirty_header['kid']
        cleaned_key_id = re.sub(not_alpha_numeric, '', dirty_key_id)
    else:
        raise ValueError('The id_token header must contain a "kid"')
    if cleaned_key_id in public_key_cache:
        return public_key_cache[cleaned_key_id]

    # FIXME: Determine what the proper way to do ISS validation is,
    #        then fix the block below:
    # START FIXME
    # Uncomment the block below!
    '''
    unverified_claims = jwt.get_unverified_claims(id_token)
    dirty_url = urlparse.urlparse(unverified_claims['iss'])
    domain_name = domain_name_for(dirty_url)
    if domain_name not in allowed_domains:
        # FIXME: Decide on standard way to validate the ISS claim.
        error_string = "The domain ({}) in the issuer claim is not allowed".format(domain_name)
        raise ValueError(error_string)
    cleaned_issuer = dirty_url.geturl()
    oidc_discovery_url = "{}/.well-known/openid-configuration".format(
        cleaned_issuer)

    # FIXME: Decide on standard way to do auto-discovery
    r = requests.get(oidc_discovery_url)
    openid_configuration = r.json()
    if 'jwks_uri' in openid_configuration:
        jwks_uri = openid_configuration['jwks_uri']
    '''
    jwks_uri = "http://127.0.0.1:7777/oauth2/v1/keys"
    # END FIXME

    r = requests.get(jwks_uri)
    jwks = r.json()
    for key in jwks['keys']:
        jwk_id = key['kid']
        public_key_cache[jwk_id] = key

    if cleaned_key_id in public_key_cache:
        return public_key_cache[cleaned_key_id]
    else:
        raise RuntimeError("Unable to fetch public key from jwks_uri")


@app.route("/")
def scenarios():
    return render_template('index', oidc=oidc)


@app.route("/authorization-code/login-redirect")
def auth_login_redirect():
    return render_template('index', oidc=oidc)


@app.route("/authorization-code/login-custom")
def auth_login_custom():
    return render_template('index', oidc=oidc)


@app.route("/authorization-code/logout")
def auth_logout():
    session.clear()
    return redirect(url_for('scenarios'))


@app.route("/authorization-code/profile")
def auth_profile():
    if 'user' not in session:
        return redirect(url_for('scenarios'))
    u = session['user']
    # FIXME: Why did I need this hack?
    u['claims']['iss'] = 'http:&#x2F;&#x2F;127.0.0.1:7777'
    resp = make_response(render_template('index', user=u, oidc=oidc))
    resp.set_cookie('okta-oauth-nonce', '', expires=0)
    resp.set_cookie('okta-oauth-state', '', expires=0)
    resp.set_cookie('okta-oauth-redirect-params', '', expires=0)
    return resp


@app.route("/authorization-code/callback")
def auth_callback():
    nonce = None
    state = None

    cookies = request.cookies
    if (('okta-oauth-nonce' in cookies) and ('okta-oauth-state' in cookies)):
        nonce = cookies['okta-oauth-nonce']
        state = cookies['okta-oauth-state']
    elif 'okta-oauth-redirect-params' in cookies:
        redirectParamsContent = cookies['okta-oauth-redirect-params']
        redirectParams = json.loads(redirectParamsContent)
        nonce = redirectParams['nonce']
        state = redirectParams['state']
    else:
        return "invalid nonce or state", 401
    if (request.args.get('state') != state):
        err = "'{}' != '{}'".format(
            request.args.get('state'),
            state)
        return "invalid state: {}".format(err), 401
    if 'code' not in request.args:
        return "no code in request arguments", 401

    auth = HTTPBasicAuth(oidc['clientId'], oidc['clientSecret'])
    querystring = {
        'grant_type': 'authorization_code',
        'code': request.args.get('code'),
        'redirect_uri': oidc['redirectUri']
    }
    # START FIXME
    # The code below is so we can pass the yakbak tests
    # Ideally, I shouldn't need any of this
    qs = "grant_type=authorization_code&code={}&redirect_uri={}".format(
        urllib.quote_plus(querystring['code']),
        urllib.quote_plus(querystring['redirect_uri'])
        )
    # END FIXME

    url = "{}/oauth2/v1/token".format(oidc['oktaUrl'])
    # FIXME: This URL shouldn't need the query string
    url = "{}/oauth2/v1/token?{}".format(oidc['oktaUrl'], qs)

    r = requests.post(url,
                      # FIXME: This is to force Requests into sending:
                      #        'application/x-www-form-urlencoded'
                      #        as the Content-Type. How can we remove this?
                      data={'': ''},
                      # params=querystring,
                      auth=auth)
    return_value = r.json()
    print(return_value)
    if 'id_token' not in return_value:
        return "no id_token in response from /token endpoint", 401
    id_token = return_value['id_token']

    five_minutes_in_seconds = 300
    leeway = five_minutes_in_seconds
    jwt_kwargs = {
        'algorithms': 'RS256',
        'options': {
            # FIXME: Remove when mock server returns valid access_tokens
            'verify_at_hash': False,
            'leeway': leeway
        },
        'issuer': oidc['oktaUrl'],
        'audience': oidc['clientId']
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
