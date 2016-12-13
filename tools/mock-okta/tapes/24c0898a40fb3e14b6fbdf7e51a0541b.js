var path = require("path");

/**
 * GET /assets/js/mvc/shared/util/Cookie.js
 *
 * host: rain.okta1.com:1802
 * connection: keep-alive
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:48.0) Gecko/20100101 Firefox/48.0
 * accept: * / *
 * accept-encoding: gzip
 * accept-language: en-US
 * cookie: DT=DI0nMswYIoWShS9ivqmZyLvKg; t=default; JSESSIONID=6B317984A99E03B2418544BF0D76D230
 * cache-control: no-cache, no-store
 * pragma: no-cache
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Apache-Coyote/1.1");
  res.setHeader("accept-ranges", "bytes");
  res.setHeader("etag", "W/\"507-1480866812000\"");
  res.setHeader("last-modified", "Sun, 04 Dec 2016 15:53:32 GMT");
  res.setHeader("content-type", "text/javascript");
  res.setHeader("content-length", "507");
  res.setHeader("date", "Fri, 09 Dec 2016 09:22:29 GMT");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("ZGVmaW5lKFsndW5kZXJzY29yZScsICd2ZW5kb3IvbGliL2pzLmNvb2tpZSddLCBmdW5jdGlvbiAoXywgQ29va2llKSB7CgogIHZhciBTRUNVUkVEX0NPT0tJRSA9IC9eaHR0cHMvLnRlc3Qod2luZG93LmxvY2F0aW9uLmhyZWYpOwoKICByZXR1cm4gewogICAgc2V0Q29va2llOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUsIG9wdGlvbnMpIHsKICAgICAgQ29va2llLnNldChuYW1lLCB2YWx1ZSwgXy5kZWZhdWx0cyhvcHRpb25zIHx8IHt9LCB7CiAgICAgICAgc2VjdXJlOiBTRUNVUkVEX0NPT0tJRSwKICAgICAgICBwYXRoOiAnLycKICAgICAgfSkpOwogICAgfSwKCiAgICBnZXRDb29raWU6IGZ1bmN0aW9uICgpIHsKICAgICAgcmV0dXJuIENvb2tpZS5nZXQuYXBwbHkoQ29va2llLCBhcmd1bWVudHMpOwogICAgfSwKCiAgICByZW1vdmVDb29raWU6IGZ1bmN0aW9uICgpIHsKICAgICAgcmV0dXJuIENvb2tpZS5yZW1vdmUuYXBwbHkoQ29va2llLCBhcmd1bWVudHMpOwogICAgfQogIH07Cgp9KTsK", "base64"));
  res.end();

  return __filename;
};
