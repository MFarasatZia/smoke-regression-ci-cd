Feature: Account > Readiness > Catalogs > Roles

@ER-2235 @ER-2336 @REGRESSION @ROLES
  Scenario: Verify responsibility page appears when user clicks on attached responsibility in catalogs < roles < role
    Given that a role is in status 'Draft'
    And role is attached to Responsibility
    And user navigate to 'Roles' page
    And user selects a specific role
    When user clicks on the Responsibility attached to Role
    Then verify user naviagate to the Responsibility page
    And verify the breadcrumb to be visible

  @ER-2339 @ER-2378 @ROLES @skip
  Scenario: Remove detach action from all actions dropdown
    Given that a responsibility is in status 'Draft'
    And that a role is in status 'draft'
    And user navigates to 'Roles' page
    And user searches the role
    And user clicks the three dot menu of the role
    When user selects 'Attach Responsibility' option
    And user attaches 'Existing' responsibility to the role
    And user expands the role
    And user clicks the three dot menu of the role
    Then Verify that the Detach Option is not shown from the Attach Role Drop Down

  @ER-2406 @ER-2541 @REGRESSION @ROLES
  Scenario: Verify Filters do not remain selected when user does not save the filter and click close icon in roles page
    Given the Roles with different statuses
    And user navigate to 'Roles' page
    And user click on the filter button
    When user select 'Active' filter
    And user select 'Inactive' filter
    And user select 'Retired' filter
    And user clicks on close icon
    And filter modal disappears
    Then user click on the filter button
    And verify 'Active' filter is not selected
    And verify 'Inactive' filter is not selected
    And verify 'Retired' filter is not selected

  @ER-2618 @ER-2706 @REGRESSION @ROLES
  Scenario: Verify User is not able to attach responsibility without even selecting a responsibility in catalogs > roles > role
    Given that a responsibility is in status 'Draft'
    And that a role is in status 'active'
    And user navigates to 'Roles' page
    And user selects a specific role
    When user clicks on Attach Responsibility button
    And user attaches existing responsibility to the role
    And user clear the field
    Then verify attach button is disabled

  @ER-2743 @ER-3414 @ER-2853 @ROLES @skip
  Scenario: Verify that Reattaching Role or Responsibility After Detachment
    Given that a responsibility is in status 'Draft'
    And that a role is in status 'Draft'
    And user calls the attach responsibility to role API
    And user navigates to 'Roles' page
    And user reaches the Roles tab
    When user searches the role
    And user clicks on Attachment component
    And User click on Detach Position
    And Attachment Modal is not visisble to User
    And user calls the attach responsibility to role API
    And a responsibility is attach to the role
    And user navigate to 'Roles' page
    And user reaches the Roles tab
    And user searches the role
    And user clicks on Attachment component
    Then verify role name and code is visible in detach modal

  @ER-2851 @ER-3002 @REGRESSION @ROLES
  Scenario: Verify user is able to Retire active Responsibility in Role Tree
    Given that a role is in status 'Draft'
    And active role is attached to Responsibility
    And user navigates to 'Roles' page
    And user searches the role
    When user clicks on menu option for responsibility
    And user 'Retire' the attach responsibility
    Then status of attach responsibility change to 'Retired'

  @ER-2851 @ER-3003 @ROLES @skip
  Scenario: Verify user is able to De-activate active Responsibility in Role Tree
    Given that a role is in status 'Draft'
    And active role is attached to Responsibility
    And user navigates to 'Roles' page
    And user searches the role
    When user clicks on menu option for responsibility
    And user 'De-activate' the attach responsibility
    Then status of attach responsibility change to 'Inactive'

  @ER-2851 @ER-3004 @REGRESSION @ROLES
  Scenario: Verify user is able to Activate Responsibility in attachments page in Roles
    Given that a role is in status 'Draft'
    And role is attached to Responsibility
    And user navigates to 'Roles' page
    And user selects a specific role
    When user clicks on menu option of attached responsibility
    And user 'Activate' the attach responsibility
    Then status of attached responsibility change to 'Active'

  @ER-2851 @ER-3005 @REGRESSION @ROLES
  Scenario: Verify user is able to Retire Responsibility in attachments page in Roles
    Given that a role is in status 'Draft'
    And active role is attached to Responsibility
    And user navigates to 'Roles' page
    And user selects a specific role
    When user clicks on menu option of attached responsibility
    And user 'Retire' the attach responsibility
    Then status of attached responsibility change to 'Retired'

  @ER-2851 @ER-3006 @ROLES @skip
  Scenario: Verify user is able to De-activate Responsibility in attachments page in Roles
    Given that a role is in status 'Draft'
    And active role is attached to Responsibility
    And user navigates to 'Roles' page
    And user selects a specific role
    When user clicks on menu option of attached responsibility
    And user 'De-activate' the attach responsibility
    Then status of attached responsibility change to 'Inactive'