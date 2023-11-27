import { GhostObject, PostCreatorObject } from "../../pageObjects";
import { generatePost, generateMetadata } from "../../data/random";
import { faker } from "@faker-js/faker";

describe("Test create a post with an invalid metadata", () => {
  const ghost = new GhostObject();
  const postCreator = new PostCreatorObject();

  beforeEach(() => {
    // Given I login and delete the existing data
    ghost.setupTest();
  });

  const postCases = [
    {
      description: "Create post with metadata title too long",
      post: {
        ...generatePost(),
        googleMetadata: {
          ...generateMetadata(),
          title: faker.string.alpha(301),
        },
      },
      error:
        "Validation failed: Meta Title cannot be longer than 300 characters.",
    },
    {
      description: "Create post with metadata description too long",
      post: {
        ...generatePost(),
        googleMetadata: {
          ...generateMetadata(),
          description: faker.string.alpha(501),
        },
      },
      error:
        "Validation failed: Meta Description cannot be longer than 500 characters.",
    },
  ];
  postCases.forEach((postData) => {
    it(postData.description, () => {
      const post = postData.post;
      // When I create a new post
      postCreator.opeNewPost();
      // And I set a valid  title
      postCreator.setTitle(post.title);
      // And I set valid content
      postCreator.setContent(post.content);
      const googleMetadata = postCreator.getGoogleMetaData();
      // And I set the metadata title
      googleMetadata.setTitle(post.googleMetadata.title);
      // And I set the metadata description
      googleMetadata.setDescription(post.googleMetadata.description);
      // And I click publish
      postCreator.startPublishFlow();
      // Then I should see the expected error
      postCreator.validationError.should("contain", postData.error);
    });
  });
});
