/// <reference types="cypress" />

describe('Login Test ', () => {
  it('should login successfully', () => {

    // Configura o viewport
    cy.viewport(1920, 1080);

    // Visite a página de login
    cy.visit('http://localhost:3000');

    // Digite o nome de usuário e a senha
    cy.get('[data-testid=username]').type('Mirou');
    cy.get('[data-testid=password]').type('Teste12345');

    // Clique no botão de login
    cy.get('[data-testid="enterLogin"]').click();

    // Aguarde a chamada de API ser concluída


    // Verifique se você foi redirecionado para a página do painel (ou qualquer outra página para a qual você é redirecionado após o login bem-sucedido)
    cy.url().should('include', '/dashboard');

    // Você também pode verificar se algum elemento que só é visível após o login está presente
    cy.get('header').should('be.visible');
  });

  it('should login unsuccessful', () => {

    // Intercepta a chamada de API para o login
    cy.intercept('POST', '/user/login').as('loginApi');

    // Configura o viewport
    cy.viewport(1920, 1080);

    // Visite a página de login
    cy.visit('http://localhost:3000');

    // Digite o nome de usuário e a senha incorretos
    cy.get('[data-testid=username]').type('WrongEmail');
    cy.get('[data-testid=password]').type('WrongPassword');

    // Clique no botão de login
    cy.get('[data-testid="enterLogin"]').click();

    // Aguarde a chamada de API ser concluída
    cy.wait('@loginApi').then((interception) => {
      // Verifique o código e a mensagem da resposta
      console.log(interception)
      expect(interception.response?.body.code).to.eq(400);
      expect(interception.response?.body.message).to.include('Usuario ou senha incorretos');
    });

    // Aqui você pode continuar o resto do seu teste, talvez verificando que a URL ainda é a página de login
    cy.url().should('include', '/');
  });

});
