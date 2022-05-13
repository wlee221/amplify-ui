Feature: Map with Ref

  Testing forwarding a ref to the MapView component.

  Background:
    Given I'm running the example "ui/components/geo/map-with-ref"

  @react
  Scenario: Map transitions based on ref event handler
    When I click the fly to button
    Then I see the map transition to San Francisco
