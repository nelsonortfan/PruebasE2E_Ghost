const { faker } = require("@faker-js/faker");
const settingsPage = require("../pages/settingsPage");
describe('Cambiar el timezone del sitio y verificar que se haya guardado bien', () => {
    beforeEach(()=>{
        // Given - Un ambiente normal de trabajo en Ghost en settings/General
        cy.viewport(1000, 660);
        cy.login()
        cy.goToPage("settings/general")
        cy.wait(1000)
    })
    it('Change site timezone', ()=>{
        // When - I put the language field with a new value
        const newLang = faker.lorem.word()
        settingsPage.changeLanguage(newLang)

        // Then - I check the new language is saved
        settingsPage.elements.languageInput().should('have.value', newLang)
    })
})