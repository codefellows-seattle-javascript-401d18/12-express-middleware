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

    if(req.url.query._id) {
      return storage.fetchOne(req.params._id)
        .then(toy => res.json(toy))
        .catch(next);
    }
  });

  router.get('/api/toy', (req, res, next) => {
    debug('/api/toy GET');

    return storage.fetchAll('toy')
      .then(ids => res(res, 200, ids))
      .catch(next);
  });

  router.put('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy PUT');

    if(!req.url.query._id) {
      try {
        let newToy = new Toy(req.body.name, req.body.desc);

        return storage.create('toy', newToy)
          .then(toy => res(res, 201, toy));
      } catch (err) {
        res(res, 400, 'bad request: could not update toy');
      }
      return;
    }
    return storage.update('toy', req.body)
      .then(() => res(res, 204))
      .catch(next);
  });

  router.delete('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy DELETE');

    if(req.url.query._id) {
      return storage.destroy('toy', req.url.query._id)
        .then(() => res(res, 204))
        .catch(next);
    }
  });
};
