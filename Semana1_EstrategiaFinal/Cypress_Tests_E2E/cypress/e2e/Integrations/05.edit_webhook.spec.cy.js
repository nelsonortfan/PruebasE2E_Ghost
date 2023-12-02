// Edit  webhook for an integration
import {
  GhostObject,
  ListIntegrationsObject,
  CreateIntegrationObject,
  CreateWebhookObject,
  ListWebhookObject,
} from "../../pageObjects";
import {
  generateIntegration,
  generateWebhook,
  generateWebhooks,
} from "../../data/random";
import { faker } from "@faker-js/faker";

describe("Test edit a webhook for an integration", () => {
  const ghost = new GhostObject();
  const listIntegrations = new ListIntegrationsObject();
  const createIntegration = new CreateIntegrationObject();
  let createWebhook;
  let listWebhooks;
  let integration;
  const webhooks = generateWebhooks(2);

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
        // And I create a webhook for the integration
        createWebhook = new CreateWebhookObject(integration.id);
        listWebhooks = new ListWebhookObject(integration.id);
        webhooks.forEach((webhookData) => {
          createWebhook.createWebhook(webhookData);
        });
      });
  });

  const validWebhookCases = [
    {
      description: "Update name",
      updatedData: {
        name: generateWebhook().name,
      },
    },
    {
      description: "Update event",
      updatedData: {
        event: generateWebhook().event,
      },
    },
    {
      description: "Update url",
      updatedData: {
        url: generateWebhook().url,
      },
    },
    {
      description: "Update webhook with long name ",
      updatedData: {
        name: faker.string.alpha({ length: 191 }),
      },
    },
    {
      description: "Update a webhook with long url ",
      updatedData: {
        url: `https://wwww.${faker.string.alpha({ length: 200 })}.xom`,
      },
    },
  ];
  validWebhookCases.forEach((webhookData) => {
    it(webhookData.description, () => {
      const webhookToUpdate = webhooks[0];
      // When I update the  webhook wiht the given data
      const webhookeditor = listWebhooks.getWebhookEditor(webhookToUpdate.name);
      webhookeditor.editWebhook(webhookData.updatedData);
      cy.reload();
      // Then I see the webhook in the list
      const updatedWebhooks = listWebhooks.listWebhooks();
      updatedWebhooks.should("have.length", 2);

      if (webhookData.updatedData.name) {
        updatedWebhooks.should("not.contain", webhookToUpdate.name);
        updatedWebhooks.should("contain", webhookData.updatedData.name);
      }
      if (webhookData.updatedData.url) {
        updatedWebhooks.should("not.contain", webhookToUpdate.url);
        updatedWebhooks.should("contain", webhookData.updatedData.url);
      }
      // And the webhook has the correct data
      const updatedWebhook = listWebhooks.getWebhookEditor(
        webhookData.updatedData.name || webhookToUpdate.name
      );
      updatedWebhook.openModal();
      const expectedNameValue =
        webhookData.updatedData.name || webhookToUpdate.name;
      const expectedUrlValue =
        webhookData.updatedData.url || webhookToUpdate.url;
      const expectedEventValue =
        webhookData.updatedData.event || webhookToUpdate.event;

      updatedWebhook.name.should("have.value", expectedNameValue);
      updatedWebhook.url.should("have.value", expectedUrlValue);
      updatedWebhook.event.should("have.value", expectedEventValue);
    });
  });
  const invalidWebhookCases = [
    {
      description: "Update a webhook long name",
      updatedData: {
        name: faker.string.alpha({ length: 192 }),
      },
      error: {
        name: "Name is too long, max 191 chars",
      },
    },
    {
      description: "Update a webhook with empty data",
      updatedData: {
        name: "",
        url: "",
      },
      error: {
        name: "Please enter a name",
        url: "Please enter a target URL",
      },
    },
    {
      description: "Update webhook with invalid url",
      updatedData: {
        url: "invalidUrl",
      },
      error: {
        url: "Please enter a valid URL",
      },
    },
  ];
  invalidWebhookCases.forEach((webhookData) => {
    it(webhookData.description, () => {
      // When I update a webhook with the given data
      const webhookToUpdate = webhooks[0];
      const webhookeditor = listWebhooks.getWebhookEditor(webhookToUpdate.name);
      webhookeditor.editWebhook(webhookData.updatedData);
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

      webhookeditor.closeModal();
      // And the webhook should not be updated
      listWebhooks.listWebhooks().should("have.length", 2);
      webhooks.forEach((webhook) => {
        listWebhooks.listWebhooks().should("contain", webhook.name);
        listWebhooks.listWebhooks().should("contain", webhook.url);
      });
    });
  });
});
