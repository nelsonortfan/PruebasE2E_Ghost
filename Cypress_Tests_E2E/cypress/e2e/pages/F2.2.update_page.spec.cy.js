describe('Editar una page ya existente, cambiar el titulo y verificar que se encuentre listada con el nuevo valor', () => {
	
	var page_title_new = 'Un nuevo titulo al editar'
	var description = `Descripción Actualizada para la pagina de prueba a crear`
	var page_title_initial = 'El titulo inicial es este'
	
    beforeEach(() => {
        cy.login()
        cy.resetDataForTest()
    })

    it('Should update a new page', () => {
        
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
		cy.get('textarea[placeholder="Page title"]').clear()		
		cy.get('textarea[placeholder="Page title"]').type(page_title_new)		
		cy.get('.koenig-lexical').eq(1).clear()
		cy.get('.koenig-lexical').eq(1).click().type(description)
		cy.contains('Update').click()
		cy.wait(2000)
		cy.contains('Updated')
		cy.wait(1000) 
        cy.goToPage("pages/");
		cy.wait(1000)
		cy.contains(page_title_initial).should('not.exist')
		cy.wait(1000)
		cy.contains(page_title_new)		
		
		
    })
})