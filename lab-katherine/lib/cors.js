'use strict'

//appending to response a set of headers - a whitelist for all origin locations to access our api and all headers to access our api

//could lock down with res.append('Allow-Access-Control-Origin', 'https://mydomain.com')

module.exports = function(req, res, next) {
  res.append('Allow-Access-Control-Origin', '*')
  res.append('Allow-Access-Control-Headers', '*')
  next()
}
