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
const { FAKER_SEED } = require("./utils");
faker.seed(FAKER_SEED);
Cypress.Commands.add("goToPage", (pageUri) => {
  cy.visit(`${Cypress.env("ghost_url")}/#/${pageUri}`);
  cy.wait(200);
});
Cypress.Commands.add("goToPageOld", (pageUri) => {
  cy.visit(`${Cypress.env("ghost_url_old")}/#/${pageUri}`);
  cy.wait(200);
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
Cypress.Commands.add("loginOld", () => {
  cy.session(Cypress.env("ghost_email"), () => {
    cy.goToPageOld("signin");
    cy.wait(1000);
    cy.get('input[name="identification"]').type(Cypress.env("ghost_email"));
    cy.get('input[name="password"]').type(Cypress.env("ghost_password"));
    cy.contains("Sign in").click();
    cy.wait(1000);
  });
});

Cypress.Commands.add("resetDataForTest", () => {
  cy.goToPage("settings/labs");
  cy.wait(1000);
  //press the red button called Delete to delete the database
  cy.get("button.gh-btn-red").click();
  //press delete button in the epm-modal-container modal to confirm the delete
  cy.get("button.gh-btn-red").then(($btn) => {
    const button = $btn.get(1);
    button.click();
  });
  cy.get(".gh-alert-close").click();
  cy.wait(500);
});

Cypress.Commands.add("createPost", (publish = true, screenshotTaker = null) => {
  cy.goToPage("dashboard");
  screenshotTaker && screenshotTaker.screenshot("Inicio agregar post");
  const postName = faker.word.words({ min: 1, max: 5 });
  const postContent = faker.lorem.paragraphs(3);
  // Visit the Posts page
  cy.get('a[title="New post"]').click();
  screenshotTaker && screenshotTaker.screenshot("Agregar post");
  // Fill the form
  cy.get('textarea[placeholder="Post title"]').type(postName);
  screenshotTaker && screenshotTaker.screenshot("Ingresar titulo");
  cy.get(".koenig-lexical").eq(1).click().type(postContent);
  screenshotTaker && screenshotTaker.screenshot("Ingresar contenido");
  // Publish it
  if (publish) {
    cy.contains("Publish").click();
    screenshotTaker && screenshotTaker.screenshot("Publicar post");
    cy.contains("Continue, final review").click();
    screenshotTaker && screenshotTaker.screenshot("Continuar");
    cy.contains("right now").click();
    screenshotTaker && screenshotTaker.screenshot("Publicar post ahora");
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

Cypress.Commands.add("deleteAllMembers", () => {
  cy.goToPage("members");
  cy.wait(1000);
  const memberSelector = ".gh-list-data";
  cy.get("body").then(($body) => {
    // synchronously query for element
    for (let i = 0; i < $body.find(memberSelector).length / 5; i++) {
      cy.log($body.find(memberSelector).length / 5);
      cy.get(".gh-members-list-name").then(($header) => {
        $header[0].click();
      });
      cy.wait(1000);
      cy.get('button[data-test-button="member-actions"]').click();
      cy.wait(300);
      cy.get('button[data-test-button="delete-member"]').click();
      cy.wait(300);
      cy.get('button[data-test-button="confirm"]').click();
      cy.wait(300);
    }
    if ($body.find(memberSelector).length / 5 == 0) {
      cy.log("No members to delete");
    }
  });
});

Cypress.Commands.add("deleteAllMembersOld", () => {
  cy.goToPageOld("members");
  cy.wait(1000);
  const memberSelector = ".gh-list-data";
  cy.get("body").then(($body) => {
    // synchronously query for element
    for (let i = 0; i < $body.find(memberSelector).length / 5; i++) {
      cy.log($body.find(memberSelector).length / 5);
      cy.get(".gh-members-list-name").then(($header) => {
        $header[0].click();
      });
      cy.wait(1000);
      cy.get('button[class="gh-btn gh-btn-red gh-btn-icon mt14"]').click();
      cy.wait(300);
      cy.get('button[class="gh-btn gh-btn-red gh-btn-icon ember-view"]').click();
      cy.wait(300);
    }
    if ($body.find(memberSelector).length / 5 == 0) {
      cy.log("No members to delete");
    }
  });
});

Cypress.Commands.add("takeScreenshot", (filePath) => {
  cy.screenshot(filePath, { overwrite: true });
});
