Feature: Account > Settings > Users

  @ER-141 @ER-3284 @REGRESSION @SETTINGS-USER
  Scenario: User verifies that Email is available to be used by user Test User
    Given that user is in state 'Invited' and is co-owner
    And User navigates to 'Settings' page
    And user selects a specific user
    When user clicks on Three dot Menu button
    And user select 'Change Sign in email' option from the menu
    When User enters email in email field
    And User clicks on next button
    And the system confirms the email is available to be used by the selected user

  @ER-141 @ER-3286 @REGRESSION @SETTINGS-USER
  Scenario: User tries to change to an email already used by a system user in the account
    Given that user is in state 'Invited' and is co-owner
    And user navigates to 'Settings' page
    And user selects a specific user
    And user clicks on Three dot Menu button
    And user select 'Change Sign in email' option from the menu
    When User enters Existing Email
    And User clicks on next button
    Then Verify the Popup message

  @ER-141 @ER-3377 @REGRESSION @SETTINGS-USER
  Scenario: User tries to change to an email already associated with an external user
    Given that a user already exists with the state suspended
    And user navigates to 'Settings' page
    And user selects a specific user
    And user clicks on Three dot Menu button
    And user select 'Change Sign in email' option from the menu
    When User enters Suspend User email in email field
    And User clicks on next button
    Then the system confirms the email is already associated with an external user and prompts for support assistance

  @ER-3625 @ER-3761 @REGRESSION @SETTINGS-USER
  Scenario: Verify that user can Cancel invite
    Given that user is in state 'Invited' and is co-owner
    And User navigates to 'Settings' page
    And user selects a specific user
    When user clicks on Three dot Menu button
    And user select 'Cancel Invite' option from the menu
    And User Click on Cancel Invite
    And user selects a specific user
    Then Verify that no user found

  @ER-4105 @ER-4170 @REGRESSION @SETTINGS-USER
  Scenario: Verify Resend invite time stamp
    Given that a user already exists with the state invited
    And user navigates to 'Settings' page
    And user selects a specific user
    And user clicks on Three dot Menu button
    And verify 'Resend Invite' option is visible
    And user select 'Resend Invite' option from the menu
    When user clicks on Resend button
    And user selects a specific user
    Then Verify the first invited text

  @ER-3869 @ER-4224 @REGRESSION @SETTINGS-USER
  Scenario:Verify that User Cannot be able to Rename with Fewer Than 3 Characters
    Given that a user already exists with the state invited
    And user navigates to 'Settings' page
    And user selects a specific user
    When user clicks on Three dot Menu button
    And user select rename option from the menu
    And Rename Button is Not Active
    And user add less than 3 character
    Then Rename Button is Not Active