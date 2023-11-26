const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../pageObjects/Tags");
const {faker} = require("@faker-js/faker");

faker.seed(FAKER_SEED);

describe('F4.8 - Create a tag and assign a different color', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should create a tag and assign a different color', () => {
        //WHEN
        const tag_name = faker.lorem.words(2);
        const tag_color = faker.internet.color().replace('#', '');
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.clickNewTagButton()
        TagsPageObjects.fillTagName(tag_name)
        TagsPageObjects.fillTagColor(tag_color)
        TagsPageObjects.clickSaveTagButton()
        TagsPageObjects.clickTagsButton()

        //THEN
        TagsPageObjects.tagsNameListed().contains(tag_name)
        TagsPageObjects.tagsShowed().should('have.length', 1)
    })
})
