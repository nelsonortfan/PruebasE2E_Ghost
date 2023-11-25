Feature: Posts
    @user1 @web
    Scenario: List all posts
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
        And I enter post title "$name_1"
        And I enter the post body "$string_1"
        And I click on publish button
        And I click on continue, final review button
        And I click on publish post, right now button
        And I navigate to page "<GHOST_URL>"
        And I click on new post button
        And I enter post title "$name_2"
        And I enter the post body "$string_2"
        And I click on the posts button
        And I navigate to page "<GHOST_URL>"
        And I click on new post button
        And I enter post title "$name_3"
        And I enter the post body "$string_3"
        And I click on publish button
        And I click on continue, final review button
        And I click on publish post, right now button
        And I navigate to page "<GHOST_URL>"
        And I click on new post button
        And I enter post title "$name_4"
        And I enter the post body "$string_4"
        And I click on the posts button
        When I navigate to page "<GHOST_URL>"
        And I click on the Posts button
        Then I see "$$name_1" in the 4 position of the list of posts with the status "Published"
        And I see "$$name_3" in the 3 position of the list of posts with the status "Published"
        And I see "$$name_2" in the 2 position of the list of posts with the status "Draft"
        And I see "$$name_4" in the 1 position of the list of posts with the status "Draft"