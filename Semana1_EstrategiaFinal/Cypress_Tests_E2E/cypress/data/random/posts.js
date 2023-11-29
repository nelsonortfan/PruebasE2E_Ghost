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

export const generatePost = () => generatePosts(1)[0];

export const generateMetadatas = (total) => {
  const metadata = [];
  for (let i = 0; i < total; i++) {
    metadata.push({
      title: faker.string.alpha({ length: { min: 10, max: 60 } }),
      description: faker.string.alpha({ length: { min: 10, max: 145 } }),
    });
  }
  return metadata;
};

export const generateMetadata = () => generateMetadatas(1)[0];

export const generateXCard = () => ({
  title: faker.string.alpha({ length: { min: 10, max: 60 } }),
  description: faker.string.alpha({ length: { min: 10, max: 145 } }),
});

export const generateFacebookCard = () => ({
  title: faker.string.alpha({ length: { min: 5, max: 60 } }),
  description: faker.string.alpha({ length: { min: 5, max: 200 } }),
});
