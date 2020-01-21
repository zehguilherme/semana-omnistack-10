// Funções do controler: index, show, store, update, destroy

// index: mostrar uma lista de dev
// show: mostrar um único desenvolvedor
// store: criar dev
// update: alterar dev
// destroy: deletar dev

const axios = require('axios');                                     //biblioteca que faz chamadas para outras APIs
const Dev = require('../models/Dev');                               //Dev no BD
const parseStringAsArray = require('../utils/parseStringAsArray');  //função criada em parseStringAsArray.js
const { findConnections, sendMessage } = require('../webSocket');


module.exports = {

    // index: mostrar uma lista de dev
    async index (request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    // store: criar dev
    async store (request, response) {  //async - a função pode demorar para responder pois a chamada a API do github pode demorar para responder também
    
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });  //procura um dev com o mesmo username

        //verifica se já existe um dev com o mesmo username (se o mesmo ja foi cadastrado)
        if (!dev) {  //se ele não existir, então será criado no banco

            // await - vai aguardar a requisição a API do github responder
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);  //uso de craze (``) para poder usar variáveis (github_username) dentro da string
        
            const { name = login, avatar_url, bio } = apiResponse.data; //se name não existir, receberá o valor de login (obrigatório no cadastro do git)
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({  //dev: retorno das informações do banco
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

            // filtrar as conexões que que estão a no máximo 10 Km de distância e que o novo dev tenha pelo menos 1 das tecnologias filtradas
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }
    
        return response.json(dev);
    },

    // // update: alterar dev
    // async update(request, response) {

    //     name
    //     avatar_url
    //     bio
    //     location
    //     techs

    // },

    // // destroy: deletar dev
    // async destroy(request, response) {

    // }
};
