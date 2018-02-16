const mongoose = require('mongoose');

let Score;

initDB = function() {
  mongoose.connect('mongodb://127.0.0.1/bowling');
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('database connected');
    let scoresSchema = mongoose.Schema({
      name: String,
      /*scoreCard: {}*/
      score: Number
    });
    Score = mongoose.model('score', scoresSchema);
  });
};


module.exports.get = function() {

};

module.exports.post = function(player, points) {
  let newScore = new Score({name: player, score: points});
  newScore.save();

};

initDB();