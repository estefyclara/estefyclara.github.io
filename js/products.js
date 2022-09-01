var list = document.getElementById('products');
var nombre = document.getElementById('nombreProducto');
var valor = localStorage.getItem('catID');
var data_url; 
let minCount = undefined;
let maxCount = undefined;

async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    data_url = data;

document.addEventListener('DOMContentLoaded', async function() {
  await getData(PRODUCTS_URL + localStorage.getItem('catID') + EXT_TYPE);

  getHTML(data_url.products);
  getName(data_url);
});  

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
     <div class="col-12" id="${liproducts.id}">
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
}}

document.getElementById('sortDesc').addEventListener('click', function() {

    let result = [];
    result = data_url.products.sort((a, b) => {
      if ( a.cost > b.cost ){ return -1; }
      if ( a.cost < b.cost ){ return 1; }
      return 0;
    })
    
    getHTML(result);
});


document.getElementById('sortAsc').addEventListener('click', function() {

    let result = [];
    result = data_url.products.sort((a, b) => {
        if ( a.cost < b.cost ){ return -1; }
        if ( a.cost > b.cost ){ return 1; }
        return 0;
    })

    getHTML(result);
    
});

document.getElementById('sortByRelevance').addEventListener('click', function() {

    let result = [];
    result = data_url.products.sort(function(a, b) {
        if ( a.soldCount > b.soldCount ){ return -1; }
        if ( a.soldCount < b.soldCount ){ return 1; }
        return 0;
    });    

    getHTML(result);

}); 

document.getElementById("clearRangeFilter").addEventListener("click", function(){
  document.getElementById("rangeFilterCountMin").value = "";
  document.getElementById("rangeFilterCountMax").value = "";

  minCount = undefined;
  maxCount = undefined;

  getHTML(data_url.products);
});


document.getElementById("rangeFilterCount").addEventListener("click", function(){
  minCount = document.getElementById("rangeFilterCountMin").value;
  maxCount = document.getElementById("rangeFilterCountMax").value;

  getHTML(data_url.products);
});   

