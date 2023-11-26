import createGhostPage from '../../pageobjects/createGhostPage'
const { faker } = require("@faker-js/faker");
const csv = require('neat-csv')

const { ScreenshotHelper } = require("../../support/utils");
var path = require('path');

let regData
let numOfPages = 0
var testData
var validation

describe('Prueba de cambio passwords Staff', () => {
	
    beforeEach(() => {
		cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
		cy.request('GET','https://my.api.mockaroo.com/staffGhost.json?key=72f19ae0').then( (response) => {
					testData = response.body;					
			})		
    })



    it('Try to update the Bio successfully', () => {		
		cy.wait(1000)
		cy.goToPage("settings/");	
		cy.wait(2000)		
		cy.contains('Staff').click()
		cy.wait(2000)		
		cy.get('.apps-card-app').click()		
		cy.wait(1000)
		cy.get('textarea[id="user-bio"]').clear()
		cy.get('textarea[id="user-bio"]').type(testData[0].bio1)
		cy.wait(1000)
		cy.get('button[data-test-save-button=""]').click()
		cy.wait(1000)
		cy.contains('Saved')
		cy.goToPage("settings/");		
		cy.wait(1000)
		cy.contains('Staff').click()
		cy.wait(1000)
		cy.get('.apps-card-app').click()
		cy.wait(1000)		
		cy.get('textarea[id="user-bio"]').should(($input) => {		
		validation = $input.val()
		expect(validation).to.equal(testData[0].bio1)	
		})
		cy.wait(1000)
    })	
	
	it('Try to update the Bio with more of 200 characters', () => {		
		cy.wait(1000)
		cy.goToPage("settings/");	
		cy.wait(2000)		
		cy.contains('Staff').click()
		cy.wait(2000)		
		cy.get('.apps-card-app').click()		
		cy.wait(1000)
		cy.get('textarea[id="user-bio"]').clear()
		cy.get('textarea[id="user-bio"]').type(testData[0].bio2)
		cy.wait(1000)
		cy.get('button[data-test-save-button=""]').click()
		cy.wait(1000)
		cy.contains('Retry')
		cy.wait(1000)						
    })	
	
	
	it('Update the full Name successfully', () => {		
		cy.wait(1000)
		cy.goToPage("settings/");	
		cy.wait(2000)		
		cy.contains('Staff').click()
		cy.wait(2000)		
		cy.get('.apps-card-app').click()		
		cy.wait(1000)
		cy.get('input[id="user-name"]').clear()
		cy.get('input[id="user-name"]').type(testData[0].full_name)
		cy.wait(1000)
		cy.get('button[data-test-save-button=""]').click()
		cy.wait(1000)
		cy.contains('Saved')
		cy.goToPage("settings/");		
		cy.wait(1000)
		cy.contains('Staff').click()
		cy.wait(1000)
		cy.get('.apps-card-app').click()
		cy.wait(1000)		
		cy.get('input[id="user-name"]').should(($input) => {		
		validation = $input.val()
		expect(validation).to.equal(testData[0].full_name)	
		})
		cy.wait(1000)						
    })	
		
	
	it('Update the slug successfully', () => {		
		cy.wait(1000)
		cy.goToPage("settings/");	
		cy.wait(2000)		
		cy.contains('Staff').click()
		cy.wait(2000)		
		cy.get('.apps-card-app').click()		
		cy.wait(1000)
		cy.get('input[id="user-slug"]').clear()
		cy.get('input[id="user-slug"]').type(testData[0].slug)
		cy.wait(1000)
		cy.get('button[data-test-save-button=""]').click()
		cy.wait(1000)
		cy.contains('Saved')
		cy.goToPage("settings/");		
		cy.wait(1000)
		cy.contains('Staff').click()
		cy.wait(1000)
		cy.get('.apps-card-app').click()
		cy.wait(1000)		
		cy.get('input[id="user-slug"]').should(($input) => {		
		validation = $input.val()		
		expect(validation).to.equal(testData[0].slug)	// Issue -> El valor cambia la primera letra a minuscula
		})
		cy.wait(1000)						
    })
	
	
	
	it('Slug with more than two words should not use spaces between them', () => {	

		let nameWithoutSpaces = testData[0].full_name.replace(" ",'-')
		
		cy.wait(1000)
		cy.goToPage("settings/");	
		cy.wait(2000)		
		cy.contains('Staff').click()
		cy.wait(2000)		
		cy.get('.apps-card-app').click()		
		cy.wait(1000)
		cy.get('input[id="user-slug"]').clear()
		cy.get('input[id="user-slug"]').type(testData[0].full_name)
		cy.wait(1000)
		cy.get('button[data-test-save-button=""]').click()
		cy.wait(1000)
		cy.contains('Saved')
		cy.goToPage("settings/");		
		cy.wait(1000)
		cy.contains('Staff').click()
		cy.wait(1000)
		cy.get('.apps-card-app').click()
		cy.wait(1000)		
		cy.get('input[id="user-slug"]').should(($input) => {		
		validation = $input.val()		
		expect(validation).to.equal(nameWithoutSpaces.toLowerCase())	// Issue -> El valor cambia la primera letra a minuscula
		})
		cy.wait(1000)						
    })	
	
	
	
	
	it('Update the Location successfully', () => {		
		cy.wait(1000)
		cy.goToPage("settings/");	
		cy.wait(2000)		
		cy.contains('Staff').click()
		cy.wait(2000)		
		cy.get('.apps-card-app').click()		
		cy.wait(1000)
		cy.get('input[id="user-location"]').clear()
		cy.get('input[id="user-location"]').type(testData[0].location)
		cy.wait(1000)
		cy.get('button[data-test-save-button=""]').click()
		cy.wait(1000)
		cy.contains('Saved')
		cy.goToPage("settings/");		
		cy.wait(1000)
		cy.contains('Staff').click()
		cy.wait(1000)
		cy.get('.apps-card-app').click()
		cy.wait(1000)		
		cy.get('input[id="user-location"]').should(($input) => {		
		validation = $input.val()
		expect(validation).to.equal(testData[0].location)	
		})
		cy.wait(1000)						
    })
	
	
	
	it('Update the WebSite of the Staff successfully', () => {		
		cy.wait(1000)
		cy.goToPage("settings/");	
		cy.wait(2000)		
		cy.contains('Staff').click()
		cy.wait(2000)		
		cy.get('.apps-card-app').click()		
		cy.wait(1000)
		cy.get('input[id="user-website"]').clear()
		cy.get('input[id="user-website"]').type(testData[0].web_site)
		cy.wait(1000)
		cy.get('button[data-test-save-button=""]').click()
		cy.wait(1000)
		cy.contains('Saved')
		cy.goToPage("settings/");		
		cy.wait(1000)
		cy.contains('Staff').click()
		cy.wait(1000)
		cy.get('.apps-card-app').click()
		cy.wait(1000)		
		cy.get('input[id="user-website"]').should(($input) => {		
		validation = $input.val()
		expect(validation).contains(testData[0].web_site)	
		})
		cy.wait(1000)						
    })
	
	
	
	it('Update the Twitter of the Staff successfully', () => {		
		cy.wait(1000)
		cy.goToPage("settings/");	
		cy.wait(2000)		
		cy.contains('Staff').click()
		cy.wait(2000)		
		cy.get('.apps-card-app').click()		
		cy.wait(1000)
		cy.get('input[id="user-twitter"]').clear()
		cy.get('input[id="user-twitter"]').type(testData[0].web_site)
		cy.wait(1000)
		cy.get('button[data-test-save-button=""]').click()
		cy.wait(1000)
		cy.contains('Saved')
		cy.goToPage("settings/");		
		cy.wait(1000)
		cy.contains('Staff').click()
		cy.wait(1000)
		cy.get('.apps-card-app').click()
		cy.wait(1000)		
		cy.get('input[id="user-twitter"]').should(($input) => {		
		validation = $input.val()
		expect(validation).contains(testData[0].web_site)	
		})
		cy.wait(1000)						
    })
	
	
	
	it('Update the Facebook url of the Staff successfully', () => {		
		cy.wait(1000)
		cy.goToPage("settings/");	
		cy.wait(2000)		
		cy.contains('Staff').click()
		cy.wait(2000)		
		cy.get('.apps-card-app').click()		
		cy.wait(1000)
		cy.get('input[id="user-facebook"]').clear()
		cy.get('input[id="user-facebook"]').type(testData[0].web_site)
		cy.wait(1000)
		cy.get('button[data-test-save-button=""]').click()
		cy.wait(1000)
		cy.contains('Saved')
		cy.goToPage("settings/");		
		cy.wait(1000)
		cy.contains('Staff').click()
		cy.wait(1000)
		cy.get('.apps-card-app').click()
		cy.wait(1000)		
		cy.get('input[id="user-facebook"]').should(($input) => {		
		validation = $input.val()
		expect(validation).contains(testData[0].web_site)	
		})
		cy.wait(1000)						
    })
	
	
	// para quitar
	/*
	it('Update the full Name with Naughty data', () => {		
		cy.wait(1000)
		cy.goToPage("settings/");	
		cy.wait(2000)		
		cy.contains('Staff').click()
		cy.wait(2000)		
		cy.get('.apps-card-app').click()		
		cy.wait(1000)
		cy.get('input[id="user-name"]').clear()
		cy.get('input[id="user-name"]').type(testData[0].value_naughty)
		cy.wait(1000)
		cy.get('button[data-test-save-button=""]').click()
		cy.wait(1000)
		cy.contains('Saved')
		cy.goToPage("settings/");		
		cy.wait(1000)
		cy.contains('Staff').click()
		cy.wait(1000)
		cy.get('.apps-card-app').click()
		cy.wait(1000)		
		cy.get('input[id="user-name"]').should(($input) => {		
		validation = $input.val()
		if(validation.startsWith('<img')){
			expect(validation).to.not.equal(testData[0].value_naughty) 	 
		}else{
			expect(validation).to.equal(testData[0].value_naughty) 	
		}			
		})
		cy.wait(1000)						
    })
	
	it('Update the slug with naughty', () => {		
		cy.wait(1000)
		cy.goToPage("settings/");	
		cy.wait(2000)		
		cy.contains('Staff').click()
		cy.wait(2000)		
		cy.get('.apps-card-app').click()		
		cy.wait(1000)
		cy.get('input[id="user-slug"]').clear()
		cy.get('input[id="user-slug"]').type(testData[0].value_naughty)
		cy.wait(1000)
		cy.get('button[data-test-save-button=""]').click()
		cy.wait(1000)
		cy.contains('Saved')
		cy.goToPage("settings/");		
		cy.wait(1000)
		cy.contains('Staff').click()
		cy.wait(1000)
		cy.get('.apps-card-app').click()
		cy.wait(1000)		
		cy.get('input[id="user-slug"]').should(($input) => {		
		validation = $input.val()
		expect(validation).to.not.equal(testData[0].value_naughty)	
		
		})
		cy.wait(1000)						
    })
	*/
	
	
})