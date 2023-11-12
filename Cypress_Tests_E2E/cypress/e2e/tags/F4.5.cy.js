describe('Crear un tag con elementos inválidos y verificar errores, finalmente verificar que no se encuentre listado.', () => {
    beforeEach(() => {
        cy.login()
        cy.visit('http://localhost:2368/ghost/#')
        cy.resetDataForTest()
    })

    it('Should try to create a tag with a description with more than 500 characters', () => {
        const public_tag_name_uno = "Test tag name uno"
        //description with more than 500 elements
        const public_tag_description_uno = "test_description".repeat(40)
        cy.visit('http://localhost:2368/ghost/#')
        cy.contains('Tags').click()
        cy.contains('New tag').click()
        cy.get('#tag-name').type(public_tag_name_uno)
        cy.get('#tag-description').type(public_tag_description_uno)
        //random click
        cy.contains('Meta data').click()
        //verify error
        cy.get('p.response').contains('Description cannot be longer than 500 characters.')
        //modal leave page
        cy.contains('Tags').click()
        cy.get('button.gh-btn-red').click()

        cy.contains('Public tags').click()
        cy.get('li.gh-list-row.gh-tags-list-item').should('have.length', 0);
    })
})