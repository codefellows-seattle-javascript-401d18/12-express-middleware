'use strict';

const createError = require('http-errors');
const debug = require('debug')('http:error-middleware');

module.exports = function(err, req, res, next) {
  if(err.status) {
    debug('user error');
    res.status(err.status).send(err.name);
    next();
    return;
  }

  debug('server error');
  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
};

//have to save in order to contine on with Promise
//mongod --dbpath ./data/db <==starts server
//need a mongoDB open, need mongo shell type - mongo
//show dbs - show a list of available databases
// use dbname - switch to a new database
// show collections - show a list of collections from the current database
// db.collection.find() - show all documents in the collection
// db.collection.insert({ <data> }) - insert a new document into the collection
// db.collection.save() - insert a new document or update an existing document in the collection



//db.gooses.find()
//db.gooses.drop() ===>drips everything
