const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../pageObjects/Tags");
const {faker} = require("@faker-js/faker");

faker.seed(FAKER_SEED);

describe('F4.7 - Edit a slug and proves that the tag have been saved', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should edit a slug and proves that the tag have been saved', () => {
        //WHEN
        const tag_name = faker.lorem.words(2);
        const tag_slug = faker.lorem.words(2);
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.clickNewTagButton()
        TagsPageObjects.fillTagName(tag_name)
        TagsPageObjects.fillTagSlug(tag_slug)
        TagsPageObjects.clickSaveTagButton()

        //THEN
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.tagsNameListed().contains(tag_name)
        TagsPageObjects.tagsShowed().should('have.length', 1)
    })
})