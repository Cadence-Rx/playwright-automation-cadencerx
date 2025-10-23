@login @regression
Feature: Opus Login Functionality

    Background:
        Given I navigate to the Opus application

    Scenario Outline: User should be able to login with valid credentials
        When I enter a valid username '<username>' and password '<password>'
        And I click on the login button
        Then I should be successfully logged in and navigated to the Authorization tab of the OPUS Dashboard

        Examples:
            | username                    | password  |
            | aarcher2@strategiccomp.com  | password1 |
            | TRENT_LINVILLE@PMAGROUP.COM | password2 |



#   @invalidLogin
#   Scenario: User should not be able to login with invalid credentials
#     When I enter an invalid username or password
#     And I click on the login button
#     Then I should see an error message indicating invalid credentials

#   @emptyFields
#   Scenario: User should not be able to login with empty fields
#     When I leave the username and password fields empty
#     And I click on the login button
#     Then I should see an error message indicating that fields cannot be empty