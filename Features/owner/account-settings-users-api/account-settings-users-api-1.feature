@backend
Feature: Account > Settings > Users > API


  @ER-888 @ER-2410 @REGRESSION-API @SETTINGS-USER-API
  Scenario: Verify slack URL and details are displayed for user
    When that user call api to list all user for an Account
    Then verify the slack related resources are displayed

  @ER-888 @ER-2511 @REGRESSION-API @SETTINGS-USER-API
  Scenario: Verify disable slack API
    When that user calls the disable slack API
    Then Verify the response status for disable slack API to be 200
    And Verify slack notifications are disabled

  @ER-1482 @ER-2544 @REGRESSION-API @SETTINGS-USER-API
  Scenario: Verify changing user access API with new user
    Given user is in state 'Invited' and is co-owner
    And verify user has access in the account 3
    When user calls the change user access API for a 'New user'
    Then verify the response for the change user access API to be 200
    And verify user has access in the account 3
    And verify a invitation is received for the user

  @ER-1482 @ER-2545 @REGRESSION-API @SETTINGS-USER-API
  Scenario: Verify changing user access API with existing user
    Given user is in state 'Invited' and is co-owner of account with id 2
    And verify user has access in the account 2
    And user is in state 'Invited' and is co-owner
    And verify user has access in the account 3
    When user calls the change user access API for a 'Existing user'
    Then verify the response for the change user access API to be 200
    And verify user has access in the account 3
    And verify user has access in the account 2

  @ER-1482 @ER-2588 @REGRESSION-API @SETTINGS-USER-API
  Scenario: Verify access cannot be changed with user that already has access in account
    Given user is in state 'Invited' and is co-owner
    And verify user has access in the account 3
    When user calls the change user access API for a 'Account user'
    Then verify the response for the change user access API to be 400
    And verify the error message for the change user access API is 'User already has access to that account.'
  
  @READ-678 @REGRESSION-API @ER-1311 @ER-2027 @SETTINGS-USER-API
  Scenario: Do not allow owner to be suspended via API
    Given user have a user with owner permission in an account
    And user Has Permission in that account
    When user try to suspend the user
    Then user get error "Owner cannot be suspended"

  @ER-2028 @REGRESSION-API @SETTINGS-USER-API
  Scenario: Resend invitation to the user
    Given that a user is in state "invited"
    When user resend invitation via API
    And verify first_invited_on field has value in response
    And verify last_invited_at field has value in response
    And verify response that resending an invite should only update the last_invited_at timestamp
    Then verify response is 200

  @ER-143 @SMOKE-API @ER-2029 @ER-3745 @SETTINGS-USER-API
  Scenario: List all user in Account
    Given that user call api to list all user for an Account
    Then user in that specific account is listed

  @ER-143 @SMOKE-API @ER-2030 @SETTINGS-USER-API
  Scenario: List all user in the system
    Given that user call api to list all user for a particular system
    Then all users should be listed

  @ER-16 @ER-81 @REGRESSION-API @COMPLETED @SETTINGS-USER-API
  Scenario: Create system administrator
    Given you attempt to create a sysadmin
    And SysAdmin is True
    And return user_id when succesfull
    And user is in status invited