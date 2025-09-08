Feature: Account > Organization > Employees

    @ER-5007 @ER-5527 @REGRESSION @EMPLOYEES
    Scenario: Drag and Drop Reorder Responsibilities Under Role in Path to Readiness
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And User has Role
        And user have 3 responsibilities is in status 'Active'
        And attach all 3 responsibilities to Role
        And User attach the role to position
        And user assign the position to Employee
        When user navigates to 'Roles' page
        And user searches the role
        And user click on the expand arrow
        And user reorders the responsibilities sequence via drag and drop
        And user navigates to 'Employees' page
        And user click on a specific Employee name
        And User land on the path to readiness
        When user expands position and role in path to readiness
        Then user verify the responsibilities order

    @ER-5441 @ER-5535 @REGRESSION @EMPLOYEES
    Scenario: Verify that Count of Attach Active Role is 1 and Count of Attach Active Responsibility is 1
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And user have responsibility is in status 'Active'
        And User has Role
        And user attach responsibility to role via API
        And User assign the position to Employee
        And User attach the role to position
        And user navigates to 'Employees' page
        When Search specific Employee with status 'Active'
        Then verify that Count of Attach Active Role is 1
        And verify that Count of Attach Active Responsibility is 1

    @ER-5503 @ER-5598 @REGRESSION @EMPLOYEES
    Scenario: Verify employee count in sidebar only increases when employee is activated
        Given that a employee is in status 'Draft'
        When user navigates to 'Employees' page
        And verify employee count in sidebar before activation
        And user click on a specific Employee with status 'Draft'
        And user select option 'Activate' from menu
        And the user clicks the activate button
        Then verify employee count in sidebar after activation