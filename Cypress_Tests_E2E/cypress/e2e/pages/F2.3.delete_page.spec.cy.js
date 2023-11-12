Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

describe('Eliminar una Page creada', () => {
	
	var page_title_new = null
	var description = `Descripción Actualizada para la pagina de prueba a crear`
	var page_title_initial = 'Titulo inicial para eliminar'
	
    beforeEach(() => {
        cy.login()
        cy.resetDataForTest()
    })

    it('Should create a new page and delete it successfully', () => {
       
		cy.wait(1000) 
        cy.goToPage("pages/");
		cy.wait(1000)
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
		cy.get('.feature-memberAttribution').get('div[role="menuitem"]').eq(0).click()
		cy.wait(1000)
		cy.get('button[title="Settings"]').click()		
		cy.get('.settings-menu-delete-button').click()
		cy.wait(1000)		
		cy.get('.modal-content').should('be.visible')		
		cy.get('.modal-footer').get('.gh-btn.gh-btn-red.gh-btn-icon.ember-view').contains('Delete').click({force: true})
		cy.wait(2000)
		cy.contains('All pages')
		cy.wait(1000) 
        cy.goToPage("pages/");
		cy.wait(1000)
		cy.contains(page_title_initial).should('not.exist')		
		cy.wait(1000)
		
    })
})