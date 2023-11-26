const { faker } = require("@faker-js/faker");
import memberPage from "../../pages/memberPage";
describe('Crear un nuevo miembro', () => {
    beforeEach(()=>{
        // Given - se tiene un ambiente libre de miembros
        cy.viewport(1920, 1080);
        cy.login()
        cy.deleteAllMembers()
        cy.goToPage("members")
        cy.wait(500)
    })
    it('Create a new member with big name', ()=>{
        // When - creo nombre largo y email con faker
        const newMemberName = faker.lorem.words(30) //nombre de 30 palabras
        const newEmail = faker.internet.email()
        // And - yo creo un miembro con esos datos
        memberPage.createNewMember(newMemberName, newEmail);

        // Then - reviso que salga aviso de error
        memberPage.elements.pResponse().should('exist')
    })
  })