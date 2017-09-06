'use strict';
const storage = require('../lib/storage');
const debug = require('debug')('http:route-toy');

module.exports = function(router) {
  router.post('/api/toy', (req, res, next) => {
    debug('/api/toy POST');

    return storage.create(req.body)
      .then(toy => res.status(201).json(toy))
      .catch(err => next(err));
  });

  router.get('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy/:_id GET');

    return storage.fetchOne(req.params._id)
      .then(toy => res.status(200).json(toy))
      .catch(next);
  });

  router.get('/api/toy', (req, res, next) => {
    debug('/api/toy GET all');

    return storage.fetchAll()
      .then(toy => res.status(200).json(toy))
      .catch(next);
  });

  router.put('/api/toy', (req, res, next) => {
    debug('/api/toy PUT');

    return storage.update(req.body)
      .then(toy => res.status(204).json(toy))
      .catch(err => next(err));
  });

  router.delete('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy DELETE');

    return storage.remove(req.params._id)
      .then(toy => res.status(204).json(toy))
      .catch(next);
  });
};

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
