Feature: Account > Organization > Positions

  @ER-303 @ER-517 @ER-1667 @REGRESSION @POSITION
  Scenario: Verify Breadcrumb for specific Position
    Given that a position is in status 'Active'
    When user navigate to 'Position' page
    Then the list of Positions appears
    And user click on a specific Position
    And the user should see the path for Position

  @ER-552 @ER-617 @POSITION @REGRESSION
  Scenario: Verify navigate to Role page from Position 'Role Attached' page
    Given that a position is in status 'Active'
    And a responsibility is attach to the role
    And a role is attached to the position
    And user navigate to 'Position' page
    When user click on a specific Position
    And the user expands the attached role
    And user click on the Role that is attached to the position
    Then verify user should be navigate to the roles details page
    And verify that breadcrum is as Positions organization > Roles attached > role

  @ER-552 @ER-4008 @POSITION @REGRESSION
  Scenario: Verify navigate to Responsibility Details from position details page
    Given that a position is in status 'Active'
    And a responsibility is attach to the role
    And a role is attached to the position
    And user navigate to 'Position' page
    And user click on a specific Position
    And the user expands the attached role
    When user clicks on First three dot menu button
    And user select 'Activate' option from the menu
    And Activate Position modal appears
    And user clicks on Activate button
    Then Verify that the Responsibility Activation Modal Should Not Visisble
    And user click on the Responsibility that is attached to the role on position
    And verify user should be navigate to the Responsibility details page
    And verify that breadcrum is as Positions organization > Roles attached > Responsibility

  # @ER-696 @ER-830 @ER-1671 @REGRESSION @POSITION
  # Scenario: Verify De-Activate Position with status Active
  #   Given that a position is in status 'Active'
  #   And user navigate to 'Position' page
  #   And user selects a specific position
  #   When user clicks on three dot menu button
  #   And user select 'De-Activate' option from the menu
  #   And verify Deactivate modal appears
  #   And user clicks on De-Activate button
  #   Then verify position status changes to 'Inactive'

  @ER-696 @ER-838 @ER-1672 @REGRESSION @POSITION
  Scenario: Verify De-Activate Position with status not equal to Active
    Given that a position is in status 'Draft'
    And user navigate to 'Position' page
    And user selects a specific position
    When user clicks on three dot menu button
    Then verify 'De-Activate' option should not exist

  # @ER-696 @ER-829 @ER-1673 @REGRESSION @POSITION
  # Scenario: Verify Re-Activate Position with status Inactive
  #   Given that a position is in status 'Deactivate'
  #   And user navigate to 'Position' page
  #   And user selects a specific position
  #   When user clicks on three dot menu button
  #   And user select 'Re-Activate' option from the menu
  #   And verify Re-Activate modal appears
  #   And user clicks on Re-Activate button
  #   Then verify position status changes to 'Active'

  # @ER-696 @ER-843 @ER-1674 @REGRESSION @POSITION
  # Scenario: Verify Re-Activate Position with status not equal to Inactive
  #   Given that a position is in status 'Draft'
  #   And user navigate to 'Position' page
  #   And user selects a specific position
  #   When user clicks on three dot menu button
  #   Then verify 'Re-Activate' option should not exist

  @ER-804 @ER-870 @REGRESSION @POSITION
  Scenario: Verify Roles Attached counter in Position Organization page should count only Active Roles Attached
    Given that a position is in status 'Active'
    And a role with status 'Draft' is attached to the position
    And a role with status 'Active' is attached to the position
    And user navigate to 'Position' page
    When user click on a specific Position
    Then verify roles attached counter should only show Active roles count

  @ER-729 @ER-863 @REGRESSION @COMPLETED @POSITION
  Scenario: Verify already attached roles do not appear in Attach Role drop down in Positions Organizations
    Given that a position is in status 'Active'
    And a role with status 'Draft' is attached to the position
    And user navigate to 'Position' page
    And user click on a specific Position
    When the user clicks on the Attach Role button
    And user types a already attached role name
    Then Verify that the already attached roles should not appear in the drop down

  @ER-712 @ER-1056 @REGRESSION @POSITION
  Scenario: Verify Records are grouped in 'Today'
    Given User have a position
    And user navigate to 'position' page
    When user click on a specific Position
    And user reaches the 'Chatter' tab
    And records are present on the chatter page
    Then verify records are grouped in Today