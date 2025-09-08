@backend
Feature: Account > Organization > Employees > API

  @ER-5513 @ER-5584 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify role assignment count in position assignment API
    Given that a employee is in status 'Active'
    And Position is in status 'Active'
    And User has Role
    And user has responsibility is in status 'Active'
    And user attach responsibility to role via API
    And User attach the role to position
    And User assign the position to Employee
    And user terminate the employee via API
    When calling the get position assignment API with status terminated for an employee
    Then verify the position assignment API returns role assignment count as 1

  @ER-5185 @ER-5596 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify role assignment API responses and active status filtering
    Given that a employee is in status 'Active'
    And Position is in status 'Active'
    And User has Role
    And user has responsibility is in status 'Active'
    And user attach responsibility to role via API
    And User attach the role to position
    And User assign the position to Employee
    When user calls the all role assignments API
    Then Role assignment response structure with responsibility assignment count
    And user calls the role assignment API with position assignment ID
    And Role assignment response structure with responsibility assignment count
    And user calls the role assignment API with status 'active'
    And verify only active role assignments are returned when status is active

  @ER-5420 @ER-5459 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify position history active count in the Get Employee information endpoint
    Given that a employee is in status 'Active'
    And user have responsibility is in status 'Active'
    And Position is in status 'Active'
    And user assign position to employee with allocation and commitment 1
    And User has Role
    And user attach responsibility to role via API
    And User assign the position to Employee
    And User attach the role to position
    When user gets the employee details
    Then verify the return response for Employee List status to be 200
    And verify the return response for Employee List structure
    And verify the position history active count is 1

  @ER-5297 @ER-5616 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify Position assignments are filtered by status
    Given User calls the get position assignment Response with status "active"
    Then verify only position assignments with the specified status are returned
    When User calls the get position assignment Response with status "terminated"
    Then verify only position assignments with the specified status are returned
    When User calls the get position assignment Response with status "relieved"
    Then verify only position assignments with the specified status are returned
    When User calls the get position assignment Response with status "detached"
    Then verify only position assignments with the specified status are returned

  @ER-5297 @ER-5617 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify Role assignments are filtered by status
    Given user calls the role assignment API with status "active"
    Then verify only role assignments with the specified status are returned
    When user calls the role assignment API with status "terminated"
    Then verify only role assignments with the specified status are returned
    When user calls the role assignment API with status "retired"
    Then verify only role assignments with the specified status are returned
    When user calls the role assignment API with status "detached"
    Then verify only role assignments with the specified status are returned

  @ER-5297 @ER-5618 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify Responsibility assignments are filtered by status
    Given user calls the responsibility assignment API with status "active"
    Then verify only responsibility assignments with the specified status are returned
    When user calls the responsibility assignment API with status "terminated"
    Then verify only responsibility assignments with the specified status are returned
    When user calls the responsibility assignment API with status "retired"
    Then verify only responsibility assignments with the specified status are returned
    When user calls the responsibility assignment API with status "detached"
    Then verify only responsibility assignments with the specified status are returned