const express = require('express');
const router = require('server/router.js');

const app = express();

app.use(bodyParser.json());

app.use(router);

app.listen(3000, () => (console.log('Server live: http://127.0.0.1:3000')));

