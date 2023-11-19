const { ScreenshotHelper } = require("../../support/utils");

describe('Crear un tag con elementos inválidos y verificar errores, finalmente verificar que no se encuentre listado.', () => {
    beforeEach(() => {
        cy.login()
        cy.resetDataForTest()
    })

    it('Should try to create a tag with a description with more than 500 characters', () => {
        const screenshotTaker = new ScreenshotHelper("tags/F4.5")
        const public_tag_name_uno = "Test tag name uno"
        //description with more than 500 elements
        const public_tag_description_uno = "test_description".repeat(40)
        cy.contains('Tags').click()
        screenshotTaker.screenshot("Iniciar tag elementos invalidos")
        cy.contains('New tag').click()
        screenshotTaker.screenshot("Dar click en crear tag")
        cy.get('#tag-name').type(public_tag_name_uno)
        screenshotTaker.screenshot("Rellenar el nombre tag")
        cy.get('#tag-description').type(public_tag_description_uno)
        screenshotTaker.screenshot("LLenar la descripcion tag")
        //random click
        cy.contains('Meta data').click()
        screenshotTaker.screenshot("Verificar mensaje de error")
        //verify error
        cy.get('p.response').contains('Description cannot be longer than 500 characters.')
        //modal leave page
        cy.contains('Tags').click()
        cy.get('button.gh-btn-red').click()
        screenshotTaker.screenshot("Verificar tag no este listado")
        cy.contains('Public tags').click()
        cy.get('li.gh-list-row.gh-tags-list-item').should('have.length', 0);
    })
})