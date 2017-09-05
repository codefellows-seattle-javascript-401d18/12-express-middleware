'use strict'

const debug = require('debug')('http:server')

//express setup
const PORT = process.env.PORT || 3000
const express = require('express')
const router = express.Router()
const app = module.exports = express()

//middleware
const bodyParser = require('body-parser').json()
const cors = require('./cors')
const errorMiddleware = require('./error-middleware')

//routes
require('./route/route-toy')(router)
require('./route/route-kid')(router)
require('./route/route-family')(router)

//mounts middleware to application - given a req do a thing
app.use(bodyParser)
app.use(cors)
app.use(router)
app.use(errorMiddleware) //this should be last

// page('/route', bodyParser, cors, router, errorMiddleware)
