import {
  GhostObject,
  PostCreatorObject,
  PostListObject,
} from "../../pageObjects";
import postData from "../../data/aPriori/posts.json";
describe("Test create a post with a youtube link", () => {
  const ghost = new GhostObject();
  const postCreator = new PostCreatorObject();
  const postList = new PostListObject();

  beforeEach(() => {
    // Given I login and delete the existing data
    ghost.setupTest();
  });

  const postCases = [
    { description: "Create a post with 1 video", post: postData[5] },
  ];
  postCases.forEach((postData) => {
    it(postData.description, () => {
      cy.on("uncaught:exception", (err, runnable) => {
        return false;
      });
      // When I create a post using a yotube video
      const post = postData.post;
      postCreator.createPostFromObject(post).then((createdPost) => {
        // Then the post should be created
        postList.listPosts().then((currentPosts) => {
          // And there should only be one post
          expect(currentPosts).to.have.length(1);
          // And the post detail should contain the number of expected embeds
          const postDetail = postList.getPost(createdPost.id);
          postDetail.youtubeVideos.should(
            "have.length",
            post.youtubeVideos.length
          );
        });
      });
    });
  });
});
