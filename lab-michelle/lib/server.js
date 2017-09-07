//Note if you see copy overs, it's me copying over from my Lab 9
'use strict';

const debug = require('debug')('http:server');

//express
const express = require('express');
const router = express.Router();
const app = express();

//middleware
const bodyParser = require('body-parser').json();
const cors = require('./cors');
const errorMiddleware = require('./error-middleware');

//routes
require('./route/route-toy')(router);
//we will add kid here later

//mount middleware
app.use(bodyParser);
app.use(cors);
app.use(router);
app.use(errorMiddleware);

app.all('/*', (req, res) => res.sendStatus(404));

module.exports = app;
