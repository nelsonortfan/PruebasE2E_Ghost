describe('Crear un tag y luego eliminar todo el contenido de la DB desde settings - labs - delete all content y finalmente verificar que no hayan tags listados', () => {
    beforeEach(() => {
        cy.login()
        cy.visit('http://localhost:2368/ghost/#')
        cy.resetDataForTest()
    })

    it('Delete all database data successfully', () => {
        const public_tag_name_uno = "Test tag name uno"
        //description with more than 500 elements
        const public_tag_description_uno = "test_description"
        cy.visit('http://localhost:2368/ghost/#')
        cy.contains('Tags').click()
        cy.contains('New tag').click()
        cy.get('#tag-name').type(public_tag_name_uno)
        cy.get('#tag-description').type(public_tag_description_uno)
        cy.contains('Save').click()
        cy.contains('Tags').click()
        cy.contains('Public tags').click()
        cy.get('li.gh-list-row.gh-tags-list-item').should('have.length', 1);

        cy.get('#ember24').click();
        cy.contains('Labs').click()

        //press the red button called Delete to delete the database
        cy.get('button.gh-btn-red').click()
        //press delete button in the epm-modal-container modal to confirm the delete
        cy.get('button.gh-btn-red').then(($btn) => {
            const button = $btn.get(1)
            button.click()
        })

        //verify that the tag is not listed
        cy.contains('Tags').click()
        cy.contains('Public tags').click()
        cy.get('li.gh-list-row.gh-tags-list-item').should('have.length', 0);
    })
})