@backend
Feature: Positions > API

    @ER-5415 @ER-5568 @REGRESSION-API @POSITION-API
    Scenario: Verify V2 API pagination with limit and offset parameters for positions
        Given that a position is in status 'Active'
        And user calls the getAllPositions API with limit 10 and offset 0
        Then verify the position response contains at most 10 records
        And verify the position response contains pagination metadata
        And verify the position response count matches the total number of positions
        When user calls the getAllPositions API with limit 10 and offset 10
        Then verify the position response contains at most 10 records
        And verify the position response contains pagination metadata
        And verify the position response contains different records than the previous request
    
    @ER-5632 @ER-5632 @REGRESSION-API @POSITION-API
    Scenario: Verify Filter by Name and Code_str in position view v2 endpoint
        Given that a position is in status 'Active'
        And User get All Positions filtered by position name
        When User calls the getAllPositions API filtered by code_str
        Then verify the position name is found in the response
        And verify the position code_str is found in the response
        And verify the position status is 'Active' in the response
        And verify all returned positions have the expected name
        And verify the position ID matches the created position
    
    @ER-5656 @ER-5677 @REGRESSION-API @POSITION-API
    Scenario: Verify the Filters in List Position API
        Given clear position IDs for bulk testing
        And that a position is in status 'Draft'
        And that a position is in status 'Active'
        And that a position is in status 'Retired'
        When user calls the getPositions API with query params "?ordering=name&status=draft&status=active&status=retired"
        And verify the response status is 200
        Then verify the position status is in the response
        And user calls the getPositions API with query params "?ordering=name&status=active&status=draft"
        And verify the response status is 200
        And verify the position status is in the response

    @ER-4535 @ER-4625 @REGRESSION-API @POSITION-API
    Scenario: Verify Position Role Sequence Reordering via API
        Given that a position is in status 'Active'
        And user creates 3 roles for sequence reordering
        When user attaches all 3 roles to the position
        And user calls the sequence reorder API with reordered role IDs
        Then verify the new order of roles in the position response

