//Note if you see copy overs, it's me copying over from my Lab 9
'use strict';

const debug = require('debug')('http:storage');
const createError = require('http-errors');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

storage.create = function(item) {
  debug('#create');

  return new Promise((resolve, reject) => {
    if(!item.name) return reject(createError(400, 'cannot create; item name required'));
    if(!item.desc) return reject(createError(400, 'cannot create; item desc required'));

    let toy = new Toy(item.name, item.desc);

    return fs.writeFileProm(`${__dirname}/../data/toy//${toy._id}.json`, JSON.stringify(toy))
      .then(() => resolve(toy))
      .catch(reject);
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
        };
      });
      .catch(reject);
  });
};

storage.fetchAll = function(schema) {
  debug('#fetchAll');

};

storage.update = function(schema, item) {
  debug('#update');

};

storage.delete = function(schema, itemId) {
  debug('#storage delete');


};
