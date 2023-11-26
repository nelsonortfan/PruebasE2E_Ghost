Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

const { ScreenshotHelper } = require("../../support/utils");
var path = require('path');

describe("Test set Staff social networks", () => {
	
  var userLocation = 'Bogota-Colombia'
  var userWebSite = 'http://mywebsite.com'
  var userFacebook = 'https://www.facebook.com/lucasBunny'
  var validation = '' 	
	
  beforeEach(() => {
	  cy.viewport(1000, 660);
	  cy.loginOld()      
  });
  
  it("Should set Staff social networks", () => {
	  
		const screenshotTaker = new ScreenshotHelper("F5.3")
    
		cy.wait(1000)
		cy.goToPageOld("settings/general/");	
		cy.wait(2000)
		screenshotTaker.screenshot("Pantalla inicial de settings")
		cy.contains('Staff').click()
		cy.wait(2000)
		screenshotTaker.screenshot("Pantalla inicial de Staff")
		cy.get('span.gh-badge.owner').click()		
		cy.wait(1000)
		cy.get('input[id="user-website"]').clear()
		cy.get('input[id="user-facebook"]').clear()
		cy.get('input[id="user-location"]').clear()		
		cy.get('#user-location').type(userLocation, {force: true})		
		screenshotTaker.screenshot("Pantalla userLocation")
		cy.get('input[id="user-website"]').clear()				
		cy.get('input[id="user-website"]').type(userWebSite, {force: true})		
		screenshotTaker.screenshot("Pantalla userWebSite")
		cy.get('input[id="user-facebook"]').clear()		
		cy.get('input[id="user-facebook"]').type(userFacebook, {force: true})
		cy.wait(1000)
		screenshotTaker.screenshot("Pantalla userFacebook")
		cy.get('button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view').click()
		cy.wait(1000)
		cy.contains('Saved')		
		screenshotTaker.screenshot("Pantalla Staff saved")
		cy.goToPageOld("settings/general/");		
		cy.wait(1000)
		cy.contains('Staff').click()
		cy.wait(1000)
		cy.get('span.gh-badge.owner').click()
		cy.wait(1000)		
		cy.get('input[id="user-location"]').should(($input) => {		
		validation = $input.val()
		expect(validation).to.equal(userLocation)	
		})
		cy.wait(1000)	
		cy.get('input[id="user-website"]').should(($input) => {		
		validation = $input.val()
		expect(validation).to.equal(userWebSite)	
		})
		cy.wait(1000)		
		cy.get('input[id="user-facebook"]').should(($input) => {		
		validation = $input.val()
		expect(validation).to.equal(userFacebook)	
		})		
		cy.wait(1000)
	
  });
});
