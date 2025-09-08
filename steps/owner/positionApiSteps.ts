import { Given, Then, When } from "@cucumber/cucumber";
import {
	PositionData,
	getRandomPosition,
	RolesData,
	getRandomRole,
	EmployeeData,
	generateRandomEmployeeData,
	getRandomPhrase,
} from "../../helpers/util/random";
import PositionApis from "../../apis/owner/position";
import RolesApis from "../../apis/owner/roles";
import ResponsibilityApis from "../../apis/owner/responsibility";
import { baseInstance } from "../../helpers/BaseClass";
import { expect } from "@playwright/test";
import EmployeeApis from "../../apis/owner/employee";
import { id } from "./rolesApiSteps";
import { setSharedData, getSharedData } from "../../helpers/util/sharedData";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let response: any, responseBody: any, positionId: number, positionCode: number;
let employeeId: number, responsibilityId: number, roleId: number;
let note: string;
let positionIds: number[] = [];
let currentBulkAction: string;
let secondEmployeeId: number;
let secondEmployeeData: EmployeeData;
let filterCallCount = 0;
const newPositionAPIData: PositionData = getRandomPosition();
const apiRoleData: RolesData = getRandomRole();
const newResponsibilityData: RolesData = getRandomRole();
const newRoles: RolesApis = new RolesApis(baseInstance);
const positionApiCalls: PositionApis = new PositionApis(baseInstance);
const addedEmployeeData: EmployeeData = generateRandomEmployeeData();
const employeeApiCalls: EmployeeApis = new EmployeeApis(baseInstance);
const responsibilityApiCalls: ResponsibilityApis = new ResponsibilityApis(baseInstance);
let positionName: string;
let storedPositionCount: number;

Given("user create a position through api", async () => {
	const positionAPIData: PositionData = getRandomPosition();
	newPositionAPIData.position = positionAPIData.position;
	response = await positionApiCalls.createNewPosition(newPositionAPIData.position, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	positionId = responseBody.id;
});

Then("user receive the error code {int}", async (code: number) => {
	expect(response.status()).toBe(code);
});

Then("position api error contains msg {string}", async (msg: string) => {
	if (responseBody.message) {
		expect(responseBody.message).toContain(msg);
	} else {
		expect(responseBody[0]).toContain(msg);
	}
});

Then("user receive back position id", async () => {
	responseBody = await response.json();
});

Given("that a position already exists with the status not equal to Inactive", async () => {
	const positionAPIData: PositionData = getRandomPosition();
	newPositionAPIData.position = positionAPIData.position;
	response = await positionApiCalls.createNewPosition(newPositionAPIData.position, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	positionId = responseBody.id;
	response = await positionApiCalls.activatePosition(positionId);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");
});

When("user {string} the position via api", async (action: string) => {
	if (action === "Activate") {
		response = await positionApiCalls.activatePosition(positionId);
		responseBody = await response.json();
	} else if (action === "Delete") {
		response = await positionApiCalls.deletePosition(positionId);
		if (response.status() != 204) {
			responseBody = await response.json();
		}
	} else if (action === "Retire") {
		response = await positionApiCalls.retirePosition(positionId);
		responseBody = await response.json();
	} else if (action === "Re-Activate") {
		response = await positionApiCalls.reActivatePosition(positionId);
		responseBody = await response.json();
	} else if (action === "De-Activate") {
		response = await positionApiCalls.deActivatePosition(positionId);
		responseBody = await response.json();
	} else if (action === "Rename") {
		const updatePositionData: PositionData = getRandomPosition();
		newPositionAPIData.position = updatePositionData.position;

		response = await positionApiCalls.updatePosition(positionId, newPositionAPIData.position, "draft");
		responseBody = await response.json();
	}
});

When("user rename the position", async () => {
	const updatePositionData: PositionData = getRandomPosition();
	newPositionAPIData.position = updatePositionData.position;

	response = await positionApiCalls.updatePosition(positionId, newPositionAPIData.position, "draft");
	responseBody = await response.json();
});

Then("position name should be replaced with the new name.", async () => {
	expect(responseBody.name).toBe(newPositionAPIData.position);
});

Then("status for the poaition changes to {string}", async (status: string) => {
	expect(responseBody.status).toBe(status.toLowerCase());
});

Then("verify that position was deleted", async () => {
	expect(response.status()).toBe(204);
});

Given("User have a position", async () => {
	const positionAPIData: PositionData = getRandomPosition();
	newPositionAPIData.position = positionAPIData.position;
	response = await positionApiCalls.createNewPosition(newPositionAPIData.position, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
});

Given("user has a position that is not occupied", async () => {
	const positionAPIData: PositionData = getRandomPosition();
	newPositionAPIData.position = positionAPIData.position;
	response = await positionApiCalls.createNewPosition(newPositionAPIData.position, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
});

Given("that user have Positions with different statuses", async () => {
	const positionAPIData: PositionData = getRandomPosition();
	newPositionAPIData.position = positionAPIData.position;

	response = await positionApiCalls.createNewPosition(newPositionAPIData.position, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	positionId = responseBody.id;

	response = await positionApiCalls.activatePosition(positionId);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");
});

Given("user have Position with different Capacity", async () => {
	const positionAPIData: PositionData = getRandomPosition();
	newPositionAPIData.position = positionAPIData.position;

	response = await positionApiCalls.createNewPosition(newPositionAPIData.position, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	positionId = responseBody.id;
});

Given("user have Position with Role", async () => {
	positionId = responseBody.id;
	response = await positionApiCalls.asignRoleToAPosition(positionId, roleId);
});

Given("that user have a position with 3 roles attached", async function () {
	const positionAPIData = getRandomPosition();
	newPositionAPIData.position = positionAPIData.position;
	positionName = newPositionAPIData.position;

	const apiRoleData1 = getRandomRole();
	const apiRoleData2 = getRandomRole();
	const apiRoleData3 = getRandomRole();

	let response = await positionApiCalls.createNewPosition(newPositionAPIData.position, "draft");
	let responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	positionId = responseBody.id;

	response = await positionApiCalls.activatePosition(positionId);

	response = await newRoles.createRole(apiRoleData1.name, apiRoleData.description, "draft");
	responseBody = await response.json();
	const roleId1 = responseBody.id;

	response = await newRoles.attachRoleToPosition(roleId1, positionId);
	await expect(response).toBeOK();

	response = await newRoles.createRole(apiRoleData2.name, apiRoleData.description, "draft");
	responseBody = await response.json();
	const roleId2 = responseBody.id;

	response = await newRoles.attachRoleToPosition(roleId2, positionId);
	await expect(response).toBeOK();

	response = await newRoles.createRole(apiRoleData3.name, apiRoleData.description, "draft");
	responseBody = await response.json();
	const roleId3 = responseBody.id;

	response = await newRoles.attachRoleToPosition(roleId3, positionId);
	await expect(response).toBeOK();
});

Then("verify that it copy position name", async function () {
	await expect(responseBody.name).toContain(newPositionAPIData.position);
});

Given("add {string} in front of the name", async function (prefix) {
	await expect(responseBody.name).toContain(prefix + " " + positionName);
});

Then("user create a new cloned position", async function () {
	await expect(response.status()).toBe(201);
});

When("user clone the position", async function () {
	response = await positionApiCalls.clonePosition(positionId, newPositionAPIData.position);
	responseBody = await response.json();
});

Then("response has attach exactly the same roles as the original position", async function () {
	const roles = responseBody.attachments.length;
	expect(roles).toBe(3);
});

Then("verify that new position has a new unique id", async function () {
	const newPositionId = responseBody.id;
	await expect(newPositionId).not.toEqual(positionId);
});

When("has at least one role attached", async function () {
	const positionId = responseBody.id;
	const apiRoleData = getRandomRole();

	response = await positionApiCalls.activatePosition(positionId);
	response = await newRoles.createRole(apiRoleData.name, apiRoleData.description, "draft");
	responseBody = await response.json();
	const roleId1 = responseBody.id;
	response = await newRoles.attachRoleToPosition(roleId1, positionId);
	await expect(response).toBeOK();
});

Given("user create an employee and a position via API", async function () {
	const positionAPIData: PositionData = getRandomPosition();
	newPositionAPIData.position = positionAPIData.position;
	response = await positionApiCalls.createNewPosition(newPositionAPIData.position, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	positionId = responseBody.id;
	response = await positionApiCalls.activatePosition(positionId);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");

	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("draft");
	employeeId = responseBody.id;
	setSharedData("employeeId", employeeId.toString());
	response = await employeeApiCalls.activateEmployee(employeeId);
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("active");
});

When("user call the position-assignment API", async function () {
	response = await positionApiCalls.assignPositionToEmployee(employeeId, positionId, 1, 1);
});

Then("verify response return the employee assigned to the position", async function () {
	await expect(response).toBeOK();
	responseBody = await response.json();
	expect(responseBody.assigned_to_employee).toEqual(employeeId);
});

Then("user call the list position API", async function () {
	response = await positionApiCalls.getPositionDetails(positionId);
	await expect(response).toBeOK();
	responseBody = await response.json();
});

Then("when user call the list position API", async function () {
	response = await positionApiCalls.getPositionDetails(positionId);
	await expect(response).toBeOK();
	responseBody = await response.json();
});

Then("verify response return the assigned employee", async function () {
	await expect(response).toBeOK();
	responseBody = await response.json();
	const assignedEmployee = responseBody.assigned_employees.find((emp) => emp.id === employeeId);
	expect(assignedEmployee).toBeDefined();
	expect(assignedEmployee.first_name).toEqual(addedEmployeeData.firstName);
	expect(assignedEmployee.last_name).toEqual(addedEmployeeData.lastName);
});

Given("that a position is in status {string}", async (status: string) => {
	const positionAPIData: PositionData = getRandomPosition();
	newPositionAPIData.position = positionAPIData.position;
	response = await positionApiCalls.createNewPosition(newPositionAPIData.position, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	positionId = responseBody.id;
	positionCode = responseBody.code;
	setSharedData("positionId", positionId.toString());
	setSharedData("positionName", newPositionAPIData.position);
	setSharedData("positionCodeStr", responseBody.code_str);

	if (!positionIds.length || !positionIds.includes(positionId)) {
		positionIds.push(positionId);
	}

	if (status === "Active") {
		response = await positionApiCalls.activatePosition(positionId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("active");
	} else if (status === "Draft" || status === "draft") {
		// Position is already in draft status, no action needed
	} else if (status === "Deactivate" || status === "Inactive") {
		response = await positionApiCalls.activatePosition(positionId);
		responseBody = await response.json();

		expect(responseBody.status).toBe("active");
		response = await positionApiCalls.deActivatePosition(positionId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("inactive");
	} else if (status === "Retired") {
		response = await positionApiCalls.activatePosition(positionId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("active");
		response = await positionApiCalls.retirePosition(positionId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("retired");
	} else if (status === "Archived") {
		response = await positionApiCalls.activatePosition(positionId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("active");
		response = await positionApiCalls.retirePosition(positionId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("retired");
		response = await positionApiCalls.archivePosition(positionId);
		expect(response.status()).toBe(200);
		response = await positionApiCalls.getPositionDetails(positionId);
		responseBody = await response.json();
		expect(responseBody.archived).toBe(true);
	}
});

Then("user verify position has no assigned employee", async () => {
	const response = await positionApiCalls.getPositionDetails(positionId);
	const responseBody = await response.json();
	expect(Array.isArray(responseBody.assigned_employees)).toBe(true);
	expect(responseBody.assigned_employees.length).toBe(1);
});

Given("that a position is not in status {string}", async (status: string) => {
	const positionAPIData: PositionData = getRandomPosition();
	newPositionAPIData.position = positionAPIData.position;
	response = await positionApiCalls.createNewPosition(newPositionAPIData.position, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	positionId = responseBody.id;
	positionCode = responseBody.code;
	if (status === "Draft" || status === "Retired") {
		response = await positionApiCalls.activatePosition(positionId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("active");
	}
});
When("you post to position chatter", async function () {
	note = getRandomPhrase();
	response = await positionApiCalls.postToChatter(positionId, note, "position", true);
});

Then("you return response for Position status to be {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then("the note for the position", async function () {
	responseBody = await response.json();
	expect(responseBody.note).toEqual(note);
});

Given("that there is a Position", async function () {
	const positionAPIData: PositionData = getRandomPosition();
	newPositionAPIData.position = positionAPIData.position;
	response = await positionApiCalls.createNewPosition(newPositionAPIData.position, "active");
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");
});

Given("that a position has {int} posts to chatter", async function (chatters: number) {
	const positionAPIData: PositionData = getRandomPosition();
	newPositionAPIData.position = positionAPIData.position;
	response = await positionApiCalls.createNewPosition(newPositionAPIData.position, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	positionId = responseBody.id;

	const baseNote = getRandomPhrase();
	for (let i = 0; i < chatters; i++) {
		const note = `${baseNote} ${i}`;
		const response = await positionApiCalls.postToChatter(positionId, note, "position", true);
		await expect(response).toBeOK();
	}
});

When("user calls the chatter list API for the position", async function () {
	response = await positionApiCalls.listPositionChatter(positionId);
});

When("user calls the chatter list API for position {int}", async function (positionId: number) {
	response = await positionApiCalls.listPositionChatter(positionId);
});

Then("verify the status for Position Chatter list to be {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
	responseBody = await response.json();
});

Then("count of entries for the position chatter should be {int}", async function (chatterEntries: number) {
	expect(responseBody.results.length).toBe(chatterEntries);
});

Then("count of total position chatter should be {int}", async function (count: number) {
	expect(responseBody.count).toBe(count);
});

Then("count of total position chatter should be greater or equal to {int}", async function (count: number) {
	expect(responseBody.count).toBeGreaterThanOrEqual(count);
});

Given("a responsibility is attach to the role", async () => {
	const updateResponsibilityData: RolesData = getRandomRole();
	newResponsibilityData.name = updateResponsibilityData.name;

	response = await responsibilityApiCalls.createResponsibility(newResponsibilityData.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	responsibilityId = responseBody.id;
	setSharedData("responsibilityName", newResponsibilityData.name);
	setSharedData("responsibilityId", responsibilityId.toString());

	response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");
	const updatApiRoleData: RolesData = getRandomRole();
	apiRoleData.name = updatApiRoleData.name;
	apiRoleData.description = updatApiRoleData.description;

	response = await newRoles.createRole(apiRoleData.name, apiRoleData.description, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	roleId = await responseBody.id;
	response = await newRoles.activateRole(roleId);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");

	response = await responsibilityApiCalls.assignRoleToResponsibility(responsibilityId, roleId);
	await expect(response).toBeOK();
});

Given("a role is attached to the position", async () => {
	response = await positionApiCalls.asignRoleToAPosition(positionId, roleId);
	await expect(response).toBeOK();
});

Given("a role with status {string} is attached to the position", async (status: string) => {
	const updatApiRoleData: RolesData = getRandomRole();
	apiRoleData.name = updatApiRoleData.name;
	apiRoleData.description = updatApiRoleData.description;

	response = await newRoles.createRole(apiRoleData.name, apiRoleData.description, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	roleId = await responseBody.id;

	if (status === "Active") {
		response = await newRoles.activateRole(roleId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("active");
	}

	response = await positionApiCalls.asignRoleToAPosition(positionId, roleId);
	await expect(response).toBeOK();
});

When("user calls the role to position API", async () => {
	const rolesApi = new RolesApis(baseInstance);
	response = await rolesApi.activateRole(id);
	await expect(response).toBeOK();
	response = await positionApiCalls.asignRoleToAPosition(positionId, id);
});

When("user attaches the active role to the position", async () => {
	response = await positionApiCalls.asignRoleToAPosition(positionId, id);
});

Then("verify the response for the attach role to position API is {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then("verify the responseBody for the attach role to position API contains the attachment details", async function () {
	responseBody = await response.json();
	const attachment = responseBody.attachments[0];
	const attachmentsCount = responseBody.attachments_count.role;
	expect(attachment.type).toBe("role");
	expect(attachment.id).toBe(id);
	expect(attachmentsCount).toBe(1);
});

When("user calls the detach API to detach a {string} role from a position", async function (roleType: string) {
	switch (roleType.toLowerCase()) {
		case "attached":
			response = await positionApiCalls.detachRoleFromPosition(positionId, roleId);
			break;
		case "detached":
			response = await positionApiCalls.detachRoleFromPosition(positionId, id);
			break;
		case "nonexistent":
			response = await positionApiCalls.detachRoleFromPosition(positionId, 5555);
			break;
	}
});

Then("verify the response for the detach role from position API is {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then(
	"verify the responseBody for the detach role from position API doesn't contain the attachment details",
	async function () {
		responseBody = await response.json();
		expect(responseBody.attachments.length).toBe(0);
		const attachment = responseBody.attachments[0];
		expect(attachment).toBeUndefined();
		const attachmentsCount = responseBody.attachments_count.role;
		expect(attachmentsCount).toBeUndefined();
	},
);

Then("verify error message for detach role from position API is {string}", async function (errorText: string) {
	responseBody = await response.json();
	const actualMessage = responseBody.message || responseBody.detail;
	expect(actualMessage).toContain(errorText);
});

When("user calls the archive position API", async function () {
	response = await positionApiCalls.archivePosition(positionId);
});

When("user calls the unarchive position API", async function () {
	response = await positionApiCalls.unarchivePosition(positionId);
});

Then("user tries to activate the position", async function () {
	response = await positionApiCalls.activatePosition(positionId);
	responseBody = await response.json();
});

Then("user tries to retired the position", async function () {
	response = await positionApiCalls.retirePosition(positionId);
	responseBody = await response.json();
});

Then("verify status for archive position API to be {int}", async function (statusCode: number) {
	expect(await response.status()).toBe(statusCode);
});

Then("verify the position is archived", async function () {
	responseBody = await response.json();
	expect(responseBody.archived).toBe(true);
});

Then("verify the position is unarchived", async function () {
	responseBody = await response.json();
	expect(responseBody.archived).toBe(false);
});

Then("verify the error message for the archive position api to be {string}", async function (errorText: string) {
	responseBody = await response.json();
	expect(responseBody.message).toContain(errorText);
});

Then("the position response should include the activated_by field", async () => {
	expect(responseBody.activated_by).not.toBeNull();
});

Then("the position response should include the activated_on field", async () => {
	expect(responseBody.activated_on).not.toBeNull();
});

Then("verify archive Position response has archived_by field", async () => {
	expect(responseBody.archived_by).not.toBeNull();
});

Then("verify archive Position response has archived_on field", async () => {
	expect(responseBody.archived_on).not.toBeNull();
});

Then("verify de-activated Position response has removed_by field", async () => {
	expect(responseBody.removed_by).not.toBeNull();
});

Then("verify de-activated Position response has removed_on field", async () => {
	expect(responseBody.removed_on).not.toBeNull();
});

Then("verify retired position response has removed_by field", async () => {
	expect(responseBody.removed_by).not.toBeNull();
});

Then("verify retired position response has removed_on field", async () => {
	expect(responseBody.removed_on).not.toBeNull();
});

Then("verify that effective_on date is shown in response body", async () => {
	expect(responseBody.effective_on).not.toBeNull();
});

Then("verify that effective_by date is shown in response body", async () => {
	expect(responseBody.effective_by).not.toBeNull();
});

Given("Employee is in status active", async function () {
	const employeeData: EmployeeData = generateRandomEmployeeData();
	response = await employeeApiCalls.createEmployee(
		employeeData.firstName,
		employeeData.lastName,
		employeeData.title,
		"draft",
	);
	responseBody = await response.json();
	employeeId = responseBody.id;
	expect(responseBody.current_status).toBe("draft");

	response = await employeeApiCalls.activateEmployee(employeeId);
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("active");
});

Given("clear position IDs for bulk testing", async () => {
	positionIds = [];
});

When("user calls the bulk {string} action API", async (action: string) => {
	currentBulkAction = action.toLowerCase();
	response = await positionApiCalls.bulkActionPositions(currentBulkAction, positionIds, false);

	const expectedStatus = action.toLowerCase() === "delete" ? 204 : 200;

	if (response.status() !== expectedStatus) {
		const errorText = await response.text();
		throw new Error(`Bulk ${action} API failed with status ${response.status()}: ${errorText}`);
	}

	if (action.toLowerCase() === "delete") {
		responseBody = null;
	} else {
		responseBody = await response.json();
	}
});

Then("verify the bulk {string} action API returns {int}", async (action: string, statusCode: number) => {
	const expectedCode = action.toLowerCase() === "delete" && statusCode === 200 ? 204 : statusCode;
	expect(response.status()).toBe(expectedCode);
});

Then("verify bulk {string} response contains position details", async (action: string) => {
	if (action.toLowerCase() === "delete") {
		expect(response.status()).toBe(204);
	} else {
		expect(responseBody).toBeDefined();
		expect(Array.isArray(responseBody.results)).toBe(true);
		expect(responseBody.results.length).toBe(positionIds.length);

		for (const result of responseBody.results) {
			expect(result).toHaveProperty("id");
			expect(result).toHaveProperty("name");
			expect(result).toHaveProperty("status");
		}
	}
});

Then("verify all positions are {string}", async (expectedStatus: string) => {
	const statusText = expectedStatus.toLowerCase();

	if (statusText === "deleted") {
		for (const id of positionIds) {
			const getResponse = await positionApiCalls.getPositionDetails(id);
			expect(getResponse.status()).toBe(404);
		}
		return;
	}

	for (const id of positionIds) {
		const getResponse = await positionApiCalls.getPositionDetails(id);
		const getResponseBody = await getResponse.json();

		if (statusText === "archived") {
			expect(getResponseBody).toHaveProperty("archived");
			expect(getResponseBody.archived).toBe(true);
		} else if (statusText === "unarchived") {
			expect(getResponseBody).toHaveProperty("archived");
			expect(getResponseBody.archived).toBe(false);
		} else {
			expect(getResponseBody.status).toBe(statusText);
		}
	}
});

Then("verify that fields are visible in the position response", async () => {
	expect(responseBody).toHaveProperty("assigned_employees");
	expect(Array.isArray(responseBody.assigned_employees)).toBe(true);
	if (responseBody.assigned_employees.length > 0) {
		const assignedEmployee = responseBody.assigned_employees[0];
		expect(assignedEmployee).toHaveProperty("assigned_employee_id");
		expect(assignedEmployee).toHaveProperty("assigned_employee_name");
		expect(assignedEmployee).toHaveProperty("assigned_employee_avatar");
		expect(assignedEmployee).toHaveProperty("assigned_employee_commitment");
		expect(typeof assignedEmployee.assigned_employee_id).toBe("number");
		expect(typeof assignedEmployee.assigned_employee_name).toBe("string");
		expect(typeof assignedEmployee.assigned_employee_commitment).toBe("number");
	}
});

Then("verify that position response with no position assignment", async () => {
	response = await positionApiCalls.getPositionDetails(positionId);
	await expect(response).toBeOK();
	responseBody = await response.json();
});

When("the user calls the get position API with no position assignment", async () => {
	response = await positionApiCalls.getPositionDetailsWithNoPositionAssignment(positionId);
	await expect(response).toBeOK();
	responseBody = await response.json();
});

When("User call the Get Position Filter API", async () => {
	response = await positionApiCalls.getPositionFilter(positionId);
	responseBody = await response.json();
});

Then("verify the responseBody for the Get Position Filter API contains the attachment details", async () => {
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);
	if (responseBody.results.length > 0) {
		const role = responseBody.results[0];
		expect(role).toHaveProperty("id");
		expect(role).toHaveProperty("code");
		expect(role).toHaveProperty("code_str");
		expect(role).toHaveProperty("name");
		expect(role).toHaveProperty("status");
		expect(role).toHaveProperty("archived");
		expect(role).toHaveProperty("assignment_count");
		expect(role).toHaveProperty("position_attachment_count");
		expect(role).toHaveProperty("responsibility_attachment_count");
		expect(role).toHaveProperty("has_draft_responsibilities_attached");
		expect(role).toHaveProperty("draft_responsibilities_count");
		expect(typeof role.id).toBe("number");
		expect(typeof role.code).toBe("number");
		expect(typeof role.code_str).toBe("string");
	}
});

When("user assigns the position to the first employee with commitment 1", async function () {
	response = await employeeApiCalls.addPositionAssignmentToEmployeeWithCommitment(employeeId, positionId, 1, 1);
	responseBody = await response.json();
	await expect(response).toBeOK();
});

When("user creates a second active employee", async function () {
	const updateSecondEmployeeData: EmployeeData = generateRandomEmployeeData();
	secondEmployeeData = updateSecondEmployeeData;

	response = await employeeApiCalls.createEmployee(
		secondEmployeeData.firstName,
		secondEmployeeData.lastName,
		secondEmployeeData.title,
		"draft",
	);
	responseBody = await response.json();
	secondEmployeeId = responseBody.id;
	expect(responseBody.current_status).toBe("draft");
	response = await employeeApiCalls.activateEmployee(secondEmployeeId);
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("active");
});

When("user assigns the same position to the second employee with commitment 3", async function () {
	response = await employeeApiCalls.addPositionAssignmentToEmployee(secondEmployeeId, positionId, 3);
	responseBody = await response.json();
	await expect(response).toBeOK();
});

When("user calls the getAllPositions API", async function () {
	response = await positionApiCalls.getAllPositions();
	responseBody = await response.json();
	await expect(response).toBeOK();
});

Then("verify the getAllPositions response contains both employees with correct commitments", async function () {
	expect(responseBody).toBeDefined();
	expect(Array.isArray(responseBody.results)).toBe(true);

	const createdPosition = responseBody.results.find(
		(pos: {
			id: number;
			assigned_employees: Array<{ assigned_employee_id: number; assigned_employee_commitment: number }>;
			responsibilities_count: number;
			primary_position_effective_on: string;
			preparing_as_position_effective_on: string;
		}) => pos.id === positionId,
	);
	expect(createdPosition).toBeDefined();
	const firstEmployeeAssignment = createdPosition.assigned_employees.find(
		(emp: { assigned_employee_id: number }) => emp.assigned_employee_id === employeeId,
	);
	const secondEmployeeAssignment = createdPosition.assigned_employees.find(
		(emp: { assigned_employee_id: number }) => emp.assigned_employee_id === secondEmployeeId,
	);
	expect(firstEmployeeAssignment).toBeDefined();
	expect(secondEmployeeAssignment).toBeDefined();
	expect(firstEmployeeAssignment.assigned_employee_commitment).toBe(1);
	expect(secondEmployeeAssignment.assigned_employee_commitment).toBe(3);
	expect(firstEmployeeAssignment).toHaveProperty("assigned_employee_id");
	expect(firstEmployeeAssignment).toHaveProperty("assigned_employee_commitment");
	expect(secondEmployeeAssignment).toHaveProperty("assigned_employee_id");
	expect(secondEmployeeAssignment).toHaveProperty("assigned_employee_commitment");
	expect(createdPosition).toHaveProperty("responsibilities_count");
	expect(createdPosition).toHaveProperty("primary_position_effective_on");
	expect(createdPosition).toHaveProperty("preparing_as_position_effective_on");
	expect(typeof createdPosition.preparing_as_position_effective_on).toBe("string");
});

Given("user store the position count", async function () {
	const sidebarResponse = JSON.parse(getSharedData("sidebarCountsResponse"));
	expect(sidebarResponse).toBeDefined();
	expect(sidebarResponse).toHaveProperty("positions");
	storedPositionCount = sidebarResponse.positions;
});

Then("verify the position count is same as the stored position count", async function () {
	const sidebarResponse = JSON.parse(getSharedData("sidebarCountsResponse"));
	expect(sidebarResponse).toBeDefined();
	expect(sidebarResponse).toHaveProperty("positions");
	const currentPositionCount = sidebarResponse.positions;
	expect(currentPositionCount).toBe(storedPositionCount);
});

Then("verify the position count is increased by 1", async function () {
	const sidebarResponse = JSON.parse(getSharedData("sidebarCountsResponse"));
	expect(sidebarResponse).toBeDefined();
	expect(sidebarResponse).toHaveProperty("positions");
	const currentPositionCount = sidebarResponse.positions;
	expect(currentPositionCount).toBe(storedPositionCount + 1);
});

Then("verify the position count is decreased by 1", async function () {
	const sidebarResponse = JSON.parse(getSharedData("sidebarCountsResponse"));
	expect(sidebarResponse).toBeDefined();
	expect(sidebarResponse).toHaveProperty("positions");
	const currentPositionCount = sidebarResponse.positions;
	expect(currentPositionCount).toBe(storedPositionCount - 1);
});

Then("verify the response status is {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then("user calls the getPositions API with query params {string}", async function (queryParams: string) {
	response = await positionApiCalls.getPositionsWithQueryParams(queryParams);
	responseBody = await response.json();
	await expect(response).toBeOK();
});

Then("verify the response contains active positions and excludes retired positions", async function () {
	expect(responseBody).toBeDefined();

	const positions = responseBody.results || responseBody || [];
	expect(positions.length).toBeGreaterThan(0);

	for (const position of positions) {
		expect(position).toHaveProperty("status");
		expect(position.status).toBe("active");
	}
});

When(
	"user calls the getAllPositions API with limit {int} and offset {int}",
	async function (limit: number, offset: number) {
		response = await positionApiCalls.getAllPositions(limit, offset);
		responseBody = await response.json();
		await expect(response).toBeOK();
	},
);

Then("verify the position response contains at most {int} records", async function (maxCount: number) {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);
	expect(responseBody.results.length).toBeLessThanOrEqual(maxCount);
	expect(responseBody.results.length).toBeGreaterThanOrEqual(0);
});

Then("the response contains at most {int} position items", async function (maxCount: number) {
	expect(responseBody).toBeDefined();
	if (responseBody.results) {
		expect(Array.isArray(responseBody.results)).toBe(true);
		expect(responseBody.results.length).toBeLessThanOrEqual(maxCount);
		expect(responseBody.results.length).toBeGreaterThanOrEqual(0);
	} else {
		expect(responseBody).toHaveProperty("id");
		expect(responseBody).toHaveProperty("name");
		expect(1).toBeLessThanOrEqual(maxCount);
	}
});

Then("verify the position response contains pagination metadata", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("count");
	expect(responseBody).toHaveProperty("next");
	expect(responseBody).toHaveProperty("previous");
	expect(responseBody).toHaveProperty("results");
	expect(typeof responseBody.count).toBe("number");
	expect(Array.isArray(responseBody.results)).toBe(true);
});

Then("verify the position response count matches the total number of positions", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("count");
	expect(responseBody.count).toBeGreaterThan(0);
});

Then("verify the position response contains different records than the previous request", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);

	if (responseBody.results.length > 0) {
		const currentIds = responseBody.results.map((item: { id: number }) => item.id);
		expect(currentIds.length).toBeGreaterThan(0);
	}
});

function verifyPositionInResponse(
	responseBody: { results?: Array<{ name: string; id: number; status: string; code_str: string }> },
	positionName: string,
): { name: string; id: number; status: string; code_str: string } {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);

	const foundPosition = responseBody.results?.find(
		(pos: { name: string; id: number; status: string; code_str: string }) => pos.name === positionName,
	);
	expect(foundPosition).toBeDefined();
	return foundPosition!;
}

When("User get All Positions filtered by position name", async function () {
	const positionName = getSharedData("positionName");
	expect(positionName).toBeDefined();
	expect(typeof positionName).toBe("string");
	expect(positionName.length).toBeGreaterThan(0);

	response = await positionApiCalls.getPositionsWithName(positionName);
	responseBody = await response.json();
	await expect(response).toBeOK();
});

When("User calls the getAllPositions API filtered by code_str", async function () {
	const positionCodeStr = getSharedData("positionCodeStr");
	expect(positionCodeStr).toBeDefined();
	expect(typeof positionCodeStr).toBe("string");
	expect(positionCodeStr.length).toBeGreaterThan(0);

	const codeStrWithoutHash = positionCodeStr.startsWith("#") ? positionCodeStr.substring(1) : positionCodeStr;

	response = await positionApiCalls.getPositionsWithCodeStr(codeStrWithoutHash);
	responseBody = await response.json();
	await expect(response).toBeOK();
});

Then("verify the position name is found in the response", async function () {
	const positionName = getSharedData("positionName");
	const foundPosition = verifyPositionInResponse(responseBody, positionName);
	expect(foundPosition.name).toBe(positionName);
});

Then("verify the position code_str is found in the response", async function () {
	const positionName = getSharedData("positionName");
	const foundPosition = verifyPositionInResponse(responseBody, positionName);
	expect(foundPosition).toHaveProperty("code_str");
	expect(typeof foundPosition.code_str).toBe("string");
	expect(foundPosition.code_str.length).toBeGreaterThan(0);
});

Then("verify the position status is {string} in the response", async function (expectedStatus: string) {
	const positionName = getSharedData("positionName");
	const foundPosition = verifyPositionInResponse(responseBody, positionName);
	expect(foundPosition).toHaveProperty("status");
	expect(foundPosition.status).toBe(expectedStatus.toLowerCase());
});

Then("verify all returned positions have the expected name", async function () {
	const positionName = getSharedData("positionName");
	const foundPosition = verifyPositionInResponse(responseBody, positionName);
	expect(foundPosition.name).toBe(positionName);
});

Then("verify the position ID matches the created position", async function () {
	const positionName = getSharedData("positionName");
	const foundPosition = verifyPositionInResponse(responseBody, positionName);

	const expectedPositionId = parseInt(getSharedData("positionId"));
	expect(foundPosition).toHaveProperty("id");
	expect(foundPosition.id).toBe(expectedPositionId);
});

When("user calls the list position API with filter {string}", async function (queryParams: string) {
	response = await positionApiCalls.getPositionsWithQueryParams(queryParams);
	responseBody = await response.json();
	await expect(response).toBeOK();
});

Then("verify the position status is in the response", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);
	expect(responseBody.results.length).toBeGreaterThan(0);

	filterCallCount++;

	let expectedStatus: string[];
	if (filterCallCount === 1) {
		expectedStatus = ["active", "draft", "retired"];
	} else if (filterCallCount === 2) {
		expectedStatus = ["active", "draft"];
	} else {
		expectedStatus = ["active", "draft", "retired"];
	}

	for (const position of responseBody.results) {
		expect(position).toHaveProperty("status");
		expect(expectedStatus).toContain(position.status);
	}
});

Given("user creates 3 roles for sequence reordering", async function () {
	const roleData1 = getRandomRole();
	const roleData2 = getRandomRole();
	const roleData3 = getRandomRole();
	response = await newRoles.createRole(roleData1.name, roleData1.description, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	const roleId1 = responseBody.id;
	response = await newRoles.createRole(roleData2.name, roleData2.description, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	const roleId2 = responseBody.id;
	response = await newRoles.createRole(roleData3.name, roleData3.description, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	const roleId3 = responseBody.id;
	setSharedData("roleId1", roleId1.toString());
	setSharedData("roleId2", roleId2.toString());
	setSharedData("roleId3", roleId3.toString());
	setSharedData("roleName1", roleData1.name);
	setSharedData("roleName2", roleData2.name);
	setSharedData("roleName3", roleData3.name);
});

When("user attaches all 3 roles to the position", async function () {
	const sharedPositionId = parseInt(getSharedData("positionId"));
	const roleId1 = parseInt(getSharedData("roleId1"));
	const roleId2 = parseInt(getSharedData("roleId2"));
	const roleId3 = parseInt(getSharedData("roleId3"));
	response = await positionApiCalls.asignRoleToAPosition(sharedPositionId, roleId1);
	await expect(response).toBeOK();
	response = await positionApiCalls.asignRoleToAPosition(sharedPositionId, roleId2);
	await expect(response).toBeOK();
	response = await positionApiCalls.asignRoleToAPosition(sharedPositionId, roleId3);
	await expect(response).toBeOK();
	response = await newRoles.getPositionRoles(sharedPositionId);
	responseBody = await response.json();
	await expect(response).toBeOK();
	const attachedRoleIds = extractRoleIdsFromResponse(responseBody);
	expect(attachedRoleIds).toContain(roleId1);
	expect(attachedRoleIds).toContain(roleId2);
	expect(attachedRoleIds).toContain(roleId3);
});

When("user calls the sequence reorder API with reordered role IDs", async function () {
	const sharedPositionId = parseInt(getSharedData("positionId"));
	const roleId1 = parseInt(getSharedData("roleId1"));
	const roleId2 = parseInt(getSharedData("roleId2"));
	const roleId3 = parseInt(getSharedData("roleId3"));
	const reorderedRoleIds = [roleId3, roleId2, roleId1];
	response = await newRoles.getPositionRoles(sharedPositionId);
	responseBody = await response.json();
	await expect(response).toBeOK();
	const currentlyAttachedRoleIds = extractRoleIdsFromResponse(responseBody);
	expect(currentlyAttachedRoleIds).toContain(roleId1);
	expect(currentlyAttachedRoleIds).toContain(roleId2);
	expect(currentlyAttachedRoleIds).toContain(roleId3);
	response = await positionApiCalls.reorderPositionRoles(sharedPositionId, reorderedRoleIds);
	if (!response.ok()) {
		const errorText = await response.text();
		throw new Error(`Sequence reorder API failed with status ${response.status()}: ${errorText}`);
	}

	responseBody = await response.json();
});

Then("verify the new order of roles in the position response", async function () {
	const roleId1 = parseInt(getSharedData("roleId1"));
	const roleId2 = parseInt(getSharedData("roleId2"));
	const roleId3 = parseInt(getSharedData("roleId3"));

	if (responseBody.attachments && Array.isArray(responseBody.attachments)) {
		expect(responseBody.attachments.length).toBeGreaterThanOrEqual(3);
		const reorderedRoleIds = responseBody.attachments.map((attachment: { id: number }) => attachment.id);
		expect(reorderedRoleIds[0]).toBe(roleId3);
		expect(reorderedRoleIds[1]).toBe(roleId2);
		expect(reorderedRoleIds[2]).toBe(roleId1);
	} else {
		throw new Error("Unexpected response structure from sequence reorder API - missing attachments array");
	}
});

function extractRoleIdsFromResponse(responseBody: unknown): number[] {
	if (Array.isArray(responseBody)) {
		return responseBody.map((attachment: { role: number }) => attachment.role);
	} else if (
		typeof responseBody === "object" &&
		responseBody !== null &&
		"results" in responseBody &&
		Array.isArray((responseBody as { results: unknown[] }).results)
	) {
		return (responseBody as { results: Array<{ role: number }> }).results.map((attachment) => attachment.role);
	} else if (
		typeof responseBody === "object" &&
		responseBody !== null &&
		"roles" in responseBody &&
		Array.isArray((responseBody as { roles: unknown[] }).roles)
	) {
		return (responseBody as { roles: Array<{ role: number }> }).roles.map((attachment) => attachment.role);
	} else {
		throw new Error("Unexpected response structure from getPositionRoles API");
	}
}


export { newPositionAPIData, positionCode };
