'use strict';

const debug = require('debug')('http:server');

// setting up express
const PORT = process.env.PORT || 3000;
const express = require('express');
const router = express.Router();
const app = module.exports = express();

// setting up middleware
const bodyParser = require('body-parser').json();
const cors = require('./cors');
const errorMiddleWare = require('./error-middleware');

// routes
require('../route/route-toy')(router);

// mount middleware
app.use(bodyParser);
app.use(cors);
app.use(router);

// always last to catch errors
app.use(errorMiddleWare);
