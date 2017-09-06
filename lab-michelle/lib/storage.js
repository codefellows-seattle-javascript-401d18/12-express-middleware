//Note if you see copy overs, it's me copying over from my Lab 9
'use strict';

const debug = require('debug')('http:storage');
const createError = require('http-errors');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const Toy = require('../model/toy')

//why is it complaining about storage - we're IN storage?
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
        }
      })
      .catch(reject);
  });
};

storage.fetchAll = function(toys) {
  debug('#fetchAll');

  if(!toys) return reject (createError(400, 'cannot get items: created items required'));

  return fs.readdirProm(`${__dirname}/../data/toy`)
    .then(ids => {
      let data = Array.prototype.map.call(ids, (id => id.split('.', 1).toString()));//not sure what should go here - it's got to grab all the toys in the toy folder so grab by id like suggested in the code??
      return resolve(data);
    })
    .catch(reject);
};

storage.update = function(schema, item) {
  debug('#update');

  if(!schema) return reject(createError(400, 'cannot create; schema required'));
  if(!item) return reject(createError(400, 'cannot create; item required'));

  return fs.writeFileProm(`${__dirname}/../data/toy/${item._id}.json`, JSON.stringify(item))
    .then(resolve)
    .catch(reject);
};

storage.destroy = function(schema, itemId) {
  debug('#storage delete');
  if(!schema) return reject(createError(400, 'cannot create; schema required'));
  if(!item) return reject(createError(400, 'cannot create; item required'));

  return fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`)
    .then(resolve)
    .catch(reject);

};
