// #--------------TAGS PAGE OBJECTS OBJECTS--------------#
import 'cypress-file-upload';

class TagsPageObjects {

    static clickTagsButton() {
        cy.contains('Tags').click()
        cy.wait(100)
    }

    static clickNewTagButton() {
        cy.contains('New tag').click()
        cy.wait(100)
    }

    static fillTagName(tagName){
        cy.get("#tag-name").type(tagName)
        cy.wait(100)
    }

    static fillTagSlug(tagSlug) {
        cy.get("#tag-slug").type(tagSlug)
        cy.wait(100)
    }

    static fillTagDescription(tagDescription) {
        cy.get("#tag-description").type(tagDescription)
        cy.wait(100)
    }

    static uploadTagImage(imageUrl, mimeType, fileName, withError = false, childElement = 0) {
        cy.request({url: imageUrl, encoding: 'base64'}).then((response) => {
            if (withError) {
                return Cypress.Blob.base64StringToBlob(response.body, mimeType) + "invalid"
            }
            return Cypress.Blob.base64StringToBlob(response.body, mimeType);
        }).then((blob) => {
            const file = new File([blob], fileName, { type: mimeType });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            cy.get('input[type="file"]').eq(childElement).trigger('drop', { dataTransfer, force: true });

        });
        cy.wait(100);
    }

    static imageUploadError() {
       return cy.get('div.failed')
    }

    static clickSaveTagButton() {
        cy.get('button[data-test-button="save"]').click()
        cy.wait(100)
    }

    static clickDeleteTagButton() {
        cy.get('button.gh-btn.gh-btn-red.gh-btn-icon[data-test-button="delete-tag"]').click()
        cy.wait(100)
    }

    static clickConfirmDeleteTagButton() {
        cy.get('button.gh-btn.gh-btn-red.gh-btn-icon.ember-view').click()
    }

    static clickInternalFilters() {
        cy.get('button.gh-btn[data-test-tags-nav="internal"]').click()
        cy.wait(100)
    }

    static clickPublicFilters() {
        cy.get('button.gh-btn.gh-btn-group-selected[data-test-tags-nav="public"]').click()
        cy.wait(100)
    }

    static expandMetadata() {
        cy.get('body > div.gh-app > div > main > section > form > section > div:nth-child(1) > div.gh-expandable-header > button').click()
        cy.wait(100)
    }

    static confirmLeavePage() {
        cy.contains("Leave").click()
        cy.wait(100)
    }

    static confirmDeleteTag() {
        cy.get('button[data-test-button="confirm"]').click()
        cy.wait(100)
    }

    static clickOnATagListed(tagName) {
        cy.contains(tagName).click()
        cy.wait(100)
    }

   static fillTagColor(tagColor) {
        cy.get('input[placeholder="15171A"]').type(tagColor)
        cy.wait(100)
    }

    static fillANewTagWithMandatoryFields(tagName, tagDescription, internalTag = false) {
        if (internalTag === true) {
            tagName = "#" + tagName
        }
        TagsPageObjects.clickTagsButton()
        TagsPageObjects.clickNewTagButton()
        TagsPageObjects.fillTagName(tagName)
        TagsPageObjects.fillTagDescription(tagDescription)
    }

    static fillMetadataTitle(metadataTitle) {
        cy.get('input[name=metaTitle]').type(metadataTitle)
        cy.wait(100)
    }

    static fillMetadataDescription(metadataDescription) {
        cy.get('textarea[name=metaDescription]').type(metadataDescription)
        cy.wait(100)
    }

    static fillTitleXCard(titleXCard) {
        cy.get('input[name=twitterTitle]').type(titleXCard)
        cy.wait(100)
    }

    static expandXCard() {
        cy.get('body > div.gh-app > div > main > section > form > section > div:nth-child(2) > div.gh-expandable-header > button').click()
        cy.wait(100)
    }

    static fillDescriptionXCard(description_x_card) {
        cy.get('textarea[name=twitterDescription]').type(description_x_card)
        cy.wait(100)
    }

    static expandFacebookCard() {
        cy.get('body > div.gh-app > div > main > section > form > section > div:nth-child(3) > div.gh-expandable-header > button').click()
        cy.wait(100)
    }

    static fillTitleFacebookCard(title_facebook_card) {
        cy.get('input[name=ogTitle]').type(title_facebook_card)
        cy.wait(100)
    }

    static fillDescriptionFacebookCard(description_facebook_card) {
        cy.get('textarea[name=ogDescription]').type(description_facebook_card)
        cy.wait(100)
    }

    // #--------------VERIFICATIONS--------------#

    static tagsShowed(){
        return cy.get(".gh-tag-list-name")
    }

    static tagsNameListed(){
        return cy.get('ol.gh-list')
    }

    static invalidFieldValidationMessage(){
        return cy.get('p.response')
    }

    static tagsDescriptionInListedTags() {
        return cy.get('ol.gh-list')
    }

    static invalidSlugErrorMessage(){
        return cy.get('p.response')
    }

    static imageUploaded(){
        return cy.get('img')
    }

    static metadataTitle(){
        return cy.get('input[name=metaTitle]')
    }

    static xCardTitle(){
        return cy.get('input[name=twitterTitle]')
    }

    static xCardDescription() {
        return cy.get('textarea[name=twitterDescription]')
    }

    static facebookCardTitle() {
        return cy.get('input[name=ogTitle]')
    }

    static facebookCardDescription() {
        return cy.get('textarea[name=ogDescription]')
    }

    static greenButtonCreateTag() {
        return cy.contains("Create a new tag")
    }

}

export {TagsPageObjects}
