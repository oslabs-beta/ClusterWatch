describe('First Test', () => {
  it('Tests', () => {
    expect(true).to.equal(true);
  });
});

describe('Testing the access to the page', () => {
  it('Visits the Cluster Watch app', () => {
    cy.visit('/');
  });
});

describe('Settings Test', () => {
  it('Contains Setup for Prometheus ', () => {
    cy.visit('/');
    cy.contains('Setup Prometheus');
  });
  it('Contains Setup for Grafana ', () => {
    cy.visit('/');
    cy.contains('Setup Grafana');
  });
  it('Contains Setup for Port Forwarding ', () => {
    cy.visit('/');
    cy.contains('Start Port Forwarding');
  });
});

describe('Settings Dashboard access', () => {
  it('Contains access to Dashboard ', () => {
    cy.visit('/');
    cy.contains('Go to dashboard').click();
    cy.url().should('include', '/Dashboard/Dashboard/Overview');
  });
});

describe('Canvas', () => {
  beforeEach(() => {
    cy.visit('/Dashboard');
  });
  it('should hover over the center', () => {
    cy.get('canvas').click();
    cy.get('.vis-tooltip').should('be.visible');
  });
});
