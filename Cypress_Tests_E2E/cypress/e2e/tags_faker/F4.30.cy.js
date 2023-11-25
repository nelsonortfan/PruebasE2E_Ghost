const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../support/tags_page_objects");
const {faker} = require("@faker-js/faker");


describe('F4.30 - Should exists another button that allows to create tag if there are not elements', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should exists another button that allows to create tag if there are not elements', () => {
        //WHEN
        TagsPageObjects.clickTagsButton()

        //THEN
        TagsPageObjects.tagsShowed().should('have.length', 0)
        TagsPageObjects.greenButtonCreateTag().should('be.visible')
    })
})