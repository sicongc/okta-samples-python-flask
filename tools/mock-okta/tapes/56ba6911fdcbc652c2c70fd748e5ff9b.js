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
 * cookie: DT=DI0UDSfASOcR4mGzwqcpaQ9Pw; proximity_830330aec6d014b0519e86c291366f89="gql/bqRmKbsykoPNcivX/Pufo5bD3UzmVmzz5x6/8GY1EuSMosqOZrzJ2HrfKUtFwrqhALBjX3aGkZi+Xe9Ox2M6Medqd+NIHEI/vIGEyHWGArLJI67grnutPNt41RrNoUVO3OXU3Ve3t5/VGe681b8pe4KGnq8Rf8jUAJMekGEoTbgyM8FeiEvgKr37Rqke"; t=default; sid=102vQliQBG3Q1-6ksUKZo1uiw; JSESSIONID=8138DAB35E548A3325C6EA73AB4256E5
 * cache-control: no-cache, no-store
 * pragma: no-cache
 */

module.exports = function (req, res) {
  res.statusCode = 204;

  res.setHeader("server", "Apache-Coyote/1.1");
  res.setHeader("x-okta-request-id", "reqN__OqTMbRMesWdIVn2UpkQ");
  res.setHeader("x-rate-limit-limit", "1200");
  res.setHeader("x-rate-limit-remaining", "1198");
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
  res.setHeader("set-cookie", ["JSESSIONID=8138DAB35E548A3325C6EA73AB4256E5; Path=/"]);
  res.setHeader("date", "Fri, 09 Dec 2016 09:22:34 GMT");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.end();

  return __filename;
};
