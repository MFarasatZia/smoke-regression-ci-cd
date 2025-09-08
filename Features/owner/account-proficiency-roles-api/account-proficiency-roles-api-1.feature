@backend
Feature: Roles > API


  @ER-1938 @ER-361 @REGRESSION-API @ROLES-API
  Scenario: Verify role chatter list returns maximum 10 entries
    Given that a role has 20 posts to chatter
    When user calls the chatter list API for the role
    Then verify the status for Role Chatter list to be 200
    And count of entries for the role chatter should be 10
    And count of total role chatter should be 20

  @ER-1940 @ER-179 @ER-1297 @REGRESSION-API @ROLES-API
  Scenario: Verify detach responsibility from role API
    Given that a role is in status 'Draft'
    And that a responsibility is in status 'Draft'
    When user calls the attach responsibility to role API
    And user calls the detach API to detach a 'attached' responsibility from a role
    Then verify the status for role to be 200
    And verify the responseBody for the detach responsibility from role API doesn't contain the attachment details

  @ER-1941 @ER-179 @ER-1298 @REGRESSION-API @ROLES-API
  Scenario: Verify detaching responsibility from role API when responsibility is not attached results in error
    Given that a role is in status 'Draft'
    And that a responsibility is in status 'Draft'
    When user calls the detach API to detach a 'detached' responsibility from a role
    Then verify the response for the attach responsibility to role API is 400
    And verify error message for detach responsibility from role API is 'This responsibility is not attached to this role.'

  @ER-1879 @REGRESSION @ROLES-API
  Scenario: Verify proficiency badge can be granted via API
    Given user is an employee without a current badge
    When user grant proficiency badge
    Then Verify the return badge_id
    And Verify Response Has Specific Properties

  @ER-1880 @REGRESSION @SMOKE @ROLES-API
  Scenario: Verify a proficiency badge cannot be granted to a user who already possesses one
    Given User is an employee that has current badge
    When user grant proficiency badge
    Then Verify the response error "this employee has already a badge for this responsibility. Only badge with higher level is allowed"

  @ER-3058 @ER-3394 @REGRESSION @ROLES-API
  Scenario: Verify archive role API
    Given that a role is in status 'Retired'
    When user calls the archive role API
    Then verify status for archive role API to be 200
    And verify the role is archived

  @ER-3058 @ER-3395 @REGRESSION @ROLES-API
  Scenario: Verify archive role API returns error when role status is not retired
    Given that a role is not in status 'Retired'
    When user calls the archive role API
    Then verify status for archive role API to be 400
    And verify the error message for the archive role api to be 'You cannot archive a non-retired role.'
  
  @ER-3199 @ER-3394 @REGRESSION @ROLES-API
  Scenario: Verify archive role API
    Given that a role is in status 'Retired'
    When user calls the archive role API
    And user calls the unarchive role API
    Then verify status for archive role API to be 200
    And verify the role is unarchived

  @ER-3199 @ER-3395 @REGRESSION @ROLES-API
  Scenario: Verify archive role API returns error when role status is not retired
    Given that a role is not in status 'Retired'
    When user calls the unarchive role API
    Then verify status for archive role API to be 400
    And verify the error message for the archive role api to be 'You can only unarchive an archived role.'