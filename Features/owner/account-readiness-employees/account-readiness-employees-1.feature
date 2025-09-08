Feature: Account > Readiness > Employees > Employee > Path to Readiness

  @ER-262 @NeedFixing @EMPLOYEE-PATH-TO-READINESS
  Scenario: View Employee Readiness
    When you navigate to Account > Readiness > Employees
    Then you land on Employees Readiness page
    And you see list of active employees
    And the current readiness
    And their Primary readiness
    And their backup readiness
    And their preparing for readiness
    And their acting as readiness

  @ER-803 @ER-982 @FIX @EMPLOYEE-PATH-TO-READINESS
  Scenario: Verify Terminate option in Menu in Readiness < Employees < Employee profile works
    Given that a employee is in status 'Active'
    And user navigates to 'ReadinessEmployees' page
    And user click on a specific Employee name
    When user clicks on Employee Profile menu
    And user select option 'Terminate' for employee
    Then employee status gets Termianted
    And employee gets disappeared from the employees list

  @ER-803 @ER-1015 @FIX @NeedFixing @EMPLOYEE-PATH-TO-READINESS
  Scenario: Verify Edit option in Menu in Readiness < Employees < Employee profile works
    Given that a employee is in status 'Active'
    And user navigates to 'ReadinessEmployees' page
    And user click on a specific Employee name
    And user clicks on Employee Profile menu
    When user select option 'Edit' for employee
    And the user updates the First Name, Last Name, and Title
    And the user clicks the save button
    Then the changes should be reflected in the table

  @ER-803 @ER-1016 @FIX @EMPLOYEE-PATH-TO-READINESS
  Scenario: Verify Change Picture option in Menu in Readiness < Employees < Employee profile works
    Given that a employee is in status 'Active'
    And user navigates to 'Employees' page
    And user click on a specific Employee name
    And user clicks on Employee Profile menu
    When user select option 'Change Picture' for employee
    And user upload a picture for the employee
    Then verify that 'Remove' option is not disabled
    And verify that 'Change Picture' option is not disabled
    And verify that 'Save' option is not disabled
    And user click on the save option for change picture
    And verify picture for the employee is updated

  @ER-1969 @ER-2065 @REGRESSION @EMPLOYEE-PATH-TO-READINESS
  Scenario: Verfiy the employee name should be hyperlinked
    Given user create an employee via API
    And user navigate to 'Employees' page
    When user look at the Employee name
    Then Verify that No Underlines Employee show to user

  @ER-1968 @ER-2038 @ER-2042 @REGRESSION @EMPLOYEE-PATH-TO-READINESS
  Scenario: Verify Employee Menu in Draft Status
    Given that a employee is in status 'Draft'
    When user navigates to 'Employees' page
    Then User hover on three dots menu to Verify the Magenta color

  @ER-491 @ER-771 @REGRESSION @EMPLOYEES
  Scenario: Verify when User click on the Employee Name in organizations it should land on the Employee Page
    Given user create an employee via API
    And user navigate to 'Employees' page
    And user look at the Employee name
    And verify the Employee sidebar is visible
    And the user should see the employee name hyperlinked
    And Verify the Magenta area when user Hover over Employee name in Employees Organization
    And user click on a specific Employee name
    And verify Readiness bar value should match Path to Readiness value
    Then verify the Employee sidebar is visible
    And User land on the path to readiness

  @ER-331 @ER-534 @REGRESSION @EMPLOYEES
  Scenario: Verify the expandable sidebar menu on Employee page
    Given there is a Employee
    When user navigate to 'Employees' page
    And user click on a specific Employee name
    Then verify the Employee sidebar is visible
    And hover on the sidebar expands the side bar
  
  @ER-803 @ER-981 @REGRESSION @EMPLOYEES
  Scenario: Verify Activate option in Menu in Organization < Employees < Employee profile works
    Given that a employee is in status 'Draft'
    And user navigates to 'Employees' page
    And user click on a specific Employee name
    When user clicks on Employee Profile menu
    And user select option 'Activate' for employee
    Then verify employee status changes to Active

  @ER-803 @ER-1010 @REGRESSION @EMPLOYEES
  Scenario: Verify Terminate option in Menu in Organization < Employees < Employee profile works
    Given that a employee is in status 'Active'
    And user navigates to 'Employees' page
    And user click on a specific Employee name
    When user clicks on Employee Profile menu
    And user select option 'Terminate' for employee
    And user clicks on Terminate button
    Then employee status gets Termianted

  @ER-803 @ER-1011 @REGRESSION @EMPLOYEES
  Scenario: Verify Re-Activate option in Menu in Organization < Employees < Employee profile works
    Given that a employee is in status 'Terminated'
    And user navigates to 'Employees' page
    And user click on a specific Employee name
    When user clicks on Employee Profile menu
    And user select option 'Re-Activate' for employee
    And user clicks on Reactivate button
    Then verify employee status changes to Active

  @ER-803 @ER-1012 @REGRESSION @EMPLOYEES
  Scenario: Verify Edit option in Menu in Organization < Employees < Employee profile works
    Given that a employee is in status 'Active'
    And user navigates to 'Employees' page
    And user click on a specific Employee name
    And user clicks on Employee Profile menu
    When user select option 'Edit' for employee
    And the user updates the First Name, Last Name, and Title
    And the user clicks the save button
    Then the changes should be reflected in the table

  @ER-753 @ER-1366 @FIX @EMPLOYEES
  Scenario: Verify Chatter Records are grouped by latest created by in Organization < Employees
    Given that a employee is in status 'Draft'
    And user navigates to 'Employees' page
    And user click on a specific Employee name
    And user clicks on Employee Profile menu
    And user select option 'Activate' for employee
    And user clicks Activate button
    And employee status gets Active
    When user clicks the Chatter employee tab
    And verify records are present on the chatter table
    And records are visible on the chatter table
    Then verify that chatter records are grouped in Today
  
  #  @ER-2614 @ER-2781 @REGRESSION @EMPLOYEES
  # Scenario: Verify Give access option is working with Scale Readiness in Organization > Employess > Employee profile
  #   Given that a employee is in status 'Active'
  #   And Create a new user with API
  #   And user navigates to 'Employees' page
  #   And user click on a specific Employee name
  #   And user clicks on Employee Profile menu
  #   When user select option 'Give Access' for employee
  #   And User enters email in add employee field
  #   And User click on Next button
  #   Then user select the 'Selective Apps Access' to give access to employee
  #   And User Select access 'Scale Readiness' to apps for Employee
  #   And user click on invite button

  # @ER-2614 @ER-2782 @REGRESSION @EMPLOYEES
  # Scenario: Verify Give access option is working with Scale Knolwedge in Organization > Employess > Employee profile
  #   Given that a employee is in status 'Active'
  #   And Create a new user with API
  #   And user navigates to 'Employees' page
  #   And user click on a specific Employee name
  #   And user clicks on Employee Profile menu
  #   When user select option 'Give Access' for employee
  #   And User enters email in add employee field
  #   And User click on Next button
  #   Then user select the 'Selective Apps Access' to give access to employee
  #   And User Select access 'Scale Knolwedge' to apps for Employee
  #   And user click on invite button

  # @ER-2614 @ER-2783 @REGRESSION @EMPLOYEES
  # Scenario: Verify Give access option is working with Scale Performance in Organization > Employess > Employee profile
  #   Given that a employee is in status 'Active'
  #   And Create a new user with API
  #   And user navigates to 'Employees' page
  #   And user click on a specific Employee name
  #   And user clicks on Employee Profile menu
  #   When user select option 'Give Access' for employee
  #   And User enters email in add employee field
  #   And User click on Next button
  #   Then user select the 'Selective Apps Access' to give access to employee
  #   And User Select access 'Scale Performance' to apps for Employee
  #   And user click on invite button