Feature: Account > Readiness > Catalogs > Responsibility

    @ER-1839 @ER-2001 @NeedFixing @RESPONSIBILITY
    Scenario: Verify next button is not visible on the last page of Catalogs < Responsibilities< Checklist page
        Given User have 12 Checkpoints in status 'Active'
        And user navigate to 'Responsibilities' page
        And user search for a responsibility
        When user reaches the 'Checklist' tab
        Then verify previous button is visible on last checklist page
        And verify next button is not visible on last checklist page

    @ER-1816 @ER-2014 @REGRESSION @RESPONSIBILITY
    Scenario: Display No CheckPoint Found
        Given User has responsibility
        And user navigate to 'Responsibilities' page
        When user opens a responsibility
        And user reaches the 'Checklist' tab
        Then Verify that Display No Checklists Found

    @ER-1413 @ER-2003 @NeedFixing @RESPONSIBILITY
    Scenario: Verify pass button is wroking in Catalogs < Responsibility < Evaluate Proficiency for a Responsibility page
        Given that a employee is in status 'Active'
        And that user has 'Active' checkpoint with responsibility badge
        And user navigate to 'Responsibilities' page
        And user search for a responsibility
        When user clicks on Issue Badge button
        And verify grant badge modal appears
        And user clicks on employee field drop down
        And user selects employee from the list
        And User Unselect the employee from the list
        And user selects employee from the list
        And user clicks on next button
        Then verify Evaluate Proficiency for a Responsibility page is displayed
        And user clicks on pass button
        And verify passed badge appears

    @ER-1416 @ER-2004 @REGRESSION @RESPONSIBILITY
    Scenario: Verify fail button is wroking in Catalogs < Responsibility < Evaluate Proficiency for a Responsibility page
        Given that a employee is in status 'Active'
        And that user has 'Active' checkpoint with responsibility badge
        And user navigate to 'Responsibilities' page
        And user search for a responsibility
        When user clicks on Issue Badge button
        And verify grant badge modal appears
        And user clicks on employee field drop down
        And user selects employee from the list
        And user clicks on next button
        Then verify Evaluate Proficiency for a Responsibility page is displayed
        And user clicks on fail button
        And verify failed badge appears

    @ER-1118 @ER-2092 @REGRESSION @RESPONSIBILITY
    Scenario: Verify that link should be attached to the highlighted text
        Given User has a responsibility
        And user navigate to 'Responsibilities' page
        And user opens a responsibility
        When Verify that the user sees a popup window after clicking the Attach Link button for 'master'


    @ER-1104 @ER-2156 @REGRESSION @RESPONSIBILITY
    Scenario: Verify close icon works on chatter drawer of checkpoint in Catalogs < Responsibility < Checklist page
        Given User has a responsibility
        And user navigate to 'Responsibilities' page
        And user opens a responsibility
        When user adds a 'Apprentice' checkpoint
        And user clicks on chatter drawer
        And verify checkpoint chatter drawer appears
        And verify the checkpoint name in chatter drawer
        Then user clicks on close icon
        And verify user lands on checklist page

    @ER-2072 @ER-2687 @ER-2186 @REGRESSION @RESPONSIBILITY
    Scenario: Display No CheckPoint Found
        Given User has responsibility
        And user navigate to 'Responsibilities' page
        When user opens a responsibility
        And user reaches the 'Checklist' tab
        Then Verify that No checkpoints found based on the current filters

    @ER-1785 @ER-1876 @REGRESSION @RESPONSIBILITY @COMPLETED
    Scenario: Verify User see Rename Action popup model
        Given User have a Checkpoint in status 'Retired'
        And user navigate to 'Responsibilities' page
        When user opens a checkpoint
        Then remove a 'Active' filter for a Checkpoint
        And remove a 'Draft' filter for a Checkpoint
        And click on checklist action menu
        Then the 'Rename' checklist option is visible
        When User select the 'Rename' action option
        Then Verify 'Rename' checkpoint pop-up should appear

    @ER-2239 @ER-2358 @REGRESSION @RESPONSIBILITY
    Scenario: Verify data appears when responsibility is reactivated and Inactive filter is implemented
        Given that 5 responsibilities are created with 'Inactive' status
        And user navigate to 'Responsibilities' page
        When the user apply the 'Inactive' status filter for Responsibilities
        And the user see a list of Responsibilities filtered by 'Inactive'
        Then user clicks the three dot menu for the responsibility
        And user select 'Re-activate' option for responisibility
        And user clicks on Re-Activate button
        And verify the user see a list of Responsibilities filtered by 'Inactive'

    @ER-1839 @ER-2000 @REGRESSION @RESPONSIBILITY
    Scenario: Verify previous button is not visible on the first page of Catalogs < Responsibilities< Checklist page
        Given User have 12 Checkpoints in status 'Active'
        And user navigate to 'Responsibilities' page
        And user search for a responsibility
        When user reaches the 'Checklist' tab
        Then verify previous button is not visible on checklist page
        And verify next button is visible on checklist page