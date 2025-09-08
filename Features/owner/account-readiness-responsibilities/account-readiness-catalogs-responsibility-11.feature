Feature: Account > Readiness > Catalogs > Responsibility

    @ER-3155 @ER-3157 @ER-3499 @REGRESSION @RESPONSIBILITY
    Scenario: Verify Archive option and filter visible and working for responsibility
        Given that a responsibility is in status 'Retired'
        And user navigate to 'Responsibilities' page
        When user click on 'Retired' Responsibilities Ellipsis menu
        Then 'Archive' responsibility option should be visible in the list
        And 'Archive' the Responsibility
        And user clicks on confirm button
        And user clears the search field
        And user clicks on filter button
        And user select 'Show' filter option
        And the user clicks on the save filter button
        And user search for the responsibility
        And verify Archived status is displayed

    @ER-3425 @ER-3526 @REGRESSION @RESPONSIBILITY
    Scenario:Verify UnArchive option is visible and working for Responsibility
        Given that a responsibility is in status 'Retired'
        And user calls the archive responsibility API
        And user navigate to 'Responsibilities' page
        And the user clicks on the Filter button
        And User Applies Filter
        And user clicks on save filter button
        And user search for the responsibility
        When user clicks on three dot menu button
        Then verify 'Unarchive' option is visible
        And user select 'Unarchive' option from menu
        And user clicks on Unarchive button
        And user search for the responsibility
        And user clicks on three dot menu button
        And verify 'Unarchive' option is not visible

    @ER-3484 @ES-351 @ER-3370 @REGRESSION @RESPONSIBILITY
    Scenario: Verify checkpoint counter is visible for level 1 on the responsibilities page
        Given User creates a Checkpoint with status 'Active' and level 1
        When user navigates to 'Responsibilities' page
        And User searches for the responsibility without opening it
        Then verify apprentice checkpoints counter is visible
        And user clicks on the checkpoint counter
        And verify user navigates to the checklist page

    @ER-3484 @ER-3535 @REGRESSION @RESPONSIBILITY
    Scenario: Verify checkpoint counter is visible for level 2 on the responsibilities page
        Given User creates a Checkpoint with status 'Active' and level 2
        When user navigates to 'Responsibilities' page
        And User searches for the responsibility without opening it
        Then verify professional checkpoints counter is visible

    @ER-3484 @ER-3546 @REGRESSION @RESPONSIBILITY
    Scenario: Verify checkpoint counter is visible for level 3 on the responsibilities page
        Given User creates a Checkpoint with status 'Active' and level 3
        When user navigates to 'Responsibilities' page
        And User searches for the responsibility without opening it
        Then verify coach checkpoints counter is visible

    @ER-3484 @ER-3547 @REGRESSION @RESPONSIBILITY
    Scenario: Verify checkpoint counter is visible for level 4 on the responsibilities page
        Given User creates a Checkpoint with status 'Active' and level 4
        When user navigates to 'Responsibilities' page
        And User searches for the responsibility without opening it
        Then verify master checkpoints counter is visible

    @ER-3484 @ES-351 @ER-3371 @REGRESSION @RESPONSIBILITY
    Scenario: Verify checkpoints counter is red on the responsibilities page when user have no checklist
        Given that a responsibility is in status 'Draft'
        And user navigate to 'Responsibilities' page
        When User searches for the responsibility
        Then verify checklist counter is red
        And click on red checkpoint counter
        And verify No Checkpoints Found text is visible

    @ER-3605 @ER-3847 @REGRESSION @RESPONSIBILITY
    Scenario: Verify that when there is no badge holder they do not show  filters and Search Bar
        Given that a employee is in status 'Active'
        And User has a responsibility
        And user navigate to 'Responsibilities' page
        When user opens a responsibility
        Then Verify that No badge holder found

    @ER-4136 @ER-4150 @REGRESSION-API @RESPONSIBILITY
    Scenario: Verify that Archived Responsibility does not appear in the Responsibility List
        Given that a responsibility is in status 'Retired'
        When user calls the archive responsibility API
        And user has a employee
        And user navigates to 'Employees' page
        And user click on a specific Employee name
        When user clicks the Employee Badge Menu
        And user clicks on Issue Badge button
        And verify issue badge modal is visible
        And user searches for newly created responsibility
        Then Verify that Archived Responsibility does not appear in the Responsibility List
    
      @ER-5341 @ER-5457 @REGRESSION @RESPONSIBILITY
  Scenario: Verify 120 character limit validation for responsibility name
    Given user navigate to 'Responsibilities' page
    When user click on Add Responsibility button
    And user add Responsibility name exceeding 120 characters
    Then validation error message for character limit should be displayed
