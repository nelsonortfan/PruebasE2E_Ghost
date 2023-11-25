import createGhostPage from '../../pageObjects/Pages'
const { faker } = require("@faker-js/faker");
const csv = require('neat-csv')

const { ScreenshotHelper } = require("../../support/utils");
var path = require('path');

let regData
let numOfPages = 0

describe('Probar el API de prueba', () => {
	
    beforeEach(() => {
		cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
		cy.fixture("MOCK_DATA.csv")
            .then(csv)
            .then((data) => {
                regData = data
           })		
    })

    it('Should create a new page', () => {
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
		const item = pageGhostObj.get_elementList(i)
		item.contains(regData[0]['title'])
		numOfPages = numOfPages + 1
        }
		
		expect(numOfPages).to.equal(regData.length)
				
    })	
	
})