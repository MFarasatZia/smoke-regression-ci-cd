@backend
Feature: Account > Settings > Configurations > API

  @ER-2558  @ER-3237 @ER-3134 @REGRESSION @SETTINGS-Configurations-API @DA @COMPLETED
  Scenario: Verify countries list API
    When user calls the countries list API
    Then verify response for countries list API call is 200
    And verify response structure for the country list response body

  @ER-3236 @ER-3696 @REGRESSION @SETTINGS-Configurations-API
  Scenario: Verify Delete country wide location from OperatingCountry
    Given User has an Operating Country
    When user call the Get Operating Country API
    Then Verify that 'country_wide_location' is not in the response
    And User call the Chatter API for the Operating Country
    And verify response structure for the Operating Country Chatter API