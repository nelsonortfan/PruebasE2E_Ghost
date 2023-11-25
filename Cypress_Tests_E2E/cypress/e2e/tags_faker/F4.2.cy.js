const { faker } = require("@faker-js/faker");
const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../support/tags_page_objects");

faker.seed(FAKER_SEED);

describe('F4.2 - Create an internal tag and should be listed ', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should create an internal tag and should be listed', () => {

        //WHEN
        const tag_name = faker.lorem.words(2);
        const internalTag = "#" + tag_name;
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.clickNewTagButton()
        TagsPageObjects.fillTagName(internalTag)
        TagsPageObjects.clickSaveTagButton()
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.clickInternalFilters()

        //THEN
        TagsPageObjects.tagsShowed().should('have.length', 1)
        TagsPageObjects.tagsNameListed().children().contains(tag_name)
    })
})