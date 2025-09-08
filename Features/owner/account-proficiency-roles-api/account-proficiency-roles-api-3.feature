@backend
Feature: Roles > API

    @ER-2993 @ER-3975 @REGRESSION-API @ROLES-API
    Scenario: Verify active role api has activated by and activated on values.
        Given that role is in status active
        When  user get the specific role by id
        Then verify Role response has activated_by field
        And verify Role response has activated_on field

    @ER-2993 @ER-3978 @REGRESSION-API @ROLES-API
    Scenario: Verify archived role api has archived by and archived on values.
        Given that a role is in status 'Retired'
        When user calls the archive role API
        And user get the specific role by id
        Then verify archive Role response has archived_by field
        And verify archive Role response has archived_on field

    @ER-2993 @ER-3981 @REGRESSION-API @ROLES-API
    Scenario: Verify De-activated role api has removed by and removed on values.
        Given that role is in status active
        And user 'De-activate' the role via API
        When user get the specific role by id
        Then verify de-activated Role response has removed_by field
        And verify de-activated Role response has removed_on field

    @ER-2993 @ER-3984 @REGRESSION-API @ROLES-API
    Scenario: Verify retired role api has removed by and removed on values.
        Given that role is in status active
        And user 'Retired' the role via API
        When user get the specific role by id
        Then verify retired role response has removed_by field
        And verify retired role response has removed_on field

    @ER-4353 @ER-4482 @REGRESSION @ROLES-API
    Scenario:Verfiy the Activation of Attached Draft Responsibilities When Activating a Role
        Given that a role is in status 'Draft'
        And that a responsibility is in status 'Draft'
        When user calls the attach responsibility to role API
        And User call the activate role API
        Then Verify that the status is active

    @ER-4783 @ER-4910 @REGRESSION @ROLES-API
    Scenario:Verify deletion of draft role when associated responsibilities are in draft state
        Given that a role is in status 'Draft'
        And that a responsibility is in status 'Draft'
        And the user attach responsibility to role via api
        When user delete role via API
        Then verify the draft role is deleted with associated draft responsibilities

    @ER-4783 @ER-4911 @REGRESSION @ROLES-API
    Scenario:Verify deletion of draft role when associated responsibilities are in active state
        Given that a role is in status 'Draft'
        And user have responsibility is in status 'Active'
        And the user attach responsibility to role via api
        When user delete role via API
        Then verify the draft role is deleted with associated active responsibilities

    @ER-4257 @ER-5299 @REGRESSION @ROLES-API
    Scenario: Verify the Bulk Activate Action for Responsibilities with Roles
        Given clear role IDs for bulk testing
        And that a role is in status 'Draft'
        And that a role is in status 'Draft'
        And that a role is in status 'Draft'
        And that a responsibility is in status 'Draft'
        And that a responsibility is in status 'Draft'
        And that a responsibility is in status 'Draft'
        And user attaches each responsibility to each role
        When user calls the bulk Role "activate" action API
        Then verify the bulk Role "activate" action API returns 200
        And verify bulk "activate" response contains role details
        And verify all roles are "active"
        And verify all attached responsibilities are activated

    @ER-5180 @ER-5532 @REGRESSION-API @ROLES-API
    Scenario: Verify API behavior with invalid role IDs
        Given user has invalid role IDs for testing
        When user calls role API with invalid role ID
        Then Verify the response error to be "No Role matches the given query"
    
    @ER-5180 @ER-5533 @REGRESSION-API @ROLES-API
    Scenario: Verify Filter Responsibility List by Role ID
        Given clear role IDs for bulk testing
        And that a role is in status 'Active'
        And that a role is in status 'Active'
        And that a role is in status 'Active'
        And that a responsibility is in status 'Active'
        And that a responsibility is in status 'Active'
        And that a responsibility is in status 'Active'
        And user attaches each responsibility to each role
        When user calls the Get Role Filter API
        Then verify the responseBody for the Get Role Filter API contains the attachment details