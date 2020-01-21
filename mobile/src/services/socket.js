import socketio from 'socket.io-client';

const socket = socketio('http://192.168.15.24:3333', {
    autoConnect: false,
});

function subscribeToNewDevs(subscribeFunction) {  //ouvir o evento new-dev
    socket.on('new-dev', subscribeFunction);
}

// conexão 
function connect(latitude, longitude, techs) {
    socket.io.opts.query = {
        latitude,
        longitude,
        techs,
    };

    socket.connect();
}

// desconexão
function disconnect () {
    if(socket.connected)
        socket.disconnect();
}

export {
    connect,
    disconnect,
    subscribeToNewDevs,
};