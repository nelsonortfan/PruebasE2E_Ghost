import createGhostPage from '../../pageObjects/Pages'
const { faker } = require("@faker-js/faker");

const { ScreenshotHelper } = require("../../support/utils");
var path = require('path');

describe('Create a New Page', () => {
	
	
    beforeEach(() => {
		// Given I login and delete the existing data
		cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should create a new page', () => {	
		
				
		title = faker.lorem.sentence({ min: 4, max:20})
		description = faker.lorem.paragraph(6)
		
		// When I create a New page with a title and a description
		cy.wait(1000) 
        cy.goToPage("pages/");		
		cy.wait(1000)		
		const pageGhostObj = new createGhostPage();
		pageGhostObj.createNewPage(title,description)
		cy.wait(1000)
		pageGhostObj.publishNewPage()			
		cy.wait(1000)
		cy.contains(title)
		cy.contains(description)		
		cy.wait(1000) 
        cy.goToPage("pages/");
		cy.wait(1000)
		cy.contains(title)
		
		// Then I can see that the page was created successfully
		const item = pageGhostObj.get_elementList(0)
		item.contains(title)				
    })	
	
})