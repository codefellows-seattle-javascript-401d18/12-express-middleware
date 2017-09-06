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
      .catch(reject);
  });
};


storage.fetchOne = function(itemId) {
  debug('#fetchOne');

  return new Promise((resolve, reject) => {
    if(!itemId) return reject(createError(400, 'cannot get item; itemId required'));

    return fs.readFileProm(`${__dirname}/../data/toy/${itemId}.json`)
      .then(buff => resolve(JSON.parse(buff.toString())))
      .catch(err => {
        console.error(err);
        return err;
      });
  });
};

storage.fetchAll = function(schema) {
  debug('#fetchAll');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot get items; schema required'));
    return fs.readdirProm(`${__dirname}/../data/${schema}`)
      .then(ids => {
        let data = Array.prototype.amp.call(ids, (id => id.split('.', 1).toString));
        return resolve(data);
      })
      .catch(reject);
  });

};

storage.update = function(schema, item) {
  debug('#update');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot update item: schema required'));
    if(!item) return reject(new Error('cannot update item: updated item required'));

    let json = JSON.stringify(item);

    return fs.writeFileProm(`${__dirname}/..data/${schema}/${item._id}.json`, json)
      .then(() => resolve(json))
      .catch(console.error);
  });
};

storage.delete = function(schema, id) {
  return new Promise((resolve, reject) => {
    debug('#delete');
    if(!schema) return reject(new Error('cannot create; schema required'));
    if(!id) return reject(new Error('cannot create; item required'));

    if (id){

      fs.unlinkProm(`${__dirname}/../data/${schema}/${id}.json`)
        .then(() => {
          resolve(id);
        })
        .catch((err) => {
          return reject(err);
        });
    }
  });
};

storage.put = function(schema, id) {
  debug('#put');
  if(!schema) return Promise.reject(new Error('cannot update; schema required'));
  if(!id) return Promise.reject(new Error('cannot update; id required'));

  let json = JSON.stringify(id);

  if(id) {
    fs.writeFileProm(`${__dirname}/../data/${schema}/${id._id}.json`, json);
    return Promise.resolve(id);
  }
};
