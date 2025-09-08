Feature: Account > Readiness > Catalogs > Responsibility
  
  @ER-2316 @ER-2655 @REGRESSION @RESPONSIBILITY
  Scenario: Verify the Responsibility Assignments Filters
    Given User has responsibility
    And user navigate to 'Responsibilities' page
    And user opens a responsibility
    When user reaches the 'Assignments' tab
    Then verify data is visibe on assignments tab
    And user click on filter button
    And verify filter modal appears
    And User seletc the 'Relieved' status for Responsibility assignment
    And user reaches the 'Assignments' tab
    Then Verify the Responsibility Assignments Filters 'Relieved'

  @ER-2318 @ER-2909 @REGRESSION @RESPONSIBILITY
  Scenario:Verify Employee Card Availability Icon
    Given User has a responsibility
    And user navigate to 'Responsibilities' page
    And user opens a responsibility
    And user reaches the 'Evaluation' tab
    When the user looks at the list of employees
    Then the first employee card should display an Availability icon

  @ER-2318 @ER-2910 @REGRESSION @RESPONSIBILITY
  Scenario:Show Requested Tag for Current User
    Given User has a responsibility
    And user navigate to 'Responsibilities' page
    And user opens a responsibility
    And user reaches the 'Evaluation' tab
    When User verify the Request tab
    Then it should display as you as the request

  @ER-2318 @ER-2912 @REGRESSION @RESPONSIBILITY
  Scenario:Show Accepted Tag for Self
    Given User has a responsibility
    And user navigate to 'Responsibilities' page
    And user opens a responsibility
    And user reaches the 'Evaluation' tab
    When user verify the Accepted Tag
    Then it should display as you as the request

  @ER-2613 @ER-2727 @REGRESSION @RESPONSIBILITY
  Scenario: Verify Assignment Modal on Catalogs > Responsibility > checklist
    Given User have a Checkpoint in status 'Active'
    And user navigate to 'Responsibilities' page
    When user opens a checkpoint
    And click on checklist action menu
    And User click on add checkpoint modal and close the modal
    When User click on Filter button
    Then Verify Add checkpoint Modal on Catalogs > Responsibility > checklist

  @ER-2643 @ER-2834 @REGRESSION @RESPONSIBILITY
  Scenario: Verify Action Menu Functionality on Multiple Checkpoints
    Given User have 12 Checkpoints in status 'Active'
    And user navigate to 'Responsibilities' page
    And user search for a responsibility
    When user reaches the 'Checklist' tab
    Then click on checklist action menu

  @ER-2643 @ER-2835 @REGRESSION @RESPONSIBILITY
  Scenario: Add Checkpoints to a Responsibility
    Given User have 12 Checkpoints in status 'Active'
    And user navigate to 'Responsibilities' page
    When user search for a responsibility
    And user reaches the 'Checklist' tab
    Then Verify that system displays all 12 checkpoints count

  @ER-2312 @ER-3027 @REGRESSION @RESPONSIBILITY
  Scenario: Verify the Responsibility Assignments
    Given that a role is in status 'Active'
    And role is attached to Responsibility
    And user navigate to 'Responsibilities' page
    When user clicks on Assignment component
    Then User drill down into Responsibility Assignments Page

  @READ-608 @ER-746 @NeedFixing @RESPONSIBILITY
  Scenario: Verfinig Removing the Badge Holder
    Given user has a employee
    And user open the Responsibility modal
    And user should have at least one current badge
    When user remove the granted badge
    Then user confirm the pop up confirmation dialog
    And the badge should get diappred

  @READ-608 @ER-747 @NeedFixing @RESPONSIBILITY
  Scenario: Verifying the Searching badge holder
    Given user have 2 employees
    And user have more then one badge holder to a responsibility
    When user search for the badge
    Then user should only see badge holders that contains search string