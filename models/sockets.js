const { userConnect, userDisconnect, getUsers, saveMessage } = require("../controllers/sockets");
const { verifyJWT } = require("../helpers/jwt");

class Sockets {
    //el io que se requiere para ejecutar los sockets, lo recibimos como argumento que se pasa atraves de la clase server
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        //ON CONNECTION
        this.io.on('connection', async (socket) => {
            //console.log(socket.handshake.query['x-token']);
            const [valido, uid] = verifyJWT(socket.handshake.query['x-token']);

            if(!valido){
                console.log("Socket no identificado");
                return socket.disconnect();
            }

            await userConnect(uid);

            //unir a un usuario a una sala de socket.io
            socket.join(uid)

            this.io.emit('lista-usuarios', await getUsers());

            socket.on('mensaje-personal', async (payload) => {
                const message = await saveMessage(payload);
                //aca estamos enviando el mensaje a la sala que tiene el uid mediante el io.to
                this.io.to(payload.para).emit('mensaje-personal', message);
                this.io.to(payload.de).emit('mensaje-personal', message);
            });
            
            //console.log("Cliente conectado", uid);
            socket.on('disconnect', async () => {
                await userDisconnect(uid);

                this.io.emit('lista-usuarios', await getUsers());
                //console.log("cliente desconectado");
            });
        });
    }
}

module.exports = Sockets;