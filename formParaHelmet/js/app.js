//console.log('Funcionando...');

let form_login = document.getElementById('form_login');


async function makeLogin(){
    let datos = new FormData(form_login);
    console.log(datos.get('user'));
    console.log(datos.get('password'));
    //let urlBase = 'http://127.0.0.1:3000/api/login';  
    let urlBase = 'http://localhost:3000/api/login';
    let response = await fetch(`${urlBase}`, {
        method: 'POST',
        //body: datos
        /*body: JSON.stringify({
            user: "daniel@gmail.com",
            password: 1234
        })*/

        body: JSON.stringify({
            user: datos.get('user'),
            password: datos.get('password')
        })
    });
    response = await response.json();
    return response;
} 

form_login.addEventListener('submit', function(e){
    e.preventDefault(); // Evito que se procese el action que trae el formulario por defecto
    //console.log('Hiciste click');

    makeLogin().then(
        (response) => {
            console.log(response);
         }).catch(
             (error) =>{
                 console.log(error);
             }
         )
});

/*
async function makeLogin() {
    let datos = new FormData(form_login);
    console.log(datos.get('user'));
    console.log(datos.get('password'));
    //let urlBase = 'http://127.0.0.1:3000/api/login';  
    let urlBase = 'http://localhost:3000/api/login';
    let response = await fetch(`${urlBase}`, {
        method: "post",
        headers: {
        'Accept': 'application/json',       
        "Content-Type": "application/x-www-form-urlencoded"
    },

  //make sure to serialize your JSON body
  body: JSON.stringify(opts)
    });

    console.log(response);
    //response = await response.json();
    return response;
}

*/