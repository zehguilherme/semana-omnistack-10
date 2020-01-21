import React from 'react';           //importação do React. É feito isso em todo arquivo javascript que for usar HTML dentro dele
import ReactDOM from 'react-dom';    //ReactDOM (usado no navegador): da a possibilidade do React se comunicar com a árvore elementos da aplicaçao (DOM - HTML)
import App from './App';

// <App /> - JSX (Javascript + XML (HTML) )
ReactDOM.render(<App />, document.getElementById('root'));  //ReactDOM renderiza (desenha / coloca) o App (HTML) dentro da div com id de nome 'root'
