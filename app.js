const {leerInput, inquirerMenu, pausa} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');



const main = async () => {

    const busquedas = new Busquedas();
    let opt;

    do {

        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                //Mostrar mensaje
                const lugar = await leerInput('Ciudad:');
                await busquedas.ciudad(lugar);
                //Busacar los lugar

                //Seleccionar el lugar

                //Clima

                //Mostrar resultados
                console.log('\nInformacion de la ciudad\n'.green)
                console.log('Ciudad:',);
                console.log('lat:',);
                console.log('lng:',);
                console.log('Temperatura:',);
                console.log('Minima',);
                console.log('Maxima',);
                break;
        }

        if (opt !== 0) await pausa();

    } while (opt !== 0);

};

main();