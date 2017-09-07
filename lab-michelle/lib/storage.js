//Note if you see copy overs, it's me copying over from my Lab 9
'use strict';

const debug = require('debug')('http:storage');
const createError = require('http-errors');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const Toy = require('./model/toy');

const storage = module.exports = {};

storage.create = function(item) {
  debug('#create');

  return new Promise((resolve, reject) => {
    if(!item.name || typeof item.name !== 'string')
      return reject(createError(400, 'cannot create; item name required'));
    if(!item.desc || typeof item.name !== 'string')
      return reject(createError(400, 'cannot create; item desc required'));

    let toy = new Toy(item.name, item.desc);

    return fs.writeFileProm(`${__dirname}/../data/toy/${toy._id}.json`, JSON.stringify(toy))
      .then(() => resolve(toy))
      .catch(err => reject(err));
  });
};

storage.fetchOne = function(itemId) {
  debug('#fetchOne');

  return new Promise((resolve, reject) => {
    if(!itemId) return reject(createError(400,'cannot get item; item id required'));

    return fs.readFileProm(`${__dirname}/../data/toy/${itemId}.json`)
      .then(buff => {
        try {
          let toy = JSON.parse(buff.toString());
          return resolve(toy);
        } catch(e) {
          return reject(e);
        }
      })
      .catch(reject);
  });
};

storage.fetchAll = function(toys) {
  debug('#fetchAll');

  return new Promise((resolve, reject) => {
    return fs.readdirProm(`${__dirname}/../data/toy`)
      .then(filePaths => {
        let data = Array.prototype.map.call(ids, (id => id.split('.', 1).toString()));
        return resolve(data);
      })
      .catch(reject);
  });
};

storage.update = function(itemId, item) {
  debug('#update');



  return new Promise ((resolve, reject) => {
    if(!itemId) return reject(createError(400, 'cannot create; itemId required'));
    if(!item) return reject(createError(400, 'cannot create; item required'));
    if(item._id != itemId) return reject(createError(400, 'cannot update: item ids do not match'));

    return fs.writeFileProm(`${__dirname}/../data/toy/${item._id}.json`, JSON.stringify(item))
      .then(resolve)
      .catch(reject);
  });
};

storage.destroy = function(itemId) {
  debug('#storage delete');

  return new Promise((resolve, reject) => {
    if(!itemId) return reject(createError(400, 'cannot create; item required'));

    return fs.unlinkProm(`${__dirname}/../data/toy/${itemId}.json`)
      .then(resolve)
      .catch(reject);
  });
};
