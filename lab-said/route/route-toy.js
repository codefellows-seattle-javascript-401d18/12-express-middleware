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
      .then(toy => res.json(toy))
      .catch(next);
  });

  router.get('/api/toy', (req, res, next) => {
    debug('/api/toy GET');

    return storage.fetchAll(req.body)
      .then(data => res.json(data))
      .catch(next);
  });

  router.put('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy PUT');


  });

  router.delete('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy DELETE');

  });
};
