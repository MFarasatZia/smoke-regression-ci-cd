Feature: Account > Login


  @ER-848 @ER-2737 @CustomLogin @REGRESSION @COMPLETED @SMOKE @LOGIN
  Scenario: Verify user logout and account selection dropdown on the multiple accounts page
    Given the user logs with a 'multiple accounts' user
    And the user navigates to the multiple accounts section
    When user clicks the logout button
    Then verify the login page is displayed
    And the user logs with a 'multiple accounts' user
    And the user navigates to the multiple accounts section
    When the user clicks the account dropdown
    Then verify the Continue Select button is disabled
    And verify the user can choose from multiple accounts

  @ER-1813 @ER-2739 @CustomLogin @LOGIN @COMPLETED @REGRESSION
  Scenario: Verify set password page is displayed for co-owners
    Given that a 'Co-owner' is in state 'invited'
    When the user opens the password reset link from mailtrap
    Then verify the account password reset page is displayed

  @ER-1813 @ER-2740 @LOGIN @COMPLETED @REGRESSION
  Scenario: Verify set password page is displayed for apps-users
    Given that a 'Apps-user' is in state 'invited'
    When the user opens the password reset link from mailtrap
    Then verify the account password reset page is displayed

  @ER-368 @ER-3160 @CustomLogin @NeedsFixing @ER-2487 @LOGIN
  Scenario: Verify selecting account from account selection dropdown
    Given that a account is in status 'open for multiple account'
    And the user logs with a 'multiple accounts' user
    When the user selects the created account
    And the user clicks on Continue Select button
    Then verify user lands on 'Employees Organization' page

  @ER-2113 @ER-2213 @NeedsFixing @LOGIN @COMPLETED
  Scenario: Verify logging in with apps user access
    Given user navigates to 'Settings' page
    And user add a news user with 'apps user' access to all apps
    And the user opens the reset password page
    And the user successfully signs up
    And the user logs with a 'ui created user' user
    Then verify user lands on 'Employees Organization' page

  @ER-2557 @ER-3116 @CustomLogin @REGRESSION @COMPLETED @LOGIN
  Scenario: Verify closed app-users cannot login on the account portal
    Given that a 'Apps-user' is in state 'Closed'
    When user tries to login with a 'Closed' user
    Then verify the user is not allowed to log in

  @ER-2557 @ER-3118 @CustomLogin @REGRESSION @COMPLETED @LOGIN
  Scenario: Verify blocked app-users cannot login on the account portal
    Given that a 'Apps-user' is in state 'Blocked'
    When user tries to login with a 'Blocked' user
    Then verify the user is not allowed to log in

  @ER-2557 @ER-3117 @CustomLogin @REGRESSION @COMPLETED @LOGIN
  Scenario: Verify blocked co-owners cannot login on the account portal
    Given that a 'Co-owner' is in state 'Blocked'
    When user tries to login with a 'Blocked' user
    Then verify the user is not allowed to log in

  @ER-2557 @ER-3119 @CustomLogin @REGRESSION @COMPLETED @LOGIN
  Scenario: Verify closed co-owners cannot login on the account portal
    Given that a 'Co-owner' is in state 'Closed'
    When user tries to login with a 'Closed' user
    Then verify the user is not allowed to log in

  @ER-3076 @ER-3263 @CustomLogin @REGRESSION @COMPLETED @LOGIN
  Scenario: Verify user cannot login into suspended account
    Given that a account is in status 'Suspended'
    And the user logs with a 'Multiple accounts' user
    When user logs into the created account
    Then verify the 'suspended' account error message is displayed

  @ER-2557 @ER-3119 @CustomLogin @REGRESSION @COMPLETED @LOGIN
  Scenario: Verify user cannot login into closed account
    Given that a account is in status 'Closed'
    And the user logs with a 'Multiple accounts' user
    When user logs into the created account
    Then verify the 'closed' account error message is displayed

  @ER-4106 @ER-5401 @REGRESSION @CustomLogin @LOGIN
  Scenario: Verify account login API and last_accessed field
    When user calls the account login API
    Then verify the response status for account login API is 200
    And verify the last_accessed field is present and valid