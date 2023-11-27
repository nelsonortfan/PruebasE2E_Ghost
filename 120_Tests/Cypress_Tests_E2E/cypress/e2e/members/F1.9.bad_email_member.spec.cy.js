const { faker } = require("@faker-js/faker");
import memberPage from "../../pages/memberPage";
describe('Crear un nuevo miembro', () => {
    beforeEach(()=>{
        // Given - se tiene un ambiente libre de miembros
        cy.viewport(1000, 660);
        cy.login()
        cy.deleteAllMembers()
        cy.goToPage("members")
        cy.wait(500)
    })
    it('Create a new member with a not valid email', ()=>{
        // When - creo nombre y email con faker
        const newMemberName = faker.person.fullName()
        const newEmail = 'correoerroneo@'
        // And - yo creo un miembro con esos datos
        memberPage.createNewMember(newMemberName, newEmail);

        // Then - reviso que no deje crear el miembro
        memberPage.elements.pResponse().should('exist')
    })
  })