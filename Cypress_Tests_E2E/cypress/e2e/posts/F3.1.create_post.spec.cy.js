import {
  GhostObject,
  PostCreatorObject,
  PostListObject,
} from "../../pageObjects";
import postData from "../../data/aPriori/posts.json";
describe("Test create a post", () => {
  const ghost = new GhostObject();
  const postCreator = new PostCreatorObject();
  const postList = new PostListObject();

  beforeEach(() => {
    // Given I login and delete the existing data
    ghost.setupTest();
  });

  // Cases for post creation
  const postCases = [
    { description: "Create a published post", post: postData[0] },
    { description: "Create a draft post", post: postData[1] },
  ];
  postCases.forEach((postData) => {
    it(postData.description, () => {
      // When I create a post
      const post = postData.post;
      postCreator
        .createPost(post.title, post.content, post.publish)
        .then((createdPost) => {
          // Then the post should be created
          postList.listPosts().then((currentPosts) => {
            // And there should only be one post
            expect(currentPosts).to.have.length(1);
            const postListDetail = currentPosts[0];
            // And the title should be expected
            postListDetail.title.should("contain", post.title);
            // And the status should be expected
            postListDetail.status.should(
              "contain",
              post.publish ? "Published" : "Draft"
            );
            // And the post detail should contain te expected data
            const postDetail = postList.getPost(createdPost.id);
            postDetail.title.should("have.value", post.title);
            post.content.split("\n").forEach((line) => {
              postDetail.content.should("contain", line);
            });
          });
        });
    });
  });
});
