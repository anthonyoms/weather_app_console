const fs = require('fs');
const axios = require('axios');
const https = require('https');

class Busquedas {

    historial = [];
    dbPath = './db/database.json';

    constructor() {

        this.leerDB();
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

    get historialCapitalizado() {
        //Historial capitalizado
        return this.historial.map(lugar => {
            let palabra = lugar.split(' ');
            palabra = palabra.map(p => p[0].toUpperCase() + p.substring(1));

            return palabra.join(' ');
        });
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

    agregarHistorial(lugar = '') {

        if (this.historial.includes(lugar.toLowerCase())) {
            return;
        }

        this.historial.unshift(lugar.toLowerCase());

        //Grabar en DB

        this.guardarDB();

    }

    guardarDB() {

        const payload = {
            historial: this.historial
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB() {

        if (!fs.existsSync(this.dbPath)) return null;
   
        const { historial } = JSON.parse(fs.readFileSync(this.dbPath, { encoding: 'utf-8' }));
        this.historial = historial;

    }
}


module.exports = Busquedas;