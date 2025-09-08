@backend
Feature: Account > Organization > Employees > API

    @ES-343 @ER-3555 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify Employee needs recalc boolen when a position is assigned and recalculation is run
        Given that a employee is in status 'Active'
        And  Position is in status 'Active'
        And need_recalc boolean is false
        When User assign the position to Employee
        Then verify needs_recalc boolean is true
        And user runs recalculations
        And verify needs_recalc boolean is false

    @ER-2690 @ER-3579 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify assignments code and name in evaluate assignments api
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And user have responsibility is in status 'Active'
        And User has Role
        And user attach responsibility to role via API
        And User attach the role to position
        When User assign the position to Employee
        Then user calls evaluate assignment api
        And verify position code and name is not null
        And verify role code and name is not null
        And verify responsibility code and name is not null

    @ER-2776 @ER-3584 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify assignments are deactivated when parent assignment is deactivated
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And user have responsibility is in status 'Active'
        And User has Role
        And user attach responsibility to role via API
        And User attach the role to position
        When User assign the position to Employee
        And user De-Activate the position
        Then user calls employee assignments api
        And verify position is De-activated
        And verify role is De-activated
        And verify responsibility is De-activated

    @ES-400 @ER-3628 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verfiy that Add position assignment effective by dates
        Given that a employee is in status 'Active'
        When user assign a position to employee
        And Verfiy that effective_on in the response body
        Then User relieves the position assignment
        And response body have property effective_by

    @ER-3331 @ER-3629 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify Detach responsibility from role impact on employee assignments
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And user have responsibility is in status 'Active'
        And User has Role
        And user attach responsibility to role via API
        And User attach the role to position
        When User assign the position to Employee
        And user detach responsibility from role
        Then user calls employee assignments api
        And verify responsibility_assignments status is 'detached'
        And verify reason is 'Detached when catalog Responsibility <code name> was detached from catalog role <code name>'

    @ER-3327 @ER-3631 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify Retire Responsibility impact on employee assignments
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And user have responsibility is in status 'Active'
        And User has Role
        And user attach responsibility to role via API
        And User attach the role to position
        When User assign the position to Employee
        And user retire the responsibility
        Then user calls employee assignments api
        And verify responsibility_assignments status is 'retired'
        And verify reason is 'Retired when catalog responsibility <code name> was Retired'

    @ER-3623 @ER-3640 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify User is not able to assign a position to draft employee through API
        Given Position is in status 'Draft'
        And that a employee is in status 'Draft'
        When User assign the position to draft Employee
        Then verify user is not able to assign the position

    @ER-3326 @ER-3638 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify Retire Role impact on employee assignments
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And user have responsibility is in status 'Active'
        And User has Role
        And user attach responsibility to role via API
        And User attach the role to position
        When User assign the position to Employee
        And user retire the role
        Then user calls employee assignments api
        And verify role_assignments status is 'retired'
        And verify reason is 'Retired when catalog role <code name> was Retired'
        And verify responsibility_assignments status is 'retired'
        And verify responsibility_assignments reason is 'Retired when catalog role <code name> was Retired'

    @ER-3330 @ER-3636 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify Detach role from position impact on employee assignments
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And user have responsibility is in status 'Active'
        And User has Role
        And user attach responsibility to role via API
        And User attach the role to position
        When User assign the position to Employee
        And user detach role from position
        Then user calls employee assignments api
        And verify role_assignments status is 'detached'
        And verify reason is 'Detached when catalog role <code name> was detached from position <code name>'
        And verify responsibility_assignments status is 'detached'
        And verify responsibility_assignments reason is 'Detached when catalog role <code name> was detached from position <code name>'

    @ER-3334 @ER-3665 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify Retire Position with impact on employee assignments
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And user have responsibility is in status 'Active'
        And User has Role
        And user attach responsibility to role via API
        And User attach the role to position
        When User assign the position to Employee
        And user retire the position
        Then user calls employee assignments api
        And verify position assignments status is 'retired'
        And verify reason is 'Retired when Position <code name> was Retired'
        And verify role_assignments status is 'retired'
        And verify role_assignments reason is 'Retired when Position <code name> was Retired'
        And verify responsibility_assignments status is 'retired'
        And verify responsibility_assignments reason is 'Retired when Position <code name> was Retired'
