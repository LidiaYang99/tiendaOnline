// RUTA
const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('holllaa test')
});

app.use('/api', require('./routes/api'))




module.exports = app;
