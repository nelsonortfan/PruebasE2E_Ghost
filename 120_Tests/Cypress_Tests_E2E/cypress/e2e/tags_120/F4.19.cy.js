const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../pageObjects/Tags");
const {faker} = require("@faker-js/faker");

faker.seed(FAKER_SEED);

describe('F4.19 - Create a tag with an invalid custom x card description', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('should create a tag with an invalid x card description', () => {
        //WHEN
        const tag_name = faker.lorem.words(2);
        const tag_description = faker.lorem.words(10)
        const description_x_card = faker.lorem.words(20);
        TagsPageObjects.fillANewTagWithMandatoryFields(tag_name, tag_description)
        TagsPageObjects.expandXCard()
        TagsPageObjects.fillDescriptionXCard(description_x_card)
        TagsPageObjects.clickSaveTagButton()

        //THEN
        //ISSUE TO BE REPORTED: The tag is created with the invalid x card description
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.tagsNameListed().contains(tag_name).click()
        TagsPageObjects.expandXCard()
        TagsPageObjects.xCardDescription().should('have.value', description_x_card)
    })
})