import GhostStaff from '../../pageObjects/Staff'
const csv = require('neat-csv')

const { ScreenshotHelper } = require("../../support/utils");
var path = require('path');

let regData
let numOfPages = 0
let messageError
const staffObj = new GhostStaff();	

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
		staffObj.selectOwnerStaff()
		staffObj.changePasswords(regData[0]['curent_password'], regData[0]['new_password1'], regData[0]['new_password2'])
		cy.get('p[data-test-error="user-ne2-pass"]').contains("Your new passwords do not match");				
    })	
	
	
	it('Try to change the passwords that are insecures', () => {		
		cy.wait(1000)
		staffObj.selectOwnerStaff()
		staffObj.changePasswords(regData[1]['curent_password'], regData[1]['new_password1'], regData[1]['new_password2'])
		cy.get('p[data-test-error="user-new-pass"]').contains("Sorry, you cannot use an insecure password.");				
    })
	
	
	it('Try to change the passwords with less than 10 characters', () => {		
		cy.wait(1000)
		staffObj.selectOwnerStaff()
		staffObj.changePasswords(regData[2]['curent_password'], regData[2]['new_password1'], regData[2]['new_password2'])
		cy.get('p[data-test-error="user-new-pass"]').contains("Password must be at least 10 characters long.");				
    })
	

	it('Try to change the passwords with old password empty', () => {		
		cy.wait(1000)
		staffObj.selectOwnerStaff()
		staffObj.changePasswordsWithoutCurrent(regData[3]['new_password1'], regData[3]['new_password2'])
		cy.get('p[data-test-error="user-old-pass"]').contains("Your current password is required to set a new one");		
    })	
	
	
	it('Try to change the passwords with a wrong old password', () => {		
		cy.wait(1000)
		staffObj.selectOwnerStaff()
		staffObj.changePasswords(regData[4]['curent_password'], regData[4]['new_password1'], regData[4]['new_password2'])
		cy.contains("Your password is incorrect.");		
    })
	
	
})