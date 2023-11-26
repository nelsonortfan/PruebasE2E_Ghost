import memberPage from "../../pages/memberPage";
var memberName
var memberEmail
describe('Crear un nuevo miembro', () => {
    beforeEach(()=>{
        // Given - se tiene un ambiente libre de miembros
        cy.viewport(1000, 660);
        cy.login()
        cy.deleteAllMembers()
        cy.goToPage("members")
        cy.wait(500)
        
        // And - I get the actual user name and email
        memberPage.elements.userOptions().click()
        cy.wait(200)
        memberPage.elements.userName().then(($nombre) =>{
            memberName = $nombre[0].innerText
        })
        memberPage.elements.userEmail().then(($correo) =>{
            memberEmail = $correo[0].innerText
        })
    })
    it('Create a new member with add yourself as a member test', ()=>{
        // And - yo creo un miembro con la función add yourself as a member test
        memberPage.elements.addYourselfBtn().click();
        

        // Then - reviso que sí se haya creado el miembro
        memberPage.elements.memberNameList().then(($header)=>{
            expect($header[0].innerText).to.equal(memberName)
        });
        memberPage.elements.memberEmailList().then(($header)=>{
            expect($header[0].innerText).to.equal(memberEmail)
        });
    })
  })