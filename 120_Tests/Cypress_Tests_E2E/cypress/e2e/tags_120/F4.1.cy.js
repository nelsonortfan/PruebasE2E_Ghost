const { TagsPageObjects } = require("../../pageObjects/Tags");
import MOCK_TAGS_DATA from '../../fixtures/MOCK_TAGS_DATA.json'


describe('F4.1 - Create new tag with title', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
    })


    MOCK_TAGS_DATA.forEach((tag) => {
        it(`${tag.description}`, () => {
            //WHEN
            TagsPageObjects.clickTagsButton()
            TagsPageObjects.clickNewTagButton()
            TagsPageObjects.fillTagName(tag.title)
            TagsPageObjects.clickSaveTagButton()
            TagsPageObjects.clickTagsButton()

            //THEN
            TagsPageObjects.tagsShowed().should('have.length', 1)
            TagsPageObjects.tagsNameListed().children().should('contain', tag.title)
        })
    })

})
