import { AutomationTest } from '../automation.test';

describe('Dashboard Home E2E - Selector', () => {
  beforeEach(() => {
    cy.server();
    cy.clearLocalStorage();
    cy.login();
    cy.visit('http://localhost:4200/#/main/home');
  });

  it('should display dashboard', () => {
    AutomationTest.get('h5.card-title').contains('play Rock-Paper-Scissors');
  });
});
