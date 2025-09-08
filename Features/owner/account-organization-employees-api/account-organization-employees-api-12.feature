@backend
Feature: Account > Organization > Employees > API

    @ER-2977 @ER-3932 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verfiy the List of Mastered Responsibilities API Via Employee ID
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And User has Role
        And user have responsibility is in status 'Active'
        And user attach responsibility to role via API
        And User attach the role to position
        When User assign the position to Employee
        And User calls the create badge for level 4 employee API
        Then user calls list of Mastered Responsibility
        And Verifying the values for badge_master_holder_count
        And Verifying the values for master_will_coach
        And Verifying the values for master_assignment_count

    @ER-3827 @ER-4352 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify that Assignments to be sorted by Removed By Date Time
        Given Position is in status 'Active'
        And Position is in status 'Active'
        And Position is in status 'Active'
        And that a employee is in status 'Active'
        And User assign the position to Employee
        And User relieves the position assignment
        And User assign the position to Employee
        And User relieves the position assignment
        When user calls employee assignments api
        Then verify removed_on field

    @ER-4056 @ER-4357 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verfiy the List of Employees to coach
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And User has Role
        And user has responsibility is in status 'Active'
        And User calls the create badge for level 3 employee API
        And user attach responsibility to role via API
        And User attach the role to position
        And user create a proficiency badge
        When User assign the position to Employee
        And that employee is in status active
        Then user calls list of Coach Responsibility
        And verify the current badge is valid

    @ER-4232 @ER-4369 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verfiy Add checkpoints data to every responsibility to Employee Assignments Tree API end point
        Given that a employee is in status 'Active'
        And Position is in status 'Active'
        And user has creates a checkpoint via API in status 'Active'
        And User has Role
        And user attach responsibility to role via API
        And User attach the role to position
        And User assign the position to Employee
        When user calls employee assignments api
        And Verify importance is 3 at all levels
        Then Verify Checkpoint Object in Employee Assignment

    @ER-4436 @ER-4484 @REGRESSION-API @EMPLOYEES-API
    Scenario:Verfiy that Employee Badge & Responsibility Details
        Given that a employee is in status 'Active'
        And Position is in status 'Active'
        And user has creates a checkpoint via API in status 'Active'
        And User has Role
        And user attach responsibility to role via API
        And User attach the role to position
        And User assigns the position to Employee with no commitment and allocation
        And user create a proficiency badge
        When User call the employee badges detail API
        Then Verify the badge details for the employee

    @ER-4456 @4580 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verfiy Responsibilities Directory List API
        Given that a employee is in status 'Active'
        And user have responsibility is in status 'Active'
        And Position is in status 'Active'
        And User has Role
        And user attach responsibility to role via API
        And User assign the position to Employee
        And User attach the role to position
        When User calls the create badge for level 3 employee API
        Then user call the responsibility directory list api
        And Verify that the responsibility list contains the correct attributes
        
    @ER-4348 @ER-4599 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify the readiness badges of the employee
        Given that a employee is in status 'Active'
        And user have responsibility is in status 'Active'
        And User calls the create badge for level 1 employee API
        And verify the response status should be 'given'
        And Position is in status 'Active'
        And User has Role
        And user attach responsibility to role via API
        And User assign the position to Employee
        When User attach the role to position
        And the User call the readiness badge for employee api
        Then verify the readiness badges of the employee
        
    @ER-4581 @ER-4692 @REGRESSION-API @EMPLOYEES-API
    Scenario: verifies that the badge has been successfully removed from the selected employee
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And User has Role
        And user has responsibility is in status 'Active'
        And user attach responsibility to role via API
        And User attach the role to position
        And user create a proficiency badge
        And User assign the position to Employee
        And user have an employee is in status 'Active'
        When user calls list of Coach Responsibility
        And verify the current badge is valid
        Then verifies that the badge has been successfully removed from the selected employee
    
    @ER-5424 @ER-5578 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify the reset_on and reset_by fields are present in the response
        Given User has a Employee
        And User have a Checkpoint in status 'draft'
        When User create an checkpoint evaluation for 'reset'
        And Set status to 'reset'
        Then Verify the response status is '201'
