@backend
Feature: Responsibilities > API

  @ER-3591 @ER-4125 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify the Catalogs Dashboard non OLAP KPIs
    Given that a responsibility is in status 'Active'
    When user has an Role
    Then User Call The account Catalogs List API and store initial no_professional count
    And Verify the response body for account catalogs List

  @ER-4128 @ER-4359 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify granted_by, issued_for and removed_by fields are visible in responsibility badge endpoint
    Given that a employee is in status 'Active'
    And that a responsibility is in status 'Active'
    When user grants badge to the responsibility
    Then verify granted_by field is visible and has values in the response
    And verify issued_for field is visible and has values in the response
    And user call the remove badge API
    And verify removed_by field is visible and has values in the response

  @ER-4132 @ER-4614 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify the Upgrade badge API
    Given that a employee is in status 'Active'
    And that a responsibility is in status 'Active'
    And user grants badge to the responsibility
    When user upgrades the badge using this API
    And verify the issued_by and Issued_on field
    Then the user gets the old badge by its ID via this API
    And user verify the response have remove reason and remove method property

  @ER-4756 @ER-5036 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify that the 'no_professional' count increases after upgrading the badge to Professional
    Given that a employee is in status 'Active'
    And that a responsibility is in status 'Active'
    And user has an Role
    And user grants badge to the responsibility
    And User Call The account Catalogs List API and store initial no_professional count
    And user upgrades the badge using this API
    When User Call The account Catalogs List API and store final no_professional count
    Then Verify the response body for account catalogs List
    And Verify that no_professional count has increased

  @ER-4616 @ER-4617 @ER-5281 @ER-5218 @REGRESSION @RESPONSIBILITY-API
  Scenario: verify that the Coach and Masters field exists in the get reponsibility API
    Given that a responsibility is in status 'Active'
    When user calls the get responsibility api
    Then verify that the Coach field exists in the get reponsibility API
    And verify that the Masters field exists in the get reponsibility API

  @ER-4922 @ER-4956 @REGRESSION @RESPONSIBILITY-API
  Scenario: verify that effective_on date is shown in response body
    Given that a employee is in status 'Active'
    And that a position is in status 'Active'
    When user assign position to employee with allocation and commitment 1
    And user call the list position API
    Then verify that effective_on date is shown in response body

  @ER-4922 @ER-4957 @REGRESSION @RESPONSIBILITY-API
  Scenario: verify that effective_by date is shown in response body
    Given that a employee is in status 'Active'
    And that a position is in status 'Active'
    When user assign position to employee with commitment 3
    And user call the list position API
    Then verify that effective_by date is shown in response body

  @ER-4764 @ER-5368 @ER-5385 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify that the 'not_attached_to_role' count behaviour for responsibilities
    Given User Call The account Catalogs List API and store initial not_attached_to_role count
    When user create a responsibility via API
    And User Call The account Catalogs List API and store final not_attached_to_role count
    Then Verify the response body for account catalogs List
    And Verify that not_attached_to_role count has not increased
    And that a responsibility is in status 'Active'
    And user has an Role
    And User Call The account Catalogs List API and store initial not_attached_to_role count
    When user assign role to responsibility via API
    And User Call The account Catalogs List API and store final not_attached_to_role count
    Then Verify the response body for account catalogs List
    And Verify that not_attached_to_role count has decreased

  @ER-4477 @ER-5363 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify the response for the OpenAI chat completion API is 200 OK
    Given the user has OpenAI chat compleation
    When the user calls the OpenAI chat compleation API
    Then verify status for OpenAI chat completion API to be 200
    And the user calls AskOpenAI via API
    And verify status for AskOpenAI chat completion API to be 200

  @ER-5455 @ER-5390 @ER-5536 @REGRESSION-API @RESPONSIBILITY-API @V2-API
  Scenario: Verify Get Responsibility via V2 API
    Given that a employee is in status 'Active'
    And that a position is in status 'Active'
    And User assign the position to Employee
    And that a responsibility is in status 'Active'
    And user has an Role
    And user activates the Role
    And user assign role to responsibility via API
    And user assign role to position via API
    And user calls the getAllResponsibilitiesV2 API
    Then verify novice_assignment_count is 1
    And user calls the create badge for level 1 employee API
    And user calls the getAllResponsibilitiesV2 API
    Then verify novice_assignment_count is 0
    And verify apprentice_assignment_count is 1
    And user calls the create badge for level 2 employee API
    And user calls the getAllResponsibilitiesV2 API
    Then verify apprentice_assignment_count is 0
    And verify professional_assignment_count is 1
    And user calls the create badge for level 3 employee API
    And user calls the getAllResponsibilitiesV2 API
    Then verify professional_assignment_count is 0
    And verify coach_assignment_count is 1
    And user calls the create badge for level 4 employee API
    And user calls the getAllResponsibilitiesV2 API
    Then verify coach_assignment_count is 0
    And verify master_assignment_count is 1
    When user calls the get responsibility v2 api
    Then verify the v2 get responsibility API response structure

  @ER-5454 @ER-5563 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify the Active responsibility count in the Side bar counts API
    Given the user call the Side bar counts API
    And user store the responsibility count
    And that a responsibility is in status 'Draft'
    When the user call the Side bar counts API
    Then verify the responsibility count is same as the stored responsibility count
    And that a responsibility is in status 'Active'
    When the user call the Side bar counts API
    Then verify the responsibility count is increased by 1
    And user retire responsibility via API
    When the user call the Side bar counts API
    Then verify the responsibility count is decreased by 1

  @ER-5415 @ER-5571 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify V2 API pagination of responsibilities with limit and offset parameters
    Given that a responsibility is in status 'Active'
    And user calls the getAllResponsibilitiesV2 API with limit 10 and offset 0
    Then verify the response contains at most 10 records
    And verify the response contains pagination metadata
    And verify the response count matches the total number of responsibilities
    When user calls the getAllResponsibilitiesV2 API with limit 10 and offset 10
    Then verify the response contains at most 10 records

