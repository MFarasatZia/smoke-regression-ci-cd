@backend
Feature: Positions > API

@ER-1888 @ER-1984 @REGRESSION-API @POSITION-API
  Scenario: Verify user is able to Retire Position with status equal to Inactive via API
    Given that a position is in status 'Inactive'
    When user 'Retire' the position via api
    Then user receive the error code 400
    And position api error contains msg 'Only active position can be retired'

  @ER-1888 @ER-1894 @REGRESSION-API @POSITION-API
  Scenario: Verify user is able to Re-Activate Position from Retired via API
    Given that a position is in status 'Retired'
    When user 'Re-Activate' the position via api
    Then status for the poaition changes to 'Active'

  @ER-1888 @ER-1896 @REGRESSION-API @POSITION-API
  Scenario: Verify user is able to Re-Activate Position from Inactive via API
    Given that a position is in status 'Deactivate'
    When user 'Re-Activate' the position via api
    Then status for the poaition changes to 'Active'

  @ER-1888 @ER-1900 @REGRESSION-API @POSITION-API
  Scenario: Verify user is NOT able to Re-Activate Position from status not equal to Retired via API
    Given that a position is not in status 'Retired'
    When user 'Re-Activate' the position via api
    Then user receive the error code 400
    And position api error contains msg 'Only inactive and retired positions can be reactivated'

  @ER-1888 @ER-1985 @REGRESSION-API @POSITION-API
  Scenario: Verify user is NOT able to Re-Activate Position from status not equal to Inactive via API
    Given that a position is not in status 'Inactive'
    When user 'Re-Activate' the position via api
    Then user receive the error code 400
    And position api error contains msg 'Only inactive and retired positions can be reactivated'

  @ER-1888 @ER-1895 @REGRESSION-API @POSITION-API
  Scenario: Verify user is able to De-Activate Position via API
    Given that a position is in status 'Active'
    When user 'De-Activate' the position via api
    Then status for the poaition changes to 'Inactive'

  @ER-1888 @ER-1986 @REGRESSION-API @POSITION-API
  Scenario: Verify user is NOT able to De-Activate Position with status NOT eqaul to Active via API
    Given that a position is not in status 'Active'
    When user 'De-Activate' the position via api
    Then user receive the error code 400
    And position api error contains msg 'Only active position can be deactivated'

  @ER-1888 @ER-1987 @REGRESSION-API @POSITION-API
  Scenario: Verify user is NOT able to De-Activate Position with status eqaul to Inactive via API
    Given that a position is in status 'Inactive'
    When user 'De-Activate' the position via api
    Then user receive the error code 400
    And position api error contains msg 'Only active position can be deactivated'

  @ER-1888 @ER-1988 @REGRESSION-API @POSITION-API
  Scenario: Verify user is NOT able to De-Activate Position with status eqaul to Retired via API
    Given that a position is in status 'Retired'
    When user 'De-Activate' the position via api
    Then user receive the error code 400
    And position api error contains msg 'Only active position can be deactivated'

  @ER-1888 @ER-1897 @REGRESSION-API @SMOKE-API @POSITION-API
  Scenario: Verify user is able to Rename Position via API
    Given that a position is in status 'Active'
    When user 'Rename' the position via api
    Then position name should be replaced with the new name.