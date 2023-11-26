import {
  GhostObject,
  PostCreatorObject,
  PostListObject,
} from "../../pageObjects";
import postData from "../../data/aPriori/posts.json";

describe("Test create a post with code injection", () => {
  const ghost = new GhostObject();
  const postCreator = new PostCreatorObject();
  const postList = new PostListObject();

  beforeEach(() => {
    // Given I login and delete the existing data
    ghost.setupTest();
  });

  const postCases = [
    {
      description: "Create a post with code injection",
      post: postData[6],
    },
  ];
  postCases.forEach((postData) => {
    it(postData.description, () => {
      // When I create a post using a code injection card
      const post = postData.post;
      postCreator.createPostFromObject(post).then((createdPost) => {
        // Then the post should be created
        postList.listPosts().then((currentPosts) => {
          // And there should only be one post
          expect(currentPosts).to.have.length(1);
          // And the code injection card should match the input data
          const postDetail = postList.getPost(createdPost.id);
          const codeInjection = postDetail.getCodeInjection();
          codeInjection.header.should("contain", post.codeInjection.header);
          codeInjection.footer.should("contain", post.codeInjection.footer);
        });
      });
    });
  });
});
