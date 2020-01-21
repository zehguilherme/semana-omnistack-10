import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Importação das páginas da aplicação
import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main, //qual componente será renderizado
            navigationOptions: {  //opções específicas dessa tela
                title: 'DevRadar'
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil no Github'
            }
        }
    }, {
        defaultNavigationOptions: {  //opções de navegação aplicadas a todas as telas
            headerTintColor: '#FFF',
            headerStyle: {
                backgroundColor: '#7d40e7'
            }
        }
    })
);

export default Routes;  //exportar as rotas