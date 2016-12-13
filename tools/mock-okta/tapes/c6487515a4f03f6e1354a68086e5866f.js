var path = require("path");

/**
 * POST /oauth2/v1/token?grant_type=authorization_code&code=JlZqT5Z6AjwQlp5j8Lpd&redirect_uri=http://localhost:3000/authorization-code/callback
 *
 * authorization: Basic ellWTm9OSWVTd3VsMzJ2cE5pT3o6OFV4UXFyZVp1NFdRQkstS0lxS1FJdHF2dHY1VWxXUmxxSTM2bDRzYg==
 * content-type: application/x-www-form-urlencoded
 * host: rain.okta1.com:1802
 * accept: application/json
 * content-length: 0
 * connection: close
 * user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:48.0) Gecko/20100101 Firefox/48.0
 * accept-language: en-US
 * accept-encoding: gzip
 * cookie: 
 * cache-control: no-cache, no-store
 * pragma: no-cache
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Apache-Coyote/1.1");
  res.setHeader("x-okta-request-id", "reqY5Tsi0kNQ2u9xAzB8kKTbQ");
  res.setHeader("x-rate-limit-limit", "10000");
  res.setHeader("x-rate-limit-remaining", "9994");
  res.setHeader("x-rate-limit-reset", "1481275409");
  res.setHeader("p3p", "CP=\"HONK\"");
  res.setHeader("set-cookie", ["sid=\"\"; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/","JSESSIONID=912B6C30456B68C1087EAD7A7608E33E; Path=/"]);
  res.setHeader("cache-control", "no-cache, no-store");
  res.setHeader("pragma", "no-cache");
  res.setHeader("expires", "0");
  res.setHeader("content-type", "application/json;charset=UTF-8");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("date", "Fri, 09 Dec 2016 09:22:33 GMT");
  res.setHeader("connection", "close");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJhY2Nlc3NfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWxCbFdrRjZkemhIVkRrMVdFcHBaMkpWZUhaWGQxbHdhbGRmVTFCeFJIQkJOWEJzY0hSNFgzRTBhRGdpZlEuZXlKMlpYSWlPakVzSW1wMGFTSTZJa0ZVTGpCMWVVVkhVMDlHYjNCS1V6Uk9Va2xpTkV4dlFXMXhUemhLU0RFeVJIUkJNVjk0UmtZMFNuQTRRMFVpTENKcGMzTWlPaUpvZEhSd09pOHZjbUZwYmk1dmEzUmhNUzVqYjIwNk1UZ3dNaUlzSW1GMVpDSTZJbWgwZEhBNkx5OXlZV2x1TG05cmRHRXhMbU52YlRveE9EQXlJaXdpYzNWaUlqb2laMlZ2Y21kbFFHRmpiV1V1WTI5dElpd2lhV0YwSWpveE5EZ3hNamMxTXpVekxDSmxlSEFpT2pFME9ERXlOemc1TlRNc0ltTnBaQ0k2SW5wWlZrNXZUa2xsVTNkMWJETXlkbkJPYVU5Nklpd2lkV2xrSWpvaU1EQjFiR2QyZEdGdldqWlNXbFozVDBRd1p6TWlMQ0p6WTNBaU9sc2liM0JsYm1sa0lpd2laVzFoYVd3aVhYMC5lMm5FYXpLWjRtY0phRGE0ejJiTjBfcDE1TEtac0hRS0twNGhvVXZaem14b3c4MHNnM3FPYUl0Ql9fRjkyeEs0YjRqdVR5eWZGTkNzc1Y0b0k1c1dkNnBYMFlMSkttemc1VjhBTDdfdUo4MEpiUGNFY2xkSFlFbmI3YWpaVVMyOVptY2tQY1RKSGtpYnhxZHE1MDBOVk8tNXBseDA2ekJod1JtYWVfMnZxNFh1SUhfdnlFOEtCNXlfdWU1aE5sa3ZrbGhPVmxyemUwSUlJZzBBMG1Ub0NhSE5Zb1JNVU1zNVFfcjBZWDNnYlA4WFlHcVRyazF5dEZNUk5SbmJ2ZVpzQVR1dFZ5cndDUF9iRVV4bEFmbjVIUlQxaGRFcDVoam9rN1lnU0pYMFNkUHdnM1owdGg2bDhXMVJmTTZhR0tMVmgtQWk4b2M4NHVjOWRLY3gySFV4a3ciLCJ0b2tlbl90eXBlIjoiQmVhcmVyIiwiZXhwaXJlc19pbiI6MzYwMCwic2NvcGUiOiJvcGVuaWQgZW1haWwiLCJpZF90b2tlbiI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW10cFpDSTZJbGhuVFdwbE1HTXpjRWd6TFVrM2RuUnFPWEJhY0RkUVRrSlVlVFpHYWxWTldsaGFaVzV3VDNnM1ZUZ2lmUS5leUp6ZFdJaU9pSXdNSFZzWjNaMFlXOWFObEphVm5kUFJEQm5NeUlzSW1WdFlXbHNJam9pWjJWdmNtZGxRR0ZqYldVdVkyOXRJaXdpZG1WeUlqb3hMQ0pwYzNNaU9pSm9kSFJ3T2k4dmNtRnBiaTV2YTNSaE1TNWpiMjA2TVRnd01pSXNJbUYxWkNJNklucFpWazV2VGtsbFUzZDFiRE15ZG5CT2FVOTZJaXdpYVdGMElqb3hORGd4TWpjMU16VXpMQ0psZUhBaU9qRTBPREV5TnpnNU5UTXNJbXAwYVNJNklrbEVMblJPVGtseGIxZzJkREJTVm04NFp6UnplazFvY0dkaVpHNUViMlJVV0hCaVFVNXBUbXRsTjNWd2RrMGlMQ0poYlhJaU9sc2ljSGRrSWwwc0ltbGtjQ0k2SWpBd2IydzJhVk5ZUVVJMlRFSTFXbWx4TUdjeklpd2libTl1WTJVaU9pSk9UMDVEUlNJc0ltRjFkR2hmZEdsdFpTSTZNVFE0TVRJM05UTTFNeXdpWVhSZmFHRnphQ0k2SWpCblNXYzVNVlpCWTBwTmMwODBlR0paVDFKeVgyY2lmUS5aamtnM2wtTnhBVG9tRWR5MTdWVkV3cHJMc01pTXJIajFMcmt3QWt0dDVCMUhicjAycy1IbTMyTkoyM2VaTl9TODlsZTdYNWdYZnUwdk1sdjdPckFTVEpOdnBBbnF1cXptUzN0ak0xUDJ4TWZjRnBKZ1d3a2F2TVRFMzhjU29CeHJDcHoxeXlZNnFDNTNNSC03TV9iSTVub2RMa2xFMlFaRXFGbWplT2tUVmdSNXdhblJ5c3AwWndBVlFPQlJXcmdIaFFRNHdjbmhvc29vRWRJMFB0dmhrTXItOTF0UGY4SVpkVGlGX2p3cUZILVBLeGJ5NXFpeGI2TGpLd3hNT0ZSeWtKWllZaFlONjhVTlF6UkZjQmZDSXU3RElwajkxWWhiR2Z2NkxOUjZsdDlsMmhGNlNySHRMUVN5c2xvY2pDNTlmdHNYaDRzZVdBaXhZcVRFRFVJS2cifQ==", "base64"));
  res.end();

  return __filename;
};
