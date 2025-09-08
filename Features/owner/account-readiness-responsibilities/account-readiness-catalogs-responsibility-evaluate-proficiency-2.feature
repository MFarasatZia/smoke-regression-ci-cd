Feature: Account > Readiness > Catalogs > Responsibility > Evaluate Proficiency

  @ER-3094 @ER-50 @ER-3560 @REGRESSION @RESPONSIBILITY
  Scenario: Verify that Ask for reason when you mark as not applicable
    Given that a employee is in status 'Active'
    And that user has 'Active' checkpoint with responsibility badge
    And user navigate to 'Responsibilities' page
    And user search for a responsibility
    And user reaches the 'Badge Holders' tab
    And user reaches the 'Checklist' tab
    And user reaches the 'Badge Holders' tab
    And user clicks on Issue Badge button
    And verify issue badge modal appears
    And user clicks on employee field
    And user selects employee from the list
    And user clicks on next button
    When User click on Not Applicable Icon
    Then Verify that the Reason Field For Not Applicable is Open
    And Mark As Not Applicable Button should be Disabled By Default
    And User Enter the Reason In The Field
    And User clicks on the Mark As Not Applicable Button
    And User remove the status filter
    And Row Should show as Not Applicable

  @ER-3093 @ER-3574 @REGRESSION @RESPONSIBILITY
  Scenario: Verify that Ask for reason when you mark as Failed Checkpoint
    Given that a employee is in status 'Active'
    And that user has 'Active' checkpoint with responsibility badge
    And user navigate to 'Responsibilities' page
    And user search for a responsibility
    And user reaches the 'Badge Holders' tab
    And user reaches the 'Checklist' tab
    And user reaches the 'Badge Holders' tab
    And user clicks on Issue Badge button
    And verify issue badge modal appears
    And user clicks on employee field
    And user selects employee from the list
    And user clicks on next button
    When User click on Failed Icon
    Then Verify that the Reason Model For fail is Open
    And User Confirm fail Button should be Disabled By Default
    And User Enter the Reason In The Field
    And User clicks on the fail CheckPoint Button
    And User remove the status filter
    And Row Should show as Failed

  @ER-2813 @ER-4001 @REGRESSION @RESPONSIBILITY
  Scenario:Verify that User Can Grant a Professional badge to a specific employee
    Given that a employee is in status 'Active'
    And User have a Checkpoint in status 'Active'
    And user navigate to 'Responsibilities' page
    And user search for a responsibility
    And user clicks on Issue Badge button
    And verify issue badge modal appears
    And user clicks on employee field
    And user selects employee from the list
    And user clicks on next button
    When verify Inspect Proficiency for a Responsibility page is displayed
    And user clicks on pass button
    And User See the 'Professional' Badge Appear
    And User open a Drop Down
    And User Grant Apprentice Badge
    Then Verify that User Can issues a badge to a specific employee

  @ER-3845 @ER-4080 @REGRESSION @RESPONSIBILITY
  Scenario:Verify only responsibility name is visible in Inspect Proficiency page when Responsibility has no assignments.
    Given that a employee is in status 'Active'
    And User have a Checkpoint in status 'Active'
    And user navigate to 'Responsibilities' page
    And user search for a responsibility
    When user clicks on Issue Badge button
    And verify issue badge modal appears
    And user clicks on employee field
    And user selects employee from the list
    And user clicks on next button
    Then verify Inspect Proficiency for a Responsibility page is displayed
    And user verifies only responsibility assignment is visible

  @ER-3845 @ER-4081 @REGRESSION @RESPONSIBILITY
  Scenario:Verify assignments tree is visible in Inspect Proficiency page when responsibility has assignments
    Given that a employee is in status 'Active'
    And Position is in status 'Active'
    And User have a Checkpoint in status 'Active'
    And User has Role
    And user attaches responsibility with active checkpoint to role via API
    And User attach the role to position
    When User assign the position to Employee
    And user navigate to 'Responsibilities' page
    And user search for a responsibility
    And user clicks on Issue Badge button
    And verify issue badge modal appears
    And user clicks on employee field
    And user selects employee from the list
    And user clicks on next button
    Then verify Inspect Proficiency for a Responsibility page is displayed
    And user verifies assignments tree is visible

  @ER-3572 @ER-4147 @REGRESSION @RESPONSIBILITY
  Scenario: Verify Reason text on comment icon for N/A checkpoint
    Given that a employee is in status 'Active'
    And User have a Checkpoint in status 'Active'
    And user navigate to 'Responsibilities' page
    And user search for the responsibility with checkpoint
    And user clicks on Issue Badge button
    And verify issue badge modal appears
    And user clicks on employee field
    And user selects employee from the list
    And user clicks on next button
    When User click on Not Applicable Icon
    Then User Enter the Reason In The Field
    And User clicks on the Mark As Not Applicable Button
    And User remove the status filter
    And Row Should show as Not Applicable
    And the user hovers over the message icon
    And verify Reason for Not Applicable

  @ER-3572 @ER-4148 @REGRESSION @RESPONSIBILITY
  Scenario: Verify Reason text on comment icon for failed checkpoint
    Given that a employee is in status 'Active'
    And User have a Checkpoint in status 'Active'
    And user navigate to 'Responsibilities' page
    And user search for the responsibility with checkpoint
    And user clicks on Issue Badge button
    And verify issue badge modal appears
    And user clicks on employee field
    And user selects employee from the list
    And user clicks on next button
    When User click on Failed Icon
    Then User Enter the Reason In The Field
    And User clicks on the fail CheckPoint Button
    And User remove the status filter
    And Row Should show as Failed
    And the user hovers over the message icon
    And verify Reason for Failed checkpoint

@ER-4618 @ER-4935 @ER-4621 @REGRESSION @RESPONSIBILITY
  Scenario: verify that 'Master' and 'Assignemnts' column is shown in the responsibility page
    Given that a employee is in status 'Active'
    And that a responsibility is in status 'Active'
    When user navigate to 'Responsibilities' page
    Then verify that 'Master' column is shown in the responsibility page
    And verify that 'Assignemnts' column is shown in the responsibility page
