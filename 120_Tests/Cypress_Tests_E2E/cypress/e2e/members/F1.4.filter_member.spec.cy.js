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
    it('Create 3 new member and filter them', ()=>{
        // When - creo 3 nombres y 3 emails con faker
        const newMemberName = faker.person.fullName()
        const newEmail = faker.internet.email()
        const newMemberName2 = faker.person.fullName()
        const newEmail2 = faker.internet.email()
        const newMemberName3 = faker.person.fullName()
        const newEmail3 = faker.internet.email()
        // And - yo creo tres miembros con esos datos
        memberPage.createNewMember(newMemberName, newEmail);
        memberPage.createNewMember(newMemberName2, newEmail2);
        memberPage.createNewMember(newMemberName3, newEmail3);

        // Then - verifico que se pueda filtrar el primer miembro   
        memberPage.filterMember(1, newEmail, 'is');
        memberPage.assertMemberEmail(newEmail, 0);
        // And - verifico que se pueda filtrar el segundo miembro
        memberPage.filterMember(1, newEmail2, 'is');
        memberPage.assertMemberEmail(newEmail2, 0);
        // And - verifico que se pueda filtrar el tercer miembro
        memberPage.filterMember(1, newEmail3, 'is');
        memberPage.assertMemberEmail(newEmail3, 0);
    })
  })