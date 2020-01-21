const socketio = require('socket.io');

const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;

// Ideal: armazenar em tabela no banco
const connections = [];  //armazenar todas as conexões

exports.setupWebsocket = (server) => { //fazer as 1ªs configurações para o servidor aceitar as requisições no formato websocket
    io = socketio(server);

    io.on('connection', socket => {  //toda vez que receber uma conexão - ouvindo um evento (conexão)
        const { latitude, longitude, techs } = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        });
    });
};

exports.findConnections = (coordinates, techs) => { //vai realizar o filtro das conexões
    return connections.filter(connections => {
        return calculateDistance(coordinates, connection.coordinates) < 10 
            && connection.techs.some(item => techs.includes(item)) //comparando as coordenadas do novo dev cadastrado (coordinates) com as coordenadas armazenadas em cada uma das conexões (connection.coordinates); verificar se essa distância é menor que 10; e a conexão vinda das tecnologias, se pelo menos 1 delas é a mesma do dev recem cadastrado
    })
}

exports.sendMessage = (to, message, data) => {  //to: para quem a mensagem será enviada; message: tipo de mensagem; data: valor da mensagem
    to.forReach(connection => {
        io.to(connection.id).emit(message, data);
    })
}