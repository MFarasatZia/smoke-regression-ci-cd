Feature: Account > Organization > Employees

    @ER-3830 @ER-4025 @ER-4139 @REGRESSION @EMPLOYEES
    Scenario: Employee > Path to Readiness - Auto Recalculate Readiness for Coach Badge
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And User has Role
        And user have responsibility is in status 'Active'
        And user attach responsibility to role via API
        And User attach the role to position
        And User assign the position to Employee
        And User calls the create badge for level 2 employee API
        And user navigates to 'Employees' page
        And user click on a specific Employee name
        And user expands position and role in path to readiness
        And user verifies the active Responsibility assignment is visible
        When User Gives a Upgrade Badge to Responsibility
        And verify that the Appretice Badge is 'Can coach and evaluate others'
        And verify that Give Badge Modal is visible
        And user clicks on Give Upgrade Badge button
        And user expands position and role in path to readiness
        And verify 'Coach' badge
        Then verify the readiness value 125%

    @ER-3830 @ER-4025 @ER-4140 @REGRESSION @EMPLOYEES
    Scenario: Employee > Path to Readiness - Auto Recalculate Readiness for Master Badge
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And User has Role
        And user have responsibility is in status 'Active'
        And user attach responsibility to role via API
        And User attach the role to position
        And User assign the position to Employee
        And User calls the create badge for level 3 employee API
        And user navigates to 'Employees' page
        And user click on a specific Employee name
        And user expands position and role in path to readiness
        And user verifies the active Responsibility assignment is visible
        And User Gives a Upgrade Badge to Responsibility
        And verify that the Appretice Badge is 'Creates Standards'
        And verify that Give Badge Modal is visible
        And user clicks on Give Upgrade Badge button
        When user expands position and role in path to readiness
        And verify 'Master' badge
        Then verify the readiness value 150%
        And User Click on the Master inspection badge
        And User Click on Remove Badge button
        And verify that the Appretice Badge is 'Can do without supervision'

    @ER-4145 @ER-4282 @SMOKE @REGRESSION @EMPLOYEES
    Scenario: Verify Employee > Path to Readiness- No assignment use case
        Given that a employee is in status 'Active'
        And that a position is in status 'Active'
        And user navigate to 'Employees' page
        When user click on a specific Employee name
        Then verify no position assigned yet text is visible
        And verify assign button is visible
        And user clicks on assign button
        And Verifies the Assign to Occupy Position modal is displayed
        And user selects the position
        And user clicks the next button
        And user clicks the assign button
        And verify the position is visible in path to readiness page

    @ER-4153 @ER-4284 @SMOKE @REGRESSION @EMPLOYEES
    Scenario: Verify Employee > Path to Readiness> Draft use case
        Given that a employee is in status 'Draft'
        And user navigate to 'Employees' page
        When user click on a specific Employee name
        Then verify employee not yet activated text is visible
        And verify Activate button is visible on path to readiness page
        And user clicks on the activate button on path to readiness page
        And user activates the employee
        And verify employee is activated

    @ER-4153 @ER-4289 @SMOKE @REGRESSION @EMPLOYEES
    Scenario: Verify Employee > Path to Readiness> Terminated use case
        Given that a employee is in status 'Terminated'
        And user navigate to 'Employees' page
        When user click on a specific Employee name
        Then verify Employee Status: Terminated text is visible
        And verify Re-activate button is visible on path to readiness page
        And user clicks on the Re-activate button on path to readiness page
        And user Re-activate the employee
        And verify employee is activated


    @ER-4197 @ER-4777 @REGRESSION @EMPLOYEES
    Scenario: verify that Position is excluded from 'Prepares for' column
        Given that a employee is in status 'Active'
        And that a position is in status 'Active'
        And user navigates to 'Employees' page
        And Search specific Employee with status 'Active'
        And User click on the Assign to Employee button
        And Verifies the Assign to Occupy Position modal is displayed
        And user selects the position
        And user clicks the next button
        And user clicks the assign button
        And verify the modal is closed
        And verify the position is assigned
        And user views the 'Prepares for' column
        When user clicks on Assign to prepare for position
        And user picks the position for prepare for
        Then verify that Position is excluded from 'Prepares for' column

    @ER-4387 @ER-4705 @REGRESSION @EMPLOYEES
    Scenario: Verify active responsibilityassignments are visible at Path to Readiness page
        Given that a employee is in status 'Active'
        And Position is in status 'Active'
        And User has Role
        And User attach the role to position
        And User assign the position to Employee
        And user navigates to 'Employees' page
        And user click on a specific Employee name
        When user have responsibility is in status 'Active'
        And user attach responsibility to role via API
        Then user verifies the active Responsibility assignment is visible

    @ER-4466 @ER-4004 @REGRESSION @EMPLOYEES
    Scenario: Verify Activate Role show created assignment in Path to Readiness
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And user have responsibility is in status 'Active'
        And User has Role
        And user attach responsibility to role via API
        And User assign the position to Employee
        When User attach the role to position
        And user navigates to 'Employees' page
        And user click on a specific Employee name
        And user clicks the Employee Positions Menu
        And Verified that Responsibility assignment is visible
        And verify assignment status is Active as 'active'
        And user have responsibility is in status 'Retired'
        And user clicks the Employee Positions Menu
        And Verified that Responsibility assignment is visible
        Then verify assignment status is Active as 'active'

    @ER-5086 @ER-5199 @REGRESSION @EMPLOYEES
    Scenario: verify the user drills down into Path to Readiness page
        Given that a employee is in status 'Active'
        And that a position is in status 'Active'
        And user navigates to 'Employees' page
        And Search specific Employee with status 'Active'
        And User click on the Assign to Employee button
        And Verifies the Assign to Occupy Position modal is displayed
        And user selects the position
        And user clicks the next button
        And user clicks the assign button
        And verify the modal is closed
        When the user hovers over the cross icon for primary position
        Then verify the tooltip 'Relive' is shown
        And the user clicks on roles responsibility assignment component
        And verify the user drills down into Path to Readiness page

    @ER-5439 @ER-5516 @REGRESSION @EMPLOYEES
    Scenario: Assign Position to Employee Button Working at Employee Path to Readiness
        Given that a employee is in status 'Active'
        And that a position is in status 'Active'
        And user navigate to 'Employees' page
        And Search specific Employee with status 'Active'
        And user click on a specific Employee name
        And user clicks the Employee Assign button
        And Verifies the Assign to Occupy Position modal is displayed
        And user selects the position
        And user clicks the assign button
        When user Hover on the primary position assignment
        Then verify the position assignment is assigned as primary