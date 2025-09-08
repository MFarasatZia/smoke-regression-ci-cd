@backend
Feature: Account > Organization > Employees > API

    # @ER-3335 @ER-3667 @REGRESSION-API @EMPLOYEES-API
    # Scenario: Verify Employee is Terminated impact on employee assignments
    #     Given Position is in status 'Active'
    #     And that a employee is in status 'Active'
    #     And user have responsibility is in status 'Active'
    #     And User has Role
    #     And user attach responsibility to role via API
    #     And User attach the role to position
    #     When User assign the position to Employee
    #     And user terminate the employee
    #     Then user calls employee assignments api
    #     And verify position assignments status is 'terminated'
    #     And verify reason is 'Terminated when employee was terminated'
    #     And verify role_assignments status is 'terminated'
    #     And verify role_assignments reason is 'Terminated when employee was terminated'
    #     And verify responsibility_assignments status is 'terminated'
    #     And verify responsibility_assignments reason is 'Terminated when employee was terminated'

    @ER-3337 @ER-3669 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify Relieve Employee of Position Assignment impact on employee assignments
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And user have responsibility is in status 'Active'
        And User has Role
        And user attach responsibility to role via API
        And User attach the role to position
        When User assign the position to Employee
        And User relieves the position assignment
        Then user calls employee assignments api
        And verify position assignments status is 'relieved'
        And verify reason is null
        And verify role_assignments status is 'relieved'
        And verify role_assignments reason is 'Relieved when employee <Employee name> was relieved of position <position code name>'
        And verify responsibility_assignments status is 'relieved'
        And verify responsibility_assignments reason is 'Relieved when employee <Employee name> was relieved of position <position code name>'

    @ES-393 @ES-386 @ER-3540 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify assignments, allocation ,acceptance, assigned_by and current_readiness values are not null in employee assignment api
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        When User assign the position to Employee
        Then verify employee_availability_at_assignment field is visible in the response
        And verify position_capacity_at_assignment field is visible in the response
        And verify allocation value is not 0
        And verify acceptance field value is Pending
        And verify acceptance_rejection_reason field is null
        And verify assigned_by value is not null
        And verify removal_reason field is null
        And verify current_readiness value is not null

    @ES-386 @ER-3676 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify removed_on, removed_by and status fields are visible in the response when position assignment is relieved
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And User assign the position to Employee
        When User relieves the position assignment
        Then verify removed_on field has date and time
        And verify removed_by field has access id
        And verify status is relieved

    @ES-411 @ER-3678 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify API response when creating position assignment and not providing employee
        Given Position is in status 'Active'
        When user creates a position assignment without employee
        Then verify the response is 400
        And verify the message is assignment requires employee

    @ES-411 @ER-3679 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify API response when creating role assignment and not providing employee
        Given that a employee is in status 'Active'
        When user creates a role assignment without employee
        Then verify the response is 400
        And verify the message is assignment requires employee

    @ES-411 @ER-3680 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify API response when creating responsibility assignment and not providing employee
        Given that a employee is in status 'Active'
        And User has Role
        And User assign the Role to employee
        When user creates a responsibility assignment without employee
        Then verify the response is 400
        And verify the message is assignment requires employee

    @ES-411 @ER-3681 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify API response when creating position assignment with parent assignment
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And User assign the position to Employee
        When user creates a position assignment with parent assignment
        Then verify the response is 400
        And verify the message is Position assignment cannot have Parent Assignment

    @ES-411 @ER-3682 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify API response when creating role assignment and not providing parent assignment
        Given that a employee is in status 'Active'
        And User has Role
        And User assign the Role to employee
        When user creates a role assignment without parent assignment
        Then verify the response is 400
        And verify the message is Role assignment must have Parent Position Assignment

    @ES-411 @ER-3683 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify API response when creating responsibility assignment and not providing parent assignment
        Given that a employee is in status 'Active'
        And User has Role
        And User assign the Role to employee
        When user creates a responsibility assignment without parent assignment
        Then verify the response is 400
        And verify the message is Responsibility assignment must have Parent Role Assignment

