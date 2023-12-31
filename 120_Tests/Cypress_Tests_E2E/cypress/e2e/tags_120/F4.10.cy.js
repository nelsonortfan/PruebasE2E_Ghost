const { FAKER_SEED } = require("../../support/utils");
const { TagsPageObjects } = require("../../pageObjects/Tags");
const {faker} = require("@faker-js/faker");

faker.seed(FAKER_SEED);

describe('F4.10 - Delete a Tag Successfully', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })

    it('Should delete a Tag Successfully', () => {
        //WHEN
        const tag_name = faker.string.alpha({ length: 10})
        const tag_description = faker.string.alpha({ length: 20})
        TagsPageObjects.fillANewTagWithMandatoryFields(tag_name, tag_description)
        TagsPageObjects.clickSaveTagButton()
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.clickOnATagListed(tag_name)
        TagsPageObjects.clickDeleteTagButton()
        TagsPageObjects.clickConfirmDeleteTagButton()

        //ISSUE TO BE REPORTED: Error in transition to tags page after deleting a tag
        cy.on('uncaught:exception', (err, runnable) => {
            if (err.name === 'TransitionAborted') {
                return false;
            } else {
                TagsPageObjects.clickTagsButton()
            }
        });

        //THEN
        TagsPageObjects.tagsShowed().should('have.length', 0)

    })
})
