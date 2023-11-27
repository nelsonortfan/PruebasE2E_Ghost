Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });


import createGhostPage from '../../pageObjects/Pages'
const { faker } = require("@faker-js/faker");

var validation
var xDescription

describe('Not update X Description of a page', () => {
	
    beforeEach(() => {
		// Given I login and delete the existing data
		cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should not update X Description of a page', () => {	
	
		// When I create a new page and update the field description of X with more than 500 characters
		//let descriptionX = faker.lorem.paragraph(20)
		let descriptionX = faker.string.alpha({ length: 501})
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
		pageGhostObj.updateXDescription(descriptionX)
		cy.wait(1000)
		
		// Then I should see a message error that is not possible update the description for the length
		cy.contains('Update').click()		
		cy.contains('Update failed: Twitter Description cannot be longer than 500 characters')
			
    })	
	
})