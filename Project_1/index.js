//console.log('Hola Mundo desde Node JS');
let moment = require('moment');
let fs = require('fs');
let myDate = new Date();
myDate = moment(myDate).format('LLL');
let data = 'Nuevo texto agragado';

fs.readFile('data.txt', 'utf-8', (error, data) => {
    if(error){
        console.log(`Error ${error}`);
    }else{
        console.log(data);
    }
});

fs.appendFile('data.txt', `\n${data} - ${myDate}\n`, (error) => {
    if(error){
        console.log(`Error ${error}`);
    }else{
        console.log('Proceso de escritura correcto');
    }

});