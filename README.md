# Air Mom & Baby

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.4.

## Development
1. If choose local MongoDB follow below. Otherwise prepare the connection string of the remote MongoDB.
    1. install MongoDB 3.6 on your local.
    2. Launch `npm run mongodb`, which will execute shell command `/Users/mac/github/mongodb3.6.0/bin/mongod`
2. Git check out the `master` branch
3. Run `npm install`
4. Modify `.env` file to configure the `AMB_MONGO_DB_CONNECTION_STRING=$YourMongoDbConnectionString`
5. Run `npm run watch` to launch the express web site on `http://localhost:3000`. It will serve both Rest API and angular site. The angular site base is `http://localhost:3000` (the whole site) and API route is `http://localhost:3000/api`.

## "ng serve" to support HTTPS
openssl genrsa -out key.pem 1024
openssl req -newkey rsa:1024 -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem

ng serve --ssl 1 --ssl-key certificate/key.pem --ssl-cert certificate/cert.pem

## TODO:

* Google SSO
* Wechat SSO
* Google Map API
* NativeScript project for OS X, Android
* UX polish
* Transaction workflow + camera feature
* Server end push (Web Socket)
* i18n
