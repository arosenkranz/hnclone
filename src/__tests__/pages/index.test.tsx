// create cypress tests
describe("Home page", () => {
  it("should render a list of posts", () => {
    cy.visit("/");
    cy.findByRole("list").should("be.visible");
  });
  it("should render a post item", () => {
    cy.visit("/");
    cy.findByRole("listitem").should("be.visible");
  });
});
