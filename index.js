//CONFIGURACION PARA CREAR EL SOCKTER SERVER, SE ENCUENTRA EN LA PAGINA DE NPM
// //CONFIGURACION PARA EL SERVIDOR DE EXPRESS

// const express = require('express');
//const app = express();

// //CONIGURACION PARA EL SERVIDOR DE SOCKETS
// const server = require('http').createServer(app);

// //CONFIGURACION PARA EL SOCKET SERVER
// const io = require('socket.io')(server);

// //Desplegar el directorio publico
// app.use(express.static(__dirname + '/public'));

const Server = require('./models/server');
require('dotenv').config();

const server = new Server();

server.execute();

//un argumento de la funcion es socket, hace referencia al cliente que se conecta
// io.on('connection', (socket) => {
//     console.log(socket.id);
    
//     //.emit sirve para emitir un evento en el socket
//     // socket.emit('mensaje-bienvenida', {
//     //     msg: 'Bienvenido al server',
//     //     date: new Date()
//     // });

//     socket.on('mensaje-cliente', (data) => {
//         console.log(data);

//         socket.emit('mensaje-server', data);
//     })
// });
// server.listen(8080, () => {
//     console.log('Server en el puerto 8080');
// });