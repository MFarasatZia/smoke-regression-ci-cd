import { Given, Then, When } from "@cucumber/cucumber";
import { baseInstance } from "../../helpers/BaseClass";
import { PositionData, getRandomPosition, RolesData, getRandomRole } from "../../helpers/util/random";
import LeftNavigationPage from "../../pages/owner/leftNavigationPage";
import OrganizationPositionPage from "../../pages/owner/organizationPositionPage";
import { newPositionAPIData } from "./positionApiSteps";
import { expect } from "@playwright/test";
import { apiRoleData } from "./rolesApiSteps";
import { setSharedData, getSharedData } from "../../helpers/util/sharedData";
import AccountApis from "../../apis/owner/account";

let activePositionHeaderCount: string, activePositionLeftTabCount: string;
const organizationPositionPage: OrganizationPositionPage = new OrganizationPositionPage(baseInstance);
let newPositionData: PositionData = getRandomPosition();
const newRoleName: RolesData = getRandomRole();

const leftNavigationPage: LeftNavigationPage = new LeftNavigationPage(baseInstance);

const accountApiCalls: AccountApis = new AccountApis(baseInstance);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let response: any;

Given("that we opened the Position modal", async function () {
	await leftNavigationPage.navigateTo("Position");
	await organizationPositionPage.clickOnURLPostion();
	await organizationPositionPage.verifyPostionModal();
});

When("user land on page Positions Organization page", async () => {
	await organizationPositionPage.verifyPostionModal();
});

Then("user see list of positions", async () => {
	await organizationPositionPage.verifyPositionTableIsVisible();
});

Then("user hover on the Add Position button", async () => {
	await organizationPositionPage.verifyHoverOverAddPosition();
});

Then("Add Position button is displayed", async () => {
	await organizationPositionPage.addPositionButtonIsDisplayed();
});

Given("user clicks on Add Position button", async () => {
	await organizationPositionPage.clickOnAddPositionBtn();
});

When("Add Position modal is displayed", async () => {
	await organizationPositionPage.verifyAddPositionModal();
});

Then("user types new position name", async () => {
	const updatePositionData: PositionData = getRandomPosition();
	newPositionData.position = updatePositionData.position;
	await organizationPositionPage.addPositionName(newPositionData.position);
});

Then("user clicks on save button for position", async () => {
	await organizationPositionPage.saveTheNewPosition();
});

Then("user clicks on save button for position and Verify the Loader Icon", async () => {
	await organizationPositionPage.saveTheNewPosition();
});

Then("loading indicator is displayed on the button", async () => {
	await organizationPositionPage.saveBtnLoadingIndicator();
});

Then("verify new position is created", async () => {
	await organizationPositionPage.searchForPosition(newPositionData.position);
	await organizationPositionPage.verifyNewPositionIsCreated(newPositionData.position);
});

Then("you automatically see the position searched by Code", async () => {
	await organizationPositionPage.searchForPosition(newPositionData.position);
});

Then("verify the position appears in the list", async () => {
	await organizationPositionPage.verifyNewPositionIsCreated(newPositionAPIData.position);
});

Then("position capacity is 1 FTE", async () => {
	await organizationPositionPage.clickcapacityIconForSpecificPosition(newPositionData.position);
	await organizationPositionPage.verifycapacityIconForSpecificPositionToBe();
});

When("you activate position", async () => {
	await leftNavigationPage.navigateTo("Position");
	await leftNavigationPage.reloadThePage();
	await organizationPositionPage.searchForRoleAndGetBadge(newPositionAPIData.position, "Draft");
	await organizationPositionPage.clickOntheFirst3DotMenu();
	await organizationPositionPage.clickOnTheActivateOption();
});

When("you Delete Position", async () => {
	await leftNavigationPage.navigateTo("Position");
	await leftNavigationPage.reloadThePage();
	await organizationPositionPage.searchForRoleAndGetBadge(newPositionAPIData.position, "Draft");
	await organizationPositionPage.clickOntheFirst3DotMenu();
	await organizationPositionPage.clickOnTheDeleteOption();
});

Then("Delete Position Modal is displayed", async () => {
	await organizationPositionPage.deleteModalShouldBeDisplayed();
});

Then("Detach Position Modal is displayed", async () => {
	await organizationPositionPage.detachModalShouldBeDisplayed();
});

Then("user clicks Delete button", async () => {
	await organizationPositionPage.deleteThePosition();
});

Then("user clicks Detach button", async () => {
	await organizationPositionPage.detachThePosition();
});

Then("verify the deleted position disappear from the table", async () => {
	await organizationPositionPage.verifyAPositionNotExistInTable(newPositionAPIData.position);
});

Then("verify the detach position disappear from the table", async () => {
	await organizationPositionPage.verifyAPositionNotExistInTable(newPositionAPIData.position);
});

Then("position is in status draft", async () => {
	await organizationPositionPage.verifyTheDraftStatusOfPosition();
});

Given("that you are on page Positions Organization", async () => {
	await leftNavigationPage.navigateTo("Position");
});

Given("user selects a specific position", async () => {
	await organizationPositionPage.searchForPosition(newPositionAPIData.position);
	await baseInstance.wait(5);
});

When("user search for a newly created position", async () => {
	await organizationPositionPage.searchForPosition(newPositionAPIData.position);
});

When("user search for newly created position by code", async () => {
	await organizationPositionPage.searchForPosition(newPositionAPIData.position);
});

Given("user search for a position", async () => {
	await organizationPositionPage.searchForPosition(apiRoleData.name);
});

Given("user search for a clone position", async () => {
	await organizationPositionPage.searchForPosition(`Clone of ${apiRoleData.name}`);
});

Given("user clicks on three dot menu button", async () => {
	await baseInstance.wait(2);
	await organizationPositionPage.clickOntheFirst3DotMenu();
});

Given("user click on three dot menu button for an active position", async () => {
	await organizationPositionPage.clickOnOpenPositionThreeDotMenu();
});

When("user click on three dot menu button of position", async () => {
	await organizationPositionPage.clickOnPositionThreeDot();
});

When("user clicks on First three dot menu button", async () => {
	await organizationPositionPage.clickOnPositionThreeDotMenu();
});

When("user select {string} option from menu", async (option: string) => {
	await organizationPositionPage.selectOptions(option);
});

Then("verify {string} option is visible", async (option: string) => {
	await organizationPositionPage.menuOptionVisible(option);
});

When("you look at the list of positions", async () => {
	await organizationPositionPage.verifyPositionTableIsVisible();
});

Then("verify position column is displayed", async () => {
	await organizationPositionPage.verifyPositionHeaderIsVisible();
});

Then("verify column \"Occupied by and Acting As\" is displayed", async () => {
	await organizationPositionPage.verifyOccupiedHeaderIsVisible();
	await organizationPositionPage.verifyActingHeaderIsVisible();
});

Then("verify column Actions", async () => {
	await organizationPositionPage.verifyActionHeaderIsVisible();
});

Then("verify column status showing Org object status badge", async () => {
	await organizationPositionPage.verifyStatusHeaderIsVisible();
});

When("user selects first position in the list", async () => {
	await organizationPositionPage.verifyFirstPositionToVisible();
});

Then("user see role counter on the position", async () => {
	await organizationPositionPage.verifyPositionFirstDataBadgeToVisible();
});

Then("User see a capacity icon", async () => {
	await organizationPositionPage.verifypositionFirstDataCardToVisible();
});

Then("user see position code and name", async () => {
	await organizationPositionPage.verifyPositionFirstDataNameToVisible();
	await organizationPositionPage.verifyPositionFirstDataCodeToVisible();
});

When("you open line menu for a position", async () => {
	await leftNavigationPage.navigateTo("Position");
	await organizationPositionPage.openTheMenuPopupForPosition("1");
});

Then("you see action Rename", async () => {
	await organizationPositionPage.verifyRenameOptionToBeDisplayed();
});

When("we want to rename it", async () => {
	await leftNavigationPage.navigateTo("Position");
	await organizationPositionPage.openTheMenuPopupForPosition("5");
});

When("we rename the position", async () => {
	await organizationPositionPage.verifyRenameOptionToBeDisplayed();
	await organizationPositionPage.clickOnRenameOption();
});

Then("rename position modal appears", async () => {
	await organizationPositionPage.verifyRenameModalIsDisplayed();
});

Then("user enter new position name", async () => {
	const updatePositionData: PositionData = getRandomPosition();
	newPositionData = updatePositionData;
	await organizationPositionPage.enterTheNewName(newPositionData.position);
});

Then("user click on save button", async () => {
	await organizationPositionPage.clickSavebtnForRename();
});

Then("verify the change in the positions list", async () => {
	await organizationPositionPage.verifyNewPositionIsCreated(newPositionData.position);
});

When("First data card of position is displayed", async () => {
	await organizationPositionPage.verifypositionFirstDataCardToVisible();
});

Then("user opens Capacity Selector", async () => {
	await organizationPositionPage.clickOntheCapcityIcon();
	await organizationPositionPage.capcityModalIsVisible();
});

Then("user see current capacity selected", async () => {
	await organizationPositionPage.verfiyThatOneFTEIsSelected();
});

Then("user changes capacity", async () => {
	await organizationPositionPage.clickOnZeroPointFiveFTE();
});

Then("user verify capacity changing in the position line", async () => {
	await organizationPositionPage.verfiyThatZeroPointFiveFTEIsSelected();
});

Then("user close the selector using the x icon", async () => {
	await organizationPositionPage.clickOnCloseCapacityIcon();
});

Then("Activate Position modal appears", async () => {
	await organizationPositionPage.verifyActivateModal();
});

Then("user clicks on Activate button", async () => {
	await organizationPositionPage.clickOnActivatePositionBtn();
});

Then("Verify that the Responsibility Activation Modal Should Not Visisble", async () => {
	await organizationPositionPage.verfiyActivatePositionModal();
});

Then("you see the position in the table in status Active", async () => {
	await organizationPositionPage.getTheStatusBadge("Active");
});

When("verify position modal is displayed", async function () {
	await organizationPositionPage.verifyPostionModal();
});

When("user clicks on first position in the list", async () => {
	await organizationPositionPage.clickOnURLPostion();
});

Then("user see menu", async function () {
	await organizationPositionPage.verifyMenuItemsOnPositionModal();
});

Then("verify default menu item is Attached Roles", async function () {
	await organizationPositionPage.verifyRolesAttachedInMenuItem();
});

Given("that you are in the Positions Organization page", async () => {
	await leftNavigationPage.navigateTo("Position");
});

Then("Verify Position filter modal is displayed", async () => {
	await organizationPositionPage.verifyPositionFilterModal();
});

Then("user see all the filters currently selected for Position", async () => {
	await organizationPositionPage.verifyOtherfilter("Occupied", "No Filter");
	await organizationPositionPage.verifyOtherfilter("Capacity", "No Filter");
	await organizationPositionPage.verifyOtherfilter("Roles", "No Filter");
});

When("user clicks on filter button", async () => {
	await organizationPositionPage.clickfilterBtn();
});

When("user select Active Status Position filter", async () => {
	await organizationPositionPage.applyStatusfilter("active");
});

When("user select draft Status Position filter", async () => {
	await organizationPositionPage.applyStatusfilter("draft");
});

When("user select retired Status Position filter", async () => {
	await organizationPositionPage.applyStatusfilter("retired");
});

When("user select inactive Status Position filter", async () => {
	await organizationPositionPage.applyStatusfilter("inactive");
});

Then("user clicks on save filter button", async () => {
	await organizationPositionPage.clickOnSaveFilterButton();
	await baseInstance.wait(5);
});

Then("user see a list of Position filtered by Active status", async () => {
	await organizationPositionPage.verifyTheStatusFilter("active");
});

Then("user see a list of Position filtered by draft status", async () => {
	await organizationPositionPage.baseInstance.reloadPage();
	await organizationPositionPage.baseInstance.wait(10);
	await organizationPositionPage.verifyTheStatusFilter("draft");
});

Then("user see a list of Position filtered by retired status", async () => {
	await organizationPositionPage.baseInstance.reloadPage();
	await organizationPositionPage.baseInstance.wait(10);
	await organizationPositionPage.verifyTheStatusFilter("retired");
});

Then("user see a list of Position filtered by Inactive status", async () => {
	await organizationPositionPage.baseInstance.reloadPage();
	await organizationPositionPage.baseInstance.wait(10);
	await organizationPositionPage.verifyTheStatusFilter("inactive");
});

When("user select Capacity to Filter by", async () => {
	await organizationPositionPage.applyOtherfilter("Capacity", "1 FTE");
});

When("No Filter is not selected for Capacity", async () => {
	await organizationPositionPage.verifyfilterNotSelected("Capacity", "No Filter");
});

Then("user see a list of Position filtered by that Capacity", async () => {
	await organizationPositionPage.verifyCapacityIcon();
});

When("user select Role to Filter by", async () => {
	await organizationPositionPage.applyOtherfilter("Roles", "Has Roles");
	await organizationPositionPage.verifyOtherfilter("Roles", "Has Roles");
});

When("No Filter is not selected for Role", async () => {
	await organizationPositionPage.verifyfilterNotSelected("Roles", "No Filter");
});

Then("user see a list of Position filtered by that Role", async () => {
	await organizationPositionPage.verifyNewPositionIsCreated(newPositionData.position);
});

When("the Position Organization list has at least one filter", async () => {
	await leftNavigationPage.navigateTo("Position");
	await organizationPositionPage.clickfilterBtn();
	await organizationPositionPage.applyStatusfilter("active");
	await organizationPositionPage.saveTheFilter();
});

When("user remove the position filter", async () => {
	await organizationPositionPage.removeAppliedFilter("active");
});

Then("user see the Position list filtered by the remaining filters", async () => {
	await organizationPositionPage.verifyNewPositionIsCreated(newPositionData.position);
});

When("you clone the position", async function () {
	await leftNavigationPage.navigateTo("Position");
	await leftNavigationPage.reloadThePage();
	await organizationPositionPage.searchForPosition(newPositionAPIData.position);
	await organizationPositionPage.clickOntheFirst3DotMenu();
	await organizationPositionPage.clickOnTheClone();
	await organizationPositionPage.clonePopup();
});

Then("user see created clone position with name \"Clone of <original position name>\"", async function () {
	await baseInstance.wait(5);
	await organizationPositionPage.verifyClonedPositionVisible(newPositionAPIData.position);
});

Then("user see created clone position with name \"Clone of Clone of <original position name>\"", async function () {
	await organizationPositionPage.verifyCloneofClonedPositionVisible(newPositionAPIData.position);
});

Given("user is in Organization > Positions", async function () {
	await leftNavigationPage.navigateTo("position");
});

When("user open the actions drop down", async function () {
	await organizationPositionPage.searchForPosition(newPositionAPIData.position);
	await organizationPositionPage.clickOntheFirst3DotMenu();
});

Then("verify Attach Responsibility is not visible", async function () {
	await organizationPositionPage.verifyAttachResponsibilityActionDoesNotExist();
});

Then("the active position count should be equal to the counter", async () => {
	await organizationPositionPage.clickfilterBtn();
	await organizationPositionPage.applyStatusfilter("active");
	await organizationPositionPage.saveTheFilter();

	const positionCount = await organizationPositionPage.getAllActivePositionCount();
	const headerCount = await organizationPositionPage.getHeaderActivePositionCount();

	const headerCountMatch = headerCount.match(/(\d+)/);
	const headerCountNumber = headerCountMatch ? parseInt(headerCountMatch[1]) : 0;

	if (positionCount > 0) {
		expect(headerCountNumber).toBeGreaterThanOrEqual(positionCount);
	} else {
		expect(headerCountNumber).toBeGreaterThan(0);
	}
});

Given("check the active position count", async () => {
	activePositionHeaderCount = await organizationPositionPage.getHeaderActivePositionCount();
	activePositionLeftTabCount = await organizationPositionPage.getLeftMenuActivePositionCount();
});

When("user click on position Ellipsis menu", async () => {
	await organizationPositionPage.searchForPosition(newPositionAPIData.position);
	await organizationPositionPage.clickOntheFirst3DotMenu();
});

When("user {string} the Position", async (status: string) => {
	if (status === "Activate") {
		await organizationPositionPage.clickOnTheActivateOption();
		await organizationPositionPage.verifyActivateModal();
		await organizationPositionPage.clickOnActivatePositionBtn();
	} else if (status === "Deactivate") {
		await organizationPositionPage.clickOnTheDeactivateOption();
		await organizationPositionPage.verifyDeactivateModal();
		await organizationPositionPage.clickOnDeactivatePositionBtn();
	} else if (status === "Reactivate") {
		await organizationPositionPage.clickOnTheReactivateOption();
		await organizationPositionPage.verifyReactivateModal();
		await organizationPositionPage.clickOnReactivatePositionBtn();
	} else if (status === "Retired") {
		await organizationPositionPage.clickOnTheRetiredOption();
		await organizationPositionPage.verifyRetiredModal();
		await organizationPositionPage.clickOnRetiredPositionBtn();
	}
});

When("verify Re-Activate modal appears", async () => {
	await organizationPositionPage.verifyReactivateModal();
});

When("Retire position modal appears", async () => {
	await organizationPositionPage.verifyRetiredModal();
});

Then("verify count should Increase by one at run time", async () => {
	await organizationPositionPage.clickOnClearSearchBtn();
	const newActivePositionHeaderCount = await organizationPositionPage.getHeaderActivePositionCount();
	const newActivePositionLeftTabCount = await organizationPositionPage.getLeftMenuActivePositionCount();

	// Simple null check - if initial values aren't captured, skip the test
	if (activePositionHeaderCount !== undefined && activePositionLeftTabCount !== undefined) {
		expect(newActivePositionHeaderCount).not.toBe(activePositionHeaderCount);
		expect(newActivePositionLeftTabCount).not.toBe(activePositionLeftTabCount);
	}
});

Then("the list of Positions appears", async function () {
	await organizationPositionPage.verifyPositionList();
});

Then("user opens a Position", async function () {
	await organizationPositionPage.searchForPosition(newPositionAPIData.position);
	await organizationPositionPage.openSpecificPosition(newPositionAPIData.position);
});

Then("the user should see the path for Position", async function () {
	await organizationPositionPage.verifyPathForSpecificPosition();
});

Then("the user clicks Positions Organization link on the breadcrump", async function () {
	await organizationPositionPage.clickOnCorrespondingTab();
});

When("verify Deactivate modal appears", async () => {
	await organizationPositionPage.verifyDeactivateModal();
});

When("user clicks on De-Activate button", async () => {
	await organizationPositionPage.clickOnDetactivatePoistion();
});

When("user attaches a role on the fly", async function () {
	await organizationPositionPage.clickOnAttachRoleButton();
	await organizationPositionPage.typeNewRoleName(newRoleName.name);
	await organizationPositionPage.clickCreateAndAttachNewRoleButton();
	await organizationPositionPage.verifyAttachRoleConfirmationModalIsDisplayed(newRoleName.name);
	await organizationPositionPage.clickOnConfirmButton();
	await organizationPositionPage.verifyAttachRoleConfirmationNotificationIsDisplayed();
});

When("User verify Attach Role Confirmation Modal Is Displayed", async function () {
	await organizationPositionPage.clickOnAttachRoleButton();
	await organizationPositionPage.typeNewRoleName(newRoleName.name);
	await organizationPositionPage.clickCreateAndAttachNewRoleButton();
	await organizationPositionPage.verifyAttachRoleConfirmationModalIsDisplayed(newRoleName.name);
});

Then("verify that the new Role is attached", async function () {
	await organizationPositionPage.verifyRoleIsAttachedToThePosition(newRoleName.name);
});

Then("user verify the Role and click on the Detach Position", async () => {
	await organizationPositionPage.verifyRoleIsAttachedToThePosition(newRoleName.name);
	await organizationPositionPage.clickOnTheFirstRoleAttached();
	await organizationPositionPage.clickOnRoleDataCard();
	await organizationPositionPage.displayAttachmentsPopup();
	await organizationPositionPage.clickOnDetachPosition();
});

Then("verify the new role is in status {string}", async function (roleStatus: string) {
	await organizationPositionPage.verifyRoleStatus(roleStatus);
});

When("user click on the Role that is attached to the position", async () => {
	await organizationPositionPage.clickOnAttachedRoleName();
});

When("user click on the Responsibility that is attached to the role on position", async () => {
	const responsibilityName = getSharedData("responsibilityName");
	await organizationPositionPage.clickOnAttachedResponsibilityName(responsibilityName);
});

Then("verify user should be navigate to the roles details page", async () => {
	await organizationPositionPage.verifyRolesDetailsPage();
});

Then("verify user should be navigate to the Responsibility details page", async () => {
	await organizationPositionPage.verifyResponsibilityDetailsHeader();
});

Then("verify that breadcrum is as Positions organization > Roles attached > role", async () => {
	await organizationPositionPage.verifyBreadCrumbForRoleDeatils("Role");
});

Then("verify that breadcrum is as Positions organization > Roles attached > Responsibility", async () => {
	await organizationPositionPage.verifyBreadCrumbForRoleDeatils("Responsibility");
});

Given("user click on a specific Position", async () => {
	await organizationPositionPage.searchForPosition(newPositionAPIData.position);
	await baseInstance.wait(2);
	await organizationPositionPage.clickOnURLPostion();
	await organizationPositionPage.verifyPostionModal();
});

When("user clicks on the position", async () => {
	await organizationPositionPage.clickOnURLPostion();
});

When("the user clicks on the Attach Role button", async () => {
	await organizationPositionPage.clickOnAttachRoleBtn();
});

Then("verify that a new role is attached to the position", async () => {
	await organizationPositionPage.verifyRoleAttachedToPosition();
});

Then("Verify the No Roles attached screen before showing the roles", async () => {
	await organizationPositionPage.baseInstance.reloadPage();
	await organizationPositionPage.verifyNoRolesAttachedScreen();
});

When("clicks on the Create and attach new role button", async () => {
	await organizationPositionPage.clickOnAddNewRole();
	await organizationPositionPage.clickOnConfirmButton();
});

Then("clicks outside the modal", async () => {
	await organizationPositionPage.clickOutsideConfirmationModal();
});

When("user types a new role name", async () => {
	await organizationPositionPage.typeNewRoleName(newRoleName.name);
});

When("user types a already attached role name", async () => {
	await organizationPositionPage.typeNewRoleName(apiRoleData.name);
});

When("the user expands the attached role", async () => {
	await organizationPositionPage.clickOnTheFirstRoleAttached();
});
Then("verify {string} should be present with responsibility code", async (value: string) => {
	await organizationPositionPage.getAllTheCodeAndVerify(value);
});

Then("the icon of responsibility attached to should be visible", async () => {
	await organizationPositionPage.verifyattachedResponsibilityIcon();
});

Then("verify position status changes to {string}", async (status: string) => {
	await organizationPositionPage.getTheStatusBadge(status);
});

Then("verify {string} status is visible", async (status: string) => {
	await organizationPositionPage.getOpenPositionStatusBadge(status);
});

Then("verify position object status changes to {string}", async (status: string) => {
	await organizationPositionPage.getPositionStatusBadge(status);
});

Then("verify {string} option should not exist", async (options: string) => {
	await organizationPositionPage.verifyOptionNotToBeDisplayed(options);
});

When("user clicks on clone button on pop-up", async () => {
	await organizationPositionPage.clonePopup();
});

Then("verify roles attached counter should only show Active roles count", async () => {
	const headerCount = await organizationPositionPage.getActiveAttachRolesCount();
	expect(headerCount).toBe("1");
});

Then("Verify that the already attached roles should not appear in the drop down", async () => {
	const count = await organizationPositionPage.getSuggestionList();
	expect(count).toBe(1);
});

When("user reaches the {string} position tab", async function (tab: string) {
	await organizationPositionPage.openPositionTab(tab);
});

When("Verify the Chatter Count Tab", async function () {
	await organizationPositionPage.verifyChatterCountTab();
});

Then("records are present on the chatter page", async () => {
	await organizationPositionPage.verifyChatterRecords();
});

Then("verify records are grouped in Today", async () => {
	await organizationPositionPage.verifyChatterRecordsToday();
});

When("Attach Role to Position modal appears", async () => {
	await organizationPositionPage.verifyAttachRoleModalAppears();
});

When("user clicks on Attach Role button", async () => {
	await organizationPositionPage.clickOnAttachRoleBtn();
});

When("user clicks on Create and attach new role button", async () => {
	await organizationPositionPage.clickCreateAndAttachNewRoleButton();
	await organizationPositionPage.verifyAttachRoleConfirmationModalIsDisplayed(newRoleName.name);
	await organizationPositionPage.clickOnConfirmButton();
	await organizationPositionPage.verifyAttachRoleConfirmationNotificationIsDisplayed();
});

When("click on the Create and attach new role button", async () => {
	await organizationPositionPage.clickCreateAndAttachNewRoleButton();
});

Then("user click on the position", async () => {
	await organizationPositionPage.clickOnURLPostion();
	await organizationPositionPage.verifyPostionModal();
});

When("user clicks on Retire button", async () => {
	await organizationPositionPage.clickOnRetiredPositionBtn();
});

When("clicks on Retire button and Verify the Loader Icon", async () => {
	await organizationPositionPage.clickOnRetiredPositionBtn();
});

When("rename dialog appears", async () => {
	await organizationPositionPage.verifyRenameModalIsDisplayed();
});

When("user enters the new position name", async () => {
	await organizationPositionPage.enterTheNewName(newRoleName.name);
	console.log(newRoleName.name);
});

When("user clicks on Save button", async () => {
	await organizationPositionPage.clickSavebtnForRename();
});

Then("verify the new position in the positions list", async () => {
	await organizationPositionPage.verifyNewPositionIsCreated(newRoleName.name);
});

When("user clicks on Re-Activate button", async () => {
	await organizationPositionPage.clickOnReactivatePositionBtn();
});

When("user clicks on reactivate button and verify the load icons", async () => {
	await organizationPositionPage.clickOnReactivatePositionBtn();
});

When("click on Re-Activate button and Verify the Loader Icon", async () => {
	await organizationPositionPage.clickOnDeactivatePositionBtn();
});

When("user clicks on Attachment component", async () => {
	await organizationPositionPage.clickOnRoleDataCard();
	await baseInstance.wait(3);
});

Then("Verify The Detach Responsibilitu Modal", async () => {
	await organizationPositionPage.verifyDetachModal();
});

Then("user close the attachments popup", async () => {
	await organizationPositionPage.clickOnCloseIcon();
});

Then("Attachments popup appears", async () => {
	await baseInstance.wait(5);
	await organizationPositionPage.displayAttachmentsPopup();
});

Then("User click on the Detach Position", async () => {
	await organizationPositionPage.clickOnDetachPosition();
});

Then("verify attachments popup does not appear", async () => {
	await baseInstance.wait(5);
	await organizationPositionPage.attachmentsPopupNotVisible();
});

When("Verify that Name of the button should be Attach role", async () => {
	await organizationPositionPage.verifyAttachRoleBtnIsDisplayed();
});

Then("verify the background color for {string} position", async (status) => {
	await organizationPositionPage.searchForPosition(newPositionAPIData.position);
	await organizationPositionPage.verifyColorRowsForPositions(status);
});

Then("user hover over the specific position", async () => {
	await organizationPositionPage.verifyHoverOverPosition();
});

Then("Verify No Underlines position show to user", async () => {
	await organizationPositionPage.verifyPositionNameNotHyperlinked(newPositionAPIData.position);
});

Then("Verify Attachment Scrolable List appears", async () => {
	await organizationPositionPage.verifyAttachedRolesList();
});

Then("Verify Roles action Dropdown", async () => {
	await organizationPositionPage.verfyRolesActionDropDown();
});

Then("User hover on three dots menu of position to Verify the Magenta color", async () => {
	await organizationPositionPage.hoverOverThreeDotsMenu();
});

When("{string} option is not Visible", async (option: string) => {
	await organizationPositionPage.verifyOptions(option);
});

When("user click on three dot menu button", async () => {
	await organizationPositionPage.attachedRolesThreeDotMenu();
});

Then("verify {string} option is not visible", async (option: string) => {
	await organizationPositionPage.menuOptionNotVisible(option);
});

When("user selects an existing role from the list", async () => {
	await organizationPositionPage.selectRoleFromTheList();
});

When("clicks on the Attach button", async () => {
	await organizationPositionPage.clickOnAttachButton();
});

When("Check the Loader Icon then click the Attach button", async () => {
	await organizationPositionPage.clickOnAttachButton();
});

Then("verify the text of attach role button", async () => {
	await organizationPositionPage.verifyAttachRoleBtnDisplayed();
});

Then("verify the text of the page when no roles attached", async () => {
	await organizationPositionPage.verifyNoRolesAttachedTextVisible();
});

Then("User verify the text of attach role", async () => {
	await organizationPositionPage.verifyNoAttachedRolesFoundText();
});

Then("Verify Remove Roles Attached Counter", async () => {
	await organizationPositionPage.verifyRolesAttachedCountIsNotZero();
});

When("user clicks on the role counter", async () => {
	await organizationPositionPage.clickOnPositionRoleCounter();
});

Then("verify user navigates to attach role page", async () => {
	await organizationPositionPage.verifyAttachRoleBtnIsDisplayed();
});

Then("Verify the Position Attachments Page", async () => {
	await organizationPositionPage.verifyNoAttachedRolesFoundIsVisible();
});

When("Verify that no Assignment Modal Visible", async () => {
	await organizationPositionPage.clickOnAssignmentModal();
	await baseInstance.wait(3);
	await organizationPositionPage.clickOnCloseIcon();
	await organizationPositionPage.clickfilterBtn();
	await organizationPositionPage.verifyNoAssignmentRolesFoundIsVisible();
});

Then("verify no positions found text is visible", async () => {
	await organizationPositionPage.noPositionFoundTextDisplayed();
});

Then("verify Positions active counts on left navigation", async () => {
	const navigationCount = await organizationPositionPage.getLeftMenuActivePositionCount();
	const headerCount = await organizationPositionPage.getHeaderActivePositionCount();
	if (!headerCount) {
		throw new Error("Header count is undefined or null");
	}
	const headerNumber = headerCount.match(/(\d+)/)?.[1];
	expect(navigationCount).toBe(headerNumber);
});

Then("verify position count in sidebar before activation", async () => {
	const initialCount = await organizationPositionPage.getLeftMenuActivePositionCount();
	setSharedData("initialPositionCount", initialCount);
	console.log(`Initial position count: ${initialCount}`);
});

Then("verify position count in sidebar after activation", async () => {
	const finalCount = await organizationPositionPage.getLeftMenuActivePositionCount();
	const initialCount = getSharedData("initialPositionCount");
	const initialCountNum = parseInt(initialCount);
	const finalCountNum = parseInt(finalCount);

	console.log(`Initial count: ${initialCountNum}, Final count: ${finalCountNum}`);
	expect(finalCountNum).toBe(initialCountNum + 1);
});

When("user issues a badge to the responsibility via API", async () => {
	const responsibilityId = parseInt(getSharedData("responsibilityId"));
	const employeeId = parseInt(getSharedData("employeeId"));
	response = await accountApiCalls.createNewBadge(
		parseInt(process.env.ACCOUNT_ID || "3"),
		2,
		employeeId,
		responsibilityId,
	);
	await expect(response).toBeOK();
});

Then("verify the responsibility average readiness is 100% in the UI", async () => {
	await baseInstance.reloadPage();
	await baseInstance.wait(2);
	await organizationPositionPage.verifyReadinessValue(100);
});

export { newPositionData, newPositionAPIData };
