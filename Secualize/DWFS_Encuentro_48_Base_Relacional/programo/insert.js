const sequelize = require('./conexion.js');

async function insert() {

    let array_insert = ['NULL', '1', 'test 1', 'test 1', 'test 1', 'Prueba', 'Foto.jpg', '2020-07-22 00:00:00', '1'];
    
    sequelize.query('INSERT INTO`restaurant`(`ID_RESTO`, `ID_USER`, `NOM_RESTO`, `ADRESSE`, `TELEPHONE`, `DESCRIPTIF`, `IMAGE`, `DATE_DERNIERE_MODIF`, `ACTIF`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)',
        { replacements: array_insert, type: sequelize.QueryTypes.INSERT }
    ).then(function (projects) {
        console.log(projects)
    })
}

insert();
