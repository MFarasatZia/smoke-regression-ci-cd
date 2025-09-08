Feature: Account > Organization > Positions

  @ER-1784 @ER-1915 @REGRESSION @POSITION
  Scenario: Verify the Chatter Count Tab
    Given User have a position
    And user navigate to 'position' page
    When user click on a specific Position
    And user reaches the 'Chatter' position tab
    Then Verify the Chatter Count Tab

  # @ER-1964 @ER-2193 @REGRESSION @POSITION
  # Scenario: Verfy that attach Roles is not showing in a Responsibility Line
  #   Given that a position is in status 'Active'
  #   And user navigate to 'Position' page
  #   And user click on a specific Position
  #   When the user clicks on the Attach Role button
  #   And user selects an existing role from the list
  #   And clicks on the Attach button
  #   Then verify that the new Role is attached
  #   And user click on three dot menu button
  #   And verify 'Attach Role' option is not visible

  @ER-1966 @ER-2198 @REGRESSION @POSITION
  Scenario: Verify that clone option is not visisble
    Given that a position is in status 'Active'
    And user navigate to 'Position' page
    And user click on a specific Position
    When the user clicks on the Attach Role button
    And user selects an existing role from the list
    And clicks on the Attach button
    Then verify that the new Role is attached
    And user click on three dot menu button
     And verify 'Attach Role' option is not visible
    When verify 'Clone' option is not visible
       And verify 'De-Activate' option should not exist

  # @ER-1966 @ER-2198 @REGRESSION @POSITION
  # Scenario: Verfy that attach Roles is not showing in a Responsibility Line
  #   Given that a position is in status 'Active'
  #   And user navigate to 'Position' page
  #   And user click on a specific Position
  #   When the user clicks on the Attach Role button
  #   And user selects an existing role from the list
  #   And clicks on the Attach button
  #   Then verify that the new Role is attached
  #   And user click on three dot menu button
  #   And verify 'Attach Role' option is not visible

  # @ER-1967 @ER-2200 @REGRESSION @POSITION
  # Scenario: Verify the Deactivate option in responsibility/Role Line
  #   Given that a position is in status 'Active'
  #   And user navigate to 'Position' page
  #   And user click on a specific Position
  #   When the user clicks on the Attach Role button
  #   And user selects an existing role from the list
  #   And clicks on the Attach button
  #   Then verify that the new Role is attached
  #   And user click on three dot menu button
  #   And verify 'De-Activate' option should not exist

  @ER-1972 @ER-2202 @REGRESSION @POSITION
  Scenario: Verfy that attach Roles is not showing in a Responsibility Line
    Given that a position is in status 'Draft'
    And user navigate to 'Position' page
    And user click on a specific Position
    When the user clicks on the Attach Role button
    And user selects an existing role from the list
    And clicks on the Attach button
    And verify that the new Role is attached
    And user click on three dot menu button
    Then verify 'Activate' option is visible

  @ER-84 @ER-2435 @ER-2248 @REGRESSION @POSITION
  Scenario:Verify the user can detach the Draft Role
    Given that a position is in status 'Draft'
    And user navigate to 'Position' page
    And user click on a specific Position
    And the user clicks on the Attach Role button
    And user selects an existing role from the list
    And clicks on the Attach button
    And verify that the new Role is attached
    When user clicks on Attachment component
    And Attachments popup appears
    And User click on the Detach Position
    And Attachment Modal is not visisble to User
    Then verify the deleted position disappear from the table

  @ER-2329 @ER-2543 @REGRESSION @POSITION
  Scenario: Verify roles counter on Organization > Positions page is clickable
    Given that a position is in status 'Active'
    And user navigate to 'Position' page
    And user selects a specific position
    When user clicks on the role counter
    Then verify user navigates to attach role page

    @ES-16 @ES-229 @ES-159 @SMOKE @REGRESSION @POSITION
  Scenario: Verify retire and deactivate option are not visible for position having employee assigned in organization > Positions page
    Given that a employee is in status 'Active'
    And that a position is in status 'Active'
    And user navigate to 'Employees' page
    And Search specific Employee with status 'Active'
    When User click on the Assign to Employee button
    And Verifies the Assign to Occupy Position modal is displayed
    And user selects the position
    And user clicks the next button
    And user clicks the assign button
    And verify the position is assigned
    And user navigate to 'Position' page
    And user selects a specific position
    And Verify the Primary Occupation Tag for Full time Employee in Positions Organization
    Then user clicks on three dot menu button
    And verify 'Retire' option is not visible
    And verify 'De-Activate' option is not visible

  @ER-2611 @ER-2694 @REGRESSION @POSITION
  Scenario: Verify the Behaviour when User attach and clear the Responsibility
    Given that a position is in status 'Draft'
    And a responsibility is attach to the role
    And user navigate to 'Position' page
    And user click on a specific Position
    And the user clicks on the Attach Role button
    When user selects an existing role from the list
    Then user clears the search field with responsibility
    And verify responsibility is not cleared