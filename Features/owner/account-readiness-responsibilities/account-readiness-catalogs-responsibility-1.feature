Feature: Account > Readiness > Catalogs > Responsibility

  @ER-108 @ER-464 @REGRESSION @RESPONSIBILITY
  Scenario: Verify Creating a new Responsibility
    Given user navigate to 'Responsibilities' page
    When user click on Add Responsibility button
    And user add Responsibility name
    And user click save responsibility button
    Then a new responsibility should be created

  @ER-86 @ER-466 @REGRESSION @RESPONSIBILITY
  Scenario: Verify Draft status Responsibility Ellipsis menu options
    Given that a responsibility is in status 'Draft'
    And user navigate to 'Responsibilities' page
    When user click on 'Draft' Responsibilities Ellipsis menu
    Then 'Delete' responsibility option should be visible in the list
    And 'Rename' responsibility option should be visible in the list
    And 'Attach Knowledge' responsibility option should be visible in the list

  @ER-86 @ER-468 @REGRESSION @RESPONSIBILITY
  Scenario: Verify Activating a Draft Status Responsibility
    Given that a responsibility is in status 'Draft'
    And user navigate to 'Responsibilities' page
    When user click on 'Draft' Responsibilities Ellipsis menu
    And 'Activate' the Responsibility
    Then status badge for Responsibility change to 'Active'

  @ER-89 @ER-381 @REGRESSION @RESPONSIBILITY
  Scenario: Verify De-Activate Responsibility with status Active
    Given that a responsibility is in status 'Active'
    And user navigate to 'Responsibilities' page
    When user click on 'Active' Responsibilities Ellipsis menu
    And 'De-activate' the Responsibility
    Then status badge for Responsibility change to 'Inactive'

  @ER-90 @ER-385 @REGRESSION @RESPONSIBILITY
  Scenario: Verify Re-Activate Responsibility Option with status Inactive
    Given that a responsibility is in status 'Inactive'
    And user navigate to 'Responsibilities' page
    When user click on 'Inactive' Responsibilities Ellipsis menu
    And 'Re-activate' the Responsibility
    Then status badge for Responsibility change to 'Active'

  @ER-90 @ER-473 @REGRESSION @RESPONSIBILITY
  Scenario: Verify Re-Activate Responsibility Option with status Retired
    Given that a responsibility is in status 'Retired'
    And user navigate to 'Responsibilities' page
    When user click on 'Retired' Responsibilities Ellipsis menu
    And 'Re-activate' the Responsibility
    Then status badge for Responsibility change to 'Active'

  @ER-85 @ER-474 @REGRESSION @SMOKE @RESPONSIBILITY
  Scenario: Verify Deleting Responsibility with status Draft
    Given that a responsibility is in status 'Draft'
    And user navigate to 'Responsibilities' page
    When user click on 'Draft' Responsibilities Ellipsis menu
    And 'Delete' the Responsibility
    Then pop up a confirmation dialog
    And you confirm the Delete option
    And the responsibility disappears from the grid

  @ER-85 @ER-475 @REGRESSION @RESPONSIBILITY
  Scenario: Verify Delete Action to not visible for Responsibility with status not Draft
    Given that a responsibility is in status 'Active'
    And user navigate to 'Responsibilities' page
    When user click on 'Active' Responsibilities Ellipsis menu
    Then 'Delete' responsibility option should not be visible in the list

  @ER-85 @ER-476 @REGRESSION @RESPONSIBILITY
  Scenario: Verify Delete Action to not visible for Attached Responsibility
    Given that a responsibility is in status 'Draft'
    And responsibility is attached
    And user navigate to 'Responsibilities' page
    When user click on 'Draft' Responsibilities Ellipsis menu
    Then 'Delete' responsibility option should not be visible in the list

  @ER-564 @NeedFixing @RESPONSIBILITY
  Scenario: Verify maximum 10 messages are displayed in the message chatter
    Given that a responsibility has 15 posts to chatter
    When user navigate to 'Responsibilities' page
    And user opens a responsibility
    When user reaches the 'Chatter' tab
    Then verify the Load more button is displayed
    And number of messages displayed is 10

  @ER-5503 @ER-5599 @REGRESSION @RESPONSIBILITY
  Scenario: Verify responsibility count in responsibilities tab only increases when responsibility is activated
    Given that a responsibility is in status 'Draft'
    And user navigate to 'Responsibilities' page
    And verify responsibility count in responsibilities tab before activation
    When User searches for the responsibility
    And user clicks the three dot menu for the responsibility
    And 'Activate' the Responsibility
    Then verify responsibility count in responsibilities tab after activation  