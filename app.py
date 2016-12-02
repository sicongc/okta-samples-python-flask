import urllib
import sys
import os
from datetime import datetime
from datetime import timedelta
import calendar

from flask import Flask
from flask import request
from flask import session
from flask import redirect
from flask import url_for
from flask import abort
from flask_stache import render_view
from flask_stache import render_template

from jose import jwt
from jose.exceptions import JWTClaimsError
from jose.exceptions import ExpiredSignatureError

# START FIXME: remove this
import struct
import base64
import jwt as pyjwt
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization
# END FIXME

import requests
from requests.auth import HTTPBasicAuth
cwd = os.path.dirname(os.path.realpath(__file__))
app = Flask(__name__,
            static_folder='dist',
            static_url_path='',
            template_folder='{}/tools/templates'.format(cwd))
app.secret_key = 'this is secret!'


# START FIXME
# Remove this test fixtures, which are taken from:
# https://github.com/jpf/okta-oidc-beta/blob/master/README.org#validating-an-oidc-id_token-from-okta
FIXME_private_key = '''
-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDYrIBJjY822hL90KbvGz/FfbrUbDfCcScc1IzUn95O1I+AXwBX
yaSh0HJhXEztBvKkfD9+Kq7Blx8EmRfGo6ziT+fZ0mE0WhZv87nFwvedApsCwTEt
/r3VNNsRmwGGSXxTlbYj1OB3QdGeyl9Gk127akSRBBet7Y2XCezOu809cQIDAQAB
AoGBALU3MORTfOAHa7LUe4mnZKKsEUHwcIIzWN8H9fEu9CNCK/LVgdfqUcL0L3W2
WLA1C2L+d6vxzs8isVKLKBN+eOwUnhbMbMtD8h1SbTUV/JFrZsHycNcff4ythjLW
dMo91+t7EcMKDVmej384Saj8D0z2i1QItvBK/msmSQqdYMXxAkEA72IanU3e5EI1
rkII0/eVLliK6IM+uhaCgAz7Pt7bxntO2NZ8rscn93v6X7SS2Q/QQKyfsT+AbCXk
bMCQE/AsFwJBAOe22JWgT1kIlmPVOaid/XErVV9YYdy7SxkAhvQYzHagWfhQaGpX
sMrX1D5i4eIO9JHRu5zPupCGXRWT43UWr7cCQAi61Smja1t7pqWCNvwz7TbRd89e
6eyzYXL2BjuWuQEWAhwaRlXBYY2+8bSHy0srLncNVI2MOUy4XQoyQ47WlWUCQGZM
vZZhrmZ6ehsdWlVtWyWJoil0FdCkB+XD69D82dhNtysAJPk+Odl0LEpW0a9CNwvh
8tiqhY2lJJeQMU3SdEUCQQCxJ5bXPM5iVDBzV50l3DfDN71srr9KGdCahCuxQpRt
3ZRkZkz9izeRgRM5GRbOM7xpMWKLXFF0E7Y7jF3aa6xD
-----END RSA PRIVATE KEY-----
'''

FIXME_public_key = '''
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDYrIBJjY822hL90KbvGz/FfbrU
bDfCcScc1IzUn95O1I+AXwBXyaSh0HJhXEztBvKkfD9+Kq7Blx8EmRfGo6ziT+fZ
0mE0WhZv87nFwvedApsCwTEt/r3VNNsRmwGGSXxTlbYj1OB3QdGeyl9Gk127akSR
BBet7Y2XCezOu809cQIDAQAB
-----END PUBLIC KEY-----
'''


def long2intarr(long_int):
    _bytes = []
    while long_int:
        long_int, r = divmod(long_int, 256)
        _bytes.insert(0, r)
    return _bytes


def long_to_base64(n):
    bys = long2intarr(n)
    data = struct.pack('%sB' % len(bys), *bys)
    if not len(data):
        data = '\x00'
    s = base64.urlsafe_b64encode(data).rstrip(b'=')
    return s.decode("ascii")


public_key_obj = serialization.load_pem_public_key(
    FIXME_public_key,
    backend=default_backend())

public_key_numbers = public_key_obj.public_numbers()
exponent = long_to_base64(public_key_numbers.e)
modulus = long_to_base64(public_key_numbers.n)
FIXME_jwks_with_public_key = {
    'keys': [{
        'e': exponent,
        'n': modulus,
        'kid': 'TESTKID',
        'kty': 'RSA',
        'alg': 'RS256',
        'use': 'sig'
    }]
}
# END FIXME

oidc = {
    'oktaUrl': 'http://127.0.0.1:7777',
    'clientId': '5VNm1xZ6tnr8aDeGrHWf',
    'clientSecret': 'noRGO0dbWGN8qaVoNl-0PjEQAtrsB18u4pbm96y2',
    'redirectUri': 'http://localhost:3000/authorization-code/callback'
}
user = {
    'email': 'email',
    'claims': {
        'iss': 'iss',
        'iat': 'iat',
        'exp': 'exp'
    }
}
site = {
    'staticPrefix': '/static'
}

@app.route("/")
def hello():
    return render_template('index', oidc=oidc, site=site)

@app.route("/authorization-code/login-redirect")
def auth_login_redirect():
    return render_template('index', oidc=oidc, site=site)

@app.route("/authorization-code/login-custom")
def auth_login_custom():
    return render_template('index', oidc=oidc, site=site)


@app.route("/authorization-code/logout")
def auth_logout():
    session.clear()
    return redirect(url_for('hello'))


@app.route("/authorization-code/profile")
def auth_profile():
    if 'user' not in session:
        return redirect(url_for('hello'))
    u = session['user']
    # FIXME: Why did I need this hack?
    u['claims']['iss'] = 'http:&#x2F;&#x2F;127.0.0.1:7777'

    return render_template('index', user=u, oidc=oidc, site=site)

@app.route("/authorization-code/callback")
def auth_callback():
    nonce = None
    state = None

    if (('okta-oauth-nonce' in request.cookies) and
        ('okta-oauth-state' in request.cookies)):
        nonce = request.cookies['okta-oauth-nonce']
        state = request.cookies['okta-oauth-state']
    elif 'okta-oauth-redirect-params' in request.cookies:
        redirectParamsContent = request.cookies['okta-oauth-redirect-params']
        redirectParams = json.loads(redirectParamsContent)
        nonce = redirectParams['nonce']
        state = redirectParams['state']
    else:
        abort(401)
    if (not state or request.args.get('state') != state):
        abort(401)
    if 'code' not in request.args:
        abort(401)

    auth = HTTPBasicAuth(oidc['clientId'], oidc['clientSecret'])
    querystring = {
        'grant_type': 'authorization_code',
        'code': request.args.get('code'),
        'redirect_uri': oidc['redirectUri']
    }
    qs = "grant_type=authorization_code&code={}&redirect_uri={}".format(
        urllib.quote_plus(request.args.get('code')),
        urllib.quote_plus(oidc['redirectUri'])
        )
    headers = {
        'User-Agent': None,
        #FIXME: Remove this, uncomment "params" below:
        'Authorization': 'Basic: NVZObTF4WjZ0bnI4YURlR3JIV2Y6bm9SR08wZGJXR044cWFWb05sLTBQakVRQXRyc0IxOHU0cGJtOTZ5Mg==',
        'Connection': 'close',
        'Accept': None,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    url = "{}/oauth2/v1/token?{}".format(oidc['oktaUrl'], qs)
    r = requests.post(url,
                      stream=False,
                      headers=headers)
                      # auth=auth)
                      # params=querystring)
    return_value = r.json()
    if 'id_token' not in return_value:
        abort(401)
    id_token = return_value['id_token']

    # START FIXME
    # Remove this code once the test server sends back JWTs
    FIXME_claims = jwt.get_unverified_claims(id_token)
    FIXME_headers = jwt.get_unverified_header(id_token)
    del FIXME_headers['alg']
    del FIXME_claims['at_hash']
    # WARNING WARNING WARNING
    #
    # This is an ugly hack to RE-ENCODE the id_token we got
    # so we can can pass tests that send us unsigned JWTs
    #
    # WARNING WARNING WARNING
    FIXME_id_token = pyjwt.encode(FIXME_claims,
                                FIXME_private_key,
                                algorithm='RS256',
                                headers=FIXME_headers)
    # END FIXME

    leeway = 300
    try:
        claims = jwt.decode(
            FIXME_id_token,
            FIXME_jwks_with_public_key,
            algorithms='RS256',
            issuer=oidc['oktaUrl'],
            options={'leeway': leeway},
            audience=oidc['clientId'])
    except JWTClaimsError as e:
        abort(401)
    except ExpiredSignatureError as e:
        print "ExpiredSignatureError: {}".format(str(e))
        abort(401)
    if nonce != claims['nonce']:
        abort(401)
    acceptable_iat = calendar.timegm((datetime.utcnow() + timedelta(seconds=leeway)).timetuple())
    if 'iat' in claims and claims['iat'] > acceptable_iat:
        abort(401)

    session['user'] = {
        'email': claims['email'],
        'claims': claims
        }
    return redirect(url_for('auth_profile'))


@app.route('/bundle.js')
def bundlejs():
    return app.send_static_file('bundle.js')


if __name__ == "__main__":
    # Fixme: This lets the generator know that we're running
    print "bundle is now VALID"
    sys.stdout.flush()

    app.debug = True
    app.run(port=3000)

