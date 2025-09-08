Feature: Account > Navigation

  Sidebar to navigate the account portal

  @READ-277 @ER-137 @ER-1519 @ER-4094 @REGRESSION @SMOKE @NAVIGATION
  Scenario: Verify user logout functionality
    When user logs into the portal
    And user logs out
    Then verify user is redirected to the login page

  @ER-137 @WIP @ER-1520 @NAVIGATION
  Scenario: Verify co-owner user has access to Readiness, Settings and Organization sections
    When the user logs with a 'co-owner' user
    Then then verify the 'Readiness Section' is displayed
    And then verify the 'Settings Section' is displayed
    And then verify the 'Organization Section' is displayed

  @ER-300 @ER-1110 @REGRESSION @NAVIGATION
  Scenario: Verify the Global search field and Notification Bell visible
    Given User is on "Employees" Page
    When verify user lands on 'Employees Organization' page
    Then verify the global search field is visible
    And verify the notification bell icon is displayed
    And User click on the notification bell icon
    And verify the notifications visible

  @ER-1656 @ER-1766 @NAVIGATION
  Scenario: Verify that User redirected to Employee page When login as a employee
    Given user logs into the portal
    When user navigate to 'Position' page
    And user clicks on the brand logo
    Then verify user lands on 'Employees Organization' page

  @ER-4216 @ER-4370 @NAVIGATION
  Scenario: Verify that the Dynamic Account Name is displayed upon user login to the application
    When user logs into the portal
    Then Verify that the Dynamic Account Name is displayed
