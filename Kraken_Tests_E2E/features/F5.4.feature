Feature: Settings
  @user1 @web
  Scenario: Cambiar el título del sitio y verificar que se haya guardado bien
    Given I navigate to page "<GHOST_URL>"
    And I wait for 3 seconds
    When I enter email "<USERNAME1>"
    And I enter password "<PASSWORD1>"
    And I click on sing in button
    And I wait for 2 seconds
    And I click on settings button
    And I wait for 1 seconds
    And I click general button
    And I wait for 1 seconds
    And I click title expand button
    And I enter new title name "$name_1"
    And I click general save button
    Then I see the site title "$$name_1"