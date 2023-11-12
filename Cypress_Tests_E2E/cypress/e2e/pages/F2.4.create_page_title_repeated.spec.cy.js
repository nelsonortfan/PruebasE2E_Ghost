describe('Crear 2 pages con el title repetido', () => {
	
	var page_title_new = null
	var description = `Descripción Actualizada para la pagina de prueba a crear`
	var page_title_initial = 'Titulo inicial repetido' + Date.now()
	
    beforeEach(() => {
        cy.login()
        cy.resetDataForTest()
    })

    it('Should create 2 pages with the title repeated', () => {
		
		cy.wait(1000)
		cy.goToPage("pages/");	
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
		cy.wait(1000)
		cy.goToPage("pages/");
		cy.wait(1000)
		cy.contains(page_title_initial)
		cy.contains('New page').click()
		cy.get('textarea[placeholder="Page title"]').type(page_title_initial)
		cy.get('.koenig-lexical').eq(1).click().type(description)
		cy.contains('Publish').click()
		cy.contains('Continue, final review').click()
		cy.contains('Publish page, right now').click()		
		cy.wait(1000)
		cy.goToPage("pages/");
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