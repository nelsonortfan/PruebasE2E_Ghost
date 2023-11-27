const { faker } = require("@faker-js/faker");
const settingsPage = require("../../pages/settingsPage");
describe('Cerrar sesión y entrar con valores aleatorios', () => {
    beforeEach(()=>{
        // Given - Un ambiente normal de trabajo en Ghost en settings/General
        cy.viewport(1000, 660);
        cy.login()
        cy.goToPage("settings/general")
        cy.wait(1000)
    })
    it('Change site title', ()=>{
        // When - I logout
        cy.goToPage("signout")
        const userEmail = faker.internet.email()
        const userPass = faker.internet.password()
        cy.loginValues(userEmail, userPass)
        
        // Then - I check the login is not succesfull
        settingsPage.elements.loginFailure().should('exist')
        // And - We enter again to Ghost to avoid too many wrong attempts
        cy.loginValues(Cypress.env("ghost_email"), Cypress.env("ghost_password"))
    })
  })