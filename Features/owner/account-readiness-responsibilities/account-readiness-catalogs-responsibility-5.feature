Feature: Account > Readiness > Catalogs > Responsibility


  @ER-1286 @ER-1594 @NeedFixing @RESPONSIBILITY
  Scenario: Verify Apprentice filter Badge Holder by Proficiency Level in Responsibilities page
    Given user adds employees to the system via API
    And user create a responsibility and you grant different badges to all 4 employees
    And user navigate to the responsibility page
    When user click on the created responsibility
    And user reach the badge page and all badges are sorted according to their level
    And user clicks on 'Apprentice' badge
    Then verify 'Apprentice' badge is selected
    And verify 'Apprentice' badge appears

  @ER-1286 @ER-1595 @NeedFixing @RESPONSIBILITY
  Scenario: Verify Professional filter Badge Holder by Proficiency Level in Responsibilities page
    Given user adds employees to the system via API
    And user create a responsibility and you grant different badges to all 4 employees
    And user navigate to the responsibility page
    When user click on the created responsibility
    And user reach the badge page and all badges are sorted according to their level
    And user clicks on 'Professional' badge
    Then verify 'Professional' badge is selected
    And verify 'Professional' badge appears

  @ER-1286 @ER-1596 @NeedFixing @RESPONSIBILITY
  Scenario: Verify Coach filter Badge Holder by Proficiency Level in Responsibilities page
    Given user adds employees to the system via API
    And user create a responsibility and you grant different badges to all 4 employees
    And user navigate to the responsibility page
    When user click on the created responsibility
    And user reach the badge page and all badges are sorted according to their level
    And user clicks on 'Coach' badge
    Then verify 'Coach' badge is selected
    And verify 'Coach' badge appears

  @ER-1286 @ER-1597 @NeedFixing @RESPONSIBILITY
  Scenario: Verify Master filter Badge Holder by Proficiency Level in Responsibilities page
    Given user adds employees to the system via API
    And user create a responsibility and you grant different badges to all 4 employees
    And user navigate to the responsibility page
    When user click on the created responsibility
    And user reach the badge page and all badges are sorted according to their level
    And user clicks on 'Master' badge
    Then verify 'Master' badge is selected
    And verify 'Master' badge appears

  @ER-1442 @ER-1698 @REGRESSION @RESPONSIBILITY
  Scenario: Verify the state of the filter after deleting default filter in checklist page
    Given that a responsibility is created
    And user navigate to 'Responsibilities' page
    When user clicks on the responsibility
    And user reaches the 'Checklist' tab
    Then verify default filter for checkpoint is 'Draft'
    And verify default filter for checkpoint is 'Active'

  @ER-733 @ER-1687 @REGRESSION @RESPONSIBILITY
  Scenario: Verify Issue button is visible while attaching a badge on responsibility
    Given that a employee is in status 'Active'
    And User has a responsibility
    And user navigates to 'Responsibilities' page
    And user opens a responsibility
    When user clicks on Issue Badge button
    And user clicks on employee field drop down
    And user searches for the employee
    And user selects employee from the list
    And user select a badge 'Apprentice - Can do with supervision'
    Then force badge button is displayed
    And user clicks on Give Badge button
    And verify 'Apprentice' badge appears
    And verify that user can search within the list of badge holders

  @ER-733 @ER-1688 @REGRESSION @RESPONSIBILITY
  Scenario: Verify Evaluate Proficiency for a Responsibility page appears with no badge and checkpoint
    Given that a employee is in status 'Active'
    And User have a Checkpoint in status 'Active'
    And user navigate to 'Responsibilities' page
    And user search for a responsibility
    When user clicks on Issue Badge button
    And user clicks on Issue Badge button
    And user clicks on employee field
    And user searches for the employee
    And user selects employee from the list
    And user clicks on next button
    Then verify Evaluate Proficiency for a Responsibility page is displayed

  @ER-733 @ER-1689 @NeedFixing @RESPONSIBILITY
  Scenario: Refactor Grant badge from Responsibility page > Badge Holders
    Given that a employee is in status 'Active'
    And that user has 'Active' checkpoint with responsibility badge
    And user navigate to 'Responsibilities' page
    And user search for a responsibility
    When user clicks on Issue Badge button
    And user clicks on Issue Badge button
    And user clicks on employee field drop down
    And user selects employee from the list
    And user clicks on next button
    Then verify Evaluate Proficiency for a Responsibility page is displayed

  @ER-1839 @ER-1998 @REGRESSION @RESPONSIBILITY
  Scenario: Verify previous button is not visible on the first page of Catalogs < Responsibilities page
    Given user navigate to 'Responsibilities' page
    Then verify previous button is not visible on first page
    And verify next button is visible on first page

  @ER-1839 @ER-1999 @REGRESSION @RESPONSIBILITY
  Scenario: Verify next button is not visible on the last page of Catalogs < Responsibilities page
    Given user navigate to 'Responsibilities' page
    Then user verify next button not visible on last page
    And verify previous button is visible on last page