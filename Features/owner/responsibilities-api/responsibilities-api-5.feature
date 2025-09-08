@backend
Feature: Responsibilities > API > Badge Level Filtering

@ER-5412 @ER-5586 @REGRESSION-API @RESPONSIBILITY-API 
  Scenario: Filter responsibilities by badges absence
    Given user calls the responsibility API with "no_masters" filter
    Then verify only responsibilities without "masters" are returned
    When user calls the responsibility API with "no_coaches" filter
    Then verify only responsibilities without "coaches" are returned
    When user calls the responsibility API with "no_professionals" filter
    Then verify only responsibilities without "professionals" are returned

@ER-5412 @ER-5587 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Filter responsibilities by archival status
    Given that a responsibility is in status 'retired'
    And user calls the archive responsibility API
    When filtering by "?archived=true"
    Then only responsibilities matching the archival state are returned
    When filtering by "?archived=false"
    Then only responsibilities matching the archival state are returned 
    And that a responsibility is in status 'active'
    When filtering responsibilities by "?attachments=no"
    Then only responsibilities with no role attachments are returned

@ER-5412 @ER-5589 @REGRESSION-API @RESPONSIBILITY-API
  Scenario: Recently status-based filters
    Given filtering responsibilities by recent status "?recently_activated=true"
    Then only responsibilities with the relevant status
    When filtering responsibilities by recent status "?recently_retired=true"
    Then only responsibilities with the relevant status 
    When filtering responsibilities by recent status "?recently_deactivated=true"
    Then only responsibilities with the relevant status