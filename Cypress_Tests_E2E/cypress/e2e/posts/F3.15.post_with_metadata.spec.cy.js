import {
  GhostObject,
  PostCreatorObject,
  PostListObject,
} from "../../pageObjects";
import { generatePosts, generateMetadata } from "../../data/random";
describe("Test create a post with  google metadata", () => {
  const ghost = new GhostObject();
  const postCreator = new PostCreatorObject();
  const postList = new PostListObject();

  beforeEach(() => {
    // Given I login and delete the existing data
    ghost.setupTest();
  });

  const postCases = [
    {
      description: "Create a post with metadta",
      post: { ...generatePosts(1)[0], googleMetadata: generateMetadata() },
    },
  ];
  postCases.forEach((postData) => {
    it(postData.description, () => {
      // When I create a post using google metadata
      const post = postData.post;
      postCreator.createPostFromObject(post).then((createdPost) => {
        // Then the post should be created
        postList.listPosts().then((currentPosts) => {
          // And there should only be one post
          expect(currentPosts).to.have.length(1);
          // And the google metadata should match the input data
          const postDetail = postList.getPost(createdPost.id);
          const googleMetadata = postDetail.getGoogleMetaData();
          googleMetadata.title.should("have.value", post.googleMetadata.title);
          googleMetadata.description.should(
            "have.value",
            post.googleMetadata.description
          );
        });
      });
    });
  });
});
