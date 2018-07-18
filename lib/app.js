const express = require('express');
const app = express();

const path = require('path');
const publicDir = path.resolve(__dirname, '../public');

app.use(express.static(publicDir));
app.use(express.json());

const guitar = require('./routes/guitars');
app.use('/api/guitars', guitar);

module.exports = app;