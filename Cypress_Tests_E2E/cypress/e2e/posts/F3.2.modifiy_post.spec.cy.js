const { faker } = require("@faker-js/faker");
let createdPost = null;
describe("Test edit a published post", () => {
  beforeEach(() => {
    cy.login();
    cy.deleteAllPosts();
    cy.createPost().then((postData) => {
      createdPost = postData;
    });
  });
  it("Edit the recently edited post", () => {
    // Check that the post was created
    cy.goToPage(`post`);
    cy.goToPage(`editor/post/${createdPost.id}`);
    const newPostName = faker.word.words({ min: 1, max: 5 });
    const newPostContent = faker.lorem.paragraphs(3);
    expect(newPostName).to.not.equal(createdPost.title);
    expect(newPostContent).to.not.equal(createdPost.content);
    // Fill the form
    const titelItem = cy.get('textarea[placeholder="Post title"]');
    titelItem.clear();
    titelItem.type(newPostName);
    const bodyItem = cy.get(".koenig-lexical").eq(1);
    bodyItem.clear();
    bodyItem.type(newPostContent);
    // Publish the changes
    cy.contains("Update").click();
    // Check changes where saved
    cy.goToPage("posts");
    // There should only be one post
    let postSelector = ".gh-posts-list-item-group";
    cy.get(postSelector).should("have.length", 1);
    const item = cy.get(postSelector);
    // Post should be published
    item.should("contain.text", "Published");
    item.should("contain.text", newPostName);
    // Post should have the correct title
    item.click();
    cy.url().then((url) => {
      expect(url).to.contain(`/editor/post/${createdPost.id}`);
    });
    cy.get('textarea[placeholder="Post title"]').should(
      "have.value",
      newPostName
    );
    // Post should have the correct content
    newPostContent.split("\n").forEach((line, index) => {
      cy.get(".koenig-lexical").should("contain.text", line);
    });
  });
});
