const { faker } = require("@faker-js/faker");
const { TagsPageObjects } = require("../pageObjects/Tags")
const { YourProfilePage } = require("../pageObjects/YourProfile")

describe('make 2 different tags actions and then it should be listed in order', () => {

    beforeEach(() => {
        // Given I login and delete the existing data
        cy.viewport(1000, 660);
        cy.clearAllSessionStorage({log: true})
        cy.clearLocalStorage()
        cy.clearCookies()
        cy.login()
        cy.resetDataForTest()
    })

    it('Should make 2 different tags actions and then it should be listed in order', () => {
        const tag_name = faker.string.alpha({ length: 10})
        const tag_description = faker.string.alpha({ length: 10})
        TagsPageObjects.fillANewTagWithMandatoryFields(tag_name, tag_description, false)
        TagsPageObjects.clickSaveTagButton()
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.tagsNameListed().should('contain', tag_name)

        //then delete the tag
        TagsPageObjects.clickOnATagListed(tag_name)
        TagsPageObjects.clickDeleteTagButton()
        TagsPageObjects.clickConfirmDeleteTagButton()
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.tagsNameListed().should('not.contain', tag_name)

        // go to user profile
        YourProfilePage.clickProfileButton()
        YourProfilePage.clickYourProfileButton()
        YourProfilePage.userSettingsButton()
        YourProfilePage.viewUserActivityButton()

        const actions = ['Tag deleted:', 'Tag added:']
        YourProfilePage.verifyActionsListedInUserHistory().then(
            ($actions) => {
                for (let i = 0; i < actions.length; i++) {
                    expect($actions[i]).to.contain(actions[i])
                }
            }
        )
    })
})



