Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

describe('Testing Ghost Initial', () => {
	
	var page_title_new = null
	var description = `Descripción Actualizada para la pagina de prueba a crear`
	var page_title_initial = null
	
    beforeEach(()=>{	   
       cy.visit('http://localhost:2368/ghost/#/signin')
        cy.wait(1000)
		cy.get('input[name="identification"]').type('your_email')
		cy.get('input[name="password"]').type('your_password')
        cy.contains('Sign in').click()
        cy.wait(1000)        
    })
	
	/*
	it('Obtener valores iniciales de la Page', () => {
		cy.wait(1000) 
        cy.visit('http://localhost:2368/ghost/#/pages')
		cy.wait(1000)
		cy.get('.feature-memberAttribution').get('div[role="menuitem"]').eq(0).click()
		cy.wait(1000)
		page_title_initial = cy.get('textarea[placeholder="Page title"]')
		cy.contains('Pages').click()
		cy.wait(2000)
		cy.contains('All pages')
    }) 
	
	*/
	it('Eliminación de la Page', () => {
		cy.wait(1000) 
        cy.visit('http://localhost:2368/ghost/#/pages')
		cy.wait(1000)
		cy.get('.feature-memberAttribution').get('div[role="menuitem"]').eq(0).click()
		cy.wait(1000)
		cy.get('button[title="Settings"]').click()
		//cy.scrollTo('bottom')
		cy.get('.settings-menu-delete-button').click()
		cy.wait(1000)		
		cy.get('.modal-content').should('be.visible')		
		cy.get('.modal-footer').get('.gh-btn.gh-btn-red.gh-btn-icon.ember-view').contains('Delete').click({force: true})
		cy.wait(2000)
		cy.contains('All pages')
    })   
		
		/*
	it('Validacion de la nueva Page en la lista de pages', () => {
		cy.wait(1000) 
        cy.visit('http://localhost:2368/ghost/#/pages')
		cy.wait(1000)		
		cy.contains(page_title_new)		
		const item = cy.get('.feature-memberAttribution').get('div[role="menuitem"]').eq(0)
        item.contains(page_title_initial).should('not.exist')		
    })
*/
    
  })