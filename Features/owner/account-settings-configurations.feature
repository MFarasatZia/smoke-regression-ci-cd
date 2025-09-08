Feature: Account > Settings > Configurations

    @ES-237 @ER-3201 @REGRESSION @CONFIGURATIONS
    Scenario: Verify currency page is visible and user is able to go back to currencies card in configurations tab of Settings page
        Given User is on 'settings' Page
        And User opens 'configurations' tab
        When user clicks on currencies card
        Then verify label of the page
        And user clicks on back button
        And verify user lands on configurations tab

    @ES-237 @ER-3202 @REGRESSION @CONFIGURATIONS
    Scenario: Verify currency picker functionality in currencies page in configurations tab of Settings page
        Given User is on 'settings' Page
        And User opens 'configurations' tab
        When user clicks on currencies card
        Then user clicks on the cross icon of the currency picker
        And verify no currency is selected
        And user clicks on the field
        And verify dropdown list appears
        And user types the currency name 'Euro'
        And user selects the currency

    @ER-4204 @ER-4236 @REGRESSION @CONFIGURATIONS
    Scenario: Verfiy the Settings > Configuration for Directories
        Given User is on 'settings' Page
        And User opens 'configurations' tab
        When the user clicks on the Directories card
        And user verify the text 'Show Employee Directory'
        And user verify the text 'Show Responsibilities Directory'
        Then verify that the user can click on the breadcrumb to navigate back to the Configurations page

    @ER-4658 @ER-5073 @REGRESSION @CONFIGURATIONS
    Scenario: Verify that Currency is already added in Operating Currency
        Given User is on 'settings' Page
        And User opens 'configurations' tab
        And user clicks on currencies card
        When User Click on Add Currency button
        Then verify the Add Currency Modal appears
        And User Click on Add button
        And verify that Currency is already added in Operating Currency

    @ER-4589 @ER-4895 @REGRESSION @SETTINGS-Configurations-API
    Scenario: Verify the Work hours per year in Operating Country
        Given User has an Operating Country
        When user call the Get Operating Country API
        Then Verify that 'work_hours_per_year' is in the response

    @ER-5451 @ER-5515 @REGRESSION @CONFIGURATIONS
    Scenario: Verify that Country is added in the Operating Country
        Given User is on 'settings' Page
        And User opens 'configurations' tab
        And user clicks on Countries card
        When the user clicks on the Add Country button
        And verify the Add Country Modal appears
        And the user clicks on the Add Country modal button
        Then verify that Country is added in the Operating Country
    
    @ER-5452 @ER-5526 @REGRESSION @CONFIGURATIONS
    Scenario: Verify that the chatter model is visible in the Operating Country
        Given User is on 'settings' Page
        And User opens 'configurations' tab
        And user clicks on Countries card
        And the user clicks on the Add Country button
        And the user clicks on the Add Country modal button
        When the user clicks on the Chatter icon
        Then verify the chatter model is visible
        And user clicks on cross icon
        And verify that the chatter model is closed

    @ER-5268 @ER-5663 @REGRESSION @CONFIGURATIONS
    Scenario: Verify that user can retire and reactivate a country
        Given User has an Operating Country
        And User is on 'settings' Page
        And User opens 'configurations' tab
        And user clicks on Countries card
        And user search the Country
        When user clicks on the action menu button
        And user selects the retire option
        Then verify the retire popup is displayed
        When user clicks on the retire button
        And user removes the filters
        Then verify the country is retired
        When user clicks on the action menu button
        And user selects the re-activate option
        Then verify the re-activate popup is displayed
        When user clicks on the re-activate button
        Then verify the country is re-activated
