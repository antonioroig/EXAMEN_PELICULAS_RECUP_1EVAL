// ===============================================
// Cypress Support File (copiado para el repo de la plantilla)
// ===============================================

// Ignorar excepciones no capturadas
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

// Comandos personalizados
Cypress.Commands.add('checkPoint', (message) => {
  cy.log(`✓ ${message}`);
});

Cypress.Commands.add('failPoint', (message) => {
  cy.log(`✗ ${message}`);
});
