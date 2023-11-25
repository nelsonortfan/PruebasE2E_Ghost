const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../pageObjects/Tags");
const {faker} = require("@faker-js/faker");

faker.seed(FAKER_SEED);

describe('F4.4 - Create a description with more than 500 characters throws error ', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should create a description with more than 500 characters', () => {
        //WHEN
        const tag_name = faker.lorem.words(2);
        const tag_description = faker.lorem.words(100)
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.clickNewTagButton()
        TagsPageObjects.fillTagName(tag_name)
        TagsPageObjects.fillTagDescription(tag_description)
        TagsPageObjects.clickSaveTagButton()

        //THEN
        TagsPageObjects.invalidFieldValidationMessage().contains('Description cannot be longer than 500 characters.')
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.confirmLeavePage()
        TagsPageObjects.tagsNameListed().children().should('not.contain', tag_name)
    })

})
