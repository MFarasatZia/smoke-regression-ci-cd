@backend
Feature: Roles > API

 @ER-5454 @ER-5562 @REGRESSION-API @ROLES-API
    Scenario: Verify the Active role count in the Side bar counts API
        Given the user call the Side bar counts API
        And user store the role count
        And that a role is in status 'Draft'
        When the user call the Side bar counts API
        Then verify the role count is same as the stored role count
        And that a role is in status 'Active'
        When the user call the Side bar counts API
        Then verify the role count is increased by 1
        And user tries to retired the role
        When the user call the Side bar counts API
        Then verify the role count is decreased by 1

 @ER-5415 @ER-5567 @REGRESSION-API @ROLES-API
    Scenario: Verify V2 API pagination with limit and offset parameters for roles
        Given that a role is in status 'Active'
        And user calls the getRoles API with limit 10 and offset 0
        Then verify the role response contains at most 10 records
        And verify the role response contains pagination metadata
        And verify the role response count matches the total number of roles
        When user calls the getRoles API with limit 10 and offset 10
        Then verify the role response contains at most 10 records
        And verify the role response contains pagination metadata

@ER-4535 @ER-4626 @REGRESSION-API @ROLES-API
    Scenario: Verify Role Responsibility Sequence Reordering via API
        Given that a role is in status 'Active'
        And user creates 3 responsibilities for sequence reordering
        When user attaches all 3 responsibilities to the role
        And user calls the sequence reorder API with reordered responsibility IDs
        Then verify the new order of responsibilities in the role response

@ER-5588 @ER-5712 @REGRESSION-API @ROLES-API
    Scenario: verify the filter by name in the response for roles and responsibilities
    Given that a role is in status 'Active'
    And that a responsibility is in status 'Active'
    When user calls the getRoles API with query params "?name=name"
    And verify the status for role to be 200
    Then verify the role name is in the response
    And user calls the getResponsibilities API with query params "?name=name"
    And verify the responsibility status to be 200
    And verify the responsibility name is found in the response
