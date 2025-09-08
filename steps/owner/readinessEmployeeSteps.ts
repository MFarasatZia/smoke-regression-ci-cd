import { When, Then } from "@cucumber/cucumber";
import { baseInstance } from "../../helpers/BaseClass";
import LeftNavigationPage from "../../pages/owner/leftNavigationPage";
import ReadinessEmployeesPage from "../../pages/owner/readinessEmployeesPage";
import OrganizationEmployeesPage from "../../pages/owner/organizationEmployeesPage";
import { addedEmployeeData } from "./employeeApiSteps";

const readinessEmployeesPage: ReadinessEmployeesPage = new ReadinessEmployeesPage(baseInstance);
const leftNavigationPage: LeftNavigationPage = new LeftNavigationPage(baseInstance);
const organizationEmployeesPage: OrganizationEmployeesPage = new OrganizationEmployeesPage(baseInstance);

When("you navigate to Account > Readiness > Employees", async function () {
	await leftNavigationPage.reloadThePage();
	await leftNavigationPage.navigateTo("readinessemployees");
});

Then("you land on Employees Readiness page", async function () {
	await readinessEmployeesPage.verifyEmployeesPage();
});

Then("you see list of active employees", async function () {
	await readinessEmployeesPage.verfiyActiveEmployeeList();
});

Then("the current readiness", async function () {
	await readinessEmployeesPage.verifyCurrentReadinessProgress();
});

Then("their Primary readiness", async function () {
	await readinessEmployeesPage.verifyPrimaryReadinessProgress();
});

Then("their backup readiness", async function () {
	await readinessEmployeesPage.verifyBackUpReadiness();
});

Then("their preparing for readiness", async function () {
	await readinessEmployeesPage.verifyPrepareForHeader();
});

Then("their acting as readiness", async function () {
	await readinessEmployeesPage.verifyActingAsHeader();
});

Then("user search for employee name", async () => {
	await baseInstance.reloadPage();
	await organizationEmployeesPage.searchEmployee(addedEmployeeData.firstName);
});

Then("user clicks on dropdown button on Readiness bar", async () => {
	await readinessEmployeesPage.clickOnDropDownIcon();
	await baseInstance.wait(2);
});

Then("user clicks on Recalculate button", async () => {
	await readinessEmployeesPage.clickOnRecalcButton();
	await baseInstance.wait(6);
});

Then("user verifies the readiness percentage is not 0", async () => {
	await readinessEmployeesPage.readinessValueNotZero();
});

When("user selects require recalc filter", async () => {
	await readinessEmployeesPage.selectRecalcFilter();
	await organizationEmployeesPage.clickOnSaveFilterForEmployeeButton();
	await baseInstance.wait(2);
});

Then("verify employee with recalc is visible", async () => {
	await readinessEmployeesPage.recalcEmployeeVisible();
});

Then("user clicks on Recalculate all button", async () => {
	await readinessEmployeesPage.clickOnRecalcAllBtn();
	await baseInstance.wait(3);
});

Then("verify Recalculate all button is not visible", async () => {
	await baseInstance.wait(2);
	await readinessEmployeesPage.readinessValueNotZero();
});
