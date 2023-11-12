describe("Test create a Post from start to finish", () => {
  beforeEach(() => {
    cy.login();
    cy.deleteAllPosts();
  });

  it("Create a new post", () => {
    cy.createPost().then((postData) => {
      // Check that the post was created
      const { id, title, content } = postData;
      cy.goToPage("posts");
      // There should only be one post
      let postSelector = ".gh-posts-list-item-group";
      cy.get(postSelector).should("have.length", 1);
      const item = cy.get(postSelector);
      // Post should be published
      item.should("contain.text", "Published");
      item.should("contain.text", title);
      // Post should have the correct title
      item.click();
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
