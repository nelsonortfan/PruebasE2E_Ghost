const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../support/tags_page_objects");
const {faker} = require("@faker-js/faker");

faker.seed(FAKER_SEED);

describe('F4.9 - Create a tag and assign a different invalid color', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should create a tag and assign a different invalid color', () => {
        //WHEN
        const tag_name = faker.lorem.words(2);
        //invalid hex tag color
        const tag_color = faker.internet.color();
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.clickNewTagButton()
        TagsPageObjects.fillTagName(tag_name)
        TagsPageObjects.fillTagColor(tag_color)
        TagsPageObjects.clickSaveTagButton()

        //THEN
        TagsPageObjects.invalidFieldValidationMessage().contains('The colour should be in valid hex format')
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.confirmLeavePage()
        TagsPageObjects.tagsNameListed().should('not.contain', tag_name)
    })
})