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
        And I enter valid '<GPI>' in the search medication field
        And I select "Authorize" from the action dropdown
        And I click the Save Prior Auth button
        Then I should see the newly added prior authorization with '<GPI>' and '<drugName>' in the Prior Authorizations section

    Example:
            | GPI            | drugName   |
            | 96645813002900 | Lidocaine  |
            | 98600012003700 | Vanish-Pen |


    @smoke
    Scenario Outline: Add Do NOT Authorize Prior Authorization
        When I click on a random PA Request status button on the Authorization tab of the OPUS Dashboard
        Then I am redirected to the PA "Request Summary" page for that Pending Authorization
        When I click on the Authorization tab
        And I click on the Add Prior Auth button
        And I enter valid '<GPI>' in the search medication field
        And I select "Do Not Authorize" from the action dropdown
        And I click the Save Prior Auth button
        Then I should see the newly added prior authorization with '<GPI>' and '<drugName>' in the Prior Authorizations section

    Example:
            | GPI            | drugName           |
            | 96645813002900 | Lidocaine          |
            | 98600012003700 | Vanish-Pen         |
            | 75100090100320 | tiZANidine HCl 4MG |