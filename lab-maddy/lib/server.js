'use strict';

const debug = require('debug')('http:server');

//express setup //got rid of listening PORT because server.js is no longer the kickoff
const express = require('express');
const router = express.Router();
const app = express() //deleted module.exports = express()

//middleware
const bodyParser = require('body-parser').json();
const cors = require('./cors');
const errorMiddleware = require('./error-middleware');

//routes
require('../route/route-toy')(router);
// require('./route/route-kid')(router)
// require('./route/route-family')(router)

//mount middleware
app.use(bodyParser);
app.use(cors);
app.use(router);
app.use(errorMiddleware); //this should always be last to catch any errors within the callback chain

// app.all('/*', (req, res)=> res.sendStatus(404));

module.exports = app;
