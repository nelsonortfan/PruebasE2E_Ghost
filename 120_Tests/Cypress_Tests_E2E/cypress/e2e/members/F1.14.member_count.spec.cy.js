const { faker } = require("@faker-js/faker");
import memberPage from "../../pages/memberPage";
var memberData;
var memberAmount;
describe('Crear un nuevo miembro', () => {
    beforeEach(()=>{
        // Given - se tiene un ambiente libre de miembros
        cy.viewport(1000, 660);
        cy.login()
        cy.deleteAllMembers()
        cy.goToPage("members")
        cy.wait(500)

        // And - creo un número aleatorio
        memberAmount = faker.number.int({ min: 1, max: 6 }) //random number between 3 and 6        
        // And - Se llama al API de Mockaroo
        cy.request('https://my.api.mockaroo.com/members.json?key=372a3b20').then((resp) => {
            memberData = resp.body;
          })
    })
    it('Create a random number of members member to verify member count', ()=>{
        // When - creo nombre(s) y email(s) con Mockaroo y creo estos miembros
        for(let i = 0; i < memberAmount; i++){
            memberPage.createNewMember(memberData[i].name, memberData[i].email);
        }

        // Then - reviso que el contador de miembros sea igual a mi variable de faker
        memberPage.elements.memberCount().then(($conteo) =>{
            expect($conteo[0].innerText).to.equal(memberAmount.toString())
        })
    })
  })