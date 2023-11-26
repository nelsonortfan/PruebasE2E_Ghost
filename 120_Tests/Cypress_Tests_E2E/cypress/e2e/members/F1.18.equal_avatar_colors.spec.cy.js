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
    it('Create a new member without newsletter and verify in activity', ()=>{
        // When - creo dos miembros con el mismo nombre
        memberPage.createNewMemberNoNewsletter(memberData[0].name, memberData[0].email);
        memberPage.createNewMemberNoNewsletter(memberData[0].name, memberData[1].email);

        // Then - reviso que el color de sus avatares sea igual
        memberPage.elements.memberInitials().then(($initials) =>{
            expect($initials[0].getAttribute("style")).to.equal($initials[1].getAttribute("style"))

        })   
    })
})