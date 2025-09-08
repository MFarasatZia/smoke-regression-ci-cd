@backend
Feature: Account > Organization > Employees > API

    @ER-3199 @ER-3415 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify Un-archive employee API
        Given that a employee is in status 'Terminated'
        When user calls the archive employee API
        And user calls the Un-Archive employee API
        Then verify status for archive employee API to be 200
        And verify the employee is unarchived

    @ER-3199 @ER-3416 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify Message when employee is not in archived status
        Given that a employee is in status 'Terminated'
        When user calls the Un-Archive employee API
        Then verify status for archive employee API to be 400
        And verify the error message for the archive employee api to be 'You can only unarchive an archived employee.'

    @ES-329 @ER-3376 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify change importance selector impacts the employee need_recalc boolean with position assignment
        Given Position is in status 'Active'
        And that a employee is in status 'Active'
        And User assign the position to Employee
        When user change the importance for 'position_assignment'
        Then user gets the employee details
        And verify needs_recalc boolean is false

    @ES-329 @ER-3482 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify change importance selector impacts the employee need_recalc boolean with role assignment
        Given that a employee is in status 'draft'
        And User has Role
        And User assign the Role to employee
        When user change the importance for 'role_assignment'
        Then user gets the employee details
        And verify needs_recalc boolean is false

    @ES-329 @ER-3483 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify change importance selector impacts the employee need_recalc boolean with responsibility assignment
        Given that a employee is in status 'draft'
        And user have responsibility is in status 'Draft'
        And the user assign the Responsibility to employee
        When user change the importance for 'responsibility_assignment'
        Then user gets the employee details
        And verify needs_recalc boolean is false

    @ES-336 @ER-3342 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify Employee needs recalc boolen when a position is assigned and removed from an employee
        Given that a employee is in status 'Active'
        And  Position is in status 'Active'
        And need_recalc boolean is false
        When User assign the position to Employee
        Then verify needs_recalc boolean is true
        And User relieves the position assignment
        And verify needs_recalc boolean is true

    @ES-336 @ER-3349 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify Employee needs recalc boolen when a badge is assigned and removed from an employee
        Given that a employee is in status 'Active'
        And user have responsibility is in status 'Active'
        And need_recalc boolean is false
        When user create a proficiency badge
        Then verify needs_recalc boolean is false
        And user removes badge assignment from employee
        And verify needs_recalc boolean is false

    @ES-336 @ER-3347 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify Employee needs recalc boolen when a role is assigned to an employee and recalculation is run
        Given that a employee is in status 'Active'
        And User has Role
        And need_recalc boolean is false
        When User assign the Role to employee
        Then verify needs_recalc boolean is true
        And user runs recalculations
        And verify needs_recalc boolean is false

    @ES-336 @ER-3348 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify Employee needs recalc boolen when a responsibility is assigned to an employee and recalculation is run
        Given that a employee is in status 'Active'
        And user have responsibility is in status 'Active'
        And need_recalc boolean is false
        When the user assign the Responsibility to employee
        Then verify needs_recalc boolean is true
        And user runs recalculations
        And verify needs_recalc boolean is false

    @ES-343 @ER-3554 @REGRESSION-API @EMPLOYEES-API
    Scenario: Verify Employee needs recalc boolen when a badge is assigned and recalculation is run
        Given that a employee is in status 'Active'
        And user have responsibility is in status 'Active'
        And need_recalc boolean is false
        When user create a proficiency badge
        Then verify needs_recalc boolean is false
        And user runs recalculations
        And verify needs_recalc boolean is false