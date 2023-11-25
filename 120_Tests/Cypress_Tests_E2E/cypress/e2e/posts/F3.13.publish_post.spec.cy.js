import {
  GhostObject,
  PostCreatorObject,
  PostListDetailObject,
  PostListObject,
} from "../../pageObjects";
import { generatePosts } from "../../data/random";

describe("Test publish a draft post ", () => {
  const ghost = new GhostObject();
  const postCreator = new PostCreatorObject();
  const postList = new PostListObject();
  const createdPosts = [null, null, null];

  beforeEach(() => {
    // Given I login and delete the existing data
    ghost.setupTest();
    const posts = generatePosts(4);

    // And I add a draft post
    postCreator
      .createPostFromObject({ ...posts[0], publish: false })
      .then((post) => {
        createdPosts[0] = post;
      });
    // And I add a published post
    postCreator
      .createPostFromObject({ ...posts[1], publish: false })
      .then((post) => {
        createdPosts[1] = post;
      });
    // And I add a published post
    postCreator
      .createPostFromObject({ ...posts[2], publish: true })
      .then((post) => {
        createdPosts[2] = post;
      });
  });

  const postCases = [{ description: "Publish a post" }];
  postCases.forEach((postData) => {
    it(postData.description, () => {
      postList.listPosts().then((currentPosts) => {
        const postToPublish = createdPosts[0];
        expect(currentPosts).to.have.length(3);
        // And I open the post to publish
        const postDetail = postList.getPost(postToPublish.id);
        // And I publish the post
        postDetail.publishPost();
        // Then the post should be published
        postList.listPosts();
        const listDetail = new PostListDetailObject(
          postList.postListElements.contains(postToPublish.title).eq(0)
        );
        listDetail.status.should("contain.text", "Publish");
        // And the other draft post should still be unpublished
        const publishedPost = createdPosts[1];
        const publishedPostDetail = new PostListDetailObject(
          postList.postListElements.contains(publishedPost.title).eq(0)
        );
        publishedPostDetail.status.should("contain.text", "Draft");
      });
    });
  });
});
