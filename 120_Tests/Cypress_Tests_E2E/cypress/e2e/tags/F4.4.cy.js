const { ScreenshotHelper } = require("../../support/utils");

describe('Crear 3 tags, 1 internos y 2 públicos, luego filtrar los tags existentes por tipo y verificar que haya el número correcto por tipo listado', () => {
    beforeEach(() => {
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should create 2 internal tag and one public tag the filter and proves that the correct number are listed', () => {
        const screenshotTaker = new ScreenshotHelper("tags/F4.4")
        const public_tag_name_uno = "Test tag name uno"
        const public_tag_description_uno = "test_description uno"
        const internal_tag_name_uno = "#internal Test tag name uno"
        const internal_tag_description_uno = "#internal test_description uno"
        const internal_tag_name_dos = "#internal Test tag name dos"
        const internal_tag_description_dos = "#internal test_description dos"

        cy.contains('Tags').click()
        screenshotTaker.screenshot("Iniciar crear tres tags por tipo")
        cy.contains('New tag').click()
        screenshotTaker.screenshot("Dar click en crear tag")
        cy.get('#tag-name').type(public_tag_name_uno)
        screenshotTaker.screenshot("Rellenar el nombre tag publico")
        cy.get('#tag-description').type(public_tag_description_uno)
        screenshotTaker.screenshot("LLenar la descripcion tag publico")
        cy.contains('Save').click()
        screenshotTaker.screenshot("guardar exitosamente tag publico")
        cy.contains('Tags').click()
        screenshotTaker.screenshot("Verificar tag este listado")
        cy.contains('New tag').click()
        screenshotTaker.screenshot("Dar click en crear tag")
        cy.get('#tag-name').type(internal_tag_name_uno)
        screenshotTaker.screenshot("Rellenar el nombre tag interno")
        cy.get('#tag-description').type(internal_tag_description_uno)
        screenshotTaker.screenshot("LLenar la descripcion tag interno")
        cy.contains('Save').click()
        screenshotTaker.screenshot("guardar exitosamente tag interno")
        cy.contains('Tags').click()
        cy.contains('New tag').click()
        screenshotTaker.screenshot("Dar click en crear tag")
        cy.get('#tag-name').type(internal_tag_name_dos)
        screenshotTaker.screenshot("Rellenar el nombre tag interno")
        cy.get('#tag-description').type(internal_tag_description_dos)
        screenshotTaker.screenshot("LLenar la descripcion tag interno")
        cy.contains('Save').click()
        screenshotTaker.screenshot("guardar exitosamente tag interno")
        cy.contains('Tags').click()
        screenshotTaker.screenshot("Verificar tag este listado")

        cy.contains('Internal tags').click()
        screenshotTaker.screenshot("Filtrar por tag interno")
        cy.get('li.gh-list-row.gh-tags-list-item').should('have.length', 2);

        cy.contains('Public tags').click()
        screenshotTaker.screenshot("Filtrar por tag publico")
        cy.get('li.gh-list-row.gh-tags-list-item').should('have.length', 1);

    })
})