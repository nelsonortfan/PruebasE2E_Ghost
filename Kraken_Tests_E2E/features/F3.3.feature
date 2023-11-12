Feature: Posts
    @user1 @web
    Scenario: Delete an existing post
        Given I navigate to page "<GHOST_URL>"
        And I enter email "<USERNAME1>"
        And I enter password "<PASSWORD1>"
        And I click on sing in button
        And I click on settings button
        And I click on labs button
        And I click on delete database button
        And I click on confirm delete database button
        And I navigate to page "<GHOST_URL>"
        And I click on new post button
        And I enter post title "This is the post to delete"
        And I enter the post body "This is the post body"
        And I click on publish button
        And I click on continue, final review button
        And I click on publish post, right now button
        And I navigate to page "<GHOST_URL>"
        And I click on the Posts button
        When I delete the post "This is the post to delete"
        And I navigate to page "<GHOST_URL>"
        And I click on the Posts button
        Then I see 0 posts in the list

