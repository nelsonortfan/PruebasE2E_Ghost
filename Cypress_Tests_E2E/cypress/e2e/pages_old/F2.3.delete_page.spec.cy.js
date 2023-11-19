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
        cy.login()
        cy.resetDataForTest()
    })

    it('Should create a new page and delete it successfully', () => {
		
		const screenshotTaker = new ScreenshotHelper("F2.3_initial_resolution")
       
		cy.wait(1000) 
        cy.goToPage("pages/");
		cy.wait(3000)
		screenshotTaker.screenshot("Pantalla inicial de pages")
		cy.wait(1000)
		cy.contains(page_title_initial).should('not.exist')
		cy.contains('New page').click()
		cy.get('textarea[placeholder="Page Title"]').type(page_title_initial)
		cy.get('div[data-placeholder="Begin writing your page..."]').click().type(description)
		cy.contains('Publish').click()			
		cy.wait(1000)
		cy.get('button.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view').click()			
		cy.wait(1000)
		cy.goToPage("pages/");
		cy.wait(1000)
		cy.contains(page_title_initial)		
		cy.wait(1000)        
		screenshotTaker.screenshot("Pantalla validar pagina creada")
		cy.wait(1000) 
		cy.get('a[title="Edit this page"]').eq(0).click()
		cy.wait(1000)
		cy.get('button[title="Settings"]').click()
		cy.wait(2000)
		screenshotTaker.screenshot("Pantalla boton para borrar")		
		cy.wait(1000)
		cy.contains("Delete").click()
		cy.wait(1000)		
		cy.get('.modal-content').should('be.visible')
		cy.wait(1000)
		screenshotTaker.screenshot("Pantalla mensaje para borrar")	
		cy.get('.modal-footer').get('.gh-btn.gh-btn-red.gh-btn-icon.ember-view').
		contains('Delete').click({force: true})
		cy.wait(1000) 
        cy.goToPage("pages/");
		cy.wait(1000)
		cy.contains(page_title_initial).should('not.exist')		
		cy.wait(1000)		
		screenshotTaker.screenshot("Pantalla validar pagina eliminada")
		
    })
})