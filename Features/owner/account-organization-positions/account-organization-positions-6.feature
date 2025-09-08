Feature: Account > Organization > Positions

 @ER-5153 @ER-5288 @REGRESSION @POSITION
  Scenario: Verify That Retire option is Visible from the action menu on the position page
    Given that a position is in status 'Active'
    And user navigate to 'Position' page
    And user opens a Position
    And user click on three dot menu button for an active position
    Then verify 'Retire' option is visible
    And user select 'Retire' option from menu
    And user clicks on Retire button
    Then verify 'Retired' status is visible

 @ER-5503 @ER-5601 @REGRESSION @POSITION
  Scenario: Verify position count in sidebar only increases when position is activated
    Given that a position is in status 'Draft'
    When user navigate to 'Position' page
    And verify position count in sidebar before activation
    When user search for a newly created position
    And user clicks on three dot menu button 
    And user select 'Activate' option from the menu
    And user clicks on Activate button
    Then verify position count in sidebar after activation