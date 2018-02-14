const express = require('express')
const JSONtoCSV = require(__dirname + '/JSONtoCSV.js');
const router = express.Router();
const workDir = '/Users/slangbro/Code/HackReactor/hrsf90-mini-apps/challenge_2/'

router.get('/', (req, res) => {
  res.sendFile(workDir + 'client/index.html');
})

router.post('/JSON', (req, res) => {

  let input_json = req.body.input_json.replace(/\'/g, '"');

  console.log('/JSON Post received', JSON.parse(input_json));

  res.end(JSONtoCSV.convert());

});

router.post('/', () => (console.log('POST received')));
module.exports = router;




