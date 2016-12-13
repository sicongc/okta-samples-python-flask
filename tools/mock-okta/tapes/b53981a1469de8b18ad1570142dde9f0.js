var path = require("path");

/**
 * GET /oauth2/v1/authorize/redirect;jsessionid=6B317984A99E03B2418544BF0D76D230?okta_key=GrX43Ardh1yO00ZzDnwrMttLfj6qpF9GKQdgYcVtk_8
 *
 * host: rain.okta1.com:1802
 * connection: keep-alive
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:48.0) Gecko/20100101 Firefox/48.0
 * accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,* / *;q=0.8
 * accept-encoding: gzip
 * accept-language: en-US
 * cookie: DT=DI0UDSfASOcR4mGzwqcpaQ9Pw; t=default; sid=102vQliQBG3Q1-6ksUKZo1uiw; proximity_830330aec6d014b0519e86c291366f89="gql/bqRmKbsykoPNcivX/Pufo5bD3UzmVmzz5x6/8GY1EuSMosqOZrzJ2HrfKUtFwrqhALBjX3aGkZi+Xe9Ox2M6Medqd+NIHEI/vIGEyHWGArLJI67grnutPNt41RrNoUVO3OXU3Ve3t5/VGe681b8pe4KGnq8Rf8jUAJMekGEoTbgyM8FeiEvgKr37Rqke"; JSESSIONID=8138DAB35E548A3325C6EA73AB4256E5
 * cache-control: no-cache, no-store
 * pragma: no-cache
 */

module.exports = function (req, res) {
  res.statusCode = 302;

  res.setHeader("server", "Apache-Coyote/1.1");
  res.setHeader("x-okta-request-id", "reqRQoT_KS2RkmvKMfpH-Ss2Q");
  res.setHeader("x-rate-limit-limit", "10000");
  res.setHeader("x-rate-limit-remaining", "9995");
  res.setHeader("x-rate-limit-reset", "1481275409");
  res.setHeader("p3p", "CP=\"HONK\"");
  res.setHeader("x-okta-backend", "K1104");
  res.setHeader("cache-control", "no-cache, no-store");
  res.setHeader("pragma", "no-cache");
  res.setHeader("expires", "0");
  res.setHeader("set-cookie", ["t=default; Path=/","sid=102vQliQBG3Q1-6ksUKZo1uiw; Path=/","JSESSIONID=8138DAB35E548A3325C6EA73AB4256E5; Path=/"]);
  res.setHeader("location", "http://localhost:3000/authorization-code/callback?code=JlZqT5Z6AjwQlp5j8Lpd&state=STATE");
  res.setHeader("content-language", "en");
  res.setHeader("content-length", "0");
  res.setHeader("date", "Fri, 09 Dec 2016 09:22:33 GMT");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.end();

  return __filename;
};
