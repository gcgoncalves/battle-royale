const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

const path = __dirname + '/dist/';
app.use(express.static(path));

app.listen(port);
console.log('Server started at http://localhost:' + port);
