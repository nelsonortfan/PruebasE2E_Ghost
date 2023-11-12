describe('Editar un tag ya existente, cambiar el nombre y verificar que se encuentre listado con el nuevo nombre', () => {
    beforeEach(() => {
        cy.login()
        cy.resetDataForTest()
    })

    it('Should create tag and the edit this correctly', () => {
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
        cy.get('#tag-name').clear().type('Test tag name edited')
        cy.get('#tag-description').clear().type('test_description edited')
        cy.contains('Save').click()
        cy.contains('Tags').click()
        const item2 = cy.contains('h3', 'Test tag name edited').click();
        cy.get('#tag-name').should('have.value', 'Test tag name edited')
        cy.get('#tag-description').should('have.value', 'test_description edited')
    })
})