@backend
Feature: Admins > Users > API

  @ER-664 @ER-1373 @REGRESSION-API @SMOKE-API @ADMIN-USERS-API
  Scenario: Verify reset password API
    Given that a 'Super user' is in state 'Invited'
    When user calls the reset password API using 'Valid format email'
    Then verify response for reset password API call is 200
    And verify the reset password API sends a token in the email

  @ER-664 @ER-1374 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify reset password API returns 200 even though user doesn't exist
    When user calls the reset password API using 'Valid format email'
    Then verify response for reset password API call is 200

  @ER-664 @ER-1375 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify reset password API returns error when email is not valid
    Given that a 'Super user' is in state 'Invited'
    When user calls the reset password API using 'Invalid format email'
    Then verify response for reset password API call is 400
    And verify the error message for the reset password API contains text 'Email is not a valid email'

  @ER-455 @ER-973 @REGRESSION-API @SMOKE-API @ADMIN-USERS-API
  Scenario: Verify user signup API
    Given that a 'Super user' is in state 'Invited'
    And user calls the reset password API using 'Valid format email'
    When user calls the signup API using 'Valid credentials'
    Then verify response for signup API call is 200
    And verify user state is 'Operational'

  @ER-455 @ER-974 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify user signup API returns error when user is in state Operational
    Given that a 'Super user' is in state 'Operational'
    And user calls the reset password API using 'Valid format email'
    When user calls the signup API using 'Valid credentials'
    Then verify response for signup API call is 400
    And verify error message for the user signup API contains text 'Only invited user can sign up'

  @ER-455 @ER-975 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify user signup return error when passwords do not match
    Given that a 'Super user' is in state 'Invited'
    When user calls the signup API using 'Mismatched passwords'
    Then verify response for signup API call is 400
    And verify error message for the user signup API contains text 'Passwords do not match.'

  @ER-455 @ER-976 @REGRESSION-API @SMOKE-API @ADMIN-USERS-API
  Scenario: Verify resend invite API
    Given that a 'Super user' is in state 'Invited'
    When user calls the resend invite API
    Then verify response for resend invite API call is 200

  @ER-455 @ER-977 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify resend invite returns error when user is in state Operational
    Given that a 'Super user' is in state 'Operational'
    When user calls the resend invite API
    Then verify response for resend invite API call is 400

  @ER-455 @ER-978 @FIX @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify resend invite returns error when user is in state Blocked
    Given that a 'Super user' is in state 'Blocked'
    When user calls the resend invite API
    Then verify response for resend invite API call is 400

  @ER-455 @ER-979 @FIX @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify resend invite returns error when user is in state Closed
    Given that a 'Super user' is in state 'Closed'
    When user calls the resend invite API
    Then verify response for resend invite API call is 400

  @ER-455 @ER-1017 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify cancel invite API
    Given that a 'Super user' is in state 'Invited'
    When user calls the cancel invite API
    Then verify response for cancel invite API call is 204
    And verify user is deleted from the DB

  @ER-455 @ER-1018 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify cancel invite API cannot be called for users in state Operational
    Given that a 'Super user' is in state 'Operational'
    When user calls the cancel invite API
    Then verify response for cancel invite API call is 400
    And verify response for cancel invite API contains text "You can only cancel invites of invited users."

  @ER-455 @ER-1019 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify cancel invite API cannot be called for users in state Closed
    Given that a 'Super user' is in state 'Closed'
    When user calls the cancel invite API
    Then verify response for cancel invite API call is 400
    And verify response for cancel invite API contains text "You can only cancel invites of invited users."

  @ER-455 @ER-1020 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify cancel invite API cannot be called for users in state Blocked
    Given that a 'Super user' is in state 'Blocked'
    When user calls the cancel invite API
    Then verify response for cancel invite API call is 400
    And verify response for cancel invite API contains text "You can only cancel invites of invited users."

  @ER-455 @ER-1021 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify user block API
    Given that a 'Super user' is in state 'Operational'
    When user calls the user block API
    Then verify response for user block API is 200

  @ER-455 @ER-1022 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify user in state Invited cannot be blocked
    Given that a 'Super user' is in state 'Invited'
    When user calls the user block API
    Then verify response for user block API is 400
    And verify response for user block API contains text "Cannot block non-operational user."

  @ER-455 @ER-1023 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify user in state Blocked cannot be blocked
    Given that a 'Super user' is in state 'Blocked'
    When user calls the user block API
    Then verify response for user block API is 400
    And verify response for user block API contains text "Cannot block non-operational user."

  @ER-455 @ER-1024 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify user in state Closed cannot be blocked
    Given that a 'Super user' is in state 'Closed'
    When user calls the user block API
    Then verify response for user block API is 400
    And verify response for user block API contains text "Cannot block non-operational user."

  @ER-455 @ER-1025 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify user that is owner of a account cannot be blocked
    Given that a 'Super user' is in state 'Operational'
    And that super a user is owner of a account
    When user calls the user block API
    Then verify response for user block API is 400
    And verify response for user block API contains text "You cannot block an owner. Ownership of the acccount must be transfered first."

  @ER-455 @ER-1026 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify user close API
    Given that a 'Super user' is in state 'Operational'
    When user calls the user close API
    Then verify response for user close API is 200

  @ER-455 @ER-1027 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify user in state Invited cannot be closed
    Given that a 'Super user' is in state 'Invited'
    When user calls the user close API
    Then verify response for user close API is 400
    And verify response for user close API contains text "Cannot close non-operational user."

  @ER-455 @ER-1028 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify user in state Blocked cannot be closed
    Given that a 'Super user' is in state 'Blocked'
    When user calls the user close API
    Then verify response for user close API is 400
    And verify response for user close API contains text "Cannot close non-operational user."

  @ER-455 @ER-1029 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify user in state Closed cannot be closed
    Given that a 'Super user' is in state 'Closed'
    When user calls the user close API
    Then verify response for user close API is 400
    And verify response for user close API contains text "Cannot close non-operational user."

  @ER-455 @ER-1030 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify user that is owner of a account cannot be closed
    Given that a 'Super user' is in state 'Operational'
    And that super a user is owner of a account
    When user calls the user close API
    Then verify response for user close API is 400
    And verify response for user close API contains text "You cannot close an owner. Ownership of the acccount must be transfered first."

  @ER-455 @ER-1031 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify user unblock API
    Given that a 'Super user' is in state 'Blocked'
    When user calls the user unblock API
    Then verify response for user unblock API is 200

  @ER-455 @ER-1032 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify user in state Invited cannot be unblocked
    Given that a 'Super user' is in state 'Invited'
    When user calls the user unblock API
    Then verify response for user unblock API is 400
    And verify response for user unblock API contains text "Only blocked user can be unblocked."

  @ER-455 @ER-1033 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify user in state Closed cannot be unblocked
    Given that a 'Super user' is in state 'Closed'
    When user calls the user unblock API
    Then verify response for user unblock API is 400
    And verify response for user unblock API contains text "Only blocked user can be unblocked."

  @ER-455 @ER-1034 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify user in state Operational cannot be unblocked
    Given that a 'Super user' is in state 'Operational'
    When user calls the user unblock API
    Then verify response for user unblock API is 400
    And verify response for user unblock API contains text "Only blocked user can be unblocked."

  @ER-455 @ER-1035 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify user unclose API
    Given that a 'Super user' is in state 'Closed'
    When user calls the user unclose API
    Then verify response for user unclose API is 200

  @ER-455 @ER-1036 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify user in state Invited cannot be unclosed
    Given that a 'Super user' is in state 'Invited'
    When user calls the user unclose API
    Then verify response for user unclose API is 400
    And verify response for user unclose API contains text "Only closed user can be unclosed."

  @ER-455 @ER-1037 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify user in state Blocked cannot be unclosed
    Given that a 'Super user' is in state 'Blocked'
    When user calls the user unclose API
    Then verify response for user unclose API is 400
    And verify response for user unclose API contains text "Only closed user can be unclosed."

  @ER-455 @ER-1038 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify user in state Operational cannot be unclosed
    Given that a 'Super user' is in state 'Operational'
    When user calls the user unclose API
    Then verify response for user unclose API is 400
    And verify response for user unclose API contains text "Only closed user can be unclosed."

  @ER-455 @ER-1039 @REGRESSION-API @ADMIN-USERS-API
  Scenario: Verify user suspend API
    Given that a 'Super user' is in state 'Operational'
    When user calls the user suspend API for 'Non-owner'
    Then verify response for user suspend API is 200

  @ER-455 @ER-1040 @REGRESSION-API @COMPLETED @ADMIN-USERS-API
  Scenario: Verify user suspend API returns error when trying to suspend owner of account
    Given that a account is in status 'open for existing user'
    When user calls the user suspend API for 'Owner'
    Then verify response for user suspend API is 400
    And verify response for user suspend API contains text 'Owner cannot be suspended.'

  @ER-1197 @ER-2303 @ER-1243 @REGRESSION-API @ADMIN-USERS-API
  Scenario:Verify the Admin Portal Endpoint to Return Counts for active user 
    Given the user is 'Created' with API
    And verify response for create user API is 201
    And user status is 'invited'
    When User Call the Admin count list API
    Then User verifies the active users count is valid

  @ER-1883 @ER-2095 @REGRESSION
  Scenario: Verify test email API returns Invited state
    Given that a 'Super user' is in state 'Invited'
    When user calls the test email API
    Then verify the test email returns state 'Invited'

  @ER-1883 @ER-2096 @REGRESSION
  Scenario: Verify test email API returns Operational state
    Given that a 'Super user' is in state 'Operational'
    When user calls the test email API
    Then verify the test email returns state 'Operational'

  @ER-1883 @ER-2097 @REGRESSION
  Scenario: Verify test email API returns Closed state
    Given that a 'Super user' is in state 'Closed'
    When user calls the test email API
    Then verify the test email returns state 'Closed'

  @ER-1883 @ER-2098 @REGRESSION
  Scenario: Verify test email API returns Blocked state
    Given that a 'Super user' is in state 'Blocked'
    When user calls the test email API
    Then verify the test email returns state 'Blocked'

  @ER-1627 @ER-2351 @REGRESSION @USER-API
  Scenario: Verify Renaming a user via API on Admin Portal
    Given that a 'Super user' is in state 'Invited'
    When user used rename account API calls
    Then response status for user to be 200
    And user name is updated

  @ER-2829 @ER-3013 @REGRESSION
  Scenario: Verify setting super_admin_editing for apps users
    Given that a 'Apps-user' is in state 'Operational'
    And user calls the get user API
    And verify the response for get user API contains super_admin_editing set as false
    When user calls the patch user API to change super_admin_editing to true
    Then verify the response for patch user API is 200
    And verify the response for patch user API contains super_admin_editing set as true

  @ER-2829 @ER-3014 @REGRESSION
  Scenario: Verify setting super_admin_editing for co-owner users
    Given that a 'Co-owner' is in state 'Operational'
    And user calls the get user API
    And verify the response for get user API contains super_admin_editing set as false
    When user calls the patch user API to change super_admin_editing to true
    Then verify the response for patch user API is 200
    And verify the response for patch user API contains super_admin_editing set as true

  @ER-2829 @ER-3015 @REGRESSION
  Scenario: Verify setting super_admin_editing for super users
    Given that a 'Super user' is in state 'Operational'
    And user calls the get user API
    And verify the response for get user API contains super_admin_editing set as false
    When user calls the patch user API to change super_admin_editing to true
    Then verify the response for patch user API is 200
    And verify the response for patch user API contains super_admin_editing set as true