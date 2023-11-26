const { ScreenshotHelper } = require("../../support/utils");

describe('Crear un tag nuevo y guardarlo exitosamente, finalmente verificar que se encuentre listado', () => {
    beforeEach(() => {
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should create tag and should be visible in tags list', () => {
        const screenshotTaker = new ScreenshotHelper("tags/F4.1")
        const tag_name = "Test tag name"
        const tag_description = "test_description"
        cy.contains('Tags').click()
        screenshotTaker.screenshot("Iniciar crear tag")
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
        screenshotTaker.screenshot("Ir al detalle del tag")
        cy.get('#tag-name').should('have.value', tag_name)
        screenshotTaker.screenshot("verificar nombre")
        cy.get('#tag-description').should('have.value', tag_description)
        screenshotTaker.screenshot("verificar descripcion")
    })
})