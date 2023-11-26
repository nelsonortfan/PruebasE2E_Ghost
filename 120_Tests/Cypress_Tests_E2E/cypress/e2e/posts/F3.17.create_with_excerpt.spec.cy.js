import {
  GhostObject,
  PostCreatorObject,
  PostListObject,
} from "../../pageObjects";
import { generatePost } from "../../data/random";
import { faker } from "@faker-js/faker";

describe("Test create a post with a excerpt", () => {
  const ghost = new GhostObject();
  const postCreator = new PostCreatorObject();
  const postList = new PostListObject();

  beforeEach(() => {
    // Given I login and delete the existing data
    ghost.setupTest();
  });

  const postCases = [
    {
      excerpt: "Create a post with an excerpt",
      post: {
        ...generatePost(),
        excerpt: faker.lorem.words({ min: 1, max: 3 }),
      },
    },
  ];
  postCases.forEach((postData) => {
    it(postData.excerpt, () => {
      // When I create a post with an excerpt
      const post = postData.post;
      postCreator.createPostFromObject(post).then((createdPost) => {
        // Then the post should be created
        postList.listPosts().then((currentPosts) => {
          // And there should only be one post
          expect(currentPosts).to.have.length(1);
          const postDetail = postList.getPost(createdPost.id);
          // And the post  should have the expeted excerpt
          const excerpt = postDetail.getExcerpt();
          excerpt.should("have.value", post.excerpt);
        });
      });
    });
  });
});
