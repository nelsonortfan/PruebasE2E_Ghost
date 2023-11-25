import {
  GhostObject,
  PostCreatorObject,
  PostListObject,
} from "../../pageObjects";
import { generatePost } from "../../data/random";
describe("Test create a post with restricted access ", () => {
  const ghost = new GhostObject();
  const postCreator = new PostCreatorObject();
  const postList = new PostListObject();

  beforeEach(() => {
    // Given I login and delete the existing data
    ghost.setupTest();
  });

  const postCases = ["members", "paid"];
  postCases.forEach((accessLevel) => {
    it(`Set a post access level to ${postCases}`, () => {
      // When I create a post using a restricted access
      const post = { ...generatePost(), accessLevel: accessLevel };
      postCreator.createPostFromObject(post).then((createdPost) => {
        // Then the post should be created
        postList.listPosts().then((currentPosts) => {
          // And there should only be one post
          expect(currentPosts).to.have.length(1);
          // And the post should have the expected access
          const postDetail = postList.getPost(createdPost.id);
          // Get google metadata
          postDetail.getAccessLevel().should("have.value", post.accessLevel);
        });
      });
    });
  });
});
