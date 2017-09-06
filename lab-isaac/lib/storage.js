'use strict';

const debug = require('debug')('http:storage');
const createError = require('http-errors');
const Toy = require('../model/toy');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

// fs.readFileProm(`${__dirname}/../data/${schema}/${item_id}.json)
// .then(...)
// .catch(...)

const storage = module.exports = {};

storage.create = function(item) {
  debug('#create');

  return new Promise((resolve, reject) => {
    if(!item.name) return reject(createError(400,'cannot create; name required'));
    if(!item.desc) return reject(createError(400,'cannot create; desc required'));

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

storage.fetchAll = function() {
  debug('#fetchAll');
  return new Promise((resolve, reject) => {
    fs.readdirProm(`${__dirname}/../data/toy/`)
      .then(files => {
        let data = [];
        files.forEach(id => {
          let _id = id.split('.')[0];
          data.push(_id);
        });
        return resolve(data);
      })
      .catch(reject);
  });
};

storage.update = function(schema, item) {
  debug('#update');

  // return new Promise((resolve, reject) => {
  //   if(!schema) return reject(new Error('cannot update item; schema required'));
  //   if(!item) return reject(new Error('cannot update item; item required'));
  // });
};

storage.destroy = function(schema, item) {
  debug('#destroy');
};
