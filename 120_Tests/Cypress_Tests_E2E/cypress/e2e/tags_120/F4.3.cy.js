const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../pageObjects/Tags");
const {faker} = require("@faker-js/faker");

faker.seed(FAKER_SEED);

describe('F4.3 - Create a title with more than 100 characters throws error ', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should create a title with more than 100 characters', () => {
        //WHEN
        const tag_name = faker.lorem.words(50);
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.clickNewTagButton()
        TagsPageObjects.fillTagName(tag_name)
        TagsPageObjects.clickSaveTagButton()

        //THEN
        TagsPageObjects.invalidFieldValidationMessage().contains('Tag names cannot be longer than 191 characters.')
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.confirmLeavePage()
        TagsPageObjects.tagsNameListed().children().should('not.contain', tag_name)
    })

})