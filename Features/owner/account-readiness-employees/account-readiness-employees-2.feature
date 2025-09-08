Feature: Account > Readiness > Employees > Employee > Path to Readiness

    # @ER-2614 @ER-2784 @REGRESSION @EMPLOYEES
    # Scenario: Verify Give access option is working with Scale Compensation in Organization > Employess > Employee profile
    #   Given that a employee is in status 'Active'
    #   And Create a new user with API
    #   And user navigates to 'Employees' page
    #   And user click on a specific Employee name
    #   And user clicks on Employee Profile menu
    #   When user select option 'Give Access' for employee
    #   And User enters email in add employee field
    #   And User click on Next button
    #   Then user select the 'Selective Apps Access' to give access to employee
    #   And User Select access 'Scale Compensation' to apps for Employee
    #   And user click on invite button

    # @ER-2614 @ER-2695 @REGRESSION @EMPLOYEES
    # Scenario: Verify employee name and status does not disappears when  Give access option is selected in Organization > Employess > Employee profile
    #   Given that a employee is in status 'Active'
    #   And Create a new user with API
    #   And user navigates to 'Employees' page
    #   And user click on a specific Employee name
    #   When user clicks on Employee Profile menu
    #   And user select option 'Give Access' for employee
    #   And User enters email in add employee field
    #   And User click on Next button
    #   Then user select the 'Employee Services only' to give access to employee
    #   And user click on invite button
    #   And verify employee name does not disappear in the profile

    @ER-3814 @ER-3886 @REGRESSION @EMPLOYEES
    Scenario: Verify user drill down in Employee from Readiness > Employees page
        Given that a employee is in status 'Active'
        And user navigates to 'ReadinessEmployees' page
        When user click on a specific Employee name
        Then User land on the path to readiness

    @ER-3767 @ER-3952 @REGRESSION @EMPLOYEES
    Scenario: Verify the recalculate button and readiness bar percentage on Readinees > Employee page
        Given that a employee is in status 'Active'
        And Position is in status 'Active'
        And User has Role
        And user have responsibility is in status 'Active'
        And User calls the create badge for level 1 employee API
        And User attach the role to position
        And user attach responsibility to role via API
        When User assign the position to Employee
        Then user navigates to 'ReadinessEmployees' page
        And user search for employee name
        And user clicks on dropdown button on Readiness bar
        And user clicks on Recalculate button
        And user verifies the readiness percentage is not 0

    @ER-3431 @ER-4009 @REGRESSION @EMPLOYEES
    Scenario: Verify filters and recalculate button on readiness > employees page
        Given that a employee is in status 'Active'
        And Position is in status 'Active'
        And User has Role
        And user have responsibility is in status 'Active'
        And User attach the role to position
        And user attach responsibility to role via API
        When User assign the position to Employee
        And user navigates to 'ReadinessEmployees' page
        And user clicks on filter button
        And user selects require recalc filter
        Then verify employee with recalc is visible
        And user clicks on Recalculate all button
        And user clear the filter
        And verify Recalculate all button is not visible