import {
  GhostObject,
  PostCreatorObject,
  PostListObject,
  TagCreatorObject,
} from "../../pageObjects";

import { generatePosts, generateTags } from "../../data/random";
describe("Test create a pos with tags", () => {
  const ghost = new GhostObject();
  const postCreator = new PostCreatorObject();
  const postList = new PostListObject();
  const tagsCreator = new TagCreatorObject();
  const tags = generateTags(2);
  const postCases = [
    {
      description: "Create a post with 1 tags",
      post: { ...generatePosts(1)[0], tags: tags.slice(0, 1) },
    },
    {
      description: "Create a post with 2 tags",
      post: { ...generatePosts(1)[0], tags: tags },
    },
  ];

  beforeEach(() => {
    // Given I login and delete the existing data
    ghost.setupTest().then(() => {
      // And I create the tags
      tags.forEach((tag) => {
        tagsCreator.createTag(tag.name, tag.description);
      });
    });
  });

  postCases.forEach((postData) => {
    it(postData.description, () => {
      // When I create a post with given tags
      const post = postData.post;
      postCreator.createPostFromObject(post).then((createdPost) => {
        // Then the post should be created
        postList.listPosts().then((currentPosts) => {
          // And there should only be one post
          expect(currentPosts).to.have.length(1);
          // And the post detail should contain te expected tags
          const postDetail = postList.getPost(createdPost.id);
          const tags = postDetail.getTags();
          tags.should("have.length", post.tags.length);
          post.tags.forEach((tag) => {
            tags.should("contain", tag.name);
          });
        });
      });
    });
  });
});
