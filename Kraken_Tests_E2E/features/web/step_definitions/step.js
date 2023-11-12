const { Given, When, Then } = require("@cucumber/cucumber");
const expect = require("chai").expect;

const clickButton = async (driver, selector) => {
  const button = await driver.$(selector);
  await button.click();
};

const getPost = async (driver, postName) => {
  const lists = await driver.$$(".gh-posts-list-item-group");
  const element = await lists.find(async (element) => {
    const text = await element.getText();
    return text.includes(postName);
  });
  return element;
};

When("I enter email {kraken-string}", async function (email) {
  let element = await this.driver.$('input[name="identification"]');
  return await element.setValue(email);
});

When("I enter password {kraken-string}", async function (password) {
  let element = await this.driver.$('input[name="password"]');
  return await element.setValue(password);
});

When("I click on sing in button", async function () {
  let element = await this.driver.$('button[data-test-button="sign-in"]');
  return await element.click();
});

When("I refresh the page", async function () {
  await this.driver.refresh();
});

//--------- TAGS STEPS --------//

When("I click on tags button", async function () {
  let element = await this.driver.$('a[href="#/tags/"]');
  return await element.click();
});

When("I click on new tag button", async function () {
  let element = await this.driver.$('a[href="#/tags/new/"]');
  return await element.click();
});

When("I fill the tag name {string}", async function (tagName) {
  let element = await this.driver.$("#tag-name");
  return await element.setValue(tagName);
});

When("I fill the tag description {string}", async function (tagDescription) {
  let element = await this.driver.$("#tag-description");
  return await element.setValue(tagDescription);
});

When("I click save tag button", async function () {
  let element = await this.driver.$('button[data-test-button="save"]');
  return await element.click();
});

When("I click on tag with name {string}", async function (tagName) {
  let element = await this.driver.$(
    `a[title="Edit tag"][href="#/tags/${tagName}/"]`
  );
  return await element.click();
});

When("I click on delete tag button", async function () {
  let element = await this.driver.$(
    'button.gh-btn.gh-btn-red.gh-btn-icon[data-test-button="delete-tag"]'
  );
  return await element.click();
});

When("I click on confirm delete tag button", async function () {
  let element = await this.driver.$(
    'button[data-test-button="confirm"].gh-btn.gh-btn-red.gh-btn-icon.ember-view'
  );
  return await element.click();
});

When("I click on public tags button", async function () {
  let element = await this.driver.$(
    'button.gh-btn.gh-btn-group-selected[data-test-tags-nav="public"]'
  );
  return await element.click();
});

When("I click on internal tags button", async function () {
  let element = await this.driver.$(
    'button.gh-btn[data-test-tags-nav="internal"]'
  );
  return await element.click();
});

When("I fill description with more than 500 elements", async function () {
  let textToType = "a".repeat(501);
  let element = await this.driver.$("#tag-description");
  return await element.setValue(textToType);
});

Then("I should see the tag {string} listed", async function (tagName) {
  const element = await this.driver.$('h3.gh-tag-list-name[data-test-tag-name]');
  const text = await element.getText();
  expect(text).to.equal(tagName);
});

Then("I should see the message {string}", async function (message) {
    const element = await this.driver.$('h4');
    const text = await element.getText();
    expect(text).to.equal(message);
});

Then("I should see {string} tags listed", async function (numberOfTags) {
    const element = await this.driver.$$(".gh-tag-list-name");
    expect(element.length).to.equal(parseInt(numberOfTags));
});

Then("I should see the error message {string}", async function (errorMessage) {
    const element = await this.driver.$("div.form-group.no-margin.error > p.response");
    const text = await element.getText();
    expect(text).to.equal(errorMessage);
});

//--------- SETTINGS STEPS --------//

When("I click on settings button", async function () {
  let element = await this.driver.$('a[href="#/settings/"]');
  return await element.click();
});

When("I click on labs button", async function () {
  let element = await this.driver.$('a[href="#/settings/labs/"]');
  return await element.click();
});

When("I click on delete database button", async function () {
  let element = await this.driver.$(
    'button.gh-btn.gh-btn-red[data-test-button="delete-all"]'
  );
  return await element.click();
});

When("I click on confirm delete database button", async function () {
  let element = await this.driver.$(
    'button[data-test-button="confirm"].gh-btn.gh-btn-red.gh-btn-icon.ember-view'
  );
  return await element.click();
});

When("I click on Staff button", async function () {
  let element = await this.driver.$('a[href="#/settings/staff/"]');
  return await element.click();
});

When("I select Owner", async function () {
  let element = await this.driver.$('a[data-test-user-id="1"]');
  return await element.click();
});

When("I click to update user location", async function () {
  let element = await this.driver.$('input[id="user-location"]');
  return await element.setValue("Bogota-Colombia");
});

When("I click to update user WebSite", async function () {
  let element = await this.driver.$('input[id="user-website"]');
  return await element.setValue("http://mywebsite.com");
});

When("I click to update user Facebook", async function () {
  let element = await this.driver.$('input[id="user-facebook"]');
  return await element.setValue("https://www.facebook.com/lucasBunny");
});

When("I save the changes in Staff", async function () {
  let element = await this.driver.$('button[data-test-save-button=""]');
  return await element.click();
});

When("I validate Staff updated", async function () {
  let element = await this.driver.$('input[id="user-location"]').getValue();
  let element2 = await this.driver.$('input[id="user-website"]').getValue();
  let element3 = await this.driver.$('input[id="user-facebook"]').getValue();
  //console.log('El valor titulo 1 es ' + element)
  expect(element).to.equal("Bogota-Colombia");
  expect(element2).to.equal("http://mywebsite.com");
  expect(element3).to.equal("https://www.facebook.com/lucasBunny");
  return;
});

When("I click on the Email newsletter button", async function () {
  // Write code here that turns the phrase above into concrete actions
  await clickButton(this.driver, 'a[data-test-nav="members-email"]');
});
When("I click on the Mailgun configuration expand button", async function () {
  // Write code here that turns the phrase above into concrete actions
  const elements = await this.driver.$$(
    "button[data-test-toggle-membersemail]"
  );
  const secondElement = elements[1];
  await secondElement.click();
});
When("I enter mailgun api key {kraken-string}", async function (mailgunApiKey) {
  // Write code here that turns the phrase above into concrete actions
  const elemnt = await this.driver.$("#mailgun-private-api");
  await elemnt.setValue(mailgunApiKey);
});
When("I enter mailgun domain {kraken-string}", async function (mailgunDomain) {
  // Write code here that turns the phrase above into concrete actions
  const elemnt = await this.driver.$("#mailgun-domain");
  await elemnt.setValue(mailgunDomain);
});
When("I click on the Save button", async function () {
  // Write code here that turns the phrase above into concrete actions
  await clickButton(
    this.driver,
    'button[data-test-button="save-members-settings"]'
  );
});
When(
  "I see the mailgun api key {kraken-string}",
  async function (mailgunApiKey) {
    // Write code here that turns the phrase above into concrete actions
    const elemnt = await this.driver.$("#mailgun-private-api");
    expect(await elemnt.getValue()).to.equal(mailgunApiKey);
  }
);

When(
  "I see the mailgun domain {kraken-string}",
  async function (mailgunDomain) {
    // Write code here that turns the phrase above into concrete actions
    const elemnt = await this.driver.$("#mailgun-domain");
    expect(await elemnt.getValue()).to.equal(mailgunDomain);
  }
);

//--------- PAGES STEPS --------//

When("I click on pages button", async function () {
  let element = await this.driver.$('a[href="#/pages/"]');
  return await element.click();
});

When("I click on new page button", async function () {
  let element = await this.driver.$('a[href="#/editor/page/"]');
  return await element.click();
});

Then("I click on the title", async function () {
  let element = await this.driver.$('textarea[placeholder="Page title"]');
  return await element.click();
});

Then("I click on the description", async function () {
  let element = await this.driver.$(".koenig-lexical");
  return await element.click();
});

Then("I see email sent", async function () {
  let elements = await this.driver.$$("span[name='Kraken Test']");
  let emailWasReceived = elements.length > 0;
  expect(emailWasReceived).to.equal(true);
});

Then("I publish the page", async function () {
  let element = await this.driver.$('button[data-test-button="publish-flow"]');
  return await element.click();
});

Then("I continue the page", async function () {
  let element = await this.driver.$('button[data-test-button="continue"]');
  return await element.click();
});

Then("I finish the published page", async function () {
  let element = await this.driver.$(
    'button[data-test-button="confirm-publish"]'
  );
  return await element.click();
});

Then("I see a confirmation message", async function () {
  let elements = await this.driver.$$("span.green");
  let messageConfirmation = await elements[0].getText();
  //console.log('El valor es ' + messageConfirmation)
  expect(messageConfirmation).to.equal("Boom. It’s out there.");
});

Then("I click over the first page", async function () {
  let elements = await this.driver.$('div[role="menuitem"]');
  return await elements.click();
});

When("I click button settings to delete", async function () {
  let element = await this.driver.$(
    'button.gh-btn.gh-btn-editor[title="Settings"]'
  );
  return await element.click();
});

When("I click button to delete page", async function () {
  let element = await this.driver.$("button.gh-btn.gh-btn-outline");
  return await element.click();
});

When("I confirm delete page", async function () {
  let element = await this.driver.$("button.gh-btn.gh-btn-red");
  return await element.click();
});

When("I validate there is not page", async function () {
  let elements = await this.driver.$$("h4");
  let messageConfirmation = await elements[0].getText();
  // console.log('El valor es ' + messageConfirmation)
  expect(messageConfirmation).to.equal("Tell the world about yourself.");
});

When("I update the title on the page", async function () {
  let element = await this.driver.$('textarea[placeholder="Page title"]');
  return await element.setValue("Titulo pagina actualizada");
});

When("I save the new changes on the page", async function () {
  let element = await this.driver.$('button[data-test-button="publish-save"]');
  return await element.click();
});

When("I validate the page is updated", async function () {
  let elements = await this.driver.$$("h3.gh-content-entry-title");
  let messageConfirmation = await elements[0].getText();
  //console.log('El valor es ' + messageConfirmation)
  expect(messageConfirmation).to.equal("Titulo pagina actualizada");
});

When("I validate both pages with same title", async function () {
  let elements = await this.driver.$$("h3.gh-content-entry-title");
  let title1 = await elements[0].getText();
  let title2 = await elements[1].getText();
  //console.log('El valor titulo 1 es ' + title1)
  //console.log('El valor titulo 2 es ' + title2)
  expect(title1).to.equal("Pagina con titulo repetido");
  expect(title2).to.equal("Pagina con titulo repetido");
});

//--------- POST STEPS --------//

When("I click on new post button", async function () {
  await clickButton(this.driver, 'a[href="#/editor/post/"]');
});
Then("I enter post title {kraken-string}", async function (postTitle) {
  const title = await this.driver.$('textarea[placeholder="Post title"]');
  await title.setValue(postTitle);
});
Then("I enter the post body {kraken-string}", async function (postBody) {
  const body = await this.driver.$(".kg-prose");
  await body.setValue(postBody);
});
Then("I click on publish button", async function () {
  await clickButton(this.driver, 'button[data-test-button="publish-flow"]');
});
Then("I click on continue, final review button", async function () {
  await clickButton(this.driver, 'button[data-test-button="continue"]');
});
Then("I click on publish post, right now button", async function () {
  await clickButton(this.driver, 'button[data-test-button="confirm-publish"]');
});
Then("I click on the Posts button", async function () {
  await clickButton(this.driver, 'a[data-test-nav="posts"]');
});
Then("I see {int} posts in the list", async function (totalPosts) {
  const lists = await this.driver.$$(".gh-posts-list-item-group");
  expect(lists.length).to.equal(totalPosts);
});
Then(
  "I see the post {kraken-string} in the list with status {kraken-string}",
  async function (postName, status) {
    const element = await getPost(this.driver, postName);
    expect(element).to.not.be.undefined;
    const text = await element.getText();
    expect(text).to.contain(status);
  }
);
Then("I click on the post {kraken-string}", async function (postName) {
  const element = await getPost(this.driver, postName);
  await element.click();
});
Then("I see the title {kraken-string}", async function (postTitle) {
  const title = await this.driver.$$('textarea[placeholder="Post title"]');
  const text = await title[0].getValue();
  expect(text).to.equal(postTitle);
});
Then("I see the body {kraken-string}", async function (postBody) {
  const body = await this.driver.$$(".kg-prose");
  const text = await body[0].getText();
  expect(text).to.contain(postBody);
});
When("I click on the update button", async function () {
  // Write code here that turns the phrase above into concrete actions
  await clickButton(this.driver, 'button[data-test-button="publish-save"]');
});
When("I delete the post {kraken-string}", async function (postTitle) {
  // Write code here that turns the phrase above into concrete actions
  const element = await getPost(this.driver, postTitle);
  await element.click({ button: "right" });
  await clickButton(this.driver, ".red");
  await clickButton(this.driver, 'button[data-test-button="confirm"]');
});
Given("I click on the posts button", async function () {
  // Write code here that turns the phrase above into concrete actions
  await clickButton(this.driver, 'a[data-test-link="posts"');
});
Then(
  "I see {kraken-string} in the {int} position of the list of posts with the status {kraken-string}",
  async function (postTitle, position, status) {
    const lists = await this.driver.$$(".gh-posts-list-item-group");
    const element = lists[position - 1];
    const text = await element.getText();
    expect(text).to.contain(postTitle);
    expect(text).to.contain(status);
  }
);

//--------- TAGS STEPS --------//
When("I click on members button", async function () {
  let element = await this.driver.$('a[href="#/members/"]');
  return await element.click();
});
When("I click on new member button", async function(){
  let element = await this.driver.$('a[data-test-new-member-button="true"]');
  return await element.click();
});
When("I enter member name {kraken-string}", async function(memberName) {
  const element = await this.driver.$('input[data-test-input="member-name"]');
  await element.setValue(memberName);
});
When("I enter member email {kraken-string}", async function(memberEmail) {
  const element = await this.driver.$('input[data-test-input="member-email"]');
  await element.setValue(memberEmail);
});
When("I click save member button", async function(){
  let element = await this.driver.$('button[data-test-button="save"]');
  return await element.click();
})
Then("I see the member name {kraken-string}", async function (memberName) {
  const name = await this.driver.$$('.gh-members-list-name');
  const text = await name[0].getText();
  expect(text).to.equal(memberName);
});
Then("I see the member email {kraken-string}", async function (memberEmail) {
  const email = await this.driver.$$('.gh-members-list-email');
  const text = await email[0].getText();
  expect(text).to.equal(memberEmail);
});
When("I search the member name {kraken-string}", async function (memberName) {
  let element = await this.driver.$('.gh-members-list-searchfield');
  return await element.setValue(memberName);
});
When("I click on filter button", async function () {
  let element = await this.driver.$('div[data-test-button="members-filter-actions"]');
  return await element.click();
});
When("I select email option", async function () {
  let element = await this.driver.$('select[data-test-select="members-filter"]');
  await element.click();
  let element2 = await this.driver.$('option[value="email"]');
  return await element2.click();
});
When("I enter member email {kraken-string} in filter", async function (memberEmail) {
  let element = await this.driver.$('input[data-test-input="members-filter-value"]');
  return await element.setValue(memberEmail);
});
When("I click Apply filters", async function () {
  let element = await this.driver.$('button[data-test-button="members-apply-filter"]');
  return await element.click();
});