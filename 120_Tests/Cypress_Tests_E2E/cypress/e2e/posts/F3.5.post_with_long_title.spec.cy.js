import { GhostObject, PostCreatorObject } from "../../pageObjects";
import { faker } from "@faker-js/faker";

describe("Test create a post with invalid title", () => {
  const ghost = new GhostObject();
  const postCreator = new PostCreatorObject();
  beforeEach(() => {
    // Given I login and delete all the existing data
    ghost.setupTest();
  });

  const postCases = [
    {
      titleLength: 255,
      fails: false,
    },
    {
      titleLength: 256,
      fails: true,
    },
  ];
  postCases.forEach((postData) => {
    // Then I go to create a post
    it(`Publish a post with ${postData.titleLength} characters`, () => {
      cy.log(
        `Publish a post with ${postData.titleLength} ${postData.fails} characters`
      );
      postCreator.opeNewPost();

      // When I create a post with a title of x length
      const post = {
        title: faker.string.alpha({ length: postData.titleLength }),
        content: faker.lorem.paragraph(),
      };
      // And I set the content
      postCreator.setContent(post.content);
      // And I set the title
      postCreator.setTitle(post.title);
      // And I start the publish flow
      postCreator.startPublishFlow();
      // Then if the post is invalid I should see the validation error
      if (postData.fails) {
        postCreator.validationError.should(
          "contain",
          "Validation failed: Title cannot be longer than 255 characters."
        );
      } else {
        // And if the post is valid I should be able to publish it
        postCreator.continueButton.should("be.visible");
      }
    });
  });
});
