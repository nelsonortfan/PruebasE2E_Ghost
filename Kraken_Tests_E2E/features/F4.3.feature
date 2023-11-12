Feature: Tags

  @user3 @web
  Scenario: Crear un tag, verificar que este listado, luego eliminar ese tag  y  verificar que no siga listado
    Given I navigate to page "<GHOST_URL>"
    And I wait for 3 seconds
    When I enter email "<USERNAME1>"
    And I enter password "<PASSWORD1>"
    And I click on sing in button
    And I wait for 2 seconds
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
    And I click on delete tag button
    And I click on confirm delete tag button
    And I click on tags button
    Then I should see the message "Start organizing your content."