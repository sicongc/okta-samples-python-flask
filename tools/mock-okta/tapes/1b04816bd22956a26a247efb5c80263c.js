var path = require("path");

/**
 * GET /oauth2/v1/authorize?client_id=zYVNoNIeSwul32vpNiOz&redirect_uri=http://localhost:3000/authorization-code/callback&response_type=code&response_mode=query&state=STATE&nonce=NONCE&sessionToken=201112RKSQGxZ7jxR7Xi4EeMgFzy059ehvYnRelz1rvg-llYI8wyBV9&scope=openid email profile
 *
 * host: rain.okta1.com:1802
 * connection: keep-alive
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:48.0) Gecko/20100101 Firefox/48.0
 * accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,* / *;q=0.8
 * accept-encoding: gzip
 * accept-language: en-US
 * cache-control: no-cache, no-store
 * pragma: no-cache
 */

module.exports = function (req, res) {
  res.statusCode = 302;

  res.setHeader("server", "Apache-Coyote/1.1");
  res.setHeader("x-okta-request-id", "reqRxmvSsqzT2aM9D0TXcv_Yw");
  res.setHeader("x-rate-limit-limit", "10000");
  res.setHeader("x-rate-limit-remaining", "9991");
  res.setHeader("x-rate-limit-reset", "1481275409");
  res.setHeader("p3p", "CP=\"HONK\"");
  res.setHeader("set-cookie", ["JSESSIONID=AB89FBBAF7993F12800E8CE31BEC619D; Path=/","t=default; Path=/","DT=DI0-Q14NUuGTGy3BBB-oFZFIg; Expires=Sun, 09-Dec-2018 09:22:38 GMT; Path=/","sid=102aILQwOUpTJC-HLFNR6Q5Vw; Path=/","proximity_d17ed69a3d8def90a2aa16e240e814bf=\"6FPQu/abqYu5I2ggXbSgQmmHyW1x0yXOgnIU824IxIHTFkhwpLOqHxZ53Qy0KerNUXchI0RlLV4p2SgLhiVA2PP1lr3xth7ehpPSmNT60PNqWE8Cvf5c7AEFnIEgFrmp4BTcAoDOYgnahFryS6KysAb/M0baDFn7iTO+cEvEQYtZ76aRDLeO/PagFbB3O3LH\"; Version=1; Max-Age=2147483647; Expires=Wed, 27-Dec-2084 12:36:45 GMT; Path=/","JSESSIONID=AB89FBBAF7993F12800E8CE31BEC619D; Path=/"]);
  res.setHeader("x-okta-backend", "K1104");
  res.setHeader("cache-control", "no-cache, no-store");
  res.setHeader("pragma", "no-cache");
  res.setHeader("expires", "0");
  res.setHeader("location", "http://localhost:3000/authorization-code/callback?code=0iWfSpetLiQXiPsWrlGR&state=STATE");
  res.setHeader("content-language", "en");
  res.setHeader("content-length", "0");
  res.setHeader("date", "Fri, 09 Dec 2016 09:22:38 GMT");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.end();

  return __filename;
};
