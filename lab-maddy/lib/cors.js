'use strict';

module.exports = function(req, res, next) {
  res.append('Allow-Access-Control-Origin', '*');//whitelisting for all other domains to interact with our API
  res.append('Allow-Access-Control-Headers', '*');
  next();
};
