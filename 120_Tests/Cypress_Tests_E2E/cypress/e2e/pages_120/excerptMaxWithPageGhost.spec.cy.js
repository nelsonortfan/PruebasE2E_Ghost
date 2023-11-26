Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

import createGhostPage from '../../pageObjects/Pages'
const { faker } = require("@faker-js/faker");

var validation

describe('Update excerpt of a page', () => {
	
    beforeEach(() => {
		cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should update excerpt', () => {	
	
		
		let title1 = faker.lorem.sentence({ min: 4, max:20})
		let description = faker.lorem.paragraph(6)
		let excerpt = faker.lorem.sentence({ min: 30, max:50})
		
		cy.wait(1000) 
        cy.goToPage("pages/");		
		cy.wait(1000)		
		const pageGhostObj = new createGhostPage();
		pageGhostObj.createNewPage(title1,description)
		cy.wait(1000)
		pageGhostObj.publishNewPage()			
		cy.wait(1000)
		cy.contains(title1)
		cy.contains(description)		
		cy.wait(1000) 
        cy.goToPage("pages/");
		cy.wait(1000)
		cy.contains(title1)		
		cy.get('.feature-memberAttribution').get('div[role="menuitem"]').eq(0).click()
		cy.wait(1000)
		pageGhostObj.settings()		
		pageGhostObj.asociateExcerpt(excerpt)
		cy.wait(1000)
		cy.contains('Update').click()
		
		cy.contains('Update failed: Excerpt cannot be longer than 300 characters')
	
			
    })	
	
})