const { ScreenshotHelper } = require("../../support/utils");

describe("Test create a Post from start to finish", () => {
  beforeEach(() => {
    cy.viewport(1000, 660);
    cy.login();
    cy.resetDataForTest();
  });

  it("Create a new post", () => {
    const screenshotTaker = new ScreenshotHelper("posts/F3.1");
    cy.createPost(true, screenshotTaker).then((postData) => {
      // Check that the post was created
      const { id, title, content } = postData;
      cy.goToPage("posts");
      screenshotTaker.screenshot("Listar posts");
      // There should only be one post
      let postSelector = ".gh-posts-list-item-group";
      cy.get(postSelector).should("have.length", 1);
      const item = cy.get(postSelector);
      // Post should be published
      item.should("contain.text", "Published");
      item.should("contain.text", title);
      // Post should have the correct title
      item.click();
      screenshotTaker.screenshot("Ver post");
      cy.url().then((url) => {
        expect(url).to.contain(`/editor/post/${id}`);
      });
      cy.get('textarea[placeholder="Post title"]').should("have.value", title);
      // Post should have the correct content
      content.split("\n").forEach((line, index) => {
        cy.get(".koenig-lexical").should("contain.text", line);
      });
    });
  });
});
