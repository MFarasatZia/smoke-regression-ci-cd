Feature: Account > My Services > Be A Coach/Master

    @ER-1313 @ER-1678 @skip @COACH-MASTER-RESPONSIBILITIES
    Scenario:Verify that Mastered responsibilities page displayed
        Given user logs into the portal
        And User is on "My services" Page
        And User clicks on 'Be a Master/Coach' page
        When user open the 'Mastered Responsibilities' tab
        Then verify that Static Mastered responsibilities page displayed