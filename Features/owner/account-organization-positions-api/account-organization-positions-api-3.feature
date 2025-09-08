@backend
Feature: Positions > API

@ER-1888 @ER-1984 @REGRESSION-API @POSITION-API
  Scenario: Verify user is able to Retire Position with status equal to Inactive via API
    Given that a position is in status 'Inactive'
    When user 'Retire' the position via api
    Then user receive the error code 400
    And position api error contains msg 'Only active position can be retired'

  @ER-1905 @ER-1906 @REGRESSION @POSITION-API
  Scenario: Verify Cloning a position with attach roles via API
    Given that user have a position with 3 roles attached
    And user clone the position
    And verify that it copy position name
    And add "Clone of" in front of the name
    When user create a new cloned position
    And response has attach exactly the same roles as the original position
    Then verify that new position has a new unique id

  @ER-361 @ER-478 @REGRESSION-API @POSITION-API
  Scenario: Verify posting to position chatter
    Given that a position is in status 'Draft'
    When you post to position chatter
    Then you return response for Position status to be 201
    And the note for the position

  @ER-361 @ER-538 @REGRESSION-API @POSITION-API
  Scenario: Verify position chatter list returns maximum 10 entries
    Given that a position has 20 posts to chatter
    When user calls the chatter list API for the position
    Then verify the status for Position Chatter list to be 200
    And count of entries for the position chatter should be 10
    And count of total position chatter should be 21

  @ER-5181 @ER-179 @ER-1288 @REGRESSION-API @SMOKE-API @POSITION-API
  Scenario: Verify attach role to position API and Get Position Filter API
    Given that a position is in status 'Draft'
    And that a role is in status 'Draft'
    When user calls the role to position API
    Then verify the response for the attach role to position API is 200
    And verify the responseBody for the attach role to position API contains the attachment details
    And User call the Get Position Filter API
    And verify the responseBody for the Get Position Filter API contains the attachment details

  @ER-179 @ER-1289 @REGRESSION-API @POSITION-API
  Scenario: Verify detach role from position API
    Given that a position is in status 'Draft'
    And a role with status 'Draft' is attached to the position
    When user calls the detach API to detach a 'attached' role from a position
    Then verify the response for the detach role from position API is 200
    And verify the responseBody for the detach role from position API doesn't contain the attachment details

  @ER-179 @ER-1290 @REGRESSION-API @POSITION-API
  Scenario: Verify detaching role from position API when role is not attached results in error
    Given that a position is in status 'Draft'
    And that a role is in status 'Draft'
    When user calls the detach API to detach a 'detached' role from a position
    Then verify the response for the detach role from position API is 400
    And verify error message for detach role from position API is 'This role is not attached to this position.'

  @ER-179 @ER-1291 @REGRESSION-API @POSITION-API
  Scenario: Verify detaching role from position API when role is nonexistent results in error
    Given that a position is in status 'Draft'
    When user calls the detach API to detach a 'nonexistent' role from a position
    Then verify the response for the detach role from position API is 404
    And verify error message for detach role from position API is 'Role not found.'

  @ER-3058 @ER-3392 @REGRESSION-API @POSITION-API
  Scenario: Verify archive position API
    Given that a position is in status 'Retired'
    When user calls the archive position API
    Then verify status for archive position API to be 200
    And verify the position is archived

  @ER-3058 @ER-3393 @REGRESSION-API @POSITION-API
  Scenario: Verify archive position API returns error when position status is not retired
    Given that a position is not in status 'Retired'
    When user calls the archive position API
    Then verify status for archive position API to be 400
    And verify the error message for the archive position api to be 'You cannot archive a non-retired position.'