//Express server here
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
//server static file for get request

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
  //res.end();
});

app.get('/app/bundle.js', (req, res) => {
  res.sendFile(__dirname + '/client/dist/bundle.js');
})

app.use('/app', express.static(__dirname + '/client'));

//routing?  Not needed for MVP
  //later POST win
  //later GET leaderboard


app.listen(3000, ()=>(console.log('Server listening on 127.0.0.1:3000')));

