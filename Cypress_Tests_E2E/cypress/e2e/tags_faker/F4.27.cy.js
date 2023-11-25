const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../support/tags_page_objects");
const {faker} = require("@faker-js/faker");


describe('F4.27 - Create a tag with an invalid formar image for facebook card', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('should create a tag with an invalid format image description for facebook card', () => {
        //WHEN
        const tag_name = faker.lorem.words(2);
        const tag_description = faker.lorem.words(5);
        const image_facebook_card = faker.image.url()
        const image_name = faker.lorem.words(2) + ".png"
        TagsPageObjects.fillANewTagWithMandatoryFields(tag_name, tag_description)
        TagsPageObjects.expandFacebookCard()
        TagsPageObjects.uploadTagImage(image_facebook_card, "image/heic", image_name, false, 1)

        //TH
        TagsPageObjects.imageUploadError().should('be.visible');
        TagsPageObjects.imageUploadError().should('contain', 'The image type you uploaded is not supported. Please use .GIF, .JPG, .JPEG, .PNG, .SVG, .SVGZ, .WEBP');

    })
})