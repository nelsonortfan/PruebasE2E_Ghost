const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../pageObjects/Tags");
const {faker} = require("@faker-js/faker");

faker.seed(FAKER_SEED);

describe('F4.18 - Create a tag with an invalid custom x card title', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('should create a tag with an invalid x card title', () => {
        //WHEN
        const tag_name = faker.string.alpha({ length: 10})
        const tag_description = faker.string.alpha({ length: 20})
        const title_x_card = faker.string.alpha({ length: 100})
        TagsPageObjects.fillANewTagWithMandatoryFields(tag_name, tag_description)
        TagsPageObjects.expandXCard()
        TagsPageObjects.fillTitleXCard(title_x_card)
        TagsPageObjects.clickSaveTagButton()

        //THEN
        //ISSUE TO BE REPORTED: The tag is created with the invalid x card title
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.tagsNameListed().contains(tag_name).click()
        TagsPageObjects.expandXCard()
        TagsPageObjects.xCardTitle().should('have.value', title_x_card)


    })

})