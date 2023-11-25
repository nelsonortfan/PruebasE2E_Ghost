const {TagsPageObjects} = require("../../pageObjects/Tags");

let tags;

describe('F4.5 - Create a valid description then should be showed', () => {
    beforeEach(() => {
        //GIVEN
        cy.viewport(1000, 660);
        cy.login()
        cy.resetDataForTest()
        cy.request('https://api.mockaroo.com/api/6f44e970?count=10&key=ff209cc0').then((response) => {
            // Use the response body
            tags = response.body;
        })
    })

    it(`Should create a valid description then should be showed`, () => {
        let numberOfTags = 0;
        tags.forEach(tag => {
                //WHEN
                TagsPageObjects.clickTagsButton()
                TagsPageObjects.clickNewTagButton()
                TagsPageObjects.fillTagName(tag.tag_title)
                TagsPageObjects.fillTagDescription(tag.tag_description)
                TagsPageObjects.clickSaveTagButton()
                TagsPageObjects.clickTagsButton()

                numberOfTags++

                //THEN
                TagsPageObjects.tagsNameListed().contains(tag.tag_title)
                TagsPageObjects.tagsDescriptionInListedTags().contains(tag.tag_description)
                TagsPageObjects.tagsShowed().should('have.length', numberOfTags)
            });
        });
})
