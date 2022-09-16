const site_product = document.getElementById('lugar');
const site_comments = document.getElementById('comentarios');
const site_poductsrelated = document.getElementById('productos_relacionados');
const opinion = document.getElementById('opinion');
const boton = document.getElementById('boton');
const punctuation = document.getElementById('puntuacion');


document.addEventListener('DOMContentLoaded', async () => {
  info_url =  await getJSONData(PRODUCT_INFO_URL + localStorage.getItem('id') + EXT_TYPE);
  comments = await getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem('id') + EXT_TYPE);

  site_product.innerHTML = getHTML(info_url.data);

  comments.data.forEach(element => {
    site_comments.innerHTML += getCOM(element);
  });

  info_url.data.relatedProducts.forEach(element => {
    site_poductsrelated.innerHTML += getPR(element);
  });    
});

function getHTML(dato){
  return `
      <div class="mt-4">
          <h1>${dato.name}</h1>
      </div>
      <hr>
      <div>
        <p><b>Precio: </b>${dato.currency}${dato.cost}</p>
        <p><b>Descripcion: </b>${dato.description}</p>
        <p><b>Categoria: </b>${dato.category}</p>
        <p><b>Cantidad de vendidos: </b>${dato.soldCount}</p>
        <p><b>Imagenes ilustradas:</b></p>
        <div class="row">
        <div class="col-3 d-flex">
         <img class="img-fluid m-1" src="${dato.images[0]}">
         <img class="img-fluid m-1" src="${dato.images[1]}">
         <img class="img-fluid m-1" src="${dato.images[2]}">
         <img class="img-fluid m-1" src="${dato.images[3]}">
        </div>
        </div>
        </div>
        <hr>
      </div>
   `   
}   

function getCOM(coment){
  return `
  <hr>
    <div id="${coment.product}">
      <p><b>${coment.user}</b> - ${coment.dateTime} - ${addStars(coment.score)}</p>
      <p>${coment.description}</p>
    </div>
  `
}

function getPR(dato) {
  return `
    <div class="m-1" onclick="setIDpoductsrelated(${dato.id})">
     <img class="img-fluid" src="${dato.image}">
     <p><b>${dato.name}</b></p>
   </div>
  `
}

function setIDpoductsrelated(id) {
  localStorage.setItem("id", id);
  window.location = "product-info.html"
}

function addStars(cant) {
const golden_star = `<span class="fa fa-star checked"></span>`;
const black_star = `<span class="fa fa-star"></span>`; 
let cant_golden = [];
let cant_black = [];

for (let i = 0; i < cant; i++) {
  cant_golden += golden_star;
}

for (let i = cant; i < 5; i++) {
  cant_black += black_star;
}

return cant_golden + cant_black; 
};

boton.addEventListener('click', () => {
  var hoy = new Date();
  var ahora = hoy.toLocaleString();
  
  var comment ={};
    comment.product = localStorage.getItem('id');
    comment.description = opinion.value;
    comment.dateTime = ahora;
    comment.user = localStorage.getItem('Email');
    comment.score = parseInt(punctuation.value);
  
  site_comments.innerHTML += getCOM(comment);

  opinion.value = '';
  punctuation.value = 1;
});