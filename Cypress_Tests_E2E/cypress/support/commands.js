// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
require('cypress-iframe');

Cypress.Commands.add('login', () => {
    cy.fixture('credentials_admin_ghost.json').then((credentials)=>{
        cy.session(credentials.email, () => {
            cy.visit('http://localhost:2368/ghost')
            cy.wait(1000)
            cy.get('input[name="identification"]').type(credentials.email)
            cy.get('input[name="password"]').type(credentials.password)
            cy.contains('Sign in').click()
            cy.wait(1000)
        })
    })
  })

Cypress.Commands.add('resetDataForTest', () => {
    cy.visit('http://localhost:2368/ghost/#/settings/labs')
    cy.wait(1000)
    //press the red button called Delete to delete the database
    cy.get('button.gh-btn-red').click()
    //press delete button in the epm-modal-container modal to confirm the delete
    cy.get('button.gh-btn-red').then(($btn) => {
        const button = $btn.get(1)
        button.click()
    })
})