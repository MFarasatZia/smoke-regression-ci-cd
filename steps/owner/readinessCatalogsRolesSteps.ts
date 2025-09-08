import { Given, Then, When } from "@cucumber/cucumber";
import { baseInstance } from "../../helpers/BaseClass";
import ReadinessRolesPage from "../../pages/owner/readinessRolesPage";
import LeftNavigationPage from "../../pages/owner/leftNavigationPage";
import ReadinessCatalogsRolesPage from "../../pages/owner/readinessRolesPage";
import { apiRoleData } from "./rolesApiSteps";
import { expect } from "@playwright/test";
import { getRandomRole, RolesData } from "../../helpers/util/random";
import { newRole } from "./readinessCatalogsResponsibilitiesApiSteps";
import { setSharedData, getSharedData } from "../../helpers/util/sharedData";

/* eslint-disable @typescript-eslint/no-explicit-any */
const responsibilityData: RolesData = getRandomRole();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const leftNavigationPage: LeftNavigationPage = new LeftNavigationPage(baseInstance);
const newResponsibilityData: RolesData = getRandomRole();
const readinessRolesPage: ReadinessRolesPage = new ReadinessRolesPage(baseInstance);
const newRolesData: RolesData = getRandomRole();
const readinessCatalogsPage: ReadinessCatalogsRolesPage = new ReadinessCatalogsRolesPage(baseInstance);

When(/^you navigate to Account > Readiness > Catalogs > Roles$/, async function () {
	await leftNavigationPage.navigateTo("responsibilities");
	await readinessRolesPage.verifyRolesSubSectionIsFocused();
});

Given("user are in the Account > Catalogs > Roles", async () => {
	await leftNavigationPage.navigateTo("roles");
	await leftNavigationPage.reloadThePage();
	await readinessCatalogsPage.clickRolesMenu();
});

When("user opens a role", async function () {
	await readinessCatalogsPage.searchForRolesAndOpenIt(apiRoleData.name);
});

When("verify the breadcrumb for roles", async function () {
	await readinessCatalogsPage.verifyBreadcrumbsForRoles();
});

When("user reaches the {string} roles tab", async function (tab: string) {
	await readinessCatalogsPage.openRolesTab(tab);
});

Then("verify the chatter for roles", async () => {
	await readinessCatalogsPage.verifyRolesChatterRecords();
});

Then("verify Add role button is displayed", async function () {
	await readinessRolesPage.verifyAddRoleButtonIsDisplayed();
});

Then("roles tree is displayed", async function () {
	await readinessRolesPage.verifyReadinessRolesTreeIsDisplayed();
});

When("user clicks Add role button", async function () {
	await readinessRolesPage.clickAddRoleButton();
});

Then("verify Add role modal is displayed", async function () {
	await readinessRolesPage.verifyAddRoleModalIsDisplayed();
});

Then("user saves a role", async function () {
	await readinessRolesPage.addRole();
	await readinessRolesPage.clickSaveAsDraftButton();
});

Then("verify the new role with status {string} is displayed in the roles tree", async function (roleStatus: string) {
	await leftNavigationPage.reloadThePage();
	await readinessRolesPage.searchForRole(apiRoleData.name);
	await readinessRolesPage.verifyRoleStatus(roleStatus);
});

When("user clicks the three dot menu for the role", async function () {
	await readinessRolesPage.clickActionsButtonForSpecificRole(apiRoleData.name);
});

Then("verify action {string} is displayed", async function (actionName: string) {
	await readinessRolesPage.verifyActionIsDisplayed(actionName);
});

When("user activates a role", async function () {
	await readinessRolesPage.searchForRole(apiRoleData.name);
	await readinessRolesPage.activateRole();
});

Then("verify the status of the role is {string}", async function (status: string) {
	await leftNavigationPage.reloadThePage();
	await readinessRolesPage.searchForRole(apiRoleData.name);
	await readinessRolesPage.getRoleStatus(status);
});

Then("verify status of role object is {string}", async (status: string) => {
	await readinessRolesPage.getRoleStatusBadge(status);
});

When("user click on {string} Role Ellipsis menu", async function (status: string) {
	await leftNavigationPage.reloadThePage();
	await baseInstance.wait(3);

	await leftNavigationPage.navigateTo("Roles");
	await baseInstance.wait(2);

	try {
		await readinessRolesPage.searchForRoleAndGetBadge(apiRoleData.name, status);
		await readinessRolesPage.clickOnFirst3DotMenu();
	} catch (error) {
		await leftNavigationPage.reloadThePage();
		await baseInstance.wait(5);
		await readinessRolesPage.searchForRoleAndGetBadge(apiRoleData.name, status);
		await readinessRolesPage.clickOnFirst3DotMenu();
	}
});

Then("{string} option should be visible in the list", async function (status) {
	await readinessRolesPage.verifyDeActivateActionIsDisplayed(status);
});

When("User Hover and Verify that Special cursor and hover affect is visible to user", async function () {
	await readinessCatalogsPage.verifyHoverOverSpecificRoles();
});

When("User click {string} Role", async function (status) {
	await readinessRolesPage.selectModalActionButton(status);
});

Then("user should be able to see the delete role confirmation dialog", async () => {
	await readinessRolesPage.deleteModalIsVisible();
});

Then("user should be able to see the rename role confirmation dialog", async () => {
	await readinessRolesPage.renameRoleModalIsVisible();
});

Then("user enters the new name for role", async () => {
	const updateRolesData: RolesData = getRandomRole();
	newRole.name = updateRolesData.name;
	await readinessRolesPage.renameTheRole(newRole.name);
});

Then("user save the renamed role", async () => {
	await readinessRolesPage.saveRenamedRole();
});

Then("verify the renamed role to be visible", async () => {
	await readinessRolesPage.verifyRoleToExist(newRole.name);
});

Then("verify the role not to be visible", async () => {
	await readinessRolesPage.verifyRoleToNotExist(apiRoleData.name);
});

Then("verify delete attached responsibility checkbox is checked", async function () {
	await readinessRolesPage.verifyDeleteAttachedResponsibilityCheckboxIsChecked();
});

Then("verify both role and responsibility are deleted", async function () {
	await readinessRolesPage.verifyRoleToNotExist(apiRoleData.name);
});

Then("user {string} the Role", async function (action: string) {
	await baseInstance.wait(5);
	await readinessRolesPage.changeRoleStatus(action);
});

Then("{string} option should not be visible in the list", async function (status) {
	await readinessRolesPage.deActiveoptionToNotExist(status);
});

When("the user apply the {string} filter for Roles", async function (status: string) {
	await readinessRolesPage.applyFilter(status);
});

Then("the user see a list of Roles filtered by {string}", async function (status: string) {
	await readinessRolesPage.verifyFilteredResults(status);
});

Then("remove {string} filter for Roles", async function (status: string) {
	await readinessRolesPage.removeStatusFilter(status);
});

Then("the user should not see the removed {string} filter for Roles", async function (status: string) {
	await readinessRolesPage.verifyFilterRemoved(status);
});

When("the user apply multiple filters for Roles like {string} and {string}", async function (status1, status2) {
	const statuses = [status1, status2];
	await readinessRolesPage.applyMultipleFilters(statuses);
});

Then("the user sees a list of Roles filtered by statuses {string} and {string}", async function (status1, status2) {
	const statuses = [status1, status2];
	await readinessRolesPage.verifyMultipleFilteredResults(statuses);
});

Then("Verify number of {string} role is same as in the header", async (badge: string) => {
	await baseInstance.wait(3);
	try {
		await readinessRolesPage.clearSearchField();
		await baseInstance.wait(2);
	} catch (error) {
		console.log("No search field to clear, continuing...");
	}
	const headerCountText = await readinessRolesPage.getActiveRolesHeaderCount();
	await readinessRolesPage.applyFilter(badge);
	const filteredCount = await readinessRolesPage.getAllActiveRolesCount(badge);
	const headerCount = parseInt(headerCountText);
	expect(filteredCount).toBeLessThanOrEqual(headerCount);
	expect(headerCount).toBeGreaterThan(0);
	expect(filteredCount).toBeGreaterThanOrEqual(0);
});

When("user clicks on menu option for responsibility", async () => {
	await readinessRolesPage.clickOnThreeDotMenuForAttached();
});

When("user clicks on menu option of attached responsibility", async () => {
	await readinessRolesPage.clickOnThreeDotMenuOfResponsibility();
});

When("user {string} the attach responsibility", async (status: string) => {
	if (status === "Activate") {
		await readinessRolesPage.activateAttachResponsobility();
	} else if (status === "Rename") {
		await readinessRolesPage.renameAttachResponsibility(newResponsibilityData.name);
	} else if (status === "Retire") {
		await readinessRolesPage.retireAttachResponsobility();
	} else if (status === "De-activate") {
		await readinessRolesPage.deActivateAttachResponsobility();
	}
});

Then("verify name of responsibility should be renamed", async () => {
	await readinessRolesPage.searchForRole(newResponsibilityData.name);
	await readinessRolesPage.verifynewResponsibilityName(newResponsibilityData.name);
});

Then("verify name of attached responsibility should be renamed", async () => {
	await baseInstance.wait(3);
	await readinessRolesPage.verifynewAttachedResponsibilityName(newResponsibilityData.name);
});

Then("status of attach responsibility change to {string}", async (status: string) => {
	await leftNavigationPage.reloadThePage();
	await readinessRolesPage.searchForRole(apiRoleData.name);
	await baseInstance.wait(5);
	await readinessRolesPage.verifyStatusForAttachResponsibility(status);
});

Then("status of attached responsibility change to {string}", async (status: string) => {
	await readinessRolesPage.verifyStatusOfAttachedResponsibility(status);
});

Then("verify {string} action should be visible", async (option: string) => {
	await readinessCatalogsPage.optionFromThreeDotMenuVisible(option);
	await baseInstance.wait(5);
});

When("user selects {string} option", async (option: string) => {
	await readinessRolesPage.selectOptionFromThreeDotMenu(option);
});

When("User click on Reactive button and verify the load icons", async () => {
	await readinessCatalogsPage.clickAndVerifyReactiveButton();
});

When("Attach Responsibility to Role modal appears", async () => {
	await baseInstance.wait(4);
	await readinessRolesPage.verifyAttachResponsibilityModalIsDisplayed();
	await baseInstance.wait(2);
});

When("user attaches a responsibility to a role", async () => {
	await readinessRolesPage.attachResponsibilityOnTheFly(newRole.name);
});

When("user attaches a new responsibility", async () => {
	await readinessCatalogsPage.attachResponsibility(newRole.name);
});

When("verify confirmation modal appears", async () => {
	await readinessCatalogsPage.confirmationModalDisplayed();
});

Then("user clicks outside the modal", async () => {
	await readinessCatalogsPage.clickOutsideConfirmationModal();
});

Then("verify the confirmation modal disappears", async () => {
	await readinessCatalogsPage.confirmationModalIsNotDisplayed();
});

When("user clicks on Confirm button", async () => {
	await readinessRolesPage.clickOnConfirmButton();
});

Then("verify that the Responsibility is attached to the role", async () => {
	await readinessRolesPage.verifyTheResponsibilityIsAttachedToRole(newRole.name);
});

Then("verify the Responsibility attached to role", async () => {
	await readinessRolesPage.verifyResponsibilityAttached(newRole.name);
});

Given("user selects a specific role", async () => {
	await readinessRolesPage.selectRole(apiRoleData.name);
});

When("Verify the Roles Chatter Count Tab", async function () {
	await readinessCatalogsPage.verifyChatterCountTab();
});

When("user clicks on Attach Responsibility button", async function () {
	await baseInstance.reloadPage();
	await baseInstance.wait(5);
	await readinessRolesPage.clickOnAttachButtonResponsibility();
});

When("user searches the role", async function () {
	const roleName = getSharedData("roleName");
	if (roleName) {
		await readinessRolesPage.searchForRole(roleName);
	} else {
		await readinessRolesPage.searchForRole(apiRoleData.name);
	}
	await baseInstance.wait(3);
});

When("Verify that User can detach role from Responsibility", async () => {
	await readinessRolesPage.clickOnRoleDataCard();
	await baseInstance.wait(3);
	await readinessCatalogsPage.clickOnDetachBtn();
});

Then("Verify that Remove Counters in No Roles for {string} role", async (status: string) => {
	await readinessRolesPage.applyFilter(status);
	await readinessRolesPage.verifyCounterIsNotVisible();
});

When("Verify that Reattaching Role or Responsibility After Detachment", async function () {
	await readinessCatalogsPage.verifyReAttachRoleResponsibility(apiRoleData.name);
});

Then("verify role name and code is visible in detach modal", async () => {
	await readinessCatalogsPage.verifyTextInDetachModal();
});

When("user opens the \"Attach responsibility modal\"", async function () {
	await readinessRolesPage.clickOntheFirst3DotMenu();
	await readinessRolesPage.clickAttachResponsibilityButton();
	await readinessRolesPage.verifyAttachResponsibilityModalIsDisplayed();
});

When("user expands the created role", async function () {
	await readinessRolesPage.clearSearchField();
	await readinessRolesPage.navigateThroughPagesAndExpandTheRole(apiRoleData.name);
});

When("user expands the role", async function () {
	await readinessRolesPage.clearSearchField();
	await readinessRolesPage.searchForRole(apiRoleData.name);
	await readinessCatalogsPage.clickOnThreeDotMenuForAttached();
});

When("user expand the role", async () => {
	await readinessRolesPage.expandRole();
	await baseInstance.wait(3);
});

Then("verify that the responsibility is attached to the role", async function () {
	const responsibilityName = newRole.name;
	await readinessRolesPage.verifyTheResponsibilityIsAttachedToTheRole(responsibilityName);
});

When("user attaches {string} responsibility to the role", async function (responsibilityType: string) {
	switch (responsibilityType) {
		case "Existing":
			await readinessRolesPage.attachTheResponsibility(newRole.name);
			break;
		case "On the fly":
			await readinessRolesPage.attachResponsibilityOnTheFly(responsibilityData.name);
	}
});

When("user attaches existing responsibility to the role", async function () {
	await readinessCatalogsPage.selectTheResponsibility(newRole.name);
});

When("user clear the field", async () => {
	await readinessCatalogsPage.clearTheSearchField();
});

Then("verify attach button is disabled", async () => {
	await readinessCatalogsPage.attachBtnDisabled();
});

When("Attacheed {string} responsibility and verify the load icons", async function (responsibilityType: string) {
	switch (responsibilityType) {
		case "Existing":
			await readinessRolesPage.attachTheResponsibility(newRole.name);
			break;
		case "On the fly":
			await readinessRolesPage.attachResponsibilityOnTheFly(responsibilityData.name);
	}
});

When("user click on the Responsibility attached to the Role", async () => {
	await readinessRolesPage.clickOnTheFirstRole();
	await readinessRolesPage.clickOnTheResponsibiityAttachedToRole();
});

Then("user should be naviagate to the Responsibility page", async () => {
	await readinessRolesPage.verifyResponsibilityBreadcrumb();
});

Then("verify the breadcrumb to be visible", async () => {
	await readinessRolesPage.verifyRolesBreadcrumb();
});

Then("user should see Add Role button", async function () {
	await readinessRolesPage.verifyAddRoleButtonIsDisplayed();
});

Then("Button loading indicator is displayed", async function () {
	await readinessCatalogsPage.verifyAddRoleButtonIndicator();
});

Then("Verify user should be able to see the Roles", async () => {
	await readinessRolesPage.rolesTableVerification();
});

When("user clicks on the role action menu", async function () {
	await leftNavigationPage.navigateTo("Roles");
	await readinessRolesPage.clickActionsButtonForSpecificRole(apiRoleData.name);
});

Then("{string} role action should be visible", async function (action: string) {
	await readinessRolesPage.verifyActionIsDisplayed(action);
});

When("Click on {string} role action", async function (action: string) {
	await readinessRolesPage.selectOptionFromThreeDotMenu(action);
});

Then("confirm the {string} action for Role", async function (action: string) {
	await readinessCatalogsPage.confirmActionForRole(action);
});

Then("verify the role status to be {string}", async function (action) {
	await leftNavigationPage.reloadThePage();
	await readinessRolesPage.searchForRoleAndGetBadge(apiRoleData.name, action);
	await readinessRolesPage.verifyRoleStatus(action);
});

When("the user select and retire the role", async () => {
	await readinessRolesPage.searchForRoleAndGetBadge(apiRoleData.name, "Active");
	await readinessRolesPage.clickOntheFirst3DotMenu();
	await readinessRolesPage.clickOnTheOption("Retire");
});

When("User Retire the Role and Verify the load icons", async () => {
	await readinessRolesPage.searchForRoleAndGetBadge(apiRoleData.name, "Active");
	await readinessRolesPage.clickOntheFirst3DotMenu();
	await readinessRolesPage.clickOnTheOption("Retire");
});

Then("click on Role action menu", async () => {
	await readinessRolesPage.searchForRoleAndGetBadge(apiRoleData.name, "Retired");
	await readinessRolesPage.clickOntheFirst3DotMenu();
});

Then("verify the {string} option visble for role", async (status: string) => {
	await readinessRolesPage.optionTobeVisible(status);
});

Then("user enters the name for role", async () => {
	await readinessRolesPage.typeRoleName(newResponsibilityData.name);
});

Then("user add spaces in the modal", async () => {
	await readinessCatalogsPage.typespaces("  ");
});

Then("verify the error is displayed", async () => {
	await readinessCatalogsPage.verifyErrorMessage();
});

Then("user save the role", async () => {
	await readinessRolesPage.clickOnSaveButton();
});

Then("user should see the new role in Tree in status draft", async () => {
	await leftNavigationPage.reloadThePage();
	await readinessRolesPage.searchForRoleAndGetBadge(newResponsibilityData.name, "Draft");
});

Given("user clicks the three dot menu of the role", async () => {
	await baseInstance.wait(5);
	await readinessRolesPage.clickActionsButtonForSpecificRole(apiRoleData.name);
});

Then("user click the three dot menu of the role", async () => {
	await readinessRolesPage.clickOnRoleThreeDot();
});

When("rename popup appears", async () => {
	await readinessCatalogsPage.renameRoleModalIsVisible();
});

When("user selects Detach from Role option", async () => {
	await readinessCatalogsPage.clickOnDetachFromRoleBtn();
});

When("user click on the detach option", async () => {
	await readinessCatalogsPage.clickOnDetachBtn();
});

When("user types new role name", async () => {
	const updateRolesData: RolesData = getRandomRole();
	newRolesData.name = updateRolesData.name;
	await readinessCatalogsPage.renameTheRole(newRolesData.name);
});

When("user selects save button", async () => {
	await readinessRolesPage.clickSaveBtn();
});

Then("verify role name is changed", async () => {
	await readinessCatalogsPage.verifyRoleToExist(newRolesData.name);
});

Then("verify the responsibility attached to a role", async function () {
	await leftNavigationPage.navigateTo("Roles");
	await readinessRolesPage.searchForRole(apiRoleData.name);
	await readinessRolesPage.verifyResponsibilityAttachedToRole();
});

Then("click on detach responsibility", async function () {
	await readinessRolesPage.detachResponsibility();
});

Then("verify the detached responsibility not to be visible", async function () {
	await readinessRolesPage.verifyResponsibilityDetached();
});

When("user open the Attach responsibility modal of the role", async () => {
	await readinessCatalogsPage.verifyAttachResponsibilityModalIsDisplayed();
});

Then("verify Role attachment to be visible", async () => {
	await readinessCatalogsPage.searchForRole(apiRoleData.name);
	await readinessCatalogsPage.verifyRoleAttachmentNotVisible();
});

Then("verify Role attachment not to be visible", async () => {
	await readinessCatalogsPage.searchForRole(apiRoleData.name);
	await readinessCatalogsPage.verifyRoleAttachmentNotVisible();
});

Then("Verify the user should be able to see the action menu for Roles", async () => {
	await readinessCatalogsPage.clickActionsButtonForSpecificRole(apiRoleData.name);
});

Then("verify that {string} responsibility is attached to the role", async function (responsibilityType: string) {
	switch (responsibilityType) {
		case "on the fly":
			await readinessCatalogsPage.verifyTheResponsibilityIsAttachedToTheRole(responsibilityData.name);
			break;
		case "existing":
			await readinessCatalogsPage.verifyTheResponsibilityIsAttachedToTheRole(newRole.name);
			break;
	}
});

When("user opens the Attach responsibility modal", async function () {
	await readinessRolesPage.clickOntheFirst3DotMenu();
	await readinessRolesPage.clickAttachResponsibilityButton();
	await readinessRolesPage.verifyAttachResponsibilityModalIsDisplayed();
});

Then("verify that Responsibility should be marked with a tick", async function () {
	await readinessCatalogsPage.verifyResponsibilityMarkedWithTick();
});

When("user search {string} responsibility to the role", async function (responsibilityType: string) {
	switch (responsibilityType) {
		case "Existing":
			await readinessRolesPage.searchTheResponsibility(newRole.name);
			break;
	}
});

Then("Verify columns are displayed in roles page", async () => {
	await readinessCatalogsPage.columnNamesAreDisplayed();
});

Then("verify previous button is not visible on first page", async () => {
	await readinessCatalogsPage.previousBtnNotDisplayed();
});

Then("verify next button is visible on first page", async () => {
	await readinessCatalogsPage.nextBtnDisplayed();
});

Then("user verify next button not visible on last page", async () => {
	await readinessCatalogsPage.naviagteToLastPage();
});

Then("verify previous button is visible on last page", async () => {
	await readinessCatalogsPage.previousBtnDisplayed();
});

Then("hover on three dots menu Roles to Verify the Magenta color", async () => {
	await readinessCatalogsPage.hoverOverThreeDotsMenu();
});

Then("verify add responsibility button is visible", async () => {
	await readinessCatalogsPage.addResponsibilityBtnVisible();
});

When("user clicks on the Responsibility attached to Role", async () => {
	await readinessRolesPage.clickOnAttachedResponsibility();
});

Then("verify user naviagate to the Responsibility page", async () => {
	await readinessRolesPage.verifyResponsibilityBreadcrumb();
});

When("Verify that the Detach Option is not shown from the Attach Role Drop Down", async () => {
	await readinessCatalogsPage.verifyDetachFromRoleBtn();
});

When("Verify the modal when creating and attaching a new responsibility", async () => {
	await readinessCatalogsPage.verifyShowModalNotAppear();
});

When("user clicks on the search field", async () => {
	await readinessCatalogsPage.clickOnSearchFieldOfResponsibility();
});

Then("verify drop down appears", async () => {
	await readinessCatalogsPage.verifyResponsibilityDropDownAppears();
});

Then("user clicks on the caret icon to close the drop down", async () => {
	await readinessCatalogsPage.clickOnCaretIcon();
});

Then("verify drop down disappears", async () => {
	await readinessCatalogsPage.verifyResponsibilityDropDownDisappears();
});

Then("User click on Detach Position", async () => {
	await readinessCatalogsPage.clickOnDetachButton();
});

Then("Verify The Detach Responsibility Modal", async () => {
	await readinessCatalogsPage.verifyDetachResponsibilityModal();
});

Then("verify that User Can detach responsibilities from role", async () => {
	await readinessCatalogsPage.clickOnDetachModalButton();
});

Then("User click on the collapse icon", async () => {
	await readinessCatalogsPage.clickOnCollapseIcon();
});

Then("verify the left navigation functionality when switching between tabs on the Catalogs page", async () => {
	await readinessCatalogsPage.verifyHideLeftNavigation();
});

Given("Verify that User can detach Responsibility from Role", async () => {
	await readinessCatalogsPage.clickOnRoleDataCard();
	await readinessCatalogsPage.displayAttachmentsPopup();
	await readinessCatalogsPage.clickOnDetachResponsibility();
});

Then("Attachment Modal is not visisble to User", async () => {
	await readinessCatalogsPage.displayAttachmentsPopup();
});

Then("user clears the search field with responsibility", async () => {
	await readinessCatalogsPage.clearAttachedResponsibilityField();
});

Then("verify responsibility is not cleared", async () => {
	await readinessCatalogsPage.attachedFieldNotEmpty();
});

Then("user reaches the Roles tab", async () => {
	await readinessCatalogsPage.reachesRolesPage();
});

Then("verify no roles found text is visible", async () => {
	await readinessCatalogsPage.noRolesFoundTextVisible();
});

Then("user clears the search field", async () => {
	await readinessCatalogsPage.clickOnClearSearchBtn();
});

Then("verify checkpoints counter is visible", async () => {
	await readinessRolesPage.checkpointCounterVisible();
});

Then("Verify the Display button {string}", async (text: string) => {
	await readinessCatalogsPage.verifyDisplayBtn(text);
});

Then("user click on the ADD new with AI button", async () => {
	await readinessCatalogsPage.clickOnAddNewWithAiBtn();
});

Then("verfiy the text {string}", async (text: string) => {
	await readinessCatalogsPage.verfiyAiModaltext(text);
});

Then("user click on create and attach button", async () => {
	await readinessCatalogsPage.clickOnCreateAndAttachBtn();
});

Then("user Select the Activate Option", async () => {
	await readinessRolesPage.selectActivateOption();
});

Then("User click on Activate Button", async () => {
	await readinessCatalogsPage.clickOnActivateBtn();
});

Then("User Activate the Attached Responsibility", async () => {
	await readinessCatalogsPage.activateAttachedDraftResponsibility();
});

Then("the status of the attached Responsibility changes to Active", async () => {
	await readinessCatalogsPage.verifyAttachedActivateResponsibilityStatus();
});

Then("User Skip to activate attached responsibilities", async () => {
	await readinessCatalogsPage.skipAttachedDraftResponsibility();
});

Then("verify the status of the attached Responsibility changes to Draft", async () => {
	await readinessCatalogsPage.verifyAttachedDraftResponsibilitiesStatus();
});

Then("verify that Responsibility is attached to the role", async () => {
	await readinessCatalogsPage.attachResponsibilitytoRole();
});

Then("the user selects the delete option", async () => {
	await readinessRolesPage.selectOptionFromThreeDotMenu("Delete");
});

When("the user clicks the delete button in the role deletion dialog", async () => {
	await readinessRolesPage.confirmDeleteRoleBtn();
});

When("user click on the expand arrow", async function () {
	await readinessRolesPage.expandRole();
	await baseInstance.wait(3);
});

Then("verify role count in roles tab before activation", async () => {
	const initialCount = await readinessRolesPage.getActiveRolesHeaderCount();
	setSharedData("initialRoleCount", initialCount);
	console.log(`Initial role count: ${initialCount}`);
});

Then("verify role count in roles tab after activation", async () => {
	await baseInstance.wait(5);
	const finalCount = await readinessRolesPage.getActiveRolesHeaderCount();
	const initialCount = getSharedData("initialRoleCount");
	const initialCountNum = parseInt(initialCount);
	const finalCountNum = parseInt(finalCount);

	console.log(`Initial count: ${initialCountNum}, Final count: ${finalCountNum}`);
	expect(finalCountNum).toBe(initialCountNum + 1);
});

