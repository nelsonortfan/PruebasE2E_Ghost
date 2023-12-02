const { faker } = require("@faker-js/faker");
const { TagsPageObjects } = require("../pageObjects/Tags")
const { YourProfilePage } = require("../pageObjects/YourProfile")
const {ScreenshotHelper} = require("../support/utils");

describe('Create a tag and verify the action is listed in User History', () => {

    beforeEach(() => {
        // Given I login and delete the existing data
        cy.viewport(1000, 660);
        cy.clearAllSessionStorage({log: true})
        cy.clearLocalStorage()
        cy.clearCookies()
        cy.login()
        cy.resetDataForTest()
    })

    it('should create a tag and then verify is listed in user history the action', () => {
        const tag_name = faker.string.alpha({ length: 10})
        const tag_description = faker.string.alpha({ length: 10})
        TagsPageObjects.fillANewTagWithMandatoryFields(tag_name, tag_description, false)
        TagsPageObjects.clickSaveTagButton()
        TagsPageObjects.clickTagsButton()
        // verify the tag is listed
        TagsPageObjects.tagsNameListed().should('contain', tag_name)

        // go to user profile
        YourProfilePage.clickProfileButton()
        YourProfilePage.clickYourProfileButton()
        YourProfilePage.userSettingsButton()
        YourProfilePage.viewUserActivityButton()
        YourProfilePage.verifyTagCreatedListedInUserHistory(tag_name).should('exist')
    });


})