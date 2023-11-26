const { ScreenshotHelper } = require("../../support/utils");
var path = require('path');

describe('Crear una nueva Page y guardarlo exitosamente, finalmente verificar que se encuentre listada', () => {
	
	var page_name = `Pagina de Prueba E2E realizada en 09/11/2023`
	var description = `Descripcion para la pagina de prueba a crear`
	
    beforeEach(() => {
		cy.viewport(1000, 660);
        cy.loginOld();
        cy.resetDataForTestOld();
    })

    it('Should create a new page', () => {
		
		const screenshotTaker = new ScreenshotHelper("pages_old/F2.1")	
		
		cy.wait(1000) 
        cy.goToPageOld("pages/");
		cy.wait(1000)
		screenshotTaker.screenshot("Pantalla inicial de pages")
		cy.wait(1000)
		cy.contains('New page').click()
		cy.get('textarea[placeholder="Page Title"]').type(page_name)
		cy.get('div[data-placeholder="Begin writing your page..."]').click().type(description)
		cy.wait(1000)
		screenshotTaker.screenshot("Pantalla campos de new page")
		cy.contains('Publish').click()
		cy.wait(1000)
		screenshotTaker.screenshot("Pantalla publicacion page")
		cy.get('button.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view').click()
		cy.wait(1000)
		screenshotTaker.screenshot("Pantalla continuacion page")
		cy.wait(1000)
		cy.contains('Pages').click()				
		cy.wait(1000)		
		cy.contains(page_name)
		cy.wait(1000) 
		screenshotTaker.screenshot("Pantalla validacion page")
        cy.goToPageOld("pages/");
		cy.wait(1000)		
		cy.contains(page_name)		
		const item = cy.get('h3.gh-content-entry-title')
        item.contains(
            page_name
          )	
		screenshotTaker.screenshot("Pantalla validacion creacion de page")
		
		
    })
	
})