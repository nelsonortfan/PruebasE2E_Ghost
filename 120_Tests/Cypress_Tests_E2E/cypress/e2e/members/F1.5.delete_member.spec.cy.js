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
    it('Create member and delete it', () => {
        // When - I create 2 new members
        const newMemberName = faker.person.fullName()
        const newEmail = faker.internet.email()
        const newMemberName2 = faker.person.fullName()
        const newEmail2 = faker.internet.email()
        memberPage.createNewMember(newMemberName, newEmail);
        memberPage.createNewMember(newMemberName2, newEmail2);

        // Then - I delete one of those new members
        memberPage.deleteMember(newEmail);
        // And - I check it was erased
        memberPage.assertNotMemberEmail(newEmail);
    })
})