import { GhostObject, PostCreatorObject } from "../../pageObjects";
import { generatePosts } from "../../data/random";
import { faker } from "@faker-js/faker";

describe("Test create a post with an invalid youtube link", () => {
  const ghost = new GhostObject();
  const postCreator = new PostCreatorObject();

  beforeEach(() => {
    // Given I login and delete the existing data
    ghost.setupTest();
  });

  const postCases = [
    {
      description: "Create a post with an invalid yotube video",
      post: { ...generatePosts(1)[0] },
    },
  ];
  postCases.forEach((postData) => {
    it(postData.description, () => {
      const post = postData.post;
      // When I create a new post
      postCreator.opeNewPost();
      // And I use a valid  title
      postCreator.setTitle(post.title);
      // And I use valid conetent
      postCreator.setContent(post.content);
      // And I use an invalid link
      postCreator.addYoutubeVideo(faker.word.words(1), false);
      // Then I should see an error
      cy.get('span[data-testid="embed-url-error-message"]').should(
        "be.visible"
      );
    });
  });
});
