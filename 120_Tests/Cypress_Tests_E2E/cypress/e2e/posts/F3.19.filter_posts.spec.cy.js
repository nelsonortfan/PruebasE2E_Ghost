import {
  GhostObject,
  PostCreatorObject,
  PostListObject,
} from "../../pageObjects";
import { generatePosts } from "../../data/dynamic/posts";
const TOTAL_POSTS = 5;
describe("Test post list with filters", () => {
  const ghost = new GhostObject();
  const postCreator = new PostCreatorObject();
  const postList = new PostListObject();
  const publicPosts = [];
  const membersPosts = [];
  const paidPosts = [];

  beforeEach(() => {
    // Given I login and delete the existing data
    ghost.setupTest();
    generatePosts(TOTAL_POSTS).then((posts) => {
      // And I randomly  select the count for each access level
      const publicCount = Math.floor(Math.random() * TOTAL_POSTS);
      const membersCount = Math.floor(
        Math.random() * (TOTAL_POSTS - publicCount)
      );
      // And I add a public posts
      posts.slice(0, publicCount).forEach((post) => {
        postCreator
          .createPostFromObject({ ...post, accessLevel: "public" })
          .then((post) => {
            publicPosts.push(post);
          });
      });
      // And I add a members-only posts
      posts.slice(publicCount, publicCount + membersCount).forEach((post) => {
        postCreator
          .createPostFromObject({ ...post, accessLevel: "members" })
          .then((post) => {
            membersPosts.push(post);
          });
      });
      // And I add a paid members-only posts
      posts.slice(publicCount + membersCount).forEach((post) => {
        postCreator
          .createPostFromObject({ ...post, accessLevel: "paid" })
          .then((post) => {
            paidPosts.push(post);
          });
      });
    });
  });

  const postCases = [
    {
      description: "Filter posts by access level.",
      cases: [
        {
          level: "Public",
          expected: publicPosts,
        },
        {
          level: "Members-only",
          expected: membersPosts,
        },
        {
          level: "Paid members-only",
          expected: paidPosts,
        },
      ],
    },
  ];
  postCases.forEach((postData) => {
    it(postData.description, () => {
      // When I list the created posts
      postList.goToPosts();
      // Then there should be TOTAL_POSTS posts
      postList.postListElements.should("have.length", TOTAL_POSTS);
      postData.cases.forEach((postCase) => {
        // When I filter by access level
        postList.filterByAccess(postCase.level);
        // Then there should be the expected number of posts
        if (postCase.expected.length === 0) {
          // If there are no post message should be shown
          postList.noPostsMessage.should("be.visible");
          return;
        }
        postList.postListElements.should(
          "have.length",
          postCase.expected.length
        );
        // And the there should be the expected posts
        postCase.expected.forEach((post, index) => {
          postList.postListElements.should("contain", post.title);
        });
      });
    });
  });
});
