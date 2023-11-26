import {
  GhostObject,
  PostCreatorObject,
  PostListObject,
} from "../../pageObjects";
import { generatePost, generateFacebookCard } from "../../data/random";
describe("Test create a post with facebook card", () => {
  const ghost = new GhostObject();
  const postCreator = new PostCreatorObject();
  const postList = new PostListObject();

  beforeEach(() => {
    // Given I login and delete the existing data
    ghost.setupTest();
  });

  const postCases = [
    {
      description: "Create a post with facebook card",
      post: { ...generatePost(), facebookCard: generateFacebookCard() },
    },
  ];
  postCases.forEach((postData) => {
    it(postData.description, () => {
      // When I create a post using a facebook card
      const post = postData.post;
      postCreator.createPostFromObject(post).then((createdPost) => {
        // Then the post should be created
        postList.listPosts().then((currentPosts) => {
          // And there should only be one post
          expect(currentPosts).to.have.length(1);
          // And the facebook card  should match the input data
          const postDetail = postList.getPost(createdPost.id);
          const facebookCard = postDetail.getFacebookCard();
          facebookCard.title.should("have.value", post.facebookCard.title);
          facebookCard.description.should(
            "have.value",
            post.facebookCard.description
          );
        });
      });
    });
  });
});
