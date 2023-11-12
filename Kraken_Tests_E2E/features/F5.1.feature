Feature: Posts
    @user1 @web
    Scenario: Set mailgun properties
        Given I navigate to page "<GHOST_URL>"
        And I enter email "<USERNAME1>"
        And I enter password "<PASSWORD1>"
        And I click on sing in button
        And I navigate to page "<GHOST_URL>"
        When I click on settings button
        And I click on the Email newsletter button
        And I click on the Mailgun configuration expand button
        And I enter mailgun api key "$string_1"
        And I enter mailgun domain "$string_2"
        And I click on the Save button
        And I refresh the page
        And I click on the Mailgun configuration expand button
        And I see the mailgun api key "$$string_1"
        And I see the mailgun domain "$$string_2"
