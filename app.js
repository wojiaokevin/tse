const cfg = require('./config');
const fs = require("fs");
const http = require("http");
const https = require('https');
const tunnel = require('tunnel');
const bodyParser = require("body-parser");
const express = require("express");

const reqEcho = async function(cardData) {
  return new Promise(function(resolve, reject) {
    const echo = https.request(
      {
        hostname: cfg.proxyHost,
        port: 443,
        path: `/fetch`,
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
      },
      (res) => {
        let allData = '';
        res.on('data', (d) => {
          allData += d;
        });
        res.on('end', () => {
          resolve(allData);
        }); 
      }
    );
    echo.on('error', (e) => {
      reject(e);
    });
    echo.end(cardData);
  });
}

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.post('/fetch', async(req, res) => {
  let revealedCardData = req.body;
  res.set('Content-Type', 'application/json');
  res.send(revealedCardData);
});
app.post("/post", async (req, res) => {
  let redactedCardData = req.body;
  try {
    var echoedCardData = await reqEcho(JSON.stringify(redactedCardData));
  } catch(e) {
    console.log(e);
  }
  res.set('Content-Type', 'application/json');
  res.send({
    redacted: redactedCardData,
    echoed: echoedCardData
  });
});

const httpsServer = https.createServer(cfg.creds, app);
httpsServer.listen(cfg.port);
