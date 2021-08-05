const inquirer = require('inquirer');

require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value:1,
                name: `${ '1'.green }. Buscar ciudad`
            },
            {
                value:2,
                name: `${ '2'.green }. Historial`
            },
            {
                value:0,
                name: `${ '0'.green }. Salir`
            }
        ]
    }
];

const stopQuestion = [
    {
        type: 'input',
        name: 'enter',
        message: `Presione cualquier ${'enter'.green} para continuar`
    }
];

const inquirerMenu = async () => {
    console.clear();
    console.log('=========================='.green);
    console.log('  Seleccione una opción'.white);
    console.log('==========================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async () => {
    
    console.log('\n');
    await inquirer.prompt(stopQuestion);
}

const leerInput = async ( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {

                if(value.length === 0) {
                    return 'Por favor ingrese un valor';
                }

                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);

    return desc;


}

const listarLugares = async (lugares = []) => {

    const choices = lugares.map(({id, nombre}, i) =>{

        const idx = `${i+1}.`.green;

        return {
            value: id,
            name: `${idx} ${nombre}`
        }

    })

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione el lugar:',
            choices
        }
    ];

    const {id} = await inquirer.prompt(preguntas);

    return id;


} 

const confirmar  = async (message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);

    return ok;

}

const listadoTareasCompletar = async (tarea = []) => {

    const choices = tarea.map(({id, desc, completadoEn}, i) =>{

        const idx = `${i+1}.`.green;

        return {
            value: id,
            name: `${idx} ${desc}`,
            checked: completadoEn ? true : false
        }

    })

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ];

    const {ids} = await inquirer.prompt(pregunta);
    return ids;


} 

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    listadoTareasCompletar
}