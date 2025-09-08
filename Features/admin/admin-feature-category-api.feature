@backend
Feature: Admin > Feature Category > API

  @ER-2886 @ER-3176 @REGRESSION-API @SMOKE-API @ADMIN-FEATURE-CATEGORY-API @COMPLETED
  Scenario: Verify feature category post API
    When user calls the category feature post API
    Then verify the response status code for the category feature create API is 201

  @ER-2886 @ER-3177 @REGRESSION-API @SMOKE-API @ADMIN-FEATURE-CATEGORY-API @COMPLETED
  Scenario: Verify feature category get API
    Given that a category feature exists
    When user calls the category feature get API
    Then verify the response for the category feature get API is 200
    And verify the response body for the category feature get API contains the expected elements

  @ER-2879 @ER-3193 @REGRESSION-API @SMOKE-API @ADMIN-FEATURE-CATEGORY-API
  Scenario: Verify feature category post, global feature post, and get API
    Given user calls the category feature post API
    And user calls the global feature post API
    And user calls the global feature read API
    Then verify the global feature details are returned
