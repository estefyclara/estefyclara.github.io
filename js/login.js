document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('form')

    // Le agrego un escucha en el evento 'submit' que será
    // lanzado por el formulario cuando se seleccione 'Iniciar Sesión'.
    form.addEventListener('submit', function (event) {
      event.preventDefault()
      var email = document.getElementById('emailInput').value;
      var password = document.getElementById('passwordInput').value;
      
      if (email.length == 0 || password.length == 0) {
          form.classList.add('was-validated')
      } else {
          (window.location.href = "home.html") && (localStorage.setItem('Email', email)); 
      }
    }) 
    localStorage.removeItem('Email');
  });