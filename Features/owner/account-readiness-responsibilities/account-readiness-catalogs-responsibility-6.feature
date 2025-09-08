Feature: Account > Readiness > Catalogs > Responsibility

  @ER-1088 @ER-1323 @NeedFixing @RESPONSIBILITY
  Scenario: Checklist changes are not saved after reload the page
    Given User has responsibility
    And user navigate to 'Responsibilities' page
    And user opens a responsibility
    When user adds a 'Master' checkpoint
    And remove a 'Active' filter for a Checkpoint
    Then verify newly created checkpoint is visible
    When the 'Checklist' page is reloaded
    And remove a 'Active' filter for a Checkpoint
    Then verify newly created checkpoint is visible

  @ER-701 @ER-902 @REGRESSION @RESPONSIBILITY
  Scenario: Verify Records are grouped in 'Today'
    Given User has responsibility
    And user navigate to 'Responsibilities' page
    When user opens a responsibility
    And user reaches the 'Chatter' tab
    And verify chatter records for responsibility
    Then verify chatter records are grouped in Today for responisibility

  @ER-1099 @ER-1398 @FIX @RESPONSIBILITY
  Scenario: Verify Activate option is working in Responsibility object action menu
    Given that a responsibility is in status 'Draft'
    And user navigate to 'Responsibilities' page
    And user searches for the responsibility
    And user clicks the three dot menu for the responsibility
    When user selects 'Activate' option
    And user clicks on Activate button
    Then verify the status of the responsibility is 'Active'

  @ER-1099 @ER-1400 @FIX @RESPONSIBILITY
  Scenario: Verify Retire option is working in Responsibility object action menu
    Given that a responsibility is in status 'Active'
    And user navigate to 'Responsibilities' page
    And user searches for the responsibility
    And user clicks the three dot menu for the responsibility
    When user selects 'Retire' option
    And user clicks on Retire button
    Then verify the status of the responsibility is 'Retired'

  @ER-1099 @ER-1401 @FIX @RESPONSIBILITY
  Scenario: Verify De-activate option is working in Responsibility object action menu
    Given that a responsibility is in status 'Active'
    And user navigate to 'Responsibilities' page
    And user searches for the responsibility
    And user clicks the three dot menu for the responsibility
    When user selects 'De-activate' option
    And user clicks on De-Activate button
    Then verify the status of the responsibility is 'Inactive'

  @ER-1099 @ER-1402 @FIX @RESPONSIBILITY
  Scenario: Verify Re-activate option is working in Responsibility object action menu
    Given that a responsibility is in status 'Inactive'
    And user navigate to 'Responsibilities' page
    And user searches for the responsibility
    And user clicks the three dot menu for the responsibility
    When user selects 'Re-activate' option
    And user clicks on Re-Activate button
    Then verify the status of the responsibility is 'Active'

  @ER-1099 @ER-1403 @FIX @RESPONSIBILITY
  Scenario: Verify Rename option is working in Responsibility object action menu
    Given that a responsibility is in status 'Active'
    And user navigate to 'Responsibilities' page
    And user searches for the responsibility
    And user clicks the three dot menu for the responsibility
    When user selects 'Rename' option
    Then rename responsibility pop up appears
    And user collect the new name
    And user clicks the save button in the responsibility modal
    And verify responsibility name changed in the tree

  @ER-675 @ER-942 @REGRESSION @RESPONSIBILITY
  Scenario: Verify Attachments dialog opens upon clicking on Attachments on Responsibility page
    Given that a role is in status 'Active'
    And role is attached to Responsibility
    And user navigate to 'Responsibilities' page
    And user searches for a specific responsibility
    When user clicks on Attachment component
    Then Attachments popup appears

  @ER-1074 @ER-1578 @NeedFixing @RESPONSIBILITY
  Scenario: Verify the state of the filter after refreshing the page in checklist page
    Given User has responsibility
    And user navigate to 'Responsibilities' page
    And user opens a responsibility
    When user adds a 'Master' checkpoint
    And remove a 'Active' filter for a Checkpoint
    And the user clicks on the Filter button
    And the user apply the 'Retired' status filter for Checkpoint
    Then verify the added 'Retired' filter for checklist is visible after reloading

  @ER-1074 @ER-1579 @NeedFixing @RESPONSIBILITY
  Scenario: Verify the state of the filter after navigating away from the page in checklist page
    Given User has responsibility
    And user navigate to 'Responsibilities' page
    And user opens a responsibility
    When user adds a 'Master' checkpoint
    And remove a 'Active' filter for a Checkpoint
    And the user clicks on the Filter button
    And the user apply the 'Retired' status filter for Checkpoint
    And user reaches the 'Chatter' tab
    And user reaches the 'Checklist' tab
    Then verify the added 'Retired' filter for checklist is visible