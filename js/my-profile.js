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
        document.getElementById('imagen').src = objeto.imagen;
        if(objeto.imagen){
            document.getElementById('coment').innerHTML = `Se ha seleccionado una foto de perfil`;
        }
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
async function guardarDatos(){

    const cargarImagen = document.getElementById('cargarImagenPerfil').files[0];
    const imagenConvertida = await convertirArchivosAbase64(cargarImagen);
    document.getElementById('imagen').src = imagenConvertida;


    var datosPerfil ={};
    datosPerfil.primerNombre = document.getElementById('primerNombre').value;
    datosPerfil.segundoNombre = document.getElementById('segundoNombre').value;
    datosPerfil.primerApellido = document.getElementById('primerApellido').value;
    datosPerfil.segundoApellido = document.getElementById('segundoApellido').value;
    datosPerfil.email = localStorage.getItem('Email');
    datosPerfil.telefono = document.getElementById('telefono').value;
    datosPerfil.imagen = imagenConvertida;

    localStorage.setItem('datosPerfil', JSON.stringify(datosPerfil));
};

//Convierto la imagen a base64
function convertirArchivosAbase64(archivo){
    return new Promise((resolve) => {
        const lectura  = new FileReader();
        lectura.readAsDataURL(archivo);
        lectura.addEventListener('load', () => {
            resolve(lectura.result);
        })
    })
};