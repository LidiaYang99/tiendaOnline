//  SERVIDOR

const http = require('http');
const app = require('./src/app');


// config de dotenv
require('dotenv').config();

// config de base de datos - mongodb
require('./src/config/db');

// creamos el servidor 
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

// no olvides este!!! para escuchar el servidor!!!
server.listen(PORT);

server.on('listening', () => {
    console.log(`servidor escuchando en puerto ${PORT}`);
})


server.on('error', (err) => {
    console.log(err);
})

