Feature: Account > Readiness > Catalogs > Roles


  @READ-252 @READ-152 @READ-595 @ER-36 @FIX @ROLES
  Scenario: Role is in status Draft
    Given role is in status draft
    When user clicks on the role action menu
    Then 'Activate' role action should be visible
    And 'Attach Responsibility' role action should be visible
    And 'Rename' role action should be visible

  @READ-252 @READ-152 @READ-595 @ER-34 @ER-107 @ER-36 @ER-1793 @REGRESSION @ROLES
  Scenario: User should be able to Add a role
    Given user navigates to 'Roles' page
    And user should see Add Role button
    When user clicks Add role button
    Then verify Add role modal is displayed
    And user enters the name for role
    And user save the role
    And user should see the new role in Tree in status draft

  @ER-35 @ER-1796 @REGRESSION @ROLES
  Scenario: Verify Responsibility attached to Role
    Given role is in status draft
    And user navigate to 'Roles' page
    When role is attached to Responsibility
    Then verify Role attachment to be visible
    And 'Delete' option should not be visible in the list

  @READ-252 @ER-1797 @OPEN @REGRESSION @ROLES
  Scenario: Verify Delete option to be visible for Role when no attachment
    Given role is in status draft
    And user navigate to 'Roles' page
    Then verify Role attachment not to be visible
    And 'Delete' option should be visible in the list

  @ER-2674 @ER-2678 @REGRESSION @SMOKE @ROLES
  Scenario: Verify User should be able to Delete role
    Given that a role is in status 'draft'
    And user navigates to 'Roles' page
    And user searches the role
    When user clicks the three dot menu for the role
    And the user clicks the delete button
    And user should be able to see the delete role confirmation dialog
    Then User confirms to delete the Role
    And verify the role not to be visible

  @ER-5237 @ER-5461 @REGRESSION @ROLES
  Scenario: Verify User should be able to Delete role with attached draft responsibility
    Given role is in status draft
    When role is attached to Responsibility
    And user navigate to 'Roles' page
    And user searches the role
    And user clicks the three dot menu for the role
    And the user selects the delete option
    And user should be able to see the delete role confirmation dialog
    And verify delete attached responsibility checkbox is checked
    And the user clicks the delete button in the role deletion dialog
    Then verify both role and responsibility are deleted

  @READ-252 @READ-152 @ER-82 @REGRESSION @ROLES
  Scenario: Verify User should be able to Rename role
    Given role is in status draft
    And user navigate to 'Roles' page
    When user clicks the three dot menu for the role
    And User click 'Rename' Role
    Then user should be able to see the rename role confirmation dialog
    And user enters the new name for role
    And user save the renamed role
    And verify the renamed role to be visible

  @ER-272 @ER-529 @REGRESSION @ROLES
  Scenario: Verify Select Role Statuses to filter by
    Given the Roles with different statuses
    And user navigate to 'Roles' page
    When the user apply the 'Inactive' filter for Roles
    Then the user see a list of Roles filtered by 'Inactive'

  @ER-272 @ER-529 @REGRESSION @ROLES
  Scenario: Verify Select Role Statuses to filter by
    Given the Roles with different statuses
    And user navigate to 'Roles' page
    When the user apply the 'Retired' filter for Roles
    Then the user see a list of Roles filtered by 'Retired'

  @ER-272 @ER-529 @REGRESSION @ROLES
  Scenario: Verify Select Role Statuses to filter by
    Given the Roles with different statuses
    And user navigate to 'Roles' page
    When the user apply the 'Active' filter for Roles
    Then the user see a list of Roles filtered by 'Active'
    And remove 'Active' filter for Roles
    And the user should not see the removed 'Active' filter for Roles

  @ER-272 @ER-529 @REGRESSION @ROLES
  Scenario: Verify Select Role Statuses to filter by
    Given the Roles with different statuses
    And user navigate to 'Roles' page
    When the user apply the 'Draft' filter for Roles
    Then the user see a list of Roles filtered by 'Draft'
