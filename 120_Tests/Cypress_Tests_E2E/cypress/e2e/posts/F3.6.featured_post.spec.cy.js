import {
  GhostObject,
  PostCreatorObject,
  PostListObject,
} from "../../pageObjects";
import { generatePosts } from "../../data/dynamic/posts";
describe("Test create a featured post", () => {
  const ghost = new GhostObject();
  const postCreator = new PostCreatorObject();
  const postList = new PostListObject();
  const totalPosts = 1;

  it("Test featured post", () => {
    generatePosts(totalPosts).then((posts) => {
      // Given I have a dynamic post
      posts.forEach((post) => {
        // And I login and reset the data
        ghost.setupTest();
        // When I create the post
        postCreator
          .createPost(post.title, post.content, true, true)
          .then(() => {
            // Then the post should be created
            postList.listPosts().then((currentPosts) => {
              // And there should only be one post
              expect(currentPosts).to.have.length(1);
              const postListDetail = currentPosts[0];
              // And the title should be expected
              postListDetail.title.should("contain", post.title);
              // And the status should be publused
              postListDetail.status.should("contain", "Published");
              // And it should be featured
              postListDetail.isFeatured.should("be.visible");
            });
          });
      });
    });
  });
});
