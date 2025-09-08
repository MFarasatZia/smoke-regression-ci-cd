
Feature: Account > Organization > Employees

  @READ-510 @ER-1331 @REGRESSION @EMPLOYEES
  Scenario: Verify Select Employee to Filter by Availability
    Given user have 2 employees
    When the user opens the Employees Filter modal
    And the user selects Availability to filter by
    And Availability is NOT No Filter
    And the user clicks on the save filter button
    Then the user should see a list of employees filtered by that availability

  @READ-510 @ER-1332 @REGRESSION @EMPLOYEES
  Scenario: Verify Remove Filters Option
    Given the user has employees with different statuses
    When the Employee Organization list has at least one filter applied
    And the user remove a filter
    Then the user should see the employee list filtered by the remaining filters

  @READ-533 @ER-1333 @REGRESSION @SMOKE @EMPLOYEES
  Scenario: Verify Terminating an Employee
    Given that a employee is in status 'Active'
    When user navigate to 'Employees' page
    And user click on a specific Employee with status 'Active'
    When user select option 'Terminate' from menu
    And user clicks on Terminate button
    Then verify employee status is changed to terminated

  @READ-640 @ER-1342 @REGRESSION @EMPLOYEES @SMOKE
  Scenario: Verify Re-activate option for employee
    Given that a employee is in status 'Terminated'
    And user navigate to 'Employees' page
    And user click on a specific Employee with status 'terminated'
    When user select option 'Re-Activate' from menu
    And user click on Re-Activate button
    Then verify transition the employee in status Active

  @ER-19 @ER-651 @REGRESSION @EMPLOYEES
  Scenario: verify auto Clear search When Adding a new Employee
    Given the user has just created an employee
    And the search was automatically applied
    When you add an employee immediately after that
    And applies the new search for the employee just added

  @ER-24 @ER-495 @REGRESSION @EMPLOYEES
  Scenario: Verify Employees are sorted by name A..Z
    Given there are at least 10 employees on the Account > Organization page
    When user navigate to 'Employees' page
    Then Verify the 'Employees' are sorted in A-Z order

  @ER-415 @ER-796 @ER-3368 @REGRESSION @EMPLOYEES 
  Scenario: Verify uploading a profile picture for an Employee
    Given that a employee is in status 'Active'
    And user navigates to 'Employees' page
    And user click on a specific Employee with status 'Active'
    When user select option 'Change Picture' from menu
    And user upload a picture for the employee
    Then verify that 'Remove' option is not disabled
    And verify that 'Change Picture' option is not disabled
    And verify that 'Save' option is not disabled
    And user click on the save option for change picture
    And verify picture for the employee is updated

  @ER-414 @ER-777 @REGRESSION @EMPLOYEES
  Scenario: Verify that previously uploaded employee picture shows when changing it
    Given that a employee is in status 'Active'
    And user navigates to 'Employees' page
    And an 'active' employee already have a profile picture
    And user click on a specific Employee with status 'Active'
    When user select option 'Change Picture' from menu
    Then user is shown with previously uploaded profile
    And user Remove the picture for the employee
    Then verify the picture for the employee is removed

  @ER-1125 @ER-1404 @REGRESSION @EMPLOYEES
  Scenario: Verify Employee Active count on left navigation
    Given that a employee is in status 'Active'
    When user navigates to 'Employees' page
    Then verify Employees active counts on left navigation

  @ER-12 @ER-4392 @ER-1573 @ER-11 @ER-1563 @REGRESSION @EMPLOYEES
  Scenario: Verify that the give acess to Employee Service only
    Given that a employee is in status 'Active'
    And Create a new user with API
    And user navigates to 'Employees' page
    And user click on a specific Employee with status 'Active'
    When user select option 'Give Access' from menu
    And User enters email in add employee field
    And User click on Next button
    Then user select the 'My Stuff only' to give access to employee
    And User click on Next button
    And user click on invite button