'use strict';

const debug = require('debug')('http:storage');
const createError = require('http-errors');
const Toy = require('../model/toy');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

const storage = module.exports = {};

storage.create = function(item) {
  debug('#create');

  return new Promise((resolve, reject) => {
    if(!item.name) return reject(createError(400, 'cannot create; name required'));
    if(!item.desc) return reject(createError(400, 'cannot create; desc required'));

    let toy = new Toy(item.name, item.desc);

    return fs.writeFileProm(`${__dirname}/../data/toy/${toy._id}.json`, JSON.stringify(toy))
      .then(() => resolve(toy))
      .catch(err => reject(createError(500, err.message)));
  });
};

storage.fetchOne = function(itemId) {
  debug('#fetchOne');

  return new Promise((resolve, reject) => {
    if(!itemId) return reject(createError(400, 'cannot get item; itemId required'));

    return fs.readFileProm(`${__dirname}/../data/toy/${itemId}.json`)
      .then(buff => {
        try {
          let toy = JSON.parse(buff.toString());
          return resolve(toy);
        } catch(e) {
          return reject(e);
        }
      })
      .catch(err => reject(createError(404, err.message)));
  });
};

storage.fetchAll = function() {
  debug('#fetchAll');

  return fs.readdirProm(`${__dirname}/../data/toy`)
    .then(files => files.map(name => name.split('.json')[0]))
    .catch(err => Promise.reject(createError(404, err.message)));
};

storage.update = function(item) {
  debug('#update');

  return new Promise((resolve, reject) => {
    if(!item._id) return reject(createError(400, 'cannot update; item ID required'));

    return fs.writeFileProm(`${__dirname}/../data/toy/${item._id}.json`, JSON.stringify(item))
      .then(() => resolve(item))
      .catch(err => reject(createError(404, err.message)));
  });
};

storage.remove = function(itemId) {
  debug('#storage.remove');

  return new Promise((resolve, reject) => {
    if(!itemId) return reject(createError(400, 'cannot delete item; itemId required'));

    return fs.unlinkProm(`${__dirname}/../data/toy/${itemId}.json`)
      .then(resolve('Item deleted'))
      .catch(err => reject(createError(404, err.message)));
  });
};
