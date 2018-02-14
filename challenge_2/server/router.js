const express = require('express')
const JSONtoCSV = require(__dirname + '/JSONtoCSV.js');
const router = express.Router();
const workDir = '/Users/slangbro/Code/HackReactor/hrsf90-mini-apps/challenge_2/'

router.get('/', (req, res) => {
  res.sendFile(workDir + 'client/index.html');
})

router.get('/CSV', (req, res) => {
  console.log('GET received', req.url);
  res.json('processing');
  res.end();
  /*
  if(done) {
  res.sendFile(workDir + '/CSV/' + req.body.id);
  } else if (processing) {
    res.statusCode(401).send('file processing');
  } else if (error) {
    res.statusCode(405).send('error processing');
  }*/
});

router.post('/JSON', (req, res) => {

  let input_json = req.body.input_json.replace(/\'/g, '"');

  console.log('/JSON Post received', input_json);

  //check validity
  //assign id
  let id = '100';

  res.end(id);

  

  //process JSON

});

router.post('/', () => (console.log('POST received')));
module.exports = router;




