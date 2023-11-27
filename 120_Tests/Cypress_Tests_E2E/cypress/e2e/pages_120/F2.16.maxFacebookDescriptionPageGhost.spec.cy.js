Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });


import createGhostPage from '../../pageObjects/Pages'
const { faker } = require("@faker-js/faker");

var validation
var xDescription

describe('Not Update Facebook Description of a page', () => {
	
    beforeEach(() => {
		// Given I login and delete the existing data
		cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should not update Facebook Description of a page', () => {	
	
		// When I create a new page and update the description of the facebook page with more than 500 characters
		//let descriptionFacebook = faker.lorem.paragraph(20)
		let descriptionFacebook = faker.string.alpha({ length: 501}) 
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
		pageGhostObj.updateFacebookDescription(descriptionFacebook)
		cy.wait(1000)
		
		// Then I should see an error message of the update
		cy.contains('Update').click()		
		cy.contains('Update failed: Facebook Description cannot be longer than 500 characters')
					
    })	
	
})