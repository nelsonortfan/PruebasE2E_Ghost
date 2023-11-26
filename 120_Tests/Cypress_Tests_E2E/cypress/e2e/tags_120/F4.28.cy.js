const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../pageObjects/Tags");
const {faker} = require("@faker-js/faker");


describe('F4.28 - Create a tag with a valid format image but incorrect encoding for facebook card', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('should create a tag with a valid format image but incorrect encoding for facebook card', () => {
        //WHEN
        const tag_name = faker.lorem.words(2);
        const tag_description = faker.lorem.words(5);
        const image_facebook_card = faker.image.imageUrl()
        const image_name = faker.lorem.words(2) + ".png"
        TagsPageObjects.fillANewTagWithMandatoryFields(tag_name, tag_description)
        TagsPageObjects.expandFacebookCard()
        TagsPageObjects.uploadTagImage(image_facebook_card, "image/png", image_name, true, 1)

        //THEN
        //ISSUE TO BE REPORTED: Should say "The image type you uploaded is not supported. Please use .GIF, .JPG, .JPEG, .PNG, .SVG, .SVGZ, .WEBP"
        TagsPageObjects.imageUploadError().should('contain', 'Internal server error, cannot upload image.');

    })
})