Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

import createGhostPage from '../../pageObjects/Pages'
const { faker } = require("@faker-js/faker");

describe('Delete a page', () => {
	
    beforeEach(() => {
		// Given I login and delete the existing data
		cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should delete a page', () => {	
	
		// When I create a new page and after I delete it
		
		let title1 = faker.lorem.sentence({ min: 4, max:20})
		let description = faker.lorem.paragraph(6)		
		
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
		pageGhostObj.deletePageConfirmation()
		cy.wait(1000)
		cy.contains('All pages')
		cy.wait(1000) 
		
		// Then I can see that there is not any page in the App
		
		cy.contains(title1).should('not.exist')		
		cy.wait(1000)
			
    })	
	
})