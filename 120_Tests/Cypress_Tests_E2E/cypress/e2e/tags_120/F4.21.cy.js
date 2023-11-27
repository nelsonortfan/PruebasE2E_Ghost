const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../pageObjects/Tags");
const {faker} = require("@faker-js/faker");

describe('F4.21 - Create a tag with a x card and an invalid image for this card', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Create a tag with a x card and a invalid image for this card', () => {
        //WHEN
        const tag_name = faker.string.alpha({ length: 10})
        const tag_description = faker.string.alpha({ length: 20})
        const title_x_card = faker.lorem.words(2);
        const image_url = faker.image.imageUrl();
        const image_name = faker.lorem.words(2) + '.jpg';
        TagsPageObjects.fillANewTagWithMandatoryFields(tag_name, tag_description)
        TagsPageObjects.expandXCard()
        TagsPageObjects.fillTitleXCard(title_x_card)
        TagsPageObjects.uploadTagImage(image_url, 'image/heic', image_name, false, 1)

        //THEN
        TagsPageObjects.imageUploadError().should('contain', 'The image type you uploaded is not supported. Please use .GIF, .JPG, .JPEG, .PNG, .SVG, .SVGZ, .WEBP');
    })
})