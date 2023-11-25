const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../support/tags_page_objects");
const {faker} = require("@faker-js/faker");


describe('F4.26 - Create a tag with an image for facebook card', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('should create a tag with an image description for facebook card', () => {
        //WHEN
        const tag_name = faker.lorem.words(2);
        const tag_description = faker.lorem.words(5);
        const image_facebook_card = faker.image.url()
        const image_name = faker.lorem.words(2) + ".png"
        TagsPageObjects.fillANewTagWithMandatoryFields(tag_name, tag_description)
        TagsPageObjects.expandFacebookCard()
        TagsPageObjects.uploadTagImage(image_facebook_card, "image/png", image_name, false, 1)
        TagsPageObjects.clickSaveTagButton()

        //THEN
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.tagsNameListed().contains(tag_name).click()
        TagsPageObjects.expandFacebookCard()
        TagsPageObjects.imageUploaded().should('have.attr', 'src').and('include', image_name.replace(' ', '-'));


    })
})