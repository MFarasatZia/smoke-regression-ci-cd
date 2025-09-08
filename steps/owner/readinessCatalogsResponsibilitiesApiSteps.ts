import { Given, Then, When } from "@cucumber/cucumber";
import { baseInstance } from "../../helpers/BaseClass";
import EmployeeApis from "../../apis/owner/employee";
import ResponsibilityApis from "../../apis/owner/responsibility";
import PositionApis from "../../apis/owner/position";
import {
	RolesData,
	UserData,
	EmployeeData,
	generateRandomEmployeeData,
	generateRandomUserData,
	getRandomRole,
	getRandomPhrase,
} from "../../helpers/util/random";
import { expect } from "@playwright/test";
import RolesApis from "../../apis/owner/roles";
import UserApi from "../../apis/owner/user";
import { setSharedData, getSharedData } from "../../helpers/util/sharedData";
import { checkpointData } from "./checkpointApiSteps";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let response: any, responseBody: any, responsibilityId: number, badgeId: number, id: number;
let roleId: number;
const responsibilityIds: number[] = [];
let note: string;
let employeeId: number;
let checkpointId;
let initialNoProfessionalCount;
let finalNoProfessionalCount;
let initialNotAttachedToRoleCount: number;
let finalNotAttachedToRoleCount: number;
let storedResponsibilityCount: number;
let foundOurResponsibility = false;
const addedEmployeeData: EmployeeData = generateRandomEmployeeData();
const newRole: RolesData = getRandomRole();
const newUserData: UserData = generateRandomUserData();
const newUser: UserApi = new UserApi(baseInstance);
const employeeApiCalls: EmployeeApis = new EmployeeApis(baseInstance);
const responsibilityApiCalls: ResponsibilityApis = new ResponsibilityApis(baseInstance);
const roleApiCalls: RolesApis = new RolesApis(baseInstance);
const positionApiCalls: PositionApis = new PositionApis(baseInstance);

When("user create a responsibility via API", async function () {
	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
});

When("you activate Responsibility via API", async () => {
	response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
	responseBody = await response.json();
});

Then("verify Responsibility was activated", async () => {
	expect(responseBody.status).toBe("active");
});

Given("that responsibility is NOT in status draft", async () => {
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

When("you activate responsibility via API", async () => {
	response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
	responseBody = await response.json();
});

Then("activate responsibility API return error", async function () {
	expect(response.status()).toBe(400);
});

When("a responsibility is in status draft", async () => {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
});

Given("that a responsibility is in status draft", async () => {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
});

When("the responsibility is NOT in status draft", async () => {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");
});

When("responsibility is in status draft and is not attached to anything", async () => {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
});

Given("that responsibility is not in status draft", async () => {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	responsibilityId = responseBody.id;
	response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");
	responsibilityId = responseBody.id;
});

When("you delete responsibility via API", async () => {
	response = await responsibilityApiCalls.deleteResponsibility(responsibilityId);
});

Then("return error \"responsibility not in status draft\"", async () => {
	responseBody = await response.json();
	expect(responseBody).toContain("responsibility not in status draft");
});

Then("return error \"responsibility is attached\"", async () => {
	responseBody = await response.json();
	expect(responseBody).toContain("responsibility is attached");
});

Given("that responsibility is attached", async () => {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	responsibilityId = responseBody.id;

	response = await roleApiCalls.createRole(newRole.name, newRole.description, "draft");
	responseBody = await response.json();
	const roleId = await responseBody.id;

	response = await responsibilityApiCalls.assignRoleToResponsibility(responsibilityId, roleId);

	await expect(response).toBeOK();
});

Given("that responsibility is in status draft", async () => {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	responsibilityId = responseBody.id;
});

Then("responsibility is not attached to anything", async () => {
	const length = responseBody.attachments.length;
	expect(length).toBe(0);
});

Then("return success response", async () => {
	expect(response.status()).toBe(204);
});

Given("that a responsibility is created", async () => {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
});

Given("User has responsibility", async function () {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	responsibilityId = responseBody.id;
	response = await newUser.createNewUser(
		newUserData.email,
		newUserData.firstName,
		newUserData.lastName,
		"invited",
		true,
		false,
		false,
	);
	responseBody = await response.json();
	const userId = responseBody.id;

	await responsibilityApiCalls.grantBadgeToResponsibility(responsibilityId, 1, userId, responsibilityId);
});

Given("User has a responsibility", async function () {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	responsibilityId = responseBody.id;
	response = await newUser.createNewUser(
		newUserData.email,
		newUserData.firstName,
		newUserData.lastName,
		"invited",
		true,
		false,
		false,
	);
	responseBody = await response.json();
});

When("User call list responsibility badges API", async function () {
	response = await responsibilityApiCalls.getResponsibilityBadges(responsibilityId);
	responseBody = await response.json();
});

When("the user gets the old badge by its ID via this API", async function () {
	response = await responsibilityApiCalls.getOldBadgeDetails(badgeId);
	responseBody = await response.json();
});

Then("user verify the response have remove reason and remove method property", async function () {
	expect(responseBody).toHaveProperty("remove_reason");
	expect(responseBody).toHaveProperty("remove_method");
	expect(responseBody.remove_reason).not.toBeNull();
	expect(responseBody.remove_method).not.toBeNull();
	expect(responseBody.remove_reason).toContain("Upgraded to");
	expect(responseBody.remove_reason).toMatch(/^Upgraded to [a-zA-Z\s]+$/);
	expect(responseBody.remove_method).toContain("upgraded");
});

Then("list all badges for particular responsibility should be listed", async function () {
	expect(responseBody).toHaveProperty("count");
	expect(responseBody).toHaveProperty("results");
	if (responseBody.count === 0) {
		expect(responseBody.results.length).toBe(0);
	} else {
		expect(responseBody.results.length).toBeGreaterThan(0);
	}
});

Given("that responsibility is in status active", async () => {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	responsibilityId = responseBody.id;
	response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");
	responsibilityId = responseBody.id;
	setSharedData("responsibilityName", newRole.name);
});

When("user retire responsibility via API", async () => {
	response = await responsibilityApiCalls.retiredResponsibility(responsibilityId);
	responseBody = await response.json();
});

Then("verify responsibility was retired", async () => {
	expect(responseBody.status).toBe("retired");
});

Given("that responsibility is NOT in status active", async () => {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	responsibilityId = responseBody.id;
});

Given("that responsibility is in status Retired", async () => {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	responsibilityId = responseBody.id;
	response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");
	responsibilityId = responseBody.id;
	response = await responsibilityApiCalls.retiredResponsibility(responsibilityId);
	responseBody = await response.json();
	expect(responseBody.status).toBe("retired");
});

Given("that the responsibility is NOT in status active", async () => {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	responsibilityId = responseBody.id;
});

Given("that a responsibility is in status active", async () => {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	responsibilityId = responseBody.id;
	response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");
	responsibilityId = responseBody.id;
	setSharedData("responsibilityName", newRole.name);
});

When("that an employee has a current badge for a specific responsibility", async function () {
	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("draft");
	employeeId = responseBody.id;
	setSharedData("employeeId", employeeId.toString());
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
	responseBody = await response.json();
	badgeId = responseBody.id;
	await expect(response).toBeOK();
});

When("user try to assign another badge to the same account via API", async function () {
	const sharedEmployeeId = parseInt(getSharedData("employeeId"));
	response = await responsibilityApiCalls.grantBadgeToResponsibility(
		responsibilityId,
		1,
		sharedEmployeeId,
		responsibilityId,
	);
});

Then("response return status to be 400", async () => {
	await expect(response).not.toBeOK();
	responseBody = await response.json();
});

Then("response body shoudl conatin error {string}", async function (respose: string) {
	expect(responseBody.non_field_errors).toContain(respose);
});

When("user call the remove badge API", async function () {
	response = await responsibilityApiCalls.removeBadgeForResponsibility(badgeId, "Forced", "expired");
	await expect(response).toBeOK();
	responseBody = await response.json();
});

Then(/^response should return status 200 along with the reason$/, async function () {
	await expect(response).toBeOK();
	responseBody = await response.json();
	expect(responseBody.remove_reason).toEqual("expired");
});

Then("respose should include method is equal to Forced", async () => {
	expect(responseBody.remove_method).toEqual("forced");
	expect(responseBody.level).toEqual("Apprentice");
});

When("user delete the badge via API", async function () {
	response = await responsibilityApiCalls.deleteBadgeForResponsibility(badgeId);
});

Then("badge should be removed successfully", async function () {
	await expect(response.status()).toBe(204);
});

Given("you have responsibility", async function () {
	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
});

Given("that a responsibility is not in status {string}", async (status: string) => {
	if (status === "Active" || status === "Inactive" || status === "Retired") {
		const updateNewRole: RolesData = getRandomRole();
		newRole.name = updateNewRole.name;

		response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
		responseBody = await response.json();
		expect(responseBody.status).toBe("draft");
		responsibilityId = responseBody.id;
	} else if (status === "Draft") {
		const updateNewRole: RolesData = getRandomRole();
		newRole.name = updateNewRole.name;

		response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
		responseBody = await response.json();
		expect(responseBody.status).toBe("draft");
		responsibilityId = responseBody.id;
		response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("active");
	}
});

Given("that a responsibility is in status {string}", async (status: string) => {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	responsibilityId = responseBody.id;
	responsibilityIds.push(responsibilityId);

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
	setSharedData("responsibilityName", newRole.name);
});

When("user calls an Checkpoint API", async function () {
	response = await responsibilityApiCalls.createNewCheckpoint(
		responsibilityId,
		2,
		checkpointData.name,
		checkpointData.description,
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
	checkpointId = responseBody.id;
});

When("user call the activate checkpoint API", async function () {
	response = await responsibilityApiCalls.activateCheckpoint(responsibilityId, checkpointId);
});

Given("User Have A Employee", async function () {
	this.response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);
	responseBody = await this.response.json();
	employeeId = responseBody.id;
	setSharedData("employeeId", employeeId.toString());
	response = await employeeApiCalls.activateEmployee(employeeId);
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("active");
});

When("user activate the employee", async function () {
	response = await employeeApiCalls.activateEmployee(employeeId);
	responseBody = await response.json();
});

When("user grant badge to responsibility", async () => {
	const sharedEmployeeId = parseInt(getSharedData("employeeId"));
	response = await responsibilityApiCalls.grantBadgeToResponsibility(
		responsibilityId,
		1,
		sharedEmployeeId,
		responsibilityId,
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
	badgeId = responseBody.id;
});

Then("User Call The Resposnibility History Badge API", async () => {
	response = await responsibilityApiCalls.responsibilityBadgeHistory(responsibilityId);
	await expect(response).toBeOK();
	responseBody = await response.json();
});

Then("response has issued_on", async () => {
	expect(responseBody.issued_on).not.toBeNull();
});

Then("response has issued_by", async () => {
	expect(responseBody.issued_by).not.toBeNull();
});

Given("that {int} responsibilities are created with {string} status", async function (count: number, status: string) {
	for (let i = 0; i < count; i++) {
		const updateNewRole: RolesData = getRandomRole();
		newRole.name = updateNewRole.name;

		let response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
		let responseBody = await response.json();
		expect(responseBody.status).toBe("draft");
		const responsibilityId = responseBody.id;

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
	}
});

When("user {string} the Responsibility via API", async (status: string) => {
	if (status === "Active") {
		response = await responsibilityApiCalls.activateResponsibility(responsibilityId);
		responseBody = await response.json();
	} else if (status === "Inactive") {
		response = await responsibilityApiCalls.deActivateResponsibility(responsibilityId);
		responseBody = await response.json();
	} else if (status === "Retire") {
		response = await responsibilityApiCalls.retiredResponsibility(responsibilityId);
		responseBody = await response.json();
	} else if (status === "Re-activate") {
		response = await responsibilityApiCalls.reActivateResponsibility(responsibilityId);
		responseBody = await response.json();
	} else if (status === "De-activate") {
		response = await responsibilityApiCalls.deActivateResponsibility(responsibilityId);
		responseBody = await response.json();
	} else if (status === "Delete") {
		response = await responsibilityApiCalls.deleteResponsibility(responsibilityId);
		if (response.status() === 400) {
			responseBody = await response.json();
		}
	} else if (status === "delete") {
		response = await responsibilityApiCalls.deleteAttachedResponsibility(responsibilityId);
		if (response.status() === 400) {
			responseBody = await response.json();
		}
	}
});

Given("responsibility is attached", async () => {
	response = await roleApiCalls.createRole(newRole.name, newRole.description, "draft");
	responseBody = await response.json();
	const roleId = await responseBody.id;

	response = await responsibilityApiCalls.assignRoleToResponsibility(responsibilityId, roleId);

	await expect(response).toBeOK();
});

Then("verify the responsibility status to be {int}", async (statusCode: number) => {
	expect(response.status()).toBe(statusCode);
});

Then("Responsibility status to be {string}", async (status: string) => {
	const statusName = status.toLowerCase();
	expect(responseBody.status).toBe(statusName);
});

Then("response should be {string}", async (responseMsg: string) => {
	if (responseBody.message) {
		expect(responseBody.message).toContain(responseMsg);
	} else {
		expect(responseBody[0]).toContain(responseMsg);
	}
});

Then("verify responsibility was deleted from the database", async () => {
	response = await responsibilityApiCalls.getAllResponsibility();
	responseBody = await response.json();
	const allResults = responseBody.results;

	for (const result of allResults) {
		expect(result.id).not.toContain(responsibilityId);
	}
});

Given("attached to the Role", async () => {
	response = await roleApiCalls.createRole(newRole.name, newRole.description, "draft");
	responseBody = await response.json();
	const roleId = await responseBody.id;

	response = await responsibilityApiCalls.assignRoleToResponsibility(responsibilityId, roleId);

	await expect(response).toBeOK();
});

Given("user has an Role", async () => {
	response = await roleApiCalls.createRole(newRole.name, newRole.description, "draft");
	responseBody = await response.json();
	roleId = responseBody.id;
	await expect(response).toBeOK();
});

When("user activates the Role", async function () {
	response = await roleApiCalls.activateRole(roleId);
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
});

Then(/^User Call The account Catalogs List API and store (initial|final) no_professional count$/, async (phase) => {
	response = await roleApiCalls.getCatalogsList();
	await expect(response).toBeOK();
	responseBody = await response.json();
	const currentCount = responseBody.responsibilities.no_professional;
	if (phase === "initial") {
		initialNoProfessionalCount = currentCount;
	} else {
		finalNoProfessionalCount = currentCount;
	}
});

Then("Verify the response body for account catalogs List", async () => {
	expect(responseBody.roles).toHaveProperty("draft_roles");
	expect(responseBody.roles).toHaveProperty("inactive_roles");
	expect(responseBody.roles).toHaveProperty("retired_roles");
	expect(responseBody.roles).toHaveProperty("active_roles");
	expect(responseBody.roles).toHaveProperty("not_attached");
	expect(responseBody.roles).toHaveProperty("without_responsibility");
	expect(responseBody.responsibilities).toHaveProperty("draft_responsibilities");
	expect(responseBody.responsibilities).toHaveProperty("inactive_responsibilities");
	expect(responseBody.responsibilities).toHaveProperty("retired_responsibilities");
	expect(responseBody.responsibilities).toHaveProperty("active_responsibilities");
	expect(responseBody.responsibilities).toHaveProperty("no_checkpoint");
	expect(responseBody.responsibilities).toHaveProperty("not_attached_to_role");
	expect(responseBody.responsibilities).toHaveProperty("no_master");
	expect(responseBody.responsibilities).toHaveProperty("no_coach");
	expect(responseBody.responsibilities).toHaveProperty("no_professional");
});

Then("Verify that no_professional count has increased", async () => {
	expect(finalNoProfessionalCount).toBeGreaterThan(initialNoProfessionalCount);
});

Then("you return status {int} and the note for responsibility", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
	responseBody = await response.json();
	expect(responseBody.note).toEqual(note);
});

When(/^you post to responsibility chatter$/, async function () {
	note = getRandomPhrase();
	response = await responsibilityApiCalls.postToChatter(responsibilityId, note, "employee", true);
});

Then("you return response for Responsibility status to be {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then(/^the note for responsibility$/, async function () {
	responseBody = await response.json();
	expect(responseBody.note).toEqual(note);
});

Given("that a responsibility has {int} posts to chatter", async function (chatters: number) {
	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	responsibilityId = responseBody.id;

	const initialNote = getRandomPhrase();
	const initialResponse = await responsibilityApiCalls.postToChatter(
		responsibilityId,
		initialNote,
		"responsibility",
		true,
	);
	await expect(initialResponse).toBeOK();

	const baseNote = getRandomPhrase();
	for (let i = 0; i < chatters; i++) {
		const note = `${baseNote} ${i}`;
		const response = await responsibilityApiCalls.postToChatter(responsibilityId, note, "responsibility", true);
		await expect(response).toBeOK();
	}
});

When("user calls the chatter list API for the responsibility", async function () {
	response = await responsibilityApiCalls.listResponsibilityChatter(responsibilityId);
});

Then("verify the status for Responsibility Chatter list to be {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
	responseBody = await response.json();
});

Then("count of entries for the responsibility chatter should be {int}", async function (chatterEntries: number) {
	expect(responseBody.results.length).toBe(chatterEntries);
});

Then("count of total responsibility chatter should be {int}", async function (count: number) {
	expect(responseBody.count).toBe(count);
});

Given(/^a message is posted to responsibility chatter$/, async function () {
	note = getRandomPhrase();
	setSharedData("note", note);
	response = await responsibilityApiCalls.postToChatter(responsibilityId, note, "responsibility", true);
});

Given("the Responsibilities with different statuses", async function () {
	const statusesList = ["draft", "Active", "De-activate", "Retired"];
	const responsibilities = [];

	for (const status of statusesList) {
		const updatApiRoleData: RolesData = getRandomRole();
		newRole.name = updatApiRoleData.name;

		this.response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
		responseBody = await this.response.json();
		id = await responseBody.id;
		if (status === "Active") {
			response = await responsibilityApiCalls.activateResponsibility(id);
			responseBody = await response.json();
			expect(responseBody.status).toBe("active");
		} else if (status === "De-activate") {
			let response = await responsibilityApiCalls.activateResponsibility(id);
			responseBody = await response.json();
			expect(responseBody.status).toBe("active");
			response = await responsibilityApiCalls.deActivateResponsibility(id);
			responseBody = await response.json();
			expect(responseBody.status).toBe("inactive");
		} else if (status === "Retired") {
			let response = await responsibilityApiCalls.activateResponsibility(id);
			responseBody = await response.json();
			expect(responseBody.status).toBe("active");
			response = await responsibilityApiCalls.retiredResponsibility(id);
			responseBody = await response.json();
			expect(responseBody.status).toBe("retired");
		}

		responsibilities.push({ id, status });
	}
	this.roles = responsibilities;
});

When("user calls the get responsibility api", async () => {
	const response = await responsibilityApiCalls.getSpecificResponsibility(responsibilityId);
	await expect(response).toBeOK();
	responseBody = await response.json();
});

When("user calls the get responsibility v2 api", async () => {
	const response = await responsibilityApiCalls.getSpecificResponsibilityV2(responsibilityId);
	await expect(response).toBeOK();
	responseBody = await response.json();
});

Then("Verify Add Checkpoint Counts by Level for Responsibilities", async () => {
	const response = await responsibilityApiCalls.getSpecificResponsibility(responsibilityId);
	const responseBody = await response.json();
	expect(responseBody.checkpoint_count).toBeTruthy();
	expect(responseBody.checkpoint_count).toBe(1);
	const checkpoints = responseBody.checkpoints;
	expect(checkpoints).toBeTruthy();
	expect(checkpoints.apprentice).toBe(0);
	expect(checkpoints.professional).toBe(1);
	expect(checkpoints.master).toBe(0);
	expect(checkpoints.coach).toBe(0);
});

Then("verify checklist counter has value in response", async () => {
	response = await responsibilityApiCalls.getSpecificResponsibility(responsibilityId);
	responseBody = await response.json();
	expect(responseBody.checkpoint_count).toBeTruthy();
	expect(responseBody.checkpoint_count).toBeGreaterThan(0);
});

Then("verify checklist counter is visible in response", async () => {
	response = await responsibilityApiCalls.getSpecificResponsibility(responsibilityId);
	responseBody = await response.json();
	expect(responseBody.checkpoint_count).toBe(0);
});

Then("verify when_forced_expiration_days_default varaible is visible in response", async () => {
	response = await responsibilityApiCalls.getSpecificResponsibility(responsibilityId);
	responseBody = await response.json();
	expect(responseBody.when_forced_expiration_days_default).toBeTruthy();
	expect(responseBody.when_forced_expiration_days_default).toBe(365);
});

Then("verify does_not_expire_default varaible is visible in response", async () => {
	response = await responsibilityApiCalls.getSpecificResponsibility(responsibilityId);
	responseBody = await response.json();
	expect(responseBody.does_not_expire_default).toBe(false);
});

Then("verify when_granted_expiration_days_default varaible is visible in response", async () => {
	response = await responsibilityApiCalls.getSpecificResponsibility(responsibilityId);
	responseBody = await response.json();
	expect(responseBody.when_awarded_expiration_days_default).toBeTruthy();
	expect(responseBody.when_awarded_expiration_days_default).toBe(365);
});

Then("verify expire_only_if_obsolete_default varaible is visible in response", async () => {
	response = await responsibilityApiCalls.getSpecificResponsibility(responsibilityId);
	responseBody = await response.json();
	expect(responseBody.expire_only_if_obsolete_default).toBe(true);
});

When("user calls the archive responsibility API", async function () {
	response = await responsibilityApiCalls.archiveResponsibility(responsibilityId);
});

When("user calls the unarchive responsibility API", async function () {
	response = await responsibilityApiCalls.unarchiveResponsibility(responsibilityId);
});

Then("verify status for archive responsibility API to be {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then("verify the responsibility is archived", async function () {
	responseBody = await response.json();
	expect(responseBody.archived).toBe(true);
});

Then("verify the responsibility is unarchived", async function () {
	responseBody = await response.json();
	expect(responseBody.archived).toBe(false);
});

Then("verify the error message for the archive responsibility api to be {string}", async function (errorText: string) {
	responseBody = await response.json();
	expect(responseBody.message).toContain(errorText);
});

Then("verify Responsibility response has activated_by field", async () => {
	expect(responseBody.activated_by).not.toBeNull();
});

Then("verify Responsibility response has activated_on field", async () => {
	expect(responseBody.activated_on).not.toBeNull();
});

Then("verify archive Responsibility response has archived_by field", async () => {
	expect(responseBody.archived_by).not.toBeNull();
});

Then("verify archive Responsibility response has archived_on field", async () => {
	expect(responseBody.archived_on).not.toBeNull();
});

Then("verify de-activated Responsibility response has removed_by field", async () => {
	expect(responseBody.removed_by).not.toBeNull();
});

Then("verify de-activated Responsibility response has removed_on field", async () => {
	expect(responseBody.removed_on).not.toBeNull();
});

Then("verify retired responsibility response has removed_by field", async () => {
	expect(responseBody.removed_by).not.toBeNull();
});

Then("verify retired responsibility response has removed_on field", async () => {
	expect(responseBody.removed_on).not.toBeNull();
});

Then("user grants badge to the responsibility", async () => {
	const sharedEmployeeId = parseInt(getSharedData("employeeId"));
	response = await responsibilityApiCalls.grantBadgeToResponsibility(
		responsibilityId,
		2,
		sharedEmployeeId,
		responsibilityId,
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
	badgeId = responseBody.id;
});

When("user upgrades the badge using this API", async () => {
	const sharedEmployeeId = parseInt(getSharedData("employeeId"));
	const oldBadgeId = badgeId;
	response = await responsibilityApiCalls.createProficiencyBadge(sharedEmployeeId, responsibilityId, 3);
	responseBody = await response.json();
	badgeId = oldBadgeId;
});

Then("verify granted_by field is visible and has values in the response", async () => {
	expect(responseBody).toHaveProperty("issued_by");
	expect(responseBody.issued_by).not.toBeNull();

	expect(responseBody.issued_by).toHaveProperty("name");
	expect(responseBody.issued_by.name).not.toBeNull();

	expect(responseBody.issued_by).toHaveProperty("picture");
});

Then("verify issued_for field is visible and has values in the response", async () => {
	expect(responseBody).toHaveProperty("issued_for");
	expect(responseBody.issued_for).not.toBeNull();

	expect(responseBody.issued_for).toHaveProperty("name");
	expect(responseBody.issued_for.name).not.toBeNull();

	expect(responseBody.issued_for).toHaveProperty("code");
	expect(responseBody.issued_for.code).not.toBeNull();
	expect(typeof responseBody.issued_for.code).toBe("string");
});

Then("verify removed_by field is visible and has values in the response", async () => {
	expect(responseBody).toHaveProperty("removed_by");
	expect(responseBody.removed_by).not.toBeNull();

	expect(responseBody.removed_by).toHaveProperty("name");
	expect(responseBody.removed_by.name).not.toBeNull();

	expect(responseBody.removed_by).toHaveProperty("picture");
});

Then("verify active checkpoint count has value in response", async () => {
	response = await responsibilityApiCalls.getSpecificResponsibility(responsibilityId);
	responseBody = await response.json();
	expect(responseBody.active_checkpoints).toBeDefined();
	expect(responseBody.active_checkpoints).toBeGreaterThan(0);
});

Then("verify active checkpoint count is {int}", async (expectedCount: number) => {
	response = await responsibilityApiCalls.getSpecificResponsibility(responsibilityId);
	responseBody = await response.json();
	expect(responseBody.active_checkpoints).toBeDefined();
	expect(responseBody.active_checkpoints).toBe(expectedCount);
});

Then("verify draft checkpoint count is {int}", async (expectedCount: number) => {
	response = await responsibilityApiCalls.getSpecificResponsibility(responsibilityId);
	responseBody = await response.json();
	expect(responseBody.draft_checkpoints).toBeDefined();
	expect(responseBody.draft_checkpoints).toBe(expectedCount);
});

Then("verify retired checkpoint count is {int}", async (expectedCount: number) => {
	response = await responsibilityApiCalls.getSpecificResponsibility(responsibilityId);
	responseBody = await response.json();
	expect(responseBody.retired_checkpoints).toBeDefined();
	expect(responseBody.retired_checkpoints).toBe(expectedCount);
});

Then("verify checkpoint status counts are visible in response", async () => {
	response = await responsibilityApiCalls.getSpecificResponsibility(responsibilityId);
	responseBody = await response.json();
	expect(responseBody).toHaveProperty("active_checkpoints");
	expect(responseBody).toHaveProperty("draft_checkpoints");
	expect(responseBody).toHaveProperty("retired_checkpoints");
	expect(responseBody.active_checkpoints).toBeDefined();
	expect(responseBody.draft_checkpoints).toBeDefined();
	expect(responseBody.retired_checkpoints).toBeDefined();
});

Then("verify that the Coach field exists in the get reponsibility API", async () => {
	expect(responseBody.coaches).not.toBeNull();
});

Then("verify that the Masters field exists in the get reponsibility API", async () => {
	expect(responseBody.masters).not.toBeNull();
});

When("user assign role to responsibility via API", async function () {
	response = await responsibilityApiCalls.assignRoleToResponsibility(responsibilityId, roleId);
	await expect(response).toBeOK();
});

Then(
	/^User Call The account Catalogs List API and store (initial|final) not_attached_to_role count$/,
	async (phase) => {
		response = await roleApiCalls.getCatalogsList();
		await expect(response).toBeOK();
		responseBody = await response.json();
		const currentCount = responseBody.responsibilities.not_attached_to_role;
		if (phase === "initial") {
			initialNotAttachedToRoleCount = currentCount;
		} else {
			finalNotAttachedToRoleCount = currentCount;
		}
	},
);

Then("Verify that not_attached_to_role count has decreased", async () => {
	expect(finalNotAttachedToRoleCount).toBeLessThan(initialNotAttachedToRoleCount);
	expect(initialNotAttachedToRoleCount - finalNotAttachedToRoleCount).toBe(1);
});

Then("Verify that not_attached_to_role count has not increased", async () => {
	expect(finalNotAttachedToRoleCount).toBeLessThanOrEqual(initialNotAttachedToRoleCount);
});

Given("the user has OpenAI chat compleation", async () => {
	response = await responsibilityApiCalls.openAIchatCompletion();
	await expect(response).toBeOK();
	responseBody = await response.json();
});

When("the user calls the OpenAI chat compleation API", async () => {
	response = await responsibilityApiCalls.openAIchatCompletion();
	await expect(response).toBeOK();
	responseBody = await response.json();
});

Then("verify status for OpenAI chat completion API to be {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

When("the user calls AskOpenAI via API", async () => {
	response = await responsibilityApiCalls.askOpenAI();
	await expect(response).toBeOK();
	responseBody = await response.json();
});

Then("verify status for AskOpenAI chat completion API to be {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then("verify the v2 get responsibility API response structure", async () => {
	expect(responseBody).toHaveProperty("id");
	expect(responseBody).toHaveProperty("code");
	expect(responseBody).toHaveProperty("code_str");
	expect(responseBody).toHaveProperty("name");
	expect(responseBody).toHaveProperty("type");
	expect(responseBody).toHaveProperty("status");
	expect(responseBody).toHaveProperty("archived");
	expect(responseBody).toHaveProperty("description");
	expect(responseBody).toHaveProperty("avg_readiness");
	expect(responseBody).toHaveProperty("active_checkpoints_count");
	expect(responseBody).toHaveProperty("badges_count");
	expect(responseBody).toHaveProperty("assignments_count");
	expect(responseBody).toHaveProperty("role_attachments");
});

When("user calls the getAllResponsibilitiesV2 API", async function () {
	response = await responsibilityApiCalls.getAllResponsibilitiesV2();
	responseBody = await response.json();
	await expect(response).toBeOK();
});

When(
	"user calls the getAllResponsibilitiesV2 API with limit {int} and offset {int}",
	async function (limit: number, offset: number) {
		response = await responsibilityApiCalls.getAllResponsibilitiesV2(limit, offset);
		responseBody = await response.json();
		await expect(response).toBeOK();
	},
);

Then("verify the archived responsibility has archived true", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);
	const archivedResponsibility = responseBody.results.find(
		(resp: { id: number; archived: boolean }) => resp.id === responsibilityId,
	);
	expect(archivedResponsibility).toBeDefined();
	expect(archivedResponsibility.archived).toBe(true);
	expect(archivedResponsibility.id).toBe(responsibilityId);
});

Then("verify novice_assignment_count is {int}", async function (expectedCount: number) {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);
	const responsibility = responseBody.results.find((resp: { id: number }) => resp.id === responsibilityId);
	expect(responsibility).toBeDefined();
	expect(responsibility.novice_assignment_count).toBe(expectedCount);
});

Then("verify apprentice_assignment_count is {int}", async function (expectedCount: number) {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);
	const responsibility = responseBody.results.find((resp: { id: number }) => resp.id === responsibilityId);
	expect(responsibility).toBeDefined();
	expect(responsibility.apprentice_assignment_count).toBe(expectedCount);
});

Then("verify professional_assignment_count is {int}", async function (expectedCount: number) {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);
	const responsibility = responseBody.results.find((resp: { id: number }) => resp.id === responsibilityId);
	expect(responsibility).toBeDefined();
	expect(responsibility.professional_assignment_count).toBe(expectedCount);
});

Then("verify coach_assignment_count is {int}", async function (expectedCount: number) {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);
	const responsibility = responseBody.results.find((resp: { id: number }) => resp.id === responsibilityId);
	expect(responsibility).toBeDefined();
	expect(responsibility.coach_assignment_count).toBe(expectedCount);
});

Then("verify master_assignment_count is {int}", async function (expectedCount: number) {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);
	const responsibility = responseBody.results.find((resp: { id: number }) => resp.id === responsibilityId);
	expect(responsibility).toBeDefined();
	expect(responsibility.master_assignment_count).toBe(expectedCount);
});

When("user assign role to position via API", async function () {
	const sharedPositionId = parseInt(getSharedData("positionId"));
	response = await positionApiCalls.asignRoleToAPosition(sharedPositionId, roleId);
	responseBody = await response.json();
	await expect(response).toBeOK();
});

When("user calls the create badge for level {int} employee API", async function (level: number) {
	const sharedEmployeeId = parseInt(getSharedData("employeeId"));
	response = await employeeApiCalls.createProficiencyBadge(sharedEmployeeId, responsibilityId, level);

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

Given("user store the responsibility count", async function () {
	const sidebarResponse = JSON.parse(getSharedData("sidebarCountsResponse"));
	expect(sidebarResponse).toBeDefined();
	expect(sidebarResponse).toHaveProperty("responsibilities");
	storedResponsibilityCount = sidebarResponse.responsibilities;
});

Then("verify the responsibility count is same as the stored responsibility count", async function () {
	const sidebarResponse = JSON.parse(getSharedData("sidebarCountsResponse"));
	expect(sidebarResponse).toBeDefined();
	expect(sidebarResponse).toHaveProperty("responsibilities");
	expect(sidebarResponse.responsibilities).toBe(storedResponsibilityCount);
});

Then("verify the responsibility count is increased by 1", async function () {
	const sidebarResponse = JSON.parse(getSharedData("sidebarCountsResponse"));
	expect(sidebarResponse).toBeDefined();
	expect(sidebarResponse).toHaveProperty("responsibilities");
	expect(sidebarResponse.responsibilities).toBe(storedResponsibilityCount + 1);
});

Then("verify the responsibility count is decreased by 1", async function () {
	const sidebarResponse = JSON.parse(getSharedData("sidebarCountsResponse"));
	expect(sidebarResponse).toBeDefined();
	expect(sidebarResponse).toHaveProperty("responsibilities");
	expect(sidebarResponse.responsibilities).toBe(storedResponsibilityCount);
});

Then("verify the response contains exactly {int} records", async function (expectedCount: number) {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);
	expect(responseBody.results.length).toBe(expectedCount);
});

Then("verify the response contains at most {int} records", async function (maxCount: number) {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);
	expect(responseBody.results.length).toBeLessThanOrEqual(maxCount);
	expect(responseBody.results.length).toBeGreaterThanOrEqual(0);
});

Then("verify the response contains pagination metadata", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("count");
	expect(responseBody).toHaveProperty("next");
	expect(responseBody).toHaveProperty("previous");
	expect(typeof responseBody.count).toBe("number");
	expect(typeof responseBody.next === "string" || responseBody.next === null).toBe(true);
	expect(typeof responseBody.previous === "string" || responseBody.previous === null).toBe(true);
});

Then("verify the response count matches the total number of responsibilities", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("count");
	expect(responseBody.count).toBeGreaterThan(0);
});

Then("verify the response contains different records than the previous request", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);

	if (responseBody.results.length > 0) {
		const currentIds = responseBody.results.map((item: { id: number }) => item.id);
		expect(currentIds.length).toBeGreaterThan(0);
	}
});

Then("verify the response contains no records when offset exceeds total count", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);
	expect(responseBody.results.length).toBe(0);
});

When("user calls the responsibility API with {string} filter", async function (filterType: string) {
	let noMasters: boolean | undefined;
	let noCoaches: boolean | undefined;
	let noProfessionals: boolean | undefined;

	switch (filterType) {
		case "no_masters":
			noMasters = true;
			break;
		case "no_coaches":
			noCoaches = true;
			break;
		case "no_professionals":
			noProfessionals = true;
			break;
		default:
			throw new Error(`Unsupported filter type: ${filterType}`);
	}

	response = await responsibilityApiCalls.getResponsibilitiesFilteredByBadgeLevel(
		noMasters,
		noCoaches,
		noProfessionals,
		undefined,
		undefined,
	);
	responseBody = await response.json();
	await expect(response).toBeOK();
});

Then("verify only responsibilities without {string} are returned", async function (badgeLevel: string) {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);

	if (responseBody.results.length > 0) {
		for (const responsibility of responseBody.results) {
			expect(responsibility).toBeDefined();
			expect(responsibility).toHaveProperty("id");
			expect(responsibility).toHaveProperty("name");
			expect(responsibility).toHaveProperty("status");

			switch (badgeLevel.toLowerCase()) {
				case "masters":
					expect(responsibility).toHaveProperty("masters");
					expect(Array.isArray(responsibility.masters)).toBe(true);
					expect(responsibility.masters.length).toBe(0);
					break;
				case "coaches":
					expect(responsibility).toHaveProperty("coaches");
					expect(Array.isArray(responsibility.coaches)).toBe(true);
					expect(responsibility.coaches.length).toBe(0);
					break;
				case "professionals":
					expect(responsibility).toHaveProperty("professional_assignment_count");
					expect(typeof responsibility.professional_assignment_count).toBe("number");
					expect(responsibility.professional_assignment_count).toBe(0);
					break;
				default:
					throw new Error(`Unsupported badge level: ${badgeLevel}`);
			}
		}
	}
});

When("filtering by {string}", async function (archivalFilter: string) {
	let archived: boolean | undefined;

	switch (archivalFilter) {
		case "?archived=true":
			archived = true;
			break;
		case "?archived=false":
			archived = false;
			break;
		default:
			throw new Error(`Unsupported archival filter: ${archivalFilter}`);
	}

	setSharedData("expectedArchivedStatus", archived.toString());

	response = await responsibilityApiCalls.getResponsibilitiesFilteredByBadgeLevel(
		undefined,
		undefined,
		undefined,
		archived,
		undefined,
		undefined,
		undefined,
		undefined,
	);
	responseBody = await response.json();
	await expect(response).toBeOK();
});

Then("only responsibilities matching the archival state are returned", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);
	const expectedArchivedStatusStr = getSharedData("expectedArchivedStatus");
	expect(expectedArchivedStatusStr).toBeDefined();
	const expectedArchivedStatus = expectedArchivedStatusStr === "true";

	if (responseBody.results.length > 0) {
		for (const responsibility of responseBody.results) {
			expect(responsibility).toBeDefined();
			expect(responsibility).toHaveProperty("id");
			expect(responsibility).toHaveProperty("name");
			expect(responsibility).toHaveProperty("archived");
			expect(typeof responsibility.archived).toBe("boolean");
			expect(responsibility.archived).toBe(expectedArchivedStatus);
		}
	}
});

When("filtering responsibilities by {string}", async function (attachmentFilter: string) {
	let attachments: string | undefined;

	switch (attachmentFilter) {
		case "?attachments=no":
			attachments = "no";
			break;
		default:
			throw new Error(`Unsupported attachment filter: ${attachmentFilter}`);
	}

	response = await responsibilityApiCalls.getResponsibilitiesFilteredByBadgeLevel(
		undefined,
		undefined,
		undefined,
		undefined,
		attachments,
		undefined,
		undefined,
		undefined,
	);
	responseBody = await response.json();
	await expect(response).toBeOK();
});

Then("only responsibilities with no role attachments are returned", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);

	if (responseBody.results.length > 0) {
		for (const responsibility of responseBody.results) {
			expect(responsibility).toBeDefined();
			expect(responsibility).toHaveProperty("id");
			expect(responsibility).toHaveProperty("name");
			expect(responsibility).toHaveProperty("count_role_attachments");
			expect(typeof responsibility.count_role_attachments).toBe("number");
			expect(responsibility.count_role_attachments).toBe(0);
		}
	}
});

When("filtering responsibilities by recent status {string}", async function (recentStatusFilter: string) {
	let recentlyActivated: boolean | undefined;
	let recentlyRetired: boolean | undefined;
	let recentlyDeactivated: boolean | undefined;
	let newRoleForTest: RolesData;
	let testResponsibilityId: number;
	let responsibilityIdToRetire: number;
	let responsibilityIdToDeactivate: number;

	switch (recentStatusFilter) {
		case "?recently_activated=true":
			recentlyActivated = true;
			newRoleForTest = getRandomRole();
			response = await responsibilityApiCalls.createResponsibility(newRoleForTest.name, "draft");
			responseBody = await response.json();
			testResponsibilityId = responseBody.id;
			response = await responsibilityApiCalls.activateResponsibility(testResponsibilityId);
			responseBody = await response.json();
			setSharedData("testResponsibilityId", testResponsibilityId.toString());
			setSharedData("testResponsibilityName", newRoleForTest.name);
			break;
		case "?recently_retired=true":
			recentlyRetired = true;
			responsibilityIdToRetire = parseInt(getSharedData("testResponsibilityId"));
			response = await responsibilityApiCalls.retiredResponsibility(responsibilityIdToRetire);
			responseBody = await response.json();
			break;
		case "?recently_deactivated=true":
			recentlyDeactivated = true;
			responsibilityIdToDeactivate = parseInt(getSharedData("testResponsibilityId"));
			response = await responsibilityApiCalls.reActivateResponsibility(responsibilityIdToDeactivate);
			responseBody = await response.json();
			response = await responsibilityApiCalls.deActivateResponsibility(responsibilityIdToDeactivate);
			responseBody = await response.json();
			break;
		default:
			throw new Error(`Unsupported recent status filter: ${recentStatusFilter}`);
	}

	setSharedData("recentStatusFilter", recentStatusFilter);

	response = await responsibilityApiCalls.getResponsibilitiesFilteredByBadgeLevel(
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		recentlyActivated,
		recentlyRetired,
		recentlyDeactivated,
	);
	responseBody = await response.json();
	await expect(response).toBeOK();
});

Then("only responsibilities with the relevant status", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);
	const recentStatusFilter = getSharedData("recentStatusFilter");
	expect(recentStatusFilter).toBeDefined();
	const testResponsibilityId = parseInt(getSharedData("testResponsibilityId"));
	const testResponsibilityName = getSharedData("testResponsibilityName");
	expect(testResponsibilityId).toBeDefined();
	expect(testResponsibilityName).toBeDefined();

	foundOurResponsibility = false;

	if (responseBody.results.length > 0) {
		for (let i = 0; i < responseBody.results.length; i++) {
			const responsibility = responseBody.results[i];

			expect(responsibility).toBeDefined();
			expect(responsibility).toHaveProperty("id");
			expect(responsibility).toHaveProperty("name");
			expect(responsibility).toHaveProperty("status");

			if (responsibility.id === testResponsibilityId) {
				foundOurResponsibility = true;
				expect(responsibility.name).toBe(testResponsibilityName);
			}

			switch (recentStatusFilter) {
				case "?recently_activated=true":
					expect(responsibility.status).toBe("active");
					break;
				case "?recently_retired=true":
					expect(responsibility.status).toBe("retired");
					break;
				case "?recently_deactivated=true":
					expect(responsibility.status).toBe("inactive");
					break;
				default:
					throw new Error(`Unsupported recent status filter: ${recentStatusFilter}`);
			}
		}
	}

	expect(foundOurResponsibility).toBe(true);
});

When("user calls the getResponsibilities API with query params {string}", async function (queryParams: string) {
	const actualResponsibilityName = getSharedData("responsibilityName");
	expect(actualResponsibilityName).toBeDefined();
	
	const dynamicQueryParams = `?name=${encodeURIComponent(actualResponsibilityName)}`;
	console.log("Original query params:", queryParams);
	
	response = await responsibilityApiCalls.getResponsibilitiesWithQueryParams(dynamicQueryParams);
	responseBody = await response.json();
	await expect(response).toBeOK();
});

Then("verify the responsibility name is found in the response", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);
	expect(responseBody.results.length).toBeGreaterThan(0);

	const createdResponsibilityName = getSharedData("responsibilityName");
	expect(createdResponsibilityName).toBeDefined();

	const createdResponsibility = responseBody.results.find((responsibility: { name: string }) => 
		responsibility.name === createdResponsibilityName
	);

	if (createdResponsibility) {

		expect(createdResponsibility).toHaveProperty("name");
		expect(createdResponsibility).toHaveProperty("code_str");
		expect(createdResponsibility).toHaveProperty("status");
		expect(createdResponsibility.status).toBe("active");
		
		const queryParams = getSharedData("lastQueryParams");
		if (queryParams) {
			const nameMatch = queryParams.match(/name=([^&]+)/);
			if (nameMatch) {
				const searchTerm = decodeURIComponent(nameMatch[1]);
				console.log("Search term used:", searchTerm);
				
				const nameContains = createdResponsibility.name && createdResponsibility.name.includes(searchTerm);
				const codeStrContains = createdResponsibility.code_str && createdResponsibility.code_str.includes(searchTerm);
				expect(nameContains || codeStrContains).toBe(true);
			}
		}
	}
});

export { responsibilityId, responsibilityIds, newRole };
