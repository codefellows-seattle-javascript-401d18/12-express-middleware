'use strict'

const Toy = require('../model/toy')
const storage = require('../lib/storage')
const response = require('../lib/response')
const debug = require('debug')('http:route-toy')

module.exports = function(router) {

  router.post('/api/toy', (req, res, next) => {
    debug('/api/toy POST')
    return storage.create(req.body)
    .then(toy => {
      res.status(201).json(toy)
    })
    .catch(err => next(err))
  })

//this is how express dynamic routes
  // http GET :3000/api/toy/1234
  // req.params._id => 1234

  //superagent request:
  //superagent.get(':3000/api/toy/1234-5678')
  //.then()
  //.catch()

  router.get('/api/toy:_id', (req, res, next) => {
    debug('/api/toy/:_id GET')

    return storage.fetchOne(req.params._id)
    //.then(toy=>res.json(toy))
    .then(toy => res.status(200).json(toy))
    .catch(next)


    // if(req.url.query._id) {
    //   storage.fetchOne('toy', req.url.query._id)
    //     .then(toy => {
    //       response.sendJson(res, 200, toy)
    //     })
    //     .catch(err => {
    //       console.error(err)
    //       response.sendText(res, 404, `bad request; could not find record, ${err.message}`)
    //     })
    //   return
    // }
    // response.sendText(res, 400, 'bad request; item id required to get record')
  })

  router.get('/api/toy', (req, res, next) => {

  router.put('/api/toy', (req, res, next) => {
    debug('/api/toy PUT')
    if (req.url.query._id) {
      if(!req.body._id && !req.body.name && !req.body.desc) {
        response.sendJson(res, 400, `bad request; body improperly formatted`)
        return
      }
      storage.update('toy', req.body)
        .then(() => {
          res.writeHead(204, {'Content-Type': 'text/plain'})
          res.end()
          return
        })
        .catch(err => {
          res.writeHead(400, {'Content-Type': 'application/json'})
          res.write(`bad request; ${err.message}`)
          res.end()
          return
        })
      return
    }
  })

  router.delete('/api/toy', (req, res, next) => {
    debug('/api/toy DELETE')
    if(req.url.query._id) {
      storage.delete('toy', req.url.query._id)
        .then(() => {
          res.writeHead(204, {'Content-Type': 'text/plain'})
          res.end()
          return
        })
        .catch(err => {
          response.sendJson(res, 400, `bad request; ${err.message}`)
          return
        })
      return
    }
    response.sendJson(res, 400, 'bad request; item id required to get record')
  })
}
