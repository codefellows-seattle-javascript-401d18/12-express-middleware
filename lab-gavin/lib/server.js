'use strict';
// express setup

const express = require('express');
const router = express.Router();
const app = module.exports = express();

// middleware
const bodyParser = require('body-parser').json();
const cors = require('./cors');
const errorMiddleware = require('../lib/error-middleware');

// routes
require('../route/route-toy')(router);


// mount middleware
app.use(bodyParser);
app.use(cors);
app.use(router);
// this should always be last to catch any errors within the callback chain
app.use(errorMiddleware);

module.exports = app;

app.all('/*', (req, res) => res.sendStatus(404));
