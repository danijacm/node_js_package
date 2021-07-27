var express = require('express');
var app = express();
const sequelize = require('./conexion.js');

async function findAllRows() {
    sequelize.query('UPDATE restaurant SET ADRESSE = "Bares de buenos aires" WHERE ID_RESTO = 12',
        { replacements: [12]}
    ).then(function (restaurant) {
        console.log(restaurant)
    })
}

findAllRows();

app.listen(3000, function () {
    console.log('Sistema armado en el puerto 3000!');
});