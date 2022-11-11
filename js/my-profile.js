const email = document.getElementById('email');
const boton = document.getElementById('guardarCambios');
const camposAValidar = document.querySelectorAll('.validar');

document.addEventListener('DOMContentLoaded', () => {
    email.value = localStorage.getItem('Email');

    // Controlo la existencia de los datos de perfil en el local storage
    // Muestro los datos en los campos correspondientes 
    if(localStorage.getItem('datosPerfil')){
        var objeto = JSON.parse(localStorage.getItem('datosPerfil'));

        document.getElementById('primerNombre').value = objeto.primerNombre;
        document.getElementById('segundoNombre').value = objeto.segundoNombre;
        document.getElementById('primerApellido').value = objeto.primerApellido;
        document.getElementById('segundoApellido').value = objeto.segundoApellido;   
        document.getElementById('telefono').value = objeto.telefono;  
    };
});

boton.addEventListener('click', (event) => {
    event.preventDefault();

    camposAValidar.forEach(elemento => {
        // Controlo que el elemento este vacío
        // Agrego la clase que marca el campo como inválido
        if(elemento.value == ''){
            elemento.classList.add("is-invalid");
        };
        
        // Quito la clase que marca el campo como inválido 
        elemento.addEventListener("keyup", () => {
            elemento.classList.remove("is-invalid")   
        });   
    });

    // Controlo que todos los campos obligatorios no estan vacíos
    if(camposAValidar[0].value != '' && camposAValidar[1].value != '' && camposAValidar[2].value != ''){
        guardarDatos();
    };
});

// Guardo los datos en el local storage  
function guardarDatos(){

    var datosPerfil ={};
    datosPerfil.primerNombre = document.getElementById('primerNombre').value;
    datosPerfil.segundoNombre = document.getElementById('segundoNombre').value;
    datosPerfil.primerApellido = document.getElementById('primerApellido').value;
    datosPerfil.segundoApellido = document.getElementById('segundoApellido').value;
    datosPerfil.email = localStorage.getItem('Email');
    datosPerfil.telefono = document.getElementById('telefono').value;

    localStorage.setItem('datosPerfil', JSON.stringify(datosPerfil));
};