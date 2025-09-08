import { Given, Then, When } from "@cucumber/cucumber";
import OrganizationEmployeesPage from "../../pages/owner/organizationEmployeesPage";
import { baseInstance } from "../../helpers/BaseClass";
import {
	UserData,
	generateRandomUserData,
	generateRandomEmployeeData,
	EmployeeData,
	RolesData,
	getRandomRole,
} from "../../helpers/util/random";
import * as assert from "assert";
import LeftNavigationPage from "../../pages/owner/leftNavigationPage";
import { addedEmployeeData } from "./employeeApiSteps";
import { expect } from "@playwright/test";
import { elements } from "../../xpath/owner/leftNavigationElements";
import { newPositionAPIData } from "./positionApiSteps";
import OrganizationPositionPage from "../../pages/owner/organizationPositionPage";
import { newRole } from "./employeeApiSteps";
import { responsibilityData } from "./checkpointApiSteps";
import ResponsibilityApis from "../../apis/owner/responsibility";
import RolesApis from "../../apis/owner/roles";
import PositionApis from "../../apis/owner/position";
import ReadinessRolesPage from "../../pages/owner/readinessRolesPage";
import { getSharedData, setSharedData } from "../../helpers/util/sharedData";

const organizationEmployeesPage: OrganizationEmployeesPage = new OrganizationEmployeesPage(baseInstance);
const organizationPositionPage: OrganizationPositionPage = new OrganizationPositionPage(baseInstance);
const newEmployeeData: EmployeeData = generateRandomEmployeeData();
const addedUserData: UserData = generateRandomUserData();
const responsibilityApiCalls: ResponsibilityApis = new ResponsibilityApis(baseInstance);
const newRoles: RolesApis = new RolesApis(baseInstance);
const positionApiCalls: PositionApis = new PositionApis(baseInstance);
const readinessRolesPage: ReadinessRolesPage = new ReadinessRolesPage(baseInstance);

const leftNavigationPage: LeftNavigationPage = new LeftNavigationPage(baseInstance);
let updatedEmployeeData;
let responsibilityIds: number[] = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let response: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let responseBody: any;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let roleId: number;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let employeeId: number;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let positionId: number;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let assignmentId: number;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let posAssignmentId: number;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let assignedEmployee: number;

Then("the user should land on the Employees Organization page", async function () {
	const actualHeader = await organizationEmployeesPage.getHeaderText();
	const expectedHeader = "Employees Organization";
	assert(
		actualHeader.toLowerCase() === expectedHeader.toLowerCase(),
		"Expected: " + expectedHeader + " Actual: " + actualHeader,
	);
});

When("the user should see the Add Employee button", async function () {
	const addEmployeeBtnVisible = await organizationEmployeesPage.addEmployeeBtnIsDisplayed();
	assert(addEmployeeBtnVisible, "Expected: + Add Employee button to be visible" + "Actual: " + addEmployeeBtnVisible);
});

When("the user should see a list of Employees", async function () {
	const isEmployeeListVisible = await organizationEmployeesPage.employeeListIsDisplayed();
	assert(isEmployeeListVisible, "Expected: Employees Table to be visible" + "Actual: " + isEmployeeListVisible);
});

When("user adds an employee", async function () {
	const updatedEmployeeData: EmployeeData = generateRandomEmployeeData();
	newEmployeeData.firstName = updatedEmployeeData.firstName;
	newEmployeeData.lastName = updatedEmployeeData.lastName;
	newEmployeeData.title = updatedEmployeeData.title;
	await organizationEmployeesPage.clickOnAddEmployeeBtn();
	await organizationEmployeesPage.enterFirstName(newEmployeeData.firstName);
	await organizationEmployeesPage.enterLastName(newEmployeeData.lastName);
	await organizationEmployeesPage.clickSaveBtn();
});

Then("Verify a loading indicator is displayed on the button", async function () {
	await organizationEmployeesPage.verifyTheSaveButtonLoadIndicator();
});

Then("user should see the employee in the table", async function () {
	const actualFullname = newEmployeeData.firstName.toLowerCase() + " " + newEmployeeData.lastName.toLowerCase();
	const expectedFullName = (await organizationEmployeesPage.getFirstEmployeeName()).toLowerCase();
	assert(expectedFullName == actualFullname, "Expected: " + expectedFullName + "Actual: " + actualFullname);

	const actualTitle = newEmployeeData.title;
	const expectedTitle = (await organizationEmployeesPage.getFirstEmployeeTitle()).toLowerCase();
	assert(expectedTitle == actualTitle.toLowerCase(), "Expected: " + expectedTitle + "Actual: " + actualTitle);
});

Then("verify that automatically search the employee by its full name", async function () {
	await organizationEmployeesPage.verifyclearSearchOption();
});

Then("the user should see the employee filtered by the search in the table", async () => {
	const actualFullname = newEmployeeData.firstName + " " + newEmployeeData.lastName;
	await organizationEmployeesPage.verifyEmployeeNameDisplayed(actualFullname);
});

When("user click on Edits employee", async function () {
	await organizationEmployeesPage.editEmployee();
});

Then("verify User Edit the Employee", async () => {
	const updatedEmployeeData: EmployeeData = generateRandomEmployeeData();
	newEmployeeData.firstName = updatedEmployeeData.firstName;
	newEmployeeData.lastName = updatedEmployeeData.lastName;
	await organizationEmployeesPage.updateFirstName(newEmployeeData.firstName);
	await organizationEmployeesPage.updateLastName(newEmployeeData.lastName);
});

Then("the user clicks the save button", async () => {
	await organizationEmployeesPage.clickSaveBtn();
});

Then("the user clicks the edit employee save button", async () => {
	await organizationEmployeesPage.clickOnEditEmployeeSaveBtn();
});

Then("the changes should be reflected in the table", async () => {
	const actualFullname = newEmployeeData.firstName + " " + newEmployeeData.lastName;
	await organizationEmployeesPage.verifyNameToExist(actualFullname);
});

When("user terminates an employee", async () => {
	await organizationEmployeesPage.clickOnTerminateEmployeeOption();
});

Then("verify employee status is changed to terminated", async () => {
	const terminatedEmployeeStatusVisible = await organizationEmployeesPage.termoinatedStatusDisplayed();
	assert(
		terminatedEmployeeStatusVisible,
		"Expected: Terminate status is displayed" + "Actual: " + terminatedEmployeeStatusVisible,
	);
});

When("user delete the employee", async () => {
	await organizationEmployeesPage.deleteTheDraftStatusEmployee();
});

When("the user clicks the delete button", async () => {
	await organizationEmployeesPage.clickOnDeleteBtn();
});

Then("verify employee to dissapears from the table", async () => {
	const employeeName = `${newEmployeeData.firstName} ${newEmployeeData.lastName}`;
	await organizationEmployeesPage.getTheEmployeeNamesAndVerifyToNotInclude(employeeName);
});

When("user click on the Re-Activate Employee", async () => {
	await organizationEmployeesPage.reActivateTheTerminatedStatusEmployee();
});

Then("verify transition the employee in status Active", async () => {
	await organizationEmployeesPage.activeStatusDisplayed();
});

When("user activate an employee", async () => {
	const actualFullname = addedEmployeeData.firstName.toLowerCase() + " " + addedEmployeeData.lastName.toLowerCase();
	await organizationEmployeesPage.enterSearchKeyword(actualFullname);
	await organizationEmployeesPage.clickEmployeeEllipsisMenu();
	await organizationEmployeesPage.activateTheTerminatedStatusEmployee();
});

Then("verify employee status changes to Active", async () => {
	await organizationEmployeesPage.activeStatusDisplayed();
	await baseInstance.wait(5);
});

Then("Verify that Assign to Employee button is Display", async () => {
	await organizationEmployeesPage.verifyAssignToButtonDisplayed();
	await baseInstance.wait(5);
});

Then("Verifies the Assign to Occupy Position modal is displayed", async () => {
	await organizationEmployeesPage.verifyAssignToPositionDisplayed();
	await baseInstance.wait(2);
});

Then("verify the modal is closed", async () => {
	await organizationEmployeesPage.verifyAssignToPositionNotDisplayed();
});

When("user selects the position", async () => {
	await organizationEmployeesPage.clickOnSearch();
	await organizationEmployeesPage.searchForPosition(newPositionAPIData.position);
	await organizationEmployeesPage.selectFirstPositionInList();
});

Then("Verify that no position match result", async () => {
	await organizationEmployeesPage.verifyNoPositionMatchingResult();
});

Then("user click on a specific Employee name", async function () {
	await baseInstance.reloadPage();
	await organizationEmployeesPage.searchEmployee(addedEmployeeData.firstName);
	await organizationEmployeesPage.clickOnSpecificEmployee(addedEmployeeData.firstName);
});

Then("user Search specific Employee name", async function () {
	await baseInstance.reloadPage();
	await organizationEmployeesPage.searchEmployee(addedEmployeeData.firstName);
	await organizationEmployeesPage.clickOnRelievePosition();
	await organizationEmployeesPage.clickOnRelieveBtn();
});

When("user clicks the Employee Positions Menu", async () => {
	await organizationEmployeesPage.clickEmployeePositionsMenu();
});

When("Verify that Active Filter Should Not Be Applied By Default", async () => {
	await organizationEmployeesPage.verifyNoDefaultActiveFilter();
	await baseInstance.wait(3);
});

When("user clicks the Employee Badge Menu", async () => {
	await organizationEmployeesPage.clickEmployeeBadgesMenu();
	await baseInstance.wait(3);
});

Then("verify employee name does not disappear in the profile", async () => {
	await organizationEmployeesPage.verifyEmployeeNameVisibleInProfile();
});

When("user clicks the next button", async () => {
	await organizationEmployeesPage.clickOnNextBtn();
});

When("user clicks the assign button", async () => {
	await organizationEmployeesPage.clickOnAssignBtn();
	await baseInstance.wait(1);
});

Then("user reassigns the position to employee", async () => {
	await organizationEmployeesPage.clickAssignToEmployee(addedEmployeeData.firstName + " " + addedEmployeeData.lastName);
	await organizationEmployeesPage.clickOnSearch();
	await organizationEmployeesPage.searchForPosition(newPositionAPIData.position);
	await organizationEmployeesPage.selectFirstPositionInList();
	await organizationEmployeesPage.clickOnAssignBtn();
	await baseInstance.wait(2);
});

Then("verify the position is reassigned to employee", async () => {
	await organizationEmployeesPage.verifyAssignedPosition();
});

Then("verify the position is assigned", async () => {
	await baseInstance.wait(2);
	try {
		await organizationEmployeesPage.verifyAssignedPosition();
	} catch (error) {
		throw new Error("Position assignment verification failed");
	}
});

Then("Verify that Relieve Employee Icon in clickable", async () => {
	await organizationEmployeesPage.clickOnRelieveEmployee();
});

Then("Verify That User can Relieve the Employee of the Primary Position assignment", async () => {
	await organizationEmployeesPage.clickOnRelieveBtn();
});

Then("user relieves the position", async () => {
	const tomorrowDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});

	await organizationEmployeesPage.clickOnRelievePosition(tomorrowDate);
	await organizationEmployeesPage.clickOnRelieveBtn();
});

Then("User click on the Assign to Employee button", async () => {
	const currentDate = new Date().toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});

	await organizationEmployeesPage.clickAssignToEmployee(
		addedEmployeeData.firstName + " " + addedEmployeeData.lastName,
		currentDate,
	);
});

Then("employee status gets Termianted", async () => {
	await organizationEmployeesPage.terminatedStatusDisplayed();
});

When("you open employee actions dropdown", async () => {
	await leftNavigationPage.navigateTo("employees");
	await organizationEmployeesPage.clickEmployeeEllipsisMenu();
});

Then("you see Edit Action all the time", async () => {
	await organizationEmployeesPage.editEmployeeOptionIsDisplayed();
});

Then("you see Change Picture Action all the time", async () => {
	await organizationEmployeesPage.changePictureOfEmployeeOptionIsDisplayed();
});

When("user open Employees Filter modal", async () => {
	await organizationEmployeesPage.clickOnFilterOption();
});

When("user select the {string} Status", async (status: string) => {
	await organizationEmployeesPage.applyStatusFilterForEmployees("Status", status);
});

Then("the user clicks on the save filter button", async () => {
	await organizationEmployeesPage.clickOnSaveFilterForEmployeeButton();
});

Then("verify that list of employees filtered by {string} status", async (status: string) => {
	await organizationEmployeesPage.verifyTheAppliedFilters(status);
	await organizationEmployeesPage.verifyTheStatusForTheAllEmployeeToBe(status);
});

Then("the filters should remain applied after the page reloads", async () => {
	await organizationEmployeesPage.baseInstance.reloadPage();
	await organizationEmployeesPage.baseInstance.wait(10);
});

When("user clicks on employee filter button", async () => {
	await organizationEmployeesPage.clickOnFilterOption();
});

When("user clicks on Terminate button", async () => {
	await organizationEmployeesPage.clickOnTerminateBtn();
});

When("user clicks on Reactivate button", async () => {
	await organizationEmployeesPage.clickOnReActivateBtn();
});

Then("verify that filter modal is visible", async () => {
	await organizationEmployeesPage.verifyFilterModalPopUp();
});

Then("verify the default filters", async () => {
	await organizationEmployeesPage.verifyNoFilterShouldBeAppliedFor("Vacancy");
	await organizationEmployeesPage.verifyNoFilterShouldBeAppliedFor("Availability");
	await organizationEmployeesPage.verifyNoFilterShouldBeAppliedFor("Access");
});

When("the Employee Organization list has at least one filter applied", async () => {
	await leftNavigationPage.navigateTo("employees");
	await organizationEmployeesPage.clickOnFilterOption();
	await organizationEmployeesPage.applyStatusFilterForEmployees("Status", "draft");
	await organizationEmployeesPage.clickOnSaveFilterForEmployeeButton();
	await organizationEmployeesPage.verifyTheAppliedFilters("draft");
});

When("the user remove a filter", async () => {
	await organizationEmployeesPage.removeTheAppliedFilter("draft");
});

Then("the user should see the employee list filtered by the remaining filters", async () => {
	await organizationEmployeesPage.activeStatusDisplayed();
});

When("the user opens the Employees Filter modal", async () => {
	await leftNavigationPage.navigateTo("employees");
	await organizationEmployeesPage.clickOnFilterOption();
});

When("the user selects Availability to filter by", async () => {
	await organizationEmployeesPage.applyFilterForEmployees("Availability", "Availability 1 FTE");
});

Then("User Applies Filter", async () => {
	await organizationEmployeesPage.applyArchivedFilter();
});

When("Availability is NOT No Filter", async () => {
	await organizationEmployeesPage.verifyNoFilterShouldNotBeAppliedFor("Availability 1 FTE");
});

Then("the user should see a list of employees filtered by that availability", async () => {
	await organizationEmployeesPage.verifyTheAvailabilityForAllTheEmplyeeToBe("1 FTE");
});

When("the user searches for the employee", async () => {
	await leftNavigationPage.navigateTo("employees");
	const actualFullname = addedEmployeeData.firstName.toLowerCase() + " " + addedEmployeeData.lastName.toLowerCase();
	await organizationEmployeesPage.enterSearchKeyword(actualFullname);
});

Then("the list is filtered by contains search string", async () => {
	const actualFullname = addedEmployeeData.firstName + " " + addedEmployeeData.lastName;
	await organizationEmployeesPage.verifyTheNameForTheEmployees(actualFullname);
});

When("the employee has the action \"Change Picture\" available", async () => {
	await leftNavigationPage.navigateTo("employees");
	await organizationEmployeesPage.clickOnMenuForDraftStatusEmployee();
	await organizationEmployeesPage.changePictureOfEmployeeOptionIsDisplayed();
});

When("I choose to Change Picture", async () => {
	await organizationEmployeesPage.clickOnMenuForChangeProfilePictureOfEmployee();
});

When("the user looks at the page header", async () => {
	await leftNavigationPage.navigateTo("employees");
});

Then("the user should see a badge to the right of the page label", async () => {
	await organizationEmployeesPage.headerActiveBageDisplayed();
});

Then("the badge should display the count of Active Employees in the list", async () => {
	await organizationEmployeesPage.verifyHeaderActiveBage();
});

When("you land on employees organization", async () => {
	await leftNavigationPage.navigateTo("employees");
});

Then("you load all the employees", async () => {
	await organizationEmployeesPage.employeeListIsDisplayed();
});

Given("the user has just created an employee", async () => {
	await leftNavigationPage.navigateTo("employees");
	await organizationEmployeesPage.clickOnAddEmployeeBtn();
	await organizationEmployeesPage.enterFirstName(newEmployeeData.firstName);
	await organizationEmployeesPage.enterLastName(newEmployeeData.lastName);
	await organizationEmployeesPage.clickSaveBtn();
});

Then("the search was automatically applied", async () => {
	await organizationEmployeesPage.verifyclearSearchOption();
	const actualFullname = newEmployeeData.firstName + " " + newEmployeeData.lastName;
	await organizationEmployeesPage.verifyEmployeeNameDisplayed(actualFullname);
});

Then("employee gets disappeared from the employees list", async () => {
	const actualFullname = newEmployeeData.firstName + " " + newEmployeeData.lastName;
	await organizationEmployeesPage.verifyEmployeeNamenotDisplayed(actualFullname);
});

When("you add an employee immediately after that", async () => {
	updatedEmployeeData = generateRandomEmployeeData();

	await organizationEmployeesPage.clickOnAddEmployeeBtn();
	await organizationEmployeesPage.enterFirstName(updatedEmployeeData.firstName);
	await organizationEmployeesPage.enterLastName(updatedEmployeeData.lastName);
	await organizationEmployeesPage.enterTitle(updatedEmployeeData.title);
	await organizationEmployeesPage.clickSaveBtn();
});

Then("applies the new search for the employee just added", async () => {
	await organizationEmployeesPage.verifyclearSearchOption();
	const actualFullname = updatedEmployeeData.firstName + " " + updatedEmployeeData.lastName;
	await organizationEmployeesPage.verifyEmployeeNameDisplayed(actualFullname);
});

When("reaching the My Services menu item as a employee", async function () {
	expect(await baseInstance.isDisplayed(elements.leftNavigation.myServicesHeader)).toBe(true);
});

Then("verify user is on {string} section", async function (section: string) {
	switch (section.toLowerCase()) {
		case "my stuff":
			await baseInstance.expectElementToBeVisible(elements.leftNavigation.myServicesHeader);
	}
});

Then("verify {string} sub menu is displayed", async function (submenu: string) {
	switch (submenu.toLowerCase()) {
		case "managing others":
			await baseInstance.expectElementToBeVisible(elements.leftNavigation.servicesOptions.managingOthersOption);
			break;
		case "Be a Master/Coach":
			await baseInstance.expectElementToBeVisible(elements.leftNavigation.servicesOptions.beAMasterCoachOption);
			break;
	}
});

Given("I go to the organization employee page and search for the employee", async function () {
	await leftNavigationPage.navigateTo("employees");
	const employeeName = `${addedEmployeeData.firstName} ${addedEmployeeData.lastName}`;
	await organizationEmployeesPage.enterSearchKeyword(employeeName);
});

When("user navigates to {string} page", async function (page: string) {
	await leftNavigationPage.navigateTo(page);
});

When("user hover on the Add Roles button", async function () {
	await leftNavigationPage.verifyHoverOverAddRoles();
});

When("user hover on Attach Responsibility button", async function () {
	await leftNavigationPage.verifyHoverOverAttachResponsibility();
});

Then("Verify the 'Employees' are sorted in A-Z order", async function () {
	await organizationEmployeesPage.verifyEmployeeListSorting();
});

When("user selects a specific Employee name", async () => {
	await organizationEmployeesPage.searchEmployee(addedEmployeeData.firstName);
});

Then("verify hover affect on three dot menu", async () => {
	await organizationEmployeesPage.hoverOverThreeDotsMenu();
});

Then("user click on a specific Employee with specific status {string}", async function () {
	const employeeName = `${addedEmployeeData.firstName} ${addedEmployeeData.lastName}`;
	await organizationEmployeesPage.enterSearchKeyword(employeeName);
	await organizationEmployeesPage.clickEmployeeEllipsisMenu();
});

Then("verify the Employee sidebar is visible", async function () {
	await organizationEmployeesPage.seeEmployeeData();
});

Then("hover on the sidebar expands the side bar", async function () {
	await organizationEmployeesPage.verifyExpandableSideBar();
});

Then("Verify that the total count of the active employee should be correct", async () => {
	await organizationEmployeesPage.clickOnFilterOption();
	await organizationEmployeesPage.applyStatusFilterForEmployees("Status", "active");
	await organizationEmployeesPage.clickOnSaveFilterForEmployeeButton();
	const activeCount = await organizationEmployeesPage.getAllActiveEmployeeCount();
	const headerCount = await organizationEmployeesPage.getHeaderActiveEmployeeCount();
	const headerActiveCount = `${activeCount} active`;
	expect(headerCount).toContain(headerActiveCount);
});

Then("verify Employees active counts on left navigation", async () => {
	const navigationCount = await organizationEmployeesPage.getNavigationActiveEmployeeCount();
	const headerCount = await organizationEmployeesPage.getHeaderActiveEmployeeCount();
	if (!headerCount) {
		throw new Error("Header count is undefined or null");
	}
	const headerNumber = headerCount.match(/(\d+)/)?.[1];
	expect(navigationCount).toBe(headerNumber);
});

Then("verify employee count in sidebar before activation", async () => {
	const initialCount = await organizationEmployeesPage.getNavigationActiveEmployeeCount();
	setSharedData("initialEmployeeCount", initialCount);
	console.log(`Initial employee count: ${initialCount}`);
});

Then("verify employee count in sidebar after activation", async () => {
	const finalCount = await organizationEmployeesPage.getNavigationActiveEmployeeCount();
	const initialCount = getSharedData("initialEmployeeCount");
	const initialCountNum = parseInt(initialCount);
	const finalCountNum = parseInt(finalCount);

	console.log(`Initial count: ${initialCountNum}, Final count: ${finalCountNum}`);
	expect(finalCountNum).toBe(initialCountNum + 1);
});

Then("verify assignments counter is counting active assignments", async () => {
	const activeCount = await organizationEmployeesPage.getAllActiveAssignments();
	const headerCount = await organizationEmployeesPage.getNavigationActiveAssignmentsCount();
	const headerActiveCount = `${activeCount}`;
	expect(headerCount).toContain(headerActiveCount);
});

When("user look at the Employee name", async function () {
	await organizationEmployeesPage.searchEmployee(addedEmployeeData.firstName + " " + addedEmployeeData.lastName);
});

Then("the user should see the employee name hyperlinked", async function () {
	await organizationEmployeesPage.verifyEmployeeNameHyperlinked(
		addedEmployeeData.firstName + " " + addedEmployeeData.lastName,
	);
});

Then("Verify that No Underlines Employee show to user", async function () {
	await organizationEmployeesPage.verifyEmployeeNameNotHyperlinked(
		addedEmployeeData.firstName + " " + addedEmployeeData.lastName,
	);
});

Then("User land on the path to readiness", async function () {
	await organizationEmployeesPage.verifyPathToReadinessTab();
});

Then("Verify the Title Employee Path To Readiness", async function () {
	await organizationEmployeesPage.verifyTitleAtSpecificEmployee();
});

Then("Verify that When Readiness is zero then show zero", async function () {
	await organizationEmployeesPage.verifyReadinessValue();
});

Then("User see all the assignments created as a tree in the Employee > Path to Readiness", async function () {
	await organizationEmployeesPage.verifyTreeInPathToReadinessPage();
});

Then("the user clicks on the important component selector", async function () {
	await organizationEmployeesPage.clickOnImportantComponent();
});

Then("the user hovers over the Importance component", async function () {
	await organizationEmployeesPage.hoverOverImportantSelector();
});

Then("User Click on Imortance Selector Component", async function () {
	await organizationEmployeesPage.clickOnImportantSelector();
});

Then("Verified that the Importance Selector does not open for Terminated assignments", async function () {
	await organizationEmployeesPage.verfiyImportanceSelectorDialogueBox();
});

Then("verify Importance selector tooltip should be visible", async function () {
	await organizationEmployeesPage.verifyImportantSelector();
});

Then("verify Readiness bar value should match Path to Readiness value", async () => {
	const leftNavValue = await organizationEmployeesPage.getValueEmployeeLeftNavPathToReadiness();
	const headerValue = await organizationEmployeesPage.getValueEmployeeLeftNavPathToReadiness();
	expect(headerValue).toBe(leftNavValue);
});

Given("user click on a specific Employee with status {string}", async (status: string) => {
	await baseInstance.wait(10);
	await baseInstance.reloadPage();
	await organizationEmployeesPage.searchEmployee(addedEmployeeData.firstName + " " + addedEmployeeData.lastName);
	const statusValue = status.toLowerCase();
	await organizationEmployeesPage.verifyTheBadgeForEmployee(statusValue);
	await organizationEmployeesPage.clickEmployeeEllipsisMenu();
});

When("user select option {string} from menu", async (option: string) => {
	await organizationEmployeesPage.selectOptionFromMenu(option);
});

Then("verify activation confirmation message for employee", async () => {
	const employeeName = `${newEmployeeData.firstName} ${newEmployeeData.lastName}`;
	await organizationEmployeesPage.verifyEmployeeNameDisplayed(employeeName);
});

When("user select option {string} for employee", async (option: string) => {
	await organizationEmployeesPage.selectTheOptionsFromThreeDotMenu(option);
});

Given("the user clicks on the employee's three-dot menu button", async () => {
	await organizationEmployeesPage.clickOnEmployeeThreeDotMenuBtn();
});

Given("User Gives a Badge to Responsibility", async () => {
	await organizationEmployeesPage.clickOnIssueBadge();
});

When("the user clicks the activate button", async () => {
	await organizationEmployeesPage.clickOnActivateBtn();
});

Then("verify that upload picture modal is displyed", async () => {
	await organizationEmployeesPage.verifyUploadPictureModalIsDisplayed();
});

Then("verify that {string} option is disabled", async (option: string) => {
	const value = await organizationEmployeesPage.verifyBtnToBeDisabled(option);
	expect(value).toBe("disabled");
});

When("user upload a picture for the employee", async () => {
	await organizationEmployeesPage.changePictureForEmployee();
});

Then("verify that {string} option is not disabled", async (option: string) => {
	const value = await organizationEmployeesPage.verifyBtnToBeDisabled(option);
	expect(value).toBe(null);
});

Then("user click on the save option for change picture", async () => {
	await organizationEmployeesPage.clickOnBtnForUploadModal("Save");
});

Then("verify picture for the employee is updated", async () => {
	await organizationEmployeesPage.verifyTheAvatarImage();
});

Given("an {string} employee already have a profile picture", async (status: string) => {
	await baseInstance.wait(10);
	await baseInstance.reloadPage();
	await baseInstance.wait(5);
	await organizationEmployeesPage.searchEmployee(addedEmployeeData.firstName + " " + addedEmployeeData.lastName);
	await organizationEmployeesPage.verifyTheBadgeForEmployee(status);
	await organizationEmployeesPage.clickEmployeeEllipsisMenu();
	await organizationEmployeesPage.selectOptionFromMenu("Change Picture");
	await organizationEmployeesPage.verifyUploadPictureModalIsDisplayed();
	await organizationEmployeesPage.changePictureForEmployee();
	const value = await organizationEmployeesPage.verifyBtnToBeDisabled("Save");
	expect(value).toBe(null);
	await organizationEmployeesPage.clickOnBtnForUploadModal("Save");
	await organizationEmployeesPage.verifyTheAvatarImage();
});

When("user Remove the picture for the employee", async () => {
	await organizationEmployeesPage.clickOnBtnForUploadModal("Remove");
});

Then("verify the picture for the employee is removed", async () => {
	await organizationEmployeesPage.verifyTheAvatarImageToNotExist();
});

Then("user is shown with previously uploaded profile", async () => {
	await organizationEmployeesPage.verifyExistingProfilePic();
});

When("user clicks on Employee Profile menu", async () => {
	await organizationEmployeesPage.clickOnEmployeeProfileMenu();
});

Then("{string} option by user works", async (option: string) => {
	await organizationEmployeesPage.selectEmployeeProfileMenuOption(option);
});

Then("verify that {string} option is displayed", async (option: string) => {
	await organizationEmployeesPage.verifyTheOptionIsDisplayed(option);
});

Then("verify that {string} option is not displayed", async (option: string) => {
	await organizationEmployeesPage.verifyOptionIsNotDisplayed(option);
});

When("user clicks the Chatter employee tab", async () => {
	await organizationEmployeesPage.clickChatterTab();
	await baseInstance.wait(5);
});

Given("user clicks Activate button", async () => {
	await organizationEmployeesPage.clickActivateButton();
});

Then("verify records are present on the chatter table", async () => {
	await organizationEmployeesPage.verifyChatterRecords();
});

When("records are visible on the chatter table", async () => {
	await organizationEmployeesPage.verifyChatterRecords();
});

Then("verify that chatter records are grouped in Today", async () => {
	await organizationEmployeesPage.verifyChatterRecordToday;
});

Then("employee status gets Active", async () => {
	await organizationEmployeesPage.activeStatusDisplayed();
	await baseInstance.wait(5);
});

When("User enters email in add employee field", async () => {
	const updatedUserData: UserData = generateRandomUserData();
	addedUserData.firstName = updatedUserData.firstName;
	addedUserData.lastName = updatedUserData.lastName;
	addedUserData.email = updatedUserData.email;
	await organizationEmployeesPage.enterEmployeeEmail(addedUserData.email);
	await baseInstance.wait(5);
});

When("User click on Next button", async () => {
	await organizationEmployeesPage.clickOnNext();
});

When("user select the {string} to give access to employee", async (app: string) => {
	await organizationEmployeesPage.clickSelectAppsEmployee(app);
});

When("user click on invite button", async () => {
	await organizationEmployeesPage.clickInviteEmployee();
});

When("User click on suspend Buuton", async () => {
	await organizationEmployeesPage.clickOnSuspendAccess();
});

When("User verify employee has access suspended", async () => {
	await organizationEmployeesPage.verfiySuspendUserToolTip();
});
When("User Select access {string} to apps for Employee", async (app: string) => {
	await organizationEmployeesPage.selectAppsForEmployee(app);
});

When("Verify Email already used", async () => {
	await organizationEmployeesPage.verifyEmailAlreadyUsed();
});

When("user clicks on notification button", async () => {
	await organizationEmployeesPage.clickOnNotificationBtn();
});

Then("verify App notification page appears", async () => {
	await organizationEmployeesPage.verifyNotificationPageVisible();
});

Then("the user hovers over the Add Employee button", async () => {
	await organizationEmployeesPage.verifyHoverAddEmployee();
});

When("First data card of employee is displayed", async () => {
	await organizationEmployeesPage.verifyemployeeFirstDataCardToVisible();
});

Then("user opens Employee Capacity Selector", async () => {
	await organizationEmployeesPage.clickOntheCapcityIcon();
	await organizationEmployeesPage.capcityModalIsVisible();
});

Then("user see employee current capacity selected", async () => {
	await organizationEmployeesPage.verfiyThatOneFTEIsSelected();
});

Then("user changes employee capacity", async () => {
	await organizationEmployeesPage.clickOnZeroPointFiveFTE();
});

Then("user verify capacity changing in the employee line", async () => {
	await organizationEmployeesPage.verfiyThatZeroPointFiveFTEIsDisplayed();
});

Then("user close the employee selector using the x icon", async () => {
	await organizationEmployeesPage.clickOnCloseCapacityIcon();
});

Then("User hover on three dots menu to Verify the Magenta color", async () => {
	await organizationEmployeesPage.hoverOverThreeDotsMenu();
});

Given("Search specific Employee with status {string}", async (status: string) => {
	await organizationEmployeesPage.baseInstance.reloadPage();
	await organizationEmployeesPage.searchEmployee(addedEmployeeData.firstName + " " + addedEmployeeData.lastName);
	const statusValue = status.toLowerCase();
	await organizationEmployeesPage.verifyTheBadgeForEmployee(statusValue);
});

Given("User Search the specific Position", async () => {
	await organizationPositionPage.searchForPosition(newPositionAPIData.position);
	await organizationEmployeesPage.clickOnURLPostion();
});

Given("User Search the position and verify Status {string}", async (status: string) => {
	await organizationEmployeesPage.baseInstance.reloadPage();
	await organizationEmployeesPage.searchForSpecificPosition(newPositionAPIData.position);
	await organizationEmployeesPage.verifyTheBadgeForPosition(status);
});

Then("Verify the Primary Occupation Tag for Full time Employee in Positions Organization", async () => {
	await organizationEmployeesPage.verifyThePrimaryOccupationTag(newPositionAPIData.position);
});

When("User Relive Employee of primary Position assignment from positions Organization", async () => {
	await organizationEmployeesPage.clickOnReliveEmployeeIcon();
});

Then("User verifies the position has no Employee of Primary Position assignment", async () => {
	await organizationEmployeesPage.verifyNoPrimaryOccupationTag(addedEmployeeData.firstName);
});

When("user click on the Attach Role button", async () => {
	await organizationEmployeesPage.clickOnAttachRoleBtn();
});

When("Select an existing role from the list", async () => {
	await organizationEmployeesPage.selectRoleFromTheList();
	await organizationEmployeesPage.selectRole();
});

When("User Select the Attach button", async () => {
	await organizationEmployeesPage.clickOnAttachButton();
	await baseInstance.wait(5);
});

When("User click on the Assignment column", async () => {
	await organizationEmployeesPage.clickOnAssignmentColumn();
});

Then("A new role is attached to the position", async () => {
	await organizationEmployeesPage.verifyRoleAttachedToPosition();
});

When("User click on the employee in the list", async () => {
	await organizationEmployeesPage.clickEmployeeInList();
});

Then("verify assign primary position option visible", async () => {
	await organizationEmployeesPage.verifyAssignToEmployeeBtnVisible;
});

Then("user clicks on the employee capacity icon", async () => {
	await organizationEmployeesPage.clickOntheEmployeeCapcityIcon();
});

Then("verify capacity modal is displayed", async () => {
	await organizationEmployeesPage.capcityModalIsVisible();
});

Then("verify user is unable to click availability selector", async () => {
	await organizationEmployeesPage.clickOntheEmployeeCapcityIcon();
	await organizationEmployeesPage.capcityModalIsNotVisible();
});

When("user click on Re-Activate button", async () => {
	await organizationEmployeesPage.clickOnReActivateBtn();
});

When("Verify the Add loader when you land on the employees organization page", async () => {
	await organizationEmployeesPage.verifyTheAddLoadingText();
});

When("User verify the Employee button have loader", async () => {
	await organizationEmployeesPage.verifyLoaderIsDisplayed();
});

Then("Clicks on Activate button to actoivate the Employee", async () => {
	await organizationEmployeesPage.clickOnActivatePositionBtn();
});

Then("Verify the Magenta area when user Hover over Employee name in Employees Organization", async function () {
	await organizationEmployeesPage.searchEmployee(addedEmployeeData.firstName);
	await organizationEmployeesPage.verifyHoverOverEmployee(addedEmployeeData.firstName);
});

Then("Employee is assigned to Primary Position", async function () {
	await organizationEmployeesPage.verifyEmployeeAssigned(addedEmployeeData.firstName);
});

Then("Verify that Capacity Selector Does Not Open", async () => {
	await organizationEmployeesPage.verifyCapacitySelectorNotOpen();
});

Then("User close the Assign to Employee Modal", async () => {
	await organizationEmployeesPage.clickOnCloseModal();
});

Then("Click on the Add Employee button", async () => {
	await organizationEmployeesPage.clickOnAddEmployee();
});

Then("Verify the Add Employee Modal", async () => {
	await organizationEmployeesPage.verifyAddEmployeeInputField();
});

Then("verify the default filter is active", async () => {
	await organizationEmployeesPage.verifyDefaultFilterInAssignments();
});

Then("user clicks on confirm button", async () => {
	await organizationEmployeesPage.clickOnConfirmBtn();
	await baseInstance.wait(5);
});

Then("verify no employees found text is displayed", async () => {
	await organizationEmployeesPage.noEmployeesFoundHeadingIsDisplayed();
});

Then("user clicks on Unarchive button", async () => {
	await organizationEmployeesPage.clickOnUnArchiveBtn();
});

Then("user clicks on clear button", async () => {
	await organizationEmployeesPage.clickClearSearchBtn();
});

Then("user select {string} filter option", async (filter: string) => {
	await organizationEmployeesPage.selectFilterOptionArchive(filter);
});

Then("verify Archived status is displayed", async () => {
	await organizationEmployeesPage.archiveStatusBadge();
});

When("verify assignment status is Active as {string}", async function (badge: string) {
	await organizationEmployeesPage.verifiyAssignmentStatusIsActive(badge);
});

When("verify assignment status is Terminated as {string}", async function (badge: string) {
	await organizationEmployeesPage.verifiyAssignmentStatusIsTerminated(badge);
});

When("verify assignment status is Relieved as {string}", async function (badge: string) {
	await organizationEmployeesPage.verifiyAssignmentIsRelieved(badge);
});

Then("verify current badge is visible", async () => {
	await organizationEmployeesPage.currentBadgeVisible();
	await baseInstance.wait(3);
});

Then("verify issued byon is visible", async () => {
	await organizationEmployeesPage.issuedByOnVisible();
	await baseInstance.wait(3);
});

Then("verify reason is visible", async () => {
	await organizationEmployeesPage.badgeReasonVisible();
});

Then("verify default filter is current", async () => {
	await organizationEmployeesPage.currentFilterVisible();
});

Then("user removes the badge", async () => {
	await organizationEmployeesPage.clickOnCorssIcon();
	await organizationEmployeesPage.clickOnConfirmBtn();
	await baseInstance.wait(3);
});

Then("Verfiy that Responsibility Has No Badge", async () => {
	await organizationEmployeesPage.verfifyNoviceBadge();
	await organizationEmployeesPage.responsibiliyThreeDotsMenu();
});

Then("verify no badge appears", async () => {
	await organizationEmployeesPage.noBadgeTextVisible();
	await baseInstance.wait(3);
});

Then("user clear the filter", async () => {
	await organizationEmployeesPage.clickOnClearFilterBtn();
	await baseInstance.wait(3);
});

Then("user selects {string} badge filter", async (filter: string) => {
	await organizationEmployeesPage.selectBadgeFilter(filter);
});

Then("user verify remove badge is visible", async () => {
	await organizationEmployeesPage.removedBadgeVisible();
});

Then("user verify the badge counter", async () => {
	await organizationEmployeesPage.badgeCounterVisible();
});

Then("date and time is visible on Issued ByOn column", async () => {
	await organizationEmployeesPage.issuedByOnDateVisible();
});

Then("date and time is visible on Removed ByOn column", async () => {
	await organizationEmployeesPage.removedByOnDateVisible();
});

Then("verify role assignment is not visible", async () => {
	await organizationEmployeesPage.roleAssignmentNotVisible();
	await baseInstance.wait(2);
});

Then("user verifies the active role assignment is visible", async () => {
	await baseInstance.reloadPage();
	await organizationEmployeesPage.roleAssignmentVisible();
	await baseInstance.wait(5);
});

Then("user verifies the active Responsibility assignment is visible", async () => {
	await organizationEmployeesPage.responsibilityAssignmentVisible();
	await baseInstance.wait(3);
});
Then("Verified that Responsibility assignment is visible", async () => {
	await organizationEmployeesPage.responsibilityAssignmentVisible();
});

Then("verifies position assignment is visible", async () => {
	await organizationEmployeesPage.positionAssignmentVisible();
	await baseInstance.wait(2);
});

Then("User clicks on  Issue Badge drop down button", async () => {
	await organizationEmployeesPage.clickOnIssueBadgeDropDownButton();
});

Then("verify issue badge modal is visible", async () => {
	await organizationEmployeesPage.issueBadgeModalVisible();
});

When("user searches for newly created responsibility", async () => {
	await organizationEmployeesPage.searchResponsibility(newRole.name);
});

When("user searches for newly created specific responsibility", async () => {
	await organizationEmployeesPage.searchSpeResponsibility(newRole.name);
});

Then("user select responsibility from the list", async () => {
	await organizationEmployeesPage.selectResponsibility();
	await organizationEmployeesPage.clickOnNextBtnToIssueBadge();
});

Then("User click on Next btn to issue badge", async () => {
	await organizationEmployeesPage.clickOnNextBtnToIssueBadgeToResponsibility();
});

Then("user remove 'Current' filter for Responsibilities", async () => {
	await organizationEmployeesPage.removeResponsibilityFilter();
});

When("user search for new responsibility with checkpoint", async () => {
	await organizationEmployeesPage.searchResponsibility(responsibilityData.name);
	await baseInstance.wait(5);
});

Then("Verify that Archived Responsibility does not appear in the Responsibility List", async () => {
	await organizationEmployeesPage.verifyNoArchivedResponsibilityAppear();
});

Then("verify no position assigned yet text is visible", async () => {
	await organizationEmployeesPage.noAssignmentTextVisible();
});

Then("verify assign button is visible", async () => {
	await organizationEmployeesPage.pathAssignBtnVisible();
});

Then("user clicks on assign button", async () => {
	await organizationEmployeesPage.clickOnPathAssignBtn();
});

Then("verify the position is visible in path to readiness page", async () => {
	await organizationEmployeesPage.pathPositionVisible();
});

Then("verify employee not yet activated text is visible", async () => {
	await organizationEmployeesPage.employeeNotActivatedText();
	await baseInstance.wait(2);
});

Then("verify Activate button is visible on path to readiness page", async () => {
	await organizationEmployeesPage.pathActivateBtnVisible();
	await baseInstance.wait(2);
});

Then("user clicks on the activate button on path to readiness page", async () => {
	await organizationEmployeesPage.clickPathActivateBtn();
});

Then("user activates the employee", async () => {
	await organizationEmployeesPage.clickEmpActivateBtn();
	await baseInstance.wait(2);
});

Then("verify employee is activated", async () => {
	await organizationEmployeesPage.empActiveBadgeVisible();
});

Then("verify Employee Status: Terminated text is visible", async () => {
	await organizationEmployeesPage.employeeStatusText();
	await baseInstance.wait(2);
});

Then("verify Re-activate button is visible on path to readiness page", async () => {
	await organizationEmployeesPage.pathReActivateBtnVisible();
	await baseInstance.wait(2);
});

Then("user clicks on the Re-activate button on path to readiness page", async () => {
	await organizationEmployeesPage.clickPathReActivateBtn();
});

Then("user Re-activate the employee", async () => {
	await organizationEmployeesPage.clickEmpReActivateBtn();
	await baseInstance.wait(2);
});

Then("user views the 'Prepares for' column", async () => {
	await organizationEmployeesPage.prepareForColumn();
	await baseInstance.wait(2);
});

Then("verify that Position is excluded from 'Prepares for' column", async () => {
	await organizationEmployeesPage.clickOnSearch();
	await baseInstance.wait(2);
});

When("user clicks on Assign to prepare for position", async () => {
	await organizationEmployeesPage.assignPrepareForPosition();
	await baseInstance.wait(2);
});

When("user picks the position for prepare for", async () => {
	await organizationEmployeesPage.pickPositionPrepareFor();
	await baseInstance.wait(2);
});

When("the user clicks on the Prepare for position", async () => {
	await organizationEmployeesPage.selectPrepareForPosition();
	await baseInstance.wait(2);
});

When("the user clicks on Assign button for 'prepare for' position", async () => {
	await organizationEmployeesPage.clickOnAssignPrepareForBtn();
	await baseInstance.wait(2);
});

Then("the user hovers over the cross icon for primary position", async () => {
	await organizationEmployeesPage.hoverCrossIcon();
});

Then("verify the tooltip 'Relive' is shown", async () => {
	await organizationEmployeesPage.hoverCrossIcon();
});

Then("verify the user drills down into Path to Readiness page", async () => {
	await organizationEmployeesPage.clickRoleassignmentcard();
});

Then("the user clicks on roles responsibility assignment component", async () => {
	await organizationEmployeesPage.clickRoleassignmentcard();
});

Then("user clicks the Employee Assign button", async () => {
	await organizationEmployeesPage.clickOnAssignToEmployeeBtn();
});

Then("verify the position assignment is assigned as primary", async () => {
	await organizationEmployeesPage.verifyPrimaryPositionAssignment();
});

Then("user Hover on the primary position assignment", async () => {
	await organizationEmployeesPage.hoverOverPrimaryPositionAssignment();
});

When("user have 3 responsibilities is in status 'Active'", async function () {
	responsibilityIds = [];

	for (let i = 0; i < 3; i++) {
		const updateNewRole: RolesData = getRandomRole();
		const responsibilityName = updateNewRole.name;
		response = await responsibilityApiCalls.createResponsibility(responsibilityName, "draft");
		responseBody = await response.json();
		expect(responseBody.status).toBe("draft");
		const responsibilityId = responseBody.id;
		response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("active");
		responsibilityIds.push(responsibilityId);
	}

	setSharedData("responsibilityIds", JSON.stringify(responsibilityIds));
});

Then("attach all 3 responsibilities to Role", async function () {
	const sharedRoleId = getSharedData("roleId");
	roleId = parseInt(sharedRoleId);
	expect(responsibilityIds.length).toBe(3);
	for (let i = 0; i < responsibilityIds.length; i++) {
		response = await newRoles.attachResponsibilityToRole(responsibilityIds[i], roleId);
		await expect(response).toBeOK();
	}
});

When("user assign the position to Employee", async function () {
	const employeeIdFromShared = getSharedData("employeeId");
	const positionIdFromShared = getSharedData("positionId");
	const currentEmployeeId = parseInt(employeeIdFromShared);
	const currentPositionId = parseInt(positionIdFromShared);
	employeeId = currentEmployeeId;
	positionId = currentPositionId;
	response = await positionApiCalls.assignPositionToEmployee(currentEmployeeId, currentPositionId, 1, 1);
	responseBody = await response.json();
	expect(responseBody).toBeTruthy();
	assignmentId = responseBody.id;
	posAssignmentId = responseBody.id;
	assignedEmployee = responseBody.assigned_to_employee;
	await new Promise((resolve) => setTimeout(resolve, 2000));
});

When("user reorders the responsibilities sequence via drag and drop", async function () {
	const responsibilityNames = await readinessRolesPage.reorderResponsibilitiesViaDragAndDrop();
	await baseInstance.wait(2);
	setSharedData("responsibilityNames", JSON.stringify(responsibilityNames));
});

When("user expands position and role in path to readiness", async function () {
	await baseInstance.wait(2);
	const positionName = getSharedData("positionName");
	const roleName = getSharedData("roleName");
	await organizationEmployeesPage.expandPositionInPathToReadiness(positionName);
	await baseInstance.wait(5);
	await organizationEmployeesPage.expandRoleInPathToReadiness(roleName);
});

Then("Active Responsibility assignment is visible", async () => {
	const responsibilityName = getSharedData("responsibilityName");
	await organizationEmployeesPage.activeResponsibilityAssignmentVisible(responsibilityName);
});

When("user verify the responsibilities order", async function () {
	const responsibilityNamesJson = getSharedData("responsibilityNames");
	if (!responsibilityNamesJson) {
		throw new Error(
			"Responsibility names not found in shared data. Make sure 'user reorders the responsibilities sequence via drag and drop' step was executed first.",
		);
	}
	const responsibilityNames = JSON.parse(responsibilityNamesJson);
	await readinessRolesPage.verifyElementOrder(responsibilityNames, "Responsibilities");
});

When("user click on a specific Employee name using shared data", async function () {
	await baseInstance.reloadPage();
	const employeeFirstName = getSharedData("employeeFirstName");

	if (employeeFirstName) {
		await organizationEmployeesPage.searchEmployee(employeeFirstName);
		await organizationEmployeesPage.clickOnSpecificEmployee(employeeFirstName);
	} else {
		await organizationEmployeesPage.searchEmployee(addedEmployeeData.firstName);
		await organizationEmployeesPage.clickOnSpecificEmployee(addedEmployeeData.firstName);
	}
	await baseInstance.wait(2);
});

Then("verify that Count of Attach Active Role is {int}", async (count: number) => {
	await organizationEmployeesPage.verifyCountOfAttachActiveRole(count);
});

Then("verify that Count of Attach Active Responsibility is {int}", async (count: number) => {
	await organizationEmployeesPage.verifyCountOfAttachActiveResponsibility(count);
});

Then("verify that the Appretice Badge is {string}", async (badge: string) => {
	await organizationEmployeesPage.verifyAppreticeBadge(badge);
});

Then("verify that Give Badge Modal is visible", async () => {
	await organizationEmployeesPage.verifyGiveBadgeModal();
});

Given("User Gives a Upgrade Badge to Responsibility", async () => {
	await organizationEmployeesPage.clickOnGiveUpgradeBadge();
});

Then("User click on Award Badge button", async () => {
	await organizationEmployeesPage.clickOnAwardBadgeBtn();
});
