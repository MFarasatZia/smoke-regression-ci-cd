Feature: Account > Readiness > Catalogs > Roles

 @ER-4409 @ER-5039 @REGRESSION @ROLES
  Scenario: Verify Role Activation Changes Status from 'Draft' to 'Active' at Role Level
    Given that a role is in status 'Draft'
    And user navigates to 'Roles' page
    And user selects a specific role
    When user clicks the three dot menu of the role
    And User click 'Activate' Role
    Then user 'Activate' the Role
    And verify status of role object is 'active'

  @ER-4747 @ER-4861 @REGRESSION @ROLES
  Scenario: Verify the functioning and visibility of the selected options in the Role page.
    Given that a role is in status 'Active'
    And user navigates to 'Roles' page
    When user selects a specific role
    When user clicks the three dot menu of the role
    When user selects 'Retire' option
    And user clicks on Retire button
    Then verify status of role object is 'Retired'    
    And user clicks the three dot menu of the role
    When User click 'Re-activate' Role
    Then user 'Re-Activate' the Role
    And user clicks the three dot menu of the role
    When user selects 'Attach Responsibility' option
    And user attaches 'On the fly' responsibility to the role
    And user clicks the three dot menu of the role
    When user selects 'Rename' option
    And rename popup appears
    And user types new role name
    And user selects save button
    Then verify role name is changed

  @ER-5503 @ER-5600 @REGRESSION @ROLES
  Scenario: Verify role count in roles tab only increases when role is activated
    Given that a role is in status 'Draft'
    And user navigates to 'Roles' page
    And verify role count in roles tab before activation
    When user clicks the three dot menu of the role
    And User click 'Activate' Role
    Then user 'Activate' the Role
    And verify role count in roles tab after activation
  