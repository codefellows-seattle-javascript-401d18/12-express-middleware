'use strict'
const storage = require('../lib/storage')
const debug = require('debug')('http:route-toy')
const createError = require('http-errors')

module.exports = function(router) {
  router.post('/api/toy', (req, res, next) => {
    debug('/api/toy POST')

    return storage.create(req.body)
      .then(toy => res.status(201).json(toy))
      .catch(err => next(err))
  })

  // This is how express allows dynamic routes via parameters
  // http GET :3000/api/toy/1234-5678
  // req.params._id => 1234-5678

  // This is how our vanilla http servers were structured
  // http GET :3000/api/toy?_id=1234-5678
  // req.query._id => 1234-5678

  // superagent request:
  // superagent.get(':3000/api/toy/1234-5678')
  // .then(...)
  // .catch(...)
  router.get('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy/:_id GET')
    return storage.fetchOne(req.params._id)
      .then(toy => res.json(toy))
      .catch(next)
  })

  router.get('/api/toy', (req, res, next) => {
    debug('/api/toy GET')
    return storage.fetchAll()
      .then(data => res.json(data))
      .catch(next)
  })

  router.put('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy PUT')
    console.log('body', req.body, 'params', req.params._id)
    return storage.update(req.body, req.params._id)
      .then(toy => res.status(204).json(toy))
      .catch(next)
  })

  router.delete('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy DELETE')
    return storage.destroy(req.params._id)
      .then(toy => res.status(204).text(toy))
      .catch(err => createError(404, err.message), next)
  })
}
