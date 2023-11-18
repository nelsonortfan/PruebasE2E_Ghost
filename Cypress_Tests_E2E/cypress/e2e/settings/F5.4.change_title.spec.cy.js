const { faker } = require("@faker-js/faker");
const { ScreenshotHelper } = require("../../support/utils");
var path = require('path');
describe('Cambiar el titulo del sitio y verificar que se haya guardado bien', () => {
    beforeEach(()=>{
        cy.login()
        cy.goToPage("settings/general")
        cy.wait(1000)
    })
    it('Change site title', ()=>{
        const screenshotTaker = new ScreenshotHelper("settings/F5.4")
        screenshotTaker.screenshot("Inicio test, página settings")
        const newTitle = faker.internet.domainWord()
        cy.get('button[data-test-toggle-pub-info=""]').click()
        cy.wait(300)
        screenshotTaker.screenshot("Expandir menú")
        cy.get('input[data-test-title-input=""]').clear()
        cy.get('input[data-test-title-input=""]').type(newTitle)
        screenshotTaker.screenshot("Ingresar nuevo título")
        cy.wait(100)
        cy.get('button[data-test-button="save"]').click()
        screenshotTaker.screenshot("Oprimo botón guardar y verifico que el título haya cambiado")
        cy.wait(500)
        cy.get('div.gh-nav-menu-details-sitetitle').then(($header)=>{
            expect($header[0].innerText).to.equal(newTitle)
        })
    })
  })