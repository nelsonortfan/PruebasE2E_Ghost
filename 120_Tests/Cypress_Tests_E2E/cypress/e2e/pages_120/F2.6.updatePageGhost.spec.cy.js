import createGhostPage from '../../pageObjects/Pages'
const { faker } = require("@faker-js/faker");

const { ScreenshotHelper } = require("../../support/utils");
var path = require('path');

describe('Update Title of a page', () => {
	
    beforeEach(() => {
		// Given I login and delete the existing data
		cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should update the title of a page', () => {	
		
		// When I create a page and after I update it
		
		let title1 = faker.lorem.sentence({ min: 4, max:20})
		let title2 = faker.lorem.sentence({ min: 4, max:20})
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
		pageGhostObj.updateTitlePage(title2)
		cy.wait(1000)
		cy.wait(1000) 
        cy.goToPage("pages/");
		cy.wait(1000)
		cy.contains(title2)	

		// Then I should see the page with the last title updated
		const item = pageGhostObj.get_elementList(0)
		item.contains(title2)				
    })	
	
})