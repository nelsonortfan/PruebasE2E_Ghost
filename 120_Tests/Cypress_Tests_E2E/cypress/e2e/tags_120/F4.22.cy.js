const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../pageObjects/Tags");
const {faker} = require("@faker-js/faker");

describe('F4.22 - Create a tag with a x card and an invalid format image for this card', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Create a tag with a x card and a invalid format image for this card', () => {
        //WHEN
        const tag_name = faker.lorem.words(2);
        const tag_description = faker.lorem.words(10)
        const title_x_card = faker.lorem.words(2);
        const image_url = faker.image.url()
        const image_name = faker.lorem.words(2) + '.jpeg';
        TagsPageObjects.fillANewTagWithMandatoryFields(tag_name, tag_description)
        TagsPageObjects.expandXCard()
        TagsPageObjects.fillTitleXCard(title_x_card)
        TagsPageObjects.uploadTagImage(image_url, 'image/jpeg', image_name, true, 1)

        //THEN
        //ISSUE TO BE REPORTED: Should say "The image type you uploaded is not supported. Please use .GIF, .JPG, .JPEG, .PNG, .SVG, .SVGZ, .WEBP"
        TagsPageObjects.imageUploadError().should('contain', 'Internal server error, cannot upload image.');

    })
})