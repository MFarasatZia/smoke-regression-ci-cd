@backend
Feature: Positions > API

    @ER-4257 @ER-5291 @REGRESSION-API @POSITION-API
    Scenario: Verify the Bulk Retire Action for Positions
        Given clear position IDs for bulk testing
        And that a position is in status 'Active'
        And that a position is in status 'Active'
        When user calls the bulk "retire" action API
        Then verify the bulk "retire" action API returns 200
        And verify bulk "retire" response contains position details
        And verify all positions are "retired"

    @ER-4257 @ER-5292 @REGRESSION-API @POSITION-API
    Scenario: Verify the Bulk Archive Action for Positions
        Given clear position IDs for bulk testing
        And that a position is in status 'Retired'
        And that a position is in status 'Retired'
        When user calls the bulk "archive" action API
        Then verify the bulk "archive" action API returns 200
        And verify bulk "archive" response contains position details
        And verify all positions are "archived"

    @ER-4257 @ER-5293 @REGRESSION-API @POSITION-API
    Scenario: Verify the Bulk Unarchive Action for Positions
        Given clear position IDs for bulk testing
        And that a position is in status 'Archived'
        And that a position is in status 'Archived'
        When user calls the bulk "unarchive" action API
        Then verify the bulk "unarchive" action API returns 200
        And verify bulk "unarchive" response contains position details
        And verify all positions are "unarchived"

    @ER-4257 @ER-5294 @REGRESSION-API @POSITION-API
    Scenario: Verify the Bulk Reactivate Action for Positions
        Given clear position IDs for bulk testing
        And that a position is in status 'Active'
        And that a position is in status 'Active'
        When user calls the bulk "retire" action API
        Then verify the bulk "retire" action API returns 200
        When user calls the bulk "reactivate" action API
        Then verify the bulk "reactivate" action API returns 200
        And verify bulk "reactivate" response contains position details
        And verify all positions are "active"

    @ER-4257 @ER-5295 @REGRESSION-API @POSITION-API
    Scenario: Verify the Bulk Delete Action for Positions
        Given clear position IDs for bulk testing
        And that a position is in status 'Draft'
        And that a position is in status 'Draft'
        When user calls the bulk "delete" action API
        Then verify the bulk "delete" action API returns 200
        And verify all positions are "deleted"

    @ER-5158 @ER-5520 @REGRESSION-API @POSITION-API
    Scenario: Verify the Get Position API response structure
        Given user create an employee and a position via API
        When user call the position-assignment API
        And user call the list position API
        Then verify that fields are visible in the position response
    
    @ER-5400 @ER-5531 @REGRESSION-API @POSITION-API
    Scenario: Verify the Get Position API response with no position assignment
        Given that a position is in status 'Active'
        When the user calls the get position API with no position assignment
        Then verify that position response with no position assignment

    @ER-5426 @ER-5539 @REGRESSION-API @POSITION-API
    Scenario: Verify multiple employees assigned to same position with different commitments
        Given user create an employee and a position via API
        When user assigns the position to the first employee with commitment 1
        And user creates a second active employee
        And user assigns the same position to the second employee with commitment 3
        And user calls the getAllPositions API
        Then verify the getAllPositions response contains both employees with correct commitments

    @ER-5454 @ER-5558 @REGRESSION-API @POSITION-API
    Scenario: Verify the Active position count in the Side bar counts API
        Given the user call the Side bar counts API
        And user store the position count
        And that a position is in status 'Draft'
        When the user call the Side bar counts API
        Then verify the position count is same as the stored position count
        And that a position is in status 'Active'
        When the user call the Side bar counts API
        Then verify the position count is increased by 1
        And user tries to retired the position
        When the user call the Side bar counts API
        Then verify the position count is decreased by 1

    @ER-4815 @ER-5573 @REGRESSION-API @POSITION-API
    Scenario: Verify getAllPositions API filters positions by status correctly
        Given that a position is in status 'Active'
        And that a position is in status 'Retired'
        When user calls the getPositions API with query params "?status=active"
        Then verify the response status is 200
        And verify the response contains active positions and excludes retired positions