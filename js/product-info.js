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
        <div id="carouselExampleIndicators" class="carousel carousel-dark carousel-fade slide" data-bs-ride="carousel">
        <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="${dato.images[0]}" class="d-block img-fluid rounded mx-auto">
        </div>
        <div class="carousel-item">
          <img src="${dato.images[1]}" class="d-block img-fluid rounded mx-auto">
        </div>
        <div class="carousel-item">
          <img src="${dato.images[2]}" class="d-block img-fluid rounded mx-auto">
        </div>
        <div class="carousel-item">
          <img src="${dato.images[3]}" class="d-block img-fluid rounded mx-auto">
        </div>
      </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Siguiente</span>
        </button>
      </div>
     </div>
    <hr>
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
    <div class="m-1 border p-2 shadow" onclick="setIDpoductsrelated(${dato.id})">
     <img class="img-fluid pb-1" src="${dato.image}">
     <p class="text-center">${dato.name}</p>
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