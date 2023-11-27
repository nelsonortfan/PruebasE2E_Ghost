const { faker } = require("@faker-js/faker");
const settingsPage = require("../../pages/settingsPage");
describe('Cambiar el titulo del sitio y luego dejarlo vacío', () => {
    beforeEach(()=>{
        // Given - Un ambiente normal de trabajo en Ghost en settings/General
        cy.viewport(1000, 660);
        cy.login()
        cy.goToPage("settings/general")
        cy.wait(1000)
    })
    it('Change site title', ()=>{
        // When - I change the site name with a new name from Faker
        let newTitle = faker.internet.domainWord()
        settingsPage.changeTitle(newTitle);
        // And - I change the title name for an empty title
        cy.reload()
        settingsPage.emptyTitle();

        // Then - I check the title is changed
        settingsPage.elements.siteTitle().then(($header)=>{
            expect($header[0].innerText).to.equal("")
        })
    })
  })