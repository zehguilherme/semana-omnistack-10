// split: corta o array no momento que encontra a ','
// map: percorre o array
// trim: remove espaçamentos antes e depois de uma string


// Isolamento da função que usa várias vezes no código
module.exports = function parseStringAsArray(arrayAsString) {  //recebe um array como string
    return arrayAsString.split(',').map( techs => techs.trim() );
}