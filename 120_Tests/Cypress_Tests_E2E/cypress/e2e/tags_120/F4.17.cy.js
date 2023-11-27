const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../pageObjects/Tags");
const {faker} = require("@faker-js/faker");

faker.seed(FAKER_SEED);

describe('F4.17 - Create a tag with a custom x card successfully', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('should  Create a tag with a custom x card successfully', () => {
        //WHEN
        const tag_name = faker.string.alpha({ length: 10})
        const tag_description = faker.string.alpha({ length: 20})
        const title_x_card = faker.string.alpha({ length: 10})
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.clickNewTagButton()
        TagsPageObjects.fillTagName(tag_name)
        TagsPageObjects.expandXCard()
        TagsPageObjects.fillTitleXCard(title_x_card)
        TagsPageObjects.clickSaveTagButton()
        TagsPageObjects.clickTagsButton()

        //THEN
        TagsPageObjects.tagsNameListed().contains(tag_name).click()
        TagsPageObjects.expandXCard()
        TagsPageObjects.xCardTitle().should('have.value', title_x_card)
    })

})
