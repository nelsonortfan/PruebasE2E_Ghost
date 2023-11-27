const { faker } = require("@faker-js/faker");
const settingsPage = require("../../pages/settingsPage");
describe('Cambiar el timezone del sitio y verificar que se haya guardado bien', () => {
    beforeEach(()=>{
        // Given - Un ambiente normal de trabajo en Ghost en settings/General
        cy.viewport(1000, 660);
        cy.login()
        cy.goToPage("settings/general")
        cy.wait(1000)
    })
    it('Change site timezone', ()=>{
        // When - I put the language field with a valua
        cy.on('uncaught:exception', (err, runnable) => {
            return false
          })
        settingsPage.changeLanguage('es')
        // And - I put the language field empty
        cy.reload()
        settingsPage.emptyLanguage();

        // Then - I check warning is out 
        settingsPage.elements.alertBanner().should('exist')

    })
  })