@backend
Feature: Roles > API

  @ER-1919 @ER-84 @REGRESSION-API @ROLES-API
  Scenario: Detach Active Role via API
    Given Active role is attached to the position
    When detach API to detach a 'attached' role from a position
    Then User Verify the return success is 404

  @ER-5181 @ER-1921 @ER-36 @REGRESSION-API @ROLES-API
  Scenario: Verify Role Endpoint returns minimal fields for each role
    Given role is in status draft
    When User activate role via API
    Then Verify that Response Body status is 'active'
    And User call the API get all roles for an account
    And verify the role response parameters structure
    And User receive the list of roles under the account
    
  @ER-1922 @ER-38 @REGRESSION-API @ROLES-API
  Scenario: Retire Role via API
    Given that role is in status active
    When User retire role via API
    Then Verify that Response Body status is 'retired'

  @ER-1923 @REGRESSION-API @ROLES-API
  Scenario: Attempt to activate when status is not draft
    Given that role is in status active
    When user 'Activate' the role via API
    Then role response status should 'Only draft role can be activated.'
    And User delete the role
    Then User Verify the return success is 400

  @ER-1924 @ER-35 @REGRESSION-API @ROLES-API
  Scenario: Attempt to delete via API when role is attached
    Given Roles is Attached to Position
    When User delete the role
    Then User Verify the return success is 204

  @ER-1928 @ER-179 @ER-1296 @REGRESSION-API @ROLES-API
  Scenario: Verify attach responsibility to role API
    Given that a role is in status 'Draft'
    And that a responsibility is in status 'Draft'
    When user calls the attach responsibility to role API
    Then verify the response for the attach responsibility to role API is 201
    And user calls the attach responsibility to role API
    Then verify error message for attach responsibility to role API is "[ErrorDetail(string='An attachment with an object with the same name exists.', code='invalid')]"

  @ER-436 @ER-79 @REGRESSION-API @ROLES-API
  Scenario: Verify De-activating the Active Role via API
    Given that a role is in status 'Active'
    When user 'De-activate' the role via API
    Then verify the status for role to be 200
    And role response status should be 'Inactive'

  @ER-450 @ER-80 @REGRESSION-API @ROLES-API
  Scenario: Verify Re-Activate Role that not in Inactive Status via API
    Given that role is in status active
    When user 'Re-activate' the role via API
    Then role response should be 'Only inactive and retired roles can be reactivated.'

  @ER-1931 @ER-80 @REGRESSION-API @ROLES-API
  Scenario: Re-activate Role via API
    Given that role is in status Retired
    When user 'Re-activate' the role via API
    Then role response status should be 'active'

  @ER-1936 @ER-80 @REGRESSION-API @ROLES-API
  Scenario: Verify Re-Activate a Role
    Given that a role is in status 'De-activate'
    When user 'Re-activate' the role via API
    Then verify the status for role to be 200
    And role response status should be 'Active'


