@backend
Feature: Account > Organization > Employees > API

    @ES-411 @ER-3684 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify API response when creating role assignment without providing triggered_by_employee_to_position_assignment
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And User has Role
        And User assign the position to Employee
        And User assign the Role to employee
        When user creates a role assignment without trigger assignment id
        Then verify the response is 400
        And verify the message is requires the trigger employee to position assignment

    @ES-411 @ER-3685 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify API response when creating responsibility assignment without providing triggered_by_employee_to_position_assignment
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And User has Role
        And User assign the position to Employee
        And User assign the Role to employee
        When user creates a responsibility assignment without trigger assignment id
        Then verify the response is 400
        And verify the message is requires the trigger employee to position assignment

    # @ER-3549 @ER-3759 @REGRESSION-API @EMPLOYEES-API @api_issues
    # Scenario: Verify the Employee Object In The API Response
    #     Given that a employee is in status 'Active'
    #     And user calls the user-create API for the employee
    #     And Verify the Employee Object In The API Response
    #     When user calls the test-email API for the employee
    #     Then verify the backend response for email
        

    @ER-3333 @ER-3787 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify Attach Role to Position impact on employee assignments
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And user have responsibility is in status 'Active'
        And User has Role
        And user attach responsibility to role via API
        And User assign the position to Employee
        When User attach the role to position
        Then user calls employee assignments api
        And verify role_assignments status is 'active'
        And verify role_assignments reason is 'Attached when catalog Role <code name> was attached to Position <code name>'
        And verify responsibility_assignments status is 'active'
        And verify responsibility_assignments reason is 'Attached when catalog Role <code name> was attached to Position <code name>'

    @ER-3430 @ER-3789 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify GetActiveEmployeesReadiness API response
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        When User assign the position to Employee
        Then user calls the Active Employees Readiness api
        And user verify all employees status is active
        And verify active employee has required fields visible
        And verify position assignment has required fields visible

    @ER-3766 @ER-3794 @REGRESSION-API @EMPLOYEES-API 
    Scenario: Verify Endpoint to recalc for multiple employees with position and role assignment
        Given that employee is in status 'Active' with position assignment
        And need_recalc boolean is true for employee with position assignment
        And that employee is in status 'Active' with role assignment
        And need_recalc boolean is true for employee with role assignment
        When user calls api to recalc all employee
        Then employee needs_recalc with position assignment boolean is false
        And employee need_recalc with role assignment boolean is false

    @ER-3766 @ER-3831 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify Endpoint to recalc for multiple employees with responsibility and Badge assignment
        Given that employee is in status 'Active' with badge
        And need_recalc boolean is true for employee with badge
        And that employee is in status 'Active' with responsibility assignment
        And need_recalc boolean is true for employee with responsibility assignment
        When user call api to recalc all employee
        Then employee needs_recalc with badge boolean is false
        And employee need_recalc with responsibility assignment boolean is false

    @ER-3609 @ER-3884 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify Activate role impact on employee assignments
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And User has a Role in draft
        And user have responsibility is in status 'Active'
        And user attach responsibility to role via API
        And User attach the role to position
        When User assign the position to Employee
        Then user activates the role
        And user calls employee assignments api
        And verify role_assignments status is 'active'
        And verify role_assignments reason is 'Assigned when catalog Role <code name> was activated'
        And verify responsibility_assignments status is 'active'
        And verify responsibility_assignments reason is 'Assigned when catalog Role <code name> was activated'

    @ER-3875 @ER-3836 @ER-3926 @EMPLOYEES-API
    Scenario: Verfiy the Add badge status to Employee Assignments Tree API end point
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And User has Role
        And user have responsibility is in status 'Active'
        And user attach responsibility to role via API
        And User attach the role to position
        When User assign the position to Employee
        And user create a proficiency badge
        And user calls employee assignments api
        And Verify importance is 3 at all levels
        And verify role_assignments status is 'active'
        Then Verify that role.id
        And Verify responsibility.id
        And verify responsibility_assignments status is 'active'
        And Verify Badge Object in Employee Assignment

    @ER-3332 @ER-3937 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify Attach responsibility to Role impact on employee assignments
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And User has Role
        And user have responsibility is in status 'Active'
        And User attach the role to position
        When User assign the position to Employee
        Then user attach responsibility to role via API
        And user calls employee assignments api
        And verify responsibility_assignments status is 'active'
        And verify responsibility_assignments reason is 'Attached when catalog Responsibility <code name> was attached to catalog Role <code name>'