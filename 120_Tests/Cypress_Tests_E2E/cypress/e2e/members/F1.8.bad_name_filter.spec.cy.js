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
    it('Filter a member with misspelled name', ()=>{
        // When - creo 1 nombre y correo con Faker
        const newMemberName = faker.person.fullName()
        const badMemberName = newMemberName + "blabla"
        const newEmail = faker.internet.email()
        // And - yo creo un miembro con esos datos
        memberPage.createNewMember(newMemberName, newEmail);

        // Then - filtro el miembro con un nombre mal escrito (otro nombre)
        memberPage.filterMember(0, badMemberName, 'is');
        // And - verifico miembro no se muestre
        memberPage.elements.showAllMembersBtn().should('exist')
    })
  })