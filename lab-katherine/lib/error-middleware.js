// 'use strict'
//
// //take advantage of http errors package - given some issue in our code, we'll create an actual http error - a status code, name, etc will be attached to the object
//
// const createError = require('http-errors')
// const debug = require('debug')('http:error-middleware')
//
// module.exports = function(err, req, res, next) {
//   if(err.status){
//     debug('user error')
//     res.status(err.status).send(err.name)
//     //like res.writeHead(400, 'bad request')
//     //res.write('blam')
//     //res.end()
//     next()
//     return
//   }
//   //up there is http error, if not
//   debug('server error')
//   err = createError(500, err.message)
//   res.status(err.status).send(err.name)
//   next()
//   //implicit return
// }

'use strict'

const createError = require('http-errors')
const debug = require('debug')('http:error-middleware')

module.exports = function(err, req, res, next) {
  if(err.status) {
    debug('user error')
    res.status(err.status).send(err.name)
    next()
    return
  }

  debug('server error')
  err = createError(500, err.message)
  res.status(err.status).send(err.name)
  next()
  return
}
