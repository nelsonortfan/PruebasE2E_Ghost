import memberPage from "../../pages/memberPage";
const { faker } = require("@faker-js/faker");
var memberData;
describe('Crear un nuevo miembro', () => {
    beforeEach(()=>{
        // Given - se tiene un ambiente libre de miembros
        cy.viewport(1000, 660);
        cy.login()
        cy.deleteAllMembers()
        cy.goToPage("members")
        cy.wait(500)
        // And - Se llama al API de Mockaroo
        cy.request('https://my.api.mockaroo.com/members.json?key=372a3b20').then((resp) => {
            memberData = resp.body;
          })
    })
    it('Create a new member with a big note', ()=>{
        // When - creo miembro con Mockaroo y nota con faker
        const nota = faker.lorem.words(100);
        memberPage.createNewMemberNote(memberData[0].name, memberData[0].email, nota);

        // Then - reviso que no deje crear el miembro por tener una nota muy grande
        memberPage.elements.pResponse().should('exist')
    })
})