var path = require("path");

/**
 * DELETE /api/v1/sessions/me
 *
 * host: rain.okta1.com:1802
 * connection: keep-alive
 * accept: application/json
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:48.0) Gecko/20100101 Firefox/48.0
 * origin: http://localhost:3000
 * content-type: application/json
 * accept-encoding: gzip
 * accept-language: en-US
 * cookie: t=default; DT=DI0-Q14NUuGTGy3BBB-oFZFIg; sid=102aILQwOUpTJC-HLFNR6Q5Vw; proximity_d17ed69a3d8def90a2aa16e240e814bf="6FPQu/abqYu5I2ggXbSgQmmHyW1x0yXOgnIU824IxIHTFkhwpLOqHxZ53Qy0KerNUXchI0RlLV4p2SgLhiVA2PP1lr3xth7ehpPSmNT60PNqWE8Cvf5c7AEFnIEgFrmp4BTcAoDOYgnahFryS6KysAb/M0baDFn7iTO+cEvEQYtZ76aRDLeO/PagFbB3O3LH"; JSESSIONID=AB89FBBAF7993F12800E8CE31BEC619D
 * cache-control: no-cache, no-store
 * pragma: no-cache
 */

module.exports = function (req, res) {
  res.statusCode = 204;

  res.setHeader("server", "Apache-Coyote/1.1");
  res.setHeader("x-okta-request-id", "reqrOPIUNMUSje5rreKjFxACQ");
  res.setHeader("x-rate-limit-limit", "1200");
  res.setHeader("x-rate-limit-remaining", "1196");
  res.setHeader("x-rate-limit-reset", "1481275413");
  res.setHeader("p3p", "CP=\"HONK\"");
  res.setHeader("access-control-allow-origin", "http://localhost:3000");
  res.setHeader("access-control-allow-credentials", "true");
  res.setHeader("access-control-allow-headers", "Content-Type");
  res.setHeader("cache-control", "no-cache, no-store");
  res.setHeader("pragma", "no-cache");
  res.setHeader("expires", "0");
  res.setHeader("x-okta-backend", "K1104");
  res.setHeader("x-frame-options", "SAMEORIGIN");
  res.setHeader("set-cookie", ["JSESSIONID=AB89FBBAF7993F12800E8CE31BEC619D; Path=/"]);
  res.setHeader("date", "Fri, 09 Dec 2016 09:22:39 GMT");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.end();

  return __filename;
};
