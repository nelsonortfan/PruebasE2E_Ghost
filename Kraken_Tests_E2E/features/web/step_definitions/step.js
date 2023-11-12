const { Given, When, Then } = require('@cucumber/cucumber');

When('I enter email {kraken-string}', async function (email) {
    let element = await this.driver.$('input[name="identification"]');
    return await element.setValue(email);
});


When('I enter password {kraken-string}', async function (password) {
    let element = await this.driver.$('input[name="password"]');
    return await element.setValue(password);
});

When('I click on sing in button', async function () {
    let element = await this.driver.$('button[data-test-button="sign-in"]');
    return await element.click();
});

When('I click on tags button', async function () {
    let element = await this.driver.$('a[href="#/tags/"]');
    return await element.click();
});

When('I click on new tag button', async function () {
    let element = await this.driver.$('a[href="#/tags/new/"]');
    return await element.click();
});

When('I fill the tag name {string}', async function (tagName) {
    let element = await this.driver.$('#tag-name');
    return await element.setValue(tagName);
});

When('I fill the tag description {string}', async function (tagDescription) {
    let element = await this.driver.$('#tag-description');
    return await element.setValue(tagDescription);
});

When('I click save tag button', async function () {
    let element = await this.driver.$('button[data-test-button="save"]');
    return await element.click();
});

When('I click on tag with name {string}', async function (tagName) {
    let element = await this.driver.$(`a[title="Edit tag"][href="#/tags/${tagName}/"]`);
    return await element.click();
});

When('I click on delete tag button', async function () {
    let element = await this.driver.$('button.gh-btn.gh-btn-red.gh-btn-icon[data-test-button="delete-tag"]');
    return await element.click();
});

When('I click on confirm delete tag button', async function () {
    let element = await this.driver.$('button[data-test-button="confirm"].gh-btn.gh-btn-red.gh-btn-icon.ember-view');
    return await element.click();
});

When('I click on public tags button', async function () {
    let element = await this.driver.$('button.gh-btn.gh-btn-group-selected[data-test-tags-nav="public"]');
    return await element.click();
});

When('I click on internal tags button', async function () {
    let element = await this.driver.$('button.gh-btn[data-test-tags-nav="internal"]');
    return await element.click();
});

When('I fill description with more than 500 elements', async function () {
    let textToType = 'a'.repeat(501);
    let element = await this.driver.$('#tag-description');
    return await element.setValue(textToType);
});

When('I click on settings button', async function () {
    let element = await this.driver.$('a[href="#/settings/"]');
    return await element.click();
});

When('I click on labs button', async function () {
    let element = await this.driver.$('a[href="#/settings/labs/"]');
    return await element.click();
});

When('I click on delete database button', async function (){
    let element = await this.driver.$('button.gh-btn.gh-btn-red[data-test-button="delete-all"]');
    return await element.click();
});

When('I click on confirm delete database button', async function () {
    let element = await this.driver.$('button[data-test-button="confirm"].gh-btn.gh-btn-red.gh-btn-icon.ember-view');
    return await element.click();
});

When('I reset preexisting data', async function () {
    this.driver.url('http://localhost:2368/ghost/#/settings/labs/');
    this.driver.$('button.gh-btn.gh-btn-red[data-test-button="delete-all"]').click();
    this.driver.$('button[data-test-button="confirm"].gh-btn.gh-btn-red.gh-btn-icon.ember-view').click();
});
