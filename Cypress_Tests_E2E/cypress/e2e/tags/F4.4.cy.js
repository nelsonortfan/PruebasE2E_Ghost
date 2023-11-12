describe('Crear 3 tags, 1 internos y 2 públicos, luego filtrar los tags existentes por tipo y verificar que haya el número correcto por tipo listado', () => {
    beforeEach(() => {
        cy.login()
        cy.resetDataForTest()
    })

    it('Should create 2 internal tag and one public tag the filter and proves that the correct number are listed', () => {
        const public_tag_name_uno = "Test tag name uno"
        const public_tag_description_uno = "test_description uno"
        const internal_tag_name_uno = "#internal Test tag name uno"
        const internal_tag_description_uno = "#internal test_description uno"
        const internal_tag_name_dos = "#internal Test tag name dos"
        const internal_tag_description_dos = "#internal test_description dos"

        cy.visit('http://localhost:2368/ghost/#')
        cy.contains('Tags').click()
        cy.contains('New tag').click()
        cy.get('#tag-name').type(public_tag_name_uno)
        cy.get('#tag-description').type(public_tag_description_uno)
        cy.contains('Save').click()
        cy.contains('Tags').click()
        cy.contains('New tag').click()
        cy.get('#tag-name').type(internal_tag_name_uno)
        cy.get('#tag-description').type(internal_tag_description_uno)
        cy.contains('Save').click()
        cy.contains('Tags').click()
        cy.contains('New tag').click()
        cy.get('#tag-name').type(internal_tag_name_dos)
        cy.get('#tag-description').type(internal_tag_description_dos)
        cy.contains('Save').click()
        cy.contains('Tags').click()

        cy.contains('Internal tags').click()
        cy.get('li.gh-list-row.gh-tags-list-item').should('have.length', 2);

        cy.contains('Public tags').click()
        cy.get('li.gh-list-row.gh-tags-list-item').should('have.length', 1);

    })
})