// Use faker to generate posts
import { faker } from "@faker-js/faker";

export const generatePosts = (total) => {
  const posts = [];
  for (let i = 0; i < total; i++) {
    posts.push({
      title: faker.word.words({ min: 1, max: 5 }),
      content: faker.lorem.paragraphs({ min: 1, max: 3 }),
      publish: true,
      feature: false,
    });
  }
  return posts;
};
