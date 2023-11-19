const { ScreenshotHelper } = require("../../support/utils");

describe('Crear un tag, verificar que este listado, luego eliminar ese tag  y  verificar que no siga listado', () => {
    beforeEach(()=>{
        cy.loginOld()
        cy.goToPageOld("settings/general")
        cy.wait(1000)
    })

    it('Should create tag and then delete it finally proves that is not listed', () => {
        const screenshotTaker = new ScreenshotHelper("F4.3-old")
        const tag_name = "Test tag name"
        const tag_description = "test_description"
        cy.contains('Tags').click()
        screenshotTaker.screenshot("Iniciar eliminar tag")
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
        // delete the tag
        cy.contains('Delete tag').click()
        screenshotTaker.screenshot("Dar click en eliminar tag")

        //accept the alert in a popup and handle transition aborted error
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`Are you sure you want to delete this tag?`)
        })
        screenshotTaker.screenshot("Aceptar alerta")
        // delete from modal
        cy.get('button.gh-btn-red').then(($btn) => {
            const button = $btn.get(1)
            button.click()
        })
        screenshotTaker.screenshot("Eliminar tag")
        cy.on('uncaught:exception', (err, runnable) => {
            if (err.name === 'TransitionAborted') {
                return false;
            } else {
                cy.wait(500)
                cy.visit('http://localhost:2368/ghost/#/tags')
                screenshotTaker.screenshot("Verificar que no este listado")
                cy.get('li.gh-list-row.gh-tags-list-item').should('have.length', 0);
                //verify that the tag is not listed
                cy.contains('h3', 'Test tag name').should('not.exist')
            }
        });
    })
})