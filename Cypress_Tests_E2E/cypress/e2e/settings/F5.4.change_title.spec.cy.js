const { faker } = require("@faker-js/faker");
describe('Crear un nuevo miembro', () => {
    beforeEach(()=>{
        cy.login()
        cy.goToPage("settings/general")
        cy.wait(1000)
    })
    it('Change site title', ()=>{
        const newTitle = faker.internet.domainWord()
        cy.get('button[data-test-toggle-pub-info=""]').click()
        cy.wait(300)
        cy.get('input[data-test-title-input=""]').clear()
        cy.get('input[data-test-title-input=""]').type(newTitle)
        cy.wait(100)
        cy.get('button[data-test-button="save"]').click()
        cy.wait(500)
        cy.get('div.gh-nav-menu-details-sitetitle').then(($header)=>{
            expect($header[0].innerText).to.equal(newTitle)
        })
    })
  })