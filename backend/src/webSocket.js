const socketio = require('socket.io');

exports.setupWebsocket = (server) => { //fazer as 1ªs configurações para o servidor aceitar as requisições no formato websocket
    const io = socketio(server);

    io.on('connection', socket => {  //toda vez que receber uma conexão - ouvindo um evento (conexão)
        console.log(socket.id);
        console.log(socket.handshake.query);

        setTimeout(() => {
            socket.emit('message', 'Hello');
        }, 3000);
    })
};