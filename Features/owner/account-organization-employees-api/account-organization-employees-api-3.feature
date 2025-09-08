@backend
Feature: Account > Organization > Employees > API

  @ER-422 @REGRESSION-API @EMPLOYEES-API @SMOKE-API
  Scenario: Verify Grant a badge to an Employee return error
    Given that a employee is in status 'Active'
    When user Grant badge to employee
    And granted badge again to employee
    Then verify employee api status to be 400
    And employee api response should be 'this employee has already a badge for this responsibility. Only badge with higher level is allowed'

  @ER-361 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify posting to employee chatter
    Given that a employee is in status 'Draft'
    When you post to employee chatter
    Then you return response for Employee status to be 201
    And the note for employee

  @ER-361 @REGRESSION @EMPLOYEES-API
  Scenario: Verify employee chatter list returns maximum 10 entries
    Given that a employee has 20 posts to chatter
    When user calls the chatter list API for the employee
    Then verify the status for Employee Chatter list to be 200
    And verify count of entries for the employee chatter should be 10
    And verify count of total employee chatter should be greater or equal to 21

  @ER-361 @REGRESSION @EMPLOYEES-API
  Scenario: Verify employee chatter test data
    Given that a employee has 10 posts to chatter
    When user calls the chatter list API for the employee
    Then verify the status for Employee Chatter list to be 200
    And verify count of entries for the employee chatter should be 10
    And verify count of total employee chatter should be greater or equal to 10

  @ER-365 @ER-3575 @ER-872 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify Responsibility assigned to Employee
    Given that employee has a proficiency badge created
    And Verfiy response has issued_for field
    And Verfiy response has issues_to field
    When the user assign the Responsibility to employee
    Then return the Responsibility assignment id

  @ER-498 @ER-874 @ER-3575 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify Role assigned to Employee
    Given that employee has a proficiency badge created
    And Verfiy response has issued_for field
    And Verfiy response has issues_to field
    And User has Role
    When User assign the Role to employee
    Then Return the Role assignment id

  @ER-573 @ER-943 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify Pass when no existing evaluation
    Given user has Employee with proficiency badge
    And User have a Checkpoint in status 'draft'
    When User create an checkpoint evaluation for 'passed'
    And Set status to 'passed'

  @ER-573 @ER-944 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify Pass when evaluation exists and is not reset
    Given user has Employee with proficiency badge
    And User have a Checkpoint in status 'draft'
    And User create an checkpoint evaluation for 'passed'
    And that a checkpoint evaluation exists for 'passed'
    Then Verify the evaluation error 'Evaluation exists and is not reset.'

  @ER-573 @ER-945 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify Pass when evaluation exists and is reset
    Given user has Employee with proficiency badge
    And User have a Checkpoint in status 'draft'
    And User create an checkpoint evaluation for 'reset'
    And that a checkpoint evaluation exists for 'passed'
    And Set status to 'passed'

  @ER-573 @ER-946 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verified the Reson Fieild Should be Present For Failed checkpoint Evalaution
    Given user has Employee with proficiency badge
    And User have a Checkpoint in status 'draft'
    When User create an checkpoint evaluation for 'failed'
    And Set status to 'failed'
    Then Verify set the evaluation reason to be "Test"