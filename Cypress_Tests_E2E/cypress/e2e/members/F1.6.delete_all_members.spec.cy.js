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
    it('Create members and delete them all', () => {
        // When - I create 5 new members
        memberPage.createNewMember(memberData[0].name, memberData[0].email);
        memberPage.createNewMember(memberData[1].name, memberData[1].email);
        memberPage.createNewMember(memberData[2].name, memberData[2].email);
        memberPage.createNewMember(memberData[3].name, memberData[3].email);
        memberPage.createNewMember(memberData[4].name, memberData[4].email);
        
        // Then - I delete all members
        cy.deleteAllMembers()
        // And - I verify there's no members left
        memberPage.elements.addYourselfBtn().should('exist')

    })
})