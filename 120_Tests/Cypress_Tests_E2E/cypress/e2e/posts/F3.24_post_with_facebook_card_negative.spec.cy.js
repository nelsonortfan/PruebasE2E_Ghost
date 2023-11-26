import { GhostObject, PostCreatorObject } from "../../pageObjects";
import { generatePost, generateFacebookCard } from "../../data/random";
import { faker } from "@faker-js/faker";

describe("Test create a post with an invalid facebook card", () => {
  const ghost = new GhostObject();
  const postCreator = new PostCreatorObject();

  beforeEach(() => {
    // Given I login and delete the existing data
    ghost.setupTest();
  });

  const postCases = [
    {
      description: "Create post with facebook card title too long",
      post: {
        ...generatePost(),
        facebookCard: {
          ...generateFacebookCard(),
          title: faker.string.alpha(301),
        },
      },
      error:
        "Validation error, cannot edit post. Validation failed for og_title.",
      closePublish: true,
    },
    {
      description: "Create post with facebook card description too long",
      post: {
        ...generatePost(),
        facebookCard: {
          ...generateFacebookCard(),
          description: faker.string.alpha(501),
        },
      },
      error:
        "Validation failed: Facebook Description cannot be longer than 500 characters.",
    },
  ];
  postCases.forEach((postData) => {
    it(postData.description, () => {
      cy.on("uncaught:exception", (err, runnable) => {
        return false;
      });
      const post = postData.post;
      // When I create a new post
      postCreator.opeNewPost();
      // And I set a valid  title
      postCreator.setTitle(post.title);
      // And I set valid content
      postCreator.setContent(post.content);
      const facebookCard = postCreator.getFacebookCard();
      // And I set the facebook card title
      facebookCard.setTitle(post.facebookCard.title);
      // And I set the facebook card description
      facebookCard.setDescription(post.facebookCard.description);
      // And I click publish
      postCreator.startPublishFlow();
      if (postData.closePublish) {
        postCreator.closePublish();
      }
      // Then I should see the expected error
      postCreator.validationError.should("contain", postData.error);
    });
  });
});
