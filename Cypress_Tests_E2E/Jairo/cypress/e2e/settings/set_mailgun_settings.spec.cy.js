const { faker } = require("@faker-js/faker");

describe("Test set mailgun credentias", () => {
  beforeEach(() => {
    cy.login();
  });
  it("Should set mailgun credentials", () => {
    const mailgunDomain = faker.internet.domainName();
    const mailgunApiKey = faker.internet.password();
    cy.log(mailgunDomain);
    cy.log(mailgunApiKey);
    const openSettings = () => {
      cy.goToPage(`settings`);
      cy.contains("Email newsletter").click();
      cy.get(".gh-expandable-block").eq(3).contains("Expand").click();
    };
    openSettings();
    cy.get("#mailgun-domain").clear();
    cy.get("#mailgun-domain").type(mailgunDomain);
    cy.get("#mailgun-private-api").clear();
    cy.get("#mailgun-private-api").type(mailgunApiKey);
    cy.contains("Save").click();
    cy.goToPage(`dashboard`);
    openSettings();
    // Values must be correctly set
    cy.get("#mailgun-domain").should("have.value", mailgunDomain);
    cy.get("#mailgun-private-api").should("have.value", mailgunApiKey);
  });
});
