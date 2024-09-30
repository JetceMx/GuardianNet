// Función para cargar contenido HTML en un contenedor
function loadHTML(id, url) {
    const element = document.getElementById(id);
    fetch(url)
      .then(response => response.text())
      .then(data => element.innerHTML = data)
      .catch(error => console.log('Error al cargar el archivo:', error));
  }

  // Cargar el header y el footer
  loadHTML('header-container', 'header.html');
  loadHTML('footer-container', 'footer.html');