@backend
Feature: Account > Banner > API

    @ER-2824 @ER-3227 @REGRESSION @BANNER-API
    Scenario: Verify new data is created when user remove removable_banner through API
        Given user creates a removable_banner
        When user call the api to remove the removable_banner
        Then verify the response is 200
        And verify banner key is visible in the response
        And verify removed_by key is visible in the response
        And verify removed_on key is visible in the response

    @ER-2823 @ER-3056 @REGRESSION @BANNER-API
    Scenario: Verify removable_banner class API
        Given user creates a removable_banner
        When user call API for removable banner list
        And verify the response is 200
        Then User calls the Removable Banner Read API and verifies the response fields

    @ER-2831 @ER-3408 @REGRESSION @BANNER-API
    Scenario: Verify add_removable_banner(banner_id, text, subtext, learn_more, banner_type, lines) fields
        Given user creates an add removable banner
        When response of the API is 201
        Then verify response has banner_id
        Then verify response has text field
        Then verify response has sub_text field
        Then verify response has learn_more field
        Then verify response has banner_type
        Then verify response has line field
        Then verify response has created_by field
        Then verify response has created_on field


