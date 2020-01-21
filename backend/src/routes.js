// request: requisição - tudo o que vem de frontend (cliente)
// response: resposta a ser devolvida ao cliente (frontend) pelo back-end

const { Router } = require('express');                                 //importação do módulo de roteamento do express
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index);    //Buscar dados na API (mostrar lista de devs)
routes.post('/devs', DevController.store);   //Criação do dev

routes.get('/search', SearchController.index);  //rota de busca

module.exports = routes;                       //exporta o objeto routes