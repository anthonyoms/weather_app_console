const axios = require('axios');

class Busquedas {

    historial = ['Azua', 'La vega', 'San jose de ocoa'];

    constructor() {
        //TODO: leer DB si existe
    }

    async ciudad(lugar = '') {
        //peticion http
        // console.log('ciudad:',lugar);
        try {

            const resp = await axios.get(`https://reqres.in/api/users?page=2`);
            console.log(resp);

        } catch (error) {
            
            console.log(error);
        }


        return []; //regresa los lugares
    }



}







module.exports = Busquedas;