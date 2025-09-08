import { Given, Then, When } from "@cucumber/cucumber";
import LeftNavigationPage from "../../pages/owner/leftNavigationPage";
import ReadinessCatalogsResponsibilitiesPage from "../../pages/owner/readinessResponsibilityPage";
import { baseInstance } from "../../helpers/BaseClass";
import {
	RolesData,
	ResponsibilityData,
	getRandomRole,
	getRandomResponsibility,
	generateRandomEmployeeData,
	getRandomPhrase,
} from "../../helpers/util/random";
import { addedEmployeeData, addedSecoundEmployeeData } from "./employeeApiSteps";
import ResponsibilityApis from "../../apis/owner/responsibility";
import EmployeeApis from "../../apis/owner/employee";
import AccountApis from "../../apis/owner/account";
import { expect } from "@playwright/test";
import { elements } from "../../xpath/owner/readinessCatalogsResponsibilitiesPageElements";
import { getSharedData } from "../../helpers/util/sharedData";
import { newRole, responsibilityId } from "./readinessCatalogsResponsibilitiesApiSteps";
import { responsibilityData } from "./checkpointApiSteps";
import { apiRoleData } from "./rolesApiSteps";

let responsibility: string;
let response;
let responseBody;
let criteria: string;
let instructions: string;
const employeeIds = [];
const randomResponsibilityData: ResponsibilityData = getRandomResponsibility();
const employeeNames = [];
const leftNavigationPage: LeftNavigationPage = new LeftNavigationPage(baseInstance);
const readinessCatalogsPage: ReadinessCatalogsResponsibilitiesPage = new ReadinessCatalogsResponsibilitiesPage(
	baseInstance,
);
const accountApicalls: AccountApis = new AccountApis(baseInstance);
const employeeApiCalls: EmployeeApis = new EmployeeApis(baseInstance);
const responsibilityApiCalls: ResponsibilityApis = new ResponsibilityApis(baseInstance);

Then(/^you land on the Responsibilities Catalog page$/, async function () {
	await readinessCatalogsPage.verifyResponsibilitiesSubSectionIsFocused();
});

Then(/^you see a header with label "([^"]*)"$/, async function (headerLabel) {
	await readinessCatalogsPage.verifyHeaderTextIsDisplayed(headerLabel);
});

Then(/^a button \+Add Responsibility$/, async function () {
	await readinessCatalogsPage.verifyAddResponsibilityButtonIsDisplayed();
});

Then(/^column Dashboard$/, async function () {
	await readinessCatalogsPage.verifyDashboardColumnIsDisplayed();
});

Then(/^column Attached to$/, async function () {
	await readinessCatalogsPage.verifyAttachedToColumnIsDisplayed();
});

Then(/^column Status$/, async function () {
	await readinessCatalogsPage.verifyStatusColumnIsDisplayed();
});

Given(/^you are on the responsibilities tree$/, async function () {
	await leftNavigationPage.navigateTo("responsibilities");
	await readinessCatalogsPage.clickResponsibilitiesMenu();
	await readinessCatalogsPage.verifyResponsibilitiesSubSectionIsFocused();
	await readinessCatalogsPage.verifyAddResponsibilityButtonIsDisplayed();
});

When("user click on Add Responsibility button", async function () {
	await readinessCatalogsPage.clickAddResponsibilityButton();
});

When("user hover on the Add Responsibility button", async function () {
	await readinessCatalogsPage.hoverAddResponsibilityButton();
});
When("user add Responsibility name", async function () {
	await readinessCatalogsPage.verifyResponsibilityModalIsDisplayed();
	await readinessCatalogsPage.addResponsibility(randomResponsibilityData.name);
});

When("user add Responsibility name exceeding 120 characters", async function () {
	await readinessCatalogsPage.verifyResponsibilityModalIsDisplayed();
	const longResponsibilityName = "A".repeat(121);
	await readinessCatalogsPage.addResponsibility(longResponsibilityName);
});

Then("validation error message for character limit should be displayed", async function () {
	await readinessCatalogsPage.verifyCharacterLimitValidationMessage();
});

When("user click save responsibility button", async function () {
	await readinessCatalogsPage.clickSaveButton();
});

When("loading indicator is displayed insides save button", async function () {
	await readinessCatalogsPage.verifyLoadingBtnIndicator();
});

Then("a new responsibility should be created", async function () {
	await leftNavigationPage.reloadThePage();
	await readinessCatalogsPage.searchForResponsibilityAndGetBadge(randomResponsibilityData.name, "Draft");
});

Then("show action activate", async () => {
	await leftNavigationPage.navigateTo("responsibilities");
	await leftNavigationPage.reloadThePage();
	await readinessCatalogsPage.clickResponsibilitiesMenu();
	await readinessCatalogsPage.searchForResponsibilityAndGetBadge(newRole.name, "Draft");
	await readinessCatalogsPage.clickOntheFirst3DotMenu();
	await readinessCatalogsPage.optionTobeVisibel("Activate");
});

Then("show action delete", async () => {
	await readinessCatalogsPage.optionTobeVisibel("Delete");
});

Then("show action rename", async () => {
	await readinessCatalogsPage.optionTobeVisibel("Rename");
});

Then("show action Attach knowledge", async () => {
	await readinessCatalogsPage.optionTobeVisibel("Attach Knowledge");
});

Then("show action Detach from Role", async () => {
	await readinessCatalogsPage.optionTobeVisibel("Detach From Role");
});

When("you activate responsibility", async () => {
	await leftNavigationPage.navigateTo("responsibilities");
	await leftNavigationPage.reloadThePage();
	await readinessCatalogsPage.clickResponsibilitiesMenu();
	await readinessCatalogsPage.searchForResponsibilityAndGetBadge(newRole.name, "Draft");
	await readinessCatalogsPage.clickOntheFirst3DotMenu();
	await readinessCatalogsPage.clickOnTheOption("Activate");
});

Then("you show responsibility status changing to active", async () => {
	await readinessCatalogsPage.verifyStatusForResponsibility("Active");
});

Then("do not show action to delete the active responsibility", async () => {
	await leftNavigationPage.navigateTo("responsibilities");
	await leftNavigationPage.reloadThePage();
	await readinessCatalogsPage.clickResponsibilitiesMenu();
	await readinessCatalogsPage.searchForResponsibilityAndGetBadge(newRole.name, "Active");
	await readinessCatalogsPage.clickOntheFirst3DotMenu();
	await readinessCatalogsPage.optionToNotExist("Delete");
});

Then("do not show action to delete the responsibility", async () => {
	await leftNavigationPage.navigateTo("responsibilities");
	await leftNavigationPage.reloadThePage();
	await readinessCatalogsPage.clickResponsibilitiesMenu();
	await readinessCatalogsPage.searchForResponsibilityAndGetBadge(newRole.name, "Draft");
	await readinessCatalogsPage.clickOntheFirst3DotMenu();
	await readinessCatalogsPage.optionToNotExist("Delete");
});

Then("show action to delete the responsibility", async () => {
	await leftNavigationPage.navigateTo("responsibilities");
	await leftNavigationPage.reloadThePage();
	await readinessCatalogsPage.clickResponsibilitiesMenu();
	await readinessCatalogsPage.searchForResponsibilityAndGetBadge(newRole.name, "Draft");
	await readinessCatalogsPage.clickOntheFirst3DotMenu();
	await readinessCatalogsPage.optionTobeVisibel("Delete");
});

When("you delete responsibility", async () => {
	await leftNavigationPage.navigateTo("responsibilities");
	await leftNavigationPage.reloadThePage();
	await readinessCatalogsPage.clickResponsibilitiesMenu();
	await readinessCatalogsPage.searchForResponsibilityAndGetBadge(newRole.name, "Draft");
	await readinessCatalogsPage.clickOntheFirst3DotMenu();
	await readinessCatalogsPage.clickOnTheOption("Delete");
});

Then("pop up a confirmation dialog", async () => {
	await readinessCatalogsPage.deleteModalIsDisplayed();
});

Then("you confirm the Delete option", async () => {
	await readinessCatalogsPage.confirmDeleteOption();
});

Then("the responsibility disappears from the grid", async () => {
	await readinessCatalogsPage.verifyResponsibilityToNotExist(newRole.name);
});

When("you rename responsibility", async () => {
	await leftNavigationPage.navigateTo("responsibilities");
	await leftNavigationPage.reloadThePage();
	await readinessCatalogsPage.clickResponsibilitiesMenu();
	await readinessCatalogsPage.searchForResponsibilityAndGetBadge(newRole.name, "Draft");
	await readinessCatalogsPage.clickOntheFirst3DotMenu();
	await readinessCatalogsPage.clickOnTheOption("Rename");
});

Then("you pop up rename responsibility dialog", async () => {
	await readinessCatalogsPage.verifyTheRenamePopup();
});

Then("rename responsibility pop up appears", async () => {
	await readinessCatalogsPage.verifyTheRenamePopup();
});

Then("user collect the new name", async () => {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;
	await readinessCatalogsPage.applyRename(newRole.name);
});

Then("you collect the new name", async () => {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;
	await readinessCatalogsPage.applyRename(newRole.name);
});

Then("you see the responsibility name changed in the tree", async () => {
	await readinessCatalogsPage.searchForResponsibilityAndGetBadge(newRole.name, "Active");
});
Then("a modal titled \"Attach Responsibility\" appears", async function () {
	await readinessCatalogsPage.verifyResponsibilityModalIsDisplayed();
});

Then("you input the name of a new responsibility", async function () {
	await readinessCatalogsPage.addResponsibilityOntheFly();
});

Then("you confirm the creation of this new responsibility", async function () {
	await readinessCatalogsPage.createNewResponsibility();
});

Then("affirm that it should be linked to the selected role", async function () {
	await readinessCatalogsPage.affirmResponsibilityAttached();
});

Then("you verify the successful attachment of the responsibility to the role", async function () {
	await readinessCatalogsPage.verifyResponsibilityAttached();
});

Then("show status badge Retired.", async () => {
	await leftNavigationPage.navigateTo("responsibilities");
	await leftNavigationPage.reloadThePage();
	await readinessCatalogsPage.clickResponsibilitiesMenu();
	await readinessCatalogsPage.searchForResponsibilityAndGetBadge(newRole.name, "Retired");
});

Then("show action \"Re-activate\" responsibility", async () => {
	await readinessCatalogsPage.clickOntheFirst3DotMenu();
	await readinessCatalogsPage.optionTobeVisibel("Re-activate");
});

Then("do not show action retire responsibility", async () => {
	await leftNavigationPage.navigateTo("responsibilities");
	await leftNavigationPage.reloadThePage();
	await readinessCatalogsPage.clickResponsibilitiesMenu();
	await readinessCatalogsPage.searchForResponsibilityAndGetBadge(newRole.name, "Draft");
	await readinessCatalogsPage.clickOntheFirst3DotMenu();
	await readinessCatalogsPage.optionTobeVisibel("Retire");
});

When("you retire a responsibility", async () => {
	await leftNavigationPage.navigateTo("responsibilities");
	await leftNavigationPage.reloadThePage();
	await readinessCatalogsPage.clickResponsibilitiesMenu();
	await readinessCatalogsPage.searchForResponsibilityAndGetBadge(newRole.name, "Active");
	await readinessCatalogsPage.clickOntheFirst3DotMenu();
	await readinessCatalogsPage.clickOnTheOption("Retire");
});

Then("you show responsibility status changing to retired", async () => {
	await readinessCatalogsPage.verifyStatusForResponsibility("Retired");
});

Given("that you are in Account > Catalogs > Responsibilities", async () => {
	await leftNavigationPage.navigateTo("responsibilities");
	await leftNavigationPage.reloadThePage();
	await readinessCatalogsPage.clickResponsibilitiesMenu();
});

When("you drop down the line menu", async () => {
	await readinessCatalogsPage.clickOntheFirst3DotMenu();
});

Then("DO NOT show action Detach from role", async () => {
	await readinessCatalogsPage.optionToNotExist("Detach From Role");
});
Given("user open the Responsibility modal", async function () {
	await leftNavigationPage.navigateTo("responsibilities");
	await readinessCatalogsPage.openResponsibilityModal();
});

When("user add a badge holder", async function () {
	await readinessCatalogsPage.addBadgeHolder();
});

Then("user open Force Badge dialog", async function () {
	await readinessCatalogsPage.verifyBadgeDialog();
});

Then("user select the employee", async function () {
	await readinessCatalogsPage.selectEmployee(addedEmployeeData.firstName);
});

Then("user also select the badge level", async function () {
	await readinessCatalogsPage.selectEmployeeBadge();
});

Then("user click on the save badge button", async function () {
	await readinessCatalogsPage.forceBadge();
});

Then("user show see the badge holder in the Badge Holders View", async function () {
	await readinessCatalogsPage.verifyBadgeOnResponsibilityModal();
});

Given("that you are looking at the Badge holders view", async function () {
	await leftNavigationPage.navigateTo("responsibilities");
	await readinessCatalogsPage.openResponsibilityModal();
});

Then("user should have at least one current badge", async function () {
	await readinessCatalogsPage.addBadgeHolder();
	await readinessCatalogsPage.verifyBadgeDialog();
	await readinessCatalogsPage.selectEmployee(addedEmployeeData.firstName);
	await readinessCatalogsPage.selectEmployeeBadge();
	await readinessCatalogsPage.forceBadge();
	await readinessCatalogsPage.verifyBadgeOnResponsibilityModal();
});

When("user remove the granted badge", async function () {
	await readinessCatalogsPage.removeBadge();
});

Then("user confirm the pop up confirmation dialog", async function () {
	await readinessCatalogsPage.removeBadgePop();
});

Then("the badge should get diappred", async function () {
	await readinessCatalogsPage.confirmRemoveBadge();
});

Given("user have more then one badge holder to a responsibility", async function () {
	await leftNavigationPage.navigateTo("responsibilities");
	await readinessCatalogsPage.openResponsibilityModal();
	await readinessCatalogsPage.addBadgeHolder();
	await readinessCatalogsPage.selectEmployee(addedEmployeeData.firstName);
	await readinessCatalogsPage.selectEmployeeBadge();
	await readinessCatalogsPage.forceBadge();
	await readinessCatalogsPage.addBadgeHolder();
	await readinessCatalogsPage.selectEmployee(addedSecoundEmployeeData.firstName);
	await readinessCatalogsPage.selectEmployeeBadge();
	await readinessCatalogsPage.forceBadge();
});

When("user search for the badge", async function () {
	await readinessCatalogsPage.searchBadge(addedEmployeeData.firstName);
});

Then("user should only see badge holders that contains search string", async function () {
	await readinessCatalogsPage.verifySearchResult(addedEmployeeData.firstName);
});

Then("you can see at least one responsibility in the tree", async function () {
	await readinessCatalogsPage.verifyResponsibilitiesVisible();
});

When("you use the responsibility name to open the responsibility modal", async function () {
	await readinessCatalogsPage.openResponsibilityModal();
});

Then("it open the responsibility modal", async function () {
	await readinessCatalogsPage.verifyBadgeOnResponsibilityModal();
});

Given("you add 4 employees are added to the system via API", async () => {
	for (let i = 0; i < 4; i++) {
		const employeeData = generateRandomEmployeeData();
		const response = await employeeApiCalls.createEmployee(
			employeeData.firstName,
			employeeData.lastName,
			employeeData.title,
			"draft",
		);
		const responseBody = await response.json();
		expect(responseBody.current_status).toBe("draft");
		const employeeId = responseBody.id;
		employeeIds.push(employeeId);

		const employeeDetails = `${employeeData.firstName} ${employeeData.lastName}`;
		employeeNames.push(employeeDetails);
	}
});

Given("user adds employees to the system via API", async () => {
	for (let i = 0; i < 4; i++) {
		const employeeData = generateRandomEmployeeData();
		const response = await employeeApiCalls.createEmployee(
			employeeData.firstName,
			employeeData.lastName,
			employeeData.title,
			"draft",
		);
		const responseBody = await response.json();
		expect(responseBody.current_status).toBe("draft");
		const employeeId = responseBody.id;
		employeeIds.push(employeeId);

		const employeeDetails = `${employeeData.firstName} ${employeeData.lastName}`;
		employeeNames.push(employeeDetails);
	}
});

When("user create a responsibility and you grant different badges to all 4 employees", async function () {
	responsibility = randomResponsibilityData.name;
	response = await responsibilityApiCalls.createResponsibility(responsibility, "draft");
	responseBody = await response.json();
	const responsibilityId = responseBody.id;
	response = await accountApicalls.createNewBadge(3, 1, employeeIds[0], responsibilityId);
	await expect(response).toBeOK();
	response = await accountApicalls.createNewBadge(3, 2, employeeIds[1], responsibilityId);
	await expect(response).toBeOK();
	response = await accountApicalls.createNewBadge(3, 3, employeeIds[2], responsibilityId);
	await expect(response).toBeOK();
	response = await accountApicalls.createNewBadge(3, 4, employeeIds[3], responsibilityId);
	await expect(response).toBeOK();
});

When(/^you navigate to the responsibility page and select the created responsibility$/, async function () {
	await leftNavigationPage.navigateTo("responsibilities");
	await leftNavigationPage.reloadThePage();
	await readinessCatalogsPage.clickResponsibilitiesMenu();
	await readinessCatalogsPage.searchForResponsibilityAndOpenIt(responsibility);
});

Given("user navigate to the responsibility page", async () => {
	await leftNavigationPage.navigateTo("responsibilities");
});

When("user click on the created responsibility", async () => {
	await readinessCatalogsPage.searchForResponsibilityAndOpenIt(responsibility);
});

Then(/^you reach the badge page and all badges are sorted according to their level$/, async function () {
	await readinessCatalogsPage.verifyBadgeOrder("Master", 0);
	await readinessCatalogsPage.verifyBadgeOrder("Coach", 1);
	await readinessCatalogsPage.verifyBadgeOrder("Professional", 2);
	await readinessCatalogsPage.verifyBadgeOrder("Apprentice", 3);
	expect(await baseInstance.getText(elements.badgeHoldersModal.masterBadgeName)).toEqual(employeeNames[3]);
	expect(await baseInstance.getText(elements.badgeHoldersModal.coachBadgeName)).toEqual(employeeNames[2]);
	expect(await baseInstance.getText(elements.badgeHoldersModal.professionalBadgeName)).toEqual(employeeNames[1]);
	expect(await baseInstance.getText(elements.badgeHoldersModal.apprenticeBadgeName)).toEqual(employeeNames[0]);
	await readinessCatalogsPage.hoverOverBadgeName();
	await readinessCatalogsPage.verifyHoverBadgeNameTootips();
});

Then("user reach the badge page and all badges are sorted according to their level", async () => {
	await readinessCatalogsPage.verifyBadgeOrder("Master", 0);
	await readinessCatalogsPage.verifyBadgeOrder("Coach", 1);
	await readinessCatalogsPage.verifyBadgeOrder("Professional", 2);
	await readinessCatalogsPage.verifyBadgeOrder("Apprentice", 3);
	expect(await baseInstance.getText(elements.badgeHoldersModal.masterBadgeName)).toEqual(employeeNames[3]);
	expect(await baseInstance.getText(elements.badgeHoldersModal.coachBadgeName)).toEqual(employeeNames[2]);
	expect(await baseInstance.getText(elements.badgeHoldersModal.professionalBadgeName)).toEqual(employeeNames[1]);
	expect(await baseInstance.getText(elements.badgeHoldersModal.apprenticeBadgeName)).toEqual(employeeNames[0]);
	await baseInstance.wait(2);
});

When("user opens a responsibility", async function () {
	await readinessCatalogsPage.searchForResponsibilityAndOpenIt(newRole.name);
});

When("user hover on the Issue Badge button", async function () {
	await readinessCatalogsPage.hoverOverIssueBadge();
});

When("user hover on the Add checkpoint button", async function () {
	await readinessCatalogsPage.hoverOverAddCheckPointButton();
});

When("user clicks on search field", async () => {
	await readinessCatalogsPage.clickOnSearchField();
});

Then("verify search label is visible", async () => {
	await readinessCatalogsPage.verifySearchLabel();
});

Given("user searches for the responsibility", async () => {
	await readinessCatalogsPage.searchForResponsibilityAndOpenIt(newRole.name);
});

Given("user search for the responsibility with checkpoint", async () => {
	const responsibilityName = getSharedData("responsibilityName");
	if (!responsibilityName) {
		throw new Error("Responsibility name not found. Make sure the responsibility was created via API first.");
	}
	await readinessCatalogsPage.searchForResponsibilityAndOpenIt(responsibilityName);
});

Given("verify apprentice checkpoints counter is visible", async () => {
	await readinessCatalogsPage.verifyApprenticeCheckpointCounter();
	await baseInstance.wait(5);
});

Given("verify professional checkpoints counter is visible", async () => {
	await readinessCatalogsPage.verifyProfessionalCheckpointCounter();
});

Given("verify master checkpoints counter is visible", async () => {
	await readinessCatalogsPage.verifyMasterCheckpointCounter();
});

Given("verify coach checkpoints counter is visible", async () => {
	await readinessCatalogsPage.verifyCoachCheckpointCounter();
});

Given("User searches for the responsibility", async () => {
	await readinessCatalogsPage.searchForResponsibilityAndNotOpen(newRole.name);
});

Given("User click on Attched Column to detach the Responsibility", async () => {
	await readinessCatalogsPage.clickOnRoleDataCard();
	await readinessCatalogsPage.displayAttachmentsPopup();
	await readinessCatalogsPage.clickOnDetachResponsibility();
});

When("user search for responsibility", async () => {
	await readinessCatalogsPage.searchesForResponsibility(newRole.name);
});

Given("user click on the filter button", async () => {
	await readinessCatalogsPage.clickOnFilterButton();
});

Given("The User click on the filter button when  no filter is selected", async () => {
	await readinessCatalogsPage.clickFilterButton();
});

Given("user clicks the three dot menu for the responsibility", async () => {
	await readinessCatalogsPage.clickThreeDotofResponsibility();
});

Then("user select {string} option for responisibility", async (option: string) => {
	await readinessCatalogsPage.selectOptionFromMenu(option);
});

When("you show breadcrumb", async function () {
	await readinessCatalogsPage.verifyBreadCrumbsOnResponsibility();
});

When("user click on {string} Responsibilities Ellipsis menu", async (status: string) => {
	await readinessCatalogsPage.searchForResponsibilityAndGetBadge(newRole.name, status);
	await readinessCatalogsPage.clickOntheFirst3DotMenu();
});

Then("{string} responsibility option should not be visible in the list", async (option: string) => {
	await readinessCatalogsPage.optionToNotExist(option);
});

Then("{string} responsibility option should be visible in the list", async (option: string) => {
	await readinessCatalogsPage.optionTobeVisibel(option);
	await baseInstance.wait(5);
});

When("{string} the Responsibility", async (option: string) => {
	await readinessCatalogsPage.clickOnTheOption(option);
});

When("user {string} and check the loader", async (option: string) => {
	await readinessCatalogsPage.clickOnTheOption(option);
});

Then("status badge for Responsibility change to {string}", async (status: string) => {
	await readinessCatalogsPage.searchForResponsibilityAndGetBadge(newRole.name, status);
});

When("user clicks on {string} badge", async (badge: string) => {
	const badgeName = badge.toLowerCase();
	await readinessCatalogsPage.clickResponsibilityBadgeCounter(badgeName);
});

Then("verify {string} badge is selected", async (badge: string) => {
	const badgeName = badge.toLowerCase();
	await readinessCatalogsPage.badgeCounterSelected(badgeName);
});

Then("verify {string} badge appears", async (badge: string) => {
	await readinessCatalogsPage.badgeIsDisplayedOnResponsibility(badge);
});

Then("verify that user can search within the list of badge holders", async () => {
	await readinessCatalogsPage.searchFieldForBadgeHolder();
});

Then("Verify that No badge holder found", async () => {
	await readinessCatalogsPage.verifyNoBadgeHolderText();
});

Given("user searches for a specific responsibility", async () => {
	await readinessCatalogsPage.searchForResponsibility(apiRoleData.name);
});

Given("user search for the responsibility", async () => {
	await readinessCatalogsPage.searchForResponsibility(newRole.name);
});

Given("user clicks on the responsibility", async () => {
	await readinessCatalogsPage.clickOnFirstResponsibility();
});

When("adds a {string} checkpoint", async function (level: string) {
	criteria = getRandomPhrase();
	instructions = getRandomPhrase();
	await readinessCatalogsPage.openResponsibilityTab("Checklist");
	await readinessCatalogsPage.addCheckpointInst(criteria, level);
});

When("adds a 70 character long {string} checkpoint", async function (level: string) {
	criteria = getRandomPhrase();
	instructions =
		"This is a 70-character instruction to test the checkpoint functionality.This is a 70-character instruction to test the checkpoint functionality.";
	await readinessCatalogsPage.openResponsibilityTab("Checklist");
	await readinessCatalogsPage.addCharacterCheckpointInst(criteria, instructions, level);
});

Then("Verify the background color", async () => {
	await readinessCatalogsPage.verifyBackgroundColor();
});

When("user adds a {string} checkpoint", async function (level: string) {
	criteria = getRandomPhrase();
	instructions = getRandomPhrase();
	await readinessCatalogsPage.openResponsibilityTab("Checklist");
	await readinessCatalogsPage.addCheckpointWithoutInst(criteria, level);
});

When("User add {string} checkpoint and  should see a popup window", async function (level: string) {
	criteria = getRandomPhrase();
	instructions = getRandomPhrase();
	await readinessCatalogsPage.openResponsibilityTab("Checklist");
	await readinessCatalogsPage.verifyPopUpForInstructionLink(criteria, instructions, level);
});

When(
	"Verify that the user sees a popup window after clicking the Attach Link button for {string}",
	async function (level: string) {
		criteria = getRandomPhrase();
		instructions = getRandomPhrase();
		await readinessCatalogsPage.openResponsibilityTab("Checklist");
		await readinessCatalogsPage.addCheckpoint(criteria, instructions, level);
	},
);

Then("verify the checkpoint name in chatter drawer", async () => {
	await readinessCatalogsPage.verifyChatterName(criteria);
});

Then("verify that the checkpoint is displayed at the bottom of the level section", async function () {
	await readinessCatalogsPage.verifyCheckpointCriteriaAndInstructions(criteria);
});

When("user reaches the {string} tab", async function (tab: string) {
	await readinessCatalogsPage.openResponsibilityTab(tab);
});

Then("verify the Responsibility Assignment Status {string}", async (status: string) => {
	await readinessCatalogsPage.verifyResponsibilityStatus(status);
});

Then("the user looks at the list of employees", async () => {
	await readinessCatalogsPage.verifyListOfEmployee();
});

Then("the first employee card should display an Availability icon", async () => {
	await readinessCatalogsPage.verifyEmployeeCards();
});

Then("it should display as you as the request", async () => {
	await readinessCatalogsPage.verifyRequester();
});

Then("user verify the Accepted Tag", async () => {
	await readinessCatalogsPage.verifyAccptedTag();
});

Then("verify No Checkpoints Found text is visible", async () => {
	await readinessCatalogsPage.noCheckpointsFoundTextVisible();
});

Then("verify add checkpoint button is visible", async () => {
	await readinessCatalogsPage.verifyAddCheckpointBtnVisible();
});

Then("verify No Checkpoints Visible text is visible", async () => {
	await readinessCatalogsPage.verifyNoCheckpointsVisibleText();
});

When("Verify that Display No Checklists Found", async function () {
	await readinessCatalogsPage.verifyTheEmptyChecklist();
});

Then("verify that a message {string} is displayed at index {int}", async function (message: string, index: number) {
	await readinessCatalogsPage.verifyChatterText(index, message);
});

Then("number of messages displayed is {int}", async function (numberOfMessages: number) {
	await readinessCatalogsPage.verifyNumberOfMessagesInChatter(numberOfMessages);
});

When("user clicks on Issue Badge button", async () => {
	await readinessCatalogsPage.clickOnIssueBadgeBtn();
});

When("verify grant badge modal appears", async () => {
	await readinessCatalogsPage.grantBadgeModalDisplayed();
});

When("user searches for the employee", async () => {
	await readinessCatalogsPage.employeeBadgeSearch(addedEmployeeData.firstName);
});

When("user clicks on employee field drop down", async () => {
	await baseInstance.wait(10);
	await readinessCatalogsPage.clickOnPickEmployeeField();
});

Then("User click on Not Applicable Icon", async function () {
	await readinessCatalogsPage.clickOnNotApplicableButton();
});

Then("Verify that the Reason Field For Not Applicable is Open", async function () {
	await readinessCatalogsPage.reasonFieldForNotApplicableModal();
});

Then("Verify that the Reason Model For fail is Open", async function () {
	await readinessCatalogsPage.reasonFieldForFailModal();
});

Then("Mark As Not Applicable Button should be Disabled By Default", async function () {
	await readinessCatalogsPage.verifyNotApplicableBtnDisabled();
});

Then("User Confirm fail Button should be Disabled By Default", async function () {
	await readinessCatalogsPage.verifyFailedBtnDisabled();
});

Then("User clicks on the fail CheckPoint Button", async function () {
	await readinessCatalogsPage.clickOnFailedBtn();
});

Then("User clicks on the Mark As Not Applicable Button", async function () {
	await readinessCatalogsPage.clickOnNotApplicableBtn();
});

Then("User Enter the Reason In The Field", async function () {
	await readinessCatalogsPage.enterReason();
});

Then("User remove the status filter", async function () {
	await readinessCatalogsPage.removeFilter();
});

Then("Row Should show as Not Applicable", async function () {
	await readinessCatalogsPage.verifyRowNotApplicableIcon();
});

Then("the user hovers over the message icon", async () => {
	await readinessCatalogsPage.hoverOverCommentIcon();
});

Then("verify Reason for Not Applicable", async () => {
	await readinessCatalogsPage.toolTipContentVisible();
});

Then("verify Reason for Failed checkpoint", async () => {
	await readinessCatalogsPage.toolTipContentVisible();
});

When("user clicks on employee field", async () => {
	await readinessCatalogsPage.clickOnEmployeeField();
});

Then("verify employee list appears", async () => {
	await readinessCatalogsPage.verifyEmployeeList();
});

Then("verify caret icon is in upward direction", async () => {
	await readinessCatalogsPage.verifyCaretIconIsUp();
});

Then("user clicks on upward caret icon", async () => {
	await readinessCatalogsPage.clickUpCaretIcon();
});

Then("verify employee list disappears", async () => {
	await readinessCatalogsPage.verifyEmployeeListNotVisible();
});

Then("verify caret icon is in downward direction", async () => {
	await readinessCatalogsPage.verifyCaretIconIsDownwards();
});

When("user selects employee from the list", async () => {
	await readinessCatalogsPage.selectFirstEmployee();
});

When("User Unselect the employee from the list", async () => {
	await readinessCatalogsPage.userClickOnCrossIcon();
	await readinessCatalogsPage.verifyNextBtnDisabled();
});

Then("verify issue badge modal appears", async () => {
	await readinessCatalogsPage.issueBadgeModalDisplayed();
});

Then("user clicks on next button", async () => {
	await readinessCatalogsPage.clickOnNextButton();
});

Then("verify Evaluate Proficiency for a Responsibility page is displayed", async () => {
	await baseInstance.wait(5);
	await readinessCatalogsPage.proficiencyModalDisplayed();
});

Then("Verify List of checkpoints to evaluate in Evaluation modal", async () => {
	await readinessCatalogsPage.verifyListOfCheckpoint();
});

Then("verify Inspect Proficiency for a Responsibility page is displayed", async () => {
	await baseInstance.wait(5);
	await readinessCatalogsPage.proficiencyModalDisplayed();
});

Then("force badge button is displayed", async () => {
	await readinessCatalogsPage.verifyForceBadgeDisplayed();
});

Then("user clicks on Give Badge button", async () => {
	await readinessCatalogsPage.clickOnGiveBadge();
});

Then("verify {string} badge", async (badge: string) => {
	await readinessCatalogsPage.badgeIsDisplayedOnEmployee(badge);
});

Then(/^message posted to responsibility chatter is displayed$/, async function () {
	await readinessCatalogsPage.verifyChatterText(0, getSharedData("note"));
});

Then("verify the Load more button is displayed", async function () {
	await readinessCatalogsPage.verifyLoadMorebuttonIsDisplayed();
});

When("user get the code of the responsibility with status {string}", async (status: string) => {
	await readinessCatalogsPage.searchForResponsibilityAndGetBadge(newRole.name, status);
});

Then("code should include '#' sign in the code", async () => {
	const code = await readinessCatalogsPage.getResponsibilityCode();
	expect(code).toContain("#");
});

When("the user apply the {string} status filter for Responsibilities", async function (status: string) {
	await readinessCatalogsPage.applyStatusFilter(status);
});

Then("user select {string} filter", async (status: string) => {
	await readinessCatalogsPage.selectFilter(status);
});

When("filter modal disappears", async () => {
	await readinessCatalogsPage.filterModalIsNotDisplayed();
});

Then("verify {string} filter is not selected", async (status: string) => {
	await readinessCatalogsPage.statusFiltersDisplayed(status);
});

Then("user click on save filter button", async () => {
	await readinessCatalogsPage.clickOnSaveBtn();
});

Then("user click on the more filter button", async () => {
	await readinessCatalogsPage.clickOnMoreFilterBtn();
});

Then("verify {string} filter is removed", async (option: string) => {
	await readinessCatalogsPage.verifyFilterIsRemoved(option);
});

Then("the user see a list of Responsibilities filtered by {string}", async function (status: string) {
	await readinessCatalogsPage.verifyFilteredResults(status);
});

Then("verify the user see a list of Responsibilities filtered by {string}", async function (status: string) {
	await readinessCatalogsPage.verifyFilteredResults(status);
});

Then("remove a {string} filter for Responsibilities", async function (status: string) {
	await readinessCatalogsPage.removeStatusFilter(status);
});

Then("the user should not see the removed {string} filter for Responsibilities", async function (status: string) {
	await readinessCatalogsPage.verifyFilterRemoved(status);
});

When(
	"the user apply multiple filters like {string} and {string} for Responsibilities",
	async function (status1, status2) {
		const filters = [status1, status2];
		await readinessCatalogsPage.applyMultipleFilters(filters);
	},
);

Then(
	"the user sees a list of Responsibilities filtered by statuses {string} and {string}",
	async function (status1, status2) {
		const filters = [status1, status2];
		await readinessCatalogsPage.verifyMultipleFilteredResults(filters);
	},
);
When("user navigates to {string} tab", async function (responsibilityTabName: string) {
	await readinessCatalogsPage.openResponsibilityTab(responsibilityTabName);
});

Then("user click on checklist menu", async function () {
	await readinessCatalogsPage.clickChecklistActionMenu();
});

Then("click on checklist action menu", async function () {
	await readinessCatalogsPage.clickActionMenuChecklist();
});

Then("user click on action menu for Checkpoint", async function () {
	await readinessCatalogsPage.clickChecklistActionMenu();
});

Then("the {string} checklist option is visible", async function (action: string) {
	await readinessCatalogsPage.verifyChecklistActionVisble(action);
});

When("user click on {string} checkpoint option", async function (action: string) {
	await readinessCatalogsPage.clickOnChecklistAction(action);
});

Then("verify checkpoint dialogue should be visible", async function () {
	await readinessCatalogsPage.verifyChangeChecklistModal();
});

Then("User has change the profiency level to {string}", async function (badgeLevel: string) {
	await readinessCatalogsPage.updateCheckpointLevel(badgeLevel);
});

Then("user has not change the profiency level", async function () {
	instructions = getRandomPhrase();
	await readinessCatalogsPage.updateChecklistInstruction(instructions);
});

When("User save the checkpoint", async function () {
	await readinessCatalogsPage.saveUpdatedChecklist();
});

Then("user see changes in the instruction", async function () {
	await readinessCatalogsPage.verifyInstructionsUpdated(instructions);
});

Then("Verify the proficieny badge updated to {string}", async function (badgeLevel: string) {
	await readinessCatalogsPage.verifyChecklistBadgeUpdated(badgeLevel);
});

When("User select the {string} action option", async function (action: string) {
	await readinessCatalogsPage.selectCheckpointAction(action);
});

Then("Verify {string} checkpoint pop-up should appear", async function (action: string) {
	await readinessCatalogsPage.verifyDeleteCheckpointPopUp(action);
});

When("User click on {string} Button", async function (action: string) {
	await readinessCatalogsPage.performCheckpointAction(action);
});

Then("Verify checkpoint disappeared from the list", async function () {
	await readinessCatalogsPage.verifyCheckpointRemoved(criteria);
});

Then("Verify checkpoint status to be {string}", async function (status: string) {
	await readinessCatalogsPage.verifyCheckpointStatus(criteria, status);
});

When("user opens a checkpoint", async function () {
	await readinessCatalogsPage.navigateToCheckpoint(responsibilityData.name);
});

When("user search for a responsibility", async function () {
	await baseInstance.reloadPage();
	const responsibilityName = getSharedData("responsibilityName");
	if (!responsibilityName) {
		throw new Error("Responsibility name not found. Make sure the responsibility was created via API first.");
	}
	await readinessCatalogsPage.navigateToResponsibility(responsibilityName);
	await baseInstance.wait(5);
});

When("User searches for the responsibility without opening it", async function () {
	await baseInstance.reloadPage();
	await baseInstance.wait(5);
	const responsibilityName = getSharedData("responsibilityName");
	if (!responsibilityName) {
		throw new Error("Responsibility name not found. Make sure the responsibility was created via API first.");
	}
	await readinessCatalogsPage.searchForResponsibilityAndNotOpen(responsibilityName);
});

When("verify checklist counter is red", async function () {
	await readinessCatalogsPage.verifyChecklistHaveNoCounter();
});

When("click on red checkpoint counter", async function () {
	await readinessCatalogsPage.clickOnCheckPointCounter();
	await baseInstance.wait(3);
});

Then("Verify that system displays all 12 checkpoints count", async function () {
	await readinessCatalogsPage.verifyChecklistCount();
});

Then("the user clicks on the Filter button", async function () {
	await readinessCatalogsPage.clickFilterButton();
});

Then("Verify that Filter Bar Is Not visible", async function () {
	await readinessCatalogsPage.clickFilterButtonisVisible();
});

When("the user apply the {string} status filter for Checkpoint", async function (status: string) {
	await readinessCatalogsPage.applyStatusFilter(status);
});

When("User apply the {string} filter for Checkpoint", async function (status: string) {
	await readinessCatalogsPage.applyStatusFilters(status);
});

When("user selects {string} filter for checklist", async (status: string) => {
	await readinessCatalogsPage.applyStatusFilterForCheckpoint(status);
});

Then("the user see a list of Checkpoint filtered by {string}", async function (status: string) {
	await readinessCatalogsPage.verifyFilteredResults(status);
});

When("user clicks on Assignment component", async () => {
	await readinessCatalogsPage.clickOnAssignmentCard();
	await baseInstance.wait(3);
});

When("User drill down into Responsibility Assignments Page", async () => {
	await readinessCatalogsPage.verifyAssignmentPage();
});

When("the user applies multiple filters like {string} and {string} for Checkpoints", async function (status1, status2) {
	const filters = [status1, status2];
	await readinessCatalogsPage.applyMultipleFilters(filters);
});

When(
	"the user sees a list of Checkpoints filtered by statuses {string} and {string}",
	async function (status1, status2) {
		const filters = [status1, status2];
		await readinessCatalogsPage.verifyMultipleFilteredResults(filters);
	},
);

Then("remove a {string} filter for a Responsibility", async function (status: string) {
	await readinessCatalogsPage.removeStatusFilter(status);
});

Then("remove a {string} filter for a Checkpoint", async function (status: string) {
	await readinessCatalogsPage.removeStatusFilter(status);
});

Then("the user should not see the removed {string} filter for checklist", async function (status: string) {
	await readinessCatalogsPage.verifyFilterRemoved(status);
	await baseInstance.wait(5);
});

Then("verify the added {string} filter for checklist is visible after reloading", async (status: string) => {
	await baseInstance.reloadPage();
	await readinessCatalogsPage.openResponsibilityTab("Checklist");
	await readinessCatalogsPage.verifyFilterDisplayed(status);
	await baseInstance.wait(5);
});

Then("verify the added {string} filter for checklist is visible", async (status: string) => {
	await readinessCatalogsPage.verifyFilterDisplayed(status);
	await baseInstance.wait(5);
});

Then("verify the save button is disabled", async function () {
	await readinessCatalogsPage.verifySaveButtonDisabled();
});

Then("verify the save button is enabled", async function () {
	await readinessCatalogsPage.verifySaveButtonEnabled();
});

Then("user hovers over the {string} checkpoint counter", async function (badge: string) {
	await readinessCatalogsPage.hoverOverCheckpointCounter(badge);
});

When("user hovers over the checkpoint", async function () {
	await readinessCatalogsPage.hoverOverCriteria();
});

Then("the tooltip should display message Click to edit", async () => {
	await baseInstance.wait(2);
	await readinessCatalogsPage.verifyCriteriaHoverTooltip();
});

Then("user clicks the {string} checkpoint counter", async function (badge: string) {
	await readinessCatalogsPage.clickCheckpointCounter(badge);
});

Then("click the {string} checkpoint counter selected", async function (badge: string) {
	await readinessCatalogsPage.checkpointCounterSelected(badge);
});

Then("click on {string} checkpoint badge status", async function (badgeStatus: string) {
	await readinessCatalogsPage.verifyCheckpointBadgeStatus(badgeStatus);
});

Then("Display the checkpoint criteria", async function () {
	await readinessCatalogsPage.verifyCheckpointCriteria(criteria);
});

When("user add a {string} checkpoint without optional instructions", async function (level: string) {
	criteria = getRandomPhrase();
	await readinessCatalogsPage.openResponsibilityTab("Checklist");
	await readinessCatalogsPage.addCheckpointWithoutInst(criteria, level);
});

When("user clicks on newly created criteria", async () => {
	const newCheckPointCriteria = `${criteria}`;
	await readinessCatalogsPage.clickNewCheckPoint(newCheckPointCriteria);
});

Then("verify criteria modal appears", async () => {
	await readinessCatalogsPage.criteriaModalAppears();
});

Then("verify newly created checkpoint is visible", async () => {
	const newCheckPointCriteria = `${criteria}`;
	await readinessCatalogsPage.verifyNewCheckPointIsDisplayed(newCheckPointCriteria);
});

Then("user click on see more button", async () => {
	await readinessCatalogsPage.clickOnSeeMoreButton();
});

Then("the {string} page is reloaded", async (tab) => {
	await leftNavigationPage.reloadThePage();
	await readinessCatalogsPage.openResponsibilityTab(tab);
});

Then("the tooltip should display Click to filter checkpoints by {string}", async function (level: string) {
	await readinessCatalogsPage.verifyHoverCheckpointTootips(level);
});
Then("the tooltip should display Unselect to remove filter by level {string}", async function (level: string) {
	await readinessCatalogsPage.verifySelectedCheckpointTooltips(level);
});

When("user clicks on Chatter tab", async () => {
	await readinessCatalogsPage.openResponsibilityTab("Chatter");
});

Then("user clicks the save button in the responsibility modal", async function () {
	await readinessCatalogsPage.clickSaveButtonFromRenameModal();
});

Then("verify chatter records for responsibility", async () => {
	await readinessCatalogsPage.verifyChatterRecords();
});

Then("verify chatter records are grouped in Today for responisibility", async () => {
	await readinessCatalogsPage.verifyChatterRecordsToday();
});

Then("verify the status of the responsibility is {string}", async (status: string) => {
	await readinessCatalogsPage.getResponsibilityStatusBadge(status);
});

Then("verify responsibility name changed in the tree", async () => {
	await readinessCatalogsPage.searchForResponsibilityAndGetBadge(newRole.name, "Active");
});

Then("User hover over  remove icon in a badge holder", async () => {
	await readinessCatalogsPage.hoverOverBadgeIcon();
});

Then("verify tooltip Remove Badge", async () => {
	await readinessCatalogsPage.verifyBadgeIconTooltips();
});

Then("verify default filter for checkpoint is {string}", async (status: string) => {
	await readinessCatalogsPage.verifyDefaultFilterIsDisplayed(status);
});

When("user create a responsibility and you grant different badges to employees", async function () {
	responsibility = randomResponsibilityData.name;
	response = await responsibilityApiCalls.createResponsibility(responsibility, "draft");
	responseBody = await response.json();
	const responsibilityId = responseBody.id;
	await expect(response).toBeOK();
	response = await accountApicalls.createNewBadge(3, 2, employeeIds[1], responsibilityId);
});

When("user click on the {string} option", async (action: string) => {
	await readinessCatalogsPage.selectMenuOption(action);
});

When("user click on Activate Button", async () => {
	await readinessCatalogsPage.clickActivateButton();
});

Then("user hovers over the {string} Badge holders counter", async (badge: string) => {
	await readinessCatalogsPage.hoverOverBadgeHolderCounter(badge);
});

Then("the tooltip should display Click to filter badge by level {string}", async function (level: string) {
	await readinessCatalogsPage.verifyHoverBadgeHolderTootips(level);
});

Then("user clicks the {string} Badge holders counter", async function (badge: string) {
	await readinessCatalogsPage.clickBadgeHolderCounter(badge);
});

Then("Verify columns are displayed in responsibilities page", async () => {
	await readinessCatalogsPage.columnNamesAreDisplayed();
});

Then("verify previous button is not visible on checklist page", async () => {
	await readinessCatalogsPage.checklistPreviousBtnNotVisible();
});

Then("verify next button is visible on checklist page", async () => {
	await readinessCatalogsPage.checklistNextBtnVisible();
});

Then("verify next button is not visible on last checklist page", async () => {
	await readinessCatalogsPage.naviagteToLastChecklistPage();
});

Then("verify previous button is visible on last checklist page", async () => {
	await readinessCatalogsPage.checklistPreviousBtnVisible();
});

Then("user clicks on fail button", async () => {
	await readinessCatalogsPage.clickOnFailBtn();
	await baseInstance.wait(10);
});

When("user clicks on Not Applicable button", async () => {
	await readinessCatalogsPage.clickOnNotApplicableBtn();
	await baseInstance.wait(10);
});

Then("verify failed badge appears", async () => {
	await baseInstance.wait(5);
	await readinessCatalogsPage.failBadgeVisible();
});

Then("verify Not Applicable badge appears", async () => {
	await readinessCatalogsPage.notApplicableBadgeVisible();
});

Then("verify reset badge appears", async () => {
	await readinessCatalogsPage.resetBadgeVisible();
});

Then("user clicks on pass button", async () => {
	await readinessCatalogsPage.clickOnPassBtn();
});

Then("verify passed badge appears", async () => {
	await readinessCatalogsPage.passBadgeAppears();
});

Then("No Underlines responsibility show to user", async () => {
	await readinessCatalogsPage.verifyResponsibilityNameNotHyperlinked();
});

Then("hover on three dots menu Responsibilities to Verify the Magenta color", async () => {
	await readinessCatalogsPage.hoverOverThreeDotsMenu();
});

When("user clicks on chatter drawer", async () => {
	await readinessCatalogsPage.clickOnChatterDrawer();
});

Then("verify checkpoint chatter drawer appears", async () => {
	await readinessCatalogsPage.chatterDrawerDisplayed();
});

Then("user clicks on close icon", async () => {
	await readinessCatalogsPage.clickCloseIcon();
});

Then("user close the filter modal", async () => {
	await readinessCatalogsPage.clickOnFilterCloseIcon();
});

Then("verify user lands on checklist page", async () => {
	await readinessCatalogsPage.verifyChecklistName(criteria);
});

Then("Verify that No checkpoints found based on the current filters", async () => {
	await readinessCatalogsPage.verifyNoCheckpointsFound();
});

Then("verify user in on Badge holder tab", async () => {
	await readinessCatalogsPage.verifyBadgeTabAppears();
});

Then("verify hover affect on checklist menu", async () => {
	await readinessCatalogsPage.hoverOverChecklistMenu();
});

Then("observe that {string} status and checkbox filters are cleared", async (status: string) => {
	await readinessCatalogsPage.verifyStatusIsDisable(status);
});

Then("Verify that Remove Counters in No Responsibility for {string} role", async (status: string) => {
	await readinessCatalogsPage.applyFilter(status);
	await readinessCatalogsPage.verifyCounterIsNotVisible();
});

Then("verify data is visibe on assignments tab", async () => {
	await readinessCatalogsPage.verifyDataVisibleOnAssignmentsTab();
});

Then("user click on filter button on assignments tab", async () => {
	await readinessCatalogsPage.clickOnFilterBtn();
});

Then("User verify the Request tab", async () => {
	await readinessCatalogsPage.verifyRequestedTag();
});

Then("verify filter modal appears", async () => {
	await readinessCatalogsPage.verifyFilterModalIsDisplayed();
});

Then("Verify that Checklist Filter State Retained When Navigating Between Tabs", async () => {
	await readinessCatalogsPage.verifyChecklistFilterisDisplayed();
});

Then("User click the clear checklist", async () => {
	await readinessCatalogsPage.clickOnClearFilter();
});

Then("user click on filter button", async () => {
	await readinessCatalogsPage.clickOnAssignmentFilterBtn();
});

Then("User seletc the {string} status for Responsibility assignment", async (status: string) => {
	await readinessCatalogsPage.applyStatusFilterForResponsibilityAssignment(status);
	await leftNavigationPage.reloadThePage();
});

Then("Verify the Responsibility Assignments Filters {string}", async (status: string) => {
	await readinessCatalogsPage.verifyAssignmentFilters(status);
});

Then("User click on add checkpoint modal and close the modal", async () => {
	await readinessCatalogsPage.openAndCloseCheckpointsModal();
});

Then("Verify Add checkpoint Modal on Catalogs > Responsibility > checklist", async () => {
	await readinessCatalogsPage.assignmentModalNotDisplayed();
});

Then("User click on Filter button", async () => {
	await readinessCatalogsPage.clickOnFilterButton();
});

Then("verify {string} filter tag is displayed", async (tag: string) => {
	await baseInstance.wait(5);
	await readinessCatalogsPage.verifyFilterTagDisplayed(tag);
});

Then("user selects {string} filter", async (filter: string) => {
	await readinessCatalogsPage.selectEvaluateFilter(filter);
});

Then("verify no responsibilities found text is visible", async () => {
	await readinessCatalogsPage.noRespFoundTextVisible();
});

Then("Row Should show as Passed", async function () {
	await readinessCatalogsPage.verifyRowPassed();
});

Then("Do Not Show All Checkpoint Reset", async function () {
	await readinessCatalogsPage.verifyNoResetDefault();
});

Then("Row Should show as Failed", async function () {
	await readinessCatalogsPage.verifyRowFailed();
});

Then("User Click on Reset icon", async function () {
	await readinessCatalogsPage.resetIcon();
});

Then("User verify the confirmation dialog Message", async function () {
	await readinessCatalogsPage.verifyConfirmationDialog();
});

Then("return it to Pending Evaluation after reset status", async function () {
	await readinessCatalogsPage.verifyPendingEvaluiationStatus();
});

Then("User click on Passed Icon", async function () {
	await readinessCatalogsPage.clickOnPassedIconButton();
});

Then("User click on Failed Icon", async function () {
	await readinessCatalogsPage.clickOnFailedIconButton();
});

Then("User click on confirm button", async function () {
	await readinessCatalogsPage.clickOnConfirmButton();
});

Then("user clicks on the checkpoint counter", async () => {
	await readinessCatalogsPage.clickOnGrayCheckPointCounter();
	await baseInstance.wait(5);
});

Then("verify user navigates to the checklist page", async () => {
	await readinessCatalogsPage.verifyAddCheckpointBtnVisible();
});

Then("User See the {string} Badge Appear", async (badge: string) => {
	await readinessCatalogsPage.verifyBadge(badge);
});

Then("User open a Drop Down", async () => {
	await readinessCatalogsPage.openIssueBadgeDropDown();
});

Then("User Grant Apprentice Badge", async () => {
	await readinessCatalogsPage.grantBadgeToEmployee();
});

Then("User Hover over the profesional inspection badge", async () => {
	await readinessCatalogsPage.hoverOverProfessioanlInspectionBadge();
});

Then("User Hover over the apprentice inspection badge", async () => {
	await readinessCatalogsPage.hoverOverApprenticeInspectionBadge();
});

Then("Verfiy the Status {string}", async (status: string) => {
	await readinessCatalogsPage.verifyBadgeStatusToolip(status);
});

Then("Verify that User Can issues a badge to a specific employee", async () => {
	await readinessCatalogsPage.verfiyIssueBadge(addedEmployeeData.firstName);
});

Then("user verifies only responsibility assignment is visible", async () => {
	await readinessCatalogsPage.verifyOnlyResponsibilityAssignmentVisible();
});

Then("user verifies assignments tree is visible", async () => {
	await readinessCatalogsPage.verifyAssignmentsTreeVisible();
});

Then("user select a badge {string}", async function (badgeName) {
	await readinessCatalogsPage.selectEmployeeBadges(badgeName);
});

Then("verify the readiness value {int}%", async function (readinessValue) {
	await readinessCatalogsPage.verifyReadinessValue(readinessValue);
});

When("the user click on Filter Button", async function () {
	await readinessCatalogsPage.clickFilterButton();
});

When("user see {string} by default", async function (status: string) {
	await readinessCatalogsPage.noFilter(status);
});

When("the user clicks on {string} button", async function (status: string) {
	await readinessCatalogsPage.clicknoPositionButton(status);
});

When("Verify the responsibility not currently attached to any role", async function () {
	await readinessCatalogsPage.roleDatahideCard();
});

Then("verify that 'Chatter' tab is removed from responsibility", async function () {
	await readinessCatalogsPage.chatterDrawerDisplayed();
});

Then("Verify Add Draft Checkpoint Counts by Level for Responsibilities", async () => {
	const response = await responsibilityApiCalls.getSpecificResponsibility(responsibilityId);
	const responseBody = await response.json();
	expect(responseBody.checkpoint_count).toBeTruthy();
	expect(responseBody.checkpoint_count).toBe(1);
	const checkpoints = responseBody.checkpoints;
	expect(checkpoints).toBeTruthy();
	expect(checkpoints.draft_apprentice).toBe(0);
	expect(checkpoints.draft_professional).toBe(1);
	expect(checkpoints.draft_coach).toBe(0);
	expect(checkpoints.draft_master).toBe(0);
});

Then("verify the Badge Default data is visible", async function () {
	await readinessCatalogsPage.verifyBadgeDefaultData();
});

Then("User click on the dropdown button to select a badge", async function () {
	await readinessCatalogsPage.clickOnDropdownButton();
});

When("user clicks on the 'Active' checkpoint", async function () {
	await readinessCatalogsPage.clickOnActiveCheckpoint();
});

When("the user clicks on the 'AI Instructions' button", async function () {
	await readinessCatalogsPage.clickOnAIInstructionsButton();
});

When("the user clicks on the 'Add Instructions' button", async function () {
	await readinessCatalogsPage.clickOnAddInstructionsButton();
});

When("the user clicks on the 'Save' button", async function () {
	await readinessCatalogsPage.clickOnSaveInstructionsButton();
});

Then("verify that AI Instructions are added in the checkpoint", async function () {
	await readinessCatalogsPage.verifyInstructionsAreAddedInTheCheckpoint();
});

Then("User Click on Add with AI button", async function () {
	await readinessCatalogsPage.clickOnAddWithAIButton();
});

Then("verify that AI does not copy criteria to instructions when creating checkpoint", async function () {
	await readinessCatalogsPage.verifyCriteriaToInstruction();
});

Then("user clicks on the {string} button", async function (button: string) {
	await readinessCatalogsPage.clickOnAddCheckpointsButton(button);
});

Then("user clicks on Give Upgrade Badge button", async () => {
	await readinessCatalogsPage.clickOnGiveUpgradeBadge();
});

Then("verify that {string} column is shown in the responsibility page", async function (column: string) {
	await readinessCatalogsPage.showColumn(column);
});

Then("User Click on the Master inspection badge", async () => {
	await readinessCatalogsPage.clickOnMasterInspectionBadge();
});

Then("User Click on Remove Badge button", async () => {
	await readinessCatalogsPage.clickOnRemoveBadgeButton();
});
