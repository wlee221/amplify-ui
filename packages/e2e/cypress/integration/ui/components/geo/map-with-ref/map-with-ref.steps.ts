import { Then, When } from 'cypress-cucumber-preprocessor/steps';

When('I click the fly to button', () => {
  cy.findByRole('button', { name: /fly/gi }).click();
});

Then('I see the map transition to San Francisco', () => {
  cy.waitForIdleMap();
  cy.window().then((windowObj) => {
    const { lat, lng } = windowObj['map'].getCenter();
    cy.wrap(+lat.toFixed(2)).should('eq', 37.77);
    cy.wrap(+lng.toFixed(2)).should('eq', -122.43);
  });
});
