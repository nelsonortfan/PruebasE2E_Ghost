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
  cy.fixture("ghost_credentials.json").then((credentials) => {
    cy.session(credentials.email, () => {
      cy.goToPage("signin");
      cy.get('input[name="identification"]').type(credentials.email);
      cy.get('input[name="password"]').type(credentials.password);
      cy.contains("Sign in").click();
      cy.wait(1000);
    });
  });
});

Cypress.Commands.add("createPost", () => {
  cy.goToPage("dashboard");
  const postName = faker.word.words({ min: 1, max: 5 });
  const postContent = faker.lorem.paragraphs(3);
  // Visit the Posts page
  cy.get('a[title="New post"]').click();
  // Fill the form
  cy.get('textarea[placeholder="Post title"]').type(postName);
  cy.get(".koenig-lexical").eq(1).click().type(postContent);

  // Publish it

  cy.contains("Publish").click();
  cy.contains("Continue, final review").click();
  cy.contains("Publish post, right now").click();
  cy.url().then((url) => {
    return cy.wrap({
      url: url,
      id: url.split("/").pop(),
      title: postName,
      content: postContent,
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
