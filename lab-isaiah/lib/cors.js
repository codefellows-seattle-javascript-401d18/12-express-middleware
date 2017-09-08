'use strict';

module.exports = function (req, res, next) {
  res.append('Allow-Access-Control-Origin', '*');
  res.appent('Allow-Access-Control-Origin', '*');
  next();
};
