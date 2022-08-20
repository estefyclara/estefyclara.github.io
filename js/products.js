const URL_AUTOS = "https://japceibal.github.io/emercado-api/cats_products/101.json";

var data_url; 

// Forma de obtener los datos de una url con fetch.
async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    data_url = data;
}
// Bucle que completa el html con los datos de products de cada auto.
document.addEventListener('DOMContentLoaded', async function () {
    await getData(URL_AUTOS);

    var list = document.getElementById('products');

    for (let i = 0; i < data_url.products.length; i++) {
        const listProducts = data_url.products[i];
        list.innerHTML += getHTML(listProducts);
    }
        
});

// Funcion que completa los campos entre {} con el parametro que le pasemos entre (). 
function getHTML(products){
    return `
     <div class="col-12" id="${products.id}">
       <div class="row shadow overflow-hiden mb-4">
         <div class="col-4 p-0">
              <img class="img-fluid" src="${products.image}">
          </div>
          <div class="col-8 d-flex flex-column justify-content-between">
              <div class="productoBody">
                  <h3>${products.name} - ${products.currency} ${products.cost}</h3>
                  <p>${products.description}</p>
              </div>
          <div class="productoFooter d-flex justify-content-between">
              <p>Cantidad de vendidos: <span class="cantidad">${products.soldCount}</span></p>
          </div>
        </div>
       </div>
     </div>
     `   
}