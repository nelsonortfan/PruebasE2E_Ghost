import createGhostPage from '../../pageObjects/Pages'
const { faker } = require("@faker-js/faker");

const { ScreenshotHelper } = require("../../support/utils");
var path = require('path');

describe('Probar el API de prueba', () => {
	
	//var page_name = `Pagina de Prueba E2E realizada en 09/11/2023`
	//var description = `Descripcion para la pagina de prueba a crear`	
	
    beforeEach(() => {
		cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should create a new page', () => {	
		
		const dataRandom = {
			title : faker.lorem.sentence({ min: 4, max:20}),
			description : faker.lorem.paragraph(6)
		}
		
		
		cy.wait(1000) 
        cy.goToPage("pages/");		
		cy.wait(1000)		
		const pageGhostObj = new createGhostPage();
		//pageGhostObj.createNewPage(page_name,description)
		pageGhostObj.createNewPage(dataRandom.title,dataRandom.description)
		cy.wait(1000)
		pageGhostObj.publishNewPage()			
		cy.wait(1000)
		//cy.contains(page_name)
		cy.contains(dataRandom.title)
		cy.contains(dataRandom.description)		
		cy.wait(1000) 
        cy.goToPage("pages/");
		cy.wait(1000)
		cy.contains(dataRandom.title)	
		//cy.contains(page_name)
		const item = pageGhostObj.get_elementList(0)
        //item.contains(page_name)
		item.contains(dataRandom.title)				
    })	
	
})