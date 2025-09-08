@ADMIN
Feature: Admin > Accounts

  @ER-657 @ER-2484 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify refreshing page on Accounts section doesn't log the user out of the application
    Given user logs into admin portal as super user
    Then verify the user lands on the 'Accounts' page
    And user refreshes the page
    Then verify the user lands on the 'Accounts' page

  @ER-161 @ER-1411 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify account name is displayed in the account page
    Given that a account is in status 'draft'
    When user logs into admin portal as super user
    Then verify the user lands on the 'Accounts' page
    And user searches for account
    Then verify the account name is displayed in the account tree

  @ER-233 @ER-686 @REGRESSION @COMPLETED @ADMIN-ACCOUNTS
  Scenario: Verify super user can add a account
    Given user logs into admin portal as super user
    When user creates a account
    Then verify that the account name is displayed in the accounts page
    And verify that the account is in status 'Draft'

  @ER-233 @ER-687 @REGRESSION @COMPLETED @ADMIN-ACCOUNTS
  Scenario: Verify super user cannot add account that is not unique
    Given that a account is in status 'draft'
    And user logs into admin portal as super user
    When user opens the 'Add account' modal
    And user tries to add account using a existing account name
    Then verify that the error message 'Account name is taken.' is displayed

  @ER-233 @ER-688 @REGRESSION @COMPLETED @ADMIN-ACCOUNTS
  Scenario: Verify super user cannot add account with a name smaller than three characters
    Given user logs into admin portal as super user
    When user opens the 'Add account' modal
    And user renames the account using 'Name smaller than 3 characters'
    Then verify that the error message 'Name must be 3 characters or more' is displayed

  @ER-161 @ER-690 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify super user can rename a account
    Given that a account is in status 'draft'
    And user logs into admin portal as super user
    When user opens the 'Rename account' modal
    Then verify the account name is filled
    When user renames the account using 'Valid name'
    Then verify that the account name is displayed in the accounts page

  @ER-161 @ER-691 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify super user cannot rename account name with a name that is not unique
    Given that a account is in status 'draft'
    And user logs into admin portal as super user
    When user opens the 'Rename account' modal
    Then verify the account name is filled
    When user renames the account using 'Existing name'
    Then verify that the error message 'Account name is taken.' is displayed

  @ER-161 @ER-692 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify super user cannot rename account name with a name smaller than three characters
    Given that a account is in status 'draft'
    And user logs into admin portal as super user
    When user opens the 'Rename account' modal
    Then verify the account name is filled
    When user renames the account using 'Name smaller than 3 characters'
    Then verify that the error message 'Name must be 3 characters or more' is displayed

  @ER-239 @ER-823 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify super user can activate account when user does not exist
    Given that a account is in status 'draft'
    And user logs into admin portal as super user
    And user removes the default account status filters
    When user opens the 'Activate account' modal
    And user activates the account with 'Non existing user'
    When user searches for account
    Then verify that the account is in status 'Pending Activation'

  @ER-240 @ER-833 @REGRESSION @SMOKE @ADMIN-ACCOUNTS
  Scenario: Verify super user can activate account when user exists
    Given that a account is in status 'draft'
    And user logs into admin portal as super user
    When user opens the 'Activate account' modal
    And user activates the account with 'Existing user'
    When user searches for account
    Then verify that the account is in status 'Open'

  @ER-849 @REGRESSION @COMPLETED @ADMIN-ACCOUNTS
  Scenario: Verify super user cannot activate account with email of invalid format
    Given that a account is in status 'draft'
    And user logs into admin portal as super user
    When user opens the 'Activate account' modal
    And user fills the email field with a email that has invalid format
    Then verify error message 'E-mail must be valid' is displayed

  @ER-238 @ER-1421 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify super user cannot activate account when email exists but is closed
    Given that a 'Super user' is in state 'Closed'
    And that a account is in status 'Draft'
    And user logs into admin portal as super user
    When user opens the 'Activate account' modal
    And user activates the account with 'Closed user'
    Then Verify that email is closed in the system

  @ER-237 @ER-1408 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify super user cannot activate account when email exists but is blocked
    Given that a 'Super user' is in state 'Blocked'
    And that a account is in status 'Draft'
    And user logs into admin portal as super user
    When user opens the 'Activate account' modal
    And user activates the account with 'Blocked user'
    Then Verify that email is blocked in the system

  @ER-282 @ER-1424 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify super user can re-open account
    Given that a account is in status 'Closed'
    And user logs into admin portal as super user
    And user removes the default account status filters
    When user opens the 'Re-open' modal
    And user 're-opens' the account
    And user searches for account
    Then verify that the account is in status 'Open'

  @ER-280 @ER-1223 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify super user can close a account
    Given that a account is in status 'open for existing user'
    And user logs into admin portal as super user
    And user removes the default account status filters
    When user opens the 'Close account' modal
    And user 'close' the account
    And user searches for account
    Then verify that the account is in status 'Closed'

  @ER-280 @ER-1225 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify close account action is not displayed for draft accounts
    Given that a account is in status 'Draft'
    And user logs into admin portal as super user
    When user opens the accounts action menu
    Then verify the 'Close' account action is not displayed

  @ER-280 @ER-1227 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify close account action is not displayed for closed accounts
    Given that a account is in status 'Closed'
    And user logs into admin portal as super user
    And user removes the default account status filters
    When user opens the accounts action menu
    Then verify the 'Close' account action is not displayed

  @ER-277 @ER-1232 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify super user can change account owner when user exists
    Given that a account is in status 'Open for existing user'
    And user logs into admin portal as super user
    When user opens the 'Change owner' modal
    And user changes owner using 'Existing user'
    Then verify the 'Existing user' is displayed in the owner column
    And verify the account status is 'Open'

  @ER-277 @ER-1246 @REGRESSION @FIX @ER-1269 @ADMIN-ACCOUNTS
  Scenario: Verify change owner option is not displayed for draft account
    Given that a account is in status 'Draft'
    And user logs into admin portal as super user
    When user opens the accounts action menu
    Then verify the 'Change owner' account action is not displayed

  @ER-277 @ER-1247 @NeedFixing @ADMIN-ACCOUNTS
  Scenario: Verify change owner option is not displayed for closed account
    Given that a account is in status 'Closed'
    And user logs into admin portal as super user
    When user opens the accounts action menu
    Then verify the 'Change owner' account action is not displayed

  @ER-274 @ER-1249 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify super user cannot change account owner when user exists but is blocked
    Given that a 'Super user' is in state 'Blocked'
    And that a account is in status 'open for existing user'
    And user logs into admin portal as super user
    When user opens the 'Change owner' modal
    And user changes owner using 'Blocked user'
    Then verify 'Blocked user' modal is displayed

  @ER-275 @ER-1250 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify super user cannot change account owner when user exists but is closed
    Given that a 'Super user' is in state 'Closed'
    And that a account is in status 'open for existing user'
    And user logs into admin portal as super user
    When user opens the 'Change owner' modal
    And user changes owner using 'Closed user'
    Then verify 'Closed user' modal is displayed

  @ER-276 @ER-1251 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify super user can change account owner when doesn't exist
    Given that a account is in status 'open for existing user'
    And user logs into admin portal as super user
    When user opens the 'Change owner' modal
    And user changes owner using 'Non existing user'
    And user removes the default account status filters
    And user searches the created account on the admin portal
    Then verify the 'Non existing user' is displayed in the owner column
    And verify that the account is in status 'Pending Activation'

  @ER-279 @ER-1233 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify super user can delete a account
    Given that a account is in status 'Draft'
    And user logs into admin portal as super user
    When user opens the 'Delete Account' modal
    And user deletes the account
    Then verify the user is not visible

  @ER-1472 @ER-1601 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify that Hide Remember user for 30 days from login page on Admin portal
    Given user logs into admin portal as super user
    When user is logs out from admin portal
    And verify user is redirected to the admin login page
    Then user is on admin portal and The Remember for 30 days checkbox not to be visible

  @ER-1263 @ER-2132 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify accounts default filters
    When user logs into admin portal as super user
    Then verify the default account status filters are displayed

  @ER-1263 @ER-2133 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify accounts draft status filter works
    Given that a account is in status 'Draft'
    And user logs into admin portal as super user
    When user searches the created account on the admin portal
    Then verify the account is visible in the Accounts page
    When user removes the 'Draft' filter from the Accounts page
    Then verify the is account not visible anymore

  @ER-1263 @ER-2134 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify accounts open status filter works
    Given that a account is in status 'open for existing user'
    And user logs into admin portal as super user
    When user searches the created account on the admin portal
    Then verify the account is visible in the Accounts page
    When user removes the 'Open' filter from the Accounts page
    Then verify the is account not visible anymore

  @ER-1263 @ER-2135 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify accounts pending status filter works
    Given that a account is in status 'Pending Activation'
    And user logs into admin portal as super user
    And user adds the 'Pending Activation' status filter
    When user searches the created account on the admin portal
    Then verify the account is visible in the Accounts page
    When user removes the 'Pending Activation' filter from the Accounts page
    Then verify the is account not visible anymore

  @ER-1263 @ER-2136 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify accounts suspended status filter works
    Given that a account is in status 'Suspended'
    And user logs into admin portal as super user
    And user adds the 'Suspended' status filter
    When user searches the created account on the admin portal
    Then verify the account is visible in the Accounts page
    When user removes the 'Suspended' filter from the Accounts page
    Then verify the is account not visible anymore

  @ER-1263 @ER-2137 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify accounts closed status filter works
    Given that a account is in status 'Closed'
    And user logs into admin portal as super user
    And user removes the default account status filters
    And user adds the 'Closed' status filter
    When user searches the created account on the admin portal
    Then verify the account is visible in the Accounts page
    When user removes the 'Closed' filter from the Accounts page
    Then verify the is account not visible anymore

  @ER-2119 @ER-2210 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify rename action is displayed for pending accounts
    Given that a account is in status 'Pending Activation'
    And user logs into admin portal as super user
    And user removes the default account status filters
    And user adds the 'Pending Activation' status filter
    When user searches the created account on the admin portal
    And user user clicks the three dotted button
    Then verify the 'Rename' account action is displayed
    Then verify the 'Cancel invite' account action is displayed
    And verify 2 account actions are displayed

  @ER-1410 @ER-2294 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify Activate account action is displayed for Draft accounts
    Given that a account is in status 'draft'
    When user logs into admin portal as super user
    Then verify the user lands on the 'Accounts' page
    And user removes the default account status filters
    When user opens the accounts action menu
    Then verify the 'Activate' account action is displayed

  @ER-2308 @ER-2374 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify that filter bar not disappeared when user close the account
    Given that a account is in status 'open for existing user'
    And user logs into admin portal as super user
    When user opens the 'Close account' modal
    And user 'close' the account
    Then Verify that filter bar not disappeared when user close the account

  @ER-2368 @ER-2521 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify no user is displayed in owner column when deleting user invited for account activation
    Given that a account is in status 'draft'
    And user logs into admin portal as super user
    And user removes the default account status filters
    When user opens the 'Activate account' modal
    And user activates the account with 'Non existing user'
    And user navigates to 'Users' admin page
    And user searches the created user on the account section
    And user deletes the user created by activating account
    When user navigates to 'Accounts' admin page
    And user searches for account
    Then verify that the account is in status 'Draft'
    And verify the 'No user' is displayed in the owner column

  @ER-2368 @ER-2522 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify no user is displayed in owner column when canceling invite for user invited for account activation
    Given that a account is in status 'draft'
    And user logs into admin portal as super user
    And user removes the default account status filters
    When user opens the 'Activate account' modal
    And user activates the account with 'Non existing user'
    And user navigates to 'Users' admin page
    And user searches the created user on the account section
    And user cancels the invite to the user created by activating account
    When user navigates to 'Accounts' admin page
    And user searches for account
    Then verify that the account is in status 'Draft'
    And verify the 'No user' is displayed in the owner column

  @ER-1653 @ER-2645 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify the text of invite button when activating an account in Admin > accounts page
    Given that a account is in status 'draft'
    And user logs into admin portal as super user
    And user removes the default account status filters
    When user opens the 'Activate account' modal
    Then user activate the account with 'Non existing user'
    And verify the text of invite button

  @ER-2602 @ER-2791 @REGRESSION @ADMIN-USERS @COMPLETED
  Scenario: Verify newly created super user can create a account
    Given that a 'Super user' is in state 'Operational'
    When user logs into admin portal with a super user created via API
    When user creates a account
    Then verify that the account name is displayed in the accounts page
    And verify that the account is in status 'Draft'

  @ER-2608 @ER-2793 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify re-opening suspended accounts feature
    Given that a account is in status 'Suspended'
    And user logs into admin portal as super user
    And user removes the default account status filters
    When user opens the 'Re-open' modal
    And user 're-opens' the account
    And user searches for account
    Then verify that the account is in status 'Open'

  @ER-2483 @ER-2771 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify User is able to receive the invite of newly created account in admin > accounts page
    Given that a account is in status 'draft'
    And user logs into admin portal as super user
    And user removes the default account status filters
    When user opens the 'Activate account' modal
    And user activates the account with 'Non existing user'
    Then verify user receives the invite email in mailtrap

  @ER-2483 @ER-2876 @REGRESSION @ADMIN-ACCOUNTS
  Scenario: Verify User is able to signup with newly created account in admin > accounts 
    Given that a account is in status 'draft'
    And user logs into admin portal as super user
    And user removes the default account status filters
    When user opens the 'Activate account' modal
    And user activates the account with 'Non existing user'
    And verify the email is received in the mailbox and extract the invite link
    Then user clicks on the invite link
    And user set the password
    And user set the confirm password
    And user click on reset password button
    And user clicks on continue button
    And user verify the login page url
  
  @ER-3719 @ER-1218 @REGRESSION @COMPLETED @LOGIN
  Scenario: verify the 'Close' account action is not displayed
    Given that a account is in status 'Suspended'
    And user logs into admin portal as super user
    And user removes the default account status filters
    When user searches the created account on the admin portal
    When user opens the accounts action menu
    Then verify the 'Close' account action is not displayed