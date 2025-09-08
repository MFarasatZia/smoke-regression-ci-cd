@backend
Feature: Responsibilities > API

  @ER-89 @ER-400 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify De-activating the Responsibility that is not in status Active
    Given that a responsibility is not in status 'Active'
    When user 'De-activate' the Responsibility via API
    Then verify the responsibility status to be 400
    And response should be 'Only active responsibility can be deactivated'

  @ER-85 @ER-311 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify Delete Responsibility that is not in status draft via API
    Given that a responsibility is not in status 'Draft'
    When user 'Delete' the Responsibility via API
    Then verify the responsibility status to be 400
    And response should be 'Only draft roles can be deleted'

  @ER-85 @ER-311 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify Delete Responsibility that is attached via API
    Given that a responsibility is in status 'Draft'
    And attached to the Role
    When user 'delete' the Responsibility via API
    Then verify the responsibility status to be 400
    And response should be 'You cannot delete an organization object that is attached to other objects'

  @ER-85 @ER-311 @REGRESSION-API @SMOKE-API @RESPONSIBILITY-API
  Scenario: Delete Responsibility is in status draft and not attached via API
    Given that a responsibility is in status 'Draft'
    And user 'Delete' the Responsibility via API
    Then verify the responsibility status to be 204
    And verify responsibility was deleted from the database

  @ER-361 @REGRESSION-API @COMPLETED @RESPONSIBILITY-API
  Scenario: Verify posting to responsibility chatter
    Given that a responsibility is in status 'Draft'
    When you post to responsibility chatter
    Then you return response for Responsibility status to be 201
    And the note for responsibility

  @ER-361 @NeedFixing @COMPLETED @RESPONSIBILITY-API
  Scenario: Verify responsibility chatter list returns maximum 10 entries
    Given that a responsibility has 20 posts to chatter
    When user calls the chatter list API for the responsibility
    Then verify the status for Responsibility Chatter list to be 200
    And count of entries for the responsibility chatter should be 10
    And count of total responsibility chatter should be 21

  @ER-2907 @ER-3113 @ER-3012 @REGRESSION-API @SMOKE-API @RESPONSIBILITY-API
  Scenario: Verify checkpoints counter has value in the Responsibility endpoint
    Given that a responsibility is in status 'Active'
    And user calls an Checkpoint API
    And user call the activate checkpoint API
    When user calls the get responsibility api
    Then verify checklist counter has value in response
    And verify active checkpoint count has value in response
    And verify active checkpoint count is 1
    And verify draft checkpoint count is 0
    And verify retired checkpoint count is 0
    And verify checkpoint status counts are visible in response
    And Verify Add Checkpoint Counts by Level for Responsibilities

  @ER-2907 @ER-3019 @REGRESSION-API @SMOKE-API @RESPONSIBILITY-API
  Scenario: Verify checkpoints counter is visible in the Responsibility endpoint
    Given that a responsibility is in status 'Active'
    When user calls the get responsibility api
    Then verify checklist counter is visible in response
    And verify when_forced_expiration_days_default varaible is visible in response
    And verify does_not_expire_default varaible is visible in response
    And verify when_granted_expiration_days_default varaible is visible in response
    And verify expire_only_if_obsolete_default varaible is visible in response

  @ER-18 @ER-810 @REGRESSION @RESPONSIBILITY-API
  Scenario: Verify Deleting a badge via API
    Given that an employee has a current badge for a specific responsibility
    When user delete the badge via API
    Then badge should be removed successfully

  @ER-57 @ER-813 @REGRESSION @RESPONSIBILITY-API
  Scenario: Verify Removing a badge via API
    Given that an employee has a current badge for a specific responsibility
    When user call the remove badge API
    Then response should return status 200 along with the reason
    And respose should include method is equal to Forced
