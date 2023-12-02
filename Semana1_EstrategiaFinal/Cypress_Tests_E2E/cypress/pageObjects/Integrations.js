const goToIntegrations = () => {
  cy.goToPage("settings/integrations");
};

class DetailIntegrationObject {
  id;
  constructor(id) {
    this.id = id;
    this.goToPage();
  }

  goToPage() {
    cy.goToPage(`settings/integrations/${this.id}`);
  }

  get name() {
    return cy.get("#integration_name");
  }
  get description() {
    return cy.get("#integration_description");
  }
  setName(name) {
    this.name.clear();
    if (name) {
      this.name.type(name);
    }
  }

  setDescription(description) {
    this.description.clear();
    if (description) {
      this.description.invoke("val", description);
      this.description.trigger("input");
    }
  }

  get erroName() {
    return cy.get('p[data-test-error="name"]');
  }

  get spanFailure() {
    return cy.get('span[data-test-task-button-state="failure"]');
  }

  saveIntegration() {
    cy.get('button[data-test-button="save"]').click();
  }

  editIntegration(integrationData) {
    if ("name" in integrationData) {
      this.setName(integrationData.name);
    }
    if ("description" in integrationData) {
      this.setDescription(integrationData.description);
    }
    this.saveIntegration();
  }

  regenerateField(field) {
    const index = field === "contentApiKey" ? 0 : 1;
    const containsText =
      field === "contentApiKey"
        ? "Regenerate Content API Key"
        : "Regenerate Admin API Key";
    cy.get('button[data-tooltip="Regenerate"]')
      .eq(index)
      .click({ force: true });
    cy.get(".gh-btn-red.gh-btn").contains(containsText).click();
  }
  get contentApiKey() {
    return cy.get('span[data-test-text="content-key"');
  }

  get successMessage() {
    return cy.get(".green");
  }
}

const CUSTOM_INTEGRATION_SELECTOR = "div[data-test-custom-integration]";
class ListIntegrationsObject {
  goToIntegrations() {
    // Go to dashboard
    cy.goToPage("dashboard");
    // Click settings
    cy.get('a[data-test-nav="settings"]').click();
    // Click integrations
    cy.get('a[data-test-nav="integrations"]').click();
  }
  deleteAllIntegrations() {
    // If there are integrations delete them one by one
    // Check if there are any integrations
    cy.get("body").then(($body) => {
      if ($body.find(CUSTOM_INTEGRATION_SELECTOR).length > 0) {
        cy.get(CUSTOM_INTEGRATION_SELECTOR)
          .eq(0)
          .then(($el) => {
            cy.wrap($el)
              .find("a")
              .should("have.attr", "href")
              .then((href) => {
                const id = href.split("/")[3];
                cy.goToPage(`settings/integrations/${id}`);
                cy.get('button[data-test-button="delete-integration"]').click();
                cy.contains("Delete Integration").click();
                this.deleteAllIntegrations();
              });
          });
      } else {
        cy.log("No integrations to delete");
      }
    });
  }

  get customIntegrations() {
    return cy.get(CUSTOM_INTEGRATION_SELECTOR);
  }

  listCustomIntegration() {
    // Return a list of integrations
    goToIntegrations();
    return this.customIntegrations;
  }
  getIntegration(id) {
    return new DetailIntegrationObject(id);
  }
}

class CreateIntegrationObject {
  get name() {
    return cy.get('input[id="new-integration-name"]');
  }
  setIntegrationName(name) {
    this.name.clear();
    if (name) {
      this.name.type(name);
    }
  }

  get nameError() {
    return cy.get('p[data-test-error="new-integration-name"]');
  }
  goToIntegrations() {
    goToIntegrations();
  }
  openIntegrationModal() {
    cy.get('a[data-test-button="new-integration"]').click();
  }
  saveIntegration() {
    cy.get('button[data-test-button="create-integration"]').click();
  }

  createIntegrationFromData(integrationData) {
    this.goToIntegrations();
    this.openIntegrationModal();
    this.setIntegrationName(integrationData.name);
    this.saveIntegration();
    return cy.url().then((url) => {
      return cy.wrap({
        ...integrationData,
        url: url,
        id: url.split("/").pop(),
      });
    });
  }
}

class WebhookDetailObject {
  get name() {
    return cy.get("#webhook-name");
  }

  get event() {
    return cy.get("#webhook-event");
  }
  get url() {
    return cy.get("#webhook-targetUrl");
  }

  setName(name) {
    this.name.clear();
    if (name) {
      this.name.invoke("val", name);
      this.name.trigger("input");
    }
  }

  setEvent(event) {
    if (event) {
      this.event.select(event);
    }
  }
  setUrl(url) {
    this.url.clear();
    if (url) {
      this.url.invoke("val", url);
      this.url.trigger("input");
    }
  }

  get nameError() {
    return cy.get('p[data-test-error="webhook-name"]');
  }

  get urlError() {
    return cy.get('p[data-test-error="webhook-targetUrl"]');
  }
  get eventError() {
    return cy.get('p[data-test-error="webhook-event"]');
  }
  saveWebhook() {
    cy.get('button[data-test-button="save-webhook"]').click();
  }

  closeModal() {
    cy.get('button[data-test-button="cancel-webhook"]').click();
  }
}
class CreateWebhookObject extends WebhookDetailObject {
  constructor(integrationId) {
    super();
    this.integrationId = integrationId;
  }
  goToPage() {
    cy.goToPage(`settings/integrations/${this.integrationId}/`);
  }

  openModal() {
    cy.get('a[data-test-link="add-webhook"]').click();
  }

  createWebhook(webhookData) {
    this.goToPage();
    this.openModal();
    this.setName(webhookData.name);
    this.setEvent(webhookData.event);
    this.setUrl(webhookData.url);
    this.saveWebhook();
  }
}

class EditWebhookObject extends WebhookDetailObject {
  constructor($el) {
    super();
    this.$el = $el;
  }

  openModal() {
    this.$el.find("span[data-test-newsletter-menu-trigger]").click();
    cy.get('a[data-test-link="edit-webhook"]').click();
  }

  editWebhook(data) {
    this.openModal();
    if ("name" in data) {
      this.setName(data.name);
    }
    if ("event" in data) {
      this.setEvent(data.event);
    }
    if ("url" in data) {
      this.setUrl(data.url);
    }
    this.saveWebhook();
  }
}

class ListWebhookObject {
  constructor(integrationId) {
    this.integrationId = integrationId;
  }
  goToPage() {
    cy.goToPage(`settings/integrations/${this.integrationId}/`);
  }
  get webhooks() {
    return cy.get("tr.gh-list-row.hide-child");
  }
  listWebhooks() {
    return this.webhooks;
  }

  getWebhookEditor(name) {
    // Select webhook from the list
    const webhook = this.webhooks.contains(name).parent();
    return new EditWebhookObject(webhook);
  }
}

export {
  ListIntegrationsObject,
  CreateIntegrationObject,
  CreateWebhookObject,
  ListWebhookObject,
};
