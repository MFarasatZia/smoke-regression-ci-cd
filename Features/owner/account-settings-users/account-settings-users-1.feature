Feature: Account > Settings > Users

  Manage account users

@ER-37 @ER-3454 @ER-2287 @REGRESSION @SETTINGS-USER
  Scenario: verify 'Change permissions' option is visible when User have App Access
    Given that a user already exists with the state invited
    And user navigates to 'Settings' page
    And user selects a specific user
    When user clicks on Three dot Menu button
    Then verify 'Resend Invite' option is visible
    And verify 'Cancel Invite' option is visible
    And verify 'Change permissions' option is visible
    And verify 'Rename' option is visible
    And verify 'Change Sign in email' option is visible

  @ER-37 @ER-3454 @ER-2288 @REGRESSION @SETTINGS-USER
  Scenario: verify 'Change permissions' option is visible when User have App Access
    Given that a user already exists with the state Has Access
    And user navigates to 'Settings' page
    And user selects a specific user
    When user clicks on Three dot Menu button
    Then verify 'Transfer ownership' option is visible
    And verify 'Change Sign in email' option is visible
    And verify 'Rename' option is visible
    And verify 'Change permissions' option is visible

  @ER-37 @ER-2289 @REGRESSION @SETTINGS-USER
  Scenario: Verify App user drop down menu in status has suspended
    Given that a user already exists with the state suspended
    And user navigates to 'Settings' page
    And user selects a specific user
    When user clicks on Three dot Menu button
    Then verify 'Give back access' option is visible
    And verify 'Rename' option is visible

  @ER-37 @ER-3454 @ER-2281 @REGRESSION @SETTINGS-USER
  Scenario: verify 'Change permissions' option is not visible when User is Co-Owner
    Given that user is in state 'Invited' and is co-owner
    And user navigates to 'Settings' page
    And user selects a specific user
    When user clicks on Three dot Menu button
    Then verify 'Resend Invite' option is visible
    And verify 'Cancel Invite' option is visible
    And verify 'Change permissions' option is not visible
    And verify 'Rename' option is visible
    And verify 'Change Sign in email' option is visible

  @ER-37 @ER-2283 @REGRESSION @SETTINGS-USER
  Scenario: Verify Co-owner drop down menu in status has access
    Given that user is in state 'operational' and is co-owner
    And user navigates to 'Settings' page
    And user selects a specific user
    When user clicks on Three dot Menu button
    Then verify 'Suspend' option is visible
    And verify 'Change permissions' option is visible
    And verify 'Rename' option is visible

  @ER-37 @ER-2286 @REGRESSION @SETTINGS-USER
  Scenario: Verify Co-owner drop down menu in status suspended
    Given that user is in state suspended and is co-owner
    And user navigates to 'Settings' page
    And user selects a specific user
    When user clicks on Three dot Menu button
    Then verify 'Give back access' option is visible
    And verify 'Rename' option is visible

  @ER-37 @ER-2291 @REGRESSION @SETTINGS-USER
  Scenario: Verify owner drop down menu in status has access
    Given you attempt to create a user that is owner of an account
    And user navigates to 'Settings' page
    And user selects a specific user
    When user clicks on Three dot Menu button
    Then verify 'Transfer Ownership' option is visible

  @ER-2227 @ER-2260 @REGRESSION @SETTINGS-USER
  Scenario: Verify the Email Field Triggered for Invalid Email Input Settings > User Page
    Given User is on "settings" Page
    When User opens "users" tab
    And user clicks on Add user button
    And User Enter invalid email in the email field
    Then Verify the error 'E-mail must be valid'

  @ER-2229 @ER-2324 @ER-2554 @REGRESSION @SETTINGS-USER
  Scenario: Verify the Filter Functionality on User Settings Page
    Given that a user already exists with the state Has Access
    And user navigates to 'Settings' page
    When user clicks and select the on filter
    And user select 'Has Access' Status filter
    And user save filter on setting page
    And user see a list of user filtered by 'Has Access' status

  @ER-2554 @ER-2806 @REGRESSION @SETTINGS-USER
  Scenario: Verify Invited status filter working in Settings > Users page
    Given that a user already exists with the state invited
    And user navigates to 'Settings' page
    When user clicks and select the on filter
    And user select 'Invited' Status filter
    And user save filter on setting page
    And user see a list of user filtered by 'Invited' status

  @ES-178 @ER-3179 @REGRESSION @USER
  Scenario: Verify transfer ownership feature
    Given that a account is in status 'open for existing user'
    And a 'apps-user' in state 'Operational' exists in the account
    And the user logs with a 'Multiple accounts' user
    And user logs into the created account
    And user navigates to 'Settings' page
    And user searches for the account owner
    And user clicks on Three dot Menu button
    And user select 'Transfer ownership' option from the menu
    When user switches the owner
    Then verify the status of the new user is owner
    And verify the status of the old owner is co-owner

  @ES-87 @ER-3181 @REGRESSION @USER
  Scenario: Verify activity column for invited users in Settings > Users page
    Given that a user already exists with the state invited
    And user navigates to 'Settings' page
    And user searches a specific user
    Then verify the activity column displays the 'Invited date'

  @ES-87 @ER-3182 @REGRESSION @USER
  Scenario: Verify activity column for operational users in Settings > Users page
    Given that a user already exists with the state Has Access
    And user navigates to 'Settings' page
    And user searches a specific user
    Then verify the activity column displays the 'Last login'

