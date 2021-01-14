### Run VGS Test App

Tested with Ubuntu 18.04.3 LTS node v13.13.0 npm v6.14.4
Demo Vid: https://www.awesomescreenshot.com/video/20974

##### 1. Install NPM dependencies
```
npm install
```

##### 2. Generate HTTPS server crypto
Generate private key/certificate into the keys folder to serve over HTTPS.
Also add your VGS tunneling cert into the folder as tunnelCert.pem
```
openssl genrsa -out keys/key.pem 2048
openssl req -new -sha256 -key keys/key.pem -out keys/csr.pem
openssl x509 -req -in keys/csr.pem -signkey keys/key.pem -out keys/cert.pem
```

##### 3. Modify config file
The app reads in properties from the config.js file. Copy the config_template.js file to config.js and 
modify the private bracket fields, for ex. replace PROXY_USER in the line:
```
proxyUser: "<PROXY_USER>",
```
with your own private credentials.
Also, replace proxyPw with your proxy user password and change the VAULT_ID with yours in proxyHost.
You will need to update the vault id in the VGSCollect.create initialization call in public/app.js file as well.

##### 4. Run server
```
npm start
```
or
```
node index.js
```
You may need to run these commands as root or via sudo to bind to the reserved port 443.
