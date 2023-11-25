import createGhostPage from '../../pageObjects/Pages'
const { faker } = require("@faker-js/faker");

const { ScreenshotHelper } = require("../../support/utils");
var path = require('path');

describe('Page wth title repeated', () => {
	
    beforeEach(() => {
		cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should create two pages with title repeated', () => {	
		
	
		
		let title = faker.lorem.sentence({ min: 4, max:20})
		let description1 = faker.lorem.paragraph(6)
		let description2 = faker.lorem.paragraph(6)
		
		
		cy.wait(1000) 
        cy.goToPage("pages/");		
		cy.wait(1000)		
		const pageGhostObj = new createGhostPage();
		pageGhostObj.createNewPage(title,description1)
		cy.wait(1000)
		pageGhostObj.publishNewPage()			
		cy.wait(1000)
		cy.contains(title)
		cy.contains(description1)		
		cy.wait(1000) 
        cy.goToPage("pages/");
		cy.wait(1000)
		cy.contains(title)
		pageGhostObj.createNewPage(title,description2)
		cy.wait(1000)
		pageGhostObj.publishNewPage()			
		cy.wait(1000)
		cy.contains(title)
		cy.contains(description2)		
		cy.wait(1000) 
        cy.goToPage("pages/");
		cy.wait(1000)
		cy.contains(title)		
		const item1 = pageGhostObj.get_elementList(0)
		item1.contains(title)
		const item2 = pageGhostObj.get_elementList(1)
		item2.contains(title)			
    })	
	
})