'use strict';

const express = require('express');
const router = express.Router();
const app = module.exports = express();

const bodyParser = require('body-parser').json();
const cors = require('./cors');
const errorMiddleware = require('../lib/error-middleware');

require('../route/route-toy')(router);

app.use(bodyParser);
app.use(cors);
app.use(router);
app.use(errorMiddleware);

module.exports = app;

app.all('/*', (req, res) => res.sendStatus(404));
