// ======================================================
// EXAMEN - RECUPERACIÓN 1ª EVAL
// Archivo para el alumno: las funciones a implementar están vacías.
// Se mantienen los datos iniciales y la inicialización al cargar la página.
// ======================================================

// ==========================
// Datos iniciales
// ==========================
const peliculas = [
  { id: 1, titulo: "Inception", genero: "Ciencia Ficción", anio: 2010, duracion: "148 min", puntuacion: "8.8/10" },
  { id: 2, titulo: "The Shawshank Redemption", genero: "Drama", anio: 1994, duracion: "142 min", puntuacion: "9.3/10" },
  { id: 3, titulo: "Interstellar", genero: "Ciencia Ficción", anio: 2014, duracion: "169 min", puntuacion: "8.6/10" },
  { id: 4, titulo: "The Dark Knight", genero: "Acción", anio: 2008, duracion: "152 min", puntuacion: "9.0/10" },
  { id: 5, titulo: "Pulp Fiction", genero: "Drama", anio: 1994, duracion: "154 min", puntuacion: "8.9/10" },
  { id: 6, titulo: "Mad Max: Fury Road", genero: "Acción", anio: 2015, duracion: "120 min", puntuacion: "8.1/10" },
  { id: 7, titulo: "The Matrix", genero: "Ciencia Ficción", anio: 1999, duracion: "136 min", puntuacion: "8.7/10" },
  { id: 8, titulo: "Forrest Gump", genero: "Drama", anio: 1994, duracion: "142 min", puntuacion: "8.8/10" }
];

// Géneros únicos
const generos = [...new Set(peliculas.map(p => p.genero))];

// Favoritos global
let favoritos = [];


// ======================================================
// FUNCIONES A IMPLEMENTAR (VACÍAS para el alumno)
// El alumno debe completar la implementación de las siguientes funciones.
// ======================================================

function cargarPeliculas() {
  // TODO: Implementar: rellenar el contenedor #lista-peliculas usando #template-pelicula
}

function crearBotonesFiltro() {
  // TODO: Implementar: crear botones dinámicos en #botones-generos
}

function inicializarBotonesFavoritos() {
  // TODO: Implementar: añadir listeners a .btn-favorito de cada tarjeta
}

function inicializarBotonesDetalles() {
  // TODO: Implementar: añadir listeners a .btn-detalles de cada tarjeta
}

function ManejadorEliminar() {
  // TODO: Implementar: objeto manejador para eliminar favoritos
}

function filtrarPorGenero(genero) {
  // TODO: Implementar: pintar solo las películas del género indicado
}

function mostrarFavoritos() {
  // TODO: Implementar: mostrar la lista de favoritos en #lista-favoritos
}


// ======================================================
// INICIALIZACIÓN (mantener esta llamada)
// ======================================================
function init() {
  cargarPeliculas();
  crearBotonesFiltro();
  inicializarBotonesFavoritos();
  inicializarBotonesDetalles();
  mostrarFavoritos();
}

document.addEventListener('DOMContentLoaded', init);
