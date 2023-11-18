const { faker } = require("@faker-js/faker");
const { ScreenshotHelper } = require("../../support/utils");
var path = require('path');
describe('Cambiar el titulo del sitio y verificar que se haya guardado bien', () => {
    beforeEach(()=>{
        cy.loginOld()
        cy.goToPageOld("settings/general")
        cy.wait(1000)
    })
    it('Change site title', ()=>{
        const screenshotTaker = new ScreenshotHelper("settings_old/F5.4")
        screenshotTaker.screenshot("Inicio test, página settings")
        const newTitle = faker.internet.domainWord()
        cy.get('button[data-ember-action=""]').then(($expand) =>{
            $expand[2].click();
        })
        cy.wait(300)
        screenshotTaker.screenshot("Expandir menú")
        cy.get('input[class="ember-text-field gh-input ember-view"]').first().clear()
        cy.get('input[class="ember-text-field gh-input ember-view"]').first().type(newTitle, {force:true})
        screenshotTaker.screenshot("Ingresar nuevo título")
        cy.wait(100)
        cy.get('button[class="gh-btn gh-btn-blue gh-btn-icon ember-view"]').click()
        screenshotTaker.screenshot("Oprimo botón guardar y verifico que el título haya cambiado")
        cy.wait(500)
        cy.get('div.gh-nav-menu-details-blog').then(($header)=>{
            expect($header[0].innerText).to.equal(newTitle)
        })
    })
  })