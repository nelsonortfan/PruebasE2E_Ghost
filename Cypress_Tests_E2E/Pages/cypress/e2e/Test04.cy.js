describe('Crear Page repetido', () => {
	
	var page_title_new = null
	var description = `Descripción Actualizada para la pagina de prueba a crear`
	var page_title_initial = 'Titulo inicial repetido' + Date.now()
	
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
		cy.get('.feature-memberAttribution').get('div[role="menuitem"]').eq(0).click()
		cy.wait(1000)
		cy.get('textarea[placeholder="Page title"]').should(($input) => {		
		page_title_new = $input.val()		
		expect(page_title_new).to.not.equal(page_title_initial)	
		})
		cy.wait(1000)
		cy.contains('Pages').click()
		cy.wait(1000)		
		cy.contains('All pages')
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
	
	
	it('Obtener valores iniciales de la Page', () => {
		cy.wait(1000) 
        cy.visit('http://localhost:2368/ghost/#/pages')
		cy.wait(1000)
		cy.contains(page_title_initial)
		cy.contains('New page').click()
		cy.get('textarea[placeholder="Page title"]').type(page_title_initial)
		cy.get('.koenig-lexical').eq(1).click().type(description)
		cy.contains('Publish').click()
		cy.contains('Continue, final review').click()
		cy.contains('Publish page, right now').click()		
		cy.wait(1000)
		cy.visit('http://localhost:2368/ghost/#/pages')
		cy.wait(1000)
		cy.get('.feature-memberAttribution').get('div[role="menuitem"]').eq(0).click()
		cy.wait(1000)
		cy.get('textarea[placeholder="Page title"]').should(($input) => {		
		page_title_new = $input.val()
		expect(page_title_new).to.equal(page_title_new)	
		})
		cy.wait(1000)		
		cy.contains('Pages').click()
		cy.wait(1000)		
		cy.contains('All pages')
		cy.get('.feature-memberAttribution').get('div[role="menuitem"]').eq(1).click()
		cy.wait(1000)
		cy.get('textarea[placeholder="Page title"]').should(($input) => {		
		page_title_new = $input.val()
		expect(page_title_new).to.equal(page_title_new)	
		})
		cy.wait(1000)		
		cy.contains('Pages').click()
		cy.wait(1000)		
		cy.contains('All pages')
    }) 	

    
  })