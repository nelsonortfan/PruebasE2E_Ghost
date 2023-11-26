import {
  GhostObject,
  PostCreatorObject,
  PostViewObject,
} from "../../pageObjects";
import { generatePosts } from "../../data/dynamic/posts";
import { faker } from "@faker-js/faker";

describe("See featured post as user", () => {
  const ghost = new GhostObject();
  const postCreator = new PostCreatorObject();

  beforeEach(() => {
    // Given I login and delete the existing data
    ghost.setupTest();
  });

  it("Validate post exceprt is shown correctly", () => {
    generatePosts(1).then((posts) => {
      const post = posts[0];
      post.excerpt = faker.word.words({ min: 1, max: 5 });
      // When I create a  post with an exceprt
      postCreator.createPostFromObject(post).then((createdPost) => {
        const postView = new PostViewObject(createdPost.postUrl);
        const postExcerpt = postView.excerpt;
        // Then I see the exceprt
        postExcerpt.should("be.visible");
        // And the exceprt has the correct value
        postExcerpt.should("contain", post.excerpt);
      });
    });
  });
});
