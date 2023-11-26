Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

import createGhostPage from '../../pageObjects/Pages'
const { faker } = require("@faker-js/faker");

describe('Update Url of a page', () => {
	
    beforeEach(() => {
		// Given I login and delete the existing data
		cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should update url of a page', () => {	
	
		//When I create a page and I update the url of the page
		
		let title1 = faker.lorem.sentence({ min: 4, max:20})
		let description = faker.lorem.paragraph(6)
		let url = faker.lorem.word(10)		
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
		pageGhostObj.asociateUrl(url)
		cy.wait(1000)
		cy.goToPage("pages/");		
		cy.get('.feature-memberAttribution').get('div[role="menuitem"]').eq(0).click()
		cy.wait(1000)
		pageGhostObj.settings()
		
		// Then I should see the page asociated with that url
		const urlValidator = pageGhostObj.get_valueUrl()
		urlValidator.contains(url)
		
			
    })	
	
})