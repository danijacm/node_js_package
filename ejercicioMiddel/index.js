const Respuesta = require("./respuesta.js");
const express = require('express');
const sequelize = require('./conexion.js');
const app = express();
const port = 3000;


// Permite recibir parámetros en formato JSON.
app.use(express.json());

const autores = [
    {
        "id": 1,
        "nombre": "Gabriel Garcia Marquez",
        "fechaNacimiento": "06/03/1927",
        "libros": [
            {
                "id": 1,
                "titulo": "Cien años de soledad",
                "descripcion": "Libro ganador del premio nobel",
                "anioPublicacion": 1967, 
            },

            {
                "id": 2,
                "titulo": "El coronel no tiene quien le escriba",
                "descripcion": "Narra la realiad de un coronel que nunca recibio su pensión",
                "anioPublicacion": 1960, 
            },

            {
                "id": 3,
                "titulo": "Vivir para contarla",
                "descripcion": "Autobiografía de Gabriel Garcia Marquez",
                "anioPublicacion": 2000, 
            },
        ]
    },

    {
        "id": 2,
        "nombre": "Carlos Perez",
        "fechaNacimiento": "10/09/1965",
        "libros": [
            {
                "id": 1,
                "titulo": "La guerra fria",
                "descripcion": "Libro que describe el arte de la guerra",
                "anioPublicacion": 1982, 
            },

            {
                "id": 2,
                "titulo": "Cuando llueva para arriba",
                "descripcion": "Libro de ciencia aficción",
                "anioPublicacion": 1988, 
            },

            {
                "id": 3,
                "titulo": "El funeral del papa",
                "descripcion": "Narra la histria del primer papa que murio en Roma",
                "anioPublicacion": 1999, 
            },
        ]
    },

    {
        "id": 3,
        "nombre": "Margarira Rojas Henao",
        "fechaNacimiento": "04/10/1957",
        "libros": [
            {
                "id": 1,
                "titulo": "Amar y vivir",
                "descripcion": "Historia de amor imposible",
                "anioPublicacion": 1990, 
            },

            {
                "id": 2,
                "titulo": "Las vueltas de la vida",
                "descripcion": "Una historia inspirada en la vida real",
                "anioPublicacion": 1984, 
            },

            {
                "id": 3,
                "titulo": "El vicio de amar",
                "descripcion": "Una historia de amor llena de romanticismo",
                "anioPublicacion": 2002, 
            },
        ]
    },

];


async function insert_autor(autor) {

    //let array_insert = ['NULL', '1', 'test 1', 'test 1', 'test 1', 'Prueba', 'Foto.jpg', '2020-07-22 00:00:00', '1'];
    
    sequelize.query('INSERT INTO autores(id_autor, nombre_autor, fecha_nac) VALUES(?, ?, ?)',
        { replacements: autor, type: sequelize.QueryTypes.INSERT }
    ).then(function (resp) {
        console.log(resp)
        return true;
    }).catch(e=>{
        console.log(e);
        return false;
    })
}


function getIndexById(id){
    for (let i = 0; i < autores.length; i++) {
        if(autores[i].id === id)
            return i;        
    }
    return -1;
}

function getIndexLibrosById(id) {
    for (let i = 0; i < autores.length; i++) {
        if (autores[i].libros[i].id === id)
            return i
    }
    return -1;
}


function validarId(req, res, next) {
    let indice = autores.findIndex(aut => {
        return aut.id === parseInt(req.params.id);
    });
    console.log("indice = " + indice);
    if (indice < 0) {
        resp = new Respuesta(true, 404, "El id buscado no existe", "");
        res.status(404).send(resp);
        return;    
    }
    return next();
}

function validarIdLibro(req, res, next) {
    let idLibro = parseInt(req.params.idLibro);
    if (getIndexLibrosById(idLibro) < 0) {
        let resp = new Respuesta(true, 202, "El Libro buscado no existe", "");
        status = 202;
        res.status(status).send(resp);
        return console.log(resp);
    }
    return next();
}


app.get('/autores', function (req, res) {
    let resp;
    if (autores.length == 0 ){
        resp = new Respuesta(true, 500, "No hay autores en el array", "");
        res.status(500).send(resp);
    }else{
        resp = new Respuesta(false, 200, "autores existentes", autores);
        res.status(200).send(resp);
    }

});


app.post('/autores', function(req, res){
    //autores.push(req.body);
    //let autor = [];
    const {id, nombre, fecha_nac} = req.body;
    /*autor[0] = req.body.id;
    autor[1] = req.body.nombre;
    autor[2] = req.body.fecha_nac;*/

    console.log('id: ' + id );
    console.log('nombre_autor: ' + nombre );
    console.log('fecha_nac: ' + fecha_nac );

    /*let rta = insert_autor([id, nombre_autor, fecha_nac]);

    if(!rta){
        let resp = new Respuesta(true, 500, "No fue posible insertar el autor", "");
        status = 500; 
    }
    else{
        let resp = new Respuesta(false, 200, "Autor agregado exitosamente", {id:id, autor: nombre_autor, fecha_nac: fecha_nac});
        status = 200;     
    }*/
    let resp = new Respuesta(false, 200, "Autor agregado exitosamente");
    status = 200;     
    res.status(status).send(resp); 
});


app.delete('/autores/:id', validarId, (req,res) =>{
    const id  = parseInt (req.params.id);
    //console.log("El Id enviado es: " + id + " - " + typeof(id));
    let index = getIndexById(id);
    //console.log("El Index a borrar es: " + index);

    let resp = new Respuesta(false, 200, "Autor Borrado exitosamente", autores[index]);
    status = 200; 
    res.status(status).send(resp); 
    autores.splice(index, 1);
});


app.get('/autores/:id', validarId, (req,res) =>{
    const id  = parseInt (req.params.id);
    //console.log("El Id enviado es: " + id + " - " + typeof(id));
    let index = getIndexById(id);
    //console.log("El Index a borrar es: " + index);

    let resp = new Respuesta(false, 200, "Autor encontrado exitosamente", autores[index]);
    status = 200; 
    res.status(status).send(resp); 
});


app.put('/autores/:id', validarId, (req,res) =>{
    const id  = parseInt (req.params.id);
    //console.log("El Id enviado es: " + id + " - " + typeof(id));
    let index = getIndexById(id);
    //console.log("El Index a borrar es: " + index);

    autores[index] = req.body; 
    let resp = new Respuesta(false, 200, "Autor reemplazado exitosamente", autores[index]);
    status = 200; 
    res.status(status).send(resp);
});


app.get('/autores/:id/libros', validarId, (req, res) => {
    const id = parseInt(req.params.id);
    let index = getIndexById(id);
    const nomb = autores[index].nombre
    let resp = new Respuesta(false, 200, `Libros de Autor '${nomb}' con id ${req.params.id} encontrado`, autores[index].libros);
    res.status(200).send(resp);

});


app.post('/autores/:id/libros', validarId, (req, res) => {
    const id = parseInt(req.params.id);
    let index = getIndexById(id);
    const nomb = autores[index].nombre;
    autores[index].libros.push(req.body);
    let resp = new Respuesta(false, 200, `Libros de Autor '${nomb}' con id ${req.params.id} agregado`, autores[index]);
    res.status(200).send(resp);
});


app.get('/autores/:id/libros/:idLibro', validarId, validarIdLibro, (req, res) => {
    const id = parseInt(req.params.id); // Extraigo el Id del autor
    let idLibro = parseInt(req.params.idLibro); // Extraigo el Id del libro
    let indexAutor = getIndexById(id);
    let indexLibros = getIndexLibrosById(idLibro);
    const nomb = autores[indexAutor].nombre;
    const libro = autores[indexAutor].libros[indexLibros].titulo;
    let autorConLibro = autores[indexAutor].libros[indexLibros];
    let resp = new Respuesta(false, 200, `Libro de Autor '${nomb}' con id ${req.params.id} encontrado`, autorConLibro.titulo);
    res.status(200).send(resp);
    console.log(`\nID libro: ${idLibro}\nINDEX libro: ${indexLibros}\nESCRITOR: ${nomb}\nNOMBRE LIBRO: ${libro}\n`);
});


app.put('/autores/:id/libros/:idLibro', validarId, validarIdLibro, (req, res) => {
    const idAutor = parseInt(req.params.id);
    let idLibro = parseInt(req.params.idLibro);
    let indexAutor = getIndexById(idAutor);
    let indexLibros = getIndexLibrosById(idLibro)
    const nomb = autores[indexAutor].nombre
    autores[indexAutor].libros[indexLibros] = req.body; // Modificando la información del libro
    let objModificado = autores[indexAutor].libros[indexLibros];
    let resp = new Respuesta(false, 200, `Libros de Autor '${nomb}' con id ${req.params.id} modificado`, objModificado);
    res.status(200).send(resp);
    /*console.log(`\nID libro: ${idLibro}\nINDEX libro: ${indexLibros}\nESCRITOR: ${nomb}\nNOMBRE LIBRO ANTERIOR: 
                ${libro}\nNOMBRE LIBRO MODIFICADO: ${libroModificado}\n`);*/
});


app.delete('/autores/:id/libros/:idLibro', validarId, validarIdLibro, (req, res) => {
    const idAutor = parseInt(req.params.id);
    let idLibro = parseInt(req.params.idLibro);
    let indexAutor = getIndexById(idAutor);
    let indexLibros = getIndexLibrosById(idLibro)
    const nomb = autores[indexAutor].nombre
    autores[indexAutor].libros.splice(indexLibros, 1);  // Borro el libro indicado
    let objModificado = autores[indexAutor].libros;
    let resp = new Respuesta(false, 200, `Libro de Autor '${nomb}' con id ${req.params.id} Eliminado`, objModificado);
    res.status(200).send(resp);
});


app.listen(port, () => {
    console.log(`Server listeting on port ${port}`)
});