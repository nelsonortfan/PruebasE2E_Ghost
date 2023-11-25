const { ScreenshotHelper } = require("../../support/utils");
var path = require('path');
describe('Importar miembros', () => {
    beforeEach(()=>{
        cy.viewport(1000, 660);
        cy.login()
        cy.deleteAllMembers()
        cy.goToPage("members")
        cy.wait(1000)
    })
    it('Import members and delete them', ()=>{
        const screenshotTaker = new ScreenshotHelper("members/F1.2")
        cy.get('button[data-test-button="members-actions"]').click()
        cy.wait(500)
        screenshotTaker.screenshot("Botones de acciones - Botón de importar")
        cy.get('a[data-test-link="import-csv"]').click()
        cy.wait(100)
        screenshotTaker.screenshot("Agregar archivo csv")
        cy.get('.x-file-input').first().within(() => {
            cy.get('.x-file--input').selectFile('members.csv', { force: true })
        })
        cy.wait(500)
        screenshotTaker.screenshot("Oprimir botón de realizar importación")
        cy.get('button[data-test-button="perform-import"]').click()
        cy.wait(1000)
        screenshotTaker.screenshot("Cerrar importación de miembros")
        cy.get('button[data-test-button="close-import-members"]').click()
        cy.wait(1000)
        screenshotTaker.screenshot("Comprobar que los miembros se hayan importado correctamente.")
        cy.get('h3').then(($header)=>{
            expect($header[0].innerText).to.equal('Nombre de prueba 3')
            expect($header[1].innerText).to.equal('Nombre de prueba 2')
            expect($header[2].innerText).to.equal('Nombre de prueba 1')
        })
    })
  })