@backend
Feature: Account > Organization > Employees > API

  @READ-636 @REGRESSION-API @EMPLOYEES-API @SMOKE-API
  Scenario: Verify Creating employee via API
    When user creates an employee via API
    Then response return employee id
    And verify the employee email
    And the employee is in status draft
    And employee has availability equal to 1

  @READ-636 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify Activating a Employee via API
    Given that a employee is in status 'Draft'
    When user 'Active' the employee via API
    Then verify employee api status to be 200
    And employee status to be 'Active'

  @READ-636 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify Activating a Employee via API when status is not draft
    Given that a employee is not in status 'Draft'
    When user 'Active' the employee via API
    Then verify employee api status to be 400
    And employee response should be 'Only draft employees can be activated'

  @READ-636 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify Terminate Employee via API
    Given that a employee is in status 'Active'
    When user 'Terminate' the employee via API
    Then verify employee api status to be 200
    And employee status to be 'Terminated'

  @READ-636 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify Terminate Employee via API when status is not active
    Given that a employee is not in status 'Active'
    When user 'Terminate' the employee via API
    Then verify employee api status to be 400
    And employee response should be 'Only active employees can be terminated'

  @READ-636 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify Re-Activate Employee via API when status is Terminated
    Given that a employee is in status 'Terminated'
    When user 'Reactivate' the employee via API
    Then verify employee api status to be 200
    And employee status to be 'Active'

  @READ-636 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify Re-Activate Employee via API when status is not Terminated
    Given that a employee is not in status 'Terminated'
    When user 'Reactivate' the employee via API
    Then verify employee api status to be 400
    And employee response should be 'Only terminated employees can be reactivated'

  @READ-636 @REGRESSION-API @EMPLOYEES-API @SMOKE-API
  Scenario: Verify Deleting an employee via API
    Given that a employee is in status 'Draft'
    When user 'Delete' the employee via API
    Then you validate the employee was deleted

  @READ-636 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify Deleting an employee status not draft via API
    Given that a employee is in status 'Active'
    When user 'Delete' the employee via API
    Then verify the responseBody for Delete employee
    And employee response should be 'Only draft employees can be deleted'

  @ER-2980 @ER-3611 @ER-3463 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify response of Proficiency badge class has new fields
    Given user has Employee with proficiency badge
    When status of proficiency badge is 201
    Then verify response has is_current boolean true
    And verify response has removed_on field null
    And verify response has access_id field
    And verify response has level field
    And verify response has granted_by field
    And verify response has granted_method
    And verify response has removed_by field null
    And verify response has remove_method field null
    And verify response has master_will_coach boolean true
    And verify response has no replacing field
    And verify response has no replaced_by field
    And verify response has no replacement_impact field
