@backend
Feature: Account > Settings > Users > API

  @ER-81 @REGRESSION-API @COMPLETED @SETTINGS-USER-API
  Scenario: Create owner for an account
    Given you attempt to create a user that is owner of an account
    And the current user is sysadmin
    Then you return user id when sucessfull
    And you send invite to join the account

  @ER-361 @REGRESSION-API @SETTINGS-USER-API
  Scenario: Verify user chatter list returns maximum 10 entries
    Given that a user has 20 posts to chatter
    When user calls the chatter list API for the user
    Then verify the status for User Chatter list to be 200
    And count of entries for the user chatter should be 10
    And count of total user chatter should be 21

  @ER-411 @ER-485 @SMOKE-API @SETTINGS-USER-API
  Scenario: Verify Renaming and Deleting a user via API
    Given the user is 'Created' with API
    And Verify the response status for user to be 201
    When the user is 'Renamed' with API
    Then Verify the response status for user to be 200
    And Verify that the user name is updated
    When  the user is 'Deleted' with API
    Then Verify the response status for user to be 204
    And Verify the user is deleted

  @ER-13 @ER-640 @REGRESSION-API @SETTINGS-USER-API
  Scenario: Verify availability of email When user exists but has no access
    When user exists but has no access in the system and you call the check-access API
    Then response return access is equal to null
  
   @ER-2988 @ER-3816 @REGRESSION-API  @SETTINGS-USER-API
  Scenario:Verfiy the Currency from the User Account Response
    When the user account is created with API
    Then User Call the Get User Account API
    And the user account currency should be verified
  
    @ER-4562 @ER-5011 @REGRESSION-API @SETTINGS-USER-API
  Scenario: User Notification System: Creating and Receiving Push Notifications
    Given the user is 'Created' with API
    And the user account is created with API
    When User call the create notification API
    Then User verify the message "'Success, notification pushed successfully set'"
    And User call the create push notification API
    And User verify the message "'Success, notification pushed successfully set'"