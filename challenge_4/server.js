const express = require('express');
const app = express();
const scoreData = require('./server/scoreData.js');
const bodyParser = require('body-parser');


app.use(bodyParser.json());//urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.use('/bowling', express.static(__dirname + '/client'));

app.get('/bundle.js', (req, res) => {
  res.sendFile(__dirname + '/client/dist/bundle.js');
});

app.get('/scores', (req, res) => (scoreData.get(req, res)));

app.post('/scores', (req, res) => (scoreData.post(req, res)));


app.listen(3000, ()=>(console.log('Server live at 127.0.0.1:3000')));