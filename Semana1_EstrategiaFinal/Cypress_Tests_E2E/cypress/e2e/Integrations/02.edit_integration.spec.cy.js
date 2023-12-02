// Test editing an integration
import {
  GhostObject,
  ListIntegrationsObject,
  CreateIntegrationObject,
} from "../../pageObjects";
import { generateIntegrations, generateIntegration } from "../../data/random";
import { faker } from "@faker-js/faker";

describe("Test edit integrations", () => {
  const ghost = new GhostObject();
  const listIntegrations = new ListIntegrationsObject();
  const integrationCreator = new CreateIntegrationObject();
  const integrations = [];
  beforeEach(() => {
    // Given I login as an admin user
    ghost.loginDefaultUser();
    // And I delete all integrations
    listIntegrations.goToIntegrations();
    listIntegrations.deleteAllIntegrations();
    // And I create two integrations
    generateIntegrations(2).forEach((integration, i) => {
      integrationCreator.createIntegrationFromData(integration).then((data) => {
        integrations[i] = data;
      });
    });
  });

  const validIntegrationsCases = [
    {
      description: "Change integration name",
      dataToChange: { name: generateIntegration().name },
    },
    {
      description: "Change integration description",
      dataToChange: {
        description: generateIntegration(true).description,
      },
    },
    {
      description: "Change integration name and description",
      dataToChange: generateIntegration(true),
    },
    {
      description: "Change name to very long",
      dataToChange: { name: faker.string.alpha({ length: 191 }) },
    },
    {
      description: "Change description to very long",
      dataToChange: { description: faker.string.alpha({ length: 2000 }) },
    },
    {
      description: "Remove integration description",
      dataToChange: { description: "" },
    },
  ];
  validIntegrationsCases.forEach((integrationData) => {
    it(integrationData.description, () => {
      // When I change the integration properties
      const intrgration = integrations[0];
      let integrationDetail = listIntegrations.getIntegration(intrgration.id);
      integrationDetail.editIntegration(integrationData.dataToChange);
      // Then the other integrations should not be changed
      const otherIntegration = integrations[1];
      integrationDetail = listIntegrations.getIntegration(otherIntegration.id);
      integrationDetail.name.should("have.value", otherIntegration.name);
      integrationDetail.description.should(
        "have.value",
        otherIntegration.description || ""
      );
      //  And Then the integration properties should be changed
      integrationDetail = listIntegrations.getIntegration(intrgration.id);
      const nameValue =
        "name" in integrationData.dataToChange
          ? integrationData.dataToChange.name
          : intrgration.name;
      integrationDetail.name.should("have.value", nameValue);
      const descriptionValue =
        "description" in integrationData.dataToChange
          ? integrationData.dataToChange.description
          : intrgration.description;
      integrationDetail.description.should(
        "have.value",
        descriptionValue || ""
      );
    });
  });
  const invalidIntegrationCases = [
    {
      description: "Edit integration with empty name",
      dataToChange: { name: "" },
      error: "Please enter a name",
    },
    {
      description: "Edit integration integration name 192 characters",
      dataToChange: { name: faker.string.alpha({ length: 192 }) },
      error: "Name is too long, max 191 chars",
    },
    {
      description: "Edit integration description 2001 characters",
      dataToChange: { description: faker.string.alpha({ length: 2001 }) },
    },
  ];
  invalidIntegrationCases.forEach((integrationData) => {
    it(integrationData.description, () => {
      // When I update an integration with wrong data
      const integration = integrations[0];
      const integrationDetail = listIntegrations.getIntegration(integration.id);
      integrationDetail.editIntegration(integrationData.dataToChange);
      // Then I see an error message
      if ("name" in integrationData.dataToChange) {
        integrationDetail.erroName.should("contain", integrationData.error);
      }
      integrationDetail.spanFailure.should("be.visible");
      // And the integrations should not be changed
      cy.reload();
      integrations.forEach((integration) => {
        const integrationDetail = listIntegrations.getIntegration(
          integration.id
        );
        integrationDetail.name.should("have.value", integration.name);
        integrationDetail.description.should(
          "have.value",
          integration.description || ""
        );
      });
    });
  });
});
