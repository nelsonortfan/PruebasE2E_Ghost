Feature: Tags

  @user2 @web
  Scenario: Editar un tag ya existente, cambiar el nombre y verificar que se encuentre listado con el nuevo nombre
    Given I navigate to page "<GHOST_URL>"
    And I wait for 3 seconds
    When I enter email "<USERNAME1>"
    And I enter password "<PASSWORD1>"
    And I click on sing in button
    And I click on settings button
    And I click on labs button
    And I click on delete database button
    And I click on confirm delete database button
    And I click on tags button
    And I click on new tag button
    And I fill the tag name "tag1"
    And I fill the tag description "tag1 description"
    And I click save tag button
    And I click on tags button
    And I click on tag with name "tag1"
    And I fill the tag name "tag2"
    And I fill the tag description "tag2 description"
    And I click save tag button
    And I click on tags button
    Then I wait for 1 seconds
    And I should see the tag "tag2" listed