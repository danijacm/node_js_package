const express = require('express');
const app = express();
const port = 3000;

//npm install --save helmet
const helmet =require('helmet');

//npm install --save express-rate-limit
const rateLimit = require('express-rate-limit');

app.use(helmet());

// Creo u nuevo middleware para desactivar la cabecera con el metodo app.disable() para que los atacantes no puedan
//utilizarla. (Esta cabecera por defecto esta habilitada)
app.disable('x-powered-by');

// Otro middeware que para controlar el tamaño de la informacion
app.use(express.json({limit: '100kb'}));

let limiter = rateLimit({

    windowMs : 60 * 60 * 1000, // 60 minutos
    max: 20,
    message: "Se supero el limite de 20 peticiones por hora"

});

app.use(limiter);

app.get('/api/action',function (req,res){


    res.status(200).send('ok');
})


const contactos = [

    {"id": 1, "nombre": "Dani"},
    {"id": 2, "nombre" : "Hugo"},
    {"id": 3, "nombre": "Juan"}
];

const checkLimite = rateLimit({

    windowMs: 60 * 60 * 1000 ,
    max :  5,
    message : "Supero el limite de 5 requests por hora"


});

app.get("/contactos",checkLimite,(req,res)=>{

    respuesta = {

        error : false,
        codigo : 200,
        mensaje: "Listado de Contactos",
        respuesta : contactos


    }

    res.status(200).send(respuesta);


})



app.listen(port,()=>{

    console.log("El servidor esta escuchando en el puerto "+port);
})



