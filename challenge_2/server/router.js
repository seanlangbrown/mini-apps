const express = require('express')
const JSONtoCSV = require(__dirname + '/JSONtoCSV.js');
const router = express.Router();
const workDir = '/Users/slangbro/Code/HackReactor/hrsf90-mini-apps/challenge_2/'

router.get('/', (req, res) => {
  res.sendFile(workDir + 'client/index.html');
})

router.get('/CSV', (req, res) => {
  console.log('GET received', req.query.csv_id);
  let status = JSONtoCSV.jobStatus(req.query.csv_id);
  if(status !== 'complete') {
    res.end(status);
  } else {
    console.log('sending file', JSONtoCSV.makeCSVfilename(req.query.csv_id));
    res.sendFile(JSONtoCSV.makeCSVfilename(req.query.csv_id));
  }
});

router.post('/JSON', (req, res) => {

  let input_json = req.body.input_json.replace(/\'/g, '"');

  console.log('/JSON Post received', input_json);

  //check validity
  //assign id
  let id = JSONtoCSV.newJob(input_json);

  res.end(id);

  

  //process JSON

});

router.post('/', () => (console.log('POST received')));
module.exports = router;




