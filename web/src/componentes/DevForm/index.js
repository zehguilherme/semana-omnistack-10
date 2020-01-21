import React, { useState, useEffect } from 'react';

import './styles.css'

function DevForm( { onSubmit } ) {
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    // Coordenadas do usuário
    useEffect( () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {  //sucesso na obtenção da posição do usuário
            const { latitude, longitude } = position.coords;

            setLatitude(latitude);  //sempre que esses valores são setados, serão atualizados os valores das const[latitude, setLatitude]
            setLongitude(longitude);
        },
        (err) => {
            console.log(err);
        },
        {  //parâmetros para o getCurrentPosition
            timeout: 30000,
        }
      )  // Pegar posição atual do usuário pela API do Google
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();  //previne o comportamento padrão do formulário dentro do HTML

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
        });

        // limpar campos após o preenchimento
        setGithubUsername('');
        setTechs('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input
                name="github_username"
                id="github_username"
                required
                value={github_username}
                onChange={e => setGithubUsername(e.target.value)}>
            </input>
            </div>

            <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
                name="techs" 
                id="techs" 
                required
                value={techs}
                onChange={e => setTechs(e.target.value)}>
            </input>
            </div>

            <div className="input-group">
            <div className="input-block">
                <label htmlFor="latitude">Latitude</label>
                <input
                type="number"
                name="latitude"
                id="latitude"
                required
                value={latitude}
                onChange={e => setLatitude(e.target.value)}>
                </input>
            </div>

            <div className="input-block">
                <label htmlFor="longitude">Longitude</label>
                <input
                type="number"
                name="longitude"
                id="longitude"
                required
                value={longitude} onChange={e => setLongitude(e.target.value)}>
                </input>
            </div>
            </div>

            <button type="submit">Salvar</button>

        </form>
    );
}

export default DevForm;