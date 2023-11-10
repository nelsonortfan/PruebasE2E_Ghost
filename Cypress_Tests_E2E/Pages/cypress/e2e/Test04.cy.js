describe('Testing Ghost Initial', () => {
	
	var page_title_new = null
	var description = `Descripción Actualizada para la pagina de prueba a crear`
	let page_title_initial = ''
	
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
		//page_title_initial = cy.get('textarea[placeholder="Page title"]')
		
		cy.get('textarea[placeholder="Page title"]').should(($input) => {
		/*
		const val = $input.val()		
		expect(val).to.equal('foo')  
		*/
		page_title_initial = $input.val()
		expect(page_title_initial).to.equal('Pagina de Prueba E2E realizada en 09/11/2023')	
		})
		cy.wait(2000)
		//expect(page_title_initial).to.equal('Pagina de Prueba E2E realizada en 09/11/2023')
		cy.contains('Pages').click()
		cy.wait(2000)
		//expect(description).to.equal(page_title_initial)
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