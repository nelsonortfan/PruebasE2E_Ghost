describe('Actualizar una Page en Ghost', () => {
	
	var page_title_new = 'Un nuevo titulo al editar'
	var description = `Descripción Actualizada para la pagina de prueba a crear`
	var page_title_initial = 'El titulo inicial es este'
	
    beforeEach(()=>{
		cy.fixture("ghost_credentials.json").then((credentials) => {
		cy.session(credentials.email, () => {
		cy.visit('http://localhost:2368/ghost/#/signin')
		cy.get('input[name="identification"]').type(credentials.email);
		cy.get('input[name="password"]').type(credentials.password);
		cy.contains("Sign in").click();
		cy.wait(1000);
		});		
		})
	})
	
	
	it('Creación de la nueva Page validando que no exista', () => {
		cy.wait(1000) 
        cy.visit('http://localhost:2368/ghost/#/pages')
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
    })
	
	it('Actualización de la nueva Page', () => {
		cy.wait(1000) 
        cy.visit('http://localhost:2368/ghost/#/pages')
		cy.wait(1000)
		cy.get('.feature-memberAttribution').get('div[role="menuitem"]').eq(0).click()
		cy.wait(1000)
		cy.get('textarea[placeholder="Page title"]').clear()		
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
		cy.contains(page_title_initial).should('not.exist')
		cy.wait(1000)
		cy.contains(page_title_new)	
    })

    
  })