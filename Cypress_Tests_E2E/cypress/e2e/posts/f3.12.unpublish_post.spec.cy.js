import {
  GhostObject,
  PostCreatorObject,
  PostListDetailObject,
  PostListObject,
} from "../../pageObjects";
import { generatePosts } from "../../data/random";

describe("Test unpublis a post ", () => {
  const ghost = new GhostObject();
  const postCreator = new PostCreatorObject();
  const postList = new PostListObject();
  const createdPosts = [null, null, null];

  beforeEach(() => {
    // Given I login and delete the existing data
    ghost.setupTest();
    const posts = generatePosts(4);

    // And I add a published post
    postCreator
      .createPostFromObject({ ...posts[0], publish: true })
      .then((post) => {
        createdPosts[0] = post;
      });
    // And I add a published post
    postCreator
      .createPostFromObject({ ...posts[1], publish: true })
      .then((post) => {
        createdPosts[1] = post;
      });
    // And I add a unpublished post
    postCreator
      .createPostFromObject({ ...posts[2], publish: false })
      .then((post) => {
        createdPosts[2] = post;
      });
  });

  const postCases = [{ description: "Unpublish a post" }];
  postCases.forEach((postData) => {
    it(postData.description, () => {
      postList.listPosts().then((currentPosts) => {
        const postToUnpublish = createdPosts[0];
        expect(currentPosts).to.have.length(3);
        // And I open the post to unpublish
        const postDetail = postList.getPost(postToUnpublish.id);
        // And I unpublish the post
        postDetail.unpublish();
        // Then the post should be unpublished
        postList.listPosts();
        const listDetail = new PostListDetailObject(
          postList.postListElements.contains(postToUnpublish.title).eq(0)
        );
        listDetail.status.should("contain.text", "Draft");
        // Should still be published
        const publishedPost = createdPosts[1];
        const publishedPostDetail = new PostListDetailObject(
          postList.postListElements.contains(publishedPost.title).eq(0)
        );
        publishedPostDetail.status.should("contain.text", "Published");
      });
    });
  });
});
