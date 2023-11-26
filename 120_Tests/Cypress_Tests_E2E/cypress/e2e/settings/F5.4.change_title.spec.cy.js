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
        const newTitle = faker.internet.domainWord()
        settingsPage.changeTitle(newTitle);
        // cy.get('button[data-test-toggle-pub-info=""]').click()
        // cy.wait(300)
        // screenshotTaker.screenshot("Expandir menú")
        // cy.get('input[data-test-title-input=""]').clear()
        // cy.get('input[data-test-title-input=""]').type(newTitle)
        // screenshotTaker.screenshot("Ingresar nuevo título")
        // cy.wait(100)
        // cy.get('button[data-test-button="save"]').click()
        // screenshotTaker.screenshot("Oprimo botón guardar y verifico que el título haya cambiado")
        // cy.wait(500)
        settingsPage.elements.siteTitle().then(($header)=>{
            expect($header[0].innerText).to.equal(newTitle)
        })
    })
  })