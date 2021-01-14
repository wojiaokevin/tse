const fs = require('fs');

module.exports = {
  port: 443,
  creds: {
    key: fs.readFileSync("keys/key.pem", "utf8"),
    cert: fs.readFileSync("keys/cert.pem", "utf8"),
  },
  proxyHost: '<VAULT_ID>.sandbox.verygoodproxy.com',
  proxyCert: fs.readFileSync('./keys/proxycert.pem'),
  proxyUser: '<PROXY_USER>',
  proxyPw: '<PROXY_PASSWORD>'
};
