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


module.exports.get = function(callback) {
  let scores = Score.find({}, (err, data) => {
    if (err) {
      throw err;
    } else {
      console.log('retrieve from mongoDB', data);
      callback(data);
    }
  })
};

module.exports.post = function(player, points) {
  console.log('posting new score to MongoDB');
  let newScore = new Score({name: player, score: points});
  newScore.save();

};

initDB();