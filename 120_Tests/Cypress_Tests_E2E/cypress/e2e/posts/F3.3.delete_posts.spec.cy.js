import {
  GhostObject,
  PostCreatorObject,
  PostDetailObject,
  PostListObject,
} from "../../pageObjects";
import { generatePosts } from "../../data/random";

const POSTS = generatePosts(2);
describe("Test delete a post", () => {
  const ghost = new GhostObject();
  const postCreator = new PostCreatorObject();
  const postList = new PostListObject();
  const currentPosts = [null, null];

  beforeEach(() => {
    // Given I login and delete the existing data
    ghost.setupTest();
    // And I two posts
    POSTS.forEach((post, index) => {
      postCreator.createPostFromObject(post).then((post) => {
        currentPosts[index] = post;
      });
    });
  });

  const postCases = [
    { description: "Delete a post with random data", post: POSTS[0] },
  ];
  postCases.forEach((postData) => {
    it(postData.description, () => {
      // When I open a created post
      const post = currentPosts.find(
        (post) => post.title === postData.post.title
      );
      const otherPost = currentPosts.find(
        (post) => post.title !== postData.post.title
      );
      const postDetail = new PostDetailObject(post.id);

      // And I delete the post
      postDetail.delete();

      postList.listPosts().then((currentPosts) => {
        // Then there should be only one post
        expect(currentPosts).to.have.length(1);
        const postListDetail = currentPosts[0];
        // And the post should not be in the list
        postListDetail.title.should("not.contain", post.title);
        // And the other post should not have been touched
        postListDetail.title.should("contain", otherPost.title);
        postList.postListElements.should("not.contain", post.title);
        // And I should see a 404 on the deleted post page
        postDetail.goToPost();
        cy.get("body").should("contain.text", "Page not found");
      });
    });
  });
});
