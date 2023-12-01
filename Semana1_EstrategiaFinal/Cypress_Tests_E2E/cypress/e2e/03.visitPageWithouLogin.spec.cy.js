Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

import createGhostPage from "../pageObjects/Pages"
const { ScreenshotHelper } = require("../support/utils");
var path = require('path');
const { faker } = require("@faker-js/faker");

describe('Asociate a Tag with a page', () => {


    beforeEach(() => {
		// Given I login and delete the existing data
		cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })


    it('Should asociate a Tag with a page', () => {	
	
		// When I create a  new page
		
		const screenshotTaker = new ScreenshotHelper("pages/F2.1")	
		
		let title1 = faker.lorem.sentence({ min: 4, max:20})
		let description = faker.lorem.paragraph(6)
		let tag = faker.lorem.word(5)
		let header = faker.lorem.word(20)
		let footer = faker.lorem.word(20)
				
		cy.wait(1000) 
        cy.goToPage("pages/");	
		screenshotTaker.screenshot("Pantalla inicial de pages")	
		cy.wait(1000)		
		const pageGhostObj = new createGhostPage();
		// and I add a Tittle and a description
		pageGhostObj.createNewPage(title1,description)
		screenshotTaker.screenshot("Pantalla data de page")
		cy.wait(1000)
		// and I add a header and a footer
		pageGhostObj.settings()
		pageGhostObj.updateHeaderAndFooterPage(header, footer)
		screenshotTaker.screenshot("Pantalla Header y Footer de page")
		cy.wait(500)
		pageGhostObj.settings()		
		// and I publish the page
		pageGhostObj.publishNewPage()
		cy.wait(1000)		
		cy.goToPage("pages/");
		cy.wait(1000)
		screenshotTaker.screenshot("Pantalla principal con la page creada")
		cy.wait(1000)
		// and I logout Ghost
		pageGhostObj.logout()
		screenshotTaker.screenshot("Pantalla despues de logout")
		// and I visit the page created
		pageGhostObj.visitPage(title1)
		screenshotTaker.screenshot("Pantalla visita de la page")
				
		// Then I see that the page contains all the fields that I typed
		cy.contains(title1)
		cy.contains(description)
		cy.contains(header)	
		cy.contains(footer)		
					
    })	
	
})