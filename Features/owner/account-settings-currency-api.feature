@backend
Feature: Account > Settings > Currencies > API

    @ER-2548 @ER-3051 @REGRESSION @SETTINGS-Currencies-API
    Scenario: Verify World currencies pre-populated table
        When User call the common currencies list API
        Then Verify that response of the API is 200
        And User Verify the response Body
        And response has count,pagination

    @ER-3168 @ER-3607 @ER-4652 @REGRESSION @SETTINGS-Currencies-API
    Scenario:Verify Create Opearting Currency API
        Given User Call the Create Opearating Currency
        And Verify that response of the API is 201
        And User verifify the response for Opperating currencies API
        When User Call the Get Operating Currency
        Then Verify the currency_id in the response body
        And Verify that the countries field is in the response body

    @ER-3167 @ER-3212 @ER-3823 @ER-4430 @ER-3215 @REGRESSION @SETTINGS-Currencies-API
    Scenario: Verify the Create Operating Country PayRange API
        Given User has an Operating Country
        And User call the Chatter API for the Operating Country
        And Verify the response of the chatter API for operating country
        When User Call the Create Opearating Currency
        Then User Calls the Create Pay Range API
        And Verify that response of the API is 201
        And User Calls the Get Pay Range API
        And verify response structure for the Pay Range API response
        And User call the Get Operating country Pay Range Read API

    @ER-3183 @ER-3769 @REGRESSION @SETTINGS-Currencies-API
    Scenario: Verify the Create Operating Country PayRange API
        Given User has an Operating Country
        When User Call the Create Opearating Currency
        And User Call the Common Currencies List API
        And Verify that response of the API is 200
        And User Verify the response Body
        And response has count,pagination
        And User Call the Get Operating Currency
        Then Verify that response of the API is 200
        And User call the Get Operating currecny Chatter Read

    @ER-4634 @ER-4978 @REGRESSION @SETTINGS-Currencies-API
    Scenario: Verify the Create Operating Country PayAggrement API
        Given that a employee is in status 'Active'
        And User Call the Create Opearating Currency
        When the user calls the Create Pay Aggrement API
        And the user calls the Retrieve Pay Aggrement API
        And the user calls the Update Pay Aggrement API
        And the user calls the Delete Pay Aggrement API
        Then Verify that response of the API is 201