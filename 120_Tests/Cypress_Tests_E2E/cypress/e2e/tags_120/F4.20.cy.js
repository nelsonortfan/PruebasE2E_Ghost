const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../pageObjects/Tags");
const {faker} = require("@faker-js/faker");

describe('F4.20 - Create a tag with a x card and a valid image for this card', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Create a tag with a x card and a valid image for this card', () => {
        //WHEN
        const tag_name = faker.string.alpha({ length: 10})
        const tag_description = faker.string.alpha({ length: 20})
        const title_x_card = faker.lorem.words(2);
        const image_url = faker.image.url();
        const image_name = faker.lorem.words(2) + '.jpg';
        TagsPageObjects.fillANewTagWithMandatoryFields(tag_name, tag_description)
        TagsPageObjects.expandXCard()
        TagsPageObjects.fillTitleXCard(title_x_card)
        TagsPageObjects.uploadTagImage(image_url, 'image/jpeg', image_name, false, 1)
        TagsPageObjects.clickSaveTagButton()

        //THEN
        TagsPageObjects.imageUploaded().should('have.attr', 'src').and('include', image_name.replace(' ', '-'));
        TagsPageObjects.clickSaveTagButton()
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.tagsNameListed().contains(tag_name)
    })

})
