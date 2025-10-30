@patient @regression
Feature: Opus Patient Search Functionality

    Background:
        Given I navigate to the Opus application
        And I enter with valid credentials
        And I click on the login button
        Then I should be successfully logged in and navigated to the Authorization tab of the OPUS Dashboard
        And I click the All Tab on the OPUS Dashboard
        And I select "Member ID" from the Column chooser dropdown
        When I pause playwright test for debugging
        And I obtain member id from Authorization tab of the OPUS Dashboard

    @smoke
    Scenario: User should be able to search for a patient by name
        When I click on the Patient tab of the OPUS Dashboard
    #     And I enter the patient's name 'John Doe' in the search field
    #     And I click on the search button
    #     Then I should see a list of patients matching the name 'John Doe'

    # Scenario: User should be able to search for a patient by ID
    #     When I navigate to the Patient Search page
    #     And I enter the patient's ID '123456' in the search field
    #     And I click on the search button
    #     Then I should see the patient details for ID '123456'

    # Scenario: User should see an error message for invalid patient search
    #     When I navigate to the Patient Search page
    #     And I enter an invalid patient name 'InvalidName' in the search field
    #     And I click on the search button
    #     Then I should see an error message indicating "No patients found."