@backend
Feature: Account > Organization > Employees > API

@ER-507 @ER-1632 @AUTOMATED @EMPLOYEES-API
  Scenario: Verify that values of readiness of the role and its responsibilities assignments
    Given that a employee is in status 'draft'
    And User has Role
    And user have responsibility is in status 'Draft'
    When user attach responsibility to role via API
    And User assign the Role to employee
    Then Re-calculate the overall readiness of the role

  @ER-507 @ER-1633 @AUTOMATED @EMPLOYEES-API
  Scenario: Verify that Grant first Badge to Responsibility
    Given that a employee is in status 'draft'
    And User has Role
    And user have responsibility is in status 'Draft'
    When user attach responsibility to role via API
    And user have responsibility is in status 'Draft'
    And user attach responsibility to role via API
    And User assign the Role to employee
    And user Grant badge to employee without responsibility creation
    And User refetch the role assignment object for readiness
    Then Re-calculate the overall readiness of the role

  @ER-507 @ER-1635 @AUTOMATED @EMPLOYEES-API
  Scenario: Verify that values of readiness changed after remove one badge
    Given that a employee is in status 'draft'
    And User has Role
    And user have responsibility is in status 'Draft'
    When user attach responsibility to role via API
    And user have responsibility is in status 'Draft'
    And user attach responsibility to role via API
    And User assign the Role to employee
    And user Grant badge to employee without responsibility creation
    And User remove one badge
    And User refetch the role assignment object for readiness
    Then Re-calculate the overall readiness of the role

  @ER-577 @ER-1830 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify The Status should be Pending when user create Evaluation Request
    Given that a employee is in status 'draft'
    When user have responsibility is in status 'Draft'
    Then create evaluation_request
    And set status to be "pending"

  @ER-577 @ER-1831 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify Error when a current request already exists
    Given that a employee is in status 'draft'
    When user have responsibility is in status 'Draft'
    And create evaluation_request
    And create evaluation_request
    Then the evaluation error "A current request already exists."

  @ER-577 @ER-1832 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify The Status should be Accepted when user create Evaluation Request
    Given that a employee is in status 'draft'
    When user have responsibility is in status 'Draft'
    And create evaluation_request
    Then Accept the Evaluation Request
    And set status to be "accepted"

  @ER-577 @ER-1833 @REGRESSION-API @EMPLOYEES-API
  Scenario: Abandon the evaluation request
    Given that a employee is in status 'draft'
    When user have responsibility is in status 'Draft'
    And create evaluation_request
    Then Abondon the Evaluation Request
    And set status to be "abandoned"

  @ER-577 @ER-1834 @REGRESSION-API @EMPLOYEES-API
  Scenario: Abandon the evaluation request
    Given that a employee is in status 'draft'
    When user have responsibility is in status 'Draft'
    And create evaluation_request
    Then Done the Evaluation Request
    And set status to be "done"

  @ER-577 @ER-1835 @REGRESSION-API @EMPLOYEES-API
  Scenario: Cancel the evaluation request
    Given that a employee is in status 'draft'
    When user have responsibility is in status 'Draft'
    And create evaluation_request
    Then Cancel the Evaluation Request
    And set status to be "cancelled"

  # @ER-1642 @ER-2304 @REGRESSION @EMPLOYEES-API @COMPLETED
  # Scenario: Verify endpoints for valid linked employees
  #   When user checks linked employees for 'valid email' through API
  #   Then user should get all expected values to be 'true'
  #   And status should be 'operational'