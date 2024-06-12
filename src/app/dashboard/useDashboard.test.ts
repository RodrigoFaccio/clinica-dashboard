/// <reference types="cypress" />

describe('Result list ', () => {

  const mockData = { data: [
    { "id": 1, "name": "John" },
    { "id": 2, "name": "Doe" },
    { "id": 3, "name": "Ermano" },
    { "id": 4, "name": "Donny" },
    { "id": 5, "name": "Alfredo" },
    { "id": 6, "name": "Caiao" },
    { "id": 7, "name": "Cesao" },
    { "id": 8, "name": "Capitu" },

  ]};

  // Intercepta a chamada de API para os pacientes e modifica a resposta


  beforeEach(() => {
    cy.intercept('GET', '/patients', {
      statusCode: 200,
      body: mockData
    }).as('patientsApi');
    cy.login('Mirou', 'Teste12345');
    cy.url().should('include', '/dashboard');
  });

  it('should have more than one item in the list', () => {
    // Define os dados que você quer passar no corpo da resposta


    // Visite a página do painel
    cy.visit('/dashboard');

    // Aguarde a chamada de API ser concluída
    cy.wait('@patientsApi').then((interception) => {
      // O corpo da resposta já é um objeto JavaScript, então não precisamos de JSON.parse
      const responseBody = interception.response?.body.data;

      // Certifique-se de que o array tem mais de um item
      expect(responseBody.length).to.be.greaterThan(1);
    });

    // Verifique se você está na página do painel
    cy.url().should('include', '/dashboard');
  });
});
