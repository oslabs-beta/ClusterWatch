describe('First Test', () => {
  it('Tests', () => {
    expect(true).to.equal(true);
  })
})

describe('Testing the access to the page', () => {
  it('Visits the Cluster Watch app', () => {
    cy.visit('/');
  })
})

describe('Settings Test', () => {
  it('Contains Setup for Prometheus ', () => {
    cy.visit('/');
    cy.contains('Setup Prometheus');
  })
  it('Contains Setup for Grafana ', () => {
    cy.visit('/');
    cy.contains('Setup Grafana');
  })
  it('Contains Setup for Port Forwarding ', () => {
    cy.visit('/');
    cy.contains('Start Port Forwarding');
  })
})

describe('Settings Dashboard access', () => {
  it('Contains access to Dashboard ', () => {
    cy.visit('/');
    cy.contains('Go to dashboard').click();
    cy.url().should('include', '/Dashboard/Dashboard/Overview');
  })

})

describe('Canvas', () => {
beforeEach(() => {
  cy.visit('/Dashboard');
});
it ('should hover over the center', () => {
  // cy.get('canvas').then ($canvas =>{
  //   const cwidth:any = $canvas.width;
  //   const cheight:any = $canvas.height;
  //   const widthCenter:any = (cwidth/2);
  //   const heightCenter:any = (cheight/2);

  //   cy.wrap($canvas)
  //   .scrollIntoView()
  //   .trigger('mouseover')
  //cy.get("vis-tooltip").should('not.be.visible');
  cy.get("canvas").click();
  // cy.get('canvas').trigger('mouseover', {animationDistanceThreshold:1});
  cy.get('.vis-tooltip').should('be.visible');
  })
})
// })
