# EXAMEN DWEC – Catálogo de Películas 

## Instalación de dependencias

```bash
npm install
```

## Ejecución de Tests

### Abrir Cypress (modo interactivo)
```bash
npm test
```
o bien

```bash
npx cypress open
```

### Ejecutar tests en headless
```bash
npm run test:headless
```

### Levantar servidor local
```bash
npm run serve
```

## Estructura

index.html - HTML con templates
estilos.css - Estilos (sin cambios respecto al enunciado)
main.js - Solución con todas las funciones implementadas

## Funciones implementadas

### cargarPeliculas()
Itera sobre el array peliculas, clona el template y configura cada campo de texto con los valores de la película.

### crearBotonesFiltro()
Itera sobre el array generos, crea botones dinámicamente y asigna listeners que llaman a filtrarPorGenero().

### inicializarBotonesFavoritos()
Selecciona todos los botones .btn-favorito, añade listeners que:
- Obtienen título, género y duración del card padre
- Buscan el id en el array peliculas
- Validan que no exista duplicado
- Añaden a favoritos
- Actualizan la vista

### inicializarBotonesDetalles()
Selecciona todos los botones .btn-detalles, añade listeners que muestran un alert con el título.

### ManejadorEliminar(pelicula)
Función constructora que almacena la película en this.pelicula.

Método .handle():
- Busca el favorito por id en el array
- Lo eliminas
- Actualizas la vista
- Muestra alert de confirmación

### filtrarPorGenero(genero)
Obtener películas del género elegido.
Limpia el contenedor y repinta con el template.
Reinicializa los listeners de botones.

### mostrarFavoritos()
Limpia el contenedor de favoritos.
Si no hay: muestra mensaje "Sin favoritos aún".
Si hay: crea una lista, clona el template, configura datos y asigna objeto manejador a cada botón eliminar.

### init()
Llamadas ordenadas a todas las funciones de inicialización.

## Notas de implementación

- Se usa parentElement para acceder al card padre (no closest())
- Se usa querySelector() para localizar elementos dentro de clones
- Se usa textContent en lugar de innerHTML
- Se usa filter() para filtrar películas
- Se usa findIndex() para encontrar favoritos a eliminar
- Se usa bind() para mantener el contexto de this en el objeto manejador
- No se usan dataset en ninguna función
- Los botones de filtro se crean dinámicamente

## Test

npx cypress open
npm test


## Para probar

1. Abre index.html en el navegador
2. Carga todas las películas automáticamente
3. Prueba añadir películas a favoritos
4. Prueba filtrar por género
5. Prueba ver detalles
6. Prueba eliminar favoritos
