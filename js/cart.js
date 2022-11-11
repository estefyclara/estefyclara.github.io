const URL = CART_INFO_URL + 25801 + EXT_TYPE;
const lugar_HTML = document.getElementById('tabla');
const lugar_subtotal_general = document.getElementById('subtotal');
const peso_envio = document.getElementById('envio');
const resultado_envio = document.getElementById('resultado_envio');
const total = document.getElementById('total');
let signo_peso;

document.addEventListener('DOMContentLoaded', async function () {
    info_url = await getJSONData(URL);

    peso = info_url.data.articles[0].currency;
    signo_peso = peso;

    lugar_HTML.innerHTML = getHTML(info_url.data.articles[0]);
    lugar_subtotal_general.innerHTML = signo_peso + calculoSubtotal();
    total.innerHTML = lugar_subtotal_general.textContent;
});

// Completo el html del producto que se encuentra en el carrito 
function getHTML(dato) {
    return `
    <tr>
        <th class="col-1 m-2"><img src="${dato.image}" class="img-fluid"></th>
        <td>${dato.name}</td>
        <td>${dato.currency} ${dato.unitCost}</td>
        <td class="col-3"><input id="valor" type="number" class="col-3" value="${dato.count}" min="1" oninput="calculoSubtotal()" onclick="calculoTotal()"></td>
        <td><b>${dato.currency}</b><b id="lugar_subtotal_producto">${dato.unitCost * dato.count}</b></td>
    </tr>
    `
};

// Funcion que utilizo para calcular el subtotal específico y general 
function calculoSubtotal() {
    const valor = document.getElementById('valor');
    const lugar_subtotal_producto = document.getElementById('lugar_subtotal_producto');

    let valor_input = valor.value;
    let unidad = info_url.data.articles[0].unitCost;

    lugar_subtotal_producto.innerHTML = valor_input * unidad;
    lugar_subtotal_general.innerHTML = signo_peso + (valor_input * unidad);

    return valor_input * unidad;
};

const botonesEnvio = document.querySelectorAll('input[name="tipoDeEnvio"]');

botonesEnvio.forEach(boton =>{
    boton.addEventListener('click', () => {
        let resultado = calculoEnvios(boton.id);

        // Inserto el resultado del envío, según el tipo de envío seleccionado
        peso_envio.innerHTML = signo_peso;
        resultado_envio.innerHTML = resultado;
        total.innerHTML = signo_peso + (resultado + calculoSubtotal());
    });
}); 

// Calculo el valor del tipo de envío según el id del botón seleccionado
// Tomo el valor de retorno de la función subtotal 
function calculoEnvios(id){
    let restSubtotal = (parseInt(calculoSubtotal()));
    if(id == 'premium'){
        let resultado = restSubtotal * 0.15;
        return Math.round(resultado);
    } else if(id == 'express'){
        let resultado = restSubtotal * 0.07;
        return Math.round(resultado);
    } else if(id == 'standard'){
        let resultado = restSubtotal * 0.05;
        return Math.round(resultado);
    };
}; 

function calculoTotal(){
    let restSubtotal = (parseInt(calculoSubtotal()));
    // Controlo si el envío está vacío
    // De ser así, el total será igual al subtotal general 
    if (resultado_envio.textContent == '') {
        total.innerHTML = signo_peso + restSubtotal;
    } else {
        // Realizo el calculo del total según el tipo de envío 
        total.innerHTML = signo_peso + (restSubtotal + calculoEnvios(document.querySelector('input[name="tipoDeEnvio"]:checked').id));
        peso_envio.innerHTML = signo_peso;
        // Inserto el resultado del envío, según el cambio en el subtotal de productos 
        resultado_envio.innerHTML = calculoEnvios(document.querySelector('input[name="tipoDeEnvio"]:checked').id);
    };
}; 

const credito = document.getElementById('credito');
const bancaria = document.getElementById('bancaria');

// Deshabilito el campo que no corresponde a la selección de tarjeta de credito
credito.addEventListener('click', () => {
    document.getElementById('cuenta').disabled = true;
    if (credito.checked == true) {
        document.getElementById('vencimiento').disabled = false;
        document.getElementById('codigo').disabled = false;
        document.getElementById('tarjeta').disabled = false;
    };
});

// Deshabilito los campos que no corresponden a la selección de transferencia bancaria
bancaria.addEventListener('click', () => {
    document.getElementById('vencimiento').disabled = true;
    document.getElementById('codigo').disabled = true;
    document.getElementById('tarjeta').disabled = true;
    if (bancaria.checked == true) {
        document.getElementById('cuenta').disabled = false;
    };
});

// Botón que cierra el modal
// Guardo el tipo de forma de pago 
document.getElementById('cerrar').addEventListener('click', () => {
    if (bancaria.checked == true) {
        document.getElementById('seleccion').innerHTML = `Transferencia bancaria`;
    } else if (credito.checked == true) {
        document.getElementById('seleccion').innerHTML = `Tarjeta de crédito`;
    }
});

// Botón de finalizar compra 
document.getElementById('finalizar_compra').addEventListener('click', function (event) {
    event.preventDefault()
    
    const calle = document.getElementById('calle');
    const numero = document.getElementById('numero');
    const esquina = document.getElementById('esquina');

    // Controlo que calle, número y esquina esten vacíos
    // Agrego las clases que marcan los campos como inválidos
    if (calle.value == '' && numero.value == '' && esquina.value == '') {
        document.getElementById('form_envio').classList.add('was-validated');
    };


    const valor = document.getElementById('valor');

    // Controlo que el valor de la cantidad de productos es menor o igual a 0
    // Salta la alerta 
    if(valor.value <= 0){
        alert('La cantidad debe ser válida');
    };


    const input_seleccionar = document.getElementById('seleccionar');

    // Controlo que ninguna forma de pago esta seleccionada
    // Agrego la clase que aplica el estilo inválido
    if (bancaria.checked == false && credito.checked == false) {
        input_seleccionar.classList.add('is-invalid');
    };

    // Agrupo los botones de la forma de pago
    // Quito la clase que aplica el estilo inválido
    document.querySelectorAll('.check-modal').forEach(element => {
        element.addEventListener('change', () => {
            if (element.checked != false) {
                input_seleccionar.classList.remove("is-invalid")
            };
        });
    });
   

    // Controlo que la los campos de la forma de pago seleccionada esten vacíos
    // Agrego la clase que aplica el estilo inválido
    if(credito.checked == true){
        if (document.getElementById('vencimiento').value == '' && document.getElementById('codigo').value == '' && document.getElementById('tarjeta').value == '') {
            (document.getElementById('form_modal').classList.add('was-validated'))
        };
    }

    if(bancaria.checked == true){
        if (document.getElementById('cuenta').value == '') {
            document.getElementById('form_modal').classList.add('was-validated');
        };
    };


    // Controlo si el lugar donde se inserta el costo del envío está vacío
    // Agrego la clase que aplica el estilo inválido
    if (envio.textContent == '' && resultado_envio.textContent == '') {
        document.getElementById('validar').classList.add('is-invalid');
    };

    // Quito la clase que aplica el estilo inválido
    document.querySelectorAll('.check-envio').forEach(boton => {
        boton.addEventListener('click', () => {
            document.getElementById('validar').classList.remove('is-invalid');
        });
    });

    // Controlo que todos los campos no esten vacíos y los botones seleccionados
    // Muestro un cartel de la compra realizada con éxito
    if((calle.value != '' && numero.value != '' && esquina.value != '') && (document.querySelector('input[name="formaDePago"]:checked')) &&
    ((document.getElementById('vencimiento').value != '' && document.getElementById('codigo').value != '' && document.getElementById('tarjeta').value != '') || (document.getElementById('cuenta').value != '')) && 
    (document.querySelector('input[name="tipoDeEnvio"]:checked')) && (valor.value > 0)){
        showAlertSuccess() 
    };
});

function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
};
