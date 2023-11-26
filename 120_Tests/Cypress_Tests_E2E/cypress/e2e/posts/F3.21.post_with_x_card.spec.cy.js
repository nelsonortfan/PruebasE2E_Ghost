import {
  GhostObject,
  PostCreatorObject,
  PostListObject,
} from "../../pageObjects";
import { generatePost, generateXCard } from "../../data/random";
describe("Test create a post with  x card", () => {
  const ghost = new GhostObject();
  const postCreator = new PostCreatorObject();
  const postList = new PostListObject();

  beforeEach(() => {
    // Given I login and delete the existing data
    ghost.setupTest();
  });

  const postCases = [
    {
      description: "Create a post with x card",
      post: { ...generatePost(), xCard: generateXCard() },
    },
  ];
  postCases.forEach((postData) => {
    it(postData.description, () => {
      // When I create a post using x card
      const post = postData.post;
      postCreator.createPostFromObject(post).then((createdPost) => {
        // Then the post should be created
        postList.listPosts().then((currentPosts) => {
          // And there should only be one post
          expect(currentPosts).to.have.length(1);
          // And the x card should match the input data
          const postDetail = postList.getPost(createdPost.id);
          const xCard = postDetail.getXCard();
          xCard.title.should("have.value", post.xCard.title);
          xCard.description.should("have.value", post.xCard.description);
        });
      });
    });
  });
});
