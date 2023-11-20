const { faker } = require("@faker-js/faker");
const { ScreenshotHelper, FAKER_SEED } = require("../../support/utils");
faker.seed(FAKER_SEED);
describe("Test set mailgun credentias", () => {
  beforeEach(() => {
    cy.viewport(1000, 660);
    cy.login();
  });
  afterEach(() => {
    // Clean mailgun configuration
    cy.goToPage(`settings`);
    cy.contains("Email newsletter").click();
    cy.get(".gh-expandable-block").eq(3).contains("Expand").click();
    cy.get("#mailgun-domain").clear();
    cy.get("#mailgun-private-api").clear();
    cy.contains("Save").click();
  });
  it("Should set mailgun credentials", () => {
    const screenshotTaker = new ScreenshotHelper("settings/F5.1");
    const mailgunDomain = faker.internet.domainName();
    const mailgunApiKey = faker.internet.password();
    const openSettings = () => {
      cy.goToPage(`settings`);
      screenshotTaker.screenshot("Abrir settings");
      cy.contains("Email newsletter").click();
      screenshotTaker.screenshot("Abrir email newsletter");
      cy.get(".gh-expandable-block").eq(3).contains("Expand").click();
      cy.wait(200);
      screenshotTaker.screenshot("Abrir mailgun");
    };
    openSettings();
    cy.get("#mailgun-domain").clear();
    cy.get("#mailgun-domain").type(mailgunDomain);
    screenshotTaker.screenshot("Ingresar mailgun domain");
    cy.get("#mailgun-private-api").clear();
    cy.get("#mailgun-private-api").type(mailgunApiKey);
    screenshotTaker.screenshot("Ingresar mailgun api key");
    cy.contains("Save").click();
    cy.goToPage(`dashboard`);
    openSettings();
    // Values must be correctly set
    cy.get("#mailgun-domain").should("have.value", mailgunDomain);
    cy.get("#mailgun-private-api").should("have.value", mailgunApiKey);
  });
});
