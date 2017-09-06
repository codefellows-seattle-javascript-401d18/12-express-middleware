//Note if you see copy overs, it's me copying over from my Lab 9
'use strict';

const storage = require('../lib/storage');
const debug = require('debug')('http:route-toy');

module.exports = function (router) {

  router.post('/api/toy', (req, res, next) => {
    debug('/api/toy POST');

    return storage.create(req.body)
      .then(toy => res.status(201).json(toy))
      .catch(err => next(err));
  });

  router.get('/api/toy', (req, res) => {
    debug('/api/toy GET');

    if (req.params.id) {
      storage.fetchOne('toy', req.params.id)
        .then(toy => res.status(201).json(toy))
        .catch(err => next(err));
  };

//not sure if this is right
  router.put('/api/toy', (req, res) => {
    debug ('/api/toy PUT');
    if (!req.params._id) {
        let newToy = new Toy(req.params.name, req.params.desc)
        .then(storage.create('toy', newToy))
        .then(newToy => res.status (400).json(newToy))
        .catch(err => next(err));
    }
      return storage.update('toy', req.body)
      .then(res => res.status(400).json(newToy))
      .catch(err => response(res, 400, err.message));
  });

router.delete('/api/toy', (req, res) => {
  debug('/api/data DELETE');


  try {
    if(req.url.query._id) {
      return storage.destroy('toy', req.url.query._id)
        .then(response(res, 204, 'toy destroyed'));
    }
  } catch (e) {
    response.sendText(res, 400, 'bad request: cannot delete this stuff');
  };
});
