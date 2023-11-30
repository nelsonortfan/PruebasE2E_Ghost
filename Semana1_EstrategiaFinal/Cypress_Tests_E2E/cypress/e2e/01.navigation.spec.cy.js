import settingsPage from "../pages/settingsPage";
import createGhostPage from "../pageObjects/Pages"
var navigationData;
describe('Crear botón en navigation y probar en page', () => {
    beforeEach(()=>{
        // Given - se tiene un ambiente libre de miembros
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
        cy.goToPage("settings/navigation")
        // And - Se llama al API de Mockaroo
        cy.request('https://my.api.mockaroo.com/navigation1.json?key=372a3b20').then((resp) => {
            navigationData = resp.body;
          })
    })
    it('Create a new navigation field ', ()=>{
        // When - Borro todos los label del primary navigation menu
        settingsPage.deleteAllNavLabels(0);
		
		// When I create a New page with a title
        cy.goToPage("pages");
		const pageGhostObj = new createGhostPage();
		pageGhostObj.createNewPage(navigationData[0].label_url,"description")
		pageGhostObj.publishNewPage()

        cy.goToPage("settings/navigation")
        settingsPage.newNavPrimField(navigationData[0].label_name, navigationData[0].label_url)

        cy.visit(Cypress.env("ghost_url").slice(0, -6))
        cy.get('li.nav-' + navigationData[0].label_name.toLowerCase()).click()

        settingsPage.elements.articleTitle().should('have.text', navigationData[0].label_url)

        
    })
})