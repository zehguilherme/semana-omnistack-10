import React, {useState, useEffect} from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './SideBar.css';
import './Main.css';

import DevForm from './componentes/DevForm';
import DevItem from './componentes/DevItem';

// 3 conceitos principais do React (tudo é baseado neles)

// COMPONENTE: Exemplo (App). Função que retorna algum conteúdo, exemplo HTML, CSS, Javascript (interface). Primeira letra sempre maiúscula
// Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação
// Quando deve ser criado:
// -  quando há repetição do mesmo trecho de código muitas vezes (3 vezes ou mais);
// -  quando conseguimos isolar um pedaço da aplicação (HTML, CSS, JS) dentro de algo que não interfira em nenhum resto do funcionamento do restante dos outros componentes;

// PROPRIEDADE: informações que um componenete PAI passa para o componente filho
// exemplo PAI: App ()
// exemplo FILHO: <Header title="Título 1"/>


// ESTADO: Informação mantida pelo componente, que será lida e atualizada por ele mesmo (Lembrar: imutabilidade)


// useState: função usada peçlo React para criar estados
// retorna um vetor com 2 informações [variável, função que será usada para atualizar o valor da variável]

// useEffect: serve para disparar um função toda vez que uma informação ser alterada
// 2 parâmetros: useEffect(qual função irá executar, quando ela será executada)


// Tdda função que é própria de um elemento deve ser criada dentro dele

// Função que retorna um conteúdo HTML (JSX - (Javascript + XML (HTML)) )
function App() {
  const [devs, setDevs] = useState([]);  //inicializado com o mesmo formato de campo do dev (array)

  // Busca os devs da API - deve ocorrer apenas uma única vez dentro do ciclo de renderização do componente
  useEffect( () => {
    async function loadDevs() {  //carregar os devs da API
      const response = await api.get('/devs');  //retorna toda a lista de devs

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {  //disparada no submit (botão) do formulário

    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);  //adição do próximo dev cadastrado no formulário, colocando a sua resposta vinda da API no final do vetor que seta o dev
  }

  return (
    <div id="app">
      <aside>  {/* usada para fazer uma barra lateral, no caso a esquerda*/}
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>

      <main>  {/* lista de devs a direita*/}
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))} {/*percorrer o array devs e retornar o li e seu conteúdo*/}
        </ul>
      </main>
    </div>
    );
}

export default App;  //todo componente criado deve ser exportado
