Feature: Account > Readiness > Catalogs > Roles

@ER-272 @ER-531 @REGRESSION @ROLES
  Scenario: Verify multiple status filters
    Given the Roles with different statuses
    And user navigate to 'Roles' page
    When the user apply multiple filters for Roles like 'Active' and 'Retired'
    Then the user sees a list of Roles filtered by statuses 'Active' and 'Retired'

  @ER-83 @FIX @ER-352 @NeedFixing @ROLES
  Scenario: Verify attaching active responsibility to a role
    Given that a responsibility is in status 'Active'
    And that a role is in status 'draft'
    When user navigates to 'Roles' page
    And user searches the role
    When user opens the Attach responsibility modal
    And user attaches 'Existing' responsibility to the role
    When user expands the role
    Then verify that the responsibility is attached to the role

  @ER-35 @ER-1799 @REGRESSION @ROLES
  Scenario: Verify Delete option not to be visible for roles
    Given that role is in status active
    And user navigate to 'Roles' page
    When user clicks the three dot menu of the role
    Then 'Delete' option should not be visible in the list

  @ER-38 @ER-1800 @REGRESSION @ROLES
  Scenario: Verify Retire option not to be visible for roles
    Given role is in status draft
    And user navigate to 'Roles' page
    When user clicks the three dot menu of the role
    Then 'Retire' option should not be visible in the list

  @ER-544 @ER-708 @REGRESSION @ROLES
  Scenario: Verify Roles Counter should count only active roles in the Header of Roles page
    Given that a role is in status 'Active'
    When user navigate to 'Roles' page
    Then Verify number of 'Active' role is same as in the header

  @ER-429 @ER-767 @REGRESSION @ROLES
  Scenario: Verify user is able to Activate Responsibility in Roles Tree
    Given that a role is in status 'Draft'
    And role is attached to Responsibility
    And user navigates to 'Roles' page
    And user searches the role
    When user clicks on menu option for responsibility
    And user 'Activate' the attach responsibility
    Then status of attach responsibility change to 'Active'

  @ER-671 @ER-782 @REGRESSION @ROLES
  Scenario: Verify Responsibility that is attached to Role in Roles catalog can be renamed
    Given that a role is in status 'Draft'
    And role is attached to Responsibility
    And user navigates to 'Roles' page
    And user searches the role
    When user clicks on menu option for responsibility
    And user 'Rename' the attach responsibility
    Then verify name of responsibility should be renamed

  @ER-1108 @ER-1201 @NeedFixing @ROLES @skip
  Scenario: Verify Newly created Responsibility in a Role appears in Catalgos < Roles page
    Given that a role is in status 'Active'
    And user navigates to 'Roles' page
    And user selects a specific role
    When user clicks on Attach Responsibility button
    And Attach Responsibility to Role modal appears
    And user attaches a responsibility to a role
    Then verify that Responsibility is attached to the role

  @ER-79 @ER-388 @REGRESSION @ROLES
  Scenario: Verify De-Activate Role Option not to exist
    Given that a role is in status 'draft'
    And user navigate to 'Roles' page
    When user click on 'Draft' Role Ellipsis menu
    Then 'De-activate' option should not be visible in the list

  @ER-80 @ER-392 @REGRESSION @ROLES
  Scenario: Verify Re-Activate Role Option to exist
    Given that a role is in status 'De-activate'
    And user navigate to 'Roles' page
    When user click on 'Inactive' Role Ellipsis menu
    Then 'Re-activate' option should be visible in the list
    When User click 'Re-activate' Role
    Then user 'Re-Activate' the Role
    And verify the new role with status 'Active' is displayed in the roles tree