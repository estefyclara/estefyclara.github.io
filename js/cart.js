const URL = CART_INFO_URL + 25801 + EXT_TYPE;
const lugar_HTML = document.getElementById('tabla');
const lugar_subtotal = document.getElementById('subtotal');
const envio = document.getElementById('envio');
const resultado_envio = document.getElementById('resultado_envio');
const total = document.getElementById('total');
let signo_peso;

document.addEventListener('DOMContentLoaded', async function () {
    info_url = await getJSONData(URL);

    peso = info_url.data.articles[0].currency;
    signo_peso = peso;

    lugar_HTML.innerHTML = getHTML(info_url.data.articles[0]);
    lugar_subtotal.innerHTML = signo_peso + calculoSubtotal();
    total.innerHTML = lugar_subtotal.textContent;
});

function getHTML(dato) {
    return `
    <tr>
        <th class="col-1 m-2"><img src="${dato.image}" class="img-fluid"></th>
        <td>${dato.name}</td>
        <td>${dato.currency} ${dato.unitCost}</td>
        <td class="col-3"><input id="valor" type="number" class="col-3" value="${dato.count}" min="1" oninput="calculoSubtotal()" onclick="calculoTotal()"></td>
        <td><b>${dato.currency}</b><b id="lugar_cuenta">${dato.unitCost * dato.count}</b></td>
    </tr>
    `
};

function calculoSubtotal() {
    const valor = document.getElementById('valor');
    const lugar_cuenta = document.getElementById('lugar_cuenta');

    let valor_input = valor.value;
    let unidad = info_url.data.articles[0].unitCost;

    lugar_cuenta.innerHTML = valor_input * unidad;
    lugar_subtotal.innerHTML = signo_peso + (valor_input * unidad);

    return valor_input * unidad;
};

const botonesEnvio = document.querySelectorAll('input[name="tipoDeEnvio"]');

botonesEnvio.forEach(boton =>{
    boton.addEventListener('click', () => {
        let resultado = calculoEnvios(boton.id);

        envio.innerHTML = signo_peso;
        resultado_envio.innerHTML = resultado;
        total.innerHTML = signo_peso + (resultado + calculoSubtotal());
    });
}); 

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
    if (resultado_envio.textContent == '') {
        total.innerHTML = signo_peso + restSubtotal;
    } else {
        total.innerHTML = signo_peso + (restSubtotal + calculoEnvios(document.querySelector('input[name="tipoDeEnvio"]:checked').id));
        envio.innerHTML = signo_peso;
        resultado_envio.innerHTML = calculoEnvios(document.querySelector('input[name="tipoDeEnvio"]:checked').id);
    };
}; 

const credito = document.getElementById('credito');
const bancaria = document.getElementById('bancaria');

credito.addEventListener('click', () => {
    document.getElementById('cuenta').disabled = true;
    if (credito.checked == true) {
        document.getElementById('vencimiento').disabled = false;
        document.getElementById('codigo').disabled = false;
        document.getElementById('tarjeta').disabled = false;
    };
});

bancaria.addEventListener('click', () => {
    document.getElementById('vencimiento').disabled = true;
    document.getElementById('codigo').disabled = true;
    document.getElementById('tarjeta').disabled = true;
    if (bancaria.checked == true) {
        document.getElementById('cuenta').disabled = false;
    };
});

document.getElementById('cerrar').addEventListener('click', () => {
    if (bancaria.checked == true) {
        document.getElementById('seleccion').innerHTML = `Transferencia bancaria`;
    } else if (credito.checked == true) {
        document.getElementById('seleccion').innerHTML = `Tarjeta de crédito`;
    }
});

document.getElementById('finalizar_compra').addEventListener('click', function (event) {
    event.preventDefault()
    const calle = document.getElementById('calle');
    const numero = document.getElementById('numero');
    const esquina = document.getElementById('esquina');

    if (calle.value == '' && numero.value == '' && esquina.value == '') {
        document.getElementById('form_envio').classList.add('was-validated');
    };

    const valor = document.getElementById('valor');

    if(valor.value <= 0){
        alert('La cantidad debe ser válida');
    };

    const input_seleccionar = document.getElementById('seleccionar');

    if (bancaria.checked == false && credito.checked == false) {
        input_seleccionar.classList.add('is-invalid');
    };

    bancaria.addEventListener('change', () => {
        if (bancaria.checked != true) {
            input_seleccionar.classList.add("is-invalid")
        } else {
            input_seleccionar.classList.remove("is-invalid")
        };
    });

    credito.addEventListener('change', () => {
        if (credito.checked != true) {
            input_seleccionar.classList.add("is-invalid")
        } else {
            input_seleccionar.classList.remove("is-invalid")
        };
    });

    if(credito.checked == true){
        if (document.getElementById('vencimiento').value == '' && document.getElementById('codigo').value == '' && document.getElementById('tarjeta').value == '') {
            (document.getElementById('form_modal').classList.add('was-validated'))
        };
    }

    if(bancaria.checked == true){
        if (document.getElementById('cuenta').value == '') {
            document.getElementById('form_modal').classList.add('was-validated');
        };
    }

    if (envio.textContent == '' && resultado_envio.textContent == '') {
        document.getElementById('validar').classList.add('is-invalid');
    };

    const pre = document.getElementById('premium');
    const exp = document.getElementById('express');
    const sta = document.getElementById('standard');

    pre.addEventListener('click', () => {
        if (pre.checked != false) {
            document.getElementById('validar').classList.remove('is-invalid');
            document.getElementById('validar').classList.add('is-valid');
        };
    });
    exp.addEventListener('click', () => {
        if (exp.checked != false) {
            document.getElementById('validar').classList.remove('is-invalid');
            document.getElementById('validar').classList.add('is-valid');
        };
    });
    sta.addEventListener('click', () => {
        if (sta.checked != false) {
            document.getElementById('validar').classList.remove('is-invalid');
            document.getElementById('validar').classList.add('is-valid');
        };
    });

    if((calle.value != '' && numero.value != '' && esquina.value != '') && (document.querySelector('input[name="formaDePago"]:checked')) &&
    ((document.getElementById('vencimiento').value != '' && document.getElementById('codigo').value != '' && document.getElementById('tarjeta').value != '') || (document.getElementById('cuenta').value != '')) && 
    (document.querySelector('input[name="tipoDeEnvio"]:checked')) && (valor.value > 0)){
        showAlertSuccess() 
    };
});

function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
};
