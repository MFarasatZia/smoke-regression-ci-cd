Feature: Account > Readiness > Catalogs > Responsibility
 
 @ER-5449 @ER-5511 @REGRESSION @RESPONSIBILITY
  Scenario: verify that AI Instructions are added in the checkpoint
    Given User have a Checkpoint in status 'Active'
    And user navigate to 'Responsibilities' page
    And user search for a responsibility
    And user reaches the 'Checklist' tab
    And user clicks on the 'Active' checkpoint
    When the user clicks on the 'AI Instructions' button
    And the user clicks on the 'Add Instructions' button
    And the user clicks on the 'Save' button
    Then verify that AI Instructions are added in the checkpoint

@ER-4995 @ER-5566 @REGRESSION @RESPONSIBILITY
  Scenario: verify that AI does not copy criteria to instructions while creating checkpoint
    Given that responsibility is in status active
    And user navigate to 'Responsibilities' page
    And user search for a responsibility
    And user reaches the 'Checklist' tab
    When User Click on Add with AI button
    And user clicks on the 'Add Checkpoints' button
    Then verify that AI does not copy criteria to instructions when creating checkpoint