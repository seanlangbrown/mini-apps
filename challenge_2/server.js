const express = require('express');
var bodyParser = require('body-parser');
//var static = require('express.static');
const router = require(__dirname + '/server/router.js');

const app = express();

app.use(bodyParser.json());
app.use('/client', express.static(__dirname + '/client'));

app.use(router);

app.listen(3000, () => (console.log('Server live: http://127.0.0.1:3000')));

