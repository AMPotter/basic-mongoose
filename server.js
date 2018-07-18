/* eslint no-console: off */
require('dotenv').config();
const { createServer } = require('http');
const connect = require('./lib/connect');
connect('mongodb://localhost:27017/guitars');
const app = require('./lib/app');

const PORT = process.env.PORT || 3000;
const server = createServer(app);

server.listen(PORT, () => {
    console.log('server running on port:', server.address().port);
});