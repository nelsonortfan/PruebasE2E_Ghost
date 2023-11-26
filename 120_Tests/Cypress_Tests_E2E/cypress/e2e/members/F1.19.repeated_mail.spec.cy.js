import memberPage from "../../pages/memberPage";
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
    it('Create a new member with repeated email', ()=>{
        // When - creo dos miembros con el mismo correo
        cy.on('uncaught:exception', (err, runnable) => {
            return false
          })
        memberPage.createNewMember(memberData[0].name, memberData[0].email);
        memberPage.createNewMemberFail(memberData[1].name, memberData[0].email);

        // Then - reviso que no deje crear el segundo miembro
        memberPage.elements.pResponse().should('exist')
    })
})