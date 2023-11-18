const { faker } = require("@faker-js/faker");
const { ScreenshotHelper } = require("../../support/utils");
var path = require('path');
describe('Filtrar tres miembros por email previamente creados a través del botón de filtro y verificar que sí salgan bien sus resultados', () => {
    beforeEach(()=>{
        cy.login()
        cy.deleteAllMembers()
        cy.goToPage("members")
        cy.wait(1000)
    })
    it('Create 3 new member and filter them', ()=>{
        const screenshotTaker = new ScreenshotHelper("members/F1.4")
        screenshotTaker.screenshot("Inicio test, creando miembro 1")
        cy.get('a[data-test-new-member-button="true"]').click()
        cy.wait(1000)
        const newMemberName = faker.person.fullName()
        const newEmail = faker.internet.email()
        screenshotTaker.screenshot("Creación miembro 1")
        cy.get('form').within(() => {
            cy.get('input[data-test-input="member-name"]').type(newMemberName)
            cy.get('input[data-test-input="member-email"]').type(newEmail)    
        })
        screenshotTaker.screenshot("Formulario llenado miembro 1")
        cy.get('span[data-test-task-button-state="idle"]').click()
        cy.wait(1000)
        cy.goToPage("members")
        cy.wait(1000)
        screenshotTaker.screenshot("Miembro 1 creado")
        cy.get('a[data-test-new-member-button="true"]').click()
        cy.wait(1000)
        const newMemberName2 = faker.person.fullName()
        const newEmail2 = faker.internet.email()
        screenshotTaker.screenshot("Creación miembro 2")
        cy.get('form').within(() => {
            cy.get('input[data-test-input="member-name"]').type(newMemberName2)
            cy.get('input[data-test-input="member-email"]').type(newEmail2)    
        })
        screenshotTaker.screenshot("Formulario llenado miembro 2")
        cy.get('span[data-test-task-button-state="idle"]').click()
        cy.wait(1000)
        cy.goToPage("members")
        cy.wait(1000)
        screenshotTaker.screenshot("Miembro 2 creado")
        cy.get('a[data-test-new-member-button="true"]').click()
        cy.wait(1000)
        screenshotTaker.screenshot("Creación miembro 3")
        const newMemberName3 = faker.person.fullName()
        const newEmail3 = faker.internet.email()
        cy.get('form').within(() => {
            cy.get('input[data-test-input="member-name"]').type(newMemberName3)
            cy.get('input[data-test-input="member-email"]').type(newEmail3)    
        })
        screenshotTaker.screenshot("Formulario llenado miembro 3")
        cy.get('span[data-test-task-button-state="idle"]').click()
        cy.wait(1000)
        cy.goToPage("members")
        cy.wait(1000)
        screenshotTaker.screenshot("Miembro 3 creado")
        cy.get('div[data-test-button="members-filter-actions"]').click()
        cy.get('select[data-test-select="members-filter"]').select(1)
        cy.get('select[data-test-select="members-filter-operator"]').select('is')
        cy.get('input[data-test-input="members-filter-value"]').clear()
        cy.get('input[data-test-input="members-filter-value"]').type(newEmail)
        screenshotTaker.screenshot("Ingreso datos miembro 1 en filtro")
        cy.get('button[data-test-button="members-apply-filter"]').click()
        cy.wait(500)
        screenshotTaker.screenshot("Verificación miembro 1 filtrado")
        cy.get('p.gh-members-list-email').then(($header)=>{
            expect($header[0].innerText).to.equal(newEmail)
        })

        cy.get('div[data-test-button="members-filter-actions"]').click()
        cy.get('select[data-test-select="members-filter"]').select(1)
        cy.get('select[data-test-select="members-filter-operator"]').select('is')
        cy.get('input[data-test-input="members-filter-value"]').clear()
        cy.get('input[data-test-input="members-filter-value"]').type(newEmail2)
        screenshotTaker.screenshot("Ingreso datos miembro 2 en filtro")
        cy.get('button[data-test-button="members-apply-filter"]').click()
        cy.wait(500)
        screenshotTaker.screenshot("Verificación miembro 2 filtrado")
        cy.get('p.gh-members-list-email').then(($header)=>{
            expect($header[0].innerText).to.equal(newEmail2)
        })

        cy.get('div[data-test-button="members-filter-actions"]').click()
        cy.get('select[data-test-select="members-filter"]').select(1)
        cy.get('select[data-test-select="members-filter-operator"]').select('is')
        cy.get('input[data-test-input="members-filter-value"]').clear()
        cy.get('input[data-test-input="members-filter-value"]').type(newEmail3)
        screenshotTaker.screenshot("Ingreso datos miembro 3 en filtro")
        cy.get('button[data-test-button="members-apply-filter"]').click()
        cy.wait(500)
        screenshotTaker.screenshot("Verificación miembro 3 filtrado")
        cy.get('p.gh-members-list-email').then(($header)=>{
            expect($header[0].innerText).to.equal(newEmail3)
        })
    })
  })