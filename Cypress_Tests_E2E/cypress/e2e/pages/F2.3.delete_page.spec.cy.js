Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  
const { ScreenshotHelper } = require("../../support/utils");
var path = require('path');

describe('Eliminar una Page creada', () => {
	
	var page_title_new = null
	var description = `Descripción Actualizada para la pagina de prueba a crear`
	var page_title_initial = 'Titulo inicial para eliminar'
	
    beforeEach(() => {
		cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should create a new page and delete it successfully', () => {
		
		const screenshotTaker = new ScreenshotHelper("pages/F2.3")
       
		cy.wait(1000) 
        cy.goToPage("pages/");
		cy.wait(3000)
		screenshotTaker.screenshot("Pantalla inicial de pages")
		cy.contains(page_title_initial).should('not.exist')
		cy.contains('New page').click()
		cy.get('textarea[placeholder="Page title"]').type(page_title_initial)
		cy.get('.koenig-lexical').eq(1).click().type(description)
		cy.contains('Publish').click()
		cy.contains('Continue, final review').click()
		cy.contains('Publish page, right now').click()		
		cy.wait(1000)
		cy.contains(page_title_initial)
		cy.contains(description)
		cy.wait(1000) 
        cy.goToPage("pages/");
		cy.wait(1000)
		screenshotTaker.screenshot("Pantalla validar pagina creada")
		cy.get('.feature-memberAttribution').get('div[role="menuitem"]').eq(0).click()
		cy.wait(1000)
		cy.get('button[title="Settings"]').click()
		cy.wait(2000)
		screenshotTaker.screenshot("Pantalla boton para borrar")		
		cy.get('.settings-menu-delete-button').click()
		cy.wait(1000)		
		cy.get('.modal-content').should('be.visible')
		cy.wait(2000)
		screenshotTaker.screenshot("Pantalla mensaje para borrar 1")	
		cy.get('.modal-footer').get('.gh-btn.gh-btn-red.gh-btn-icon.ember-view').		
		contains('Delete').click({force: true})
		screenshotTaker.screenshot("Pantalla mensaje borrado confirmado")	
		cy.wait(1000)
		cy.contains('All pages')
		cy.wait(1000) 
        cy.goToPage("pages/");
		cy.wait(1000)
		cy.contains(page_title_initial).should('not.exist')		
		cy.wait(1000)
		cy.wait(1000)
		screenshotTaker.screenshot("Pantalla validar pagina eliminada")
		
    })
})