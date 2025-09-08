Feature: Account > Settings > Users

  @ER-2087 @READ-f60 @ER-211 @REGRESSION @SMOKE @SETTINGS-USER
  Scenario: User has access suspended in account
    Given that a user already exists with the state Has Access
    And user navigates to 'Settings' page
    And user selects a specific user
    When user clicks on Three dot Menu button
    And user select 'Suspend' option from the menu
    And User click on Suspend Button
    And verify user status changes to 'Suspended'
    And user clicks on Three dot Menu button
    And user select 'Give back access' option from the menu

  @ER-2088 @READ-360 @REGRESSION @SETTINGS-USER
  Scenario: Verify the Owner is never suspended
    Given User looking at the user list
    Then you always see a user with Owner permission
    And the owner is NEVER suspended

  @ER-2089 @ER-13 @REGRESSION @SETTINGS-USER
  Scenario: Email exists but is blocked/closed
    Given that a user is blocked
    When calling the check-access API for the respective user
    Then Verify that user state is 'blocked'

  @ER-993 @ER-1220 @FIX @SETTINGS-USER
  Scenario: Verify Resend Invite function is working on Settings < Users page
    Given that a user already exists with the state invited
    And user navigates to 'Settings' page
    And user selects a specific user
    When user clicks on Three dot Menu button
    And user select 'Resend Invite' option from the menu
    And user clicks on Resend button
    Then verify the email is received in the mail box

  @ER-993 @ER-1606 @REGRESSION @SETTINGS-USER
  Scenario: Verify Resend Invite option is not visible for has access on Settings < Users page
    Given that a user already exists with the state Has Access
    And user navigates to 'Settings' page
    And user selects a specific user
    When user clicks on Three dot Menu button
    Then user should not see Resend option

  @ER-1061 @ER-1750 @REGRESSION @SETTINGS-USER
  Scenario: Verify user status is invited when changed from Suspended in Settings < Users
    Given that a user already exists with the state suspended
    And user navigates to 'Settings' page
    And user selects a specific user
    When user clicks on Three dot Menu button
    And user select 'Give back access' option from the menu
    Then verify user is invited
    And verify user status changes to 'Invited'

  @ER-1989 @ER-2120 @REGRESSION @SETTINGS-USER
  Scenario: Verify that all integration options are displayed when navigating to the integration tab
    Given user navigate to 'Settings' page
    When User click on 'Integrations' tab
    Then Verify that all integration options are displayed

  @ER-996 @2114 @REGRESSION @SETTINGS-USER @COMPLETED
  Scenario: Remove change password from dropdown
    Given that a user already exists with the state invited
    And user navigates to 'Settings' page
    And user selects a specific user
    When user clicks on Three dot Menu button
    Then user should not see change password option

  @ER-2209 @ER-2258 @REGRESSION @SETTINGS-USER
  Scenario: Verify user status changes to Has Access after setting the password
    Given that a user already exists with the state invited
    And verify the email is received in the mailbox and extract the reset link
    And user clicks on the link
    When user set the password
    And user set the confirm password
    And user click on reset password button
    And user clicks on continue button
    And user clicks on sign in button
    And user enter signin details
    Then user navigates to 'Settings' page
    And user searches a specific user
    And verify user status changes to 'Has Access'
  
  @ER-741 @ER-3449 @ER-1044 @REGRESSION @SETTINGS-USER
  Scenario: Verify user can be added as a co-owner in Settings page
    Given user navigates to 'Settings' page
    And user clicks on Add user button
    And User enters email in email field
    And User clicks on next button
    And User enters firstname in firstname field
    And User enters lastname in lastname field
    And User clicks on next button
    When User selects "co-owner" access
    And User clicks on next button
    And User Click on Add button
    Then verify the user is co-owner
  
  @ER-3449 @ER-3622 @REGRESSION @SETTINGS-USER
  Scenario: Verify user can be added as a Operator in Settings page
    Given user navigates to 'Settings' page
    And user clicks on Add user button
    And User enters email in email field
    And User clicks on next button
    And User enters firstname in firstname field
    And User enters lastname in lastname field
    And User clicks on next button
    When User selects "Operator" access
    And User clicks on next button
    And User Select access 'Scale Readiness' to apps for Employee
    Then Verify That User Are Able to Add User