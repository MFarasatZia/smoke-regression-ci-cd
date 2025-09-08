@backend
Feature: Positions > API

    @ER-3199 @ER-3419 @REGRESSION-API @POSITION-API
    Scenario: Verify un-archive position API
        Given that a position is in status 'Retired'
        When user calls the archive position API
        And user calls the unarchive position API
        Then verify status for archive position API to be 200
        And verify the position is unarchived

    @ER-3199 @ER-3418 @REGRESSION-API @POSITION-API
    Scenario: Verify Message when Position is not in archived status
        Given that a position is in status 'Retired'
        When user calls the unarchive position API
        Then verify status for archive position API to be 400
        And verify the error message for the archive position api to be 'You can only unarchive an archived position.'

    @ER-1888 @ER-1903 @REGRESSION-API @POSITION-API
    Scenario: Verify user is able to List employees assigned to the position via API
        Given user create an employee and a position via API
        When user call the position-assignment API
        Then verify response return the employee assigned to the position
        And user call the list position API
        Then verify response return the assigned employee

    @ER-2993 @ER-3974 @REGRESSION-API @POSITION-API
    Scenario: Verify active position api has activated_by and activated_on values.
        Given that a position is in status 'Active'
        When user call the list position API
        And the response contains at most 20 position items
        Then the position response should include the activated_by field
        And the position response should include the activated_on field

    @ER-2993 @ER-3977 @REGRESSION-API @POSITION-API
    Scenario: Verify archive position api has archived by and archived on values.
        Given that a position is in status 'Retired'
        When user calls the archive position API
        And user call the list position API
        Then verify archive Position response has archived_by field
        And verify archive Position response has archived_on field

    @ER-2993 @ER-3980 @REGRESSION-API @POSITION-API
    Scenario: Verify De-activated position api has removed by and removed on values.
        Given that a position is in status 'Active'
        And user 'De-Activate' the position via api
        When user call the list position API
        Then verify de-activated Position response has removed_by field
        And verify de-activated Position response has removed_on field

    @ER-2993 @ER-3983 @REGRESSION-API @POSITION-API
    Scenario: Verify Retired position api has removed by and removed on values.
        Given that a position is in status 'Active'
        And user 'Retire' the position via api
        When user call the list position API
        Then verify retired position response has removed_by field
        And verify retired position response has removed_on field

    @ER-3423 @ER-4593 @REGRESSION-API @POSITION-API
    Scenario: Verfiy that Only the "unarchive" action is available for archived objects when user tries to activate the position
        Given that a position is in status 'Retired'
        When user calls the archive position API
        Then user tries to activate the position
        And position api error contains msg "Only the 'unarchive' action is allowed for archived objects."

    @ER-3423 @ER-4594 @REGRESSION-API @POSITION-API
    Scenario: Verfiy that Only the "unarchive" action is available for archived objects when user tries to retired the position
        Given that a position is in status 'Retired'
        When user calls the archive position API
        Then user tries to retired the position
        And position api error contains msg "Only the 'unarchive' action is allowed for archived objects."
    
    @ER-4257 @ER-5290 @REGRESSION-API @POSITION-API
    Scenario: Verify the Bulk Activate Action for Positions
        Given clear position IDs for bulk testing
        And that a position is in status 'Draft'
        And that a position is in status 'Draft'
        When user calls the bulk "activate" action API
        Then verify the bulk "activate" action API returns 200
        And verify bulk "activate" response contains position details
        And verify all positions are "active"