'use strict';

// const Toy = require('../model/toy');
const storage = require('../lib/storage');
// const response = require('../lib/response');
const debug = require('debug')('http:route-toy');

module.exports = function(router) {
  router.post('/api/toy', (req, res, next) => {
    debug('/api/toy POST'); //deleting try and catch

    return storage.create(req.body)
    .then(toy => res.status(201).json(toy))
    .catch(err => next(err))

  });

//GET for toy objects
  router.get('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy GET'); //deleting the try and catch

    return storage.fetchOne(req.params._id)
    .then(toy => res.json(toy))
    .catch(next)
  });

//GET for ids
  router.get('/api/toy', (req, res, next) => {
    debug('/api/toy GET'); //deleting the try and catch

    return storage.fetchAll()
    .then(toy => res.json(ids))
    .catch(next)
});

  router.put('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy PUT');     //deleting the long hand .then and .catch and the res.writehead and res.write and res.end methods

    return storage.update(req.params._id, req.body)
    .then(()=> res.sendStatus(204))
    .catch(next)
  });

  router.delete('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy DELETE')

    return storage.destroy(req.params._id)
    .then(() => res.sendStatus(204))
    .catch(next)
  })
}
