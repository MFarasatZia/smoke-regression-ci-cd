@ADMIN
Feature: Admin > Login

  @ER-48 @ER-2053 @ER-4094 @ADMIN @REGRESSION @SMOKE @COMPLETED @ADMIN-LOGIN
  Scenario: Verify forgot password feature
    Given that a 'Super user' is in state 'invited'
    When the super user signs up
    And the super user clicks the 'Forgot password' button
    And verify super user lands on Forgot password page
    When super user resets his password
    And super user opens the reset password page
    And super user successfully resets his password
    And super user clicks on 'Continue' button from reset password page
    And super user logs with a 'New' user
    Then verify the user lands on the 'Accounts' page

  @ER-2115 @ER-2181 @ER-4094 @ADMIN @REGRESSION @SMOKE @COMPLETED @ADMIN-LOGIN
  Scenario: Verify resend reset password link feature on admin portal
    Given that a 'Super user' is in state 'invited'
    When the super user signs up
    And the super user clicks the 'Forgot password' button
    And verify super user lands on Forgot password page
    When super user resets his password
    And super user clicks the 'Click to resend' button
    And super user opens the reset password page
    And super user successfully resets his password
    And super user clicks on 'Continue' button from reset password page
    And super user logs with a 'New' user
    Then verify the user lands on the 'Accounts' page

  @ER-48 @ER-2054 @ADMIN @REGRESSION @COMPLETED @SMOKE @ADMIN-LOGIN
  Scenario: Verify user signup feature
    Given that a 'Super user' is in state 'invited'
    And super user opens the setup password page
    And super user successfully signs up
    And super user clicks on 'Continue' button from reset password page
    And super user logs with a 'New' user
    Then verify the user lands on the 'Accounts' page

  @ER-2138 @ER-2266 @ADMIN @NeedsFixing @ER-2272 @ADMIN-LOGIN
  Scenario: Verify newly created super user can login into the admin portal
    Given user logs into admin portal as super user
    And user navigates to 'Users' admin page
    And user creates a super user
    And verify that the user is displayed in the users tree
    And super user opens the reset password page
    And super user successfully resets his password
    When super user opens the admin portal
    And super user logs with a 'new' user
    Then verify the user lands on the 'Accounts' page

  @ER-2116 @ER-205X @ADMIN @REGRESSION @ADMIN-LOGIN @COMPLETED
  Scenario: Verify user cannot reset his password to a previously used password
    Given that a 'Super user' is in state 'invited'
    When the super user signs up
    And the super user clicks the 'Forgot password' button
    And verify super user lands on Forgot password page
    When super user resets his password
    And super user opens the reset password page
    And super user tries to reset his password using previous password
    Then verify the password is not reset

  @ER-1813 @ER-2738 @ADMIN @REGRESSION @SMOKE @COMPLETED @ADMIN-LOGIN
  Scenario: Verify set password page is displayed for admin users
    Given that a 'Super user' is in state 'invited'
    When the user opens the password reset link from mailtrap
    Then verify the admin password reset page is displayed

  @ER-2557 @ER-3115 @ADMIN @REGRESSION @SMOKE @ADMIN-LOGIN @COMPLETED
  Scenario: Verify closed super users cannot login on the admin portal
    Given that a 'Super user' is in state 'Closed'
    When super user tries to login with a 'Closed' user
    Then verify the the user is not allowed to log in

  @ER-2557 @ER-3114 @ADMIN @REGRESSION @SMOKE @ADMIN-LOGIN @COMPLETED
  Scenario: Verify blocked super users cannot login on the admin portal
    Given that a 'Super user' is in state 'Blocked'
    When super user tries to login with a 'Blocked' user
    Then verify the the user is not allowed to log in
