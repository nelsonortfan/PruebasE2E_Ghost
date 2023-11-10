let createdPosts = [null, null];
describe("Test edit a published post", () => {
  beforeEach(() => {
    cy.login();
    cy.deleteAllPosts();
    cy.createPost().then((postData) => {
      createdPosts[1] = postData;
    });
    cy.createPost().then((postData) => {
      createdPosts[0] = postData;
    });
  });
  it("Delete a post.", () => {
    cy.goToPage("posts");
    // Check that the post was created
    cy.get(".gh-posts-list-item-group").should("have.length", 2);
    // Delete the post
    const toDelete = cy.get(".gh-posts-list-item-group").eq(0);
    toDelete.rightclick();
    cy.contains("Delete").click();
    cy.get(".gh-btn-red").click();
    // Check that the post was deleted
    cy.goToPage("posts");
    cy.get(".gh-posts-list-item-group").should("have.length", 1);
    cy.get(".gh-posts-list-item-group")
      .eq(0)
      .should("contain.text", createdPosts[1].title);
    cy.visit(createdPosts[0].url, { failOnStatusCode: false });
    cy.get("body").should("contain.text", "Page not found");
  });
});
