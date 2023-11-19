const { ScreenshotHelper } = require("../../support/utils");
var path = require('path');

describe('Crear 2 pages con el title repetido', () => {
	
	var page_title_new = null
	var description = `Descripción Actualizada para la pagina de prueba a crear`
	var page_title_initial = 'Titulo inicial repetido' + Date.now()
	
    beforeEach(() => {
        cy.login()
        cy.resetDataForTest()
    })

    it('Should create 2 pages with the title repeated', () => {
		
		const screenshotTaker = new ScreenshotHelper("pages/F2.4")
		
		cy.wait(1000)
		cy.goToPage("pages/");	
		cy.wait(3000)
		screenshotTaker.screenshot("Pantalla inicial de pages")
		cy.contains('Pages').click()
		cy.wait(1000)		
		cy.contains('All pages')
		cy.contains('New page').click()
		cy.get('textarea[placeholder="Page title"]').type(page_title_initial)
		cy.get('.koenig-lexical').eq(1).click().type(description)
		cy.wait(1000)
		screenshotTaker.screenshot("Pantalla campos de new page")
		cy.contains('Publish').click()
		cy.contains('Continue, final review').click()
		cy.wait(1000)
		cy.contains('Publish page, right now').click()		
		cy.wait(2000)
		cy.contains(page_title_initial)
		cy.contains(description)
		cy.wait(1000)
		cy.goToPage("pages/");
		cy.wait(1000)
		cy.contains(page_title_initial)
		cy.wait(1000) 
		screenshotTaker.screenshot("Pantalla validacion page")
		cy.contains('New page').click()
		cy.get('textarea[placeholder="Page title"]').type(page_title_initial)
		cy.get('.koenig-lexical').eq(1).click().type(description)
		cy.wait(1000) 
		screenshotTaker.screenshot("Pantalla page titulo repetido")
		cy.contains('Publish').click()
		cy.contains('Continue, final review').click()
		cy.wait(1000)
		cy.contains('Publish page, right now').click()		
		cy.wait(2000)
		cy.goToPage("pages/");
		cy.wait(1000) 
		screenshotTaker.screenshot("Pantalla home con 2 pages")
		cy.get('.feature-memberAttribution').get('div[role="menuitem"]').eq(0).click()
		cy.wait(1000)
		cy.get('textarea[placeholder="Page title"]').should(($input) => {		
		page_title_new = $input.val()
		expect(page_title_new).to.equal(page_title_initial)	
		})
		cy.wait(1000) 
		screenshotTaker.screenshot("Pantalla validar titulo page 1")		
		cy.contains('Pages').click()
		cy.wait(1000)		
		cy.contains('All pages')
		cy.get('.feature-memberAttribution').get('div[role="menuitem"]').eq(1).click()
		cy.wait(1000)
		cy.get('textarea[placeholder="Page title"]').should(($input) => {		
		page_title_new = $input.val()
		expect(page_title_new).to.equal(page_title_initial)	
		})
		cy.wait(1000) 
		screenshotTaker.screenshot("Pantalla validar titulo page 2")		
		cy.contains('Pages').click()
		cy.wait(1000)		
		cy.contains('All pages')
		

    })
})