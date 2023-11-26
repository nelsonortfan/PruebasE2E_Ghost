const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../pageObjects/Tags");
const {faker} = require("@faker-js/faker");

faker.seed(FAKER_SEED);

describe('F4.17 - Create a tag with a custom facebook card successfully', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('should  Create a tag with a custom facebook card successfully', () => {
        //WHEN
        const tag_name = faker.lorem.words(2);
        const title_facebook_card = faker.lorem.words(2);
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.clickNewTagButton()
        TagsPageObjects.fillTagName(tag_name)
        TagsPageObjects.expandFacebookCard()
        TagsPageObjects.fillTitleFacebookCard(title_facebook_card)
        TagsPageObjects.clickSaveTagButton()
        TagsPageObjects.clickTagsButton()

        //THEN
        TagsPageObjects.tagsNameListed().contains(tag_name).click()
        TagsPageObjects.expandFacebookCard()
        TagsPageObjects.facebookCardTitle().should('have.value', title_facebook_card)
    })
    })
