Feature: Account > Readiness > Catalogs > Responsibility


  @ER-87 @OPEN @NeedFixing @RESPONSIBILITY
  Scenario: Retire Responsibility
    Given that a responsibility is in status active
    When you retire a responsibility
    Then you show responsibility status changing to retired

  @ER-265 @NeedFixing @RESPONSIBILITY
  Scenario: Do not show detach from role in responsibilities catalog
    Given that you are in Account > Catalogs > Responsibilities
    When you drop down the line menu
    Then DO NOT show action Detach from role

  @ER-269 @NeedFixing @RESPONSIBILITY
  Scenario: Badges sorting by level
    Given you add 4 employees are added to the system via API
    When user create a responsibility and you grant different badges to all 4 employees
    Then you navigate to the responsibility page and select the created responsibility
    Then you reach the badge page and all badges are sorted according to their level

  @ER-200 @ER-725 @RUN12 @RESPONSIBILITY
  Scenario: Verify the Change Checkpoint dialogue should appeared.
    Given User has responsibility
    And user navigate to 'Responsibilities' page
    When user opens a responsibility
    And user adds a 'Apprentice' checkpoint
    And user click on checklist menu
    Then the 'Change' checklist option is visible
    When user click on 'Change' checkpoint option
    Then verify checkpoint dialogue should be visible

  @ER-200 @ER-725 @RUN12 @RESPONSIBILITY
  Scenario: Verify the Change Checkpoint dialogue should appeared.
    Given User has responsibility
    And user navigate to 'Responsibilities' page
    When user opens a responsibility
    And user adds a 'Professional' checkpoint
    And user click on checklist menu
    Then the 'Change' checklist option is visible
    When user click on 'Change' checkpoint option
    Then verify checkpoint dialogue should be visible

  @ER-200 @ER-725 @RUN12 @RESPONSIBILITY
  Scenario: Verify the Change Checkpoint dialogue should appeared.
    Given User has responsibility
    And user navigate to 'Responsibilities' page
    When user opens a responsibility
    And user adds a 'Coach' checkpoint
    And user click on checklist menu
    Then the 'Change' checklist option is visible
    When user click on 'Change' checkpoint option
    Then verify checkpoint dialogue should be visible

  @ER-200 @ER-725 @RUN12 @RESPONSIBILITY
  Scenario: Verify the Change Checkpoint dialogue should appeared.
    Given User has responsibility
    And user navigate to 'Responsibilities' page
    When user opens a responsibility
    And user adds a 'Master' checkpoint
    And user click on checklist menu
    Then the 'Change' checklist option is visible
    When user click on 'Change' checkpoint option
    Then verify checkpoint dialogue should be visible

  @ER-200 @ER-727 @RUN12 @RESPONSIBILITY
  Scenario: Verify changes in checkpoint proficiency level
    Given User has responsibility
    And user navigate to 'Responsibilities' page
    When user opens a responsibility
    And user adds a 'Apprentice' checkpoint
    And user click on checklist menu
    Then the 'Change' checklist option is visible
    When user click on 'Change' checkpoint option
    And User has change the profiency level to 'Master'
    When User save the checkpoint
    Then Verify the proficieny badge updated to 'Master'

  @ER-273 @ER-594 @NeedFixing @RESPONSIBILITY
  Scenario: Verify Select Responsibilities Statuses to filter by
    Given the Responsibilities with different statuses
    And user navigate to 'Responsibilities' page
    When the user apply the 'Draft' status filter for Responsibilities
    Then the user see a list of Responsibilities filtered by 'Draft'

  @ER-273 @ER-594 @NeedFixing @RESPONSIBILITY
  Scenario: Verify Select Responsibilities Statuses to filter by
    Given the Responsibilities with different statuses
    And user navigate to 'Responsibilities' page
    When the user apply the 'Active' status filter for Responsibilities
    Then the user see a list of Responsibilities filtered by 'Active'
  
  @ER-3144 @ER-5384 @RESPONSIBILITY
  Scenario: verify the Badge Default data is visible
    Given that a responsibility is in status 'Active'
    And user navigate to 'Responsibilities' page
    When user clicks on the responsibility
    And user reaches the 'Defaults' tab
    Then verify the Badge Default data is visible