const mongoose = require('mongoose');
const scoresDb = require('./scoresDb.js')

module.exports.get = function(req, res) {
  scoresDb.get((data) => (res.json(data)));
  //res.end('GET');
};

module.exports.post = function(req, res) {
  console.log('req.body', req.body);
  scoresDb.post(req.body.name, req.body.score);
  res.end('POST');
};
