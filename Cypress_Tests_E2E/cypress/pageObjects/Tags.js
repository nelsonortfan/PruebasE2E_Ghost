class TagCreatorObject {
  createTag(name, description) {
    cy.goToPage("tags");
    cy.contains("New tag").click();
    cy.get("#tag-name").type(name);
    cy.get("#tag-description").type(description);
    cy.contains("Save").click();
  }
}

export { TagCreatorObject };
