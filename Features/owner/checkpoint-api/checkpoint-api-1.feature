@backend
Feature: Checkpoint > API

  @ER-169 @ER-4329 @ER-4655 @SMOKE-API @REGRESSION-API @CHECKPOINT-API
  Scenario: Verify the Status of CheckPoint
    Given user create a checkpoint via API
    And user return status 200 with the checkpoint_id
    When user create a microlearning video via API
    Then user delete checkpoint via API

  @ER-169 @ER-1863 @REGRESSION-API @CHECKPOINT-API
  Scenario: Verify the change checkpoint criteria
    Given user create a checkpoint via API
    When user change checkpoint criteria via API
    Then user return status 200 with the checkpoint_id

  @ER-169 @ER-1864 @NeedFixing @CHECKPOINT-API
  Scenario: Verfiy the Change checkpoint instructions
    Given user create a checkpoint via API
    When user change checkpoint instructions via API
    Then user return status 200 with the checkpoint_id

  @ER-169 @ER-1865 @REGRESSION-API @CHECKPOINT-API
  Scenario: Verify the Change checkpoint level
    Given user create a checkpoint via API
    When user change checkpoint level via API
    Then user return status 200 with the checkpoint_id

  @ER-169 @ER-1866 @SMOKE-API @REGRESSION-API @CHECKPOINT-API
  Scenario: Verify the delete checkpoint
    Given user create a checkpoint via API
    When user delete checkpoint via API
    Then user return status 200

  @ER-169 @ER-1867 @REGRESSION-API @CHECKPOINT-API
  Scenario: Verify that user Attempt to delete checkpoint not in draft
    Given user create a checkpoint via API
    And user activate checkpoint via API
    When user attempt to delete checkpoint via API
    Then user verify the error "Only draft checkpoints can be deleted."

  @ER-169 @ER-1868 @REGRESSION-API @CHECKPOINT-API
  Scenario: Verify that user Activate the  Checkpoint
    Given user create a checkpoint via API
    When user activate checkpoint via API
    Then user verify the status code  200 and status 'active'

  @ER-169 @ER-1869 @REGRESSION-API @CHECKPOINT-API
  Scenario: Verify that user Attempt to Activate when status is NOT draft
    Given user create a checkpoint via API
    And user activate checkpoint via API
    When user activate checkpoint via API
    Then user verify the error "You can only activate draft checkpoints."

  @ER-169 @ER-1870 @REGRESSION-API @CHECKPOINT-API
  Scenario: Verify that user Retire checkpoint via API
    Given user create a checkpoint via API
    And user activate checkpoint via API
    When user retire checkpoint via API
    Then user verify the status code  200 and status 'retired'

  @ER-169 @ER-1871 @REGRESSION-API @CHECKPOINT-API
  Scenario: Verify that user Attempt to retire when status is not Active
    Given user create a checkpoint via API
    When user retire checkpoint via API
    Then user verify the error "You can only retire active checkpoints."
