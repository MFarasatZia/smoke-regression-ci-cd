Feature: Account > Readiness > Catalogs > Responsibility

  @ER-867 @ER-1069 @NeedFixing @RESPONSIBILITY
  Scenario: Verify Unselect the Filter by Clicking the Button Again
    Given User has responsibility
    And user navigate to 'Responsibilities' page
    When user opens a responsibility
    And user adds a 'Apprentice' checkpoint
    And remove a 'Active' filter for a Checkpoint
    When user clicks the 'apprentice' checkpoint counter
    And click the 'apprentice' checkpoint counter selected

  @ER-662 @ER-1126 @ER-2421 @REGRESSION @RESPONSIBILITY
  Scenario: Verify checkpoint is created with Apprentice without adding optional instructions
    Given User has responsibility
    And user navigate to 'Responsibilities' page
    And user opens a responsibility
    When user add a 'Apprentice' checkpoint without optional instructions
    And remove a 'Active' filter for a Checkpoint
    Then verify newly created checkpoint is visible

  @ER-662 @ER-1127 @ER-2421 @NeedFixing @RESPONSIBILITY
  Scenario: Verify checkpoint is created with Apprentice with adding optional instructions
    Given User has responsibility
    And user navigate to 'Responsibilities' page
    And user opens a responsibility
    When user adds a 'Apprentice' checkpoint
    And remove a 'Active' filter for a Checkpoint
    Then verify newly created checkpoint is visible

  @ER-662 @ER-1128 @ER-2421 @REGRESSION @COMPLETED @RESPONSIBILITY
  Scenario: Verify checkpoint is created with Professional without adding optional instructions
    Given User has responsibility
    And user navigate to 'Responsibilities' page
    And user opens a responsibility
    When user add a 'Professional' checkpoint without optional instructions
    And remove a 'Active' filter for a Checkpoint
    Then verify newly created checkpoint is visible

  @ER-662 @ER-1129 @ER-2421 @NeedFixing @RESPONSIBILITY
  Scenario: Verify checkpoint is created with Professional with adding optional instructions
    Given User has responsibility
    And user navigate to 'Responsibilities' page
    And user opens a responsibility
    When user adds a 'Professional' checkpoint
    And remove a 'Active' filter for a Checkpoint
    Then verify newly created checkpoint is visible

  @ER-662 @ER-1130 @ER-2421 @REGRESSION @RESPONSIBILITY
  Scenario: Verify checkpoint is created with Coach without adding optional instructions
    Given User has responsibility
    And user navigate to 'Responsibilities' page
    And user opens a responsibility
    When user add a 'Coach' checkpoint without optional instructions
    And remove a 'Active' filter for a Checkpoint
    Then verify newly created checkpoint is visible

  @ER-662 @ER-1131 @ER-2421 @NeedFixing @RESPONSIBILITY
  Scenario: Verify checkpoint is created with Coach with adding optional instructions
    Given User has responsibility
    And user navigate to 'Responsibilities' page
    And user opens a responsibility
    When user adds a 'Coach' checkpoint
    And remove a 'Active' filter for a Checkpoint
    Then verify newly created checkpoint is visible

  @ER-662 @ER-1132 @ER-2421 @REGRESSION @COMPLETED @RESPONSIBILITY
  Scenario: Verify checkpoint is created with Master without adding optional instructions
    Given User has responsibility
    And user navigate to 'Responsibilities' page
    And user opens a responsibility
    When user add a 'Master' checkpoint without optional instructions
    And remove a 'Active' filter for a Checkpoint
    Then verify newly created checkpoint is visible

  @ER-662 @ER-1133 @ER-2421 @NeedFixing @RESPONSIBILITY
  Scenario: Verify checkpoint is created with Master with adding optional instructions
    Given User has responsibility
    And user navigate to 'Responsibilities' page
    And user opens a responsibility
    When user adds a 'Master' checkpoint
    And remove a 'Active' filter for a Checkpoint
    Then verify newly created checkpoint is visible

  @ER-1088 @ER-1280 @NeedFixing @RESPONSIBILITY
  Scenario: Checklist changes are not saved after changes the tab
    Given User has responsibility
    And user navigate to 'Responsibilities' page
    And user opens a responsibility
    When user adds a 'Master' checkpoint
    And remove a 'Active' filter for a Checkpoint
    And verify newly created checkpoint is visible
    And user reaches the 'Badge Holders' tab
    And user reaches the 'Checklist' tab
    And remove a 'Active' filter for a Checkpoint
    Then verify newly created checkpoint is visible