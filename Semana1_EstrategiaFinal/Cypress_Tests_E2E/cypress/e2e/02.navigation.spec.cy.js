const { faker } = require("@faker-js/faker");
import settingsPage from "../pages/settingsPage";
import createGhostPage from "../pageObjects/Pages"
var navigationData;
var n;
describe('Crear n botones en navigation y n páginas y probar en sitio principal', () => {
    beforeEach(()=>{
        // Given - se tiene un ambiente libre de pages
        cy.viewport(1000, 660);
        cy.clearAllSessionStorage({log: true})
        cy.clearLocalStorage()
        cy.clearCookies()
        cy.login()
        cy.resetDataForTest()
        cy.goToPage("settings/navigation")
        // And - Borro todos los label del primary navigation menu
        settingsPage.deleteAllNavLabels(0);
        // And - Se llama al API de Mockaroo
        cy.request('https://my.api.mockaroo.com/navigation1.json?key=372a3b20').then((resp) => {
            navigationData = resp.body;
          })
        // And - Creo un número aleatorio n usando faker
        n = faker.number.int({min:1,max:15})
    })
    it('Create a new navigation field ', ()=>{
		// When - Creo n páginas nuevas solamente con título
        
        for(let i = 0; i < n; i++){
            cy.goToPage("pages");
            cy.goToPage("pages");
		    const pageGhostObj = new createGhostPage();
            pageGhostObj.createNewPage(navigationData[i].label_url,"description")
		    pageGhostObj.publishNewPage()
        }		
        // And - Creo un label con la url apuntando a esa página
        cy.goToPage("settings/navigation")
        cy.goToPage("settings/navigation")
        for(let i = 0; i < n; i++){
            settingsPage.newNavPrimField(navigationData[i].label_name, navigationData[i].label_url)
        }        
        // And - Voy al site de Ghost y le doy click a ese label del menú de navegación
        cy.visit(Cypress.env("ghost_url").slice(0, -6))

        for(let i = 0; i < n; i++){
            cy.get('body').then(($more) =>{
                if($more.find('.gh-more-toggle').length){
                    settingsPage.elements.moreLabelToggle().click();
                }
            }) 
            cy.get('li.nav-' + navigationData[i].label_name.toLowerCase()).click()
            // Then - Reviso que el título de la página coincida con el nombre colocado
            settingsPage.elements.articleTitle().should('have.text', navigationData[i].label_url)
        }        
    })
})