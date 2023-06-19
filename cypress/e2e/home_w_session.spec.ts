describe("The home page (logged in)", () => {
  // login before each test
  beforeEach(() => {
    cy.login("alice.smith@example.com", "password");
  });

  it("should render the page", () => {
    // confirm that the user is logged in
    cy.get("header button").should("contain", "Sign out");
    cy.visit("/");
  });

  // render the page with a list of posts
  it("should render the page with a list of posts", () => {
    cy.visit("/");

    cy.get("li").should("have.length.greaterThan", 0);
  });

  // render the posts with a title, author, date, and comments count
  it("should render the posts with a title, author, date, and comments count", () => {
    cy.visit("/");

    cy.get("li")
      .first()
      .within(() => {
        cy.get(".postitem__title .postitem__title-link").should("exist");
        cy.get(".postitem__content .postitem__meta").should("exist");
        cy.get(".postitem__content .postitem__comment").should("exist");
      });
  });

  // User can vote if logged in
  it("should allow voting if logged in", () => {
    cy.visit("/");

    cy.get("li")
      .first()
      .within(() => {
        cy.get(".postitem__vote-container button").should("exist");
        cy.get(".postitem__vote-container button").should("not.be.disabled");
      });
  });

  // clicking on a post title should take the user to the post page
  it("should take the user to the post page when clicking on a post title", () => {
    cy.visit("/");

    // get url of first post and click title
    cy.get("li")
      .first()
      .within(() => {
        cy.get(".postitem__title .postitem__title-link").then(($el) => {
          const href = $el.attr("href");
          cy.get(".postitem__title .postitem__title-link").click();
          cy.url().should("include", href);
        });
      });
  });

  // clicking the new post button should take the user to the new post page
  it("should take the user to the new post page", () => {
    cy.visit("/");

    // find a with href="/posts/new" and click it
    cy.get("header a[href='/posts/new']").click();
    cy.url().should("include", "/posts/new");
  });

  // voting on a post should update the vote count
  it("should update the vote count when voting on a post", () => {
    cy.visit("/");

    cy.get("li")
      .first()
      .within(() => {
        cy.get(".postitem__vote-container button").click();
        cy.get(".postitem__vote-container .postitem__vote-count").should(
          "contain",
          "1"
        );
      });
  });
});
