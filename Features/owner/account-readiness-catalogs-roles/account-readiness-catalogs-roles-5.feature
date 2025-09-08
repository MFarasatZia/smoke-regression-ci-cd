Feature: Account > Readiness > Catalogs > Roles

  @ER-2851 @ER-3007 @REGRESSION @ROLES
  Scenario: Verify user is able to Rename Responsibility in attachments page in Roles
    Given that a role is in status 'Draft'
    And active role is attached to Responsibility
    And user navigates to 'Roles' page
    And user selects a specific role
    When user clicks on menu option of attached responsibility
    And user 'Rename' the attach responsibility
    Then verify name of attached responsibility should be renamed

  @ER-2599 @ER-2726 @ROLES @skip
  Scenario:Verify that User can detach role from Responsibility
    Given that a responsibility is in status 'Draft'
    And that a role is in status 'Draft'
    And user calls the attach responsibility to role API
    When user navigate to 'Roles' page
    And user searches the role
    Then Verify that User can detach role from Responsibility

  @ER-3154 @ER-3157 @ER-3496 @REGRESSION @ROLES
  Scenario: Verify Archive option and filter visible and working for role
    Given that a role is in status 'Retired'
    And user navigates to 'Roles' page
    And user searches the role
    When user clicks the three dot menu of the role
    Then verify 'Archive' action should be visible
    And user selects 'Archive' option
    And user clicks on confirm button
    And user clears the search field
    And user clicks on filter button
    And user select 'Show' filter option
    And the user clicks on the save filter button
    And user searches the role
    And verify Archived status is displayed

  @ER-3425 @ER-3525 @REGRESSION @ROLES
  Scenario:Verify UnArchive option is visible and working for Roles
    Given that a role is in status 'Retired'
    And user calls the archive role API
    And user navigates to 'Roles' page
    And The User click on the filter button when  no filter is selected
    And User Applies Filter
    And user clicks on save filter button
    And user searches the role
    When user clicks the three dot menu of the role
    Then verify 'Unarchive' action should be visible
    And user selects 'Unarchive' option
    And user clicks on Unarchive button
    And user searches the role
    And user clicks the three dot menu of the role
    And verify 'Unarchive' option is not visible

  @ER-363 @ER-3358 @ROLES @skip
  Scenario: Verify checkpoints counter is red on the roles page when user have no checklist
    Given that a role is in status 'Draft'
    And role is attached to Responsibility
    And user navigate to 'Roles' page
    When user searches the role
    And user expand the role
    Then verify checklist counter is red
    And click on red checkpoint counter
    And verify No Checkpoints Found text is visible

  @ER-363 @ER-3357 @ROLES @skip
  Scenario: Verify checkpoints counter on the roles page are visible
    Given that a role is in status 'Draft'
    And User have a Checkpoint in status 'Active'
    And role is attached to responsibility with checklist
    When user navigates to 'Roles' page
    And user searches the role
    And user expands the role
    Then verify checkpoints counter is visible
    And user clicks on the checkpoint counter
    And verify user navigates to the checklist page

  @ER-4376 @ER-4433 @REGRESSION @ROLES
  Scenario: Verify the Chatter Count Tab
    Given that a role is in status 'Active'
    And user navigates to 'Roles' page
    And user selects a specific role
    Then Verify the Display button "ADD new with AI"

  @ER-4376 @ER-4476 @REGRESSION @ROLES
  Scenario: Verify the Chatter Count Tab
    Given that a role is in status 'Active'
    And user navigates to 'Roles' page
    When user selects a specific role
    Then Verify the Display button "ADD new with AI"
    And user click on the ADD new with AI button
    And verfiy the text "Create and Attach Responsibilities with AI Help for Role test"
    And user click on create and attach button


  @ER-4330 @ER-4578 @REGRESSION @ROLES
   Scenario: Verify user is able to activate draft responsibility when activating a role
    Given that a role is in status 'Draft'
    And role is attached to Responsibility
    And user navigate to 'Roles' page
    When user searches the role
    And user clicks the three dot menu of the role
    When user Select the Activate Option
    And User click on Activate Button
    And User Activate the Attached Responsibility
    And user searches the role
    And the user expands the attached role
    And the status of the attached Responsibility changes to Active

  @ER-4330 @ER-4579 @REGRESSION @ROLES
  Scenario: Verify user can skip activating draft responsibilities when activating a role
  Given that a role is in status 'Draft'
    And role is attached to Responsibility
    And user navigate to 'Roles' page
    When user searches the role
    And user clicks the three dot menu of the role
    When user Select the Activate Option
    And User click on Activate Button
    And User Skip to activate attached responsibilities
    And user searches the role
    And the user expands the attached role
    Then verify the status of the attached Responsibility changes to Draft
