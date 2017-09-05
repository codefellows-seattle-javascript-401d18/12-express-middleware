'use strict'

const debug = require('debug')('http:storage')
const Promise = require('bluebird')
const createError = require('http-errors')
const Toy = require('../model/toy')
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'})

// fs.readFileProm(`${__dirname}/../data/${schema}/${item_id}.json)
// .then(...)
// .catch(...)

const storage = module.exports = {}

storage.create = function(schema, item) {
  debug('#create')

  // debugger
  return new Promise((resolve, reject) => {
    if(!schema) return reject(createError('cannot create; schema required'))
    if(!item.name) return reject(createError(400, 'cannot create; name required'))
    if(!item.desc) return reject(createError(400, 'cannot create; desc required'))

    let toy = new Toy(item.name, item.desc)

    return fs.writeFileProm(`${__dirname}/../data/toy/${toy._id}.json`, JSON.stringify(toy))
      .then(() => resolve(toy))
      .catch(reject)
  })
}

storage.fetchOne = function(schema, itemId) {
  debug('#fetchOne')
  return new Promise((resolve, reject) => {
    // if(!schema) return reject(new Error('cannot get item; schema required'))
    if(!itemId) return reject(createError(400, 'cannot get item; itemId required'))

    return fs.readFileProm(`${__dirname}/../data/toy/${itemId}.json`)
      .then(buff => {
        try {
          let toy = JSON.parse(buff.toString())
          return resolve(toy)
        } catch(e) {
          return reject(e)
        }
      })
      .catch(reject)
  })
}

storage.fetchAll = function() {

}

storage.update = function(schema, item) {
  debug('#update')

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot update item; schema required'))
    if(!item) return reject(new Error('cannot update item; updated item required'))
  })
}

storage.delete = function(schema, itemId) {
  debug('#delete')
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot get item; schema required'))
    if(!itemId) return reject(new Error('cannot get item; itemId required'))

    return fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`)
      .then(() => resolve())
      .catch(err => {
        console.error(err)
        return err
      })
  })
}
