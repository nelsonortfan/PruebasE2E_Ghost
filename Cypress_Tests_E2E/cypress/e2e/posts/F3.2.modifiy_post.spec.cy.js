import {
  GhostObject,
  PostCreatorObject,
  PostDetailObject,
  PostListObject,
} from "../../pageObjects";
import postData from "../../data/aPriori/posts.json";
import { generatePosts } from "../../data/random";

describe("Edit the recently created post", () => {
  const ghost = new GhostObject();
  const postCreator = new PostCreatorObject();
  const postList = new PostListObject();
  let postToEdit = null;
  let notEditedpost = null;

  beforeEach(() => {
    // Given I login and delete the existing data
    ghost.setupTest();
    // And I create a post to change
    postCreator.createPostFromObject(postData[0]).then((post) => {
      postToEdit = post;
    });
    // And I create a post to not change
    postCreator.createPostFromObject(generatePosts(1)[0]).then((post) => {
      notEditedpost = post;
    });
  });

  const postCases = [
    { description: "Edit post with random data", post: generatePosts(1)[0] },
  ];
  postCases.forEach((postData) => {
    it(postData.description, () => {
      // When I open a created post
      const post = postData.post;
      const postDetail = new PostDetailObject(postToEdit.id);
      expect(postToEdit.title).to.not.equal(post.title);
      expect(postToEdit.content).to.not.equal(post.content);
      // And I set the title and content
      postDetail.setTitle(post.title);
      postDetail.setContent(post.content);
      postDetail.update();
      // Then I should see the post updated in the list
      postList.listPosts().then((currentPosts) => {
        // And there should  be two post
        expect(currentPosts).to.have.length(2);
        const postListDetail = currentPosts[0];
        // And the title should be updated
        postListDetail.title.should("contain", post.title);
        // And the post detail should contain the updated fields
        const postDetail = postList.getPost(postToEdit.id);
        postDetail.title.should("have.value", post.title);
        post.content.split("\n").forEach((line) => {
          postDetail.content.should("contain", line);
        });
      });
    });
  });
});
