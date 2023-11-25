// Use faker to generate posts
import { faker } from "@faker-js/faker";

export const generateTags = (total) => {
  const tags = [];
  for (let i = 0; i < total; i++) {
    tags.push({
      name: faker.word.words(1),
      description: faker.word.words({ min: 1, max: 5 }),
    });
  }
  return tags;
};
