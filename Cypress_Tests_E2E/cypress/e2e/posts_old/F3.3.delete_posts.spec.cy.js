const { ScreenshotHelper } = require("../../support/utils");
let createdPosts = [null, null];
describe("Test edit a published post", () => {
  beforeEach(() => {
    cy.viewport(1000, 660);
    cy.loginOld();
    cy.resetDataForTestOld();
    cy.createPostOld().then((postData) => {
      createdPosts[1] = postData;
    });
    cy.createPostOld().then((postData) => {
      createdPosts[0] = postData;
    });
  });
  it("Delete a post.", () => {
    const screenshotTaker = new ScreenshotHelper("posts_old/F3.3");
    cy.goToPageOld("posts");
    screenshotTaker.screenshot("Listar posts.");
    // Check that the post was created
    cy.get(".gh-posts-list-item").should("have.length", 2);
    // // Delete the post
    const toDelete = cy.get(".gh-posts-list-item").eq(0);
    toDelete.click();
    cy.wait(200);
    screenshotTaker.screenshot("Abrir post.");
    // Open the post settings
    cy.get("button[title='Settings']").click();
    cy.wait(200);
    screenshotTaker.screenshot("Abrir ajustes.");
    // // Delete the post
    cy.contains("Delete post").scrollIntoView();
    cy.wait(200);
    screenshotTaker.screenshot("Abrir eliminar.");
    cy.contains("Delete post").click();
    // Confirm deletion
    cy.wait(200);
    cy.get(".gh-btn-red").click();
    screenshotTaker.screenshot("Confirmar eliminacion.");
    cy.wait(200);
    screenshotTaker.screenshot("Post eliminado.");
    // Check that the post was deleted
    cy.wait(200);
    cy.goToPageOld("posts");
    screenshotTaker.screenshot("Listar posts.");
    cy.get(".gh-posts-list-item").should("have.length", 1);
    cy.get(".gh-posts-list-item")
      .eq(0)
      .should("contain.text", createdPosts[1].title);
    cy.visit(createdPosts[0].url, { failOnStatusCode: false });
    cy.get("body").should("contain.text", "Page not found");
    screenshotTaker.screenshot("Ver post eliminado.");
  });
});
