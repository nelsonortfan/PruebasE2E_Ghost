// Test create a webhook for an integration
import {
  GhostObject,
  ListIntegrationsObject,
  CreateIntegrationObject,
  CreateWebhookObject,
  ListWebhookObject,
} from "../../pageObjects";
import { generateIntegration, generateWebhook } from "../../data/random";
import { faker } from "@faker-js/faker";

describe("Test create a webhook for an integration", () => {
  const ghost = new GhostObject();
  const listIntegrations = new ListIntegrationsObject();
  const createIntegration = new CreateIntegrationObject();
  let createWebhook;
  let listWebhooks;
  let integration;

  beforeEach(() => {
    // Given I login as an admin user
    ghost.loginDefaultUser();
    // And I delete all integrations
    listIntegrations.goToIntegrations();
    listIntegrations.deleteAllIntegrations();
    // And I create a custom integration
    createIntegration
      .createIntegrationFromData(generateIntegration())
      .then((data) => {
        integration = data;
        createWebhook = new CreateWebhookObject(integration.id);
        listWebhooks = new ListWebhookObject(integration.id);
      });
  });

  const validWebhookCases = [
    {
      description: "Create a webhook with valid values",
      webhook: generateWebhook(),
    },
    {
      description: "Create a webhook with long name ",
      webhook: {
        ...generateWebhook(),
        name: faker.string.alpha({ length: 191 }),
      },
    },
    {
      description: "Create a webhook with long url ",
      webhook: {
        ...generateWebhook(),
        url: `https://wwww.${faker.string.alpha({ length: 200 })}.xom`,
      },
    },
  ];
  validWebhookCases.forEach((webhookData) => {
    it(webhookData.description, () => {
      // When I create webhook wiht the given data
      createWebhook.createWebhook(webhookData.webhook);
      // Then I see the webhook in the list
      const webhooks = listWebhooks.listWebhooks();
      webhooks.should("have.length", 1);
      // And the webhook has the correct data
      webhooks
        .eq(0)
        .should("contain", webhookData.webhook.name)
        .should("contain", webhookData.webhook.url);
    });
  });
  const invalidWebhookCases = [
    {
      description: "Create a webhook with a long name",
      webhook: {
        ...generateWebhook(),
        name: faker.string.alpha({ length: 192 }),
      },
      error: {
        name: "Name is too long, max 191 chars",
      },
    },
    {
      description: "Create a webhook with empty data",
      webhook: {},
      error: {
        name: "Please enter a name",
        event: "Please select an event",
        url: "Please enter a target URL",
      },
    },
    {
      description: "Create webhook with invalid url",
      webhook: {
        ...generateWebhook(),
        url: "invalidUrl",
      },
      error: {
        url: "Please enter a valid URL",
      },
    },
  ];
  invalidWebhookCases.forEach((webhookData) => {
    it(webhookData.description, () => {
      // When I create webhook wiht the given data
      createWebhook.createWebhook(webhookData.webhook);
      // Then I see the  error messages
      if (webhookData.error.name) {
        createWebhook.nameError.should("contain", webhookData.error.name);
      }
      if (webhookData.error.event) {
        createWebhook.eventError.should("contain", webhookData.error.event);
      }
      if (webhookData.error.url) {
        createWebhook.urlError.should("contain", webhookData.error.url);
      }

      // And the integration should not be created
      listWebhooks.listWebhooks().should("have.length", 0);
    });
  });
});
