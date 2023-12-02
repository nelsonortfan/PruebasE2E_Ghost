// Genreate integrations
import { faker } from "@faker-js/faker";
export const generateIntegrations = (total, withDescription = false) => {
  const integrations = [];

  for (let i = 0; i < total; i++) {
    const integration = {
      name: faker.word.words({
        min: 1,
        max: 5,
      }),
    };
    if (withDescription) {
      integration.description = faker.lorem.sentence();
    }
    integrations.push(integration);
  }

  return integrations;
};

export const generateIntegration = (...args) =>
  generateIntegrations(1, ...args)[0];

export const generateWebhooks = (total) => {
  const webhooks = [];

  for (let i = 0; i < total; i++) {
    const webhook = {
      name: faker.word.words({
        min: 1,
        max: 5,
      }),
      event: faker.helpers.arrayElement([
        "site.changed",
        "post.added",
        "post.edited",
        "post.published.edited",
      ]),
      url: faker.internet.url(),
    };
    webhooks.push(webhook);
  }

  return webhooks;
};

export const generateWebhook = () => generateWebhooks(1)[0];
