const { faker } = require("@faker-js/faker");
const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../support/tags_page_objects");

faker.seed(FAKER_SEED);

describe('F4.1 - Create new tag with title', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should create tag and should be visible in tags list', () => {

        //WHEN
        const tag_name = faker.lorem.words(2);
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.clickNewTagButton()
        TagsPageObjects.fillTagName(tag_name)
        TagsPageObjects.clickSaveTagButton()
        TagsPageObjects.clickTagsButton()

        //THEN
        TagsPageObjects.tagsShowed().should('have.length', 1)
        TagsPageObjects.tagsNameListed().children().contains(tag_name)
    })
})
