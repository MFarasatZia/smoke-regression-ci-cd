Feature: Account > Organization > Positions

  @ER-938 @ER-1134 @REGRESSION @POSITION
  Scenario: Verify draft position with no role can be cloned
    Given that a position is in status 'Draft'
    And user navigate to 'Position' page
    And user selects a specific position
    And user clicks on three dot menu button
    When user select 'Clone' option from menu
    And user clicks on clone button on pop-up
    Then user see created clone position with name "Clone of <original position name>"

  @ER-938 @ER-1135 @REGRESSION @POSITION
  Scenario: Verify Active position with no role can be cloned
    Given that a position is in status 'Active'
    And user navigate to 'Position' page
    And user selects a specific position
    And user clicks on three dot menu button
    When user select 'Clone' option from menu
    And user clicks on clone button on pop-up
    Then user see created clone position with name "Clone of <original position name>"

  @ER-938 @ER-1138 @REGRESSION @POSITION
  Scenario: Verify cloning an already cloned position
    Given role is attached to the clone position
    And user navigate to 'Position' page
    And user search for a clone position
    And user clicks on three dot menu button
    When user select 'Clone' option from menu
    And user clicks on clone button on pop-up
    Then user see created clone position with name "Clone of Clone of <original position name>"

  @ER-834 @ER-868 @REGRESSION @SMOKE @POSITION
  Scenario: Verify Attach Roles Modal and user can attach roles on position organization page
    Given that a position is in status 'Active'
    And user navigate to 'Position' page
    And user selects a specific position
    And user clicks on three dot menu button
    When user select 'Attach Role' option from menu
    And user types a new role name
    And clicks on the Create and attach new role button
    And user clicks on the position
    Then verify that a new role is attached to the position

  @ER-694 @ER-1276 @ER-1675 @REGRESSION @POSITION
  Scenario:Verify Active position with role attached can be Retired
    Given role is attached to the 'Active' position
    And user navigate to 'Position' page
    And user search for a position
    And user clicks on three dot menu button
    When user select 'Retire' option from menu
    And Retire position modal appears
    And user clicks on Retire button
    Then verify position status changes to 'Retired'

  @ER-1486 @ER-1741 @REGRESSION @POSITION
  Scenario: Verify the View attachments Position
    Given that a position is in status 'Active'
    And user navigate to 'Position' page
    And user click on a specific Position
    When the user clicks on the Attach Role button
    And user types a new role name
    And clicks on the Create and attach new role button
    And verify that a new role is attached to the position
    And user clicks on Attachment component
    Then Verify Attachment Scrolable List appears

  @ER-1483 @ER-1848 @REGRESSION @POSITION
  Scenario: Verify Roles action Dropdown
    Given that a position is in status 'Active'
    And user navigate to 'Position' page
    And user click on a specific Position
    When the user clicks on the Attach Role button
    And user types a new role name
    And clicks on the Create and attach new role button
    And verify that a new role is attached to the position
    And user clicks on three dot menu button
    Then Verify Roles action Dropdown

  @ER-1098 @ER-1527 @REGRESSION @POSITION
  Scenario: Select Position Statuses to filter by draft
    Given that user have Positions with different statuses
    And user navigate to 'Position' page
    When user clicks on filter button
    Then Verify Position filter modal is displayed
    And user select draft Status Position filter
    And user clicks on save filter button
    And user see a list of Position filtered by draft status

  @ER-1098 @ER-1527 @REGRESSION @POSITION
  Scenario: Select Position Statuses to filter by retired
    Given that user have Positions with different statuses
    And user navigate to 'Position' page
    When user clicks on filter button
    Then Verify Position filter modal is displayed
    And user select retired Status Position filter
    And user clicks on save filter button
    And user see a list of Position filtered by retired status

  @ER-1098 @ER-1527 @REGRESSION @POSITION
  Scenario: Select Position Statuses to filter by inactive
    Given that user have Positions with different statuses
    And user navigate to 'Position' page
    When user clicks on filter button
    Then Verify Position filter modal is displayed
    And user select inactive Status Position filter
    And user clicks on save filter button
    And user see a list of Position filtered by Inactive status