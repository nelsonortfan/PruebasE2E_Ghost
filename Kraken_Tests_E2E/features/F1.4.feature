Feature: Members
  @user1 @web
  Scenario: Crear un miembro y buscarlo a través de su email por filtro
    Given I navigate to page "<GHOST_URL>"
    And I wait for 3 seconds
    When I enter email "<USERNAME1>"
    And I enter password "<PASSWORD1>"
    And I click on sing in button
    And I wait for 2 seconds
    And I click on members button
    And I wait for 1 seconds
    And I click on new member button
    And I wait for 1 seconds
    And I enter member name "$name_1"
    And I enter member email "$email_1"
    And I click save member button
    And I wait for 1 seconds
    And I click on members button
    And I click on filter button
    And I select email option
    And I enter member email "$$email_1" in filter
    And I click Apply filters
    Then I see the member email "$$email_1"