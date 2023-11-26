import {
  GhostObject,
  PostCreatorObject,
  PostListObject,
} from "../../pageObjects";
import postData from "../../data/aPriori/posts.json";
describe("Test create a post with multimedia", () => {
  const ghost = new GhostObject();
  const postCreator = new PostCreatorObject();
  const postList = new PostListObject();

  beforeEach(() => {
    // Given I login and delete the existing data
    ghost.setupTest();
  });

  const postCases = [
    { description: "Create a post with 1 image", post: postData[3] },
    { description: "Create a post with 2 images", post: postData[4] },
  ];
  postCases.forEach((postData) => {
    it(postData.description, () => {
      // When I create a post using an image
      const post = postData.post;
      postCreator.createPostFromObject(post).then((createdPost) => {
        // Then the post should be created
        postList.listPosts().then((currentPosts) => {
          // And there should only be one post
          expect(currentPosts).to.have.length(1);
          // And the post detail should contain the number of expected images
          const postDetail = postList.getPost(createdPost.id);
          postDetail.images.should("have.length", post.images.length);
        });
      });
    });
  });
});
