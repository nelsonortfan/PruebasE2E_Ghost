const { ScreenshotHelper } = require("../../support/utils");
const posts = [null, null, null, null];
describe("Test post list", () => {
  beforeEach(() => {
    cy.viewport(1000, 660);
    cy.loginOld();
    cy.resetDataForTestOld();
    cy.createPostOld().then((postData) => {
      posts[3] = postData;
    });
    cy.createPostOld().then((postData) => {
      posts[2] = postData;
    });
    cy.createPostOld(false).then((postData) => {
      posts[1] = postData;
    });
    cy.createPostOld(false).then((postData) => {
      posts[0] = postData;
    });
  });

  it("Test post list", () => {
    cy.goToPageOld("posts");
    const screenshotTaker = new ScreenshotHelper("posts_old/F3.4");
    screenshotTaker.screenshot("Listar posts");
    // There should be 4 posts
    cy.get(".gh-posts-list-item").should("have.length", 4);

    // Check that the posts are in the correct order
    posts.forEach((post, index) => {
      const item = cy.get(".gh-posts-list-item").eq(index);
      item.should("contain.text", post.title);
      if (post.publish) {
        item.should("contain.text", "Published");
      } else {
        item.should("contain.text", "Draft");
      }
    });
  });
});
