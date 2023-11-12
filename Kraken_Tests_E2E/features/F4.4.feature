Feature: Tags

  @user4 @web
  Scenario: Crear 3 tags, 1 internos y 2 públicos, luego filtrar los tags existentes por tipo y verificar que haya el número correcto por tipo listado
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
    And I fill the tag name "publicTag1"
    And I fill the tag description "public tag 1 description"
    And I click save tag button
    And I click on tags button
    And I click on new tag button
    And I fill the tag name "#internalTag1"
    And I fill the tag description "internal tag 1 description"
    And I click save tag button
    And I click on tags button
    And I click on new tag button
    And I fill the tag name "#internalTag2"
    And I fill the tag description "internal tag 2 description"
    And I click save tag button
    And I click on tags button
    And I click on public tags button
    And I click on internal tags button
    Then I should see "2" tags listed