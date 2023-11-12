describe('Crear un tag, verificar que este listado, luego eliminar ese tag  y  verificar que no siga listado', () => {
    beforeEach(() => {
        cy.login()
        cy.resetDataForTest()
    })

    it('Should create tag and then delete it finally proves that is not listed', () => {
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
        // delete the tag
        cy.contains('Delete tag').click()
        //accept the alert in a popup and handle transition aborted error
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`Are you sure you want to delete this tag?`)
        })
        // delete from modal
        cy.get('button.gh-btn-red').then(($btn) => {
            const button = $btn.get(1)
            button.click()
        })
        cy.on('uncaught:exception', (err, runnable) => {
            if (err.name === 'TransitionAborted') {
                return false;
            } else {
                cy.wait(500)
                cy.visit('http://localhost:2368/ghost/#/tags')
                cy.get('li.gh-list-row.gh-tags-list-item').should('have.length', 0);
                //verify that the tag is not listed
                cy.contains('h3', 'Test tag name').should('not.exist')
            }
        });
    })
})