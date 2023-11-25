const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../pageObjects/Tags");
const {faker} = require("@faker-js/faker");

faker.seed(FAKER_SEED);

describe('F4.14 - Create a tag with a custom Meta Data', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('should create a tag with a custom Meta Data', () => {
        //WHEN
        const tag_name = faker.lorem.words(2);
        const tag_description = faker.lorem.words(10)
        const tag_meta_title = faker.lorem.words(2);
        const tag_meta_description = faker.lorem.words(10)
        TagsPageObjects.fillANewTagWithMandatoryFields(tag_name, tag_description)
        TagsPageObjects.expandMetadata()
        TagsPageObjects.fillMetadataTitle(tag_meta_title)
        TagsPageObjects.clickSaveTagButton()
        TagsPageObjects.clickTagsButton()

        //THEN

        TagsPageObjects.tagsNameListed().contains(tag_name).click()
        TagsPageObjects.expandMetadata()
        TagsPageObjects.metadataTitle().should('have.value', tag_meta_title)

    })

})