import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';
import { connect, disconnect } from '../services/socket';

// requestPermissionsAsync: pede permissões para o usuário para poder usar a localização dele
// getCurrentPositionAsync: pega a posição do usuário
// Marker: marcação dos usuários dentro do mapa (pino de localização)
// TouchableOpacity: botão que quando clicado, diminuirá um pouco a opacidade

function Main ({ navigation }) {
    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [techs, setTechs] = useState('');
    
    useEffect(() => {
        async function loadInitialPosititon() { //carrega a posição inicial no mapa
             const { granted } = await requestPermissionsAsync();  //granted: se o usuário deu ou não permissão para acessar a sua localização
    
             if(granted) {  //caso tenha dado permissão
                const { coords } = await getCurrentPositionAsync({  //pega a posição dele
                    enableHighAccuracy: true,  //usa a localização do GPS do celular (mais precisa)
                });
    
                const { latitude, longitude } = coords;  //pegar apenas a latitude e longitude das coordenadas
    
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,  //cálculos navais para se obter um zoom no mapa
                    longitudeDelta: 0.04,
                });
             }
        }
    
        loadInitialPosititon();
    }, []);

    function setupWebSocket() {
        const { latitude, longitude } = currentRegion;

        connect(
            latitude,
            longitude,
            techs,
        );
    }

    async function loadDevs() {  //carregar o devs da API
        const { latitude, longitude } = currentRegion;

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        });

        setDevs(response.data.devs);

        setupWebSocket();
    }

    function handleRegionChanged(region) {  //atualiza as coordenadas sempre que o usuário alterá-las no mapa
        setCurrentRegion(region);
    }

    if(!currentRegion){ //enquanto a localização não existir
       return null; //não rederizará nada na tela
    }

    // autoCapitalize: coloca a 1ª letra de cada palavra em caixa alta (maiúscula)
    // onRegionChangeComplete: é passado um função que será executada quando o usuário mudar a localização dele no mapa

    return (
        <>
        <MapView 
            onRegionChangeComplete={handleRegionChanged} 
            initialRegion={currentRegion} 
            style={styles.map}
        >
            {devs.map(dev => (
                <Marker 
                key={dev._id}
                coordinate={{ 
                    longitude: dev.location.coordinates[0],
                    latitude: dev.location.coordinates[1],
                }}
            >
                <Image style={styles.avatar} source={{ uri: dev.avatar_url }}></Image>

                <Callout onPress={() => {
                    //navegação
                    navigation.navigate('Profile', { github_username: dev.github_username })  //página que será chamada ao pressionar o botão
                }}>
                    <View styles={styles.callout}>
                        <Text style={styles.devName}>{dev.name}</Text>
                        <Text style={styles.devBio}>{dev.bio}</Text>
                        <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                    </View>
                </Callout>
            </Marker>
            ))}
        </MapView>

        <View style={styles.searchForm}>
            <TextInput 
                style={styles.searchInput}
                placeholder="Buscar devs por techs..."
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={techs}
                onChangeText={setTechs}>
            </TextInput>

            <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                <MaterialIcons name="my-location" size={20} color="#FFF"></MaterialIcons>
            </TouchableOpacity>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1 //mapa ocupa a tela inteira
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },

    callout: {
        width: 260,
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    devBio: {
        color: '#666',
        marginTop: 5,
    },

    devTechs: {
        marginTop: 5,
    },

    searchForm: {
        position: 'absolute',  //vai flutuar por cima do formulário
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,  //força para que fique por cima do mapa
        flexDirection: 'row',
    },

    searchInput: {
        flex: 1,  //ocupar o máximo de espaço possível
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',  //IOS
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 4,  //Android
    },

    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4Dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
});

export default Main;