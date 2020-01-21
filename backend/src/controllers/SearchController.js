const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        // Buscar todos devs num raio de 10 Km
        // Filtrar por tecnologias
        
        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);

        // lista devs - com filtros dessa vez
        const devs = await Dev.find({
            techs: {  //techs que estejam dentro de $in
                $in: techsArray,
            },
            location: {
                $near: {  //perto
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000, //10 Km - 10.000 metros
                },
            },
        });

        return response.json({ devs });
    }
}