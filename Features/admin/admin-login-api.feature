@backend
Feature: Admin > Login > API

  @ER-154 @ER-1209 @REGRESSION-API @SMOKE-API @ADMIN-LOGIN-API
  Scenario: Verify admin login API
    When 'Super user' logs to admin portal via API
    Then verify the response for the admin login API is 200
    And verify the admin login API returns the token

  @ER-154 @ER-1210 @REGRESSION-API @ADMIN-LOGIN-API
  Scenario: Verify calling the login API as normal user results in error
    When 'Normal user' logs to admin portal via API
    Then verify the response for the admin login API is 401
    And verify response for admin login API contains text 'Only super users can login using this endpoint.'

  @ER-154 @ER-1211 @REGRESSION-API @ADMIN-LOGIN-API
  Scenario: Verify calling the login API as nonexistent user results in error
    When 'Nonexistent user' logs to admin portal via API
    Then verify the response for the admin login API is 401
    And verify response for admin login API contains text 'Email or password is incorrect.'
