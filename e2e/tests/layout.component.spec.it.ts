describe('Layout E2E - Selector', () => {
  beforeEach(() => {
    cy.server();
    cy.clearLocalStorage();
  });

  it('should redirect to login if authentication is not done', () => {
    cy.visit('http://localhost:4200/#/main');
    cy.url().should('include', '/login');
  });
});
