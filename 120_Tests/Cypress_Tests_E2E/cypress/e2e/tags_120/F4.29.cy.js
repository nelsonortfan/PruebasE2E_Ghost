const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../pageObjects/Tags");
const {faker} = require("@faker-js/faker");


describe('F4.29 - Create a tag with empty title should show an error ', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should create a tag with empty title', () => {
        //WHEN
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.clickNewTagButton()
        TagsPageObjects.clickSaveTagButton()

        //THEN
        TagsPageObjects.invalidFieldValidationMessage().contains('You must specify a name for the tag.')
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.confirmLeavePage()
        TagsPageObjects.tagsNameListed().children().should('have.value', 0)
    })

})