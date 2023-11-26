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
    it('Create 3 new member and filter them using 2 filters', ()=>{
        // When - yo creo tres miembros con datos de Mockaroo
        memberPage.createNewMember(memberData[0].name, memberData[0].email);
        memberPage.createNewMember(memberData[1].name, memberData[1].email);
        memberPage.createNewMember(memberData[2].name, memberData[2].email);

        // Then - verifico que se pueda filtrar el primer miembro con dos filtros  
        memberPage.filterMember2(1, memberData[0].email, 'is', 0, memberData[0].name, 'is');
        memberPage.elements.memberEmailList().then(($header)=>{
            expect($header[0].innerText).to.equal(memberData[0].email)
        })
        memberPage.elements.memberNameList().then(($header)=>{
            expect($header[0].innerText).to.equal(memberData[0].name)
        })
        // And - verifico que se pueda filtrar el segundo miembro con dos filtros
        memberPage.resetFilter();
        memberPage.filterMember2(1, memberData[1].email, 'is', 0, memberData[1].name, 'is');
        memberPage.elements.memberEmailList().then(($header)=>{
            expect($header[0].innerText).to.equal(memberData[1].email)
        })
        memberPage.elements.memberNameList().then(($header)=>{
            expect($header[0].innerText).to.equal(memberData[1].name)
        })
        // Then - verifico que se pueda filtrar el tercer miembro con dos filtros
        memberPage.resetFilter();
        memberPage.filterMember2(1, memberData[2].email, 'is', 0, memberData[2].name, 'is');
        memberPage.elements.memberEmailList().then(($header)=>{
            expect($header[0].innerText).to.equal(memberData[2].email)
        })
        memberPage.elements.memberNameList().then(($header)=>{
            expect($header[0].innerText).to.equal(memberData[2].name)
        })
    })
  })