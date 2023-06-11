describe("E2E Test", () => {
  // beforeEach(() => {
  //   cy.exec("yarn db-prep");
  // });

  it("should render the page", () => {
    cy.visit("/");
  });

  // render the page with a list of comments
  it("should render the page with a list of comments", () => {
    cy.visit("/");
    cy.get("li").should("have.length.greaterThan", 0);
  });
});
