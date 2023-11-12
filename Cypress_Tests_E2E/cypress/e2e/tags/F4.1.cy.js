describe('Crear un tag nuevo y guardarlo exitosamente, finalmente verificar que se encuentre listado', () => {
    beforeEach(() => {
        cy.login()
        cy.resetDataForTest()
    })

    it('Should create tag and should be visible in tags list', () => {
        const tag_name = "Test tag name"
        const tag_description = "test_description"
        cy.visit('http://localhost:2368/ghost/#')
        cy.contains('Tags').click()
        cy.contains('New tag').click()
        cy.get('#tag-name').type(tag_name)
        cy.get('#tag-description').type(tag_description)
        cy.contains('Save').click()
        cy.contains('Tags').click()
        const item = cy.contains('h3', 'Test tag name').click();
        cy.get('#tag-name').should('have.value', tag_name)
        cy.get('#tag-description').should('have.value', tag_description)
    })
})