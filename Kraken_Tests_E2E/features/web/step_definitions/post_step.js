const { Given, When, Then } = require("@cucumber/cucumber");
const expect = require("chai").expect;

const clickButton = async (driver, selector) => {
  const button = await driver.$(selector);
  await button.click();
};

const getPost = async (driver, postName) => {
  const lists = await driver.$$(".gh-posts-list-item-group");
  console.log("lists", lists);
  const element = await lists.find(async (element) => {
    const text = await element.getText();
    console.log("text", text);
    return text.includes(postName);
  });
  return element;
};
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
Then("I see {kraken-string} post  in the list", async function (totalPosts) {
  const lists = await this.driver.$$(".gh-posts-list-item-group");
  expect(lists.length).to.equal(parseInt(totalPosts));
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
