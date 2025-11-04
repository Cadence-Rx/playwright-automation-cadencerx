@patient @regression
Feature: Opus Add Patient Note Functionality

    Background:
        Given I navigate to the Opus application
        And I enter with valid credentials for "TRENT_LINVILLE@PMAGROUP.COM" user
        And I click on the login button
        And I click the All Tab on the OPUS Dashboard

    @smoke
    Scenario: User should be able to add a note to a patient's profile
        When I click on a random PA Request status button on the Authorization tab of the OPUS Dashboard
        Then I am redirected to the PA "Request Summary" page for that Pending Authorization
        When I click on the Patient Notes tab
        And I click on the Add Note button
        And I enter a note in the note text area "Entering a test note for automation"
        And I click on the Save Note button
        # Then I should see the newly added note in the Patient Notes tab