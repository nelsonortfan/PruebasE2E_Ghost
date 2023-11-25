import createGhostPage from '../../pageobjects/createGhostPage'
const { faker } = require("@faker-js/faker");
const csv = require('neat-csv')

const { ScreenshotHelper } = require("../../support/utils");
var path = require('path');

let regData
let numOfPages = 0
let messageError

describe('Prueba de cambio passwords Staff', () => {
	
    beforeEach(() => {
		cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
		cy.fixture("STAFF_PASSWORDS.csv")
            .then(csv)
            .then((data) => {
                regData = data
           })		
    })

    it('Try to change the passwords that do not match', () => {
		
		cy.wait(1000)
		cy.goToPage("settings/");	
		cy.wait(2000)		
		cy.contains('Staff').click()
		cy.wait(2000)		
		cy.get('.apps-card-app').click()		
		cy.wait(1000)
		cy.get('input[id="user-password-old"]').click()
		cy.get('input[id="user-password-old"]').type(regData[0]['curent_password'])
		cy.wait(1000)
		cy.get('input[id="user-password-new"]').click()
		cy.get('input[id="user-password-new"]').type(regData[0]['new_password1'])
		cy.wait(1000)
		cy.get('input[id="user-new-password-verification"]').click()
		cy.get('input[id="user-new-password-verification"]').type(regData[0]['new_password2'])
		cy.wait(1000)
		cy.contains('Change Password').click()
		cy.wait(1000)
		cy.get('p[data-test-error="user-ne2-pass"]').contains("Your new passwords do not match");				
    })	
	
	
	it('Try to change the passwords that are insecures', () => {
		
		cy.wait(1000)
		cy.goToPage("settings/");	
		cy.wait(2000)		
		cy.contains('Staff').click()
		cy.wait(2000)		
		cy.get('.apps-card-app').click()		
		cy.wait(1000)
		cy.get('input[id="user-password-old"]').click()
		cy.get('input[id="user-password-old"]').type(regData[1]['curent_password'])
		cy.wait(1000)
		cy.get('input[id="user-password-new"]').click()
		cy.get('input[id="user-password-new"]').type(regData[1]['new_password1'])
		cy.wait(1000)
		cy.get('input[id="user-new-password-verification"]').click()
		cy.get('input[id="user-new-password-verification"]').type(regData[1]['new_password2'])
		cy.wait(1000)
		cy.contains('Change Password').click()
		cy.wait(1000)
		cy.get('p[data-test-error="user-new-pass"]').contains("Sorry, you cannot use an insecure password.");				
    })

	it('Try to change the passwords with less than 10 characters', () => {
		
		cy.wait(1000)
		cy.goToPage("settings/");	
		cy.wait(2000)		
		cy.contains('Staff').click()
		cy.wait(2000)		
		cy.get('.apps-card-app').click()		
		cy.wait(1000)
		cy.get('input[id="user-password-old"]').click()
		cy.get('input[id="user-password-old"]').type(regData[2]['curent_password'])
		cy.wait(1000)
		cy.get('input[id="user-password-new"]').click()
		cy.get('input[id="user-password-new"]').type(regData[2]['new_password1'])
		cy.wait(1000)
		cy.get('input[id="user-new-password-verification"]').click()
		cy.get('input[id="user-new-password-verification"]').type(regData[2]['new_password2'])
		cy.wait(1000)
		cy.contains('Change Password').click()
		cy.wait(1000)
		cy.get('p[data-test-error="user-new-pass"]').contains("Password must be at least 10 characters long.");				
    })

	it('Try to change the passwords with old password empty', () => {
		
		cy.wait(1000)
		cy.goToPage("settings/");	
		cy.wait(2000)		
		cy.contains('Staff').click()
		cy.wait(2000)		
		cy.get('.apps-card-app').click()		
		cy.wait(1000)
		cy.get('input[id="user-password-new"]').click()
		cy.get('input[id="user-password-new"]').type(regData[3]['new_password1'])
		cy.wait(1000)
		cy.get('input[id="user-new-password-verification"]').click()
		cy.get('input[id="user-new-password-verification"]').type(regData[3]['new_password2'])
		cy.wait(1000)
		cy.contains('Change Password').click()
		cy.wait(1000)
		cy.get('p[data-test-error="user-old-pass"]').contains("Your current password is required to set a new one");
		
    })	
	
	it('Try to change the passwords with a wrong old password', () => {
		
		cy.wait(1000)
		cy.goToPage("settings/");	
		cy.wait(2000)		
		cy.contains('Staff').click()
		cy.wait(2000)		
		cy.get('.apps-card-app').click()		
		cy.wait(1000)
		cy.get('input[id="user-password-old"]').click()
		cy.get('input[id="user-password-old"]').type(regData[4]['curent_password'])
		cy.wait(1000)
		cy.get('input[id="user-password-new"]').click()
		cy.get('input[id="user-password-new"]').type(regData[4]['new_password1'])
		cy.wait(1000)
		cy.get('input[id="user-new-password-verification"]').click()
		cy.get('input[id="user-new-password-verification"]').type(regData[4]['new_password2'])
		cy.wait(1000)
		cy.contains('Change Password').click()
		cy.wait(1000)
		cy.contains("Your password is incorrect.");
		
    })
	
	
})