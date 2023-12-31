import settingsPage from "../pages/settingsPage";
import createGhostPage from "../pageObjects/Pages"
var navigationData;
describe('Crear botón en navigation y página y probar en sitio principal', () => {
    beforeEach(()=>{
        // Given - se tiene un ambiente libre de pages
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
        cy.goToPage("settings/navigation")
        // And - Borro todos los label del primary navigation menu
        settingsPage.deleteAllNavLabels(0);
        // And - Se llama al API de Mockaroo
        cy.request('https://my.api.mockaroo.com/navigation1.json?key=372a3b20').then((resp) => {
            navigationData = resp.body;
          })
    })
    it('Create a new navigation field ', ()=>{
		// When - Creo una página nueva solamente con título
        cy.goToPage("pages");
		const pageGhostObj = new createGhostPage();
		pageGhostObj.createNewPage(navigationData[0].label_url,"description")
		pageGhostObj.publishNewPage()
        // And - Creo un label con la url apuntando a esa página
        cy.goToPage("settings/navigation")
        settingsPage.newNavPrimField(navigationData[0].label_name, navigationData[0].label_url)
        // And - Voy al site de Ghost y le doy click a ese label del menú de navegación
        cy.visit(Cypress.env("ghost_url").slice(0, -6))
        cy.get('li.nav-' + navigationData[0].label_name.toLowerCase()).click()

        // Then - Reviso que el título de la página coincida con el nombre colocado
        settingsPage.elements.articleTitle().should('have.text', navigationData[0].label_url)
    })
})