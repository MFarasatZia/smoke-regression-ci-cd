Feature: Account > Organization > Positions

  @READ-322 @ER-757 @REGRESSION @SMOKE @POSITION
  Scenario: Attach a Role to a Position
    Given that a position is in status 'Active'
    And user navigate to 'Position' page
    And user click on a specific Position
    When the user clicks on the Attach Role button
    And user selects an existing role from the list
    And clicks on the Attach button
    Then verify that a new role is attached to the position

  @READ-322 @ER-764 @REGRESSION @POSITION
  Scenario: Verify user is able to create and attach a new role to a position
    Given that a position is in status 'Active'
    And user navigate to 'Position' page
    And user click on a specific Position
    When the user clicks on the Attach Role button
    And user types a new role name
    And clicks on the Create and attach new role button
    Then verify that a new role is attached to the position

  @ER-191 @ER-1660 @REGRESSION @POSITION
  Scenario: Select Position Statuses to filter by Active
    Given that user have Positions with different statuses
    And user navigate to 'Position' page
    When user clicks on filter button
    Then Verify Position filter modal is displayed
    And user select Active Status Position filter
    And user clicks on save filter button
    And user see a list of Position filtered by Active status

  @ER-191 @ER-1663 @REGRESSION @POSITION
  Scenario: Remove Position Filters on positions page
    Given that user have Positions with different statuses
    When the Position Organization list has at least one filter
    And user remove the position filter
    Then user see the Position list filtered by the remaining filters

  @ER-329 @ER-1665 @REGRESSION @POSITION
  Scenario: Verify the Active Position count
    Given that a position is in status 'Active'
    When user navigate to 'Position' page
    Then the active position count should be equal to the counter

  @ER-329 @ER-1666 @REGRESSION @POSITION
  Scenario: Verify Active Position count Increase on runtime
    Given that a position is in status 'Draft'
    And user navigate to 'Position' page
    And user selects a specific position
    When user clicks on three dot menu button
    And user select 'Activate' option from menu
    And user clicks on Activate button
    Then verify count should Increase by one at run time

  @ER-3153 @ER-3157 @ER-3492 @REGRESSION @POSITION
  Scenario: Verify Archive option and filter visible and working for position 
    Given that a position is in status 'Retired'
    And user navigate to 'Position' page
    When user selects a specific position
    And user clicks on three dot menu button
    Then verify 'Archive' option is visible
    And user select 'Archive' option from menu
    And user clicks on confirm button
    And verify no positions found text is visible
    And user clicks on clear button
    And user clicks on filter button
    And user select 'Show' filter option
    And the user clicks on the save filter button
    And user selects a specific position
    And verify Archived status is displayed

  @ER-3425 @ER-3524 @REGRESSION @POSITION
  Scenario:Verify UnArchive option is visible and working for Position
    Given that a position is in status 'Retired'
    And user calls the archive position API
    And user navigate to 'Position' page
    And the user clicks on the Filter button
    And User Applies Filter
    And user clicks on save filter button
    And user search for newly created position by code
    When user clicks on three dot menu button
    Then verify 'Unarchive' option is visible
    And user select 'Unarchive' option from menu
    And user clicks on Unarchive button
    And user search for newly created position by code
    And user clicks on three dot menu button
    And verify 'Unarchive' option is not visible
  
   @ER-2311 @ER-4917 @ES-9 @ER-2518 @REGRESSION @POSITION
    Scenario: Verify Responsibility Assignments use case is implemented
        Given user create an employee and a position via API
        And a responsibility is attach to the role
        And a role is attached to the position
        And user call the position-assignment API
        And user navigate to 'Position' page
        When user click on a specific Position
        And the user expands the attached role
        And user click on the Responsibility that is attached to the role on position
        Then verify user should be navigate to the Responsibility details page
        And verify that breadcrum is as Positions organization > Roles attached > Responsibility
        And user reaches the 'Assignments' tab
        And User click the clear checklist
        And verify the Responsibility Assignment Status 'Novice'
        When user issues a badge to the responsibility via API
        Then verify the responsibility average readiness is 100% in the UI
        

    @ER-1484 @ER-2386 @ER-4124 @SMOKE @REGRESSION @POSITION
    Scenario: Verify the Clickable assignments button on Position>attached Role
        Given that a position is in status 'Active'
        And Employee is in status active
        And a responsibility is attach to the role
        And a role is attached to the position
        And user call the position-assignment API
        And user navigate to 'Position' page
        When user click on a specific Position
        And User click on the Assignment column
        Then User click on the employee in the list