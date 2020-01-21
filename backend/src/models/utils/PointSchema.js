const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],  //location.type do tipo 'Point'
        required: true  // campo é obrigatório
    },
    coodinates : {
        type: [Number],  //Array números
        required: true  //campo é obrigatório
    },
});

module.exports = PointSchema;