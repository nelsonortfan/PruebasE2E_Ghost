const { faker } = require("@faker-js/faker");

class settingsPage{
    elements = {
        expandTitleBtn : () => cy.get('button[data-test-toggle-pub-info=""]'),
        exxpandTimezoneBtn : () => cy.get('button[data-test-toggle-timezone]'),
        expandLanguage : () => cy.get('button[data-test-toggle-lang]'),
        titleInput : () => cy.get('input[data-test-title-input=""]'),
        descriptionInput : () => cy.get('input[data-test-description-input]'),
        timezoneSelector : () => cy.get('select[name="general[timezone]"]'),
        timezoneSpan : () => cy.get('span.gh-select'),
        languageInput : () => cy.get('input[data-test-input="locale"]'),
        generalSave : () => cy.get('button[data-test-button="save"]'),
        navegationSave : () => cy.get('button[data-test-save-button]'),
        siteTitle : () => cy.get('div.gh-nav-menu-details-sitetitle'),
        alertBanner : () => cy.get('div.gh-alert-content'),
        pResponse : () => cy.get('p[class="response"]'),
        loginFailure : () => cy.get('span[data-test-task-button-state="failure"]'),
        NavegationLabelField : () => cy.get('input[data-test-input="label"]'),
        navigationUrlField : () => cy.get('input[data-test-input="url"]'),
        navigationMainBlock : () => cy.get('div.gh-main-section-block'),
        navigationMainContent : () => cy.get('div.gh-main-section-content'),
        navigationAddBtn : () => cy.get('button.gh-blognav-add'),
        navigationDelBtn : () => cy.get('button.gh-blognav-delete'),
        navigationDelBtnClass : () => 'button.gh-blognav-delete',
        articleTitle : () => cy.get('h1.gh-article-title'),
        moreLabelToggle : () => cy.get('button.gh-more-toggle')
    }

    changeTitle(title){
        this.elements.expandTitleBtn().click();
        cy.wait(200);
        this.elements.titleInput().clear().type(title);
        cy.wait(100);
        this.elements.generalSave().click();
        cy.wait(500);
    }
    changeDescription(description){
        this.elements.expandTitleBtn().click();
        cy.wait(200);
        this.elements.descriptionInput().clear().type(description);
        cy.wait(100);
        this.elements.generalSave().click();
        cy.wait(500);
    }
    emptyTitle(){
        this.elements.expandTitleBtn().click();
        cy.wait(200);
        this.elements.titleInput().clear();
        cy.wait(100);
        this.elements.generalSave().click();
        cy.wait(500);
    }
    changeTimezone(timezone){
        this.elements.exxpandTimezoneBtn().click();
        cy.wait(200);
        this.elements.timezoneSelector().select(timezone);
        this.elements.generalSave().click();
        cy.wait(500);
    }
    changeLanguage(language){
        this.elements.expandLanguage().click();
        this.elements.languageInput().clear().type(language);
        cy.wait(200);
        this.elements.generalSave().click();
        cy.wait(500);
    }
    emptyLanguage(){
        this.elements.expandLanguage().click();
        this.elements.languageInput().clear();
        cy.wait(200);
        this.elements.generalSave().click();
        cy.wait(500);
    }
    changeNavPrimField(label, pos){
        this.elements.navigationMainBlock().eq(0).within(() =>{
            this.elements.NavegationLabelField().eq(pos).clear().type(label);
        })
        this.elements.navegationSave().click();
    }
    newNavPrimField(label, url){
        this.elements.navigationMainBlock().eq(0).within(() =>{
            this.elements.NavegationLabelField().eq(-1).clear().type(label);
            this.elements.navigationUrlField().eq(-1).type(url);
            this.elements.navigationAddBtn().eq(-1).click();
        })
        this.elements.navegationSave().click();
    }
    deleteAllNavLabels(block){
        this.elements.navigationMainBlock().eq(block).within(() =>{
            this.elements.navigationMainContent().then(($content) =>{
                if($content.find(this.elements.navigationDelBtnClass()).length){
                    this.elements.navigationMainContent()
                    .find(this.elements.navigationDelBtnClass())
                    .then(($blk) =>{
                        cy.log($blk.length)
                        if($blk.length > 0){
                            for(let i = 0; i < $blk.length; i++){
                                this.elements.navigationDelBtn().eq(-1).click();
                            }
                        }
                    })
                }
            })                     
        })
        this.elements.navegationSave().click();
    }
}
module.exports = new settingsPage();