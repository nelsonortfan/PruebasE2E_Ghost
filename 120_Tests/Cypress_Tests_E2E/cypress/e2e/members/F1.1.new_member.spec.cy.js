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
    it('Create a new member', ()=>{
        // When - creo nombre y email con faker
        const newMemberName = faker.person.fullName()
        const newEmail = faker.internet.email()
        // And - yo creo un miembro con esos datos
        memberPage.createNewMember(newMemberName, newEmail);

        // Then - reviso que sí se haya creado el miembro
        memberPage.assertMemberName(newMemberName, 0);
        memberPage.assertMemberEmail(newEmail, 0);
    })
  })