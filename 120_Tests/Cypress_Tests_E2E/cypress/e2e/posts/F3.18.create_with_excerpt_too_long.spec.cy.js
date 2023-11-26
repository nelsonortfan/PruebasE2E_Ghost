import { GhostObject, PostCreatorObject } from "../../pageObjects";
import { generatePost, generateMetadata } from "../../data/random";
import { faker } from "@faker-js/faker";

describe("Test create a post with an invalid excerpt", () => {
  const ghost = new GhostObject();
  const postCreator = new PostCreatorObject();

  beforeEach(() => {
    // Given I login and delete the existing data
    ghost.setupTest();
  });

  const postCases = [
    {
      description: "Create post with excerpt too long",
      post: {
        ...generatePost(),
        excerpt: faker.string.alpha(301),
      },
      error: "Validation failed: Excerpt cannot be longer than 300 characters.",
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
      // And I set a a too long excerpt
      postCreator.setExcerpt(post.excerpt);
      // And I click publish
      postCreator.startPublishFlow();
      // Then I should see the expected error
      postCreator.validationError.should("contain", postData.error);
    });
  });
});
