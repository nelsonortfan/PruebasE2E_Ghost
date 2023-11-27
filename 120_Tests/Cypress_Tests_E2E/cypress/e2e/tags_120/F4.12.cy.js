const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../pageObjects/Tags");
const {faker} = require("@faker-js/faker");

faker.seed(FAKER_SEED);

describe('F4.12 - Upload an invalid image and show error', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should upload an invalid image and show error', () => {
        //WHEN
        const tag_name = faker.string.alpha({ length: 10})
        const tag_description = faker.string.alpha({ length: 20})
        const tag_image = faker.image.url()
        const tag_image_name = faker.lorem.words(2) + '.png'
        TagsPageObjects.fillANewTagWithMandatoryFields(tag_name, tag_description)
        TagsPageObjects.uploadTagImage(tag_image, 'image/heic', tag_image_name)

        //THEN
        TagsPageObjects.imageUploaded().should('not.exist');
        TagsPageObjects.imageUploadError().contains('The image type you uploaded is not supported. Please use .GIF, .JPG, .JPEG, .PNG, .SVG, .SVGZ, .WEBP')
    })
})