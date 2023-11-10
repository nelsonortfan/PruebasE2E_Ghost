describe('Testing Ghost Initial', () => {
	
	var page_name = `Pagina de Prueba E2E realizada en 09/11/2023`
	var description = `Descripcion para la pagina de prueba a crear`
	
    beforeEach(()=>{	   
       cy.visit('http://localhost:2368/ghost/#/signin')
        cy.wait(1000)
		cy.get('input[name="identification"]').type('your_email')
		cy.get('input[name="password"]').type('your_password')
        cy.contains('Sign in').click()
        cy.wait(1000)        
    })
	
	it('Creación de la nueva Page', () => {
		cy.wait(1000) 
        cy.visit('http://localhost:2368/ghost/#/pages')
		cy.wait(1000)
		cy.contains('New page').click()
		cy.get('textarea[placeholder="Page title"]').type(page_name)
		cy.get('.koenig-lexical').eq(1).click().type(description)
		cy.contains('Publish').click()
		cy.contains('Continue, final review').click()
		cy.contains('Publish page, right now').click()		
		cy.wait(1000)
		cy.contains(page_name)
		cy.contains(description)
    })   
	
	it('Validacion de la nueva Page en la lista de pages', () => {
		cy.wait(1000) 
        cy.visit('http://localhost:2368/ghost/#/pages')
		cy.wait(1000)		
		cy.contains(page_name)		
		const item = cy.get('.feature-memberAttribution').get('div[role="menuitem"]').eq(0)
        item.contains(
            page_name
          )
    })
    
  })