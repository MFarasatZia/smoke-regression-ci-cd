Feature: Account > Organization > Employees

  @ER-15 @ER-4392 @ER-1575 @ER-11 @ER-1563 @REGRESSION @EMPLOYEES
  Scenario:Verify that Employee Access the Scale Readiness
    Given that a employee is in status 'Active'
    And Create a new user with API
    And user navigates to 'Employees' page
    And user click on a specific Employee with status 'active'
    When user select option 'Give Access' from menu
    And User enters email in add employee field
    And User click on Next button
    Then user select the 'Selective Apps Access' to give access to employee
    And User Select access 'Scale Readiness' to apps for Employee
    And User click on Next button
    And user click on invite button

  # @ER-15 @ER-4392 @ER-1623 @ER-11 @ER-1563 @REGRESSION @EMPLOYEES
  # Scenario:Verify that Employee Access the Scale Knolwedge
  #   Given that a employee is in status 'Active'
  #   And Create a new user with API
  #   And user navigates to 'Employees' page
  #   And user click on a specific Employee with status 'active'
  #   When user select option 'Give Access' from menu
  #   And User enters email in add employee field
  #   And User click on Next button
  #   Then user select the 'Selective Apps Access' to give access to employee
  #   And User Select access 'Scale Knolwedge' to apps for Employee
  #   And User click on Next button
  #   And user click on invite button

  # @ER-15 @ER-4392 @ER-1624 @ER-11 @ER-1563 @REGRESSION @EMPLOYEES
  # Scenario:Verify that Employee Access the Scale Performance
  #   Given that a employee is in status 'Active'
  #   And Create a new user with API
  #   And user navigates to 'Employees' page
  #   And user click on a specific Employee with status 'active'
  #   When user select option 'Give Access' from menu
  #   And User enters email in add employee field
  #   When User click on Next button
  #   And user select the 'Selective Apps Access' to give access to employee
  #   And User Select access 'Scale Performance' to apps for Employee
  #   And User click on Next button
  #   And user click on invite button

  # @ER-15 @ER-4392 @ER-1625 @ER-11 @ER-1563 @REGRESSION @EMPLOYEES
  # Scenario:Verify that Employee Access the Scale Compensation
  #   Given that a employee is in status 'Active'
  #   And Create a new user with API
  #   And user navigates to 'Employees' page
  #   And user click on a specific Employee with status 'active'
  #   When user select option 'Give Access' from menu
  #   And User enters email in add employee field
  #   Then User click on Next button
  #   And user select the 'Selective Apps Access' to give access to employee
  #   And User Select access 'Scale Compensation' to apps for Employee
  #   And User click on Next button
  #   And user click on invite button

  @ER-16 @ER-4392 @ER-1568 @REGRESSION @EMPLOYEES
  Scenario:Verify that Email already used for an employee
    Given that a employee is in status 'Active'
    And Create a new user with API
    And user navigates to 'Employees' page
    And user click on a specific Employee with status 'active'
    When user select option 'Give Access' from menu
    And User enters email in add employee field
    Then User click on Next button
    And user select the 'Co-owner access' to give access to employee
    And user click on invite button
    And user click on a specific Employee with status 'active'
    And user select option 'Suspend Access' from menu
    And User click on suspend Buuton
    And User verify employee has access suspended

  @ER-2183 @ER-2370 @ER-4094 @ER-4736 @SMOKE @REGRESSION @EMPLOYEES
  Scenario: Verify after relieve a position assignment to Employee the Position does not have the assigned employee
    Given that a employee is in status 'Active'
    And that a position is in status 'Active'
    And user navigate to 'Employees' page
    And Search specific Employee with status 'Active'
    When User click on the Assign to Employee button
    And Verifies the Assign to Occupy Position modal is displayed
    And user selects the position
    And user clicks the assign button
    Then verify the position is assigned
    And verify user is unable to click availability selector
    And user relieves the position
    And user verify position has no assigned employee

  # @ER-1709 @ER-2449 @SMOKE @REGRESSION @EMPLOYEES
  # Scenario: Verify the Availability Selector when employee has assign primary position option
  #   Given that a employee is in status 'Active'
  #   And user navigate to 'Employees' page
  #   When Search specific Employee with status 'Active'
  #   Then verify assign primary position option visible
  #   And user clicks on the employee capacity icon
  #   And verify capacity modal is displayed

  # @ER-1709 @ER-2451 @SMOKE @REGRESSION @EMPLOYEES
  # Scenario: Verify If Employee is assigned to a primary position then do not open Availability Selector
  #   Given that a employee is in status 'Active'
  #   And that a position is in status 'Draft'
  #   And user navigate to 'Employees' page
  #   And Search specific Employee with status 'Active'
  #   When User click on the Assign to Employee button
  #   And Verifies the Assign to Occupy Position modal is displayed
  #   And user selects the position
  #   And user clicks the next button
  #   And user clicks the assign button
  #   Then verify the position is assigned
  #   And verify user is unble to click availability selector
  #   And Search specific Employee with status 'Active'
  #   And user relieves the position
  #   And user verify position has no assigned employee

  # @ER-1590 @ER-2162 @ER-4124 @SMOKE @REGRESSION @EMPLOYEES
  # Scenario: Show dialog with available positions when assigning to Primary
  #   Given that a employee is in status 'Active'
  #   When user navigate to 'Employees' page
  #   And Search specific Employee with status 'Active'
  #   Then Verify that Assign to Employee button is Display
  #   And User click on the Assign to Employee button
  #   And Verifies the Assign to Occupy Position modal is displayed

  @ER-3828 @ER-4018 @REGRESSION @EMPLOYEES
  Scenario: Verify that Active Filter Should Not Be Applied By Default
    Given Position is in status 'Active'
    And that a employee is in status 'Active'
    And User has Role
    And user have responsibility is in status 'Draft'
    And user attach responsibility to role via API
    And User attach the role to position
    When User assign the position to Employee
    And user navigates to 'Employees' page
    And user click on a specific Employee name
    And user clicks the Employee Positions Menu
    Then Verify that Active Filter Should Not Be Applied By Default