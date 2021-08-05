const axios = require('axios');
const https = require('https');

class Busquedas {

    historial = ['Azua', 'La vega', 'San jose de ocoa'];

    constructor() {
        //TODO: leer DB si existe
    }

    get paramsMapbox() {

        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsOpenWeather() {

        return {

            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    async ciudad(lugar = '') {

        try {
            //Peticion http:
            // Custom axios 
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox,
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                })
            });

            const resp = await intance.get();
            return resp.data.features.map(({ id, place_name, center }) => ({
                id,
                nombre: place_name,
                lng: center[0],
                lat: center[1]
            })); //regresa los lugares

        } catch (error) {

            return [];
        }

    }

    async climaLugar(lat, lon) {

        try {

            //inntance axios
            const intance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: { lat, lon, ...this.paramsOpenWeather },
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                })
            })

            const { data } = await intance.get();
            const { description } = data.weather[0];
            const { temp, temp_min, temp_max } = data.main;

            //resp.data

            return ({
                description,
                temp,
                temp_min,
                temp_max
            });

        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial( lugar = '' ) {
        //TODO: prevenir duplicados
        this.historial.unshift(lugar);

        //Grabar en DB

    }
}


module.exports = Busquedas;