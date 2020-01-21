const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

// Formato do Dev no BD

const DevSchema = new mongoose.Schema({  // Schema: estruturação de uma entidade dentro de um banco de dados
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],  //array strings
    location: {  //latitude e longitude
        type: PointSchema,
        index: '2dssphere'
    }
});

// Dev: Nome salvo no banco
module.exports = mongoose.model('Dev', DevSchema);