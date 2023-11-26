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
    it('Import members and delete them', ()=>{
        // When - Importo miembros de un archivo csv creado previamente
        memberPage.importMembers('members.csv');

        // Then - verifico que los miembros se hayan creado
        memberPage.assertMemberName('Nombre de prueba 3', 0);
        memberPage.assertMemberName('Nombre de prueba 2', 1);
        memberPage.assertMemberName('Nombre de prueba 1', 2);
    })
  })