Feature: Account > Organization > Employees

  @READ-247 @ER-647 @REGRESSION @EMPLOYEES
  Scenario: Verify Activate Action is visible
    Given that a employee is in status 'Draft'
    When user navigate to 'Employees' page
    And user click on a specific Employee with status 'Draft'
    Then verify that 'Activate' option is displayed
    And verify that 'Delete' option is displayed

  @READ-247 @ER-648 @REGRESSION @EMPLOYEES
  Scenario: Verify Terminate Action is visible
    Given that a employee is in status 'Active'
    When user navigate to 'Employees' page
    And user click on a specific Employee with status 'Active'
    Then verify that 'Terminate' option is displayed
    And verify that 'Activate' option is not displayed
    And verify that 'Delete' option is not displayed
    And verify that 'Re-Activate' option is not displayed

  @READ-247 @ER-649 @REGRESSION @EMPLOYEES
  Scenario: Verify Re-activate Actions for Terminated Employee Status
    Given that a employee is in status 'Terminated'
    When user navigate to 'Employees' page
    And user click on a specific Employee with status 'terminated'
    Then verify that 'Re-activate' option is displayed
    And verify that 'Terminate' option is not displayed

  @READ-177 @ER-3367 @REGRESSION @SMOKE @EMPLOYEES
  Scenario: Verify User is Able to Edit an Employee
    Given that a employee is in status 'Draft'
    And user navigate to 'Employees' page
    And user click on a specific Employee with status 'Draft'
    And user select option 'Rename' from menu
    Then verify User Edit the Employee
    And the user clicks the edit employee save button
    And the changes should be reflected in the table

  @ER-4726 @ER-4796 @REGRESSION @SMOKE @EMPLOYEES
  Scenario: Verify Activating an employee with status Draft
    Given that a employee is in status 'Draft'
    And user navigate to 'Employees' page
    When user click on a specific Employee with status 'Draft'
    And user select option 'Activate' from menu
    And the user clicks the activate button
    Then verify employee status changes to Active

  @READ-390 @ER-1324 @REGRESSION @SMOKE @EMPLOYEES
  Scenario: Verify Deleting an Employee through
    Given that a employee is in status 'Draft'
    And user navigate to 'Employees' page
    And user click on a specific Employee with status 'Draft'
    When user select option 'Delete' from menu
    And the user clicks the delete button
    Then verify employee to dissapears from the table

  @ER-106 @ER-3472 @SMOKE @REGRESSION @EMPLOYEES
  Scenario: Verify the User can see all the assignments created as a tree in the Employee > Path to Readiness
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
    And user click on a specific Employee name
    And User land on the path to readiness
    And Verify the Title Employee Path To Readiness
    And Verify that When Readiness is zero then show zero
    And the user hovers over the Importance component
    Then verify Importance selector tooltip should be visible
    And User see all the assignments created as a tree in the Employee > Path to Readiness

# @ER-2572 @ER-3465 @REGRESSION @EMPLOYEES
# Scenario: Verify Employee Position Assignments counter count active position assignments
#   Given that a employee is in status 'Active'
#   And user assigns active position to employee
#   When user navigate to 'Employees' page
#   And user click on a specific Employee name
#   And user clicks the Employee Positions Menu
#   Then verify the default filter is active
#   And verify assignments counter is counting active assignments
