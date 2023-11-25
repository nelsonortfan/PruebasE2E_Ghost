import {
  GhostObject,
  PostCreatorObject,
  PostViewObject,
} from "../../pageObjects";
import postData from "../../data/aPriori/posts.json";
describe("See featured post as user", () => {
  const ghost = new GhostObject();
  const postCreator = new PostCreatorObject();

  beforeEach(() => {
    // Given I login and delete the existing data
    ghost.setupTest();
  });

  // Cases for post creation
  const postCases = [{ description: "Check featured post", post: postData[2] }];
  postCases.forEach((postData) => {
    it(postData.description, () => {
      // When I create a featuted post
      const post = postData.post;
      postCreator.createPostFromObject(post).then((createdPost) => {
        // Then I see the post as featured
        const postView = new PostViewObject(createdPost.postUrl);
        postView.isFeatured.should("be.visible");
      });
    });
  });
});
