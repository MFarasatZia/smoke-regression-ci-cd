Feature: Account > Readiness > Catalogs > Responsibility

  @ER-2251 @ER-2355 @REGRESSION @RESPONSIBILITY
  Scenario: Verify the "See More" Button Clicks Functionality
    Given User has responsibility
    And user navigate to 'Responsibilities' page
    And user opens a responsibility
    When adds a 70 character long 'Apprentice' checkpoint
    And remove a 'Active' filter for a Checkpoint
    Then user click on see more button

  @ER-2240 @ER-2365 @REGRESSION @RESPONSIBILITY
  Scenario: Verify filters does not remain selected in Catalogs < Responsibilities page after removing them
    Given that a responsibility is in status 'Draft'
    And user navigate to 'Responsibilities' page
    And user click on the filter button
    When user select 'Active' filter
    And user select 'Inactive' filter
    And user select 'Retired' filter
    And user click on save filter button
    And user search for responsibility
    Then user click on the more filter button
    And user select 'Draft' filter
    And user click on save filter button
    And remove a 'Draft' filter for a Responsibility
    And user click on the more filter button
    And verify 'draft' filter is removed

  @ER-2069 @ER-2504 @NeedFixing @RESPONSIBILITY
  Scenario: Verify When no Checkpoints in a responsibility hide the filter bar
    Given that a responsibility is created
    And user navigate to 'Responsibilities' page
    When user clicks on the responsibility
    And user reaches the 'Checklist' tab
    Then Verify that Filter Bar Is Not visible

  @ER-2253 @ER-2540 @RESPONSIBILITY
  Scenario: Verify the Checkbox Behavior for Filters on Checklist Page
    Given that a responsibility is created
    And user navigate to 'Responsibilities' page
    And user clicks on the responsibility
    And user reaches the 'Checklist' tab
    When user adds a 'Apprentice' checkpoint
    And user reaches the 'Badge Holders' tab
    And user reaches the 'Checklist' tab
    And remove a 'Active' filter for Responsibilities
    And remove a 'Draft' filter for Responsibilities
    And User apply the 'Draft' filter for Checkpoint
    And remove a 'Draft' filter for Responsibilities
    And the user clicks on the Filter button
    Then observe that 'Draft' status and checkbox filters are cleared

  @ER-2406 @ER-2538 @REGRESSION @RESPONSIBILITY
  Scenario: Verify Filters do not remain selected when user does not save the filter and click close icon
    Given that a responsibility is in status 'Draft'
    And user navigate to 'Responsibilities' page
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

  @ER-2330 @ER-2577 @REGRESSION @RESPONSIBILITY
  Scenario: Verify text when user has no checkpoints in catalogs < responsibilities page
    Given User has responsibility
    And user navigate to 'Responsibilities' page
    When user opens a responsibility
    And user reaches the 'Checklist' tab
    Then verify No Checkpoints Found text is visible
    And verify add checkpoint button is visible

  @ER-2330 @ER-2581 @REGRESSION @RESPONSIBILITY
  Scenario: Verify text when user has one checkpoint and the filter is applied in catalogs < responsibilities page
    Given User has responsibility
    And user navigate to 'Responsibilities' page
    And user opens a responsibility
    When user adds a 'Apprentice' checkpoint
    And user click on the filter button
    And user selects 'Active' filter for checklist
    And user click on save filter button
    Then verify No Checkpoints Visible text is visible

  @ER-2646 @ER-2675 @REGRESSION @RESPONSIBILITY
  Scenario: Verify that Checklist Filter State Retained When Navigating Between Tabs
    Given that a responsibility is in status 'Active'
    And user navigate to 'Responsibilities' page
    And user opens a responsibility
    When user adds a 'Apprentice' checkpoint
    And remove a 'Active' filter for Responsibilities
    And remove a 'Draft' filter for Responsibilities
    And The User click on the filter button when  no filter is selected
    And user selects 'Draft' filter for checklist
    And user click on save filter button
    And user reaches the 'Chatter' tab
    And user reaches the 'Checklist' tab
    Then Verify that Checklist Filter State Retained When Navigating Between Tabs

  @ER-2646 @ER-2677 @REGRESSION @RESPONSIBILITY
  Scenario: Verify Checklist Filter State Reset When User Refresh The Page
    Given that a responsibility is in status 'Active'
    And user navigate to 'Responsibilities' page
    And user opens a responsibility
    When user adds a 'Apprentice' checkpoint
    And remove a 'Active' filter for Responsibilities
    And remove a 'Draft' filter for Responsibilities
    And The User click on the filter button when  no filter is selected
    And user selects 'Draft' filter for checklist
    And user click on save filter button
    And user reaches the 'Checklist' tab
    Then Verify that Checklist Filter State Retained When Navigating Between Tabs

    @ER-3594 @ER-4711 @REGRESSION @RESPONSIBILITY
    Scenario: Verify the responsibility not currently attached to any role
    Given that a responsibility is in status 'Active'
    And user navigate to 'Responsibilities' page
    And the user click on Filter Button
    And user see 'No Filter' by default
    When the user clicks on 'No Positions' button
    And user click on save filter button
    And user search for responsibility
    Then Verify the responsibility not currently attached to any role