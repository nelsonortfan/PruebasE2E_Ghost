// Test creating an integration
import {
  GhostObject,
  ListIntegrationsObject,
  CreateIntegrationObject,
} from "../../pageObjects";
import { generateIntegration } from "../../data/random";
import { faker } from "@faker-js/faker";

const integrationWithNamelenght = (length) => ({
  ...generateIntegration(),
  name: faker.string.alpha({ length }),
});
describe("Test create integrations", () => {
  const ghost = new GhostObject();
  const listIntegrations = new ListIntegrationsObject();
  const integrationCreator = new CreateIntegrationObject();

  beforeEach(() => {
    // Given I login as an admin user
    ghost.loginDefaultUser();
    // And I delete all integrations
    listIntegrations.goToIntegrations();
    listIntegrations.deleteAllIntegrations();
  });

  const validIntegrationsCases = [
    {
      description: "Create custom integration valid name",
      integration: generateIntegration(),
    },
    {
      description: "Create custom integration name 191 characters",
      integration: integrationWithNamelenght(191),
    },
  ];
  validIntegrationsCases.forEach((integrationData) => {
    it(integrationData.description, () => {
      // When I create an integration
      integrationCreator
        .createIntegrationFromData(integrationData.integration)
        .then((integration) => {
          // Then the integration should be created and listed
          const customIntegrations = listIntegrations.listCustomIntegration();
          customIntegrations.should("have.length", 1);
          customIntegrations
            .eq(0)
            .should("contain", integrationData.integration.name);
          // And the integration detail should contain the expected data
          const integrationDetail = listIntegrations.getIntegration(
            integration.id
          );
          integrationDetail.name.should(
            "have.value",
            integrationData.integration.name
          );
        });
    });
  });
  const invalidIntegrationCases = [
    {
      description: "Create custom integration with empty name",
      integration: integrationWithNamelenght(0),
      error: "Please enter a name",
    },
    {
      description: "Create custom integration name 192 characters",
      integration: integrationWithNamelenght(192),
      error: "Name is too long, max 191 chars",
    },
  ];
  invalidIntegrationCases.forEach((integrationData) => {
    it(integrationData.description, () => {
      // When I create an integration with wrong data
      integrationCreator.goToIntegrations();
      integrationCreator.openIntegrationModal();
      integrationCreator.setIntegrationName(integrationData.integration.name);
      integrationCreator.saveIntegration();
      // Then I see an error message
      integrationCreator.nameError.should("contain", integrationData.error);
      // And the integration should not be created
      listIntegrations.listCustomIntegration().should("have.length", 0);
    });
  });
});
