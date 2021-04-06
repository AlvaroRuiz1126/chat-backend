//CONFIGURACION PARA EL SERVIDOR DE EXPRESS
const express = require('express');

//CONIGURACION PARA EL SERVIDOR DE SOCKETS
const http = require('http');

//CONFIGURACION PARA EL SOCKET SERVER
const socketio = require('socket.io');

//PARA TRABAJAR CON RUTAS DE DIRECTORIOS
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //connect to DB
        dbConnection();

        //http server
        this.server = http.createServer(this.app);

        //configuracion del socket
        this.io = socketio(this.server);
    }

    middlewares() {
        //Desplegar el directorio publico
        this.app.use(express.static(path.resolve(__dirname, '../public')));

        this.app.use(cors());

        //parseo del body
        this.app.use(express.json());

        //API endpoints
        this.app.use('/api/login', require('../routers/auth'));
        this.app.use('/api/messages', require('../routers/messages'));
    }

    socketConfiguration() {
        new Sockets(this.io);
    }

    execute() {
        //INIT MIDDLEWARES
        this.middlewares();

        //INIT SOCKETS
        this.socketConfiguration();

        //INIT SERVER
        this.server.listen(this.port, () => {
            console.log('Server en el puerto ', this.port);
        });
    }
}

module.exports = Server;