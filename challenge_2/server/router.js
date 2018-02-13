const express = require('express')
//const JSONtoCSV = require('JSONtoCSV.js');
const router = express.Router();
const workDir = '/Users/slangbro/Code/HackReactor/hrsf90-mini-apps/challenge_2/'

router.get('/', (req, res) => {
  res.sendFile(workDir + 'client/index.html');
})

router.post('/JSON', (req, res) => {

  console.log('/JSON Post received', req.body);

  res.end(/*JSONtoCSV.convert(req.body)*/);

});

router.post('/', () => (console.log('POST received')));
module.exports = router;




