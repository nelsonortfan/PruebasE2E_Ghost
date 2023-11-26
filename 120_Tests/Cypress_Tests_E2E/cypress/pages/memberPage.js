const { faker } = require("@faker-js/faker");

class memberPage{
    elements = {
        newMemberBtn : () => cy.get('a[data-test-new-member-button="true"]'),
        memberNameField : () => cy.get('input[data-test-input="member-name"]'),
        memberEmailField : () => cy.get('input[data-test-input="member-email"]'),
        memberLabelField : () => cy.get('input[class="ember-power-select-trigger-multiple-input"]'),
        memberNoteField : () => cy.get('textarea[data-test-input="member-note"]'),
        memberSaveBtn : () => cy.get('button[data-test-button="save"]'),
        memberSavedBtn : () => 'gh-btn gh-btn-primary gh-btn-icon gh-btn-green ember-view',
        memberNameList : () => cy.get('h3.gh-members-list-name'),
        memberEmailList : () => cy.get('p.gh-members-list-email'),
        membersActionsBtn : () => cy.get('button[data-test-button="members-actions"]'),
        importBtn : () => cy.get('a[data-test-link="import-csv"]'),
        importFileInput : () => cy.get('.x-file-input'),
        importFileInput2 : () => cy.get('.x-file--input'),
        performeImportBtn : () => cy.get('button[data-test-button="perform-import"]'),
        closeImportBtn : () => cy.get('button[data-test-button="close-import-members"]'),
        membersSearchField : () => cy.get('.gh-members-list-searchfield'),
        memberFilterBtn : () => cy.get('div[data-test-button="members-filter-actions"]'),
        selectMemberFilter : () => cy.get('select[data-test-select="members-filter"]'),
        selectMemberFilterOp : () => cy.get('select[data-test-select="members-filter-operator"]'),
        memberFilterValue : () => cy.get('input[data-test-input="members-filter-value"]'),
        applyFilterBtn : () => cy.get('button[data-test-button="members-apply-filter"]'),
        memberActionsBtn : () => cy.get('button[data-test-button="member-actions"]'),
        impersonateMemberBtn : () => cy.get('button[data-test-button="impersonate"]'),
        copyImpersonateLinkBtn : () => cy.get('button[data-test-button="copy-impersonate-link"]'),
        deleteMemberBtn : () => cy.get('button[data-test-button="delete-member"]'),
        deleteConfirmBtn : () => cy.get('button[data-test-button="confirm"]'),
        body : () => cy.get("body"),
        memberSelector : () => ".gh-list-data",
        addYourselfBtn : () => cy.get('button[data-test-button="add-yourself"]'),
        addFilterBtn : () => cy.get('button[data-test-button="add-members-filter"]'),
        resetFiltersBtn : () => cy.get('button[data-test-button="reset-members-filter"]'),
        showAllMembersBtn : () => cy.get('a[data-test-button="show-all-members"]'),
        pResponse : () => cy.get('p[class="response"]'),
        newMemberLeaveBtn : () => cy.get('button[data-test-leave-button]'),
        membersBackBtn : () => cy.get('a[data-test-link="members-back"]'),
        addLabelOpt : () => cy.get('li[data-option-index="0"]'),
        userOptions : () => cy.get ('div[class="gh-user-avatar relative"]'),
        userName : () => cy.get('h4[class="gh-user-name"]'),
        userEmail : () => cy.get('span[class="gh-user-email"]'),
        memberCount : () => cy.get('span[class="gh-nav-member-count"]'),
        memberActivityEvent : () => ".gh-members-activity-event-text",
        newsletterSwitch : () => cy.get('div[class="for-switch "]'),
        memberActivity : () => ".gh-list-data",
        memberInitials : () => cy.get('div.gh-member-initials')
    }
    createNewMember (name, email){
        this.elements.newMemberBtn().click();
        cy.wait(500);
        this.elements.memberNameField().clear();
        this.elements.memberNameField().type(name);
        this.elements.memberEmailField().clear();
        this.elements.memberEmailField().type(email);
        this.elements.memberSaveBtn().click();
        cy.wait(200)
        this.elements.memberSaveBtn().then(($btn) =>{
            if($btn.hasClass(this.elements.memberSavedBtn())){
                cy.wait(500);
                cy.goToPage("members");
                cy.wait(500);
            }
        })
    }
    createNewMemberFail (name, email){
        this.elements.newMemberBtn().click();
        cy.wait(500);
        this.elements.memberNameField().clear();
        this.elements.memberNameField().type(name);
        this.elements.memberEmailField().clear();
        this.elements.memberEmailField().type(email);
        this.elements.memberSaveBtn().click();
        cy.wait(500)
    }
    createNewMemberLabel (name, email, label){
        this.elements.newMemberBtn().click();
        cy.wait(500);
        this.elements.memberNameField().clear();
        this.elements.memberNameField().type(name);
        this.elements.memberEmailField().clear();
        this.elements.memberEmailField().type(email);
        this.elements.memberLabelField().clear();
        this.elements.memberLabelField().type(label);
        this.elements.addLabelOpt().click();
        this.elements.memberSaveBtn().click();
        cy.wait(200)
        this.elements.memberSaveBtn().then(($btn) =>{
            if($btn.hasClass(this.elements.memberSavedBtn())){
                cy.wait(500);
                cy.goToPage("members");
                cy.wait(500);
            }
        })
    }
    createNewMemberNote (name, email, note){
        this.elements.newMemberBtn().click();
        cy.wait(500);
        this.elements.memberNameField().clear();
        this.elements.memberNameField().type(name);
        this.elements.memberEmailField().clear();
        this.elements.memberEmailField().type(email);
        this.elements.memberNoteField().clear().type(note);
        this.elements.memberSaveBtn().click();
        cy.wait(200)
        this.elements.memberSaveBtn().then(($btn) =>{
            if($btn.hasClass(this.elements.memberSavedBtn())){
                cy.wait(500);
                cy.goToPage("members");
                cy.wait(500);
            }
        })
    }
    createNewMemberNoNewsletter (name, email){
        this.elements.newMemberBtn().click();
        cy.wait(500);
        this.elements.memberNameField().clear();
        this.elements.memberNameField().type(name);
        this.elements.memberEmailField().clear();
        this.elements.memberEmailField().type(email);
        this.elements.newsletterSwitch().click();
        this.elements.memberSaveBtn().click();
        cy.wait(200)
        this.elements.memberSaveBtn().then(($btn) =>{
            if($btn.hasClass(this.elements.memberSavedBtn())){
                cy.wait(500);
                cy.goToPage("members");
                cy.wait(500);
            }
        })
    }
    assertMemberName (name, pos){
        this.elements.memberNameList().then(($header)=>{
            expect($header[pos].innerText).to.equal(name)
        });
    }
    assertMemberEmail (email, pos){
        this.elements.memberEmailList().then(($header)=>{
            expect($header[pos].innerText).to.equal(email)
        });
    }
    assertNotMemberEmail (email){
        this.elements.body().then(($body) => {
            for (let i = 0; i < $body.find(this.elements.memberSelector()).length / 5; i++) {
                this.elements.memberEmailList().then(($header)=>{
                    expect($header[i].innerText).to.not.equal(email)
                });
            }
            if ($body.find(this.elements.memberSelector()).length / 5 == 0){
                expect($body.find(this.elements.memberSelector()).length / 5).to.equal(0)
            }
        })
    }
    importMembers(file){
        this.elements.membersActionsBtn().click();
        this.elements.importBtn().click();
        cy.wait(100);
        this.elements.importFileInput().first().within(() => {
            this.elements.importFileInput2().selectFile(file, { force: true })
        });
        cy.wait(500);
        this.elements.performeImportBtn().click();
        cy.wait(1000);
        this.elements.closeImportBtn().click();
        cy.wait(100);
    }
    searchMember(name){
        this.elements.membersSearchField().clear();
        this.elements.membersSearchField().type(name);
        cy.wait(300);
    }
    filterMember(selectOption, value, operator){
        this.elements.memberFilterBtn().click();
        this.elements.selectMemberFilter().select(selectOption);
        this.elements.selectMemberFilterOp().select(operator);
        if(selectOption == 2){
            this.elements.memberLabelField().clear();
            this.elements.memberLabelField().type(value);
            this.elements.addLabelOpt().click();
            this.elements.memberFilterBtn().click();
        }else{
            this.elements.memberFilterValue().clear();
            this.elements.memberFilterValue().type(value);
            this.elements.applyFilterBtn().click();
        }
        cy.wait(500);
    }
    filterMember2(selectOption, value, operator, selectOption2, value2, operator2){
        this.elements.memberFilterBtn().click();
        this.elements.selectMemberFilter().select(selectOption);
        this.elements.selectMemberFilterOp().select(operator);
        this.elements.memberFilterValue().clear();
        this.elements.memberFilterValue().type(value);
        this.elements.addFilterBtn().click();
        this.elements.selectMemberFilter().eq(1).select(selectOption2)
        this.elements.selectMemberFilterOp().eq(1).select(operator2);
        this.elements.memberFilterValue().eq(1).clear();
        this.elements.memberFilterValue().eq(1).type(value2);
        this.elements.applyFilterBtn().click();
        cy.wait(500);
    }
    resetFilter(){
        this.elements.memberFilterBtn().click();
        this.elements.resetFiltersBtn().click();
    }
    deleteMember(email){
        this.elements.memberEmailList().contains(email).click();
        cy.wait(300);
        this.elements.memberActionsBtn().click();
        this.elements.deleteMemberBtn().click();
        this.elements.deleteConfirmBtn().click();
        cy.wait(300);
    }
    addMemberInfo(name, email){
        this.elements.newMemberBtn().click();
        cy.wait(500);
        this.elements.memberNameField().clear();
        this.elements.memberNameField().type(name);
        this.elements.memberEmailField().clear();
        this.elements.memberEmailField().type(email);        
    }
    lookForActivityNot(activity, message){
        cy.get("body").then(($body) => {
            // synchronously query for element
            for (let i = 0; i < $body.find(this.elements.memberActivity()).length/3; i++) {
            cy.log($body.find(this.elements.memberActivity()).length/3);
            cy.get(activity).then(($header) => {
                expect($header[i].innerText).to.not.equal(message);
            });
            }
            if ($body.find(this.elements.memberActivity()).length / 3 == 0) {
            cy.log("No members created");
            }
        });
    }
    lookForActivityEqual(activity, message){
        cy.get("body").then(($body) => {
            // synchronously query for element
            for (let i = 0; i < 1; i++) {
            cy.log($body.find(this.elements.memberActivity()).length/3);
            cy.get(activity).then(($header) => {
                expect($header[i].innerText).to.equal(message);
            });
            }
            if ($body.find(this.elements.memberActivity()).length / 3 == 0) {
            cy.log("No members created");
            }
        });
    }
}
module.exports = new memberPage();