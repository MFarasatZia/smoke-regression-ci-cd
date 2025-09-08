@backend
Feature: Account > Organization > Employees > API

  @ER-573 @ER-947 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify Return an error when an evaluation exists and the status is not "reset"
    Given User has a Employee
    And User have a Checkpoint in status 'draft'
    And User create an checkpoint evaluation for 'failed'
    And that a checkpoint evaluation exists for 'passed'
    Then Verify the evaluation error "Evaluation exists and is not reset"

  @ER-573 @ER-948 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify after Update the evaluation status to "Failed" when an evaluation with status "reset" exists
    Given User has a Employee
    And User have a Checkpoint in status 'draft'
    And User create an checkpoint evaluation for 'failed'
    And User create an checkpoint evaluation for 'reset'
    And that a checkpoint evaluation exists for 'failed'
    Then Verify set the evaluation reason to be 'Test'

  @ER-573 @ER-949 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verified the Reson Fieild Should be Present For Not Applicable checkpoint Evalaution
    Given User has a Employee
    And User have a Checkpoint in status 'draft'
    When User create an checkpoint evaluation for 'not_applicable'
    And Set status to 'not_applicable'
    Then Verify set the evaluation reason to be "Test"

  @ER-573 @ER-950 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify Return an error when an evaluation exists and its status is not "reset"
    Given User has a Employee
    And User have a Checkpoint in status 'draft'
    And User create an checkpoint evaluation for 'not_applicable'
    And that a checkpoint evaluation exists for 'failed'
    Then Verify the evaluation error "Evaluation exists and is not reset"

  @ER-573 @ER-951 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify Update the evaluation status to "Not Applicable" when an evaluation with status "reset" exists
    Given User has a Employee
    And User have a Checkpoint in status 'draft'
    When User create an checkpoint evaluation for 'not_applicable'
    And that a checkpoint evaluation exists for 'reset'
    And that a checkpoint evaluation exists for 'not_applicable'
    Then Verify set the evaluation reason to be 'Test'

  @ER-573 @ER-952 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify return an error "Evaluation exists and is not reset"
    Given User has a Employee
    And User have a Checkpoint in status 'draft'
    When User create an checkpoint evaluation for 'reset'
    Then Verify the evaluation error 'Evaluation does not exist.'

  @ER-573 @ER-953 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify evaluation status is “fail” and reason is null
    Given User has a Employee
    And User have a Checkpoint in status 'draft'
    And User create an checkpoint evaluation for 'reset'
    And that a checkpoint evaluation exists for 'passed'
    And that a checkpoint evaluation exists for 'reset'
    Then Verify set the evaluation reason to be 'null'

  @ER-573 @ER-954 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify evaluation status is “pass” and reason is null
    Given User has a Employee
    And User have a Checkpoint in status 'draft'
    And User create an checkpoint evaluation for 'reset'
    And that a checkpoint evaluation exists for 'failed'
    And that a checkpoint evaluation exists for 'reset'
    Then Verify set the evaluation reason to be 'null'

  @ER-573 @ER-955 @REGRESSION-API @EMPLOYEES-API
  Scenario: Verify evaluation status is “Not Applicable” and reason is null
    Given User has a Employee
    And User have a Checkpoint in status 'draft'
    And User create an checkpoint evaluation for 'reset'
    And that a checkpoint evaluation exists for 'not_applicable'
    And that a checkpoint evaluation exists for 'reset'
    Then Verify set the evaluation reason to be 'null'

  @ER-573 @ER-956 @auto @EMPLOYEES-API
  Scenario: Verify return error “Evaluation is already reset”
    Given User has a Employee
    And User have a Checkpoint in status 'draft'
    And that a checkpoint evaluation exists for 'passed'
    And User create an checkpoint evaluation for 'reset'
    And User create an checkpoint evaluation for 'reset'
    Then Verify the evaluation error 'Evaluation does not exist.'