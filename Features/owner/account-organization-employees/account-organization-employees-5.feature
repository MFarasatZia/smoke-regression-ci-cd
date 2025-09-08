
Feature: Account > Organization > Employees

    @ER-3152 @ER-3157 @ER-3489 @REGRESSION @EMPLOYEES
    Scenario: Verify archive option and filter is visible and working for employee
        Given that a employee is in status 'Terminated'
        And user navigate to 'Employees' page
        When user click on a specific Employee with status 'Terminated'
        And verify that 'Archive' option is displayed
        Then user select option 'Archive' from menu
        And user clicks on confirm button
        And verify no employees found text is displayed
        And user clicks on clear button
        And user clicks on filter button
        And user select 'Show' filter option
        And the user clicks on the save filter button
        And the user searches for the employee
        And verify Archived status is displayed

    @ER-3425 @ER-3523 @REGRESSION @EMPLOYEES
    Scenario:Verify UnArchive option is visible and working for employee
        Given that a employee is in status 'Terminated'
        And user calls the archive employee API
        And user calls the Un-Archive employee API
        When user click on a specific Employee with status 'Terminated'
        And the user clicks on the employee's three-dot menu button
        Then verify 'Unarchive' option is not visible

    @ES-77 @ER-3353 @REGRESSION @EMPLOYEES
    Scenario:Verify badge and status of employee assignments when assignments are new
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
        Then verify the default filter is active
        And verify assignments counter is counting active assignments
        And Verified that Responsibility assignment is visible
        Then verify assignment status is Active as 'active'

    @ES-77 @ER-3355 @REGRESSION @EMPLOYEES
    Scenario:Verify status of employee assignments when employee is terminated
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And user have responsibility is in status 'Active'
        And User has Role
        And user attach responsibility to role via API
        And User assign the position to Employee
        And User attach the role to position
        And user navigates to 'Employees' page
        And user click on a specific Employee name
        When user clicks on Employee Profile menu
        And user select option 'Terminate' for employee
        And user clicks on Terminate button
        And user clicks the Employee Positions Menu
        And Verified that Responsibility assignment is visible
        Then verify assignment status is Terminated as 'terminated'

    @ES-77 @ER-3354 @REGRESSION @EMPLOYEES
    Scenario:Verify status of employee assignments when position is relieved form employee
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And user have responsibility is in status 'Active'
        And User has Role
        And user attach responsibility to role via API
        And User assign the position to Employee
        When User attach the role to position
        And user navigates to 'Employees' page
        And user Search specific Employee name
        And user click on a specific Employee name
        And user clicks the Employee Positions Menu
        And Verified that Responsibility assignment is visible
        Then verify assignment status is Relieved as 'relieved'

    @ER-3813 @ER-3850 @REGRESSION @SMOKE @EMPLOYEES
    Scenario: Verify that the Retired Position is not shown when the user clicks on the assign button
        Given that a employee is in status 'Active'
        And that a position is in status 'Retired'
        And user navigate to 'Employees' page
        And Search specific Employee with status 'Active'
        When User click on the Assign to Employee button
        And Verifies the Assign to Occupy Position modal is displayed
        And user selects the position
        Then Verify that no position match result

    @ER-2944 @ER-3888 @REGRESSION @SMOKE @EMPLOYEES
    Scenario: Verify current badge is visible on Employee > Badges page
        Given that a employee is in status 'Active'
        And user add a badge with reason via API
        And user navigates to 'Employees' page
        And user click on a specific Employee name
        When user clicks the Employee Badge Menu
        Then verify current badge is visible
        And verify issued byon is visible
        And verify reason is visible
        And user removes the badge
        And verify no badge appears
        And user clear the filter
        And user clicks on filter button
        And user selects 'Removed' badge filter
        And user clicks on save filter button
        And user verify remove badge is visible
        And user verify the badge counter

    # @ER-3837 @ER-3900 @REGRESSION @EMPLOYEES
    # Scenario: Verify Employee > Badges Filters are working
    #     Given that a employee is in status 'Active'
    #     And user add a badge with reason via API
    #     And user navigates to 'Employees' page
    #     And user click on a specific Employee name
    #     When user clicks the Employee Badge Menu
    #     Then verify default filter is current
    #     And verify current badge is visible
    #     And user removes the badge
    #     And verify no badge appears
    #     And user clear the filter
    #     And user clicks on filter button
    #     And user selects 'Removed' badge filter
    #     And user clicks on save filter button
    #     And user verify remove badge is visible
    #     And user verify the badge counter

    @ER-3882 @ER-3988 @REGRESSION @EMPLOYEES
    Scenario:Verified that the Importance Selector does not open for Terminated assignments
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And user have responsibility is in status 'Active'
        And User has Role
        And user attach responsibility to role via API
        And User assign the position to Employee
        And User attach the role to position
        And user navigate to 'Employees' page
        And user click on a specific Employee name
        When user clicks on Employee Profile menu
        And user select option 'Terminate' for employee
        And user clicks on Terminate button
        And user clicks the Employee Positions Menu
        And User Click on Imortance Selector Component
        Then Verified that the Importance Selector does not open for Terminated assignments
