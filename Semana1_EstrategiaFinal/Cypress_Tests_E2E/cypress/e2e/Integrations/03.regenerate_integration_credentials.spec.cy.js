// Regenerate webhook credentials
import {
  GhostObject,
  ListIntegrationsObject,
  CreateIntegrationObject,
} from "../../pageObjects";
import { generateIntegration } from "../../data/random";

describe("Test regenerate integration credentials", () => {
  const ghost = new GhostObject();
  const listIntegrations = new ListIntegrationsObject();
  const integrationCreator = new CreateIntegrationObject();
  let integration;
  beforeEach(() => {
    // Given I login as an admin user
    ghost.loginDefaultUser();
    // And I delete all integrations
    listIntegrations.goToIntegrations();
    listIntegrations.deleteAllIntegrations();
    // And I create a integration
    integrationCreator
      .createIntegrationFromData(generateIntegration())
      .then((data) => {
        integration = data;
      });
  });

  const validIntegrationsCases = [
    {
      description: "Regenerate  content api key",
      field: "contentApiKey",
      successMessage: "Content API Key was successfully regenerated",
    },
    {
      description: "Regenerate  admin api key",
      field: "adminApiKey",
      successMessage: "Admin API key was successfully regenerated",
    },
  ];
  validIntegrationsCases.forEach((integrationData) => {
    it(integrationData.description, () => {
      // When I change the regenrate the field
      let integrationDetail = listIntegrations.getIntegration(integration.id);
      integrationDetail.contentApiKey.as("keyBefore");
      integrationDetail.regenerateField(integrationData.field);
      // Then thefield generated is differnt to the previous one
      integrationDetail.contentApiKey.as("keyAfter");
      cy.get("@keyBefore").should("not.eq", "@keyAfter");
      // And I see a success message
      integrationDetail.successMessage.should("be.visible");
      integrationDetail.successMessage.should(
        "contain",
        integrationData.successMessage
      );
    });
  });
});
