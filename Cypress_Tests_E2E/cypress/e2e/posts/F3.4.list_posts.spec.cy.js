const posts = [null, null, null, null];
describe("Test post list", () => {
  beforeEach(() => {
    cy.login();
    cy.deleteAllPosts();
    cy.createPost().then((postData) => {
      posts[3] = postData;
    });
    cy.createPost().then((postData) => {
      posts[2] = postData;
    });
    cy.createPost(false).then((postData) => {
      posts[1] = postData;
    });
    cy.createPost(false).then((postData) => {
      posts[0] = postData;
    });
  });

  it("Test post list", () => {
    cy.goToPage("posts");
    // There should be 4 posts
    cy.get(".gh-posts-list-item-group").should("have.length", 4);

    // Check that the posts are in the correct order
    posts.forEach((post, index) => {
      const item = cy.get(".gh-posts-list-item-group").eq(index);
      item.should("contain.text", post.title);
      if (post.publish) {
        item.should("contain.text", "Published");
      } else {
        item.should("contain.text", "Draft");
      }
    });
  });
});
