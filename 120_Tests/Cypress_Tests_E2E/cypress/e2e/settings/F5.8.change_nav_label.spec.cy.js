const { faker } = require("@faker-js/faker");
const settingsPage = require("../../pages/settingsPage");
describe('Cambiar label de navigation', () => {
    beforeEach(()=>{
        // Given - Un ambiente normal de trabajo en Ghost en settings/Navigation
        cy.viewport(1000, 660);
        cy.login()
        cy.goToPage("settings/navigation")
        cy.wait(1000)
    })
    it('Change site title', ()=>{
        // When - I change the first label of navigation
        const newLabel = faker.lorem.word()
        
        // Then - I check the login is not succesfull
        settingsPage.changeNavPrimField(newLabel, 0)
        cy.visit(Cypress.env("ghost_url").slice(0, -6))
        cy.contains(newLabel).should('exist');

    })
  })