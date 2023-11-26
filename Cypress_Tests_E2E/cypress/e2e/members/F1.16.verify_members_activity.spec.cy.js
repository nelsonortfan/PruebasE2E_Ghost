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
    it('Create a new member and verify signup activity', ()=>{
        // When - creo miembro con Mockaroo
        memberPage.createNewMember(memberData[0].name, memberData[0].email);

        // Then - reviso que salga en members-activity
        cy.goToPage("members-activity")
        memberPage.lookForActivityEqual(memberPage.elements.memberActivityEvent(), 'Signed up');
    })
})