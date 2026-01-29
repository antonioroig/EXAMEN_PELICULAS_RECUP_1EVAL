describe('EXAMEN DWEC - Catálogo de Películas', () => {
  let puntuacionTotal = 0;
  const resultados = [];

  beforeEach(() => {
    cy.visit('/index.html');
  });

  // ============================================================
  // PRUEBA 1: cargarPeliculas() - 1.5 puntos
  // ============================================================
  describe('1. cargarPeliculas() [1.5 puntos]', () => {
    it('✓ Debe cargar todas las 8 películas en el DOM', () => {
      cy.get('#lista-peliculas .pelicula-card').then(($cards) => {
        if ($cards.length !== 8) {
          throw new Error(`❌ FALLA: Se encontraron ${$cards.length} películas, se esperaban 8.\n→ Verifica que cargarPeliculas() itera correctamente sobre el array peliculas con forEach().`);
        }
        resultados.push({ funcion: 'cargarPeliculas', puntos: 0.5, estado: 'PASS' });
        puntuacionTotal += 0.5;
      });
    });

    it('✓ Debe configurar correctamente los títulos', () => {
      cy.get('#lista-peliculas .pelicula-card .titulo').first().should('have.text', 'Inception')
        .then(() => {
          cy.get('#lista-peliculas .pelicula-card .titulo').eq(1).should('have.text', 'The Shawshank Redemption');
          resultados.push({ funcion: 'cargarPeliculas - Títulos', puntos: 0.25, estado: 'PASS' });
          puntuacionTotal += 0.25;
        });
    });

    it('✓ Debe configurar correctamente los géneros, años, duración y puntuación', () => {
      cy.get('#lista-peliculas .pelicula-card').first().within(() => {
        cy.get('.genero').should('have.text', 'Ciencia Ficción')
          .then(() => {
            cy.get('.anio').should('contain', '2010');
            cy.get('.duracion').should('contain', '148 min');
            cy.get('.puntuacion').should('contain', '8.8/10');
            resultados.push({ funcion: 'cargarPeliculas - Datos', puntos: 0.75, estado: 'PASS' });
            puntuacionTotal += 0.75;
          });
      });
    });
  });

  // ============================================================
  // PRUEBA 2: crearBotonesFiltro() - 1.5 puntos
  // ============================================================
  describe('2. crearBotonesFiltro() [1.5 puntos]', () => {
    it('✓ Debe crear 3 botones dinámicos para cada género', () => {
      cy.get('#botones-generos .btn-filtro').then(($btns) => {
        if ($btns.length !== 3) {
          throw new Error(`❌ FALLA: Se crearon ${$btns.length} botones, se esperaban 3 (Ciencia Ficción, Drama, Acción).\n→ Verifica que crearBotonesFiltro() itera sobre el array generos con forEach().\n→ Verifica que limpia primero con innerHTML = ''.`);
        }
        cy.get('#botones-generos .btn-filtro').eq(0).should('have.text', 'Ciencia Ficción');
        resultados.push({ funcion: 'crearBotonesFiltro - Creación', puntos: 0.4, estado: 'PASS' });
        puntuacionTotal += 0.4;
      });
    });

    it('✓ Botones deben ser funcionales y filtrar películas', () => {
      cy.get('#botones-generos .btn-filtro').eq(1).click().then(() => {
        cy.get('#lista-peliculas .pelicula-card').then(($cards) => {
          if ($cards.length !== 3) {
            throw new Error(`❌ FALLA: Al filtrar Drama se muestran ${$cards.length} películas en lugar de 3.\n→ Verifica que filtrarPorGenero() usa filter() correctamente: peliculas.filter(p => p.genero === genero)`);
          }
          resultados.push({ funcion: 'crearBotonesFiltro - Filtrado', puntos: 0.35, estado: 'PASS' });
          puntuacionTotal += 0.35;
        });
      });
    });

    it('✓ Botón clickeado debe tener clase "activo"', () => {
      cy.get('#botones-generos .btn-filtro').contains('Drama').click().then(() => {
        cy.get('#botones-generos .btn-filtro').contains('Drama').should('have.class', 'activo')
          .then(() => {
            resultados.push({ funcion: 'crearBotonesFiltro - Clase activo', puntos: 0.35, estado: 'PASS' });
            puntuacionTotal += 0.35;
          });
      });
    });

    it('✓ Al reclickear botón activo debe mostrar todas las películas y reinicializar listeners', () => {
      cy.get('#botones-generos .btn-filtro').contains('Drama').click();
      cy.get('#botones-generos .btn-filtro').contains('Drama').click().then(() => {
        cy.get('#lista-peliculas .pelicula-card').then(($cards) => {
          if ($cards.length !== 8) {
            throw new Error(`❌ FALLA: Al reclickear el botón activo, se muestran ${$cards.length} películas en lugar de 8.\n→ Verifica que cuando el botón tiene 'activo': llamas a cargarPeliculas() e inicializarBotonesFavoritos() e inicializarBotonesDetalles().`);
          }
          cy.get('#botones-generos .btn-filtro').contains('Drama').should('not.have.class', 'activo');
          resultados.push({ funcion: 'crearBotonesFiltro - Toggle', puntos: 0.4, estado: 'PASS' });
          puntuacionTotal += 0.4;
        });
      });
    });
  });

  // ============================================================
  // PRUEBA 3: inicializarBotonesFavoritos() - 1.5 puntos
  // ============================================================
  describe('3. inicializarBotonesFavoritos() [1.5 puntos]', () => {
    it('✓ Debe tener botones de "Añadir a favoritos" en cada película', () => {
      cy.get('#lista-peliculas .btn-favorito').then(($btns) => {
        if ($btns.length !== 8) {
          throw new Error(`❌ FALLA: Se encontraron ${$btns.length} botones favorito en lugar de 8.\n→ Verifica que cada card tiene su botón y que inicializarBotonesFavoritos() usa querySelectorAll('.btn-favorito').`);
        }
        resultados.push({ funcion: 'inicializarBotonesFavoritos - Botones', puntos: 0.3, estado: 'PASS' });
        puntuacionTotal += 0.3;
      });
    });

    it('✓ Debe añadir película a favoritos y mostrar en la lista', () => {
      cy.get('#lista-peliculas .btn-favorito').first().click();
      cy.get('#lista-favoritos .item-favorito').then(($items) => {
        if ($items.length !== 1) {
          throw new Error(`❌ FALLA: No se añadió a favoritos.\n→ Verifica que el listener: \n  1. Obtiene título/género/duración con parentElement\n  2. Busca la película con find()\n  3. Valida con some() antes de agregar\n  4. Hace push() al array favoritos\n  5. Llama a mostrarFavoritos()`);
        }
        cy.get('#lista-favoritos .fav-titulo').should('have.text', 'Inception');
        resultados.push({ funcion: 'inicializarBotonesFavoritos - Añadir', puntos: 0.5, estado: 'PASS' });
        puntuacionTotal += 0.5;
      });
    });

    it('✓ Debe prevenir duplicados en favoritos', () => {
      cy.get('#lista-peliculas .btn-favorito').first().click();
      cy.get('#lista-peliculas .btn-favorito').first().click();
      cy.get('#lista-favoritos .item-favorito').then(($items) => {
        if ($items.length !== 1) {
          throw new Error(`❌ FALLA: Se añadió duplicado. Hay ${$items.length} elementos en lugar de 1.\n→ Verifica que usas some() para validar que el favorito NO existe ya.`);
        }
        resultados.push({ funcion: 'inicializarBotonesFavoritos - Duplicados', puntos: 0.35, estado: 'PASS' });
        puntuacionTotal += 0.35;
      });
    });

    it('✓ Debe funcionar con múltiples películas diferentes', () => {
      cy.get('#lista-peliculas .btn-favorito').eq(0).click();
      cy.get('#lista-peliculas .btn-favorito').eq(2).click();
      cy.get('#lista-favoritos .item-favorito').then(($items) => {
        if ($items.length !== 2) {
          throw new Error(`❌ FALLA: Se esperaban 2 favoritos y se tienen ${$items.length}.\n→ Verifica que push() funciona correctamente en el segundo clic.`);
        }
        resultados.push({ funcion: 'inicializarBotonesFavoritos - Múltiples', puntos: 0.35, estado: 'PASS' });
        puntuacionTotal += 0.35;
      });
    });
  });

  // ============================================================
  // PRUEBA 4: inicializarBotonesDetalles() - 1 punto
  // ============================================================
  describe('4. inicializarBotonesDetalles() [1 punto]', () => {
    it('✓ Cada película debe tener botón "Ver detalles" funcional', () => {
      cy.get('#lista-peliculas .btn-detalles').then(($btns) => {
        if ($btns.length !== 8) {
          throw new Error(`❌ FALLA: Se encontraron ${$btns.length} botones detalles en lugar de 8.\n→ Verifica que cada card tiene su botón.`);
        }
        cy.get('#lista-peliculas .btn-detalles').first().click();
        cy.on('window:alert', (text) => {
          if (text !== 'Más info sobre: Inception') {
            throw new Error(`❌ FALLA: El alert muestra "${text}" pero debería ser "Más info sobre: Inception".\n→ Verifica que buscas el título del card padre con parentElement y querySelector('.titulo').`);
          }
          resultados.push({ funcion: 'inicializarBotonesDetalles', puntos: 1, estado: 'PASS' });
          puntuacionTotal += 1;
        });
      });
    });
  });

  // ============================================================
  // PRUEBA 5: ManejadorEliminar() - 1.5 puntos
  // ============================================================
  describe('5. ManejadorEliminar() [1.5 puntos]', () => {
    it('✓ Constructor debe funcionar correctamente', () => {
      cy.get('#lista-peliculas .btn-favorito').first().click().then(() => {
        cy.get('#lista-favoritos .btn-eliminar').then(($btn) => {
          if ($btn.length === 0) {
            throw new Error(`❌ FALLA: No hay botón eliminar en favoritos.\n→ Verifica que mostrarFavoritos() crea el botón desde el template correctamente.`);
          }
          resultados.push({ funcion: 'ManejadorEliminar - Constructor', puntos: 0.5, estado: 'PASS' });
          puntuacionTotal += 0.5;
        });
      });
    });

    it('✓ Método handleEvent debe eliminar del array correctamente con indexOf() y splice()', () => {
      cy.get('#lista-peliculas .btn-favorito').first().click();
      cy.get('#lista-favoritos .btn-eliminar').first().click();
      cy.get('#lista-favoritos .vacio').should('have.text', 'Sin favoritos aún').then(() => {
        resultados.push({ funcion: 'ManejadorEliminar - Eliminar', puntos: 0.5, estado: 'PASS' });
        puntuacionTotal += 0.5;
      });
    });

    it('✓ Debe eliminar solo el favorito correcto sin afectar otros', () => {
      cy.get('#lista-peliculas .btn-favorito').eq(0).click();
      cy.get('#lista-peliculas .btn-favorito').eq(1).click();
      cy.get('#lista-favoritos .item-favorito').should('have.length', 2);
      cy.get('#lista-favoritos .btn-eliminar').first().click().then(() => {
        cy.get('#lista-favoritos .item-favorito').then(($items) => {
          if ($items.length !== 1) {
            throw new Error(`❌ FALLA: Se eliminaron múltiples elementos (quedan ${$items.length} en lugar de 1).\n→ Verifica que el manejador accede a this.favorito correctamente y elimina solo ese.`);
          }
          cy.get('#lista-favoritos .fav-titulo').should('have.text', 'The Shawshank Redemption');
          resultados.push({ funcion: 'ManejadorEliminar - Selectividad', puntos: 0.5, estado: 'PASS' });
          puntuacionTotal += 0.5;
        });
      });
    });
  });

  // ============================================================
  // PRUEBA 6: filtrarPorGenero() - 1.5 puntos
  // ============================================================
  describe('6. filtrarPorGenero() [1.5 puntos]', () => {
    it('✓ Debe usar filter() para Ciencia Ficción correctamente', () => {
      cy.get('#botones-generos .btn-filtro').contains('Ciencia Ficción').click().then(() => {
        cy.get('#lista-peliculas .pelicula-card').then(($cards) => {
          if ($cards.length !== 3) {
            throw new Error(`❌ FALLA: Se muestran ${$cards.length} películas Ciencia Ficción en lugar de 3.\n→ Verifica que filter() compara correctamente: p.genero === genero`);
          }
          resultados.push({ funcion: 'filtrarPorGenero - Ciencia Ficción', puntos: 0.3, estado: 'PASS' });
          puntuacionTotal += 0.3;
        });
      });
    });

    it('✓ Debe filtrar correctamente por Drama', () => {
      cy.get('#botones-generos .btn-filtro').contains('Drama').click().then(() => {
        cy.get('#lista-peliculas .pelicula-card').should('have.length', 3);
        cy.get('#lista-peliculas .pelicula-card .titulo').first().should('have.text', 'The Shawshank Redemption');
        resultados.push({ funcion: 'filtrarPorGenero - Drama', puntos: 0.3, estado: 'PASS' });
        puntuacionTotal += 0.3;
      });
    });

    it('✓ Debe filtrar correctamente por Acción', () => {
      cy.get('#botones-generos .btn-filtro').contains('Acción').click().then(() => {
        cy.get('#lista-peliculas .pelicula-card').then(($cards) => {
          if ($cards.length !== 2) {
            throw new Error(`❌ FALLA: Se muestran ${$cards.length} películas Acción en lugar de 2.`);
          }
          resultados.push({ funcion: 'filtrarPorGenero - Acción', puntos: 0.3, estado: 'PASS' });
          puntuacionTotal += 0.3;
        });
      });
    });

    it('✓ Los botones de favoritos deben funcionar tras filtrar', () => {
      cy.get('#botones-generos .btn-filtro').contains('Drama').click();
      cy.get('#lista-peliculas .btn-favorito').first().click().then(() => {
        cy.get('#lista-favoritos .item-favorito').should('have.length', 1);
        resultados.push({ funcion: 'filtrarPorGenero - Listeners Favoritos', puntos: 0.3, estado: 'PASS' });
        puntuacionTotal += 0.3;
      });
    });

    it('✓ Los botones de detalles deben funcionar tras filtrar', () => {
      cy.get('#botones-generos .btn-filtro').contains('Drama').click();
      cy.get('#lista-películas .btn-detalles').first().click().then(() => {
        cy.on('window:alert', (text) => {
          if (!text.includes('Más info sobre:')) {
            throw new Error(`❌ FALLA: El botón detalles no funciona tras filtrar.\n→ Verifica que reinicializas listeners al final de filtrarPorGenero().`);
          }
          resultados.push({ funcion: 'filtrarPorGenero - Detalles', puntos: 0.2, estado: 'PASS' });
          puntuacionTotal += 0.2;
        });
      });
    });
  });

  // ============================================================
  // PRUEBA 7: mostrarFavoritos() - 1.5 puntos
  // ============================================================
  describe('7. mostrarFavoritos() [1.5 puntos]', () => {
    it('✓ Debe mostrar "Sin favoritos aún" cuando está vacío', () => {
      cy.get('#lista-favoritos .vacio').then(($el) => {
        if (!$el.length) {
          throw new Error(`❌ FALLA: No hay mensaje vacío.\n→ Verifica que mostrarFavoritos() crea <p class="vacio"> cuando favoritos.length === 0.`);
        }
        cy.get('#lista-favoritos .vacio').should('have.text', 'Sin favoritos aún');
        resultados.push({ funcion: 'mostrarFavoritos - Vacío', puntos: 0.3, estado: 'PASS' });
        puntuacionTotal += 0.3;
      });
    });

    it('✓ Debe crear lista <ul> cuando hay favoritos', () => {
      cy.get('#lista-peliculas .btn-favorito').first().click().then(() => {
        cy.get('#lista-favoritos ul').then(($ul) => {
          if (!$ul.length) {
            throw new Error(`❌ FALLA: No se crea la lista <ul>.\n→ Verifica que mostrarFavoritos() crea un <ul> cuando hay favoritos.`);
          }
          cy.get('#lista-favoritos .item-favorito').should('have.length', 1);
          resultados.push({ funcion: 'mostrarFavoritos - Lista', puntos: 0.35, estado: 'PASS' });
          puntuacionTotal += 0.35;
        });
      });
    });

    it('✓ Debe clonar template correctamente para cada favorito', () => {
      cy.get('#lista-peliculas .btn-favorito').eq(0).click();
      cy.get('#lista-peliculas .btn-favorito').eq(1).click().then(() => {
        cy.get('#lista-favoritos .fav-titulo').then(($titles) => {
          if ($titles.length !== 2) {
            throw new Error(`❌ FALLA: Se esperaban 2 títulos en favoritos, hay ${$titles.length}.\n→ Verifica que clona el template para cada elemento con cloneNode(true).`);
          }
          cy.wrap($titles[0]).should('have.text', 'Inception');
          cy.wrap($titles[1]).should('have.text', 'The Shawshank Redemption');
          resultados.push({ funcion: 'mostrarFavoritos - Template', puntos: 0.35, estado: 'PASS' });
          puntuacionTotal += 0.35;
        });
      });
    });

    it('✓ Debe asignar manejador a botones eliminar correctamente con handleEvent', () => {
      cy.get('#lista-peliculas .btn-favorito').first().click();
      cy.get('#lista-favoritos .btn-eliminar').should('exist');
      cy.get('#lista-favoritos .btn-eliminar').first().click();
      cy.get('#lista-favoritos .vacio').should('have.text', 'Sin favoritos aún').then(() => {
        resultados.push({ funcion: 'mostrarFavoritos - Manejador', puntos: 0.5, estado: 'PASS' });
        puntuacionTotal += 0.5;
      });
    });
  });

  // ============================================================
  // RESUMEN FINAL CON VISUALIZACIÓN
  // ============================================================
  after(() => {
    const calificacion = (puntuacionTotal / 10 * 100).toFixed(1);
    const estado = puntuacionTotal >= 9.5 ? '✓ EXCELENTE' : puntuacionTotal >= 8.5 ? '✓ MUY BIEN' : puntuacionTotal >= 7.5 ? '✓ BIEN' : puntuacionTotal >= 6 ? '◐ APROBADO' : '✗ NO APROBADO';
    
    cy.log(`
╔═══════════════════════════════════════════════════════════╗
║          RESULTADO FINAL DEL EXAMEN DWEC                 ║
╠═══════════════════════════════════════════════════════════╣
║  Puntuación: ${puntuacionTotal.toFixed(2)}/10 (${calificacion}%)                 
║  Estado: ${estado}
╠═══════════════════════════════════════════════════════════╣
║  Tests exitosos: ${resultados.length}
║  Funciones implementadas: ${Math.ceil(puntuacionTotal / 2)}/7
║  Nota final: ${(puntuacionTotal).toFixed(2)}
╚═══════════════════════════════════════════════════════════╝
    `);
  });
});

