Feature: Pages

  @user1 @web
  Scenario: Crear una page nueva y eliminarla exitosamente, finalmente verificar que se encuentre listado
    Given I navigate to page "<GHOST_URL>"
    And I wait for 3 seconds
    When I enter email "<USERNAME1>"
    And I enter password "<PASSWORD1>"
    And I click on sing in button
    And I wait for 2 seconds
    And I click on settings button
    And I wait for 1 seconds
    And I click on labs button
    And I wait for 1 seconds
    And I click on delete database button
    And I wait for 1 seconds
    And I click on confirm delete database button
    Then I wait for 1 seconds
	And I click on pages button
	And I wait for 1 seconds
	And I click on new page button  
	And I wait for 1 seconds
	And I click on the title
	And I wait for 1 seconds
	And I enter text "Nueva pagina de prueba"
	And I wait for 1 seconds
	And I click on the description  
	And I wait for 1 seconds
	And I enter text "Descripcion de pagina nueva"
	And I wait for 1 seconds
	And I publish the page
	And I wait for 1 seconds
	And I continue the page
	And I wait for 1 seconds
	And I finish the published page
	And I wait for 1 seconds
	And I see a confirmation message
	And I navigate to page "<GHOST_URL>"
    And I wait for 2 seconds
	And I click on pages button
	And I wait for 1 seconds
	And I click over the first page
	And I wait for 2 seconds
	And I click button settings to delete
	And I wait for 1 seconds
	And I click button to delete page
	And I wait for 1 seconds
	And I confirm delete page
	And I wait for 2 seconds
	And I validate there is not page
	
		
  
	
    
	