const { ScreenshotHelper } = require("../../support/utils");
var path = require('path');

describe("Test set mailgun credentias", () => {
	
  var userLocation = 'Bogota-Colombia'
  var userWebSite = 'http://mywebsite.com'
  var userFacebook = 'https://www.facebook.com/lucasBunny'
  var validation = '' 	
	
  beforeEach(() => {
	cy.viewport(1000, 660);	  
    cy.login();
  });
  
  it("Should set mailgun credentials", () => {
	  
		const screenshotTaker = new ScreenshotHelper("settings/F5.3")
    
		cy.wait(1000)
		cy.goToPage("settings/");	
		cy.wait(2000)
		screenshotTaker.screenshot("Pantalla inicial de settings")
		cy.contains('Staff').click()
		cy.wait(2000)
		screenshotTaker.screenshot("Pantalla inicial de Staff")
		cy.get('.apps-card-app').click()		
		cy.wait(1000)
		cy.get('input[id="user-location"]').clear()
		cy.get('input[id="user-location"]').type(userLocation)
		cy.wait(2000)
		screenshotTaker.screenshot("Pantalla userLocation")
		cy.get('input[id="user-website"]').clear()
		cy.get('input[id="user-website"]').type(userWebSite)
		cy.wait(2000)
		screenshotTaker.screenshot("Pantalla userWebSite")
		cy.get('input[id="user-facebook"]').clear()
		cy.get('input[id="user-facebook"]').type(userFacebook)
		cy.wait(2000)
		screenshotTaker.screenshot("Pantalla userFacebook")
		cy.get('button[data-test-save-button=""]').click()
		cy.wait(1000)
		cy.contains('Saved')		
		screenshotTaker.screenshot("Pantalla Staff saved")
		cy.goToPage("settings/");		
		cy.wait(1000)
		cy.contains('Staff').click()
		cy.wait(1000)
		cy.get('.apps-card-app').click()
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
