@backend
Feature: Account > Organization > Employees > API

  @ER-13 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify the access for the email does not exist
    When user call the check-access API with email does not exist in the system
    Then response return existing user is equal to null

  # @ER-13 @REGRESSION-API @EMPLOYEES-API @api_issues
  # Scenario: Test availability of email when user is already linked to an employee
  #   Given that a employee is in status 'Active'
  #   And user calls the user-create API for the employee
  #   When calling the check-access API for the respective user
  #   Then you return existing employee

  @ER-13 @REGRESSION-API @EMPLOYEES-API
  Scenario: Test availability of email When user has access and is not linked to an employee
    When user has access but it is not linked to an employee and you call the check-access API
    Then you return existing access
    And employee is null

  @ER-58 @ER-3575 @REGRESSION-API @EMPLOYEES-API
  Scenario: List all Employee Badge
    Given user has Employee with proficiency badge
    When User call list Employee badges API
    And Verfiy response has issued_for field
    And Verfiy response has issues_to field
    Then list all badges for particular Employee should be listed

  @ER-201 @ER-3575 @ER-1370 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify List of Employees not having a current badge for a specific responsibility
    Given user has a employee
    When User call list Employee without badges API
    Then list all employee that dont have badge assigned

  @ER-187 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify Listing all the employee should have additional keys
    Given user has Employee with proficiency badge
    And Verfiy response has issued_for field
    And Verfiy response has issues_to field
    When the User list all employee via API
    Then additional keys should exist in all employee

  @ER-187 @ER-3745 @REGRESSION-API @EMPLOYEES-API @SMOKE-API
  Scenario: Verify Listing all the employee additional keys verification
    Given user has Employee with proficiency badge
    And response return the badge Id
    And Position is in status 'Active'
    And User assign the position to Employee
    When the User list all employee via API
    Then verify the employee to contain details

  @ER-204 @WIP @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify Grant a proficiency badge via API
    Given that an employee does not have a current badge for a specific responsibility
    When user create a proficiency badge
    Then a proficiency badge is created
    And response return the badge Id

  @ER-204 @WIP @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify Grant proficiency badge return error
    Given that employee has a proficiency badge created
    When user create a proficiency badge
    Then employee api response should be "this employee has already a badge for this responsibility. Only badge with higher level is allowed"
  
  @ER-3199 @ER-3416 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify Message when employee is not in archived status
    Given that a employee is in status 'Terminated'
    When user calls the Un-Archive employee API
    Then verify status for archive employee API to be 400
    And verify the error message for the archive employee api to be 'You can only unarchive an archived employee.'
  
   @ER-4365 @ER-5235 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify `expiration_date` and `expires_in_days_from_becoming_obsolete` fields in the Create Badge API response.
    Given that a employee is in status 'Active'
    And user have responsibility is in status 'Active'
    When User calls the create badge for level 4 employee API
    Then verify that 'expiration_date' field is present
    And verify 'expires_in_days_from_becoming_obsolete' field is present
    And User calls the Get Responsibility List API
    And verify the employee appears in the masters list