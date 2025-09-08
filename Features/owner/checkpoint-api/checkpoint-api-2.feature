@backend
Feature: Checkpoint > API

  @ER-169 @ER-1872 @REGRESSION-API @CHECKPOINT-API
  Scenario: Verify that user Re-activate checkpoint
    Given user create a checkpoint via API
    And user activate checkpoint via API
    When user retire checkpoint via API
    And user reactivate checkpoint via API
    Then user verify the status code  200 and status 'active'

  @ER-169 @ER-1873 @REGRESSION-API @CHECKPOINT-API
  Scenario: Verify that user Attempt to reactivate when status is not retired
    Given user create a checkpoint via API
    When user reactivate checkpoint via API
    Then user verify the error "You can only reactivate retired checkpoints."

  @ER-169 @ER-1864 @REGRESSION-API @CHECKPOINT-API
  Scenario: Verify that user Change sequence to different level
    Given user create a checkpoint via API
    And User have a Checkpoint in status 'Active'
    When user change checkpoint sequence to a level below the previous one
    Then user verify the error "Cannot move to a different level"

  @ER-1420 @ER-1859 @REGRESSION-API @CHECKPOINT-API
  Scenario: Verify the Endpoint for chatter drawer in Responsibility> Checklist
    Given User have a Checkpoint in status 'Active'
    Then Verify the Endpoint for chatter drawer in Responsibility> Checklist

  @ER-1427 @ER-1857 @REGRESSION-API @CHECKPOINT-API
  Scenario: Checkpoint with no Evaluation
    Given User has a Employee
    And User have a Checkpoint in status 'draft'
    When user activate checkpoint via API
    Then user list all checkpoint

  @ER-1427 @ER-1856 @REGRESSION-API @CHECKPOINT-API
  Scenario: Checkpoint with no Evaluation
    Given User has a Employee
    And User have a Checkpoint in status 'draft'
    When user activate checkpoint via API
    Then user activate checkpoint via API
    And user verify the error "You can only activate draft checkpoints."

  @ER-4101 @ER-4159 @REGRESSION-API @CHECKPOINT-API
  Scenario: Verify updated_by field in list of active checkpoints API
    Given that a employee is in status 'Active'
    And User have a Checkpoint in status 'Active'
    When user list all checkpoint
    Then verify updated_by field is not null

  @ER-4346 @ER-4443 @REGRESSION-API @CHECKPOINT-API
  Scenario: Verify checkpoint is moved to new responsibility by API
    Given User have a Checkpoint in status 'Active'
    And User creates another responsibility in status 'Active'
    When user calls the move checkpoint API
    Then verify the checkpoint is moved to the new responsibility

  @ER-5537 @ER-5642 @REGRESSION-API @CHECKPOINT-API 
  Scenario: Search checkpoints by criteria and description
    Given user create a checkpoint via API with criteria "Advanced JavaScript testing" and instructions "Implement comprehensive unit tests for JavaScript functions"
    When user calls get checkpoints endpoint with search parameter "JavaScript"
    Then verify all checkpoints contains "JavaScript" are returned
    When user calls get checkpoints endpoint with search parameter "testing"
    Then verify all checkpoints contains "testing" are returned
    And there are various checkpoints
    When user calls get checkpoints endpoint with combined filters
    Then verify all checkpoints match combined criteria

  @ER-5537 @ER-5643 @REGRESSION-API @CHECKPOINT-API 
  Scenario: Filter checkpoints by multiple status values
    Given checkpoints with different statuses
    When user calls get checkpoints endpoint with status filter "active"
    Then verify all checkpoints have status "active"
    When user calls get checkpoints endpoint with status filter "draft"
    Then verify all checkpoints have status "draft"
    When user calls get checkpoints endpoint with status filter "retired"
    Then verify all checkpoints have status "retired"

  @ER-5537 @ER-5645 @REGRESSION-API @CHECKPOINT-API 
  Scenario: Filter checkpoints by multiple proficiency levels
    Given checkpoints with different proficiency levels
    When user calls get checkpoints endpoint with proficiency level filter "apprentice"
    Then verify all checkpoints have proficiency level "apprentice"
    When user calls get checkpoints endpoint with proficiency level filter "coach"
    Then verify all checkpoints have proficiency level "coach"
    When user calls get checkpoints endpoint with proficiency level filter "professional"
    Then verify all checkpoints have proficiency level "professional"
    When user calls get checkpoints endpoint with proficiency level filter "master"
    Then verify all checkpoints have proficiency level "master"
    
