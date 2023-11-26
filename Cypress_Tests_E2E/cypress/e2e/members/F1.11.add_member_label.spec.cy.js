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
    it('Create new member with label and filter by label', ()=>{
        // When - creo 3 nombres y 3 emails con faker
        const newMemberName = faker.person.fullName()
        const newEmail = faker.internet.email()
        const newLabel = faker.lorem.word()

        // And - yo creo tres miembros con esos datos
        memberPage.createNewMemberLabel(newMemberName, newEmail, newLabel);

        // Then - verifico que se pueda filtrar por label   
        memberPage.filterMember(2, newLabel, 'is');
        memberPage.elements.showAllMembersBtn().should('not.exist')
    })
  })