const { ScreenshotHelper } = require("../../support/utils");
describe('Editar un tag ya existente, cambiar el nombre y verificar que se encuentre listado con el nuevo nombre', () => {
    beforeEach(() => {
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should create tag and the edit this correctly', () => {
        const screenshotTaker = new ScreenshotHelper("tags/F4.2")
        const tag_name = "Test tag name"
        const tag_description = "test_description"
        cy.contains('Tags').click()
        screenshotTaker.screenshot("Iniciar editar tag")
        cy.contains('New tag').click()
        screenshotTaker.screenshot("Dar click en crear tag")
        cy.get('#tag-name').type(tag_name)
        screenshotTaker.screenshot("Rellenar el nombre")
        cy.get('#tag-description').type(tag_description)
        screenshotTaker.screenshot("LLenar la descripcion")
        cy.contains('Save').click()
        screenshotTaker.screenshot("guardar exitosamente")
        cy.contains('Tags').click()
        screenshotTaker.screenshot("Verificar tag este listado")
        const item = cy.contains('h3', 'Test tag name').click();
        screenshotTaker.screenshot("Editar tag")
        cy.get('#tag-name').should('have.value', tag_name)
        cy.get('#tag-description').should('have.value', tag_description)
        cy.get('#tag-name').clear().type('Test tag name edited')
        screenshotTaker.screenshot("Editar el nombre del tag")
        cy.get('#tag-description').clear().type('test_description edited')
        screenshotTaker.screenshot("Editar la descripcion del tag")
        cy.contains('Save').click()
        screenshotTaker.screenshot("guardar exitosamente")
        cy.contains('Tags').click()
        screenshotTaker.screenshot("Verificar tag editado listado")
        const item2 = cy.contains('h3', 'Test tag name edited').click();
        cy.get('#tag-name').should('have.value', 'Test tag name edited')
        cy.get('#tag-description').should('have.value', 'test_description edited')
    })
})