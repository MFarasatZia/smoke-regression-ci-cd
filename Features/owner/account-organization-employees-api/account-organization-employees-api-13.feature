@backend
Feature: Account > Organization > Employees > API

    @ER-4347 @ER-4707 @ER-4903 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify Badge Holder Details in Employee Coaching Assignment Response
        Given Position is in status 'Active'
        And User has Role
        And user has responsibility is in status 'Active'
        And user have an employee is in status 'Active'
        And user attach responsibility to role via API
        And User attach the role to position
        And user create a proficiency badge
        When User assign the position to Employee
        Then user calls the list of Show Available Coaches in Employee Path to Readiness
        And verify the assignments are in the response
        And verify the badge holder details

    @ER-4478 @ER-4677 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify that roles_count and responsibilty_count in preparing for positions
        Given that a employee is in status 'Active'
        And that a position is in status 'Active'
        And user assign position to employee with allocation and commitment 1
        And that role is in status active
        And user attaches the active role to the position
        And that a responsibility is in status 'Active'
        And user attaches the responsibility to the active role
        When user gets the employee details
        And verify the position history active count is 1
        Then verify the return response for Employee List status to be 200
        And verify the return response for Employee List structure

    @ER-3947 @ER-4802 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify that the Responsibility count of assignments and badge holders by level are returned correctly in the Tree of Positions > Roles > Responsibilities
        Given that a employee is in status 'Active'
        And user have responsibility is in status 'Active'
        And Position is in status 'Active'
        And user assign position to employee with allocation and commitment 1
        And User has Role
        And user attach responsibility to role via API
        And User assign the position to Employee
        And User attach the role to position
        When User calls the create badge for level 3 employee API
        Then User calls the Get Responsibility List API

    @ER-5186 @ER-5404 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify responsibility assignment API with role assignment ID
        Given that employee has role assignment with responsibility
        When user calls the all responsibility assignments API
        Then verify the response status for responsibility assignment API is 200
        And verify the all responsibility assignments response structure
        When user calls the responsibility assignment API with role assignment ID
        Then verify the response status for responsibility assignment API is 200
        And verify the responsibility assignment response structure
        When user calls the responsibility assignment API with status "active"
        Then verify the response status for responsibility assignment API is 200
        And verify all returned responsibility assignments have status "active"

    @ER-5414 @ER-5505 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify the responsibility id and proficiency level in the evaluations checklist api
        Given that a employee is in status 'Active'
        And User have a Checkpoint in status 'Active'
        And User create an checkpoint evaluation for 'passed'
        And user calls the evaluations checklist API
        And verify the responsibility id and proficiency level in the evaluations checklist
        When User Retired the checkpoint
        And user calls the evaluations checklist API
        Then Verify the response for filter evaluation checklist

    @ER-5184 @ER-5512 @ER-4654 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify position assignment List and Add Employee Filter
        Given Position is in status 'Active'
        And User has Role
        And user has responsibility is in status 'Active'
        And that a employee is in status 'Active'
        And user attach responsibility to role via API
        And User attach the role to position
        And User assign the position to Employee
        And User calls the create badge for level 1 employee API
        When User call the get position assignment API
        Then verify the position assignment response structure
        And User get position assignment API with specific employee ID
        And User verify the current_readiness is 50
        And User calls the get position assignment Response with status 'active'

    @ER-5273 @5284 @5395 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify the employee Status in the Access API
        Given user creates a new user via API
        And that a employee is in status 'Active'
        And user calls the user-create API for the employee
        When user gets the employee details
        Then verify the get employee API response structure
        And user calls the employee check access API
        And verify the employee access API response status to be 200
        And verify the employee status in response to be 'active'

    @ER-5454 @ER-5557 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify the Active employee count in the Side bar counts API
        Given the user call the Side bar counts API
        And user store the employee count
        And that a employee is in status 'Draft'
        When the user call the Side bar counts API
        Then verify the employee count is same as the stored employee count
        And that a employee is in status 'Active'
        When the user call the Side bar counts API
        Then verify the employee count is increased by 1
        And user terminate the employee via API
        When the user call the Side bar counts API
        Then verify the employee count is decreased by 1

    @ER-4815 @ER-5574 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify employee filtering by creation date in get employees v2 API
        Given that a employee is in status 'Active'
        And user store the employee creation date
        When user calls the get employees v2 API with created_date filter
        Then verify every returned employee has created_date matching the stored date

    @ER-5415 @ER-5570 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify V2 API pagination with limit and offset parameters for employees
        Given that a employee is in status 'Active'
        And user calls the getAllEmployeesV2 API with limit 10 and offset 0
        Then verify the employee response contains at most 10 records
        And verify the employee response contains pagination metadata
        And verify the employee response count matches the total number of employees
        When user calls the getAllEmployeesV2 API with limit 10 and offset 10
        Then verify the employee response contains at most 10 records
        And verify the employee response contains pagination metadata
        And user calls the getAllEmployeesV2 API with limit 5 and offset 5
        Then verify the employee response contains at most 5 records
        And verify the employee response contains pagination metadata
        And verify the employee response count matches the total number of employees

