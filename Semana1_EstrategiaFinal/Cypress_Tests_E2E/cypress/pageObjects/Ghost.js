// Main interaction with the Ghost

class GhostObject {
  // Login
  login(email, password) {
    cy.session(email, () => {
      cy.goToPage("signin");
      cy.get('input[name="identification"]').type(email);
      cy.get('input[name="password"]').type(password);
      cy.contains("Sign in").click();
      // Dashboard should be present
      cy.get('a[data-test-nav="dashboard"]').should("be.visible");
    });
  }

  resetDataForTest() {
    return cy.resetDataForTest();
  }

  loginDefaultUser() {
    this.login(Cypress.env("ghost_email"), Cypress.env("ghost_password"));
  }

  setupTest() {
    // Ensure there is a session and all data is wiped out (minus members).
    this.loginDefaultUser();
    return this.resetDataForTest();
  }
}

export { GhostObject };
