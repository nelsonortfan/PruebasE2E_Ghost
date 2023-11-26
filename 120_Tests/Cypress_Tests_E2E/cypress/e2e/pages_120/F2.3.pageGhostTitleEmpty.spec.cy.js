import createGhostPage from '../../pageObjects/Pages'
const { faker } = require("@faker-js/faker");

const { ScreenshotHelper } = require("../../support/utils");
var path = require('path');

describe('Page without Title', () => {
	
	
	
    beforeEach(() => {
		// Given I login and delete the existing data
		cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should create a new page without title', () => {	
		
		// When I create a page with a description random but without a title
		
		let description = faker.lorem.paragraph(6)
		
		
		cy.wait(1000) 
        cy.goToPage("pages/");		
		cy.wait(1000)		
		const pageGhostObj = new createGhostPage();
		pageGhostObj.createNewPageWithoutTitle(description)
		cy.wait(1000)
		pageGhostObj.publishNewPage()			
		cy.wait(1000)		
		cy.contains(description)		
		cy.wait(1000) 
        cy.goToPage("pages/");
		cy.wait(1000)
		
		// Then I can see that the page was created without a title
		const item = pageGhostObj.get_elementList(0)
		item.contains('Untitled')				
    })	
	
})