const { faker } = require("@faker-js/faker");
describe('Crear un nuevo miembro', () => {
    beforeEach(()=>{
        cy.login()
        cy.deleteAllMembers()
        cy.goToPage("members")
        cy.wait(1000)
    })
    it('Create a new member', ()=>{
        cy.get('a[data-test-new-member-button="true"]').click()
        cy.wait(1000)
        const newMemberName = faker.person.fullName()
        const newEmail = faker.internet.email()
        cy.get('form').within(() => {
            cy.get('input[data-test-input="member-name"]').type(newMemberName)
            cy.get('input[data-test-input="member-email"]').type(newEmail)    
        })
        cy.get('span[data-test-task-button-state="idle"]').click()
        cy.wait(1000)
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