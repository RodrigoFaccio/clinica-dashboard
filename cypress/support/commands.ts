/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

declare namespace Cypress {
  interface Chainable {
    /**
       * Creates a new cart and adds items to it
       * @memberof Cypress.Chainable
       * @example
        ```
        cy.addToCart(productCode, quantity, accessToken)
        ```
       */
    addToCart: (itemId: string, quantity: string, accessToken: string) => void;

     /**
       * Custom command to perform login action
       * @example cy.login('email@example.com', 'password123')
       */
    login:(email:string, password:string) => void
  }
}

Cypress.Commands.add('login', (email:string, password:string) => {
    cy.viewport(1920,1080)
cy.visit('http://localhost:3000');
cy.get('[data-testid=username]').type(email);
cy.get('[data-testid=password]').type(password);
cy.get('[data-testid="enterLogin"]').click();
})

// Cypress.on('before:browser:launch', (browser, launchOptions) => {
//     if (browser.name === 'chrome' || browser.name === 'electron' || browser.name === 'edge') {
//       launchOptions.args.push('--disable-http-cache');
//       return launchOptions;
//     }

//     return launchOptions;
//   });

