const express = require('express')
const router = express.Router();
const workDir = '/Users/slangbro/Code/HackReactor/hrsf90-mini-apps/challenge_2/'

router.get('/', (req, res) => {
  res.sendFile(workDir + 'client/index.html');
})

router.get('/JSON', (req, res) => {
  console.log('/JSON Post received');

});

router.post('/', () => (console.log('POST received')));
module.exports = router;




