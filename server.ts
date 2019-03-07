import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {enableProdMode} from '@angular/core';
import {ngExpressEngine} from '@nguniversal/express-engine';
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';

enableProdMode();

export const app = express();

app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');

const users = [
 { uid: '1', username: 'john', password: 'abc123', mySecret: 'I let my cat eat from my plate.' },
 { uid: '2', username: 'kate', password: '123abc', mySecret: 'I let my dog sleep in my bed.'}
];

const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const key = fs.readFileSync(path.resolve('./privkey.pem'), 'utf8');

function encrypt(toEncrypt: string): string {
 const buffer = Buffer.from(toEncrypt);
 const encrypted = crypto.privateEncrypt(key, buffer);
 return encrypted.toString('base64');
}

function decrypt(toDecrypt: string): string {
 const buffer = Buffer.from(toDecrypt, 'base64');
 const decrypted = crypto.publicDecrypt(key, buffer);
 return decrypted.toString('utf8');
}


app.engine('html', ngExpressEngine({
 bootstrap: AppServerModuleNgFactory,
 providers: [
   provideModuleMap(LAZY_MODULE_MAP)
 ]
}));

app.set('view engine', 'html');
app.set('views', './dist/browser');

app.post('/auth/signin', (req, res) => {
  const requestedUser = users.find( user => {
    return user.username === req.body.username && user.password === req.body.password;
  });
  if (requestedUser) {
    res.cookie('authentication', encrypt(requestedUser.uid), {
      maxAge: 2 * 60 * 60 * 60,
      httpOnly: true
    });
    res.status(200).send({status: 'authenticated'});
  } else {
    res.status(401).send({status: 'bad credentials'});
  }
 });
 

app.get('/auth/isLogged', (req, res) => {
 res.status(200).send({authenticated: !!req.cookies.authentication});
});

app.get('/auth/signOut', (req, res) => {
 res.cookie('authentication', '', {
   maxAge: -1,
   httpOnly: true
 });
 res.status(200).send({status: 'signed out'});
});

app.get('/secretData', (req, res) => {
  const uid = decrypt(req.cookies.authentication);
  res.status(200).send({secret: users.find(user => user.uid === uid).mySecret});
 });
 

app.get('*.*', express.static('./dist/browser', {
 maxAge: '1y'
}));

app.get('/*', (req, res) => {
 res.render('index', {req, res}, (err, html) => {
   if (html) {
     res.send(html);
   } else {
     console.error(err);
     res.send(err);
   }
 });
});
