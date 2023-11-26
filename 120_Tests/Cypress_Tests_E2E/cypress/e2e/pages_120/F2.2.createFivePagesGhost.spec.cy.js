import createGhostPage from '../../pageObjects/Pages'
const { faker } = require("@faker-js/faker");
const csv = require('neat-csv')

const { ScreenshotHelper } = require("../../support/utils");
var path = require('path');

let regData
let numOfPages = 0

describe('Create five pages', () => {
	
    beforeEach(() => {
		
		// Given I login and delete the existing data and load the data for a csv fila apriori
		cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
		cy.fixture("MOCK_DATA.csv")
            .then(csv)
            .then((data) => {
                regData = data
           })		
    })

    it('Should create five new page', () => {
		
		// When I create five pages using the data of the CSV file
		for (let i = 0; i < regData.length; i++) {
		cy.wait(1000) 
        cy.goToPage("pages/");		
		cy.wait(1000)		
		const pageGhostObj = new createGhostPage();	
		pageGhostObj.createNewPage(regData[i]['title'],regData[i]['description'])
		cy.wait(1000)
		pageGhostObj.publishNewPage()			
		cy.wait(1000)		
		cy.contains(regData[i]['title'])
		cy.contains(regData[i]['description'])		
		cy.wait(1000) 
        cy.goToPage("pages/");
		cy.wait(1000)
		cy.contains(regData[i]['title'])
		
		// Then I can see that every page is created and the total number of pages is equal to the number of records
		
		const item = pageGhostObj.get_elementList(i)
		item.contains(regData[0]['title'])
		numOfPages = numOfPages + 1
        }
		
		expect(numOfPages).to.equal(regData.length)
				
    })	
	
})