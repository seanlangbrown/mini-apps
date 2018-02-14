//Express server here
const express = require('express');
const app = express();
//server static file for get request

//app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendfile('client/index.html');
});
app.get('/app', express.static('client'));

//routing?  Not needed for MVP
  //later POST win
  //later GET leaderboard


app.listen(3000, ()=>(console.log('Server listening on 127.0.0.1:3000')));

