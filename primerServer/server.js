var express = require('express');
var app = express();

app.get('/mi_ruta', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('El servidor express corre en el puerto 3000');
});