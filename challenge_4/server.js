const express = require('express');
const app = express();


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.use('/bowling', express.static(__dirname + '/client'));

app.get('/bundle.js', (req, res) => {
  res.sendFile(__dirname + '/client/dist/bundle.js');
});


app.listen(3000, ()=>(console.log('Server live at 127.0.0.1:3000')));