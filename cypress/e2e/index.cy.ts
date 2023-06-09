describe("E2E Test", () => {
  beforeEach(() => {
    cy.exec("yarn db-prep");
  });

  it("should render the page", () => {
    cy.visit("/");
  });
});
