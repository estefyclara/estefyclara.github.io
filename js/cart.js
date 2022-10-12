const URL = CART_INFO_URL + 25801 + EXT_TYPE;
const lugar_HTML = document.getElementById('tabla');

document.addEventListener('DOMContentLoaded', async function(){
    info_url = await getJSONData(URL);

    lugar_HTML.innerHTML = getHTML(info_url.data.articles[0]);
    
    const valor = document.getElementById('valor');
    const lugar_cuenta = document.getElementById('lugar_cuenta');
});

function getHTML(dato){
    return `
    <tr>
        <th class="col-1 m-2"><img src="${dato.image}" class="img-fluid"></th>
        <td>${dato.name}</td>
        <td>${dato.currency} ${dato.unitCost}</td>
        <td class="col-3"><input id="valor" type="number" class="col-3" value="${dato.count}" min="1" oninput="cantidades()"></td>
        <td><b id="lugar_cuenta">${dato.currency} ${dato.unitCost * dato.count}</b></td>
    </tr>
    `
};

function cantidades(){

    let valor_input = valor.value;
    let unidad = info_url.data.articles[0].unitCost;
    let signo_peso = info_url.data.articles[0].currency;

    return lugar_cuenta.innerHTML = signo_peso + (valor_input * unidad);
}; 