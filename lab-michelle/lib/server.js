//Note if you see copy overs, it's me copying over from my Lab 9
'use strict';

const debug = require('debug')('http:server');

//express
const PORT = process.env.PORT || 3000;
const express = require('express');
const router = express.Router();
const app = module.exports = express();

//middleware
const bodyParser = require('body-parser').json();
const cors = require('./cors');
const errorMiddleware = require('./error-middleware');

//routes
require('./route/route-toy')(router);
//we will add kid here later

//I guess this is the route for all? Or does the express instance on nwhich get/put/post/etc live is the single resource express API?
// app.all('/', (req, res, next) => {
//   debug('ALL /');
//     //I don't know what would go in here?
//   next();
// })

//mount middleware
app.use(bodyParser);
app.use(cors);
app.use(router);
app.use(errorMiddleware); //needs to be last
