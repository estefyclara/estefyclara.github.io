var list = document.getElementById('products');
var nombre = document.getElementById('nombreProducto');
var data_url; 
var buscador = document.getElementById('buscador');
let minCount = undefined;
let maxCount = undefined;

function setID(id) {
  localStorage.setItem("id", id);
  window.location = "product-info.html"
}

// Función que trae los datos de la url 
async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    data_url = data;
};    

// Traigo los datos de la lista de productos y los inserto en el HTML 
document.addEventListener('DOMContentLoaded', async function() {
  await getData(PRODUCTS_URL + localStorage.getItem('catID') + EXT_TYPE);

  getHTML(data_url.products);
  getName(data_url);
});  

 // Función que hace dinámico el nombre de la lista de productos
function getName(array) { 
  nombre.innerHTML = ` <h2>Productos</h2>
    <p style="font-size: 20px;">Verás aquí todos los productos de la categoria ${array.catName}</p> `;
} 

function getHTML(array){

  let html = '';
  for (let i = 0; i < array.length; i++) {
    const liproducts= array[i];

    if (((minCount == undefined) || ((liproducts.cost) >= minCount)) &&
        ((maxCount == undefined) || ((liproducts.cost) <= maxCount))){
     
    html += `
     <div class="col-12" onclick="setID(${liproducts.id})">
       <div class="row shadow overflow-hiden mb-4">
         <div class="col-4 p-0">
              <img class="img-fluid" src="${liproducts.image}">
          </div>
          <div class="col-8 d-flex flex-column justify-content-between">
              <div class="productoBody">
                  <h3>${liproducts.name} - ${liproducts.currency} ${liproducts.cost}</h3>
                  <p>${liproducts.description}</p>
              </div>
          <div class="productoFooter d-flex justify-content-between">
              <p>Cantidad de vendidos: <span class="cantidad">${liproducts.soldCount}</span></p>
          </div>
        </div>
       </div>
     </div>
     `   
    } 
    list.innerHTML = html;
}};

// Función que ordena de forma descendente en función del precio
document.getElementById('sortDesc').addEventListener('click', function() {

    let result = [];
    result = data_url.products.sort((a, b) => {
      if ( a.cost > b.cost ){ return -1; }
      if ( a.cost < b.cost ){ return 1; }
      return 0;
    })
    
    getHTML(result);
});

// Función que ordena de forma ascendente en función del precio
document.getElementById('sortAsc').addEventListener('click', function() {

    let result = [];
    result = data_url.products.sort((a, b) => {
        if ( a.cost < b.cost ){ return -1; }
        if ( a.cost > b.cost ){ return 1; }
        return 0;
    })

    getHTML(result);
    
});

// Función que ordena de forma descendente en función de la relevancia 
// tomando en cuenta la cantidad de artículos vendidos
document.getElementById('sortByRelevance').addEventListener('click', function() {

    let result = [];
    result = data_url.products.sort(function(a, b) {
        if ( a.soldCount > b.soldCount ){ return -1; }
        if ( a.soldCount < b.soldCount ){ return 1; }
        return 0;
    });    

    getHTML(result);

}); 

// Función que limpia los campos que filtran según precio 
document.getElementById("clearRangeFilter").addEventListener("click", function(){
  document.getElementById("rangeFilterCountMin").value = "";
  document.getElementById("rangeFilterCountMax").value = "";

  minCount = undefined;
  maxCount = undefined;

  getHTML(data_url.products);
});

// Función que filtra según rango de precio
document.getElementById("rangeFilterCount").addEventListener("click", function(){
  minCount = document.getElementById("rangeFilterCountMin").value;
  maxCount = document.getElementById("rangeFilterCountMax").value;

  getHTML(data_url.products);
});   

// Función que busca según coincidencia en título y descripción
buscador.addEventListener('input', function() {

  let texto = buscador.value.toLowerCase();
  let filtro = [];

  data_url.products.forEach(element => {
    let name = element.name.toLowerCase();
    let description = element.description.toLowerCase();
    if(name.includes(texto) || description.includes(texto)){
      filtro.push(element)
    } else {
      list.innerHTML = `<b>Producto no encontrado...</b>`
    }
  })
  getHTML(filtro);
});