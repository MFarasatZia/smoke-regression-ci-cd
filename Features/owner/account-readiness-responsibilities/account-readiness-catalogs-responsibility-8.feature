Feature: Account > Readiness > Catalogs > Responsibility

  @ER-417 @ER-812 @RUN12 @RESPONSIBILITY
  Scenario: Verify checkpoint disappearing from the list
    Given User has responsibility
    And user navigate to 'Responsibilities' page
    When user opens a responsibility
    And user adds a 'Apprentice' checkpoint
    And user click on action menu for Checkpoint
    Then the 'Delete' checklist option is visible
    When User select the 'Delete' action option
    Then Verify 'Delete' checkpoint pop-up should appear
    When User click on 'Delete' Button
    Then Verify checkpoint disappeared from the list

  @ER-418 @ER-820 @RUN12 @RESPONSIBILITY
  Scenario: Verify status changed to Activate to the User
    Given User has responsibility
    And user navigate to 'Responsibilities' page
    When user opens a responsibility
    And user adds a 'Apprentice' checkpoint
    And user click on action menu for Checkpoint
    Then the 'Activate' checklist option is visible
    When User select the 'Activate' action option
    Then Verify 'Activate' checkpoint pop-up should appear
    When User click on 'Activate' Button
    Then Verify checkpoint status to be 'Active'

  @ER-419 @ER-788 @RUN12 @RESPONSIBILITY
  Scenario: Verify status changed to retired to the User
    Given User have a Checkpoint in status 'Active'
    And user navigate to 'Responsibilities' page
    When user opens a checkpoint
    And user click on checklist menu
    Then the 'Retire' checklist option is visible
    When User select the 'Retire' action option
    Then Verify 'Retire' checkpoint pop-up should appear
    When User click on 'Retire' Button
    Then Verify checkpoint status to be 'Retired'

  @ER-420 @ER-794 @FIX @RESPONSIBILITY
  Scenario: Verify status changed to Activate to the User
    Given User have a Checkpoint in status 'Retired'
    And user navigate to 'Responsibilities' page
    When user opens a checkpoint
    And remove a 'Active' filter for a Checkpoint
    And remove a 'Draft' filter for a Checkpoint
    And user click on checklist menu
    And the 'Re-Activate' checklist option is visible
    Then User select the 'Re-Activate' action option
    And Verify 'Re-Activate' checkpoint pop-up should appear
    And User click on 'Re-Activate' Button
    And Verify checkpoint status to be 'Active'

  @ER-710 @ER-986 @REGRESSION @RESPONSIBILITY
  Scenario: Verify Select Checkpoint Statuses to filter by Draft
    Given the Checkpoint with different statuses
    And user navigate to 'Responsibilities' page
    When user opens a checkpoint
    Then remove a 'Active' filter for a Responsibility
    Then the user see a list of Checkpoint filtered by 'Draft'

  @ER-710 @ER-986 @REGRESSION  @RESPONSIBILITY
  Scenario: Verify Select Checkpoint Statuses to filter by Active
    Given the Checkpoint with different statuses
    And user navigate to 'Responsibilities' page
    When user opens a checkpoint
    Then remove a 'Draft' filter for a Responsibility
    Then the user see a list of Checkpoint filtered by 'Active'

  @ER-710 @ER-986 @REGRESSION @RESPONSIBILITY
  Scenario: Verify Select Checkpoint Statuses to filter by Retired
    Given the Checkpoint with different statuses
    And user navigate to 'Responsibilities' page
    When user opens a checkpoint
    And remove a 'Active' filter for a Checkpoint
    And the user apply the 'Retired' status filter for Checkpoint
    And the user see a list of Checkpoint filtered by 'Retired'

  @ER-710 @ER-987 @NeedFixing @RESPONSIBILITY
  Scenario: Verify Select Checkpoint Statuses to filter by multiple statuses
    Given the Checkpoint with different statuses
    And user navigate to 'Responsibilities' page
    When user opens a checkpoint
    Then remove a 'Active' filter for a Checkpoint
    And remove a 'Draft' filter for a Checkpoint
    And the user clicks on the Filter button
    And the user applies multiple filters like 'Inactive' and 'Draft' for Checkpoints
    And the user sees a list of Checkpoints filtered by statuses 'Inactive' and 'Draft'

  @ER-710 @ER-990 @NeedFixing @RESPONSIBILITY
  Scenario: Verify Remove Filters for Checkpoint
    Given the Checkpoint with different statuses
    And user navigate to 'Responsibilities' page
    When user opens a checkpoint
    And remove a 'Active' filter for a Checkpoint
    And remove a 'Draft' filter for a Checkpoint
    And the user clicks on the Filter button
    And the user apply the 'Retired' status filter for Checkpoint
    And remove a 'Retired' filter for a Checkpoint
    Then the user should not see the removed 'Retired' filter for checklist

  @ER-867 @ER-2686 @ER-1067 @REGRESSION @RESPONSIBILITY
  Scenario: Verify Clicking the Checkpoint Counter to Activate the Filter
    Given User has responsibility
    And user navigate to 'Responsibilities' page
    When user opens a responsibility
    And user adds a 'Coach' checkpoint
    And remove a 'Active' filter for a Checkpoint
    And Verify the checkpoint counter
    And click the 'coach' checkpoint counter selected
    Then Display the checkpoint criteria