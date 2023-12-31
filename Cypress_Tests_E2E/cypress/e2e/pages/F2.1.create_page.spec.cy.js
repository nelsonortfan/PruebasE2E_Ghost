const { ScreenshotHelper } = require("../../support/utils");
var path = require('path');

describe('Crear una nueva Page y guardarlo exitosamente, finalmente verificar que se encuentre listada', () => {
	
	var page_name = `Pagina de Prueba E2E realizada en 09/11/2023`
	var description = `Descripcion para la pagina de prueba a crear`
	
    beforeEach(() => {
		cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should create a new page', () => {
		
		const screenshotTaker = new ScreenshotHelper("pages/F2.1")	
		
		cy.wait(1000) 
        cy.goToPage("pages/");
		cy.wait(3000)
		screenshotTaker.screenshot("Pantalla inicial de pages")
		cy.wait(1000)
		cy.contains('New page').click()
		cy.get('textarea[placeholder="Page title"]').type(page_name)
		cy.get('.koenig-lexical').eq(1).click().type(description)
		cy.wait(1000)
		screenshotTaker.screenshot("Pantalla campos de new page")
		cy.contains('Publish').click()
		cy.wait(1000)
		screenshotTaker.screenshot("Pantalla publicacion page")
		cy.contains('Continue, final review').click()
		cy.wait(1000)
		screenshotTaker.screenshot("Pantalla continuacion page")
		cy.contains('Publish page, right now').click()				
		cy.wait(1000)
		cy.contains(page_name)
		cy.contains(description)		
		cy.wait(1000) 
		screenshotTaker.screenshot("Pantalla validacion page")
        cy.goToPage("pages/");
		cy.wait(1000)		
		cy.contains(page_name)		
		const item = cy.get('.feature-memberAttribution').get('div[role="menuitem"]').eq(0)
        item.contains(
            page_name
          )	
		screenshotTaker.screenshot("Pantalla validacion creacion de page")
    })
})