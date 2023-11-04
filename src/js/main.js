// Realiza una solicitud para obtener un archivo JSON externo
fetch('../data/test.json')
  .then(response => response.json()) // Convierte la respuesta en JSON
  .then(data => {
    // Llama a una función para renderizar los datos JSON utilizando Handlebars
    renderizarDatos(data);
  })
  .catch(error => {
    console.error('Error al obtener los datos JSON externos:', error);
  });

// Función para renderizar los datos JSON
function renderizarDatos(data) {
  // Obtiene el template Handlebars
  var source = document.getElementById('json-template').innerHTML;
  
  // Compila el template
  var template = Handlebars.compile(source);
  
  // Renderiza los datos
  var html = template(data);
  
  // Inserta el HTML renderizado en el contenedor en tu documento
  document.getElementById('json-container').innerHTML = html;
}



