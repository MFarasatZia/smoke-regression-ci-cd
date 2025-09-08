@ADMIN
Feature: Admin > Users

  @ER-375 @ER-924 @REGRESSION @COMPLETED @ADMIN-USERS
  Scenario: Verify super user can delete a super user
    Given that a 'Super user' is in state 'Invited'
    When user logs into admin portal as super user
    And user navigates to 'Users' admin page
    When user opens the 'Delete' modal from Users section
    And user clicks the delete button
    Then verify the user is no longer visible

  @ER-375 @ER-2626 @REGRESSION @COMPLETED @ADMIN-USERS
  Scenario: Verify super user can delete a co-owner
    Given that a 'Co-owner' is in state 'Invited'
    When user logs into admin portal as super user
    And user navigates to 'Users' admin page
    When user opens the 'Delete' modal from Users section
    And user clicks the delete button
    Then verify the user is no longer visible

  @ER-375 @ER-925 @REGRESSION @COMPLETED @ADMIN-USERS
  Scenario: Verify delete action is not displayed for blocked super users
    Given that a 'Super user' is in state 'Blocked'
    When user logs into admin portal as super user
    And user navigates to 'Users' admin page
    And user remove the 'Invited' status
    And user remove the 'Operational' status
    When user opens the actions menu
    Then verify the 'Delete' action is not displayed

  @ER-375 @ER-926 @REGRESSION @COMPLETED @ADMIN-USERS
  Scenario: Verify delete action is not displayed for operational super users
    Given that a 'Super user' is in state 'Operational'
    When user logs into admin portal as super user
    And user navigates to 'Users' admin page
    When user opens the actions menu
    Then verify the 'Delete' action is not displayed

  @ER-375 @ER-927 @REGRESSION @COMPLETED @ADMIN-USERS
  Scenario: Verify delete action is not displayed for closed super users
    Given that a 'Super user' is in state 'Closed'
    When user logs into admin portal as super user
    And user navigates to 'Users' admin page
    And user remove the 'Invited' status
    And user remove the 'Operational' status
    When user opens the actions menu
    Then verify the 'Delete' action is not displayed

  @ER-970 @NeedsFixing @ADMIN-USERS
  Scenario: Verify access to account counter
    Given that the list of user accounts is retrieved via API
    And user logs into admin portal as super user
    When user navigates to 'Users' admin page
    Then verify the number of accounts is correctly displayed in the accounts counter

  @ER-1090 @REGRESSION @ADMIN-USERS
  Scenario: Verify super user can add a system admin
    Given user logs into admin portal as super user
    And user navigates to 'Users' admin page
    When user creates a super user
    Then verify that the user is displayed in the users tree
    And verify that badge is in status 'Invited'

  @ER-1091 @REGRESSION @ADMIN-USERS
  Scenario: Verify super user cannot add existing users
    Given user logs into admin portal as super user
    And user navigates to 'Users' admin page
    When user tries to create a super user with a existing user email
    Then verify that a error message for existing user is displayed

  @ER-374 @ER-1163 @REGRESSION @ADMIN-USERS
  Scenario: Verify renaming a super user in state Invited
    Given that a 'Super user' is in state 'Invited'
    When user logs into admin portal as super user
    And user navigates to 'Users' admin page
    When user opens the 'Rename' modal from Users section
    And user renames another user
    Then verify the new user name is displayed users table

  @ER-374 @ER-2630 @REGRESSION @ADMIN-USERS
  Scenario: Verify renaming a co-owner user in state Invited
    Given that a 'Co-owner' is in state 'Invited'
    When user logs into admin portal as super user
    And user navigates to 'Users' admin page
    When user opens the 'Rename' modal from Users section
    And user renames another user
    Then verify the new user name is displayed users table

  @ER-374 @ER-1164 @REGRESSION @ADMIN-USERS
  Scenario: Verify renaming a super user in state Operational
    Given that a 'Super user' is in state 'Operational'
    When user logs into admin portal as super user
    And user navigates to 'Users' admin page
    When user opens the 'Rename' modal from Users section
    And user renames another user
    Then verify the new user name is displayed users table

  @ER-374 @2631 @REGRESSION @ADMIN-USERS
  Scenario: Verify renaming a co-owner user in state Operational
    Given that a 'Co-owner' is in state 'Operational'
    When user logs into admin portal as super user
    And user navigates to 'Users' admin page
    When user opens the 'Rename' modal from Users section
    And user renames another user
    Then verify the new user name is displayed users table

  @ER-374 @ER-1165 @REGRESSION @ADMIN-USERS
  Scenario: Verify renaming a super user in state Blocked
    Given that a 'Super user' is in state 'Blocked'
    When user logs into admin portal as super user
    And user navigates to 'Users' admin page
    And user removes the default filters
    When user opens the 'Rename' modal from Users section
    And user renames another user
    Then verify the new user name is displayed users table

  @ER-374 @ER-2632 @REGRESSION @ADMIN-USERS
  Scenario: Verify renaming a co-owner user in state Blocked
    Given that a 'Co-owner' is in state 'Blocked'
    When user logs into admin portal as super user
    And user navigates to 'Users' admin page
    And user removes the default filters
    When user opens the 'Rename' modal from Users section
    And user renames another user
    Then verify the new user name is displayed users table

  @ER-374 @ER-1166 @REGRESSION @ER-2622 @ADMIN-USERS
  Scenario: Verify super user cannot rename a Closed super user
    Given that a 'Super user' is in state 'Closed'
    When user logs into admin portal as super user
    And user navigates to 'Users' admin page
    And user removes the default filters
    When user searches the created user on the admin portal
    And user clicks the action button
    Then verify the 'Rename' action is not displayed in the action dropdown

  @ER-374 @ER-2633 @REGRESSION @ER-2622 @ADMIN-USERS
  Scenario: Verify super user cannot rename a Closed co-owner user
    Given that a 'Co-owner' is in state 'Closed'
    When user logs into admin portal as super user
    And user navigates to 'Users' admin page
    And user removes the default filters
    When user searches the created user on the admin portal
    And user clicks the action button
    Then verify the 'Rename' action is not displayed in the action dropdown

  @ER-374 @ER-2747 @REGRESSION @ADMIN-USERS
  Scenario: Verify super user cannot rename a Closed apps-user
    Given that a 'Apps-user' is in state 'Closed'
    When user logs into admin portal as super user
    And user navigates to 'Users' admin page
    And user removes the default filters
    When user searches the created user on the admin portal
    And user clicks the action button
    Then verify the 'Rename' action is not displayed in the action dropdown

  @ER-995 @ER-1260 @REGRESSION @ADMIN-USERS
  Scenario: Verify Navigation to Subscription Page After Login
    Given user logs into admin portal as super user
    When user navigates to 'subscriptions' admin page
    Then verify the user lands on the 'Subscriptions' page

  @ER-378 @ER-1279 @REGRESSION @ADMIN-USERS
  Scenario: Verify Admin Portal Users Un-Block case is working properly for super users
    Given that a 'Super user' is in state 'Blocked'
    And user logs into admin portal as super user
    And user navigates to 'Users' admin page
    And user removes the default filters
    When user opens the 'Un-Block' modal from Users section
    And user clicks Un-Block button
    Then verify that badge is in status 'Operational'

  @ER-378 @ER-2634 @REGRESSION @ADMIN-USERS
  Scenario: Verify Admin Portal Users Un-Block case is working properly for co-owner users
    Given that a 'Co-owner' is in state 'Blocked'
    And user logs into admin portal as super user
    And user navigates to 'Users' admin page
    And user removes the default filters
    When user opens the 'Un-Block' modal from Users section
    And user clicks Un-Block button
    Then verify that badge is in status 'Operational'

  @ER-376 @ER-1281 @REGRESSION @ADMIN-USERS
  Scenario: Verify Admin Portal Users Block case is working properly for super users
    Given that a 'Super user' is in state 'Operational'
    And user logs into admin portal as super user
    And user navigates to 'Users' admin page
    And user removes the default filters
    When user opens the 'Block' modal from Users section
    And user clicks on Block button
    Then verify that badge is in status 'Blocked'

  @ER-376 @ER-2635 @REGRESSION @ADMIN-USERS
  Scenario: Verify Admin Portal Users Block case is working properly for co-owner users
    Given that a 'Co-owner' is in state 'Operational'
    And user logs into admin portal as super user
    And user navigates to 'Users' admin page
    And user removes the default filters
    When user opens the 'Block' modal from Users section
    And user clicks on Block button
    Then verify that badge is in status 'Blocked'

  @ER-377 @ER-1283 @REGRESSION @ADMIN-USERS
  Scenario: Verify Admin Portal Users Un-Close case is working properly for super users
    Given that a 'Super user' is in state 'Closed'
    And user logs into admin portal as super user
    And user navigates to 'Users' admin page
    And user removes the default filters
    When user opens the 'Un-Close' modal from Users section
    And user clicks on Un-Close button
    Then verify that badge is in status 'Operational'

  @ER-377 @ER-2636 @REGRESSION @ADMIN-USERS
  Scenario: Verify Admin Portal Users Un-Close case is working properly for co-owner users
    Given that a 'Co-owner' is in state 'Closed'
    And user logs into admin portal as super user
    And user navigates to 'Users' admin page
    And user removes the default filters
    When user opens the 'Un-Close' modal from Users section
    And user clicks on Un-Close button
    Then verify that badge is in status 'Operational'

  @ER-373 @ER-1285 @REGRESSION @ADMIN-USERS
  Scenario: Verify Admin Portal Users Close case is working properly for super users
    Given that a 'Super user' is in state 'Operational'
    And user logs into admin portal as super user
    And user navigates to 'Users' admin page
    And user removes the default filters
    When user opens the 'Close' modal from Users section
    And user clicks on Close button
    Then verify that badge is in status 'Closed'

  @ER-370 @ER-1392 @REGRESSION @ADMIN-USERS
  Scenario: Verify only rename action is visible for a super user
    Given user logs into admin portal as super user
    And user navigates to 'Users' admin page
    When user clicks the action button for a 'super user'
    Then verify 'Rename' action is displayed
    And verify 1 actions are displayed

  @ER-370 @ER-1394 @REGRESSION @ADMIN-USERS
  Scenario: Verify actions applicable for Invited super users
    Given that a 'Super user' is in state 'Invited'
    And user logs into admin portal as super user
    And user navigates to 'Users' admin page
    When user clicks the action button for a 'Created user'
    Then verify 'Rename' action is displayed
    And verify 'Delete' action is displayed
    And verify 2 actions are displayed

  @ER-370 @ER-2639 @REGRESSION @ADMIN-USERS
  Scenario: Verify actions applicable for Invited co-owner users
    Given that a 'Co-owner' is in state 'Invited'
    And user logs into admin portal as super user
    And user navigates to 'Users' admin page
    When user clicks the action button for a 'Created user'
    Then verify 'Resend invite' action is displayed
    Then verify 'Cancel invite' action is displayed
    Then verify 'Rename' action is displayed
    And verify 'Delete' action is displayed
    And verify 4 actions are displayed

  @ER-370 @ER-1396 @REGRESSION @ADMIN-USERS
  Scenario: Verify actions applicable for Operational super users
    Given that a 'Super user' is in state 'Operational'
    And user logs into admin portal as super user
    And user navigates to 'Users' admin page
    When user clicks the action button for a 'Created user'
    Then verify 'Close' action is displayed
    And verify 'Block' action is displayed
    And verify 'Rename' action is displayed
    And verify 3 actions are displayed

  @ER-370 @ER-2637 @REGRESSION @ADMIN-USERS
  Scenario: Verify actions applicable for Operational co-owner users
    Given that a 'Co-owner' is in state 'Operational'
    And user logs into admin portal as super user
    And user navigates to 'Users' admin page
    When user clicks the action button for a 'Created user'
    Then verify 'Close' action is displayed
    And verify 'Block' action is displayed
    And verify 'Rename' action is displayed
    And verify 3 actions are displayed

  @ER-370 @ER-1397 @REGRESSION @ADMIN-USERS
  Scenario: Verify actions applicable for Blocked super users
    Given that a 'Super user' is in state 'Blocked'
    And user logs into admin portal as super user
    And user navigates to 'Users' admin page
    And user removes the default filters
    When user clicks the action button for a 'Created user'
    Then verify 'Un-Block' action is displayed
    And verify 'Rename' action is displayed
    And verify 2 actions are displayed

  @ER-370 @ER-2638 @REGRESSION @ADMIN-USERS
  Scenario: Verify actions applicable for Blocked co-owner users
    Given that a 'Co-owner' is in state 'Blocked'
    And user logs into admin portal as super user
    And user navigates to 'Users' admin page
    And user removes the default filters
    When user clicks the action button for a 'Created user'
    Then verify 'Un-Block' action is displayed
    And verify 'Rename' action is displayed
    And verify 2 actions are displayed

  @ER-370 @ER-1399 @REGRESSION @ADMIN-USERS
  Scenario: Verify actions applicable for Closed super users
    Given that a 'Super user' is in state 'Closed'
    And user logs into admin portal as super user
    And user navigates to 'Users' admin page
    And user removes the default filters
    When user clicks the action button for a 'Created user'
    Then verify 'Un-Close' action is displayed
    And verify 'Rename' action is displayed
    And verify 2 actions are displayed

  @ER-370 @ER-2640 @REGRESSION @ADMIN-USERS
  Scenario: Verify actions applicable for Closed co-owner users
    Given that a 'Co-owner' is in state 'Closed'
    And user logs into admin portal as super user
    And user navigates to 'Users' admin page
    And user removes the default filters
    When user clicks the action button for a 'Created user'
    Then verify 'Un-Close' action is displayed
    And verify 'Rename' action is displayed
    And verify 2 actions are displayed

  @ER-372 @ER-1306 @REGRESSION @ADMIN-USERS
  Scenario: Verify cancel invite action for co-owner users
    Given that a 'co-owner' is in state 'Invited'
    And user logs into admin portal as super user
    When user navigates to 'Users' admin page
    And user opens the 'Cancel' modal from Users section
    And user clicks on Cancel button
    Then verify the user should not be visible

  @ER-731 @ER-1569 @NeedsFixing @ADMIN-USERS
  Scenario: Verify users counter counts only active users
    Given user logs into admin portal as super user
    When user navigates to 'Users' admin page
    Then verify the active users counter display the correct value

  @ER-371 @ER-1776 @Regression @ADMIN-USERS
  Scenario: Verify resend invite action for co-owner users
    Given that a 'Co-owner' is in state 'Invited'
    And user logs into admin portal as super user
    And user navigates to 'Users' admin page
    When user clicks the action button for a 'Created user'
    And user select 'Resend' option from the menu
    And user clicks on Resend button
    Then verify invitation email is received in the mail box

  @ER-371 @ER-1777 @REGRESSION @ADMIN-USERS
  Scenario: Verify Resend Invite option is not visible for operational super users on Admin < Users page
    Given that a 'super user' is in state 'Operational'
    And user logs into admin portal as super user
    And user navigates to 'Users' admin page
    When user clicks the action button for a 'Created user'
    Then verify Resend Invite action is not visible

  @ER-1265 @ER-2035 @REGRESSION @SMOKE @ADMIN-USERS
  Scenario: Verify default users filters
    Given user logs into admin portal as super user
    When user navigates to 'Users' admin page
    Then verify 'Invited' filter is displayed
    Then verify 'Operational' filter is displayed

  @ER-1265 @ER-2075 @REGRESSION @SMOKE @ADMIN-USERS
  Scenario: Verify invited user filter works
    Given that a 'Super user' is in state 'Invited'
    And user logs into admin portal as super user
    And user navigates to 'Users' admin page
    When user searches the created user on the admin portal
    Then verify the user is visible in the User page
    When user removes the 'Invited' filter from the Users page
    Then verify the user should not be visible

  @ER-1265 @ER-2076 @REGRESSION @SMOKE @ADMIN-USERS
  Scenario: Verify operational user filter works
    Given that a 'Super user' is in state 'Operational'
    And user logs into admin portal as super user
    And user navigates to 'Users' admin page
    When user searches the created user on the admin portal
    Then verify the user is visible in the User page
    When user removes the 'Operational' filter from the Users page
    Then verify the user should not be visible

  @ER-1265 @ER-2077 @REGRESSION @SMOKE @ADMIN-USERS
  Scenario: Verify closed user filter works
    Given that a 'Super user' is in state 'Closed'
    And user logs into admin portal as super user
    And user navigates to 'Users' admin page
    And user adds the 'Closed' filter
    When user searches the created user on the admin portal
    Then verify the user is visible in the User page
    When user removes the 'Closed' filter from the Users page
    Then verify the user should not be visible

  @ER-1265 @ER-2078 @REGRESSION @SMOKE @ADMIN-USERS
  Scenario: Verify blocked user filter works
    Given that a 'Super user' is in state 'Blocked'
    And user logs into admin portal as super user
    And user navigates to 'Users' admin page
    And user adds the 'Blocked' filter
    When user searches the created user on the admin portal
    Then verify the user is visible in the User page
    When user removes the 'Blocked' filter from the Users page
    Then verify the user should not be visible

  @ER-1265 @ER-2079 @REGRESSION @SMOKE @ADMIN-USERS
  Scenario: Verify saved filters persist after leaving the page
    Given user logs into admin portal as super user
    And user navigates to 'Users' admin page
    And user adds the 'Closed' filter
    And user adds the 'Blocked' filter
    When user refreshes the page
    Then verify all user status filters are displayed
    And user navigates to 'Accounts' admin page
    And user navigates to 'Users' admin page
    Then verify all user status filters are displayed

  @ER-2609 @ER-2795 @REGRESSION @ADMIN-USERS @COMPLETED
  Scenario: Verify resend invite feature works for newly created admin users
    Given that a 'Super user' is in state 'Operational'
    And user logs into admin portal with a super user created via API
    And that a 'Super user' is in state 'Invited'
    And user navigates to 'Users' admin page
    When user clicks the action button for a 'Created user'
    And user select 'Resend' option from the menu
    And user clicks on Resend button
    Then verify invitation email is received in the mail box

  @ER-2609 @ER-2796 @REGRESSION @ADMIN-USERS
  Scenario: Verify resend invite feature works for newly created co-owner users
    Given that a 'Super user' is in state 'Operational'
    And user logs into admin portal with a super user created via API
    And that a 'Co-owner' is in state 'Invited'
    And user navigates to 'Users' admin page
    When user clicks the action button for a 'Created user'
    And user select 'Resend' option from the menu
    And user clicks on Resend button
    Then verify invitation email is received in the mail box

  @ER-2609 @ER-2797 @REGRESSION @ADMIN-USERS
  Scenario: Verify resend invite feature works for newly created apps users
    Given that a 'Super user' is in state 'Operational'
    And user logs into admin portal with a super user created via API
    And that a 'Apps-user' is in state 'Invited'
    And user navigates to 'Users' admin page
    When user clicks the action button for a 'Created user'
    And user select 'Resend' option from the menu
    And user clicks on Resend button
    Then verify invitation email is received in the mail box

  @ER-2244 @ER-4691 @REGRESSION @ADMIN-USERS
  Scenario: Verify the block option is hidden the user is Owner
    Given that a 'Super user' is in state 'Operational'
    And user logs into admin portal with a super user created via API
    And user navigates to 'Users' admin page
    When user searches the created user on the admin portal
    And the user clicks the three dotted button
    Then block option is hidden when the user is the owner

   @ER-2244 @ER-4691 @REGRESSION @ADMIN-USERS
  Scenario: Verify the block option is shown the user is Co-Owner
    Given that a 'Co-owner' is in state 'Operational'
    And user logs into admin portal as super user
    And user navigates to 'Users' admin page
    When user searches the created user on the admin portal
    And the user clicks the three dotted button
    And the user clicks on blocks button
    And block option is shown when the user is the co-owner
    And the user clicks on clear All button
    And user searches the created user on the admin portal
    Then verify that badge is in status 'Blocked'
  
  @ER-4552 @ER-5156 @REGRESSION @ADMIN-USERS
  Scenario: Verify User Form in Users
    Given that a 'Super user' is in state 'Operational'
    When user logs into admin portal as super user
    And user navigates to 'Users' admin page
    And user clicks on perticuler user
    Then verify that Users Form in Users