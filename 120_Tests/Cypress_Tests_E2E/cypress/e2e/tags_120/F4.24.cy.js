const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../pageObjects/Tags");
const {faker} = require("@faker-js/faker");

faker.seed(FAKER_SEED);

describe('F4.17 - Create a tag with an invalid tittle for facebook card', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('should not create a tag with an invalid tittle for facebook card', () => {
        //WHEN
        const tag_name = faker.string.alpha({ length: 10})
        const tag_description = faker.string.alpha({ length: 20})
        const title_facebook_card = faker.string.alpha({ length: 100})
        TagsPageObjects.fillANewTagWithMandatoryFields(tag_name, tag_description)
        TagsPageObjects.expandFacebookCard()
        TagsPageObjects.fillTitleFacebookCard(title_facebook_card)
        TagsPageObjects.clickSaveTagButton()

        //THEN
        //ISSUE TO BE REPORTED: The tag is created with the invalid title for facebook card
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.tagsNameListed().contains(tag_name).click()
        TagsPageObjects.expandFacebookCard()
        TagsPageObjects.facebookCardTitle().should('have.value', title_facebook_card)
    })

})
