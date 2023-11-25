import {
  GhostObject,
  PostCreatorObject,
  PostDetailObject,
  PostListObject,
} from "../../pageObjects";
import { generatePosts } from "../../data/dynamic/posts";
describe("Test post list", () => {
  const ghost = new GhostObject();
  const postCreator = new PostCreatorObject();
  const postList = new PostListObject();
  const createdPosts = [null, null, null, null];

  beforeEach(() => {
    // Given I login and delete the existing data
    ghost.setupTest();
    generatePosts(4).then((posts) => {
      // And I add a published post
      postCreator
        .createPostFromObject({ ...posts[0], publish: true })
        .then((post) => {
          createdPosts[3] = post;
        });
      // And I add a published post
      postCreator
        .createPostFromObject({ ...posts[1], publish: true })
        .then((post) => {
          createdPosts[2] = post;
        });
      // And I add a unpublished post
      postCreator
        .createPostFromObject({ ...posts[2], publish: false })
        .then((post) => {
          createdPosts[1] = post;
        });
      // And I add a unpublished post
      postCreator
        .createPostFromObject({ ...posts[3], publish: false })
        .then((post) => {
          createdPosts[0] = post;
        });
    });
  });

  const postCases = [{ description: "List the posts expecting an order" }];
  postCases.forEach((postData) => {
    it(postData.description, () => {
      // When I list the created posts
      postList.listPosts().then((currentPosts) => {
        // Then there should be four posts
        expect(currentPosts).to.have.length(4);
        // And the posts should be in the expected order
        createdPosts.forEach((post, index) => {
          const postListDetail = currentPosts[index];
          postListDetail.title.should("contain", post.title);
          postListDetail.status.should(
            "contain",
            post.publish ? "Published" : "Draft"
          );
        });
      });
    });
  });
});
