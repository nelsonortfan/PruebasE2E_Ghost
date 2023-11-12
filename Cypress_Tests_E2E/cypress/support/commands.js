// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
require("cypress-iframe");
const { faker } = require("@faker-js/faker");

Cypress.Commands.add("goToPage", (pageUri) => {
  cy.visit(`${Cypress.env("ghost_url")}/#/${pageUri}`);
});
Cypress.Commands.add("login", () => {
  cy.session(Cypress.env("ghost_email"), () => {
    cy.goToPage("signin");
    cy.wait(1000);
    cy.get('input[name="identification"]').type(Cypress.env("ghost_email"));
    cy.get('input[name="password"]').type(Cypress.env("ghost_password"));
    cy.contains("Sign in").click();
    cy.wait(1000);
  });
});

Cypress.Commands.add("resetDataForTest", () => {
  cy.goToPage("settings/lab");
  cy.wait(1000);
  //press the red button called Delete to delete the database
  cy.get("button.gh-btn-red").click();
  //press delete button in the epm-modal-container modal to confirm the delete
  cy.get("button.gh-btn-red").then(($btn) => {
    const button = $btn.get(1);
    button.click();
  });
});

Cypress.Commands.add("createPost", (publish = true) => {
  cy.goToPage("dashboard");
  const postName = faker.word.words({ min: 1, max: 5 });
  const postContent = faker.lorem.paragraphs(3);
  // Visit the Posts page
  cy.get('a[title="New post"]').click();
  // Fill the form
  cy.get('textarea[placeholder="Post title"]').type(postName);
  cy.get(".koenig-lexical").eq(1).click().type(postContent);

  // Publish it
  if (publish) {
    cy.contains("Publish").click();
    cy.contains("Continue, final review").click();
    cy.contains("Publish post, right now").click();
  }
  cy.url().then((url) => {
    return cy.wrap({
      url: url,
      id: url.split("/").pop(),
      title: postName,
      content: postContent,
      publish: publish,
    });
  });
});

Cypress.Commands.add("deleteAllPosts", () => {
  cy.goToPage("posts");
  cy.wait(1000);
  const postSelector = ".gh-posts-list-item-group";
  cy.get("body").then(($body) => {
    // synchronously query for element
    if ($body.find(postSelector).length) {
      cy.get(postSelector).each(($post) => {
        const postIn = cy.wrap($post).find(".gh-posts-list-item");
        postIn.rightclick();
        cy.contains("Delete").click();
        cy.get(".gh-btn-red").click();
      });
    } else {
      // do something else
      cy.log("No posts to delete");
    }
  });
});