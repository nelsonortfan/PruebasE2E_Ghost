const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../pageObjects/Tags");
const {faker} = require("@faker-js/faker");

describe('F4.11 - Upload a valid image successfully', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Upload a valid image successfully', () => {
        //WHEN
        const tag_name = faker.string.alpha({ length: 10})
        const tag_description = faker.string.alpha({ length: 20})
        const tag_image = faker.image.url()
        const tag_image_name = faker.lorem.words(2) + '.png'
        TagsPageObjects.fillANewTagWithMandatoryFields(tag_name, tag_description)
        TagsPageObjects.uploadTagImage(tag_image, 'image/png', tag_image_name)

        //THEN
        TagsPageObjects.imageUploaded().should('have.attr', 'src').and('include', tag_image_name.replace(' ', '-'));
        TagsPageObjects.clickSaveTagButton()
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.tagsNameListed().contains(tag_name)
    })
})
