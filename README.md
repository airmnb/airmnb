# Air Mom & Baby

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.4.

## Setup development environment
1. If choose local MongoDB follow below. Otherwise prepare the connection string of the remote MongoDB.
    1. install MongoDB 3.6 on your local.
    2. Launch `npm run mongodb`, which will execute shell command `/Users/mac/github/mongodb3.6.0/bin/mongod`
2. Git check out the `master` branch
3. Run `npm install -g typescript`
4. Run `npm install`
5. Modify `.env` file to configure the `AMB_MONGO_DB_CONNECTION_STRING=$YourMongoDbConnectionString`
6. Run `npm run watch` to launch the express web site on `http://localhost` and `https://localhost`. It will serve both Rest API and angular site. The angular site base is `http://localhost` (the whole site) and API route is `http://localhost/api`.

## Launch in prod (Aliyun and Amazon)
* `cd` to the source code folder. (`git clone https://github.com/airmnb/airmnb` if it's the first time.)
* Run `git fetch`
* Run `git.exe checkout -f -B master remotes/origin/master --`
* Run `npm install -g tsc`
* Run `npm install`
* Run `npm run build:prod` to build the project (both express and angular)
* Run `screen`. See https://www.howtogeek.com/howto/ubuntu/keep-your-ssh-session-running-when-you-disconnect/
* Run `sudo AMB_MONGO_DB_CONNECTION_STRING=${MongoDBConnectionString} IS_PROD=true PORT=443 npm run start:prod`. sudo is required to run a port below 1024.
* Check `curl -k https://localhost`

## TODO:
* Wechat SSO
* NativeScript project for OS X, Android
* UX polish
* Server end push (Web Socket)

## Useful commands

To generate key pair and certificate.
```
openssl genrsa -out key.pem 1024
openssl req -newkey rsa:1024 -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
```

To start angular only with HTTPS (no api express)
```
ng serve --ssl 1 --ssl-key certificate/key.pem --ssl-cert certificate/cert.pem
```
