import { GhostObject, PostCreatorObject } from "../../pageObjects";
import { generatePost, generateXCard } from "../../data/random";
import { faker } from "@faker-js/faker";

describe("Test create a post with an invalid invalid x card", () => {
  const ghost = new GhostObject();
  const postCreator = new PostCreatorObject();

  beforeEach(() => {
    // Given I login and delete the existing data
    ghost.setupTest();
  });

  const postCases = [
    {
      description: "Create post with x card title too long",
      post: {
        ...generatePost(),
        xCard: {
          ...generateXCard(),
          title: faker.string.alpha(301),
        },
      },
      error:
        "Validation failed: Twitter Title cannot be longer than 300 characters.",
    },
    {
      description: "Create post with x card description too long",
      post: {
        ...generatePost(),
        xCard: {
          ...generateXCard(),
          description: faker.string.alpha(501),
        },
      },
      error:
        "Validation failed: Twitter Description cannot be longer than 500 characters.",
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
      const xCard = postCreator.getXCard();
      // And I set the x card title
      xCard.setTitle(post.xCard.title);
      // And I set the x card description
      xCard.setDescription(post.xCard.description);
      // And I click publish
      postCreator.startPublishFlow();
      // Then I should see the expected error
      postCreator.validationError.should("contain", postData.error);
    });
  });
});
