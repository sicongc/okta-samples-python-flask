var path = require("path");

/**
 * POST /oauth2/v1/token?grant_type=authorization_code&code=0iWfSpetLiQXiPsWrlGR&redirect_uri=http://localhost:3000/authorization-code/callback
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
  res.setHeader("x-okta-request-id", "reqwbx8X-YQRxy7l5tHyvQDQA");
  res.setHeader("x-rate-limit-limit", "10000");
  res.setHeader("x-rate-limit-remaining", "9990");
  res.setHeader("x-rate-limit-reset", "1481275409");
  res.setHeader("p3p", "CP=\"HONK\"");
  res.setHeader("set-cookie", ["sid=\"\"; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/","JSESSIONID=C667E9B75FB4ECC3DDB8C5ADE0F75282; Path=/"]);
  res.setHeader("cache-control", "no-cache, no-store");
  res.setHeader("pragma", "no-cache");
  res.setHeader("expires", "0");
  res.setHeader("content-type", "application/json;charset=UTF-8");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("date", "Fri, 09 Dec 2016 09:22:38 GMT");
  res.setHeader("connection", "close");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJhY2Nlc3NfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWxCbFdrRjZkemhIVkRrMVdFcHBaMkpWZUhaWGQxbHdhbGRmVTFCeFJIQkJOWEJzY0hSNFgzRTBhRGdpZlEuZXlKMlpYSWlPakVzSW1wMGFTSTZJa0ZVTGtkZldYQTNUa1ZaUTA5TE1FY3diemRRZUhKellsOVhValZUYzJzemVDMU5YMlZVTWtGWVdtTkNUalFpTENKcGMzTWlPaUpvZEhSd09pOHZjbUZwYmk1dmEzUmhNUzVqYjIwNk1UZ3dNaUlzSW1GMVpDSTZJbWgwZEhBNkx5OXlZV2x1TG05cmRHRXhMbU52YlRveE9EQXlJaXdpYzNWaUlqb2lhbTlvYmtCaFkyMWxMbU52YlNJc0ltbGhkQ0k2TVRRNE1USTNOVE0xT0N3aVpYaHdJam94TkRneE1qYzRPVFU0TENKamFXUWlPaUo2V1ZaT2IwNUpaVk4zZFd3ek1uWndUbWxQZWlJc0luVnBaQ0k2SWpBd2RXeG5lRTgzTUZCdlQxUkdhMkpCTUdjeklpd2ljMk53SWpwYkluQnliMlpwYkdVaUxDSnZjR1Z1YVdRaUxDSmxiV0ZwYkNKZGZRLlBpY1FKSXdQTkljZEJIUmd5dmZRV0h6VFhmWHNqT25wVGxWQUQ3QjQ1OGp2NkJaSXkxaVhlOXNKa0Z5b2hRVlZ2NEVINTVKaWpCZ09IOHVRb3V1aWFrZWxHTFRiTTZSYUpia1JTbjJFVjJrRmxXemZZdDFjNDhBQ2kzTjJlLTlLN3NnNkRZQ0syaWk0cVlSWVVTNk1wajBZNjR6Z2JTZkNRaGVYeWpocklPV3BvQ09OaE55NEc2eGZpU193V2Vyb0tiLXk2QmJCaTVtYWtDWFR1S1Zib1VrcWc0ZHlRa2tMYWlPTEdjMHVsTFFrNG9mYWhPN1JxdGM4SjFnZExHcTY5VFBuWUhBQjhFZ28tcU1Tc3dLTExEYWRsMzc5QUNPVVp0OGwxc25FeHk0QzR6bjR1bEVWOHdIdVlNS0xSNVBqNFRRSURUQS0xbERVaWVnVGlkQTdrdyIsInRva2VuX3R5cGUiOiJCZWFyZXIiLCJleHBpcmVzX2luIjozNjAwLCJzY29wZSI6InByb2ZpbGUgb3BlbmlkIGVtYWlsIiwiaWRfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWxoblRXcGxNR016Y0VnekxVazNkblJxT1hCYWNEZFFUa0pVZVRaR2FsVk5XbGhhWlc1d1QzZzNWVGdpZlEuZXlKemRXSWlPaUl3TUhWc1ozaFBOekJRYjA5VVJtdGlRVEJuTXlJc0ltNWhiV1VpT2lKS2IyaHVJRUZrWVcxeklpd2laVzFoYVd3aU9pSnFiMmh1UUdGamJXVXVZMjl0SWl3aWRtVnlJam94TENKcGMzTWlPaUpvZEhSd09pOHZjbUZwYmk1dmEzUmhNUzVqYjIwNk1UZ3dNaUlzSW1GMVpDSTZJbnBaVms1dlRrbGxVM2QxYkRNeWRuQk9hVTk2SWl3aWFXRjBJam94TkRneE1qYzFNelU0TENKbGVIQWlPakUwT0RFeU56ZzVOVGdzSW1wMGFTSTZJa2xFTGtkalFsVXRWMjlQZGxCTFRVWTVPR3BzWHpSblpEUnJWak15Y0VSSVpGQnZSMVp4Y3pkcGFVeHBjbThpTENKaGJYSWlPbHNpY0hka0lsMHNJbWxrY0NJNklqQXdiMncyYVZOWVFVSTJURUkxV21seE1HY3pJaXdpYm05dVkyVWlPaUpPVDA1RFJTSXNJbkJ5WldabGNuSmxaRjkxYzJWeWJtRnRaU0k2SW1wdmFHNUFZV050WlM1amIyMGlMQ0poZFhSb1gzUnBiV1VpT2pFME9ERXlOelV6TlRnc0ltRjBYMmhoYzJnaU9pSkRUbGw1VFZGNVNFeElNa3hrTkVnM2JGcGpTVkZSSW4wLkFIWGpfNFhpUnY0cHVBQ3RRRTBBTDlsMWZXVmZDTXg5OFkwcW50eHNNSG1vU2ctS0lkbEN6WjFReno1ZjR3dG56Skp2dkI0REViVGZDelJJNmhhdFltYnllcUMxYW1ic0l2Xy1JUU9GNVZ1dkhLNXRDbm9TMnFTc2E3OVcwMFh2dG01SWhsTVNjX2tyNWxrMjJfRlpMckVJRDYtbzkwOUZJRXFLampGM05YSWtlVXdXdWJydDk1TEcybTZEQlRqTU5qU3BCQkZtMEdaZ1ZUdmp1RnJpV2N5bjM4UzAzR0VoSmpfZmY2OXpNeW9Ud2dFV3U1NWtCdDJINVI2aUpXU29tOVRTN2NaUlAzYWpMN0JsYmxuVUwycjU4YUlpX3VfUTVTMTh5VGVsLUhhYmR4OEFNQjdRMVlCeGpqdk5mdWZlQ0w5Vy15Uy1WNG5ad2J1ZDZUQU1rUSJ9", "base64"));
  res.end();

  return __filename;
};
