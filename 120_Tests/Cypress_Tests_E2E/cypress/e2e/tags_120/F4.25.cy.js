const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../pageObjects/Tags");
const {faker} = require("@faker-js/faker");

faker.seed(FAKER_SEED);

describe('F4.25 - Create a tag with an invalid description for facebook card', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('should not create a tag with an invalid description for facebook card', () => {
        //WHEN
        const tag_name = faker.lorem.words(2);
        const tag_description = faker.lorem.words(5);
        const description_facebook_card = faker.lorem.words(20);
        TagsPageObjects.fillANewTagWithMandatoryFields(tag_name, tag_description)
        TagsPageObjects.expandFacebookCard()
        TagsPageObjects.fillDescriptionFacebookCard(description_facebook_card)
        TagsPageObjects.clickSaveTagButton()

        //THEN
        //ISSUE TO BE REPORTED: The tag is created with the invalid description for facebook card
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.tagsNameListed().contains(tag_name).click()
        TagsPageObjects.expandFacebookCard()
        TagsPageObjects.facebookCardDescription().should('have.value', description_facebook_card)
    })

})