@backend
Feature: Account > Organization > Employees > API

  @ER-1642 @ER-2305 @REGRESSION @EMPLOYEES-API @COMPLETED
  Scenario: Verify endpoints for In-valid linked employees
    When user checks linked employees for 'in-valid email' through API
    Then user should get all expected values to be 'false'
    And status should be 'null'

  @ER-2946 @ER-3133 @EMPLOYEES-API @COMPLETED
  Scenario: Verify badge details are returned on employee API call
    Given that a employee is in status 'Active'
    And user Grant badge to employee
    When user gets the employee details
    Then verify the badge details are displayed in the badges array

  @ER-2310 @ER-2763 @REGRESSION-API @EMPLOYEES-API
  Scenario:Verify the Novice status when we Call Get Responsibility API
    Given Position is in status 'Active'
    And that a employee is in status 'Active'
    And user have responsibility is in status 'Active'
    And User has Role
    And user attach responsibility to role via API
    And User assign the position to Employee
    When User attach the role to position
    Then User calls the Get Responsibility Assignment API
    And Verify that responsibility assignment status is "Novice"

  @ER-2310 @ER-2764 @REGRESSION-API @EMPLOYEES-API @SMOKE-API
  Scenario:Verify the Relieved on status when we Call Get Responsibility API
    Given Position is in status 'Active'
    And that a employee is in status 'Active'
    And user Grant badge to employee
    And User has Role
    And user attach responsibility to role via API
    And User assign the position to Employee
    When User attach the role to position
    And User relieves the position assignment
    Then User calls the Get Responsibility Assignment API
    And Verify that responsibility assignment status matches relieved pattern with dynamic word

  @ER-2310 @ER-2765 @REGRESSION-API @EMPLOYEES-API
  Scenario:Verify the Badge Status when we Call Get Responsibility API
    Given Position is in status 'Active'
    And that a employee is in status 'Active'
    And user Issue badge to employee with Active Responsibility
    And User has Role
    And user attach responsibility to role via API
    And User assign the position to Employee
    When User attach the role to position
    Then User calls the Get Responsibility Assignment API
    And Verify that responsibility assignment status is "Apprentice"

  @ER-2867 @ER-3269 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify the Employee Assignments Tree API end point
    Given Position is in status 'Active'
    And that a employee is in status 'Active'
    And user Issue badge to employee with Active Responsibility
    And User has Role
    And user attach responsibility to role via API
    And User assign the position to Employee
    When User attach the role to position
    Then User Verify the Employee Assignments Tree API end point

  @ER-3058 @ER-3390 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify archive employee API
    Given that a employee is in status 'Terminated'
    When user calls the archive employee API
    Then verify status for archive employee API to be 200
    And verify the employee is archived

  @ER-3058 @ER-3391 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify archive employee API returns error when employee status is not terminated
    Given that a employee is not in status 'Terminated'
    When user calls the archive employee API
    Then verify status for archive employee API to be 400
    And verify the error message for the archive employee api to be 'You cannot archive a non-terminated employee.'
  
  @ER-2970 @ER-4090 @REGRESSION-API @EMPLOYEES-API
    Scenario:Verify  delete employee API has messsage 'Only draft employees can be deleted ' in response.
        Given that a employee is in status 'Active'
        When you delete the employee
        Then verify message Only draft employees can be deleted
    
    @ER-4109 @ER-4157 @REGRESSION-API @EMPLOYEES-API
    Scenario:Verify the Badge Coach/Master Fields to Employee Response
        Given that a employee is in status 'Active'
        And user add a badge with reason via API
        When Create a user via API
        Then verify the Badge Master field in the employee response
