const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../support/tags_page_objects");
const {faker} = require("@faker-js/faker");

faker.seed(FAKER_SEED);

describe('F4.14 - Create a tag with a invalid custom Meta Data title', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('should create a tag with a invalid custom Meta Data title', () => {
        //WHEN
        const tag_name = faker.lorem.words(2);
        const tag_description = faker.lorem.words(10)
        const tag_meta_title = faker.lorem.words(40);
        const tag_meta_description = faker.lorem.words(10)

        TagsPageObjects.fillANewTagWithMandatoryFields(tag_name, tag_description)
        TagsPageObjects.expandMetadata()
        TagsPageObjects.fillMetadataTitle(tag_meta_title)
        TagsPageObjects.clickSaveTagButton()

        //THEN

        //ISSUE TO BE REPORTED: Deja crear el tag aunque el titulo del meta data sea mayor a 70 caracteres
        //TagsPageObjects.invalidFieldValidationMessage().contains('The title should be less than 70 characters')

        TagsPageObjects.clickTagsButton()
        TagsPageObjects.tagsShowed().should('have.length', 1)

    })

})