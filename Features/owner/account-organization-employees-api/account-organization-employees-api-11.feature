@backend
Feature: Account > Organization > Employees > API

    @ER-3610 @ER-3932 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify Activate Responsibility impact employee on assignments
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And User has Role
        And user have responsibility is in status 'Draft'
        And user attach responsibility to role via API
        And User attach the role to position
        When User assign the position to Employee
        Then user activates the responsibility
        And user calls employee assignments api
        And verify responsibility_assignments status is 'active'
        And verify responsibility_assignments reason is 'Assigned when catalog Responsibility <code name> was activated'

    @ER-62 @ER-4049 @REGRESSION-API @EMPLOYEES-API
    Scenario:Verify the error when user assign Position to Employee and not providing the field "commitment" & "allocation"
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        When User assigns the position to Employee with no commitment and allocation
        Then user verify error commitment field is required

    @ER-62 @ER-4050 @REGRESSION-API @EMPLOYEES-API
    Scenario:Verify new values in response when user assign Position to Employee and providing the commitment & allocation
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        When User assign the position to Employee
        Then verify expressed_as has null value
        And  verify compensation_amount has null value
        And verify compensation_currency has null value
        And verify compensation_per_hour has null value
        And verify compensation_per_month has null value
        And verify compensation_per_year has null value
        And verify compensation_per_year has null value

    @ER-2970 @ER-4086 @REGRESSION-API @EMPLOYEES-API
    Scenario:Verify  employee API has created_by and created_on values in response.
        Given that a employee is in status 'Draft'
        When user gets the employee details
        Then verify  created_by field has value in response
        And verify  created_on field has value in response

    @ER-2970 @ER-4087 @REGRESSION-API @EMPLOYEES-API
    Scenario:Verify employee API has activated_by and activated_on values in response.
        Given that a employee is in status 'Active'
        When user gets the employee details
        Then verify activated_by field has value in response
        And verify activated_on field has value in response

    @ER-2970 @ER-4088 @REGRESSION-API @EMPLOYEES-API
    Scenario:Verify employee API has terminated_by and terminated_on values in response.
        Given that a employee is in status 'Terminated'
        When user gets the employee details
        Then verify terminated_by field has value in response
        And verify terminated_on field has value in response

    @ER-2970 @ER-4089 @REGRESSION-API @EMPLOYEES-API
    Scenario:Verify employee API has terminated_by and terminated_on values in response.
        Given that a employee is in status 'Terminated'
        And user 'Reactivate' the employee via API
        When user gets the employee details
        Then verify activated_by field has value in response
        And verify activated_on field has value in response
    
    # @ER-4416 @ER-4484 @REGRESSION-API @EMPLOYEES-API @api_issues
    # Scenario:Verfiy that Employee API passes TRUE in access
    #     Given that a employee is in status 'Active'
    #     And verify employee api status to be 200
    #     And employee status to be 'Active'
    #     And user calls the user-create API for the employee
    #     When user gets the employee details
    #     Then verify that Test Employee API passes has_access true in access
    #     And  Verify that access object for each employee in the API response has access_id

    # @ER-4421 @ER-4513 @REGRESSION-API @EMPLOYEES-API @api_issues
    # Scenario:Verify that Access API for Title Field and User Details in Response
    #     Given that a employee is in status 'Active'
    #     And user calls the user-create API for the employee
    #     When User Call the Access API Call
    #     Then Verify Last Login and Avatar Fields in Access API Response
    #     And Verify directories parameter in the Access API response