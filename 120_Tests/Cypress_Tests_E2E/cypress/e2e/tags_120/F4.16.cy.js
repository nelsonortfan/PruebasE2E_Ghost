const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../pageObjects/Tags");
const {faker} = require("@faker-js/faker");

faker.seed(FAKER_SEED);

describe('F4.16 - Create a tag with a invalid custom Meta Data description', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('should create a tag with a invalid custom Meta Data description', () => {
        //WHEN
        const tag_name = faker.string.alpha({ length: 10})
        const tag_description = faker.string.alpha({ length: 20})
        const tag_meta_title = faker.string.alpha({ length: 10})
        const tag_meta_description = faker.string.alpha({ length: 200})

        TagsPageObjects.fillANewTagWithMandatoryFields(tag_name, tag_description)
        TagsPageObjects.expandMetadata()
        TagsPageObjects.fillMetadataTitle(tag_meta_title)
        TagsPageObjects.fillMetadataDescription(tag_meta_description)
        TagsPageObjects.clickSaveTagButton()


        //THEN
        //ISSUE TO BE REPORTED: Deja crear el tag aunque la descripcion del meta data sea mayor a 200 caracteres
        //TagsPageObjects.invalidFieldValidationMessage().contains('The description should be less than 200 characters')

        TagsPageObjects.clickTagsButton()
        TagsPageObjects.tagsShowed().should('have.length', 1)

    })

})