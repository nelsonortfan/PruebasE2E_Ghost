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
    it('New member site abandonment', ()=>{
        // When - Ingreso valores de nombre e email en el formulario de registro de miembro nuevo
        memberPage.addMemberInfo(memberData[0].name, memberData[0].email);

        // Then - Me salgo de esta página
        memberPage.elements.membersBackBtn().click();
        // And - verifico que el aviso de confirmación aparezca
        memberPage.elements.newMemberLeaveBtn().should('exist');
    })
  })