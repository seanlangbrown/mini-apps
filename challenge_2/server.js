const express = require('express');

const app = express();


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
})

app.listen(3000, () => (console.log('Server live: http://127.0.0.1:3000')));

