@patient @priorAuth @regression
Feature: Opus Add Prior Authorization Functionality

    Background:
        Given I navigate to the Opus application
        And I enter with valid credentials for "TRENT_LINVILLE@PMAGROUP.COM" user
        And I click on the login button
        And I click the All Tab on the OPUS Dashboard

    @smoke
    Scenario Outline: Add Authorize Prior Authorization
        When I click on a random PA Request status button on the Authorization tab of the OPUS Dashboard
        Then I am redirected to the PA "Request Summary" page for that Pending Authorization
        When I click on the Authorization tab
        And I click on the Add Prior Auth button
        And I enter valid '<gpi>' in the search medication field
        And I select "Authorize" from the action dropdown
        And I click the Save Prior Auth button
        Then the prior authorization modal displays the auth was successfully created
        When I click OK on the Add Prior Auth modal
        And I click on the first Auth Id in prior authorization history list
        Then I should see the newly added prior authorization with the same '<gpi>' and '<drugName>' on the edit Prior Authorizations modal

        Examples:
            | gpi            | drugName  |
            | 96645813002900 | Lidocaine |

    @smoke
    Scenario Outline: Add Authorize Prior Authorization
        When I click on a random PA Request status button on the Authorization tab of the OPUS Dashboard
        Then I am redirected to the PA "Request Summary" page for that Pending Authorization
        When I click on the Authorization tab
        And I click on the Add Prior Auth button
        And I enter valid '<gpi>' in the search medication field
        And I select "Do Not Authorize" from the action dropdown
        And I click the Save Prior Auth button
        Then the prior authorization modal displays the auth was successfully created
        When I click OK on the Add Prior Auth modal
        And I click on the first Auth Id in prior authorization history list
        Then I should see the newly added prior authorization with the same '<gpi>' and '<drugName>' on the edit Prior Authorizations modal

        Examples:
            | gpi            | drugName   |
            | 75100090100320 | Tizanidine |