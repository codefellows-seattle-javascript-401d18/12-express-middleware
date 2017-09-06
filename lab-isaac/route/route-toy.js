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
  //   try {
  //     let newToy = new Toy(req.body.name, req.body.desc);
  //     // if successful, store this thing in memory using the storage module
  //     storage.create('toy', newToy)
  //       .then(toy => response.sendJson(res, 201, toy));
  //   } catch(e) {
  //     console.error(e);
  //     response.sendText(res, 400, `bad request: \n${e.message}`);
  //   }

  router.get('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy/:_id GET');

    return storage.fetchOne(req.params._id)
      .then(toy => res.json(toy))
      .catch(next);
  });
  //   if(req.url.query._id) {
  //     storage.fetchOne('toy', req.url.query._id)
  //       .then(toy => response.sendJson(res, 200, JSON.stringify(toy)))
  //       .catch(err => {
  //         console.error(err);
  //         response.sendText(res, 404, 'bad request; could not find record');;
  //       });
  //     return;
  //   }
  //   response.sendText(res, 400, 'bad request; item id required to get record');

  router.get('/api/toy', (req, res, next) => {
    debug('/api/toy GET');

  });

  router.put('/api/toy', (req, res, next) => {
    debug('/api/toy PUT');

  });
  //   if(req.url.query._id) {
  //     if(!req.body.id && !req.body.name && !req.body.desc) {
  //       return response.sendText(res, 400, 'bad request; body improperly formatted');
  //     }
  //     storage.update('toy', req.body)
  //       .then(() => response.sendText(res, 204, null))
  //       .catch(err => response.sendText(res, 400, `bad request; ${err.message}`));
  //     return;
  //   }
  //   response.sendText(res, 400, 'bad requst; item id required to get record');

  router.delete('/api/toy', (req, res, next) => {
    debug('/api/toy DELETE');

  });
};
