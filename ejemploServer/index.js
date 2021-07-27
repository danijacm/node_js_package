const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const Telefono = require("./telefono.js");
const Respuesta = require("./respuesta.js");
app.listen(5000, () => {
    console.log("El servidor está inicializado en el puerto 5000");
});


let tel1= new Telefono("Nokia","1100","TFT de 6.5","Android 9.0 Pie.", 500);
let tel2= new Telefono("Samsung","Galaxy A20","TFT de 6.5","Android 9.0 Pie.", 1000);
let tel3= new Telefono("Alcatel","one","TFT de 5.5","Android 5.0 Pie.", 1500);

let arreglo_telefonos = new Array();
arreglo_telefonos.push(tel1);
arreglo_telefonos.push(tel2);
arreglo_telefonos.push(tel3);
console.log(arreglo_telefonos);




app.get('/telefonos', function (req, res) {
    if (arreglo_telefonos.length == 0 ){
        let resp = new Respuesta(true,500,"No hay telefonos exitentes","");
        res.status(500).send(resp);
    }else{
        let resp = new Respuesta(false,200,"Telefonos existentes",arreglo_telefonos);
        res.status(200).send(resp);
    }

});


app.delete('/telefono', function(req, res){
    let pos = req.body.pos;
    let totalCel = arreglo_telefonos.length;
    let status;
    let resp;
    if(pos < 0){
        resp = new Respuesta(true,501,"Posición inválida", "");
        status = 501;
    }else if(pos > totalCel){
        resp = new Respuesta(true,501,"Esta posición está vacia", "");
        status = 501;
    }
    else{
        arreglo_telefonos.splice(pos, 1);
        //console.log('La posición es = ' + pos);
        resp = new Respuesta(false,200,"Telefono borrado",arreglo_telefonos[pos]);
        arreglo_telefonos.splice(pos, 1);
        status = 200;    
    }
    res.status(status).send(resp);    
});

app.post('/agregar', function(req, res){
    //console.log(req.body);
    let objTel = new Telefono();
    //objTel = JSON.parse(req.body);
    objTel.marca = req.body.marca;
    console.log(objTel.marca);
    arreglo_telefonos.push(req.body);
    let resp = new Respuesta(false,200,"Telefono agregado exitosamente", arreglo_telefonos);
    status = 200; 
    res.status(status).send(resp); 
});

