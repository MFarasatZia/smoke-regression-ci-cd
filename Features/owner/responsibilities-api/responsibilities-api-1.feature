@backend
Feature: Responsibilities > API

@ER-108 @ER-353 @REGRESSION-API @SMOKE-API @RESPONSIBILITY-API
  Scenario: Verify Creating a New Responsibility via API
    When user create a responsibility via API
    Then verify the responsibility status to be 201
    And Responsibility status to be 'Draft'

  @ER-86 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify Activating a Responsibility via API
    Given that a responsibility is in status 'Draft'
    When user 'Active' the Responsibility via API
    Then verify the responsibility status to be 200
    And Responsibility status to be 'Active'

  @ER-86 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify Activating a Responsibility via API when status is not draft
    Given that a responsibility is not in status 'Draft'
    When user 'Active' the Responsibility via API
    Then verify the responsibility status to be 400
    And response should be 'Only draft responsibility can be activated'

  @ER-87 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify Retire a Responsibility via API
    Given that a responsibility is in status 'Active'
    When user 'Retire' the Responsibility via API
    Then verify the responsibility status to be 200
    And Responsibility status to be 'Retired'

  @ER-87 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify Retire a Responsibility via API when status is not active
    Given that a responsibility is not in status 'Active'
    When user 'Retire' the Responsibility via API
    Then verify the responsibility status to be 400
    And response should be 'Only active responsibility can be retired'

  @ER-90 @ER-395 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify Re-activating the Retired Responsibility via API
    Given that a responsibility is in status 'Retired'
    When user 'Re-activate' the Responsibility via API
    Then verify the responsibility status to be 200
    And Responsibility status to be 'Active'

  @ER-90 @ER-398 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify Re-activating the Inactive Responsibility via API
    Given that a responsibility is in status 'Inactive'
    When user 'Re-activate' the Responsibility via API
    Then verify the responsibility status to be 200
    And Responsibility status to be 'Active'

  @ER-90 @ER-396 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify Re-activating Responsibility that not in Inactive Status via API
    Given that a responsibility is not in status 'Inactive'
    When user 'Re-activate' the Responsibility via API
    Then verify the responsibility status to be 400
    And response should be 'Only inactive and retired responsibilitys can be reactivated'

  @ER-90 @ER-397 @REGRESSION-API @RESPONSIBILITY-API   
  Scenario: Verify Re-activating the Responsibility that is not in status Retired via API
    Given that a responsibility is not in status 'Retired'
    When user 'Re-activate' the Responsibility via API
    Then verify the responsibility status to be 400
    And response should be 'Only inactive and retired responsibilitys can be reactivated'

  @ER-89 @ER-399 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Verify De-activating the Active Responsibility via API
    Given that a responsibility is in status 'Active'
    When user 'De-activate' the Responsibility via API
    Then verify the responsibility status to be 200
    And Responsibility status to be 'Inactive'
