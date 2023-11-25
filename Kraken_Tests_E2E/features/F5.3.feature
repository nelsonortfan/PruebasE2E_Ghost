Feature: Settings

  @user1 @web
  Scenario: Actualizar valores de Staff en Settings
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
	And I click on settings button
	And I wait for 1 seconds
	And I click on Staff button
	And I wait for 1 seconds
	And I select Owner
	And I wait for 1 seconds
	And I click to update user location
	And I wait for 1 seconds
	And I click to update user WebSite
	And I wait for 1 seconds
	And I click to update user Facebook
	And I wait for 1 seconds
	And I save the changes in Staff
	And I wait for 3 seconds
	And I click on settings button
	And I wait for 1 seconds
	And I click on Staff button
	And I wait for 1 seconds
	And I select Owner
	And I wait for 1 seconds
	And I validate Staff updated
	And I wait for 2 seconds

	

	
	

	

	
		
  
	
    
	