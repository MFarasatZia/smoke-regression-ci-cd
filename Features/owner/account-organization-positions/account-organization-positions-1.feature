Feature: Account > Organization > Positions


  @ER-355 @ER-461 @ER-1630 @REGRESSION @SMOKE @POSITION
  Scenario: Verify user is able to add position in positions organization page
    Given user navigate to 'Position' page
    And user clicks on Add Position button
    When Add Position modal is displayed
    And user types new position name
    And user clicks on save button for position
    Then verify new position is created

  # @ER-462 @ER-1638 @REGRESSION @SMOKE @POSITION
  # Scenario: Verify Position Actions in Status Draft
  #   Given that a position is in status 'Draft'
  #   And user navigate to 'Position' page
  #   And user selects a specific position
  #   When user clicks on three dot menu button
  #   Then verify 'Activate' option is visible
  #   And verify 'Rename' option is visible
  #   And verify 'Delete' option is visible
  #   And verify 'Clone' option is visible

  @ER-77 @ER-2539 @ER-1643 @REGRESSION @SMOKE @POSITION
  Scenario: Verify Delete action in Position page
    Given that a position is in status 'Draft'
    And user navigate to 'Position' page
    And user selects a specific position
    When user clicks on three dot menu button
    Then verify 'Activate' option is visible
    And verify 'Rename' option is visible
    And verify 'Delete' option is visible
    And verify 'Clone' option is visible
    And user select 'Delete' option from the menu
    And Delete Position Modal is displayed
    And user clicks Delete button
    Then verify the deleted position disappear from the table

  @ER-462 @ER-1644 @REGRESSION @POSITION
  Scenario: Verify Activate action in Position page
    Given that a position is in status 'Draft'
    And user navigate to 'Position' page
    And user selects a specific position
    When user clicks on three dot menu button
    And user select 'Activate' option from the menu
    And Activate Position modal appears
    And user clicks on Activate button
    Then verify position status changes to 'Active'

  @ER-1486 @ER-1646 @REGRESSION @POSITION
  Scenario: Verify Retire action in Position page
    Given that a position is in status 'Active'
    And user navigate to 'Position' page
    And user selects a specific position
    When user clicks on three dot menu button
    And user select 'Retire' option from menu
    And Retire position modal appears
    And user clicks on Retire button
    Then verify position status changes to 'Retired'

  @ER-624 @ER-1647 @REGRESSION @SMOKE @POSITION
  Scenario: Verify Rename action in Position page
    Given that a position is in status 'Active'
    And user navigate to 'Position' page
    And user selects a specific position
    When user clicks on three dot menu button
    And user select 'Rename' option from the menu
    And rename position modal appears
    And user enter new position name
    And user click on save button
    Then verify the change in the positions list

  # @ER-658 @ER-1648 @REGRESSION @SMOKE @POSITION
  # Scenario: Verify clone action in Position page
  #   Given role is attached to the 'Active' position
  #   And user navigate to 'Position' page
  #   And user search for a position
  #   And user clicks on three dot menu button
  #   When user select 'Clone' option from menu
  #   And user clicks on clone button on pop-up
  #   Then user see created clone position with name "Clone of <original position name>"

  # @ER-20 @ER-1649 @REGRESSION @POSITION
  # Scenario: Verify user is able to search position by name
  #   Given that a position is in status 'Active'
  #   And user navigate to 'Position' page
  #   When user search for a newly created position
  #   Then verify the position appears in the list

  # @ER-20 @ER-1650 @REGRESSION @POSITION
  # Scenario: Verify user is able to search position by code
  #   Given that a position is in status 'Active'
  #   And user navigate to 'Position' page
  #   When user search for newly created position by code
  #   Then verify the position appears in the list

  @ER-22 @ER-1657 @ER-1973 @COMPLETED @REGRESSION @POSITION
  Scenario: Verify user Change position Capacity
    Given user has a position that is not occupied
    And user navigate to 'Position' page
    And user search for a newly created position
    When First data card of position is displayed
    Then user opens Capacity Selector
    And user see current capacity selected
    And user changes capacity