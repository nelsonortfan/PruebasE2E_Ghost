Feature: Settings

  @user1 @web
  Scenario: Crear un tag y luego eliminar todo el contenido de la DB desde settings - labs - delete all content y finalmente verificar que no hayan tags listados
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
    And I click on settings button
    And I click on labs button
    And I click on delete database button
    And I click on confirm delete database button
    And I click on tags button
    Then I wait for 1 seconds
    And I should see the message "Start organizing your content."