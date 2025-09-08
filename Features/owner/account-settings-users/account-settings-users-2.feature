  Feature: Account > Settings > Users

  Manage account users
  
  
  @ER-2554 @ER-2807 @REGRESSION @SETTINGS-USER
  Scenario: Verify closed status filter working in Settings > Users page
    Given that a user already exists with the state closed
    And user navigates to 'Settings' page
    When user clicks and select the on filter
    And user select 'Closed' Status filter
    And user save filter on setting page
    And user see a list of user filtered by 'Closed' status

  @ER-2615 @ER-2759 @REGRESSION @SETTINGS-USER
  Scenario: Verify the Rename Button on Setting > User
    Given that a user already exists with the state invited
    And user navigates to 'Settings' page
    And user selects a specific user
    When user clicks on Three dot Menu button
    And user select rename option from the menu
    And Rename Button is Not Active
    And User Add Update Deatil regarding User
    Then Veirfy that Rename Button Active

  @ER-2998 @ER-990 @ER-2554 @REGRESSION @SETTINGS-USER
  Scenario: Verify Filter Filter State Retained When Navigating Between Pages At Setting > User
    Given that a user already exists with the state Has Access
    And user navigates to 'Settings' page
    When user clicks and select the on filter
    And user select 'Has Access' Status filter
    And user save filter on setting page
    And user see a list of user filtered by 'Has Access' status
    When user navigate to 'Position' page
    And user navigates to 'Settings' page
    Then user see a list of user filtered by 'Has Access' status