const { faker } = require("@faker-js/faker");
const { ScreenshotHelper } = require("../../support/utils");
var path = require('path');
describe('Crear un nuevo miembro', () => {
    beforeEach(()=>{
        cy.login()
        cy.deleteAllMembers()
        cy.goToPage("members")
        cy.wait(1000)
    })
    it('Create a new member', ()=>{
        const screenshotTaker = new ScreenshotHelper("F1.1")
        screenshotTaker.screenshot("Inicio agregar miembro")
        cy.get('a[data-test-new-member-button="true"]').click()
        cy.wait(1000)
        const newMemberName = faker.person.fullName()
        const newEmail = faker.internet.email()
        screenshotTaker.screenshot("Formulario de registro de miembro")
        cy.get('input[data-test-input="member-name"]').type(newMemberName)
        screenshotTaker.screenshot("Nombre ingresado")
        cy.get('input[data-test-input="member-email"]').type(newEmail)
        screenshotTaker.screenshot("Email ingresado")    
        cy.get('span[data-test-task-button-state="idle"]').click()
        cy.wait(1000)
        screenshotTaker.screenshot("Miembro guardado - Comprobación")
        cy.goToPage("members")
        cy.wait(1000)
        cy.get('h3.gh-members-list-name').then(($header)=>{
            expect($header[0].innerText).to.equal(newMemberName)
        })
        cy.get('p.gh-members-list-email').then(($header)=>{
            expect($header[0].innerText).to.equal(newEmail)
        })  
    })
  })