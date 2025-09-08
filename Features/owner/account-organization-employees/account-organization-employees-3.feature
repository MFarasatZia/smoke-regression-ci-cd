
Feature: Account > Organization > Employees

  # @ER-1098 @ER-1525 @REGRESSION @EMPLOYEES
  # Scenario:User applies filters, navigates away, and returns in Organization-Employee
  #   Given the user has employees with different statuses
  #   And user navigate to 'Employees' page
  #   When user open Employees Filter modal
  #   And user select the 'draft' Status
  #   And the user clicks on the save filter button
  #   And verify that list of employees filtered by 'draft' status
  #   And user navigate to 'Position' page
  #   And user navigate to 'Employees' page
  #   Then verify that list of employees filtered by 'draft' status

  # @ER-1098 @ER-1525 @REGRESSION @EMPLOYEES
  # Scenario:User applies filters, navigates away, and returns in Organization-Employee
  #   Given the user has employees with different statuses
  #   And user navigate to 'Employees' page
  #   When user open Employees Filter modal
  #   And user select the 'active' Status
  #   And the user clicks on the save filter button
  #   And the filters should remain applied after the page reloads
  #   And verify that list of employees filtered by 'active' status
  #   And user navigate to 'Position' page
  #   And user navigate to 'Employees' page
  #   Then verify that list of employees filtered by 'active' status

  # @ER-1098 @ER-1525 @REGRESSION @EMPLOYEES
  # Scenario:User applies filters, navigates away, and returns in Organization-Employee
  #   Given the user has employees with different statuses
  #   And user navigate to 'Employees' page
  #   When user open Employees Filter modal
  #   And user select the 'terminated' Status
  #   And the user clicks on the save filter button
  #   And the filters should remain applied after the page reloads
  #   And verify that list of employees filtered by 'terminated' status
  #   And user navigate to 'Position' page
  #   And user navigate to 'Employees' page
  #   Then verify that list of employees filtered by 'terminated' status

  @ER-1706 @ER-1948 @EMPLOYEES
  Scenario: Verify user Change position Capacity
    Given that a employee is in status 'Active'
    And user navigate to 'Employees' page
    And Search specific Employee with status 'Active'
    When user clicks on the employee capacity icon
    And user see employee current capacity selected
    When user changes employee capacity
    Then user verify capacity changing in the employee line

  @ER-1744 @ER-1745 @REGRESSION @EMPLOYEES
  Scenario: Verify employee details do not disappear when clicking Save as Draft button
    Given User is on "Employees" Page
    When the user should land on the Employees Organization page
    Then the user should see a list of Employees
    When user adds an employee
    Then verify that automatically search the employee by its full name
    And the user should see the employee filtered by the search in the table

  @ER-1651 @ER-2496 @ER-4094 @ER-4194 @SMOKE @REGRESSION @EMPLOYEES
  Scenario: Verify the Clickable assignments button on Position>attached Role
    Given that a employee is in status 'Active'
    And that a position is in status 'Active'
    And user navigate to 'Employees' page
    And Search specific Employee with status 'Active'
    When User click on the Assign to Employee button
    And Verifies the Assign to Occupy Position modal is displayed
    And user selects the position
    And user clicks the next button
    And user clicks the assign button
    And verify the position is assigned
    And user navigate to 'Position' page
    And user selects a specific position
    Then Employee is assigned to Primary Position
    And Verify that Capacity Selector Does Not Open
    Then Verify the Primary Occupation Tag for Full time Employee in Positions Organization

  @ER-2621 @ER-2902 @ER-4094 @SMOKE @REGRESSION @EMPLOYEES
  Scenario: Verify user is able to relieve a reassigned position to an employee in organization > employees page
    Given that a employee is in status 'Active'
    And that a position is in status 'Active'
    And user navigate to 'Employees' page
    And Search specific Employee with status 'Active'
    When User click on the Assign to Employee button
    And Verifies the Assign to Occupy Position modal is displayed
    And user selects the position
    And user clicks the next button
    And user clicks the assign button
    Then verify the modal is closed
    And verify the position is assigned
    And user relieves the position
    And user reassigns the position to employee
    And verify the modal is closed
    And verify the position is reassigned to employee
    And user relieves the position
    And user verify position has no assigned employee

# @ER-1592 @ER-2897 @ER-4094 @SMOKE @REGRESSION @EMPLOYEES
# Scenario: Verify That User can Relieve the Employee of the Primary Position assignment
#   Given that a employee is in status 'Active'
#   And that a position is in status 'Active'
#   And user navigate to 'Employees' page
#   And Search specific Employee with status 'Active'
#   When User click on the Assign to Employee button
#   And Verifies the Assign to Occupy Position modal is displayed
#   And user selects the position
#   And user clicks the next button
#   And user clicks the assign button
#   And verify the position is assigned
#   Then Verify that Relieve Employee Icon in clickable
#   And Verify That User can Relieve the Employee of the Primary Position assignment

# @ER-1710 @ER-2941 @ER-4094 @ER-4194 @SMOKE @REGRESSION @EMPLOYEES
# Scenario: Verify that the Capacity Selector Does Not Open When an Employee is Assigned to a Primary Position
#   Given that a employee is in status 'Active'
#   And that a position is in status 'Active'
#   And user navigate to 'Employees' page
#   And Search specific Employee with status 'Active
#   And User click on the Assign to Employee button
#   And Verifies the Assign to Occupy Position modal is displayed
#   And user selects the position
#   And user clicks the next button
#   And user clicks the assign button
#   And verify the position is assigned
#   And user navigate to 'Position' page
#   When user selects a specific position
#   Then Employee is assigned to Primary Position
#   And Verify that Capacity Selector Does Not Open

# @ER-2624 @ER-2455 @ER-2785 @REGRESSION @EMPLOYEES
# Scenario: Verify the Add Employee Modal After Closing the Assign to Primary Employee Modal
#   Given that a employee is in status 'Draft'
#   And user navigate to 'Employees' page
#   And the user searches for the employee
#   When the user clicks on the employee's three-dot menu button
#   And user select option 'Activate' from menu
#   And the user clicks the activate button
#   When User click on the Assign to Employee button
#   And User close the Assign to Employee Modal
#   And Click on the Add Employee button
#   Then Verify the Add Employee Modal