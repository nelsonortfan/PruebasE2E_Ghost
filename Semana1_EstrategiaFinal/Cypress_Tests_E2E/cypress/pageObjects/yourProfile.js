 export class YourProfilePage {
    // Elements
    static clickProfileButton() {
        cy.get('.ember-view.ember-basic-dropdown-trigger').click()
    }

    static clickYourProfileButton() {
        cy.get('a[data-test-nav="user-profile"]').click()
    }

    static userSettingsButton() {
        cy.get('span.hidden').contains('User Settings').click({force: true})
    }

    static viewUserActivityButton() {
        cy.get('.dropdown-menu.dropdown-align-right.open.fade-in-scale.open.ember-view').contains('View user activity').click()
    }

    static verifyTagCreatedListedInUserHistory(action) {
        return cy.contains('a', action)
    }

    static verifyActionsListedInUserHistory() {
        return cy.get('.gh-history-description')
    }

}