# Air Mom & Baby

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.4.

## Setup development environment
1. If choose local MongoDB follow below. Otherwise prepare the connection string of the remote MongoDB.
    1. install MongoDB 3.6 on your local.
    2. Launch `npm run mongo`, which will execute shell command `/Users/mac/github/mongodb3.6.0/bin/mongod`
2. Git check out the `master` branch
3. Run `npm install -g typescript`
4. Run `npm install`
5. Modify `.env` file to configure the `AMB_MONGO_DB_CONNECTION_STRING=$YourMongoDbConnectionString`
6. Run `npm run watch` to launch the express web site on `http://localhost` (80 port) and `https://localhost` (443 port). It will serve both Rest API and angular site. The angular site base is `http://localhost` (the whole site) and API route is `http://localhost/api`.

## Launch in prod (Aliyun and Amazon) on Ubuntu
* Under any directory. Usually it's the user's home directory as `~`.
* `curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -`
* `sudo apt-get install -y nodejs`
* `sudo npm install typescript -g`
* `git clone https://github.com/airmnb/airmnb`
* `cd airmnb`
* `npm install`
* `npm run checkout:prod`
* `npm run tsc`
* `screen`. See https://www.howtogeek.com/howto/ubuntu/keep-your-ssh-session-running-when-you-disconnect/
* `sudo AMB_MONGO_DB_CONNECTION_STRING=${MongoDBConnectionString} IS_PROD=true npm run start:prod`. sudo is required to run a port below 1024.
* Run `ctrl-A ctrl-D` to detach `screen`.
* Check `curl -k https://localhost` to check if the web site is working properly.

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
