Feature: Tags

  @user1 @web
  Scenario: Crear un tag nuevo y guardarlo exitosamente, finalmente verificar que se encuentre listado
    Given I navigate to page "http://localhost:2368/ghost"
    And I wait for 3 seconds
    When I enter email "<USERNAME1>"
    And I enter password "<PASSWORD1>"
    And I click on sing in button
    And I wait for 2 seconds
    And I reset preexisting data
    And I wait for 2 seconds
    And I click on tags button
    And I wait for 1 seconds
    And I click on new tag button
    And I wait for 1 seconds
    And I fill the tag name "tag1"
    And I wait for 1 seconds
    And I fill the tag description "tag1 description"
    And I wait for 1 seconds
    And I click save tag button
    And I wait for 2 seconds
    And I click on tags button
    Then I wait for 5 seconds