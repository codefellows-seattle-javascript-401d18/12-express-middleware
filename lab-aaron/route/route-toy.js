'use strict';

const storage = require('../lib/storage');
const response = require('../lib/response');//leaving until i can refactor
const debug = require('debug')('http:route-toy');

module.exports = function(router) {

  router.post('/api/toy', (req, res, next) => {
    debug('/api/toy POST');

    return storage.create(req.body)
      .then(toy => res.status(201).json(toy))
      .catch(err => next(err));
  });

  router.get('/api/toy', (req, res, next) => {
    debug('/api/toy GET');

    return storage.fetchOne(req.params._id)
      .then(toy => res.json(toy))
      .catch(next);
    // if(req.url.query._id) {
    //   storage.fetchOne('toy', req.url.query._id)
    //     .then(toy => response.sendJson(res, 200, toy))
    //     .catch(e => {
    //       console.error(e);
    //       res.sendText(400, `bad request: ${e.message}`);
    //     });
    //   return;
    // }
    // response.sendText(res, 400, `bad request; could not find record`);
  });

  router.delete('/api/toy', (req, res) => {
    debug('api/toy DELETE');
    if(req.url.query._id) {
      response.sendText(res, 404, 'bad request; unable to delete');
      return;
    }
    storage.delete('toy', req.url.query._id)
      .then(toy => {
        response.sendText(res, 204, `deleted toy id#; ${toy}`);
      })
      .catch(e => {
        console.error(e);
        response.sendText(res, 404, `bad request; unable to locate record`);
      });
    return;
  });

  router.put('/api/toy'), (req, res) => {
    debug('/api/toy PUT');
    if (!req.url.query._id) {
      response.sendText(res, 400, 'bad request; no id exists');
      return;
    }
    let newToy = req.body;
    storage.put('toy', newToy)
      .then(toy => response.sendJson(res, 204, toy))
      .catch(e => {
        console.error(e);
        response.sendText(res, 400, `bad request; ${e.message}`);
      });
  };
};
