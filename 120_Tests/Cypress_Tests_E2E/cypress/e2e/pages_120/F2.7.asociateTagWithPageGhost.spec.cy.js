Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

import createGhostPage from '../../pageObjects/Pages'
const { faker } = require("@faker-js/faker");

describe('Asociate a Tag with a page', () => {
	
    beforeEach(() => {
		// Given I login and delete the existing data
		cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should asociate a Tag with a page', () => {	
	
		// When I create a page and I asociate it with a new Tag
		
		let title1 = faker.lorem.sentence({ min: 4, max:20})
		let description = faker.lorem.paragraph(6)
		let tag = faker.lorem.word(5)
		
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
		pageGhostObj.asociateTag(tag)
		cy.wait(1000)
		cy.goToPage("pages/");
		cy.get('.feature-memberAttribution').get('div[role="menuitem"]').eq(0).click()
		cy.wait(1000)
		pageGhostObj.settings()
		
		// Then I should see that the page is asociated with that Tag
		const tagValidator = pageGhostObj.get_valueTag()
		tagValidator.contains(tag)
		
			
    })	
	
})