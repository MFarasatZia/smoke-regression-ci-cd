@backend
Feature: Responsibilities > API

  @ER-57 @ER-815 @REGRESSION @RESPONSIBILITY-API
  Scenario: Verify user is not able to assign two badges to same account
    Given that an employee has a current badge for a specific responsibility
    When user try to assign another badge to the same account via API
    Then response return status to be 400
    And response body shoudl conatin error "You can only have one active badge per employee per responsibility."

  @ER-3058 @ER-3396 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify archive responsibility API
    Given that a responsibility is in status 'Retired'
    When user calls the archive responsibility API
    Then verify status for archive responsibility API to be 200
    And verify the responsibility is archived
    When user calls the getAllResponsibilitiesV2 API
    Then verify the archived responsibility has archived true

  @ER-3058 @ER-3397 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify archive responsibility API returns error when responsibility status is not retired
    Given that a responsibility is not in status 'Retired'
    When user calls the archive responsibility API
    Then verify status for archive responsibility API to be 400
    And verify the error message for the archive responsibility api to be 'You cannot archive a non-retired responsibility.'

  @ER-3199 @ER-3421 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify unrchive responsibility API
    Given that a responsibility is in status 'Retired'
    When user calls the archive responsibility API
    And user calls the unarchive responsibility API
    Then verify status for archive responsibility API to be 200
    And verify the responsibility is unarchived

  @ER-3199 @ER-3422 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify Message when Responsibility is not in archived status
    Given that a responsibility is not in status 'Retired'
    When user calls the unarchive responsibility API
    Then verify status for archive responsibility API to be 400
    And verify the error message for the archive responsibility api to be 'You can only unarchive an archived responsibility.'

  @ER-2939 @ER-3620 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify the Responsibility history of badge holders API
    Given that a responsibility is in status 'Active'
    And User Have A Employee
    When user grant badge to responsibility
    Then User Call The Resposnibility History Badge API
    And response has issued_on
    And response has issued_by

  @ER-2993 @ER-3976 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify active responsibility api has activated by and activated on values.
    Given that a responsibility is in status 'Active'
    When user calls the get responsibility api
    Then verify Responsibility response has activated_by field
    And verify Responsibility response has activated_on field

  @ER-2993 @ER-3979 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify archive responsibility api has archived by and archived on values.
    Given that a responsibility is in status 'Retired'
    When user calls the archive responsibility API
    And user calls the get responsibility api
    Then verify archive Responsibility response has archived_by field
    And verify archive Responsibility response has archived_on field

  @ER-2993 @ER-3982 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify De-Activate Responsibility api has removed by and removed on values.
    Given that a responsibility is in status 'Active'
    And user 'De-activate' the Responsibility via API
    When user calls the get responsibility api
    Then verify de-activated Responsibility response has removed_by field
    And verify de-activated Responsibility response has removed_on field

  @ER-2993 @ER-3985 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify retired responsibility api has removed by and removed on values.
    Given that a responsibility is in status 'Active'
    And user 'Retire' the Responsibility via API
    When user calls the get responsibility api
    Then verify retired responsibility response has removed_by field
    And verify retired responsibility response has removed_on field