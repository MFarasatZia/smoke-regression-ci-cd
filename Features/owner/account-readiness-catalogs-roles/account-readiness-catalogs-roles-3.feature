Feature: Account > Readiness > Catalogs > Roles

@ER-1099 @ER-1388 @FIX @ROLES
  Scenario: Verify Activate option is working in Role object action menu
    Given that a role is in status 'Draft'
    And user navigates to 'Roles' page
    And user searches the role
    And user clicks the three dot menu of the role
    When user selects 'Activate' option
    And user clicks on Activate button
    Then verify status of role object is 'Active'

  @ER-1099 @ER-1389 @FIX @ROLES
  Scenario: Verify Retire option is working in Role object action menu
    Given that a role is in status 'Active'
    And user navigates to 'Roles' page
    And user searches the role
    And user clicks the three dot menu of the role
    When user selects 'Retire' option
    And user clicks on Retire button
    Then verify status of role object is 'Retired'

  @ER-1099 @ER-1390 @FIX @ROLES
  Scenario: Verify De-Activate option is working in Role object action menu
    Given that a role is in status 'Active'
    And user navigates to 'Roles' page
    And user searches the role
    And user clicks the three dot menu of the role
    When user selects 'De-Activate' option
    And user clicks on De-Activate button
    Then verify status of role object is 'Inactive'

  @ER-1099 @ER-1391 @NeedFixing @ROLES
  Scenario: Verify Attach Responsibility option is working in Role object action menu
    Given that a responsibility is in status 'Draft'
    And that a role is in status 'Active'
    And user navigates to 'Roles' page
    And user searches the role
    And user clicks the three dot menu of the role
    When user selects 'Attach Responsibility' option
    And user attaches 'Existing' responsibility to the role
    And user expands the role
    Then verify that the responsibility is attached to the role

  @ER-1099 @ER-1393 @FIX @ROLES
  Scenario: Verify Rename option is working in Role object action menu
    Given that a role is in status 'Active'
    And user navigates to 'Roles' page
    And user searches the role
    And user clicks the three dot menu of the role
    When user selects 'Rename' option
    And rename popup appears
    And user types new role name
    And user selects save button
    Then verify role name is changed

  @ER-1099 @ER-1395 @FIX @ROLES
  Scenario: Verify Re-Activate option is working in Role object action menu
    Given that a role is in status 'Retired'
    And user navigates to 'Roles' page
    And user searches the role
    And user clicks the three dot menu of the role
    When user selects 'Re-activate' option
    And user clicks on Re-Activate button
    Then verify status of role object is 'Active'
  
  @ER-1784 @ER-1916 @REGRESSION @ROLES
  Scenario: Verify the Chatter Count Tab
    Given that role is in status active
    And user navigates to 'Roles' page
    When user selects a specific role
    And user reaches the 'Chatter' position tab
    Then Verify the Roles Chatter Count Tab

  @ER-1839 @ER-1996 @REGRESSION @ROLES
  Scenario: Verify previous button is not visible on the first page of Catalogs < Roles page
    Given user navigate to 'Roles' page
    Then verify previous button is not visible on first page
    And verify next button is visible on first page

  @ER-1839 @ER-1997 @REGRESSION @ROLES
  Scenario: Verify next button is not visible on the last page of Catalogs < Roles page
    Given user navigate to 'Roles' page
    Then user verify next button not visible on last page
    And verify previous button is visible on last page

  @ER-2239 @ER-2361 @ROLES @skip
  Scenario: Verify data appears when role is reactivated and Inactive filter is implemented
    Given the Role with different statuses created 3 times
    And user navigate to 'Roles' page
    When the user apply the 'Retired' filter for Roles
    And the user see a list of Roles filtered by 'Retired'
    Then user click the three dot menu of the role
    And user selects 'Re-activate' option
    And user clicks on Re-Activate button
    And the user see a list of Roles filtered by 'Active'