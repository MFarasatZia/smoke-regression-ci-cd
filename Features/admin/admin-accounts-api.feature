@backend
Feature: Admin > Accounts > API

  @ER-1177 @REGRESSION-API @ADMIN-ACCOUNTS-API
  Scenario: Verify normal users cannot create accounts
    When user that is not super user calls the create account API
    Then verify the response for the create account API is 403
    And verify error message for the create account API is 'You do not have permission to perform this action.'

  @ER-104 @ER-3452 @ER-2303 @ER-1179 @REGRESSION-API @SMOKE-API @ADMIN-ACCOUNTS-API
  Scenario: Verify create account API and Counts for Active Accounts
    Given super user calls the create account API
    And user should receive the account creation response
    And verify the response for the create account API is 201
    And verify the status of the account is 'Draft'
    When User Call the Admin count list API
    Then User verifies the active accounts count is valid
 
  @ER-104 @ER-1180 @ER-4205 @REGRESSION-API @SMOKE-API @ADMIN-ACCOUNTS-API
  Scenario: Verfiy Add account directories settings to account API
     Given that a account is in status 'Draft'
     When user calls the rename account API
     And user calls the update account API
     Then verify the response for the create account API is 200
     And Verify that the account is updated successfully
     And verify the account is renamed

  @ER-104 @ER-1183 @REGRESSION-API @SMOKE-API @ADMIN-ACCOUNTS-API
  Scenario: Verify account is in status pending when user doesn't accept invitation
    Given that a account is in status 'Draft'
    When user call the open account API with 'Nonexisting user'
    And verify the response for the open account API is 200
    Then verify the user is the owner of the account
    And verify the status of the account is 'Pending'

  @ER-104 @ER-1771 @REGRESSION-API @SMOKE-API @ADMIN-ACCOUNTS-API
  Scenario: Verify open account API when user doesn't exist
    Given that a account is in status 'Draft'
    When user call the open account API with 'Nonexisting user'
    Then verify the response for the open account API is 200
    And verify the status of the account is 'Pending'
    When user calls the reset password API using 'Email created via invite from account creation'
    And user calls the signup API using 'Valid credentials'
    Then verify response for signup API call is 200
    And verify user state is 'Operational'
    When user calls the get account API
    Then verify the account status is 'Open'

  @ER-104 @ER-1183 @REGRESSION-API @SMOKE-API @ADMIN-ACCOUNTS-API
  Scenario: Verify making account draft when invited owner is canceled
    Given that a account is in status 'Draft'
    When user call the open account API with 'Nonexisting user'
    Then verify the response for the open account API is 200
    And verify the status of the account is 'Pending'
    When user calls the cancel invite API
    And user calls the get account API
    Then verify the status of the account is 'Draft'

  @ER-104 @ER-1184 @REGRESSION-API @ADMIN-ACCOUNTS-API
  Scenario: Verify accounts in status Open cannot be opened
    Given that a account is in status 'open for existing user'
    When user call the open account API with 'Nonexisting user'
    Then verify the response for the open account API is 400
    And verify error message for the open account API is 'Only draft accounts can be opened.'

  @ER-104 @ER-1185 @REGRESSION-API @COMPLETED @ADMIN-ACCOUNTS-API
  Scenario: Verify accounts in status Closed cannot be opened
    Given that a account is in status 'Closed'
    When user call the open account API with 'Nonexisting user'
    Then verify the response for the open account API is 400
    And verify error message for the open account API is 'Only draft accounts can be opened.'

  @ER-104 @ER-1186 @REGRESSION-API @SMOKE-API @ADMIN-ACCOUNTS-API
  Scenario: Verify open account API when user exists
    Given that a account is in status 'Draft'
    When user call the open account API with 'existing user'
    Then verify the response for the open account API is 200
    And verify the user is the owner of the account

  @ER-104 @ER-1188 @REGRESSION-API @SMOKE-API @ADMIN-ACCOUNTS-API
  Scenario: Verify suspend account API
    Given that a account is in status 'open for existing user'
    When user call the suspend account API reason 'Trial expired'
    Then verify the response for the suspend account API is 200
    And verify the status of the account is 'Suspended'

  @ER-104 @ER-1189 @REGRESSION-API @ADMIN-ACCOUNTS-API
  Scenario: Verify accounts in status Draft cannot be suspended
    Given that a account is in status 'Draft'
    When user call the suspend account API reason 'Trial expired'
    Then verify the response for the suspend account API is 400
    And verify error message for the suspend account API is 'Only opened accounts can be suspended.'

  @ER-104 @ER-1190 @REGRESSION-API @ADMIN-ACCOUNTS-API
  Scenario: Verify accounts in status Closed cannot be suspended
    Given that a account is in status 'Closed'
    When user call the suspend account API reason 'Trial expired'
    Then verify the response for the suspend account API is 400
    And verify error message for the suspend account API is 'Only opened accounts can be suspended.'

  @ER-104 @ER-1191 @REGRESSION-API @ADMIN-ACCOUNTS-API
  Scenario: Verify accounts in status Suspended cannot be suspended
    Given that a account is in status 'Suspended'
    When user call the suspend account API reason 'Trial expired'
    Then verify the response for the suspend account API is 400
    And verify error message for the suspend account API is 'Only opened accounts can be suspended.'

  @ER-751 @ER-1078 @REGRESSION-API @ADMIN-ACCOUNTS-API
  Scenario: Verify account close API
    Given that a account is in status 'open for existing user'
    When user calls the close account API
    Then verify the response for the close account API is 200
    And verify the account is in status 'Closed'

  @ER-751 @ER-1079 @REGRESSION-API @ADMIN-ACCOUNTS-API
  Scenario: Verify accounts in status Draft cannot be closed
    Given that a account is in status 'Draft'
    When user calls the close account API
    Then verify the response for the close account API is 400
    And verify the error message for the close account API is 'Can only close open accounts.'

  @ER-751 @ER-1080 @REGRESSION-API @ADMIN-ACCOUNTS-API
  Scenario: Verify accounts in status Closed cannot be closed
    Given that a account is in status 'Closed'
    When user calls the close account API
    Then verify the response for the close account API is 400
    And verify the error message for the close account API is 'Can only close open accounts.'

  @ER-751 @ER-1081 @ER-1269 @REGRESSION-API @SMOKE-API @ADMIN-ACCOUNTS-API
  Scenario: Verify change owner API
    Given that a account is in status 'open for existing user'
    When user calls the change owner API using 'Existing email address'
    Then verify the response for the change owner API is 200
    And verify the owner fields contains the updated value

  @ER-751 @ER-1082 @REGRESSION-API @ADMIN-ACCOUNTS-API
  Scenario: Verify owner cannot be changed when user email address does not exist
    Given that a account is in status 'open for existing user'
    When user calls the change owner API using 'Nonexistent email address'
    Then verify the response for the change owner API is 400
    And verify the error message for the change owner API is 'User does not exist.'

  @ER-751 @ER-1083 @REGRESSION-API @ADMIN-ACCOUNTS-API
  Scenario: Verify delete account API
    Given that a account is in status 'Draft'
    When user calls the delete account API
    Then verify the response for the delete account API is 204

  @ER-751 @ER-1084 @REGRESSION-API @ADMIN-ACCOUNTS-API
  Scenario: Verify account in status Open cannot be deleted
    Given that a account is in status 'open for existing user'
    When user calls the delete account API
    Then verify the response for the delete account API is 400
    And verify the error message for the delete account API is 'Only draft accounts can be deleted.'

  @ER-751 @ER-1085 @REGRESSION-API @ADMIN-ACCOUNTS-API
  Scenario: Verify account in status Closed cannot be deleted
    Given that a account is in status 'Closed'
    When user calls the delete account API
    Then verify the response for the delete account API is 400
    And verify the error message for the delete account API is 'Only draft accounts can be deleted.'

  @ER-2368 @ER-2519 @REGRESSION-API @SMOKE-API @ADMIN-ACCOUNTS-API
  Scenario: Verify owner details are not persisted when canceling invite for user
    Given that a account is in status 'Draft'
    And user call the open account API with 'Nonexisting user'
    Then verify the response for the open account API is 200
    And verify the user is the owner of the account
    And verify the status of the account is 'Pending'
    When user calls the 'Cancel invite' API for the user invited to open the account
    And user calls the get account API
    Then verify the status of the account is 'Draft'
    And verify the owner details are not persisted

  @ER-2368 @ER-2520 @REGRESSION-API @SMOKE-API @ADMIN-ACCOUNTS-API
  Scenario: Verify owner details are not persisted when deleting user
    Given that a account is in status 'Draft'
    And user call the open account API with 'Nonexisting user'
    Then verify the response for the open account API is 200
    And verify the user is the owner of the account
    And verify the status of the account is 'Pending'
    When user calls the 'Delete' API for the user invited to open the account
    And user calls the get account API
    Then verify the status of the account is 'Draft'
    And verify the owner details are not persisted

  @ER-2482 @ER-2919 @REGRESSION-API @ADMIN-ACCOUNTS-API
  Scenario: Verify get token API response is 200 and is returning token
    Given that a account is in status 'Draft'
    And user call the open account API with 'Nonexisting user'
    And verify the response for the open account API is 200
    And verify the user is the owner of the account
    And verify the status of the account is 'Pending'
    When user calls the get token API
    Then verify the API response is 200
    And verify the response has token

  @ER-2482 @ER-2920 @REGRESSION-API @ADMIN-ACCOUNTS-API
  Scenario: Verify SignUp Api response and user is able to signup with newly created account
    Given that a account is in status 'Draft'
    And user call the open account API with 'Nonexisting user'
    And verify the response for the open account API is 200
    And verify the user is the owner of the account
    And verify the status of the account is 'Pending'
    When user calls the get token API
    Then verify the API response is 200
    And verify the response has token
    And user calls the signup api
    And verify signup api response is 200
    And verify account state is operational

  @ER-2936 @ER-3247 @REGRESSION-API @ADMIN-ACCOUNTS-API @COMPLETED
  Scenario: Verify user can change account ownership to a co-owner in state 'Operational'
    Given that a account is in status 'open for existing user'
    And a 'co-owner' in state 'Operational' exists in the account
    When user calls the change ownership API
    Then verify the response for change ownership API is 200
    And verify the owner details are updated
    And verify the account status to be 'Open'

  @ER-2936 @ER-3248 @REGRESSION-API @ADMIN-ACCOUNTS-API @COMPLETED
  Scenario: Verify user can change account ownership to a co-owner in state 'Invited'
    Given that a account is in status 'open for existing user'
    And a 'co-owner' in state 'Invited' exists in the account
    When user calls the change ownership API
    Then verify the response for change ownership API is 200
    And verify the owner details are updated
    And verify the account status to be 'Pending'

  @ER-2936 @ER-3249 @REGRESSION-API @ADMIN-ACCOUNTS-API @COMPLETED
  Scenario: Verify user can change account ownership to a apps-user in state 'Operational'
    Given that a account is in status 'open for existing user'
    And a 'apps-user' in state 'Operational' exists in the account
    When user calls the change ownership API
    Then verify the response for change ownership API is 200
    And verify the owner details are updated
    And verify the account status to be 'Open'

  @ER-2936 @ER-3250 @REGRESSION-API @ADMIN-ACCOUNTS-API @COMPLETED
  Scenario: Verify user can change account ownership to a apps-user in state 'Invited'
    Given that a account is in status 'open for existing user'
    And a 'apps-user' in state 'Invited' exists in the account
    When user calls the change ownership API
    Then verify the response for change ownership API is 200
    And verify the owner details are updated
    And verify the account status to be 'Pending'