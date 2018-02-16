const mongoose = require('mongoose');
const scoresDb = require('./scoresDb.js')

module.exports.get = function(req, res) {
  scoresDb.get();
  res.end('GET');

};

module.exports.post = function(req, res) {
  scoresDb.post(req.data.name, req.data.score);
  res.end('POST');

};
