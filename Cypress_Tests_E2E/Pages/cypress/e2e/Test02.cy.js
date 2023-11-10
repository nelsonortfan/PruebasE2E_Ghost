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
	
	
	it('Obtener valores iniciales de la Page', () => {
		cy.wait(1000) 
        cy.visit('http://localhost:2368/ghost/#/pages')
		cy.wait(1000)
		cy.get('.feature-memberAttribution').get('div[role="menuitem"]').eq(0).click()
		cy.wait(1000)
		page_title_initial = cy.get('textarea[placeholder="Page title"]').getValue()
		cy.contains('Pages').click()
		cy.wait(2000)
		cy.contains('All pages')
    }) 
	
	it('Actualización de la nueva Page', () => {
		cy.wait(1000) 
        cy.visit('http://localhost:2368/ghost/#/pages')
		cy.wait(1000)
		cy.get('.feature-memberAttribution').get('div[role="menuitem"]').eq(0).click()
		cy.wait(1000)
		cy.get('textarea[placeholder="Page title"]').clear()
		page_title_new = page_title_initial + ' ... ';
		cy.get('textarea[placeholder="Page title"]').type(page_title_new)		
		cy.get('.koenig-lexical').eq(1).clear()
		cy.get('.koenig-lexical').eq(1).click().type(description)
		cy.contains('Update').click()
		cy.wait(2000)
		cy.contains('Updated')
    })   
		
	it('Validacion de la nueva Page en la lista de pages', () => {
		cy.wait(1000) 
        cy.visit('http://localhost:2368/ghost/#/pages')
		cy.wait(1000)		
		cy.contains(page_title_new)		
		const item = cy.get('.feature-memberAttribution').get('div[role="menuitem"]').eq(0)
        item.should('not.equal', 'be.null')		
    })

    
  })