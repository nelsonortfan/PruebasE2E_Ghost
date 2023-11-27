const { faker } = require("@faker-js/faker");
const settingsPage = require("../../pages/settingsPage");
describe('Cambiar el titulo del sitio y verificar que se haya guardado bien', () => {
    beforeEach(()=>{
        // Given - Un ambiente normal de trabajo en Ghost en settings/General
        cy.viewport(1000, 660);
        cy.login()
        cy.goToPage("settings/general")
        cy.wait(1000)
    })
    it('Change site title', ()=>{
        // When - I change the site name with a new name from Faker
        const newDescription = faker.lorem.paragraphs(5)
        cy.on('uncaught:exception', (err, runnable) => {
            return false
          })
        settingsPage.changeDescription(newDescription);

        // Then - I check the title is changed
        settingsPage.elements.pResponse().should('exist')
    })
  })