const { faker } = require("@faker-js/faker");

class settingsPage{
    elements = {
        expandTitleBtn : () => cy.get('button[data-test-toggle-pub-info=""]'),
        titleInput : () => cy.get('input[data-test-title-input=""]'),
        generalSave : () => cy.get('button[data-test-button="save"]'),
        siteTitle : () => cy.get('div.gh-nav-menu-details-sitetitle')
    }

    changeTitle(title){
        this.elements.expandTitleBtn().click();
        cy.wait(200);
        this.elements.titleInput().clear().type(title);
        cy.wait(100);
        this.elements.generalSave().click();
        cy.wait(500);
    }
}
module.exports = new settingsPage();