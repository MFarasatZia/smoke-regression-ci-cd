Feature: Account > Organization > Employees

    @ER-3853 @ER-3935 @REGRESSION @EMPLOYEES
    Scenario: Verify Date and Time is visible in Remove On and Issued On
        Given that a employee is in status 'Active'
        And user add a badge with reason via API
        And user navigates to 'Employees' page
        And user click on a specific Employee name
        When user clicks the Employee Badge Menu
        Then date and time is visible on Issued ByOn column
        And user removes the badge
        And verify no badge appears
        And user clear the filter
        And date and time is visible on Removed ByOn column

    @ER-3921 @ER-4004 @REGRESSION @EMPLOYEES
    Scenario: Verify Activate Role show created assignment in Path to Readiness
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And User has a Role in draft
        And user have responsibility is in status 'Draft'
        And user attach responsibility to role via API
        And User attach the role to position
        When User assign the position to Employee
        And user navigates to 'Employees' page
        And user click on a specific Employee name
        Then verify role assignment is not visible
        And user activates the role
        And user activates the responsibility
        And user verifies the active role assignment is visible
        And user verifies the active Responsibility assignment is visible

    @ER-3876 @ER-4016 @REGRESSION @EMPLOYEES
    Scenario: Verify Activate Responsibility show created assignment in Path to Readiness
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And User has Role
        And user have responsibility is in status 'Draft'
        And user attach responsibility to role via API
        And User attach the role to position
        When User assign the position to Employee
        And user navigates to 'Employees' page
        And user click on a specific Employee name
        And user activates the responsibility
        And user expands position and role in path to readiness
        Then Active Responsibility assignment is visible

    @ER-3830 @ER-4149 @ER-4037 @REGRESSION @EMPLOYEES
    Scenario: Validate Inspect Readiness Dialog Opens When Active Checkpoint Exists for the Responsibility
        Given that a employee is in status 'Active'
        And Position is in status 'Active'
        And user has creates a checkpoint via API in status 'Active'
        And User has Role
        And user attach responsibility to role via API
        And User attach the role to position
        And User assign the position to Employee
        And user navigates to 'Employees' page
        And user click on a specific Employee name
        And user expands position and role in path to readiness
        And the user clicks on the employee's three-dot menu button
        When User Gives a Badge to Responsibility
        Then verify Inspect Proficiency for a Responsibility page is displayed
        And user clicks on pass button
        And User click on Award Badge button
        And user expands position and role in path to readiness
        And User See the 'Professional' Badge Appear
        And User Hover over the profesional inspection badge
        And Verfiy the Status 'Professional Good Standing'

    # @ER-3081 @ER-4072 @REGRESSION @EMPLOYEES
    # Scenario: Verify active assignments are visible in Path to Readiness page
    #     Given that a employee is in status 'Active'
    #     And Position is in status 'Active'
    #     And User has Role
    #     And user have responsibility is in status 'Active'
    #     And user attach responsibility to role via API
    #     And User attach the role to position
    #     When User assign the position to Employee
    #     And user navigates to 'Employees' page
    #     And user click on a specific Employee name
    #     Then verifies position assignment is visible
    #     And user verifies the active role assignment is visible
    #     And user verifies the active Responsibility assignment is visible

    @ER-4023 @ER-4079 @REGRESSION @EMPLOYEES
    Scenario: Verify issue badge from path to readiness view
        Given that a employee is in status 'Active'
        And Position is in status 'Active'
        And User have a Checkpoint in status 'Active'
        And User has Role
        When user attaches responsibility with active checkpoint to role via API
        And User assign the position to Employee
        And User attach the role to position
        And user navigates to 'Employees' page
        And user click on a specific Employee name
        And verifies position assignment is visible
        And user verifies the active role assignment is visible
        And user verifies the active Responsibility assignment is visible
        And the user clicks on the employee's three-dot menu button
        And User Gives a Badge to Responsibility
        Then verify Inspect Proficiency for a Responsibility page is displayed
        And User clicks on  Issue Badge drop down button
        And user select a badge 'Force Apprentice'
        And verify 'Apprentice' badge

    @ER-3807 @ER-4350 @ER-3949 @REGRESSION @EMPLOYEES
    Scenario: Verify issue badge modal is visible when clicks on issue badge button in organization > employees
        Given that a employee is in status 'Active'
        And user have responsibility is in status 'Active'
        And user navigates to 'Employees' page
        And user click on a specific Employee name
        When user clicks the Employee Badge Menu
        And user clicks on Issue Badge button
        Then verify issue badge modal is visible
        And user searches for newly created specific responsibility
        And user select responsibility from the list
        And User click on Next btn to issue badge
        And user select a badge 'Apprentice - Can do with supervision'
        And user clicks on Give Badge button
        And user remove 'Current' filter for Responsibilities
        And verify 'Apprentice' badge

    @ER-3807 @ER-4073 @REGRESSION @EMPLOYEES
    Scenario: Verify issue badge modal when user have active checkpoints in organization > employees page
        Given that a employee is in status 'Active'
        And User have a Checkpoint in status 'Active'
        And user navigates to 'Employees' page
        And user click on a specific Employee name
        When user clicks the Employee Badge Menu
        And user clicks on Issue Badge button
        Then verify issue badge modal is visible
        And user search for new responsibility with checkpoint
        And user select responsibility from the list
        And verify Inspect Proficiency for a Responsibility page is displayed

    @ER-3830 @ER-4149 @ER-4025 @ER-4137 @REGRESSION @EMPLOYEES
    Scenario: Employee > Path to Readiness - Auto Recalculate Readiness for Apprentice Badge
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And User has Role
        And user have responsibility is in status 'Active'
        And user attach responsibility to role via API
        And User attach the role to position
        And User assign the position to Employee
        And user navigates to 'Employees' page
        And user click on a specific Employee name
        And user expands position and role in path to readiness
        And user verifies the active Responsibility assignment is visible
        And User Gives a Badge to Responsibility
        And verify that the Appretice Badge is 'Can do with supervision'
        And verify that Give Badge Modal is visible
        When user clicks on Give Badge button
        Then verify 'Apprentice' badge
        And user expands position and role in path to readiness
        And User Hover over the apprentice inspection badge
        And Verfiy the Status 'You can only award a badge because there is no active checkpoint defined for this responsibility'
        And verify the readiness value 50%

    @ER-3830 @ER-4025 @ER-4138 @REGRESSION @EMPLOYEES
    Scenario: Employee > Path to Readiness - Auto Recalculate Readiness for Professional Badge
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And User has Role
        And user have responsibility is in status 'Active'
        And user attach responsibility to role via API
        And User attach the role to position
        And User assign the position to Employee
        And User calls the create badge for level 1 employee API
        And user navigates to 'Employees' page
        And user click on a specific Employee name
        And user expands position and role in path to readiness
        And user verifies the active Responsibility assignment is visible
        And User Gives a Upgrade Badge to Responsibility
        And verify that the Appretice Badge is 'Can do without supervision'
        And verify that Give Badge Modal is visible
        When user clicks on Give Upgrade Badge button
        And user expands position and role in path to readiness
        And User Hover over the profesional inspection badge
        And Verfiy the Status 'You can only award a badge because there is no active checkpoint defined for this responsibility'
        Then verify the readiness value 100%