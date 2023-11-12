Feature: Tags

  @user1 @web
  Scenario: Crear un tag nuevo y guardarlo exitosamente, finalmente verificar que se encuentre listado
    Given I navigate to page "http://localhost:2368/ghost"
    And I wait for 3 seconds
    When I enter email "<USERNAME1>"
    And I enter password "<PASSWORD1>"
    And I click on sing in button
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


  @user2 @web
  Scenario: Editar un tag ya existente, cambiar el nombre y verificar que se encuentre listado con el nuevo nombre
    Given I navigate to page "http://localhost:2368/ghost"
    And I wait for 3 seconds
    When I enter email "<USERNAME1>"
    And I enter password "<PASSWORD1>"
    And I click on sing in button
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
    And I wait for 1 seconds
    And I click on tag with name "tag1"
    And I wait for 1 seconds
    And I fill the tag name "tag2"
    And I wait for 1 seconds
    And I fill the tag description "tag2 description"
    And I wait for 1 seconds
    And I click save tag button
    And I wait for 2 seconds
    And I click on tags button
    Then I wait for 5 seconds

  @user3 @web
  Scenario: Crear un tag, verificar que este listado, luego eliminar ese tag  y  verificar que no siga listado
    Given I navigate to page "http://localhost:2368/ghost"
    And I wait for 3 seconds
    When I enter email "<USERNAME1>"
    And I enter password "<PASSWORD1>"
    And I click on sing in button
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
    And I wait for 1 seconds
    And I click on tag with name "tag1"
    And I wait for 1 seconds
    And I click on delete tag button
    And I wait for 2 seconds
    And I click on confirm delete tag button
    And I wait for 2 seconds
    And I click on tags button
    Then I wait for 5 seconds

  @user4 @web
  Scenario: Crear 3 tags, 1 internos y 2 públicos, luego filtrar los tags existentes por tipo y verificar que haya el número correcto por tipo listado
    Given I navigate to page "http://localhost:2368/ghost"
    And I wait for 3 seconds
    When I enter email "<USERNAME1>"
    And I enter password "<PASSWORD1>"
    And I click on sing in button
    And I wait for 2 seconds
    And I click on tags button
    And I wait for 1 seconds
    And I click on new tag button
    And I wait for 1 seconds
    And I fill the tag name "publicTag1"
    And I wait for 1 seconds
    And I fill the tag description "public tag 1 description"
    And I wait for 1 seconds
    And I click save tag button
    And I wait for 2 seconds
    And I click on tags button
    And I wait for 1 seconds
    And I click on new tag button
    And I wait for 1 seconds
    And I fill the tag name "#internalTag1"
    And I wait for 1 seconds
    And I fill the tag description "internal tag 1 description"
    And I wait for 1 seconds
    And I click save tag button
    And I wait for 2 seconds
    And I click on tags button
    And I wait for 1 seconds
    And I click on new tag button
    And I wait for 1 seconds
    And I fill the tag name "#internalTag2"
    And I wait for 1 seconds
    And I fill the tag description "internal tag 2 description"
    And I wait for 1 seconds
    And I click save tag button
    And I wait for 2 seconds
    And I click on tags button
    And I wait for 1 seconds
    And I click on public tags button
    And I wait for 1 seconds
    And I click on internal tags button
    Then I wait for 5 seconds

  @user5 @web
  Scenario: Crear un tag con elementos inválidos y verificar errores, finalmente verificar que no se encuentre listado
    Given I navigate to page "http://localhost:2368/ghost"
    And I wait for 3 seconds
    When I enter email "<USERNAME1>"
    And I enter password "<PASSWORD1>"
    And I click on sing in button
    And I wait for 2 seconds
    And I click on tags button
    And I wait for 1 seconds
    And I click on new tag button
    And I wait for 1 seconds
    And I fill the tag name "tag1"
    And I wait for 1 seconds
    And I fill description with more than 500 elements
    And I wait for 1 seconds
    Then I wait for 5 seconds






