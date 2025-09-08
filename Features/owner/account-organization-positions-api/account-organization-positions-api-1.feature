@backend
Feature: Positions > API

  @ER-1888 @ER-1890 @REGRESSION-API @SMOKE-API @POSITION-API
  Scenario: Verify user is able to Create a Position via API
    When user create a position through api
    Then user receive back position id
    And status for the poaition changes to 'Draft'

  @ER-1888 @ER-1891 @REGRESSION-API @POSITION-API
  Scenario: Verify user is able to Activate Position via API
    Given that a position is in status 'Draft'
    When user 'Activate' the position via api
    Then status for the poaition changes to 'Active'

  @ER-1888 @ER-1899 @REGRESSION-API @POSITION-API
  Scenario: Verify user is able to Activate Position with status not equal to draft via API
    Given that a position is not in status 'Draft'
    When user 'Activate' the position via api
    Then user receive the error code 400
    And position api error contains msg 'Only draft position can be activated'

  @ER-1888 @ER-1892 @REGRESSION-API @SMOKE-API @POSITION-API
  Scenario: Verify user is able to Delete position with status equal to draft via API
    Given that a position is in status 'Draft'
    When user 'Delete' the position via api
    Then verify that position was deleted

  @ER-1888 @ER-1901 @REGRESSION-API @POSITION-API
  Scenario: Verify user is NOT able to Delete position with status equal to draft via API
    Given that a position is not in status 'Draft'
    When user 'Delete' the position via api
    Then user receive the error code 400
    And position api error contains msg 'Only draft positions can be deleted'

  @ER-1888 @ER-1981 @REGRESSION-API @POSITION-API
  Scenario: Verify user is NOT able to Delete position with status equal to Retired via API
    Given that a position is in status 'Retired'
    When user 'Delete' the position via api
    Then user receive the error code 400
    And position api error contains msg 'Only draft positions can be deleted'

  @ER-1888 @ER-1982 @REGRESSION-API @POSITION-API
  Scenario: Verify user is NOT able to Delete position with status equal to Inactive via API
    Given that a position is in status 'Inactive'
    When user 'Delete' the position via api
    Then user receive the error code 400
    And position api error contains msg 'Only draft positions can be deleted'

  @ER-1888 @ER-1893 @REGRESSION-API @POSITION-API
  Scenario: Verify user is able to Retire Position with status Active via API
    Given that a position is in status 'Active'
    When user 'Retire' the position via api
    Then status for the poaition changes to 'Retired'

  @ER-1888 @ER-1902 @REGRESSION-API @POSITION-API
  Scenario: Verify user is NOT able to Retire Position with status not equal to Active via API
    Given that a position is not in status 'Active'
    When user 'Retire' the position via api
    Then user receive the error code 400
    And position api error contains msg 'Only active position can be retired'

  @ER-1888 @ER-1983 @REGRESSION-API @POSITION-API
  Scenario: Verify user is able to Retire Position with status equal to Retired via API
    Given that a position is in status 'Retired'
    When user 'Retire' the position via api
    Then user receive the error code 400
    And position api error contains msg 'Only active position can be retired'
