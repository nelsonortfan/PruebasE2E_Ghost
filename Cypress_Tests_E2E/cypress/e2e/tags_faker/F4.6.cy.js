const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../support/tags_page_objects");
const {faker} = require("@faker-js/faker");

faker.seed(FAKER_SEED);

describe('F4.6 - Edit a slug with an invalid one and verify error', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should edit a slug with an invalid one and verify error', () => {

        //WHEN
        const tag_name = faker.lorem.words(2);
        const tag_slug_invalid = faker.lorem.words(30);
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.clickNewTagButton()
        TagsPageObjects.fillTagName(tag_name)
        TagsPageObjects.fillTagSlug(tag_slug_invalid)
        TagsPageObjects.clickSaveTagButton()

        //THEN
        TagsPageObjects.invalidSlugErrorMessage().contains('URL cannot be longer than 191 characters.')
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.confirmLeavePage()
        TagsPageObjects.tagsNameListed().children().should('not.contain', tag_name)
    })
})