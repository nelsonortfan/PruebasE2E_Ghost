const { ScreenshotHelper } = require("../support/utils");
var path = require('path');
import createPageOld from "../pageObjects/PagesOld"
import MOCK_TAGS_DATA from '../fixtures/movie_schema.json'

let regData

let title1 = "default"
let description
let header
let footer 

describe('Asociate a header and a foot with a page in old version', () => {
	
    beforeEach(() => {
		// Given I login and delete the existing data
		cy.viewport(1000, 660);
        cy.loginOld();
        cy.resetDataForTestOld();	

    })

	MOCK_TAGS_DATA.forEach((page) => {
    it('Should asociate a header and a foot with a page in old version', () => {
		
		// When I create a  new page
		
		const screenshotTaker = new ScreenshotHelper("pages_old")	
		const pageOldGhostObj = new createPageOld();
		
		let title1 = page.title
		let description = page.description		
		let header = page.header
		let footer = page.footer
		
		cy.wait(1000) 
        cy.goToPageOld("pages/");
		cy.wait(1000)
		screenshotTaker.screenshot("Pantalla inicial de pages")		
		// and I add a Tittle and a description
		cy.wait(1000)
		pageOldGhostObj.createNewPage(title1,description)
		screenshotTaker.screenshot("Pantalla data de page")
		pageOldGhostObj.settings()
		// and I add a header and a footer	
		cy.wait(1000)	
		pageOldGhostObj.updateHeaderAndFooterPage(header, footer)
		screenshotTaker.screenshot("Pantalla Header y Footer de page")
		pageOldGhostObj.backSettings()
		// and I publish the page
		pageOldGhostObj.publishNewPage()
        cy.goToPageOld("pages/");
		cy.wait(1000)
		screenshotTaker.screenshot("Pantalla principal con la page creada")
		cy.wait(2000)
		// and I logout Ghost
		pageOldGhostObj.logout()
		screenshotTaker.screenshot("Pantalla despues de logout")	
			
		pageOldGhostObj.visitPage(title1)
		screenshotTaker.screenshot("Pantalla visita de la page")
				
		// Then I see that the page contains all the fields that I typed
		cy.contains(title1)
		cy.contains(description)
		cy.contains(header)	
		cy.contains(footer)	
		
		
    })
	
	})
	
})