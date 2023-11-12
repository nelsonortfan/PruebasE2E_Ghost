Feature: Members
  @user1 @web
  Scenario: Crear un miembro y buscarlo a través del buscador
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
    And I search the member name "$$name_1"
    Then I see the member name "$$name_1"