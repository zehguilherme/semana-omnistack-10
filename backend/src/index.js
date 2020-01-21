/********************************************************************************************************************************************************************/

// Métodos HTTP: GET, POST, PUT, DELETE

// GET - buscar informações
// POST - criar/cadastrar alguma informação
// PUT - editar um recurso da aplicação
// DELETE - deletar um recurso da aplicação

/********************************************************************************************************************************************************************/

// Tipos de parâmetros

// Query Params: request.query (Usados pelo GET; Filtros, ordenação, paginação...)
// Route Params: request.params (PUT e DELETE; Identificar um recurso na alteração ou remoção)
// Body: request.body (POST e PUT; Dados para criação ou alteração de um registro)

/********************************************************************************************************************************************************************/

const express = require('express');  //express: manipula as rotas (URL) que serão gerenciadas pelo servidor
const mongoose = require('mongoose');
const cors = require('cors');  //possibilita com que o backend seja acessado pelo front (Node seja acessado pelo React)
const http = require('http');

const routes = require('./routes');
const { setupWebsocket } = require('./webSocket')

const app = express();               //cria a aplicação usando express
const server = http.Server(app);   //servidor http está fora do express

setupWebsocket(server);

//use: algo que vai ser válido para todas as rotas da aplicação

app.use(cors())
app.use(express.json());  // express para a entender requisições json (deve estar sempre no começo)
app.use(routes);          //rotas da aplicação cadastradas

// Conexão ao MongoDB (mongoose)
mongoose.connect('mongodb+srv://joset:97j23g28t@cluster0-cobdq.mongodb.net/semanaomnistack10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

server.listen(3333);  //porta a ser usada pelo servidor