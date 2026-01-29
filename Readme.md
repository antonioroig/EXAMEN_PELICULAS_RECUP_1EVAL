# EXAMEN DWEC – Catálogo de Películas 

## Instalación de dependencias

```bash
npm install
```

## Estructura

index.html - HTML con templates
estilos.css - Estilos (sin cambios respecto al enunciado)
main.js - Solución con todas las funciones implementadas



## Puntuación

Los tests están organizados por función y asignan puntos:

## Funciones a implementar

- **cargarPeliculas()**: 1.5 puntos
  - Verifica que se cargan 8 películas
  - Comprueba que títulos, géneros, años y duraciones son correctos

- **crearBotonesFiltro()**: 1.5 puntos
  - Verifica creación de 3 botones (uno por género)
  - Comprueba la clase 'activo' al filtrar
  - Verifica que al reclickear se muestran todas las películas

- **inicializarBotonesFavoritos()**: 1.5 puntos
  - Verifica que los botones añaden películas a favoritos
  - Valida que no permite duplicados
  - Comprueba que actualiza la vista de favoritos

- **inicializarBotonesDetalles()**: 1 punto
  - Verifica que muestra alerts con información de películas

- **ManejadorEliminar()**: 1.5 puntos
  - Comprueba que elimina correctamente de favoritos
  - Verifica que el array se actualiza correctamente

- **filtrarPorGenero()**: 1.5 puntos
  - Valida filtrado por cada género
  - Comprueba que funciona correctamente después de filtrar

- **mostrarFavoritos()**: 1.5 puntos
  - Verifica mensaje "Sin favoritos aún" cuando está vacío
  - Comprueba creación de lista cuando hay favoritos

**Total: 10 puntos**
## Test

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


## Para probar

1. Abre index.html en el navegador
2. Carga todas las películas automáticamente
3. Prueba añadir películas a favoritos
4. Prueba filtrar por género
5. Prueba ver detalles
6. Prueba eliminar favoritos
