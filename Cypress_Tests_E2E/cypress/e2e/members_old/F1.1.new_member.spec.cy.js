const { faker } = require("@faker-js/faker");
const { ScreenshotHelper } = require("../../support/utils");
var path = require('path');
describe('Crear un nuevo miembro', () => {
    beforeEach(()=>{
        cy.loginOld()
        cy.deleteAllMembersOld()
        cy.goToPageOld("members")
        cy.wait(1000)
    })
    it('Create a new member', ()=>{
        const screenshotTaker = new ScreenshotHelper("members_old/F1.1")
        screenshotTaker.screenshot("Inicio agregar miembro")
        cy.get('a[class="ember-view gh-btn gh-btn-green"]').click()
        cy.wait(1000)
        const newMemberName = faker.person.fullName()
        const newEmail = faker.internet.email()
        screenshotTaker.screenshot("Formulario de registro de miembro")
        cy.get('input[name="name"]').type(newMemberName)
        screenshotTaker.screenshot("Nombre ingresado")
        cy.get('input[name="email"]').type(newEmail)
        screenshotTaker.screenshot("Email ingresado")    
        cy.get('button[class="gh-btn gh-btn-blue gh-btn-icon ember-view"]').click()
        cy.wait(1000)
        cy.goToPageOld("members")
        cy.wait(1000)
        screenshotTaker.screenshot("Miembro guardado - Comprobación")
        cy.get('h3.gh-members-list-name').then(($header)=>{
            expect($header[0].innerText).to.equal(newMemberName)
        })
        cy.get('p.gh-members-list-email').then(($header)=>{
            expect($header[0].innerText).to.equal(newEmail)
        })  
    })
  })