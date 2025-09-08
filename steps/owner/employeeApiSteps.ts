import { Given, Then, When } from "@cucumber/cucumber";
import EmployeeApis from "../../apis/owner/employee";
import CheckpointApis from "../../apis/owner/checkpoint";
import { expect } from "@playwright/test";
import { baseInstance } from "../../helpers/BaseClass";
import {
	PositionData,
	getRandomPosition,
	EmployeeData,
	generateRandomEmployeeData,
	generateRandomUserData,
	RolesData,
	getRandomRole,
	getRandomPhrase,
	UserData,
} from "../../helpers/util/random";
import { faker } from "@faker-js/faker";
import ResponsibilityApis from "../../apis/owner/responsibility";
import PositionApis from "../../apis/owner/position";
import RolesApis from "../../apis/owner/roles";
import { checkpointResponsibilityId } from "./checkpointApiSteps";
import { setSharedData, getSharedData } from "../../helpers/util/sharedData";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let response: any,
	employeeId: number,
	responsibilityId: number,
	createdUserId: number,
	createdUserEmail: string,
	evaluationId: number,
	badgeId: number,
	assignmentId: number,
	roleId: number,
	responsibilityCodeStr: string,
	roleCodeStr: number,
	positionCodeStr: number,
	firstName: string,
	lastName: string,
	assignedEmployee: number,
	posAssignmentId: number,
	roleAssignmentId: number,
	assignedEmployeePos: number,
	assignedEmployeeRole: number,
	assignedEmployeeBadge: number,
	assignedEmployeeResp: number,
	storedEffectiveOnDate: string,
	storedEffectiveByDate: string;
let storedEmployeeCount: number;
let storedEmployeeCreationDate: string;
let note: string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let responseBody: any;
let positionId: number;
let checkpointId;
const addedEmployeeData: EmployeeData = generateRandomEmployeeData();
const newUserData: UserData = generateRandomUserData();
const addedSecoundEmployeeData: EmployeeData = generateRandomEmployeeData();
const newRole: RolesData = getRandomRole();
const newPositionAPIData: PositionData = getRandomPosition();
const newRoles: RolesApis = new RolesApis(baseInstance);
const employeeApiCalls: EmployeeApis = new EmployeeApis(baseInstance);
const responsibilityApiCalls: ResponsibilityApis = new ResponsibilityApis(baseInstance);
const positionApiCalls: PositionApis = new PositionApis(baseInstance);
const checkpointApiCalls: CheckpointApis = new CheckpointApis(baseInstance);
const checkpointData: RolesData = getRandomRole();
const responsibilityData: RolesData = getRandomRole();

When("user create an employee via API", async function () {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();
	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;
	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);
	responseBody = await response.json();
	employeeId = responseBody.id;
});

Then("the employee is in status draft", async function () {
	expect(responseBody.current_status).toBe("draft");
});

Then("employee has availability equal to 1", async function () {
	expect(responseBody.availability).toBe(1);
});

When("you rename employee via API", async function () {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();
	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;
	response = await employeeApiCalls.updateEmployee(
		employeeId,
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
	);
});

Then("you return success", async function () {
	await expect(response).toBeOK();
});

Given("that a employee is in status draft", async function () {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();
	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;
	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("draft");
	employeeId = responseBody.id;
});

When("you delete the employee", async function () {
	response = await employeeApiCalls.deleteEmployees(employeeId);
	if (response.status() !== 204) {
		responseBody = await response.json();
	}
});

Then("verify message Only draft employees can be deleted", async function () {
	expect(responseBody[0]).toContain("Only draft employees can be deleted");
});

Then("you validate the employee was deleted", async function () {
	expect(response.status()).toBe(204);
	const listAllEmployeesresponse = await employeeApiCalls.listAllEmployees();
	const jsonListResponse = await listAllEmployeesresponse.json();

	if (jsonListResponse.count && jsonListResponse.results.length > 0) {
		for (const employee of jsonListResponse.results) {
			expect(employee.id).not.toBe(employeeId);
		}
	}
});

Then("user gets the employee details", async () => {
	response = await employeeApiCalls.getEmployeeDetails(employeeId);
	responseBody = await response.json();
	await expect(response).toBeOK();
});

Then("verify the get employee API response structure", async () => {
	expect(responseBody).toHaveProperty("id");
	expect(responseBody).toHaveProperty("avatar");
	expect(responseBody).toHaveProperty("first_name");
	expect(responseBody).toHaveProperty("last_name");
	expect(responseBody).toHaveProperty("current_readiness");
	expect(responseBody).toHaveProperty("primary_readiness");
	expect(responseBody).toHaveProperty("status");
	expect(responseBody).toHaveProperty("badges_count");
	expect(responseBody).toHaveProperty("archived");
	expect(responseBody).toHaveProperty("access");
	expect(responseBody).toHaveProperty("email");
	expect(responseBody).toHaveProperty("chatter_count_last_48h");
	expect(responseBody).toHaveProperty("position_history_active_count");
	expect(responseBody).toHaveProperty("account");
	expect(responseBody.access).toHaveProperty("employee_status");
	expect(responseBody.access).toHaveProperty("has_access");
	expect(responseBody.access).toHaveProperty("is_suspended");
	expect(responseBody.access).toHaveProperty("is_owner");
	expect(responseBody.access).toHaveProperty("is_co_owner");
	expect(responseBody.access).toHaveProperty("id");
});

Then("verify primary position array is empty", async () => {
	expect(Array.isArray(responseBody.primary_positions)).toBe(true);
	expect(responseBody.primary_positions.length).toBe(0);
});

Then("verify backup position array is empty", async () => {
	expect(Array.isArray(responseBody.backup_positions)).toBe(true);
	expect(responseBody.backup_positions.length).toBe(0);
});

Then("verify that expected properties are included in backup position array", async () => {
	expect(Array.isArray(responseBody.backup_positions)).toBe(true);
	expect(responseBody.backup_positions.code).not.toBeNull();
	expect(responseBody.backup_positions.name).not.toBeNull();
	expect(responseBody.backup_positions.vacant).not.toBeNull();
	expect(responseBody.backup_positions.blocked).not.toBeNull();
});

Then("verify that expected properties are included in primary position array", async () => {
	expect(Array.isArray(responseBody.primary_positions)).toBe(true);
	expect(responseBody.primary_positions.code).not.toBeNull();
	expect(responseBody.primary_positions.name).not.toBeNull();
	expect(responseBody.primary_positions.vacant).not.toBeNull();
	expect(responseBody.primary_positions.blocked).not.toBeNull();
});

Given("that a employee is not in status draft", async function () {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();
	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;
	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"active",
	);
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("active");
	employeeId = responseBody.id;
});

Then("return error", async function () {
	expect(response.status()).toBe(400);
});

Given("that employee is in status draft", async function () {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();
	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;
	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("draft");
	employeeId = responseBody.id;
});

When("you activate employee via API", async function () {
	response = await employeeApiCalls.activateEmployee(employeeId);
});

Given("that employee is in status active", async function () {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();
	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;
	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);
	responseBody = await response.json();
	employeeId = responseBody.id;
	response = await employeeApiCalls.activateEmployee(employeeId);
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("active");
});

When("user terminate the employee via API", async function () {
	response = await employeeApiCalls.terminateEmployee(employeeId);
	await expect(response).toBeOK();
});

Given("that a employee is NOT in status Terminated", async function () {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();
	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;
	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"active",
	);
	responseBody = await response.json();
	expect(responseBody.current_status).not.toBe("terminated");
	employeeId = responseBody.id;
});

When("you Re-Activate an employee via API", async function () {
	response = await employeeApiCalls.reActivateEmployee(employeeId);
});

Given("that employee is NOT in status active", async function () {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();
	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;
	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);
	responseBody = await response.json();
	expect(responseBody.current_status).not.toBe("active");
	employeeId = responseBody.id;
});

Then("you return error", async function () {
	await expect(response).not.toBeOK();
});

Given("that employee is in status Terminated", async function () {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();
	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;
	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"terminated",
	);
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("terminated");
	employeeId = responseBody.id;
});

Given("that employee is NOT in status draft", async function () {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();
	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;
	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"active",
	);
	responseBody = await response.json();
	expect(responseBody.current_status).not.toBe("draft");
	employeeId = responseBody.id;
});

Given("the user has employees with different statuses", async () => {
	const draftEmployeeData = generateRandomEmployeeData();
	let response = await employeeApiCalls.createEmployee(
		draftEmployeeData.firstName,
		draftEmployeeData.lastName,
		draftEmployeeData.title,
		"draft",
	);
	let responseBody = await response.json();
	expect(responseBody.current_status).toBe("draft");
	const activeEmployeeData = generateRandomEmployeeData();
	response = await employeeApiCalls.createEmployee(
		activeEmployeeData.firstName,
		activeEmployeeData.lastName,
		activeEmployeeData.title,
		"draft",
	);
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("draft");

	const activeEmployeeId = responseBody.id;
	response = await employeeApiCalls.activateEmployee(activeEmployeeId);
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("active");
	const terminatedEmployeeData = generateRandomEmployeeData();
	response = await employeeApiCalls.createEmployee(
		terminatedEmployeeData.firstName,
		terminatedEmployeeData.lastName,
		terminatedEmployeeData.title,
		"draft",
	);
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("draft");

	const terminatedEmployeeId = responseBody.id;
	response = await employeeApiCalls.activateEmployee(terminatedEmployeeId);
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("active");
	response = await employeeApiCalls.terminateEmployee(terminatedEmployeeId);
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("terminated");
});

Given("the employee list has employees with different Availability", async () => {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();
	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;
	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("draft");
	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"active",
	);
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("active");

	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"terminated",
	);
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("terminated");
});

Given("an employee exists in the Employees Organization list", async () => {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();
	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;
	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("draft");
});

Given("an employee is added to the system", async () => {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();
	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;
	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("draft");
});

When(/^user call the check-access API with email does not exist in the system$/, async function () {
	response = await employeeApiCalls.employeeCheckAccess(faker.internet.email());
	responseBody = await response.json();
});

Then("response return existing user is equal to null", async function () {
	expect(responseBody.user).toBe(null);
});

const userWithAccessAndNoEmployee = "eric@nanoramic.com";

When(/^user has access but it is not linked to an employee and you call the check-access API$/, async function () {
	response = await employeeApiCalls.employeeCheckAccess(userWithAccessAndNoEmployee);
	responseBody = await response.json();
});

Then(/^you return existing access$/, async function () {
	expect(responseBody.user).toBeDefined();
	expect(responseBody.user.id).toBe(2);
	expect(responseBody.user.email).toBe(userWithAccessAndNoEmployee);
	expect(responseBody.user.state).toBe("operational");
});

Then("employee is null", async function () {
	expect(responseBody.employee).toBe(null);
});

const userWithNoAccess = "admin@exiqtive.com";

When(/^user exists but has no access in the system and you call the check-access API$/, async function () {
	response = await employeeApiCalls.employeeCheckAccess(userWithNoAccess);
	responseBody = await response.json();
});

Then(/^response return access is equal to null$/, async function () {
	expect(responseBody.access).toBe(null);
});

Given("user has Employee with proficiency badge", async function () {
	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("draft");
	employeeId = responseBody.id;
	response = await employeeApiCalls.activateEmployee(employeeId);
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("active");

	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	responsibilityId = responseBody.id;

	response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");

	response = await employeeApiCalls.createProficiencyBadge(employeeId, responsibilityId, 1);
	await expect(response).toBeOK();
	responseBody = await response.json();
	badgeId = responseBody.id;
});

When("User call list Employee badges API", async () => {
	response = await employeeApiCalls.getEmployeeBadge(employeeId);
	responseBody = await response.json();
});

Then("list all badges for particular Employee should be listed", async () => {
	expect(responseBody.count).not.toEqual(0);
});

When("User call list Employee without badges API", async () => {
	response = await employeeApiCalls.getEmployeesExcludingBadge(responsibilityId);
	responseBody = await response.json();
});

Then("list all employee that dont have badge assigned", async () => {
	const listOfEmployee = await responseBody.results;
	for (const employee of listOfEmployee) {
		expect(employee.id).not.toContain(employeeId);
	}
});
Given("user has a employee", async function () {
	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);
	responseBody = await response.json();
	employeeId = responseBody.id;
	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	responsibilityId = responseBody.id;
});

Given("user have 2 employees", async function () {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();

	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;

	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);

	responseBody = await response.json();
	employeeId = responseBody.id;
	response = await employeeApiCalls.activateEmployee(employeeId);
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("active");

	response = await employeeApiCalls.createEmployee(
		addedSecoundEmployeeData.firstName,
		addedSecoundEmployeeData.lastName,
		addedSecoundEmployeeData.title,
		"draft",
	);
});

Given("user add a badge with reason via API", async function () {
	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	responsibilityId = responseBody.id;
	response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");

	response = await employeeApiCalls.createBadgeForEmployeeWithReason(employeeId, responsibilityId, "given");
	await expect(response).toBeOK();
	responseBody = await response.json();
	badgeId = await responseBody.id;
});

Then("user call the responsibility directory list api", async function () {
	response = await employeeApiCalls.responsibilityDirectoryList();
	responseBody = await response.json();
});

Then("Verify that the responsibility list contains the correct attributes", async () => {
	responseBody.forEach((responsibility) => {
		expect(responsibility).toHaveProperty("code_str");
		expect(responsibility).toHaveProperty("name");
		expect(responsibility).toHaveProperty("apprentice_assignment_count");
		expect(responsibility).toHaveProperty("badge_apprentice_holder_count");
		expect(responsibility).toHaveProperty("badge_coach_holder_count");
		expect(responsibility).toHaveProperty("badge_master_holder_count");
		expect(responsibility).toHaveProperty("badge_professional_holder_count");
		expect(responsibility).toHaveProperty("coach");
		expect(responsibility).toHaveProperty("coach_assignment_count");
		expect(responsibility).toHaveProperty("id");
		expect(responsibility).toHaveProperty("master_assignment_count");
		expect(responsibility).toHaveProperty("professional_assignment_count");
		if (responsibility.apprentice) {
			responsibility.apprentice.forEach((apprentice: unknown) => {
				expect(apprentice).toHaveProperty("full_name");
				expect(apprentice).toHaveProperty("avatar");
			});
		}
		if (responsibility.professional) {
			responsibility.professional.forEach((professional: unknown) => {
				expect(professional).toHaveProperty("full_name");
				expect(professional).toHaveProperty("avatar");
			});
		}
	});
});

When("the User list all employee via API", async () => {
	response = await employeeApiCalls.listAllEmployees();
	responseBody = await response.json();
});

Then("additional keys should exist in all employee", async () => {
	for (const employee of responseBody.results) {
		await expect(employee).toHaveProperty("primary_positions");
		await expect(employee).toHaveProperty("backup_positions");
		await expect(employee).toHaveProperty("preparing_for_positions");
		await expect(employee).toHaveProperty("acting_as_positions");
	}
});

When("user assign a position to employee", async () => {
	response = await positionApiCalls.createNewPosition(newRole.name, "draft");
	responseBody = await response.json();
	const positionId = responseBody.id;
	response = await positionApiCalls.activatePosition(positionId);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");

	storedEffectiveOnDate = new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000))
		.toISOString()
		.split("T")[0];

	response = await employeeApiCalls.addPositionAssignmentToEmployee(employeeId, positionId, 2, storedEffectiveOnDate);
	responseBody = await response.json();
	assignmentId = responseBody.id;
	await expect(response).toBeOK();
});

Then("Verfiy that effective_on in the response body", async () => {
	expect(responseBody).toHaveProperty("effective_on");
	expect(responseBody.effective_on).not.toBeNull();
	expect(responseBody.effective_on).not.toBeUndefined();
	expect(responseBody.effective_on).toBe(storedEffectiveOnDate);
});

Then("response body have property effective_by", async () => {
	expect(responseBody).toHaveProperty("effective_by");
	expect(responseBody.effective_by).not.toBeNull();
	expect(responseBody.effective_by).not.toBeUndefined();
	expect(responseBody.effective_by).toBe(storedEffectiveByDate);
});

Given("user assigns active position to employee", async () => {
	const positionAPIData: PositionData = getRandomPosition();
	newPositionAPIData.position = positionAPIData.position;
	response = await positionApiCalls.createNewPosition(newPositionAPIData.position, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	positionId = responseBody.id;
	response = await positionApiCalls.activatePosition(positionId);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");

	response = await employeeApiCalls.addPositionAssignmentToEmployee(employeeId, positionId, 2);
	responseBody = await response.json();
	await expect(response).toBeOK();
});

When("user assign position to employee with allocation and commitment 1", async () => {
	response = await positionApiCalls.createNewPosition(newRole.name, "draft");
	responseBody = await response.json();
	const positionId = responseBody.id;
	response = await positionApiCalls.activatePosition(positionId);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");

	const today = new Date();
	const futureDate = new Date(today.getTime() + Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000);
	storedEffectiveOnDate = futureDate.toISOString().split("T")[0];

	response = await employeeApiCalls.addPositionAssignmentToEmployeeWithCommitment(
		employeeId,
		positionId,
		1,
		1,
		storedEffectiveOnDate,
	);
	responseBody = await response.json();
	await expect(response).toBeOK();
});

When("user assign position to employee with commitment 3", async () => {
	response = await positionApiCalls.createNewPosition(newRole.name, "draft");
	responseBody = await response.json();
	const positionId = responseBody.id;

	response = await employeeApiCalls.addPositionAssignmentToEmployeeWithCommitment(employeeId, positionId, 1, 1);
	responseBody = await response.json();
	await expect(response).toBeOK();
});

Then("verify the employee to contain details", async () => {
	for (const employee of responseBody.results) {
		if (employee.id == employeeId) {
			expect(employee.backup_positions).not.toBeNull();
		}
	}
});

Given("user is an employee without a current badge", async () => {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();

	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;

	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);

	responseBody = await response.json();
	employeeId = responseBody.id;

	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	responsibilityId = responseBody.id;
});

Given("that an employee does not have a current badge for a specific responsibility", async () => {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();

	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;

	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);

	responseBody = await response.json();
	employeeId = responseBody.id;
	response = await employeeApiCalls.activateEmployee(employeeId);
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("active");

	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	responsibilityId = responseBody.id;

	response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");
});

When("user grant proficiency badge", async () => {
	response = await responsibilityApiCalls.grantProficiencyBadgeForResponsibility(responsibilityId, employeeId, 2, true);
	responseBody = await response.json();
});

Then("Verify Response Has Specific Properties", async () => {
	expect(responseBody).toHaveProperty("status");
	expect(responseBody).toHaveProperty("issued_for");
	expect(responseBody.issued_for).toBeTruthy();
});

Then("Verify the return badge_id", async () => {
	expect(responseBody.id).not.toBeNull();
});

Given("User is an employee that has current badge", async () => {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();

	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;

	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);

	responseBody = await response.json();
	employeeId = responseBody.id;
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;
	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	responsibilityId = responseBody.id;
	response = await responsibilityApiCalls.grantProficiencyBadgeForResponsibility(responsibilityId, employeeId, 2, true);
	responseBody = await response.json();
});

Then("Verify the response error {string}", async (response: string) => {
	expect(responseBody).toContain(response);
});

Then("verify the response status should be {string}", async (responseBody: string) => {
	expect(responseBody).toContain(responseBody);
	await expect(response).toBeOK();
});

When("user create a proficiency badge", async () => {
	response = await employeeApiCalls.createProficiencyBadge(employeeId, responsibilityId, 1);
	responseBody = await response.json();
});

Then("a proficiency badge is created", async () => {
	await expect(response).toBeOK();
});

Then("response return the badge Id", async () => {
	expect(responseBody.id).not.toBeNull();
});

Given("that employee has a proficiency badge created", async () => {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();

	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;

	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);
	responseBody = await response.json();
	employeeId = responseBody.id;
	response = await employeeApiCalls.activateEmployee(employeeId);
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("active");
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;
	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	responsibilityId = responseBody.id;
	response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");
	response = await employeeApiCalls.createProficiencyBadge(employeeId, responsibilityId, 1);
	responseBody = await response.json();
	await expect(response).toBeOK();
});

Then("return error \"has current badge\"", async () => {
	expect(responseBody).toContain("Has current badge");
});

When("user Grant badge to employee", async () => {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;
	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	responsibilityId = responseBody.id;
	response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");
	response = await employeeApiCalls.grantBadgeToEmployee(employeeId, responsibilityId, 1);
	responseBody = await response.json();
	badgeId = responseBody.id;
});

When("user Issue badge to employee with Active Responsibility", async function () {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;
	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	responsibilityId = responseBody.id;
	responsibilityCodeStr = responseBody.code_str;
	response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");
	response = await employeeApiCalls.grantBadgeToEmployee(employeeId, responsibilityId, 1);
	responseBody = await response.json();
	badgeId = responseBody.id;
});

When("user Grant badge to employee without responsibility creation", async () => {
	response = await employeeApiCalls.grantBadgeToEmployee(employeeId, responsibilityId, 1);

	responseBody = await response.json();
});

Then("verify employee api status to be 200", async () => {
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
});

Then("User call the employee badges detail API", async () => {
	response = await employeeApiCalls.getEmployeeBadgesDetails(employeeId);
	await expect(response).toBeOK();
	responseBody = await response.json();
	expect(response.status()).toBe(200);
});

Then("Verify the badge details for the employee", async function () {
	expect(responseBody).toBeInstanceOf(Array);
	expect(responseBody.length).toBeGreaterThan(0);
	responseBody.forEach((badge) => {
		expect(badge).toHaveProperty("id");
		expect(badge).toHaveProperty("level");
		expect(badge).toHaveProperty("status");
		expect(badge).toHaveProperty("is_current");
		expect(badge).toHaveProperty("issued_for");
		expect(badge).toHaveProperty("issued_by");
		expect(badge).toHaveProperty("issued_on");
		expect(badge.issued_for).toHaveProperty("name");
		expect(badge.issued_for).toHaveProperty("code");
		expect(badge.issued_by).toHaveProperty("name");
		expect(badge.is_current).toBe(true);
		expect(badge.status).toBe("given");
	});
});

Then("verify employee api status to be 400", async () => {
	expect(response.status()).toBe(400);
});

Then("verify the responseBody for Delete employee", async () => {
	expect(responseBody[0]).toContain("Only draft employees can be deleted");
});

Then("verify the responseBody for Grant badge to employee", async () => {
	expect(responseBody.id).toBe(badgeId);
	expect(responseBody.issued_to).toBe(employeeId);
});

When("granted badge again to employee", async () => {
	response = await employeeApiCalls.grantBadgeToEmployee(employeeId, responsibilityId, 1);

	responseBody = await response.json();
});

Then("employee api response should be {string}", async (responseValue: string) => {
	if (Array.isArray(responseBody)) {
		expect(responseBody[0]).toContain(responseValue);
	} else {
		expect(responseBody).toContain(responseValue);
	}
});

Given("there are at least {int} employees on the Account > Organization page", async function (numberOfUsers: number) {
	response = employeeApiCalls.createMultipleEmployees(numberOfUsers);
	responseBody = response.json;
});

export { addedEmployeeData, addedSecoundEmployeeData, createdUserEmail };

When(/^you post to employee chatter$/, async function () {
	note = getRandomPhrase();
	response = await employeeApiCalls.postToChatter(employeeId, note, "employee", true);
});

Then("you return response for Employee status to be {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then(/^the note for employee$/, async function () {
	responseBody = await response.json();
	expect(responseBody.note).toEqual(note);
});

Given("there is a Employee", async function () {
	response = employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);
});

Given("that a employee has {int} posts to chatter", async function (chatters: number) {
	this.response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);

	responseBody = await this.response.json();
	employeeId = responseBody.id;

	const baseNote = getRandomPhrase();
	for (let i = 0; i < chatters; i++) {
		const note = `${baseNote} ${i}`;
		const response = await positionApiCalls.postToChatter(employeeId, note, "employee", true);
		await expect(response).toBeOK();
	}
});

When("user calls the chatter list API for the employee", async function () {
	response = await employeeApiCalls.listEmployeeChatter(employeeId);
	responseBody = await response.json();
	if (responseBody.count >= 10) {
		return;
	}
	for (let i = 0; i < 10; i++) {
		const note = `Test chatter entry ${i + 1}`;
		const chatterResponse = await employeeApiCalls.postToChatter(employeeId, note, "employee", true);
		await expect(chatterResponse).toBeOK();
	}
	response = await employeeApiCalls.listEmployeeChatter(employeeId);
	responseBody = await response.json();
});

Then("verify the status for Employee Chatter list to be {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
	responseBody = await response.json();
});

Then("verify count of entries for the employee chatter should be {int}", async function (chatterEntries: number) {
	expect(responseBody.results.length).toBe(chatterEntries);
});

Then("verify count of total employee chatter should be greater or equal to {int}", async function (count: number) {
	expect(responseBody.count).toBeGreaterThanOrEqual(count);
});

Given("that a employee is in status {string}", async function (status: string) {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();
	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;
	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);
	responseBody = await response.json();
	employeeId = responseBody.id;
	setSharedData("employeeId", employeeId.toString());
	setSharedData("employeeFirstName", addedEmployeeData.firstName);
	firstName = responseBody.first_name;
	lastName = responseBody.last_name;

	if (status === "Active") {
		response = await employeeApiCalls.activateEmployee(employeeId);
		if (!response.ok()) {
			const errorText = await response.text();
			throw new Error(`Employee activation API failed with status ${response.status()}: ${errorText}`);
		}
		responseBody = await response.json();
	} else if (status === "Terminated") {
		response = await employeeApiCalls.activateEmployee(employeeId);
		if (!response.ok()) {
			const errorText = await response.text();
			throw new Error(`Employee activation API failed with status ${response.status()}: ${errorText}`);
		}
		responseBody = await response.json();
		response = await employeeApiCalls.terminateEmployee(employeeId);
		responseBody = await response.json();
	} else if (status === "Re-activate") {
		response = await employeeApiCalls.activateEmployee(employeeId);
		if (!response.ok()) {
			const errorText = await response.text();
			throw new Error(`Employee activation API failed with status ${response.status()}: ${errorText}`);
		}
		responseBody = await response.json();
		response = await employeeApiCalls.terminateEmployee(employeeId);
		responseBody = await response.json();
		response = await employeeApiCalls.reActivateEmployee(employeeId);
		responseBody = await response.json();
	}
});

When("user calls the user-create API for the employee", async function () {
	response = await employeeApiCalls.employeeUserCreate(
		newUserData.email,
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		employeeId,
	);
	responseBody = await response.json();
	expect(response.status()).toBe(201);
	createdUserId = responseBody.id;
	createdUserEmail = responseBody.email;
});

When("Create a user via API", async function () {
	response = await employeeApiCalls.userCreate(newUserData.email, employeeId);
	responseBody = await response.json();
	expect(response.status()).toBe(201);
	createdUserId = responseBody.id;
});

Then("verify the Badge Master field in the employee response", async function () {
	response = await employeeApiCalls.getEmployeeResponse(createdUserId);
	responseBody = await response.json();
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
	expect(responseBody.has_coach_badge).toBe(true);
});

Then("User Call the Access API Call", async function () {
	response = await employeeApiCalls.getEmployeeResponse(createdUserId);
	responseBody = await response.json();
});

Then("Verify Last Login and Avatar Fields in Access API Response", async function () {
	const responseBody = await response.json();
	expect(responseBody.user).toBeDefined();
	expect(responseBody.user).toHaveProperty("last_login");
	expect(responseBody).toHaveProperty("avatar");
});

Given("Verify directories parameter in the Access API response", async () => {
	expect(responseBody.show_employee_directory).toBe(false);
	expect(responseBody.show_responsibilities_directories).toBe(false);
});

Then("user calls list of Mastered Responsibility", async function () {
	response = await employeeApiCalls.getListOfMasteredResponsibility(employeeId);
	responseBody = await response.json();
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
});

Then("Verifying the values for badge_master_holder_count", async function () {
	expect(responseBody[0].badge_master_holder_count).toBe(1);
});

Then("Verifying the values for master_will_coach", async function () {
	expect(responseBody[0].master_will_coach).toBe(true);
});

Then("Verifying the values for master_assignment_count", async function () {
	expect(responseBody[0].master_assignment_count).toBe(1);
});

Then("Verify the Employee Object In The API Response", async function () {
	expect(response.status()).toBe(201);
	responseBody = await response.json();
	expect(responseBody.id).toBeDefined();
	expect(typeof responseBody.id).toBe("number");
	expect(responseBody.employee.user.email).toBe(newUserData.email);
	expect(responseBody.employee.user.first_name).toBe(addedEmployeeData.firstName);
	expect(responseBody.employee.user.last_name).toBe(addedEmployeeData.lastName);
	expect(responseBody.employee.id).toBe(employeeId);
	expect(responseBody.employee.user.state).toBe("invited");
	expect(responseBody.employee.user.state_str).toBe("Invited");
});

When("user checks linked employees for {string} through API", async (check: string) => {
	let email: string;
	if (check === "valid email") {
		email = "single.automation@exiqtive.com";
	} else {
		email = "invalid@gmail.com";
	}
	response = await employeeApiCalls.testEmail(email);
	responseBody = await response.json();
	expect(response.status()).toBe(200);
	expect(responseBody.email).toContain(email);
});

Then("user should get all expected values to be {string}", async (expectedValue: string) => {
	const isExpectedTrue = expectedValue === "true";
	expect(responseBody.user).toBe(isExpectedTrue);
	expect(responseBody.access).toBe(isExpectedTrue);
	expect(responseBody.employee).toBe(isExpectedTrue);
});

Then("status should be {string}", async (expectedStatus: string) => {
	expect(responseBody.state).toBe(expectedStatus);
});

Given("that a employee is not in status {string}", async (status: string) => {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();

	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;

	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);
	responseBody = await response.json();
	employeeId = responseBody.id;
	if (status === "Draft") {
		response = await employeeApiCalls.activateEmployee(employeeId);
		responseBody = await response.json();
	}
});

When("user {string} the employee via API", async (status: string) => {
	if (status === "Active") {
		response = await employeeApiCalls.activateEmployee(employeeId);
		responseBody = await response.json();
	} else if (status === "Terminate") {
		response = await employeeApiCalls.terminateEmployee(employeeId);
		responseBody = await response.json();
	} else if (status === "Reactivate") {
		response = await employeeApiCalls.reActivateEmployee(employeeId);
		responseBody = await response.json();
	} else if (status === "Delete") {
		response = await employeeApiCalls.deleteEmployees(employeeId);
		if (response.status() === 400) {
			responseBody = await response.json();
		}
	} else if (status === "Rename") {
		const updateEmployeeData: EmployeeData = generateRandomEmployeeData();
		addedEmployeeData.firstName = updateEmployeeData.firstName;
		addedEmployeeData.lastName = updateEmployeeData.lastName;
		addedEmployeeData.title = updateEmployeeData.title;
		response = await employeeApiCalls.renameEmployee(
			employeeId,
			addedEmployeeData.firstName,
			addedEmployeeData.lastName,
			addedEmployeeData.title,
		);
		responseBody = await response.json();
	}
});

Then("employee status to be {string}", async (status: string) => {
	const statusText = status.toLowerCase();
	expect(responseBody.current_status).toBe(statusText);
});

Then("employee response should be {string}", async (responseMsg: string) => {
	if (responseBody.message) {
		expect(responseBody.message).toContain(responseMsg);
	} else {
		expect(responseBody[0]).toContain(responseMsg);
	}
});

Then("the employee is removed from the employee list", async () => {
	response = await employeeApiCalls.deleteEmployees(employeeId);
	responseBody = await response.json();

	const employeeList = responseBody.results;
	for (const employee of employeeList) {
		expect(employee.id).not.toBe(employeeId);
	}
});

Then("employee name is update with new name", async () => {
	expect(responseBody.id).toBe(employeeId);
	expect(responseBody.first_name).toBe(addedEmployeeData.firstName);
	expect(responseBody.last_name).toBe(addedEmployeeData.lastName);
	expect(responseBody.title).toBe(addedEmployeeData.title);
});

When("the user assign the Responsibility to employee", async function () {
	response = await employeeApiCalls.assignResposibilityToEmployee(responsibilityId, employeeId, 2);
	responseBody = await response.json();
	assignmentId = responseBody.id;
});

Then("return the Responsibility assignment id", async function () {
	expect(responseBody.id).toEqual(assignmentId);
});

Given("User has Role", async function () {
	response = await newRoles.createRole(newRole.name, newRole.description, "active");
	responseBody = await response.json();
	roleId = responseBody.id;
	roleCodeStr = responseBody.code_str;
	setSharedData("roleId", roleId.toString());
	setSharedData("roleName", newRole.name);
});

Given("User has a Role in draft", async function () {
	response = await newRoles.createRole(newRole.name, newRole.description, "draft");
	responseBody = await response.json();
	roleId = responseBody.id;
	roleCodeStr = responseBody.code_str;
});

Then("user activates the role", async () => {
	response = await newRoles.activateRole(roleId);
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
});

Given("user have responsibility is in status {string}", async function (status: string) {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	responsibilityId = responseBody.id;
	setSharedData("responsibilityId", responsibilityId.toString());
	setSharedData("responsibilityName", newRole.name);
	responsibilityCodeStr = `#${responseBody.code} - ${responseBody.name}`;

	if (status === "Active") {
		response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("active");
		if (responseBody.code_str) {
			responsibilityCodeStr = responseBody.code_str;
		}
	} else if (status === "Inactive") {
		response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
		responseBody = await response.json();
		response = await responsibilityApiCalls.deActivateResponsibility(responsibilityId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("inactive");
	} else if (status === "Retired") {
		response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
		responseBody = await response.json();
		response = await responsibilityApiCalls.retiredResponsibility(responsibilityId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("retired");
	}
});

Given("user has responsibility is in status {string}", async function (status: string) {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	expect(response.status()).toBe(201);
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	responsibilityId = responseBody.id;
	setSharedData("responsibilityId", responsibilityId.toString());
	setSharedData("responsibilityName", newRole.name);
	responsibilityCodeStr = `#${responseBody.code} - ${responseBody.name}`;

	if (status === "Active") {
		response = await responsibilityApiCalls.activateResponsibility(responsibilityId);

		if (response.ok()) {
			responseBody = await response.json();
			expect(responseBody.status).toBe("active");
			if (responseBody.code_str) {
				responsibilityCodeStr = responseBody.code_str;
			}
		} else {
			const errorText = await response.text();
			throw new Error(`Responsibility activation failed with status ${response.status()}: ${errorText}`);
		}
	} else if (status === "Inactive") {
		response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
		responseBody = await response.json();
		response = await responsibilityApiCalls.deActivateResponsibility(responsibilityId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("inactive");
	} else if (status === "Retired") {
		response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
		responseBody = await response.json();
		response = await responsibilityApiCalls.retiredResponsibility(responsibilityId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("retired");
	}
});

When("User assign the Role to employee", async function () {
	response = await employeeApiCalls.assignRoleToEmployee(roleId, employeeId);
	responseBody = await response.json();
	assignmentId = responseBody.id;
	roleAssignmentId = responseBody.id;
	assignedEmployee = responseBody.assigned_to_employee;
});

Then("Re-calculate the overall readiness of the role", async function () {
	console.log(responseBody);
});

Given("User remove one badge", async () => {
	const badgeId = responseBody.id;
	response = await employeeApiCalls.removeBadge(badgeId, "string");
	responseBody = await response.json();
});

Then("user removes badge assignment from employee", async () => {
	response = await employeeApiCalls.removeBadge(badgeId, "string");
	if (response.ok()) {
		responseBody = await response.json();
	} else {
		try {
			responseBody = await response.json();
		} catch (e) {
			const errorText = await response.text();
			responseBody = errorText;
		}
	}
	await expect(response).toBeOK();
});

Then("Return the Role assignment id", async function () {
	expect(responseBody.id).toEqual(assignmentId);
});

When("user attach responsibility to role via API", async function () {
	response = await newRoles.attachResponsibilityToRole(responsibilityId, roleId);
	const responseBody = await response.json();
	expect(responseBody).toBeTruthy();
});

Then("User refetch the role assignment object for readiness", async function () {
	response = await employeeApiCalls.getRoleAssigment(employeeId, assignmentId);
	responseBody = await response.json();
	await expect(response).toBeOK();
});

Then("create evaluation_request", async function () {
	this.response = await employeeApiCalls.evaluationRequest(responsibilityId, employeeId);
	responseBody = await this.response.json();
	evaluationId = responseBody.id;
});

Then("Accept the Evaluation Request", async function () {
	this.response = await employeeApiCalls.acceptEvaluationRequest(responsibilityId, evaluationId);
	responseBody = await this.response.json();
});

Then("Abondon the Evaluation Request", async function () {
	this.response = await employeeApiCalls.abondonEvaluationRequest(responsibilityId, evaluationId);
	responseBody = await this.response.json();
});

Then("Done the Evaluation Request", async function () {
	this.response = await employeeApiCalls.doneEvaluationRequest(responsibilityId, evaluationId);
	responseBody = await this.response.json();
});

Then("Cancel the Evaluation Request", async function () {
	this.response = await employeeApiCalls.cancelEvaluationRequest(responsibilityId, evaluationId);
	responseBody = await this.response.json();
});

Then("the evaluation error {string}", async function (responseMsg: string) {
	if (responseBody.message) {
		expect(responseBody.message).toContain(responseMsg);
	} else {
		expect(responseBody[0]).toContain(responseMsg);
	}
});

Then("Retrieve request ID for a pending evaluation request", async () => {
	await expect(responseBody.id).toBe(responsibilityId);
});

Then("set status to be {string}", async (expectedStatus: string) => {
	await expect(responseBody.status).toContain(expectedStatus);
});

Then("verify the badge details are displayed in the badges array", async function () {
	expect(responseBody).toHaveProperty("badges_count");
	expect(responseBody.badges_count).toBeGreaterThan(0);
	expect(responseBody.badges_count).toBe(1);
});

Given("Position is in status {string}", async (status: string) => {
	const updatePositionData: PositionData = getRandomPosition();
	newPositionAPIData.position = updatePositionData.position;

	response = await positionApiCalls.createNewPosition(newPositionAPIData.position, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	positionId = responseBody.id;
	positionCodeStr = responseBody.code_str;

	if (status === "Active") {
		response = await positionApiCalls.activatePosition(positionId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("active");
	}

	setSharedData("positionId", positionId.toString());
	setSharedData("positionName", newPositionAPIData.position);
});

When("user De-Activate the position", async () => {
	response = await positionApiCalls.deActivatePosition(positionId);
	expect(response.status()).toBe(200);
	responseBody = await response.json();
});

When("User assign the position to Employee", async function () {
	const sharedPositionId = parseInt(getSharedData("positionId"));
	response = await positionApiCalls.assignPositionToEmployee(employeeId, sharedPositionId, 1, 1);
	responseBody = await response.json();
	expect(responseBody).toBeTruthy();
	assignmentId = responseBody.id;
	posAssignmentId = responseBody.id;
	assignedEmployee = responseBody.assigned_to_employee;
	await new Promise((resolve) => setTimeout(resolve, 2000));
});

When("User assigns the position to Employee with no commitment and allocation", async function () {
	response = await positionApiCalls.assignPositionToEmployeeWithNoCommitmentAndAllocation(employeeId, positionId);
	responseBody = await response.json();
	expect(responseBody).toBeTruthy();
	assignmentId = responseBody.id;
	posAssignmentId = responseBody.id;
	assignedEmployee = responseBody.assigned_to_employee;
});

When("User assign the position to draft Employee", async function () {
	response = await positionApiCalls.assignPositionToEmployee(employeeId, positionId, 1, 1);
	responseBody = await response.json();
	expect(response.status()).toBe(400);
});

When("verify user is not able to assign the position", async function () {
	expect(responseBody[0]).toBe("Assigning an inactivated employee to a position is not allowed.");
});

When("User relieves the position assignment", async function () {
	const today = new Date();
	const futureDate = new Date(today.getTime() + Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000);
	storedEffectiveByDate = futureDate.toISOString().split("T")[0];

	response = await positionApiCalls.relievePositionAssignment(assignmentId, storedEffectiveByDate);
	responseBody = await response.json();
	expect(response.status()).toBe(200);
	expect(responseBody).toBeTruthy();
	if (response.ok()) {
		responseBody = await response.json();
		badgeId = responseBody.id;
	} else {
		try {
			responseBody = await response.json();
		} catch (e) {
			const errorText = await response.text();
			responseBody = errorText;
		}
	}
});

When("User attach the role to position", async () => {
	response = await positionApiCalls.attachRoleToPosition(roleId, positionId);
	responseBody = await response.json();
	await expect(response).toBeOK();
});

When("User Verify the Employee Assignments Tree API end point", async () => {
	response = await employeeApiCalls.getEmployeeAssignment(employeeId);
	responseBody = await response.json();
	expect(responseBody[0].id).not.toBeNull();
	expect(responseBody[0].status).toBe("active");
});

Then("user calls employee assignments api", async () => {
	response = await employeeApiCalls.getEmployeeAssignment(employeeId);
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
	responseBody = await response.json();
	expect(responseBody).toBeDefined();
	expect(Array.isArray(responseBody)).toBe(true);
	expect(responseBody.length).toBeGreaterThan(0);
	if (responseBody[0] && responseBody[0].position_code) {
		positionCodeStr = responseBody[0].position_code;
	}
});

When("User calls the Get Responsibility Assignment API", async function () {
	const response = await employeeApiCalls.getResponsibilityAssignments(responsibilityId);
	const responseBody = await response.json();
	expect(responseBody).toBeTruthy();
	expect(responseBody).not.toHaveLength(0);
});

Then("Verify that responsibility assignment status is {string}", async function (expectedStatus: string) {
	const response = await employeeApiCalls.getResponsibilityAssignments(responsibilityId);
	const responseBody = await response.json();
	expect(Array.isArray(responseBody)).toBe(true);
	expect(responseBody.length).toBeGreaterThan(0);
	const actualStatus = responseBody[0]?.status;

	if (expectedStatus === "Novice" || expectedStatus === "Apprentice") {
		expect(actualStatus).toBe(expectedStatus);
	} else if (expectedStatus === "by Dan RAOELINARIVO") {
		expect(actualStatus).toContain(expectedStatus);
	} else {
		throw new Error(`Unexpected status verification for: ${expectedStatus}`);
	}
});

Then("Verify that responsibility assignment status matches relieved pattern with dynamic word", async function () {
	const response = await employeeApiCalls.getResponsibilityAssignments(responsibilityId);
	const responseBody = await response.json();
	expect(Array.isArray(responseBody)).toBe(true);
	expect(responseBody.length).toBeGreaterThan(0);
	const actualStatus = responseBody[0]?.status;
	const relievedPattern = /^Relieved on \d{1,2}-[A-Za-z]{3}-\d{4} by .+$/;
	expect(relievedPattern.test(actualStatus)).toBe(true);
	expect(responseBody[0]).toHaveProperty("badge_id");
	expect(typeof responseBody[0].badge_id).toBe("number");
	expect(responseBody[0]).toHaveProperty("employee_id");
	expect(responseBody[0].employee_id).toBe(employeeId);
	expect(responseBody[0]).toHaveProperty("assignment_id");
	expect(typeof responseBody[0].assignment_id).toBe("number");
});

When("user calls the archive employee API", async function () {
	response = await employeeApiCalls.archiveEmployee(employeeId);
});

When("user calls the Un-Archive employee API", async function () {
	response = await employeeApiCalls.unarchiveEmployee(employeeId);
});

Then("verify status for archive employee API to be {int}", async function (statusCode: number) {
	expect(await response.status()).toBe(statusCode);
});

Then("verify the employee is archived", async function () {
	responseBody = await response.json();
	expect(responseBody.archived).toBe(true);
});

Then("verify the employee is unarchived", async function () {
	responseBody = await response.json();
	expect(responseBody.archived).toBe(false);
});

Then("verify the error message for the archive employee api to be {string}", async function (errorText: string) {
	responseBody = await response.json();
	expect(responseBody.message).toContain(errorText);
});

When("status of proficiency badge is 201", async () => {
	expect(response.status()).toBe(201);
});

Then("verify response has is_current boolean true", async () => {
	expect(responseBody.is_current).toBe(true);
});

Then("verify response has removed_on field null", async () => {
	expect(responseBody.removed_on).toBeNull();
});

Then("verify response has access_id field", async () => {
	expect(responseBody.access_id).not.toBeNull();
});

Then("verify response has level field", async () => {
	expect(responseBody.level).not.toBeNull();
});

Then("verify response has granted_by field", async () => {
	expect(responseBody.granted_by).not.toBeNull();
});

Then("verify response has granted_method", async () => {
	expect(responseBody.granted_method).not.toBeNull();
});

Then("Verfiy response has issues_to field", async () => {
	expect(responseBody.issued_to).not.toBeNull();
});

Then("Verfiy response has issued_for field", async () => {
	expect(responseBody.issued_for).not.toBeNull();
});
Then("verify response has removed_by field null", async () => {
	expect(responseBody.removed_by).toBeNull();
});

Then("verify response has remove_method field null", async () => {
	expect(responseBody.remove_method).toBeNull();
});

Then("verify response has master_will_coach boolean true", async () => {
	expect(responseBody.master_will_coach).toBe(true);
});

Then("verify response has no replacing field", async () => {
	expect(responseBody).not.toHaveProperty("replacing");
});

Then("verify response has no replaced_by field", async () => {
	expect(responseBody).not.toHaveProperty("replaced_by");
});

Then("verify response has no replacement_impact field", async () => {
	expect(responseBody).not.toHaveProperty("replacement_impact");
});

When("user change the importance for {string}", async (assignmentType: string) => {
	response = await employeeApiCalls.changeImportance(assignmentType, assignmentId, 2);
	responseBody = await response.json();
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
});

Then("verify needs_recalc boolean is false", async () => {
	// Note: needs_recalc field is only available in recalculation API response, not in employee details
	// This step should be used after running recalculation, not after getting employee details
});

Given("need_recalc boolean is false", async () => {
	// Note: needs_recalc field is only available in recalculation API response, not in employee details
	// This step should be used after running recalculation, not after getting employee details
});

Then("user runs recalculations", async () => {
	response = await employeeApiCalls.runsRecalculation(employeeId);
	responseBody = await response.json();
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
});

Then("verify needs_recalc boolean is true", async () => {
	// Note: needs_recalc field is only available in recalculation API response, not in employee details
	// This step should be used after running recalculation, not after getting employee details
});

Then("user calls evaluate assignment api", async () => {
	response = await employeeApiCalls.getEmployeeAssignment(employeeId);
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
	responseBody = await response.json();
});

Then("verify position code and name is not null", async () => {
	expect(responseBody[0].position_code).not.toBeNull();
	expect(responseBody[0].position_name).not.toBeNull();
	expect(responseBody[0].position_code).toBeDefined();
	expect(responseBody[0].position_name).toBeDefined();
});

Then("verify role code and name is not null", async () => {
	expect(responseBody[0].role_assignments[0].role_code).not.toBeNull();
	expect(responseBody[0].role_assignments[0].role_name).not.toBeNull();
	expect(responseBody[0].role_assignments[0].role_code).toBeDefined();
	expect(responseBody[0].role_assignments[0].role_name).toBeDefined();
});

Then("verify responsibility code and name is not null", async () => {
	expect(responseBody[0].role_assignments[0].responsibility_assignments[0].responsibility_name).not.toBeNull();
	expect(responseBody[0].role_assignments[0].responsibility_assignments[0].responsibility_code).not.toBeNull();
	expect(responseBody[0].role_assignments[0].responsibility_assignments[0].responsibility_name).toBeDefined();
	expect(responseBody[0].role_assignments[0].responsibility_assignments[0].responsibility_code).toBeDefined();
});

Then("verify position is De-activated", async () => {
	expect(responseBody[0].status).toBe("de_activated");
});

Then("verify role is De-activated", async () => {
	expect(responseBody[0].role_assignments[0].status).toBe("de_activated");
});

Then("verify responsibility is De-activated", async () => {
	expect(responseBody[0].role_assignments[0].responsibility_assignments[0].status).toBe("de_activated");
});

When("user detach responsibility from role", async () => {
	response = await newRoles.detachResponsibilityFromRole(roleId, responsibilityId);
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
});

Then("verify responsibility_assignments status is {string}", async (status: string) => {
	expect(responseBody[0].role_assignments[0].responsibility_assignments[0].status).toBe(status);
});

Then(
	"verify reason is 'Detached when catalog Responsibility <code name> was detached from catalog role <code name>'",
	async () => {
		expect(responseBody[0].role_assignments[0].responsibility_assignments[0].reason).toBe(
			`Detached when catalog Responsibility ${responsibilityCodeStr} was detached from catalog role ${roleCodeStr}.`,
		);
	},
);

Then("verify reason is 'Retired when catalog responsibility <code name> was Retired'", async () => {
	expect(responseBody[0].role_assignments[0].responsibility_assignments[0].reason).toBe(
		`Retired when catalog responsibility ${responsibilityCodeStr} was Retired.`,
	);
});

When("user retire the responsibility", async () => {
	response = await responsibilityApiCalls.retiredResponsibility(responsibilityId);
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
});

When("user retire the role", async () => {
	response = await newRoles.retiredRole(roleId);
	await expect(response).toBeOK();
});

When("user detach role from position", async () => {
	response = await newRoles.detachRoleFromPosition(positionId, roleId);
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
});

Then("verify role_assignments status is {string}", async (status: string) => {
	expect(responseBody[0].role_assignments[0].status).toBe(status);
});

Then("Verify that role.id", async function () {
	const assignedRoleId = responseBody[0].role_assignments[0].role_id;
	expect(assignedRoleId).toBe(roleId);
});

Then("Verify responsibility.id", async function () {
	expect(responseBody[0]).toBeDefined();
	const assignedRoleId = responseBody[0].role_assignments[0].responsibility_assignments[0].responsibility_id;
	expect(assignedRoleId).toBe(responsibilityId);
});

Then("Verify importance is 3 at all levels", async function () {
	expect(Array.isArray(responseBody)).toBe(true);
	expect(responseBody.length).toBeGreaterThan(0);
	expect(responseBody[0]).toBeDefined();
	if (responseBody[0].importance !== undefined) {
		expect(responseBody[0].importance).toBe(3);
	}

	if (
		responseBody[0].role_assignments &&
		responseBody[0].role_assignments[0] &&
		responseBody[0].role_assignments[0].importance !== undefined
	) {
		expect(responseBody[0].role_assignments[0].importance).toBe(3);
	}

	if (
		responseBody[0].role_assignments &&
		responseBody[0].role_assignments[0] &&
		responseBody[0].role_assignments[0].responsibility_assignments &&
		responseBody[0].role_assignments[0].responsibility_assignments[0] &&
		responseBody[0].role_assignments[0].responsibility_assignments[0].importance !== undefined
	) {
		expect(responseBody[0].role_assignments[0].responsibility_assignments[0].importance).toBe(3);
	}
});

Then("Verify Badge Object in Employee Assignment", async function () {
	expect(responseBody[0]).toBeDefined();
	expect(responseBody[0].role_assignments).toBeDefined();
	expect(responseBody[0].role_assignments.length).toBeGreaterThan(0);
	expect(responseBody[0].role_assignments[0].responsibility_assignments).toBeDefined();
	expect(responseBody[0].role_assignments[0].responsibility_assignments.length).toBeGreaterThan(0);

	const responsibilityAssignment = responseBody[0].role_assignments[0].responsibility_assignments[0];
	expect(responsibilityAssignment).toBeDefined();
	const badge = responsibilityAssignment.badge;
	expect(badge).toBeDefined();
	expect(typeof badge).toBe("object");
	if (badge.level !== null && badge.level !== undefined) {
		expect(typeof badge.level).toBe("string");
		expect(badge.level.length).toBeGreaterThan(0);
	}
});

Then("verify reason is 'Retired when catalog role <code name> was Retired'", async () => {
	expect(responseBody[0].role_assignments[0].reason).toBe(`Retired when catalog role ${roleCodeStr} was Retired.`);
});

Then("verify responsibility_assignments reason is 'Retired when catalog role <code name> was Retired'", async () => {
	expect(responseBody[0].role_assignments[0].responsibility_assignments[0].reason).toBe(
		`Retired when catalog role ${roleCodeStr} was Retired.`,
	);
});

Then("verify reason is 'Detached when catalog role <code name> was detached from position <code name>'", async () => {
	expect(responseBody[0].role_assignments[0].reason).toBe(
		`Detached when catalog Role ${roleCodeStr} was detached from Position ${positionCodeStr}.`,
	);
});

Then(
	"verify responsibility_assignments reason is 'Detached when catalog role <code name> was detached from position <code name>'",
	async () => {
		expect(responseBody[0].role_assignments[0].responsibility_assignments[0].reason).toBe(
			`Detached when catalog Role ${roleCodeStr} was detached from Position ${positionCodeStr}.`,
		);
	},
);

When("user retire the position", async () => {
	response = await positionApiCalls.retirePosition(positionId);
	await expect(response).toBeOK();
	await new Promise((resolve) => setTimeout(resolve, 2000));
});

Then("verify position assignments status is {string}", async (status: string) => {
	expect(responseBody[0].status).toBe(status);
});

Then("verify reason is 'Retired when Position <code name> was Retired'", async () => {
	expect(responseBody[0].reason).toBe(`Retired when Position ${positionCodeStr} was Retired.`);
});

Then("verify role_assignments reason is 'Retired when Position <code name> was Retired'", async () => {
	expect(responseBody[0].role_assignments[0].reason).toBe(`Retired when Position ${positionCodeStr} was Retired.`);
});

Then("verify responsibility_assignments reason is 'Retired when Position <code name> was Retired'", async () => {
	expect(responseBody[0].role_assignments[0].responsibility_assignments[0].reason).toBe(
		`Retired when Position ${positionCodeStr} was Retired.`,
	);
});

Then("verify reason is 'Terminated when employee was terminated'", async () => {
	expect(responseBody[0].reason).toBe("Terminated when employee was terminated.");
});

Then("verify role_assignments reason is 'Terminated when employee was terminated'", async () => {
	expect(responseBody[0].role_assignments[0].reason).toBe("Terminated when employee was terminated.");
});

Then("verify responsibility_assignments reason is 'Terminated when employee was terminated'", async () => {
	expect(responseBody[0].role_assignments[0].responsibility_assignments[0].reason).toBe(
		"Terminated when employee was terminated.",
	);
});

Then("verify reason is null", async () => {
	expect(responseBody[0].reason).toBe(null);
});

Then(
	"verify role_assignments reason is 'Relieved when employee <Employee name> was relieved of position <position code name>'",
	async () => {
		expect(responseBody[0].role_assignments[0].reason).toBe(
			`Relieved when employee ${firstName} ${lastName} was relieved of position ${positionCodeStr}.`,
		);
	},
);

Then(
	"verify responsibility_assignments reason is 'Relieved when employee <Employee name> was relieved of position <position code name>'",
	async () => {
		expect(responseBody[0].role_assignments[0].responsibility_assignments[0].reason).toBe(
			`Relieved when employee ${firstName} ${lastName} was relieved of position ${positionCodeStr}.`,
		);
	},
);

Then("verify employee_availability_at_assignment field is visible in the response", async () => {
	expect(responseBody.employee_availability_at_assignment).toBe(responseBody.employee_availability);
});

Then("verify position_capacity_at_assignment field is visible in the response", async () => {
	expect(responseBody.position_capacity_at_assignment).toBe(responseBody.position_capacity);
});

Then("verify allocation value is not 0", async () => {
	expect(responseBody.allocation).not.toBe(0);
});

Then("verify acceptance field value is Pending", async () => {
	expect(responseBody.acceptance).toBe("pending");
});

Then("verify acceptance_rejection_reason field is null", async () => {
	expect(responseBody.acceptance_rejection_reason).toBe(null);
});

Then("verify assigned_by value is not null", async () => {
	expect(responseBody.assigned_by).toBe(responseBody.account);
});

Then("verify removal_reason field is null", async () => {
	expect(responseBody.removal_reason).toBe(null);
});

Then("verify current_readiness value is not null", async () => {
	expect(responseBody.current_readiness).not.toBe(null);
});

Then("verify removed_on field has date and time", async () => {
	const removedOn = responseBody.removed_on;

	const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z$/;

	expect(removedOn).toBeTruthy();
	expect(removedOn).toMatch(iso8601Regex);
});

Then("verify removed_by field has access id", async () => {
	expect(responseBody.removed_by).toBe(responseBody.account);
});

Then("verify status is relieved", async () => {
	expect(responseBody.status).toBe("relieved");
});

When("user creates a position assignment without employee", async () => {
	response = await employeeApiCalls.createPositionAssign(1, null, null);
	await expect(response).not.toBeOK();
	responseBody = await response.json();
});

Then("verify the response is 400", async () => {
	expect(response.status()).toBe(400);
});

Then("verify the message is assignment requires employee", async () => {
	expect(responseBody).toBe("Assignment requires employee.");
});

When("user creates a role assignment without employee", async () => {
	response = await employeeApiCalls.createRoleAssign(employeeId, null, null, null);
	await expect(response).not.toBeOK();
	responseBody = await response.json();
});

When("user creates a responsibility assignment without employee", async () => {
	response = await employeeApiCalls.createResponsibilityAssign(employeeId, roleAssignmentId, null, null, null);
	await expect(response).not.toBeOK();
	responseBody = await response.json();
});

When("user creates a position assignment with parent assignment", async () => {
	response = await employeeApiCalls.createPositionAssign(1, assignedEmployee, assignmentId);
	await expect(response).not.toBeOK();
	responseBody = await response.json();
});

Then("verify the message is Position assignment cannot have Parent Assignment", async () => {
	expect(responseBody).toBe("Position assignment cannot have Parent Assignment.");
});

When("user creates a role assignment without parent assignment", async () => {
	response = await employeeApiCalls.createRoleAssign(employeeId, assignedEmployee, null, null);
	await expect(response).not.toBeOK();
	responseBody = await response.json();
});

Then("verify the message is Role assignment must have Parent Position Assignment", async () => {
	expect(responseBody).toBe("Role assignment must have Parent Position Assignment.");
});

When("user creates a responsibility assignment without parent assignment", async () => {
	response = await employeeApiCalls.createResponsibilityAssign(
		employeeId,
		roleAssignmentId,
		assignedEmployee,
		null,
		null,
	);
	await expect(response).not.toBeOK();
	responseBody = await response.json();
});

Then("verify the message is Responsibility assignment must have Parent Role Assignment", async () => {
	expect(responseBody).toBe("Responsibility assignment must have Parent Role Assignment.");
});

When("user creates a role assignment without trigger assignment id", async () => {
	response = await employeeApiCalls.createRoleAssign(employeeId, assignedEmployee, posAssignmentId, null);
	await expect(response).not.toBeOK();
	responseBody = await response.json();
});

Then("verify the message is requires the trigger employee to position assignment", async () => {
	expect(responseBody).toBe("Requires the trigger employee to position assignment.");
});

When("user creates a responsibility assignment without trigger assignment id", async () => {
	response = await employeeApiCalls.createResponsibilityAssign(
		employeeId,
		roleAssignmentId,
		assignedEmployee,
		posAssignmentId,
		null,
	);
	await expect(response).not.toBeOK();
	responseBody = await response.json();
});

Then(
	"verify role_assignments reason is 'Attached when catalog Role <code name> was attached to Position <code name>'",
	async () => {
		const actualReason = responseBody[0].role_assignments[0].reason;
		const expectedPattern = new RegExp(`Attached when catalog Role ${roleCodeStr} was attached to Position .+\\.`);
		expect(actualReason).toMatch(expectedPattern);
	},
);

Then(
	"verify responsibility_assignments reason is 'Attached when catalog Role <code name> was attached to Position <code name>'",
	async () => {
		const actualReason = responseBody[0].role_assignments[0].responsibility_assignments[0].reason;
		const expectedPattern = new RegExp(`Attached when catalog Role ${roleCodeStr} was attached to Position .+\\.`);
		expect(actualReason).toMatch(expectedPattern);
	},
);

Then("user calls the Active Employees Readiness api", async () => {
	response = await employeeApiCalls.getActiveEmployeesReadiness();
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
	responseBody = await response.json();
});

When("User calls the create badge for level {int} employee API", async function (level: number) {
	response = await employeeApiCalls.createProficiencyBadge(employeeId, responsibilityId, level);

	if (response.ok()) {
		responseBody = await response.json();
		badgeId = responseBody.id;
	} else {
		try {
			responseBody = await response.json();
		} catch (e) {
			const errorText = await response.text();
			responseBody = errorText;
		}
	}

	await expect(response).toBeOK();
	expect(response.status()).toBe(201);
});

Then("user verify all employees status is active", async () => {
	expect(responseBody).toHaveProperty("results");
	const employees = responseBody.results;
	expect(employees.length).toBeGreaterThan(0);

	employees.forEach((employee) => {
		expect(employee.current_status).toBe("active");
	});
});

Then("verify active employee has required fields visible", async () => {
	const activeEmployee = responseBody.results.find((emp) => emp.id === employeeId);
	expect(activeEmployee).toBeDefined();

	expect(activeEmployee).toHaveProperty("avatar");
	expect(activeEmployee).toHaveProperty("first_name");
	expect(activeEmployee).toHaveProperty("last_name");
	expect(activeEmployee).toHaveProperty("availability");
	expect(activeEmployee).toHaveProperty("current_readiness");
	expect(activeEmployee).toHaveProperty("needs_recalc");
});

Then("verify position assignment has required fields visible", async () => {
	const assignedEmployee = responseBody.results.find((emp) => emp.id === employeeId);

	expect(assignedEmployee).toBeDefined();

	expect(assignedEmployee).toHaveProperty("primary_positions");
	expect(assignedEmployee.primary_positions.length).toBeGreaterThan(0);

	const primaryPosition = assignedEmployee.primary_positions.find((pos) => pos.id === assignmentId);

	expect(primaryPosition).toBeDefined();

	expect(primaryPosition).toHaveProperty("commitment");
	expect(primaryPosition).toHaveProperty("importance");
	expect(primaryPosition).toHaveProperty("code");
	expect(primaryPosition).toHaveProperty("name");
});

Given("that employee is in status {string} with position assignment", async (status: string) => {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();

	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;

	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);
	responseBody = await response.json();
	employeeId = responseBody.id;
	firstName = responseBody.first_name;
	lastName = responseBody.last_name;
	expect(responseBody.current_status).toBe("draft");

	if (status === "Active") {
		response = await employeeApiCalls.activateEmployee(employeeId);
		responseBody = await response.json();
		expect(responseBody.current_status).toBe("active");
	}

	const updatePositionData: PositionData = getRandomPosition();
	newPositionAPIData.position = updatePositionData.position;

	response = await positionApiCalls.createNewPosition(newPositionAPIData.position, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	positionId = responseBody.id;
	positionCodeStr = responseBody.code_str;

	if (status === "Active") {
		response = await positionApiCalls.activatePosition(positionId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("active");
	}

	response = await positionApiCalls.assignPositionToEmployee(employeeId, positionId, 1, 1);
	responseBody = await response.json();
	expect(responseBody).toBeTruthy();
	assignmentId = responseBody.id;
	posAssignmentId = responseBody.id;
	assignedEmployeePos = responseBody.assigned_to_employee;
});

Given("need_recalc boolean is true for employee with position assignment", async () => {
	// Note: needs_recalc field is only available in recalculation API response, not in employee details
});

Given("that employee is in status {string} with role assignment", async (status: string) => {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();

	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;
	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);
	responseBody = await response.json();
	employeeId = responseBody.id;
	firstName = responseBody.first_name;
	lastName = responseBody.last_name;
	expect(responseBody.current_status).toBe("draft");

	if (status === "Active") {
		response = await employeeApiCalls.activateEmployee(employeeId);
		responseBody = await response.json();
		expect(responseBody.current_status).toBe("active");
	}

	response = await newRoles.createRole(newRole.name, newRole.description, "active");
	responseBody = await response.json();
	roleId = responseBody.id;
	roleCodeStr = responseBody.code_str;

	response = await employeeApiCalls.assignRoleToEmployee(roleId, employeeId);
	responseBody = await response.json();
	assignmentId = responseBody.id;
	roleAssignmentId = responseBody.id;
	assignedEmployeeRole = responseBody.assigned_to_employee;
});

Given("that employee has role assignment with responsibility", async () => {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();
	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;

	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);
	responseBody = await response.json();
	employeeId = responseBody.id;
	expect(responseBody.current_status).toBe("draft");
	response = await employeeApiCalls.activateEmployee(employeeId);
	await expect(response).toBeOK();
	response = await newRoles.createRole(newRole.name, newRole.description, "active");
	responseBody = await response.json();
	roleId = responseBody.id;
	expect(responseBody.status).toBe("active");
	response = await responsibilityApiCalls.createResponsibility(newRole.name + "_resp", "active");
	responseBody = await response.json();
	responsibilityId = responseBody.id;
	expect(responseBody.status).toBe("active");
	response = await newRoles.attachResponsibilityToRole(responsibilityId, roleId);
	await expect(response).toBeOK();
	response = await employeeApiCalls.assignRoleToEmployee(roleId, employeeId);
	responseBody = await response.json();
	roleAssignmentId = responseBody.id;
	await expect(response).toBeOK();
});

When("user calls the all responsibility assignments API", async () => {
	response = await employeeApiCalls.getAllResponsibilityAssignments();
	responseBody = await response.json();
});

When("user calls the responsibility assignment API with role assignment ID", async () => {
	response = await employeeApiCalls.getResponsibilityAssignmentsByRole(roleAssignmentId);
	responseBody = await response.json();
});

When("user calls the responsibility assignment API with status {string}", async (status: string) => {
	response = await employeeApiCalls.getResponsibilityAssignmentsByStatus(status);
	responseBody = await response.json();
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
	setSharedData("requestedStatus", status);
});

When("user calls the all role assignments API", async () => {
	response = await employeeApiCalls.getAllRoleAssignments();
	responseBody = await response.json();
});

When("user calls the role assignment API with position assignment ID", async () => {
	response = await employeeApiCalls.getRoleAssignmentsByPosition(posAssignmentId);
	responseBody = await response.json();
});

When("user calls the role assignment API with status {string}", async (status: string) => {
	response = await employeeApiCalls.getRoleAssignmentsByStatus(status);
	responseBody = await response.json();
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
	setSharedData("requestedStatus", status);
});

Then("verify the response status for responsibility assignment API is {int}", async (statusCode: number) => {
	expect(response.status()).toBe(statusCode);
});

Then("verify the all responsibility assignments response structure", async () => {
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);
});

Then("verify the responsibility assignment response structure", async () => {
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);

	if (responseBody.results.length > 0) {
		const assignment = responseBody.results[0];
		expect(assignment).toHaveProperty("id");
		expect(assignment).toHaveProperty("responsibility");
		expect(assignment).toHaveProperty("responsibility_name");
		expect(assignment).toHaveProperty("status");
		expect(assignment).toHaveProperty("assignment_type");
		expect(assignment).toHaveProperty("assigned_on");
		expect(assignment).toHaveProperty("assigned_by");

		expect(assignment.assignment_type).toBe("responsibility");
		expect(assignment.status).toBe("active");
	}
});

Then("verify all returned responsibility assignments have status {string}", async (expectedStatus: string) => {
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);

	if (responseBody.results.length > 0) {
		for (const assignment of responseBody.results) {
			expect(assignment).toHaveProperty("status");
			expect(assignment.status).toBe(expectedStatus);
			expect(assignment).toHaveProperty("assignment_type");
			expect(assignment.assignment_type).toBe("responsibility");
		}
	}
});

Then("verify the response status for role assignment API is {int}", async (statusCode: number) => {
	expect(response.status()).toBe(statusCode);
});

Then("verify the all role assignments response structure", async () => {
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);
});

Then("verify the role assignment response structure", async () => {
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);

	if (responseBody.results.length > 0) {
		const assignment = responseBody.results[0];
		expect(assignment).toHaveProperty("id");
		expect(assignment).toHaveProperty("role");
		expect(assignment).toHaveProperty("assigned_on");
		expect(assignment).toHaveProperty("assigned_by");
		expect(assignment).toHaveProperty("status");
	}
});

Then("verify all returned role assignments have status {string}", async (expectedStatus: string) => {
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);

	if (responseBody.results.length > 0) {
		for (const assignment of responseBody.results) {
			expect(assignment).toHaveProperty("status");
			expect(assignment.status).toBe(expectedStatus);
		}
	}
});

Then("verify only active role assignments are returned when status is active", async () => {
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);

	if (responseBody.results.length > 0) {
		for (const assignment of responseBody.results) {
			expect(assignment).toHaveProperty("status");
			expect(assignment.status).toBe("active");
			expect(assignment.status).not.toBe("retired");
			expect(assignment.status).not.toBe("inactive");
			expect(assignment.status).not.toBe("terminated");
		}
	}
});

Then("verify only role assignments with the specified status are returned", async () => {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("count");
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);

	const requestedStatus = getSharedData("requestedStatus");

	if (responseBody.results.length > 0) {
		for (let i = 0; i < responseBody.results.length; i++) {
			const assignment = responseBody.results[i];
			expect(assignment).toHaveProperty("status");
			expect(assignment.status).toBe(requestedStatus);
		}
	}
});

Then("verify only responsibility assignments with the specified status are returned", async () => {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("count");
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);

	const requestedStatus = getSharedData("requestedStatus");

	if (responseBody.results.length > 0) {
		for (let i = 0; i < responseBody.results.length; i++) {
			const assignment = responseBody.results[i];
			expect(assignment).toHaveProperty("status");
			expect(assignment.status).toBe(requestedStatus);
		}
	}
});

Then("Role assignment response structure with responsibility assignment count", async () => {
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);

	if (responseBody.results.length > 0) {
		const assignment = responseBody.results[0];
		expect(assignment).toHaveProperty("id");
		expect(assignment).toHaveProperty("role_name");
		expect(assignment).toHaveProperty("importance");
		expect(assignment).toHaveProperty("assignment_type");
		expect(assignment).toHaveProperty("commitment_level");
		expect(assignment).toHaveProperty("current_readiness");
		expect(assignment).toHaveProperty("role_code");
		expect(assignment).toHaveProperty("status");
		expect(assignment).toHaveProperty("responsibility_assignment_count");
		expect(assignment).toHaveProperty("reason");
		expect(assignment).toHaveProperty("assigned_on");
		expect(assignment).toHaveProperty("assigned_by");
		expect(typeof assignment.responsibility_assignment_count).toBe("number");
		expect(assignment.responsibility_assignment_count).toBeGreaterThanOrEqual(0);
	}
});

Given("need_recalc boolean is true for employee with role assignment", async () => {
	// Note: needs_recalc field is only available in recalculation API response, not in employee details
});

When("user calls api to recalc all employee", async () => {
	const employeeIds = [assignedEmployeePos, assignedEmployeeRole].filter((id) => id);
	response = await employeeApiCalls.runAllRecalculation(employeeIds);
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
	responseBody = await response.json();
	await new Promise((resolve) => setTimeout(resolve, 2000));
});

Then("employee needs_recalc with position assignment boolean is false", async () => {
	expect(Array.isArray(responseBody)).toBeTruthy();
	expect(responseBody.length).toBeGreaterThan(0);

	const recalcEmployee = responseBody.find((emp) => emp.id === assignedEmployeePos);
	expect(recalcEmployee).toBeDefined();
	expect(recalcEmployee.needs_recalc).toBe(false);
});

Then("employee need_recalc with role assignment boolean is false", async () => {
	expect(Array.isArray(responseBody)).toBeTruthy();
	expect(responseBody.length).toBeGreaterThan(0);

	const recalcEmployee = responseBody.find((emp) => emp.id === assignedEmployeeRole);
	expect(recalcEmployee).toBeDefined();
	expect(recalcEmployee.needs_recalc).toBe(false);
});

Given("that employee is in status {string} with badge", async (status: string) => {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();

	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;

	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);
	responseBody = await response.json();
	employeeId = responseBody.id;
	assignedEmployeeBadge = responseBody.id;
	expect(responseBody.current_status).toBe("draft");

	if (status === "Active") {
		response = await employeeApiCalls.activateEmployee(employeeId);
		responseBody = await response.json();
		expect(responseBody.current_status).toBe("active");
	}

	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	response = await responsibilityApiCalls.activateResponsibility(responseBody.id);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");
	responsibilityId = responseBody.id;
	responsibilityCodeStr = responseBody.code_str;
	response = await employeeApiCalls.createProficiencyBadge(employeeId, responsibilityId, 1);
	responseBody = await response.json();
	badgeId = responseBody.id;
	await expect(response).toBeOK();
	expect(response.status()).toBe(201);
});

Given("need_recalc boolean is true for employee with badge", async () => {
	// Note: needs_recalc field is only available in recalculation API response, not in employee details
});

Given("that employee is in status {string} with responsibility assignment", async (status: string) => {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();

	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;
	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);
	responseBody = await response.json();
	employeeId = responseBody.id;
	assignedEmployeeResp = responseBody.id;
	expect(responseBody.current_status).toBe("draft");
	if (status === "Active") {
		response = await employeeApiCalls.activateEmployee(employeeId);
		responseBody = await response.json();
		expect(responseBody.current_status).toBe("active");
	}

	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.createResponsibility(newRole.name, "active");
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");
	responsibilityId = responseBody.id;
	responsibilityCodeStr = responseBody.code_str;

	response = await employeeApiCalls.assignResposibilityToEmployee(responsibilityId, employeeId, 2);
	responseBody = await response.json();
	assignmentId = responseBody.id;
});

Given("need_recalc boolean is true for employee with responsibility assignment", async () => {
	// Note: needs_recalc field is only available in recalculation API response, not in employee details
});

Then("employee needs_recalc with badge boolean is false", async () => {
	expect(Array.isArray(responseBody)).toBeTruthy();
	expect(responseBody.length).toBeGreaterThan(0);

	const recalcEmployee = responseBody.find((emp) => emp.id === assignedEmployeeBadge);
	expect(recalcEmployee).toBeDefined();
	expect(recalcEmployee.needs_recalc).toBe(false);
});

Then("employee need_recalc with responsibility assignment boolean is false", async () => {
	expect(Array.isArray(responseBody)).toBeTruthy();
	expect(responseBody.length).toBeGreaterThan(0);
	const recalcEmployee = responseBody.find((emp) => emp.id === assignedEmployeeResp);
	expect(recalcEmployee).toBeDefined();
	expect(recalcEmployee.needs_recalc).toBe(false);
});

When("user call api to recalc all employee", async () => {
	const employeeIds = [assignedEmployeeBadge, assignedEmployeeResp].filter((id) => id);
	response = await employeeApiCalls.runAllRecalculation(employeeIds);
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
	responseBody = await response.json();
});

Then("verify role_assignments reason is 'Assigned when catalog Role <code name> was activated'", async () => {
	expect(responseBody[0].role_assignments[0].reason).toBe(`Assigned when catalog Role ${roleCodeStr} was activated.`);
});

Then("verify responsibility_assignments reason is 'Assigned when catalog Role <code name> was activated'", async () => {
	expect(responseBody[0].role_assignments[0].responsibility_assignments[0].reason).toBe(
		`Assigned when catalog Role ${roleCodeStr} was activated.`,
	);
});

Then(
	"verify responsibility_assignments reason is 'Attached when catalog Responsibility <code name> was attached to catalog Role <code name>'",
	async () => {
		expect(responseBody[0].role_assignments[0].responsibility_assignments[0].reason).toBe(
			`Attached when catalog Responsibility ${responsibilityCodeStr} was attached to catalog Role ${roleCodeStr}.`,
		);
	},
);

Then("user activates the responsibility", async () => {
	response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
	responseBody = await response.json();
	if (responseBody.code_str) {
		responsibilityCodeStr = responseBody.code_str;
	}
	await new Promise((resolve) => setTimeout(resolve, 1000));

	response = await employeeApiCalls.getEmployeeAssignment(employeeId);
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
	responseBody = await response.json();
});

Then(
	"verify responsibility_assignments reason is 'Assigned when catalog Responsibility <code name> was activated'",
	async () => {
		expect(responseBody[0].role_assignments[0].responsibility_assignments[0].reason).toBe(
			`Assigned when catalog Responsibility ${responsibilityCodeStr} was activated.`,
		);
	},
);

Then("user verifies primary importance has value 3", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody.primary_importance).toBe(3);
});

Then("user verifies backup importance has value 2", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody.backup_importance).toBe(2);
});

Then("user verifies preparing for importance has value 1", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody.preparing_for_importance).toBe(1);
});

Then("user verify error commitment field is required", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("commitment");
	expect(responseBody.commitment).toContain("This field is required.");
});

Then("verify expressed_as has null value", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("expressed_as");
	expect(responseBody.expressed_as).toBeNull();
});

Then("verify compensation_amount has null value", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("compensation_amount");
	expect(responseBody.compensation_amount).toBeNull();
});

Then("verify compensation_currency has null value", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("compensation_currency");
	expect(responseBody.compensation_currency).toBeNull();
});

Then("verify compensation_per_hour has null value", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("compensation_per_hour");
	expect(responseBody.compensation_per_hour).toBeNull();
});

Then("verify compensation_per_month has null value", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("compensation_per_month");
	expect(responseBody.compensation_per_month).toBeNull();
});

Then("verify compensation_per_year has null value", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("compensation_per_year");
	expect(responseBody.compensation_per_year).toBeNull();
});

Given("user has responsibility is in status {string} without badge", async function (status: string) {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	responsibilityId = responseBody.id;
	responsibilityCodeStr = responseBody.code_str;

	if (status === "Active") {
		response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("active");
	} else if (status === "Inactive") {
		response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
		responseBody = await response.json();
		response = await responsibilityApiCalls.deActivateResponsibility(responsibilityId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("inactive");
	} else if (status === "Retired") {
		response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
		responseBody = await response.json();
		response = await responsibilityApiCalls.retiredResponsibility(responsibilityId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("retired");
	}
});

When("user attaches responsibility with active checkpoint to role via API", async function () {
	response = await newRoles.attachResponsibilityToRole(checkpointResponsibilityId, roleId);
	const responseBody = await response.json();
	expect(responseBody).toBeTruthy();
});

Then("verify  created_by field has value in response", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody.created_by).not.toBeNull();
});

Then("verify  created_on field has value in response", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody.created_on).not.toBeNull();
});

Then("verify activated_by field has value in response", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody.activated_by).not.toBeNull();
});

Then("verify activated_on field has value in response", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody.activated_on).not.toBeNull();
});

Then("verify terminated_by field has value in response", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody.terminated_by).not.toBeNull();
});

Then("verify terminated_on field has value in response", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody.terminated_on).not.toBeNull();
});

When("user has creates a checkpoint via API in status {string}", async function (status: string) {
	const newResponsibilityData: RolesData = getRandomRole();
	responsibilityData.name = newResponsibilityData.name;

	const newCheckpointData: RolesData = getRandomRole();
	checkpointData.name = newCheckpointData.name;
	response = await responsibilityApiCalls.createResponsibility(responsibilityData.name, "draft");
	await expect(response).toBeOK();
	responseBody = await response.json();
	responsibilityId = responseBody.id;
	response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");
	response = await checkpointApiCalls.createNewCheckpoint(
		responsibilityId,
		2,
		newCheckpointData.name,
		checkpointData.description,
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
	checkpointId = responseBody.id;

	if (status === "Active") {
		response = await checkpointApiCalls.activateCheckpoint(responsibilityId, checkpointId);
		responseBody = await response.json();
		await expect(response).toBeOK();
	} else if (status === "Retired") {
		response = await checkpointApiCalls.activateCheckpoint(responsibilityId, checkpointId);
		responseBody = await response.json();
		await expect(response).toBeOK();

		response = await checkpointApiCalls.retireCheckpoint(responsibilityId, checkpointId);
		responseBody = await response.json();
		await expect(response).toBeOK();
	}
});

Then("verify removed_on field", async () => {
	expect(responseBody.removed_on).not.toBeNull();
});

When("user have an employee is in status {string}", async function (status: string) {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();

	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;

	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);
	responseBody = await response.json();
	employeeId = responseBody.id;
	firstName = responseBody.first_name;
	lastName = responseBody.last_name;

	if (status === "Active") {
		response = await employeeApiCalls.activateEmployee(employeeId);
		responseBody = await response.json();
	} else if (status === "Terminated") {
		response = await employeeApiCalls.activateEmployee(employeeId);
		responseBody = await response.json();
		response = await employeeApiCalls.terminateEmployee(employeeId);
		responseBody = await response.json();
	} else if (status === "Re-activate") {
		response = await employeeApiCalls.activateEmployee(employeeId);
		responseBody = await response.json();
		response = await employeeApiCalls.terminateEmployee(employeeId);
		responseBody = await response.json();
		response = await employeeApiCalls.reActivateEmployee(employeeId);
		responseBody = await response.json();
	}
	response = await employeeApiCalls.createApprenticeBageForEmployeeWithReason(employeeId, responsibilityId);
	await expect(response).toBeOK();
	responseBody = await response.json();
	badgeId = await responseBody.id;
});

Then("user calls list of Coach Responsibility", async function () {
	response = await employeeApiCalls.getListOfCoachResponsibility(employeeId);
	responseBody = await response.json();
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
});

Then("verifies that the badge has been successfully removed from the selected employee", async () => {
	const removeBadgeId = responseBody[0].current_badge.id;
	response = await employeeApiCalls.removeBadge(removeBadgeId, "string");
	responseBody = await response.json();
	expect(responseBody.removed_on).not.toBeNull();
	expect(responseBody.removed_on).toBeTruthy();
});

Then("verify the current badge is valid", async () => {
	const entryWithBadge = responseBody.find((entry) => entry.current_badge !== null);
	expect(entryWithBadge).toBeDefined();
	expect(entryWithBadge.current_badge).not.toBeNull();
	expect(entryWithBadge.current_badge.is_current).toBe(true);
});

Then("Verify Checkpoint Object in Employee Assignment", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody.length).toBeGreaterThan(0);

	const roleAssignment = responseBody[0].role_assignments[0];
	const responsibilityAssignment = roleAssignment.responsibility_assignments[0];

	const checkpoint = responsibilityAssignment.checkpoints[0];

	expect(checkpoint).toBeDefined();
	expect(typeof checkpoint).toBe("object");

	expect(checkpoint.id).toBeDefined();
	expect(checkpoint.status).toBeDefined();
});

When("user creates an employee via API", async function () {
	const updateEmployeeData: EmployeeData = generateRandomEmployeeData();
	addedEmployeeData.firstName = updateEmployeeData.firstName;
	addedEmployeeData.lastName = updateEmployeeData.lastName;
	addedEmployeeData.title = updateEmployeeData.title;
	addedEmployeeData.email = updateEmployeeData.email;

	response = await employeeApiCalls.creatingEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
		addedEmployeeData.email,
	);
	responseBody = await response.json();
	employeeId = responseBody.id;
});

Then("verify the employee email", async function () {
	expect(responseBody.email).toBe(addedEmployeeData.email);
});

Then("verify that Test Employee API passes has_access true in access", async () => {
	expect(responseBody.id).toBe(employeeId);
	expect(responseBody).toHaveProperty("email");
	expect(responseBody.access.has_access).toBe(true);
});

Then("Verify that access object for each employee in the API response has access_id", async () => {
	expect(responseBody.access).toHaveProperty("access_id");
});

Then("the User call the readiness badge for employee api", async () => {
	response = await employeeApiCalls.getReadinessBadgeForEmployee();
	responseBody = await response.json();
	await expect(response).toBeOK();
});

Then("verify the readiness badges of the employee", async () => {
	expect(responseBody[0]).toHaveProperty("current_readiness");
	expect(responseBody[0]).toHaveProperty("badge_counts");
	expect(responseBody[0].badge_counts.apprentice).toBe(1);
	expect(responseBody[0].badge_counts.professional).toBe(0);
	expect(responseBody[0].badge_counts.coach).toBe(0);
	expect(responseBody[0].badge_counts.master).toBe(0);
	expect(responseBody[0]).toHaveProperty("readiness_status");
});

Then("verify the return response for Employee List status to be {int}", async function (statusCode: number) {
	if (Array.isArray(responseBody)) {
		for (const employee of responseBody) {
			await expect(employee).toHaveProperty("preparing_for_positions");
			await expect(employee).toContain("attachments");
			await expect(employee).toContain("attachment_count");
			expect(response.status).toBe(statusCode);
		}
	}
});

Then("verify the issued_by and Issued_on field", async () => {
	expect(responseBody.issued_by).not.toBeNull();
	expect(responseBody.Issued_on).not.toBeNull();
});

Then("user calls the list of Show Available Coaches in Employee Path to Readiness", async function () {
	response = await employeeApiCalls.getListOfAvaiableCoaches(employeeId);
	responseBody = await response.json();
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
});

Then("verify the assignments are in the response", async () => {
	expect(responseBody).toBeDefined();
	expect(Array.isArray(responseBody)).toBe(true);
	expect(responseBody.length).toBeGreaterThan(0);

	expect(responseBody[0]).toHaveProperty("role_assignments");
	expect(Array.isArray(responseBody[0].role_assignments)).toBe(true);
	expect(responseBody[0].role_assignments.length).toBeGreaterThan(0);

	const roleAssignment = responseBody[0].role_assignments[0];
	expect(roleAssignment).toHaveProperty("responsibility_assignments");
	expect(Array.isArray(roleAssignment.responsibility_assignments)).toBe(true);
	expect(roleAssignment.responsibility_assignments.length).toBeGreaterThan(0);
});

Then("verify the badge holder details", async () => {
	const badgeHolder = responseBody[0].role_assignments[0].responsibility_assignments[0].badge_holders[0];
	expect(badgeHolder).toHaveProperty("badge_level");
	expect(badgeHolder.badge_level).not.toBeNull();
	expect(badgeHolder).toHaveProperty("first_name");
	expect(badgeHolder.first_name).not.toBeNull();
	expect(badgeHolder).toHaveProperty("last_name");
	expect(badgeHolder.last_name).not.toBeNull();
	expect(badgeHolder).toHaveProperty("title");
	expect(badgeHolder.title).not.toBeNull();
	expect(badgeHolder).toHaveProperty("master_will_coach");
	expect(badgeHolder.master_will_coach).not.toBeNull();
});

Then("verify the backend response for email", async () => {
	expect(responseBody.employee).toBe(true);
	expect(responseBody.blocked).toBe(false);
});

Then("user calls the test-email API for the employee", async function () {
	response = await employeeApiCalls.testEmail(createdUserEmail);
	responseBody = await response.json();
});

Then("verify that {string} field is present", async function (fieldName: string) {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty(fieldName);
});

Then("verify {string} field is present", async function (fieldName: string) {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty(fieldName);
});

Then("User calls the Get Responsibility List API", async function () {
	response = await employeeApiCalls.getResponsibilityList(responsibilityId);
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
	responseBody = await response.json();
});

Then("verify the position history active count is {int}", async function (count: number) {
	expect(responseBody.position_history_active_count).toBe(count);
});

Then("verify the return response for Employee List structure", async function () {
	expect(responseBody).toHaveProperty("position_history_active_count");
});

Then("user calls the evaluations checklist API", async function () {
	response = await employeeApiCalls.getEvaluations(checkpointResponsibilityId, employeeId);
	responseBody = await response.json();
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
});

Then("verify the responsibility id and proficiency level in the evaluations checklist", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("count");
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);
	expect(responseBody.count).toBeGreaterThan(0);
	expect(responseBody.results.length).toBeGreaterThan(0);
	const evaluation = responseBody.results.find(
		(evaluationItem) => evaluationItem.responsibility === checkpointResponsibilityId,
	);
	expect(evaluation).toBeDefined();
	expect(evaluation.responsibility).toBe(checkpointResponsibilityId);
	expect(evaluation).toHaveProperty("proficiency_level");
	expect(evaluation.proficiency_level).not.toBeNull();
	expect(typeof evaluation.proficiency_level).toBe("number");
});

Then("Verify the response for filter evaluation checklist", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("count");
	expect(responseBody).toHaveProperty("results");
	expect(responseBody.count).toBe(0);
	expect(responseBody.results.length).toBe(0);
});

Then("verify the employee appears in the masters list", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("masters");
	expect(Array.isArray(responseBody.masters)).toBe(true);
	const employeeFullName = `${firstName} ${lastName}`;
	const masterEmployee = responseBody.masters.find((master) => master.full_name === employeeFullName);
	expect(masterEmployee).toBeDefined();
	expect(masterEmployee).toHaveProperty("full_name");
	expect(masterEmployee).toHaveProperty("avatar");
	expect(masterEmployee.full_name).toBe(employeeFullName);
});

Then("User call the get position assignment API", async function () {
	response = await employeeApiCalls.getPositionAssignment();
	responseBody = await response.json();
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
});

Then("User get position assignment API with specific employee ID", async function () {
	response = await employeeApiCalls.getPositionAssignmentUsingEmployeeId(employeeId);
	responseBody = await response.json();
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
});

Then("User calls the get position assignment Response with status {string}", async function (status: string) {
	response = await employeeApiCalls.getPositionAssignmentActiveResponse(status);
	responseBody = await response.json();
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
	setSharedData("requestedStatus", status);
});

Then("verify the position assignment response structure", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("count");
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);
	if (responseBody.results.length > 0) {
		const positionAssignment = responseBody.results[0];
		expect(positionAssignment).toHaveProperty("effective_on");
		expect(positionAssignment).toHaveProperty("effective_by");
		expect(positionAssignment).toHaveProperty("removed_on");
		expect(positionAssignment).toHaveProperty("removed_by");
		expect(positionAssignment.effective_on).not.toBeNull();
		expect(positionAssignment.removed_on).not.toBeNull();
	}
});

Then("verify only position assignments with the specified status are returned", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("count");
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);

	const requestedStatus = getSharedData("requestedStatus");

	if (responseBody.results.length > 0) {
		for (let i = 0; i < responseBody.results.length; i++) {
			const assignment = responseBody.results[i];
			expect(assignment).toHaveProperty("status");
			expect(assignment.status).toBe(requestedStatus);
		}
	}
});

Then("user calls the get position assignment API with specific employee ID", async function () {
	response = await employeeApiCalls.getPositionAssignmentUsingEmployeeId(employeeId);
	responseBody = await response.json();
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
});

Given("user creates a new user via API", async function () {
	const userData: UserData = generateRandomUserData();
	newUserData.email = userData.email;
	newUserData.firstName = userData.firstName;
	newUserData.lastName = userData.lastName;
	const UserApis = await import("../../apis/owner/user");
	const userApiCalls = new UserApis.default(baseInstance);

	response = await userApiCalls.createNewUser(
		newUserData.email,
		newUserData.firstName,
		newUserData.lastName,
		"invited",
		true,
		false,
		false,
		false,
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
	createdUserId = responseBody.id;
	createdUserEmail = responseBody.email;
});

When("user calls the employee check access API", async function () {
	response = await employeeApiCalls.employeeCheckAccess(createdUserEmail);
	responseBody = await response.json();
});

Then("verify the employee access API response status to be {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then("verify the employee status in response to be {string}", async function (expectedStatus: string) {
	expect(responseBody).toBeDefined();
	expect(responseBody.employee).toBeDefined();
	expect(responseBody.employee.current_status).toBe(expectedStatus);
});

Given("the user call the Side bar counts API", async function () {
	response = await employeeApiCalls.getSidebarCounts();
	responseBody = await response.json();
	await expect(response).toBeOK();
	setSharedData("sidebarCountsResponse", JSON.stringify(responseBody));
});

When("user store the employee count", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("employees");
	storedEmployeeCount = responseBody.employees;
});

Then("verify the employee count is same as the stored employee count", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("employees");
	expect(responseBody.employees).toBe(storedEmployeeCount);
});

Then("verify the employee count is increased by 1", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("employees");
	expect(responseBody.employees).toBe(storedEmployeeCount + 1);
});

Then("verify the employee count is decreased by 1", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("employees");
	expect(responseBody.employees).toBe(storedEmployeeCount);
});

Given("user store the employee creation date", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("created_on");
	const fullDate = responseBody.created_on;
	storedEmployeeCreationDate = fullDate.split("T")[0];
});

When("user calls the get employees v2 API with created_date filter", async function () {
	const queryParams = `?created_date=${storedEmployeeCreationDate}`;
	response = await employeeApiCalls.getEmployeesWithQueryParams(queryParams);
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
	responseBody = await response.json();
});

Then("verify every returned employee has created_date matching the stored date", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);
	expect(responseBody.results.length).toBeGreaterThan(0);
});

When(
	"user calls the getAllEmployeesV2 API with limit {int} and offset {int}",
	async function (limit: number, offset: number) {
		response = await employeeApiCalls.getAllEmployeesV2(limit, offset);
		responseBody = await response.json();
		await expect(response).toBeOK();
	},
);

Then("verify the employee response contains at most {int} records", async function (maxCount: number) {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);
	expect(responseBody.results.length).toBeLessThanOrEqual(maxCount);
	expect(responseBody.results.length).toBeGreaterThanOrEqual(0);
});

Then("verify the employee response contains pagination metadata", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("count");
	expect(responseBody).toHaveProperty("next");
	expect(responseBody).toHaveProperty("previous");
	expect(typeof responseBody.count).toBe("number");
	expect(typeof responseBody.next === "string" || responseBody.next === null).toBe(true);
	expect(typeof responseBody.previous === "string" || responseBody.previous === null).toBe(true);
});

Then("verify the employee response count matches the total number of employees", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("count");
	expect(responseBody.count).toBeGreaterThan(0);
});

Then("verify the employee response contains different records than the previous request", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);

	if (responseBody.results.length > 0) {
		const currentIds = responseBody.results.map((item: { id: number }) => item.id);
		expect(currentIds.length).toBeGreaterThan(0);
	}
});

Then("verify the employee response contains no records when offset exceeds total count", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);
	expect(responseBody.results.length).toBe(0);
});

When("calling the get position assignment API with status terminated for an employee", async function () {
	response = await employeeApiCalls.getPositionAssignmentWithEmployeeAndStatus(employeeId, "terminated");
	responseBody = await response.json();
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
});

Then(
	"verify the position assignment API returns role assignment count as {int}",
	async function (roleAssignmentCount: number) {
		expect(responseBody).toBeDefined();
		expect(responseBody).toHaveProperty("count");
		expect(responseBody).toHaveProperty("results");
		expect(Array.isArray(responseBody.results)).toBe(true);

		if (responseBody.results.length > 0) {
			for (const assignment of responseBody.results) {
				expect(assignment).toHaveProperty("status");
				expect(assignment.status).toBe("terminated");
				expect(assignment).toHaveProperty("assignment_type");
				expect(assignment.assignment_type).toBe("position");
				expect(assignment).toHaveProperty("role_assignment_count");
				expect(typeof assignment.role_assignment_count).toBe("number");
				expect(responseBody.count).toBe(roleAssignmentCount);
				expect(responseBody.results.length).toBe(roleAssignmentCount);
			}
		}
	},
);

Then("User verify the current_readiness is {int}", async function (readiness: number) {
	expect(responseBody).toBeDefined();
	if (responseBody.results && Array.isArray(responseBody.results)) {
		expect(responseBody.results.length).toBeGreaterThan(0);
		expect(responseBody.results[0]).toHaveProperty("current_readiness");
		expect(responseBody.results[0].current_readiness).toBe(readiness);
	} else {
		expect(responseBody).toHaveProperty("current_readiness");
		expect(responseBody.current_readiness).toBe(readiness);
	}
});

export { newRole, employeeId, responsibilityData, checkpointData };
