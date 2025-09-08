Feature: Account > Readiness > Catalogs > Responsibility > Evaluate Proficiency


    @ES-34 @ES-165 @REGRESSION @EVALUATE-PROFICIENCY
    Scenario: Verify default filter "Not Yet Passed" on evaluate proficiency page on catalogs > responsibilities page
        Given that a employee is in status 'Active'
        And User have 12 Checkpoints in status 'Active'
        And user navigate to 'Responsibilities' page
        And user search for a responsibility
        When user clicks on Issue Badge button
        And verify issue badge modal appears
        And user clicks on employee field
        And user selects employee from the list
        And user clicks on next button
        Then verify Evaluate Proficiency for a Responsibility page is displayed
        And verify 'Not Yet Passed' filter tag is displayed
        And user clicks on fail button
        And verify failed badge appears
        And verify reset badge appears

    @ES-34 @ES-166 @REGRESSION @EVALUATE-PROFICIENCY
    Scenario: Verify filter "Only Failed" on evaluate proficiency page on catalogs > responsibilities page
        Given that a employee is in status 'Active'
        And User have a Checkpoint in status 'Active'
        And user navigate to 'Responsibilities' page
        And user search for a responsibility
        When user clicks on Issue Badge button
        And verify issue badge modal appears
        And user clicks on employee field
        And user selects employee from the list
        And user clicks on next button
        When verify Evaluate Proficiency for a Responsibility page is displayed
        And user clicks on fail button
        Then user click on the more filter button
        And user selects 'Only Failed' filter
        And user clicks on save filter button
        And verify 'Only Failed' filter tag is displayed
        And verify failed badge appears

    @ES-34 @ES-167 @REGRESSION @EVALUATE-PROFICIENCY
    Scenario: Verify filter "Only Not Yet Evaluated" on evaluate proficiency page on catalogs > responsibilities page
        Given that a employee is in status 'Active'
        And User have a Checkpoint in status 'Active'
        And user navigate to 'Responsibilities' page
        And user search for a responsibility
        When user clicks on Issue Badge button
        And verify issue badge modal appears
        And user clicks on employee field
        And user selects employee from the list
        And user clicks on next button
        When verify Evaluate Proficiency for a Responsibility page is displayed
        And user clicks on fail button
        Then user click on the more filter button
        And user selects 'Only Not Yet Evaluated' filter
        And user clicks on save filter button
        And verify 'Only Not Yet Evaluated' filter tag is displayed
        And verify failed badge appears

    @ES-34 @ES-168 @REGRESSION @EVALUATE-PROFICIENCY
    Scenario: Verify filter "Only Reset" on evaluate proficiency page on catalogs > responsibilities page
        Given that a employee is in status 'Active'
        And User have a Checkpoint in status 'Active'
        And user navigate to 'Responsibilities' page
        And user search for a responsibility
        When user clicks on Issue Badge button
        And verify issue badge modal appears
        And user clicks on employee field
        And user selects employee from the list
        And user clicks on next button
        When verify Evaluate Proficiency for a Responsibility page is displayed
        Then user click on the more filter button
        And user selects 'Only Reset' filter
        And user clicks on save filter button
        And verify 'Only Reset' filter tag is displayed
        And verify reset badge appears

    @ES-34 @ES-169 @REGRESSION @EVALUATE-PROFICIENCY
    Scenario: Verify filter "Only Not Applicable" on evaluate proficiency page on catalogs > responsibilities page
        Given that a employee is in status 'Active'
        And User have a Checkpoint in status 'Active'
        And user navigate to 'Responsibilities' page
        And user search for a responsibility
        And user clicks on Issue Badge button
        And verify issue badge modal appears
        And user clicks on employee field
        And user selects employee from the list
        And user clicks on next button
        When verify Evaluate Proficiency for a Responsibility page is displayed
        And user clicks on Not Applicable button
        Then user click on the more filter button
        And user selects 'Only Not Applicable' filter
        And user clicks on save filter button
        And verify 'Only Not Applicable' filter tag is displayed
        And verify Not Applicable badge appears

    @ES-34 @ES-170 @REGRESSION @EVALUATE-PROFICIENCY
    Scenario: Verify default filter "Only Passed" on evaluate proficiency page on catalogs > responsibilities page
        Given that a employee is in status 'Active'
        And User have a Checkpoint in status 'Active'
        And user navigate to 'Responsibilities' page
        And user search for a responsibility
        And user clicks on Issue Badge button
        And verify issue badge modal appears
        And user clicks on employee field
        And user selects employee from the list
        And user clicks on next button
        When verify Evaluate Proficiency for a Responsibility page is displayed
        And user clicks on pass button
        Then user click on the more filter button
        And user selects 'Only Passed' filter
        And user clicks on save filter button
        And verify 'Only Passed' filter tag is displayed
        And verify passed badge appears

    @ER-45 @ER-3558 @ER-183 @RESPONSIBILITY
    Scenario: Verify User can Reset the Passed Checkpoint
        Given that a employee is in status 'Active'
        And that user has 'Active' checkpoint with responsibility badge
        And user navigate to 'Responsibilities' page
        And user search for a responsibility
        And user reaches the 'Badge Holders' tab
        And user reaches the 'Checklist' tab
        And user reaches the 'Badge Holders' tab
        And user clicks on Issue Badge button
        And verify issue badge modal appears
        And user clicks on employee field
        And user selects employee from the list
        And user clicks on next button
        And User click on Passed Icon
        And User remove the status filter
        And Row Should show as Passed
        And Do Not Show All Checkpoint Reset
        When User Click on Reset icon
        Then User verify the confirmation dialog Message
        And User click on confirm button
        And return it to Pending Evaluation after reset status

    @ER-45 @ER-3558 @ER-184 @RESPONSIBILITY
    Scenario: Verify User can Reset the Failed Checkpoint
        Given that a employee is in status 'Active'
        And that user has 'Active' checkpoint with responsibility badge
        And user navigate to 'Responsibilities' page
        And user search for a responsibility
        And user reaches the 'Badge Holders' tab
        And user reaches the 'Checklist' tab
        And user reaches the 'Badge Holders' tab
        And user clicks on Issue Badge button
        And verify issue badge modal appears
        And user clicks on employee field
        And user selects employee from the list
        And user clicks on next button
        And User click on Failed Icon
        And Verify that the Reason Model For fail is Open
        And User Confirm fail Button should be Disabled By Default
        And User Enter the Reason In The Field
        And User clicks on the fail CheckPoint Button
        And User remove the status filter
        And Row Should show as Failed
        And Do Not Show All Checkpoint Reset
        When User Click on Reset icon
        Then User verify the confirmation dialog Message
        And User click on confirm button
        And return it to Pending Evaluation after reset status

    @ER-45 @ER-3558 @ER-185 @RESPONSIBILITY
    Scenario: Verify User can Reset the Not Applicable Checkpoint
        Given that a employee is in status 'Active'
        And that user has 'Active' checkpoint with responsibility badge
        And user navigate to 'Responsibilities' page
        And user search for a responsibility
        And user reaches the 'Badge Holders' tab
        And user reaches the 'Checklist' tab
        And user reaches the 'Badge Holders' tab
        And user clicks on Issue Badge button
        And verify issue badge modal appears
        And user clicks on employee field
        And user selects employee from the list
        And user clicks on next button
        And User click on Not Applicable Icon
        And Verify that the Reason Field For Not Applicable is Open
        And Mark As Not Applicable Button should be Disabled By Default
        And User Enter the Reason In The Field
        And User clicks on the Mark As Not Applicable Button
        And User remove the status filter
        And Row Should show as Not Applicable
        And Do Not Show All Checkpoint Reset
        When User Click on Reset icon
        Then User verify the confirmation dialog Message
        And User click on confirm button
        And return it to Pending Evaluation after reset status

    @ER-44 @ER-219 @REGRESSION
    Scenario:Verify List of checkpoints to evaluate in Evaluation modal
        Given that a employee is in status 'Active'
        And that user has 'Active' checkpoint with responsibility badge
        And user navigate to 'Responsibilities' page
        And user search for a responsibility
        And user reaches the 'Badge Holders' tab
        And user reaches the 'Checklist' tab
        And user reaches the 'Badge Holders' tab
        And user clicks on Issue Badge button
        And verify issue badge modal appears
        And user clicks on employee field
        And user selects employee from the list
        When user clicks on next button
        Then Verify List of checkpoints to evaluate in Evaluation modal