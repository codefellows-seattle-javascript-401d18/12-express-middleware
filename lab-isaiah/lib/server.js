'use strict';

const debug = require('debug')('http:server');

// express setup
const express = require('express');
const router = express.Router();
const app = module.exports = express();

// middleware
const bodyParser = require('body-parser').json();
const cors = require('./cors');
const errorMiddleware = require('./error-middleware');

// routes
require('../route/route-toy')(router);

// mount middleware
app.use(bodyParser);
app.use(cors);
app.use(router);
app.use(errorMiddleware);
