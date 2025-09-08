Feature: Account > Readiness > Catalogs > Responsibility

    @ER-273 @ER-594 @NeedFixing @RESPONSIBILITY
    Scenario: Verify Select Responsibilities Statuses to filter by
        Given the Responsibilities with different statuses
        And user navigate to 'Responsibilities' page
        When the user apply the 'Inactive' status filter for Responsibilities
        Then the user see a list of Responsibilities filtered by 'Inactive'

    @ER-273 @ER-594 @NeedFixing @RESPONSIBILITY
    Scenario: Verify Select Responsibilities Statuses to filter by
        Given the Responsibilities with different statuses
        And user navigate to 'Responsibilities' page
        When the user apply the 'Retired' status filter for Responsibilities
        Then the user see a list of Responsibilities filtered by 'Retired'

    @ER-273 @ER-595 @NeedFixing @RESPONSIBILITY
    Scenario: Verify Remove Filters for Responsibilities
        Given the Responsibilities with different statuses
        And user navigate to 'Responsibilities' page
        When the user apply the 'Active' status filter for Responsibilities
        And remove a 'Active' filter for Responsibilities
        Then the user should not see the removed 'Active' filter for Responsibilities

    @ER-273 @ER-596 @NeedFixing @RESPONSIBILITY
    Scenario: Verify multiple status filters
        Given the Responsibilities with different statuses
        And user navigate to 'Responsibilities' page
        When the user apply multiple filters like 'Inactive' and 'Draft' for Responsibilities
        Then the user sees a list of Responsibilities filtered by statuses 'Inactive' and 'Draft'

    @ER-549 @ER-623 @REGRESSION @RESPONSIBILITY
    Scenario: Verify that '#' sign exist with the Responsibility
        Given that a responsibility is in status 'Active'
        And user navigate to 'Responsibilities' page
        When user get the code of the responsibility with status 'Active'
        Then code should include '#' sign in the code

    @ER-2417 @ER-3414 @ER-2691 @REGRESSION @RESPONSIBILITY
    Scenario: Verify that User can detach role from Responsibility
        Given that a responsibility is in status 'Active'
        And that a role is in status 'Draft'
        And that responsibility is attached
        And user navigate to 'Responsibilities' page
        And verify and User searches for the responsibility
        Then User click on Attched Column to detach the Responsibility
        And Attachment Modal is not visisble to User
        And the responsibility disappears from the grid
    
    @ER-5103 @ER-5157 @REGRESSION @RESPONSIBILITY
    Scenario: verify that chatter tab is removed from responsibility
        Given User has responsibility
        And user navigate to 'Responsibilities' page
        And user opens a responsibility
        When user reaches the 'Badge Holders' tab
        Then verify that 'Chatter' tab is removed from responsibility

    @ER-4993 @ER-5174 @REGRESSION @RESPONSIBILITY
    Scenario: verify that the new Role is attached to the Responsibility
        Given that a responsibility is in status 'Active'
        And user navigate to 'Responsibilities' page
        And user clicks the three dot menu for the responsibility
        And user select 'Attach to Role' option for responisibility
        When the user clicks on the Attach Role button
        And user selects an existing role from the list
        And clicks on the Attach button
        Then verify that the new Role is attached

    @ER-5029 @ER-5220 @REGRESSION @RESPONSIBILITY
    Scenario: Verify the draft checkpoints count in the Responsibility API for responsibilities with status 'Draft'
        Given that a responsibility is in status 'Draft'
        And user calls an Checkpoint API
        When user calls the get responsibility api
        And verify checklist counter has value in response
        Then Verify Add Draft Checkpoint Counts by Level for Responsibilities

    @ER-5029 @ER-5221 @REGRESSION @RESPONSIBILITY
    Scenario: Verify the draft checkpoints count in the Responsibility API for responsibilities with status 'Active'
        Given that a responsibility is in status 'Active'
        And user calls an Checkpoint API
        When user calls the get responsibility api
        And verify checklist counter has value in response
        Then Verify Add Draft Checkpoint Counts by Level for Responsibilities
