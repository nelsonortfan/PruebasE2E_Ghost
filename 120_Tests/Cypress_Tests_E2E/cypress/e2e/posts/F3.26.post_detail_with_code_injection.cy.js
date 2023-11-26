import {
  GhostObject,
  PostCreatorObject,
  PostViewObject,
} from "../../pageObjects";
import postData from "../../data/aPriori/posts.json";

describe("See injected values on post detail", () => {
  const ghost = new GhostObject();
  const postCreator = new PostCreatorObject();

  beforeEach(() => {
    // Given I login and delete the existing data
    ghost.setupTest();
  });
  const postCases = [
    {
      description: "Create a post with code with only code injection header",
      post: postData[7],
    },
    // {
    //   description: "Create a post with code with only code injection footer",
    //   post: postData[8],
    // },
  ];
  postCases.forEach((postCase) => {
    it(postCase.description, () => {
      const post = postCase.post;
      // When I create a  post with either footer or header
      postCreator.createPostFromObject(post).then((createdPost) => {
        // Then the post should be created
        const postView = new PostViewObject(createdPost.postUrl);
        const body = postView.body;
        // And I see the code injected header
        if (post.codeInjection.header) {
          // And the header has the correct value
          body.should("contain", post.codeInjection.header);
        }
        // And I see the code injection footer
        if (post.codeInjection.footer) {
          // And the footer has the correct value
          body.should("contain", post.codeInjection.footer);
        }
      });
    });
  });
});
