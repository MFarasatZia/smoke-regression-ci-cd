import { Given, Then, When } from "@cucumber/cucumber";
import { RolesData, getRandomRole, getRandomPhrase } from "../../helpers/util/random";
import { baseInstance } from "../../helpers/BaseClass";
import ResponsibilityApis from "../../apis/owner/responsibility";
import { expect } from "@playwright/test";
import RolesApis from "../../apis/owner/roles";
import PositionApis from "../../apis/owner/position";
import { responsibilityId, responsibilityIds } from "./readinessCatalogsResponsibilitiesApiSteps";
import { checkpointResponsibilityId } from "./checkpointApiSteps";
import { setSharedData, getSharedData } from "../../helpers/util/sharedData";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let response: any, responseBody: any;
let note: string;
let id: number;
let positionId: number;
let roleId: number;
let positionName: string;
let clonedPositionId: number;
let roleIds: number[] = [];
let storedRoleCount: number;
const apiRoleData: RolesData = getRandomRole();
const newRole: RolesData = getRandomRole();
const responsibilityApiCalls: ResponsibilityApis = new ResponsibilityApis(baseInstance);
const newRoles: RolesApis = new RolesApis(baseInstance);
const newPosition: PositionApis = new PositionApis(baseInstance);

When("User create a new role via api", async () => {
	response = await newRoles.createRole(apiRoleData.name, apiRoleData.description, "draft");
	responseBody = await response.json();
});

Then("User get the response body", async () => {
	console.log(responseBody);
});
Then("User return role id", async () => {
	expect(responseBody.id).not.toBeNull();
});

Then("verify that role is in status draft", async () => {
	expect(responseBody.status).toContain("draft");
});

Given("user have the rights to access roles", async () => {
	const updateRoleData: RolesData = getRandomRole();
	apiRoleData.name = updateRoleData.name;
	apiRoleData.description = updateRoleData.description;
	response = await newRoles.createRole(apiRoleData.name, apiRoleData.description, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
});

When("User call the API get all roles for an account", async () => {
	response = await newRoles.getRoles();
	responseBody = await response.json();
	console.log("Response Body:", responseBody);
});

Then("verify the role response parameters structure", async () => {
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
	}
});

Then("User receive the list of roles under the account", async () => {
	expect(responseBody.count).not.toContain(0);
});

When("User call the API get all roles for a position", async () => {
	response = await newPosition.createNewPosition(apiRoleData.name, "draft");
	responseBody = await response.json();
	const positionId = responseBody.id;
	response = await newRoles.getPositionRoles(positionId);
	responseBody = await response.json();
});

Then("User receive the list of roles under the position", async () => {
	expect(responseBody.count).not.toContain(0);
});

When("User activate role via API", async function () {
	response = await newRoles.activateRole(id);
	responseBody = await response.json();
});

Then("User call the activate role API", async function () {
	response = await newRoles.activateRoleWithActivateResponsibility(id);
	responseBody = await response.json();
	console.log(responseBody);
});

Then(/^verify role was activated$/, function () {
	expect(responseBody.status).toContain("active");
});

Given("that role is in status active", async () => {
	const updatApiRoleData: RolesData = getRandomRole();
	apiRoleData.name = updatApiRoleData.name;
	apiRoleData.description = updatApiRoleData.description;

	response = await newRoles.createRole(apiRoleData.name, apiRoleData.description, "draft");
	responseBody = await response.json();
	id = await responseBody.id;

	response = await newRoles.activateRole(id);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");
	id = await responseBody.id;
	console.log("Activate Role:", responseBody);
});

When("User retire role via API", async () => {
	response = await newRoles.retiredRole(id);
	responseBody = await response.json();
});

Then("verify role was retired", async () => {
	expect(responseBody.status).toBe("retired");
});

Given("that role is NOT in status active", async () => {
	const updateRoleData: RolesData = getRandomRole();
	apiRoleData.name = updateRoleData.name;
	apiRoleData.description = updateRoleData.description;

	response = await newRoles.createRole(apiRoleData.name, apiRoleData.description, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
});

Given("that the role is NOT in status active", async () => {
	const updateRoleData: RolesData = getRandomRole();
	apiRoleData.name = updateRoleData.name;
	apiRoleData.description = updateRoleData.description;

	response = await newRoles.createRole(apiRoleData.name, apiRoleData.description, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
});

Given("that role is in status Retired", async () => {
	const updatApiRoleData: RolesData = getRandomRole();
	apiRoleData.name = updatApiRoleData.name;
	apiRoleData.description = updatApiRoleData.description;
	response = await newRoles.createRole(apiRoleData.name, apiRoleData.description, "draft");
	responseBody = await response.json();
	id = await responseBody.id;

	response = await newRoles.activateRole(id);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");
	id = await responseBody.id;

	response = await newRoles.retiredRole(id);
	responseBody = await response.json();
	expect(responseBody.status).toBe("retired");
});

Then("retire role API return error", async () => {
	await expect(response).not.toBeOK();
});

Then("Verify the response error to be {string}", async (error: string) => {
	const errorMessage =
		responseBody.message || responseBody.detail || responseBody.error || JSON.stringify(responseBody);
	await expect(errorMessage).toContain(error);
});

Then("Verify that Response Body status is {string}", async (status: string) => {
	await expect(responseBody.status).toBe(status);
});

Then("Re-Actiavte role API return error", async () => {
	await expect(response).not.toBeOK();
});

When("the role is NOT in status draft", async () => {
	response = await newRoles.createRole(apiRoleData.name, apiRoleData.description, "draft");
	responseBody = await response.json();
	id = await responseBody.id;

	response = await newRoles.activateRole(id);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");
});

When("user role is not attached to anything", async () => {
	const length = responseBody.attachments.length;
	expect(length).toBe(0);
});

Then("user delete role via API", async () => {
	response = await newRoles.deleteRole(id);
});

Then("User Verify the return success is {int}", async (status: string) => {
	expect(response.status()).toBe(status);
});

Then("verify role was deleted from the database", async () => {
	response = await newRoles.getRoles();
	responseBody = await response.json();
	const allRoles = await responseBody.results;
	for (const role of allRoles) {
		expect(role.id).not.toBe(id);
	}
});

When("Draft role is attached to the position", async () => {
	const updateRoleData: RolesData = getRandomRole();
	apiRoleData.name = updateRoleData.name;
	apiRoleData.description = updateRoleData.description;

	response = await newRoles.createRole(apiRoleData.name, apiRoleData.description, "draft");
	responseBody = await response.json();
	id = await responseBody.id;
	const updatedRoleData: RolesData = getRandomRole();
	apiRoleData.name = updatedRoleData.name;
	apiRoleData.description = updatedRoleData.description;
	response = await newPosition.createNewPosition(apiRoleData.name, "draft");
	responseBody = await response.json();
	positionId = responseBody.id;

	response = await newRoles.attachRoleToPosition(id, positionId);
});

When("Active role is attached to the position", async () => {
	const updateRoleData: RolesData = getRandomRole();
	apiRoleData.name = updateRoleData.name;
	apiRoleData.description = updateRoleData.description;

	response = await newRoles.createRole(apiRoleData.name, apiRoleData.description, "draft");
	responseBody = await response.json();
	id = await responseBody.id;

	const updatedRoleData: RolesData = getRandomRole();
	apiRoleData.name = updatedRoleData.name;
	apiRoleData.description = updatedRoleData.description;

	response = await newRoles.activateRole(id);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");

	response = await newPosition.createNewPosition(apiRoleData.name, "draft");
	responseBody = await response.json();
	positionId = responseBody.id;

	response = await newRoles.activateRole(id);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");

	response = await newRoles.attachRoleToPosition(id, positionId);
});

When("detach API to detach a {string} role from a position", async function (roleType: string) {
	switch (roleType.toLowerCase()) {
		case "attached":
			response = await newRoles.detachRoleFromPosition(positionId, roleId);
			console.log("Detach response:", response);
			break;
	}
});

Then("Verify that the status is active", async function () {
	await expect(responseBody.status).toBe("active");
});

Given("role is attached to the {string} position", async (status: string) => {
	const updateRoleData: RolesData = getRandomRole();
	apiRoleData.name = updateRoleData.name;
	apiRoleData.description = updateRoleData.description;

	response = await newRoles.createRole(apiRoleData.name, apiRoleData.description, "draft");
	responseBody = await response.json();
	id = await responseBody.id;
	const updatedRoleData: RolesData = getRandomRole();
	apiRoleData.name = updatedRoleData.name;
	apiRoleData.description = updatedRoleData.description;
	response = await newPosition.createNewPosition(apiRoleData.name, "draft");
	responseBody = await response.json();
	const positionId = responseBody.id;
	if (status === "Active") {
		response = newPosition.activatePosition(positionId);
	} else if (status === "Inactive") {
		response = newPosition.activatePosition(positionId);
	} else if (status === "Retire") {
		response = newPosition.activatePosition(positionId);
	}
	response = await newRoles.attachRoleToPosition(id, positionId);
	await expect(response).toBeOK();
});

Given("role is attached to the clone position", async () => {
	const updateRoleData: RolesData = getRandomRole();
	apiRoleData.name = updateRoleData.name;
	apiRoleData.description = updateRoleData.description;

	response = await newRoles.createRole(apiRoleData.name, apiRoleData.description, "draft");
	responseBody = await response.json();
	id = await responseBody.id;
	const updatedRoleData: RolesData = getRandomRole();
	apiRoleData.name = updatedRoleData.name;
	apiRoleData.description = updatedRoleData.description;
	response = await newPosition.createNewPosition(apiRoleData.name, "draft");
	responseBody = await response.json();
	const positionId = responseBody.id;
	positionName = responseBody.name;
	response = await newPosition.clonePosition(positionId, positionName);
	responseBody = await response.json();
	clonedPositionId = responseBody.id;
	response = await newRoles.attachRoleToPosition(id, clonedPositionId);
	await expect(response).toBeOK();
});

Given("that role is not in status draft", async () => {
	const updateRoleData: RolesData = getRandomRole();
	apiRoleData.name = updateRoleData.name;
	apiRoleData.description = updateRoleData.description;

	response = await newRoles.createRole(apiRoleData.name, apiRoleData.description, "draft");
	responseBody = await response.json();
	id = await responseBody.id;

	response = await newRoles.activateRole(id);
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");
});

When("User delete the role", async () => {
	response = await newRoles.deleteRole(id);
	console.log("response body after delete the role is: ", response);
});

When("user  delete", async () => {
	response = await newRoles.deleteRole(id);
});

Given("Roles is Attached to Position", async () => {
	const updateRoleData: RolesData = getRandomRole();
	apiRoleData.name = updateRoleData.name;
	apiRoleData.description = updateRoleData.description;

	response = await newRoles.createRole(apiRoleData.name, apiRoleData.description, "draft");
	responseBody = await response.json();
	id = await responseBody.id;
	response = await newPosition.createNewPosition(apiRoleData.name, "draft");
	responseBody = await response.json();
	const positionId = responseBody.id;

	response = await newRoles.attachRoleToPosition(id, positionId);
	await expect(response).toBeOK();
});

Then("return error \"role is attached\"", async () => {
	responseBody = await response.json();
	expect(responseBody).toContain("role is attached");
});

When("role is in status draft", async () => {
	const updateRoleData: RolesData = getRandomRole();
	apiRoleData.name = updateRoleData.name;
	apiRoleData.description = updateRoleData.description;

	response = await newRoles.createRole(apiRoleData.name, apiRoleData.description, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toContain("draft");
	id = responseBody.id;
});

Then("you create a new role", async function () {
	response = await newRoles.createRole(apiRoleData.name, apiRoleData.description, "draft");
	responseBody = await response.json();
});

Given("that a role is not in status {string}", async function (status: string) {
	if (status === "Active" || status === "Inactive" || status === "Retired") {
		const updatApiRoleData: RolesData = getRandomRole();
		apiRoleData.name = updatApiRoleData.name;
		apiRoleData.description = updatApiRoleData.description;

		this.response = await newRoles.createRole(apiRoleData.name, apiRoleData.description, "draft");
		responseBody = await this.response.json();
		id = await responseBody.id;
		expect(responseBody.status).toBe("draft");
	} else if (status === "Draft") {
		const updatApiRoleData: RolesData = getRandomRole();
		apiRoleData.name = updatApiRoleData.name;
		apiRoleData.description = updatApiRoleData.description;

		response = await newRoles.createRole(apiRoleData.name, apiRoleData.description, "draft");
		responseBody = await response.json();
		id = await responseBody.id;

		response = await newRoles.activateRole(id);
		responseBody = await response.json();
		expect(responseBody.status).toBe("active");
	}
});

Given("that a role is in status {string}", async (status: string) => {
	const roleData: RolesData = getRandomRole();

	apiRoleData.name = roleData.name;
	apiRoleData.description = roleData.description;

	response = await newRoles.createRole(roleData.name, roleData.description, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	const roleId = responseBody.id;
	id = roleId;
	roleIds.push(roleId);
	setSharedData("roleId", roleId.toString());
	setSharedData("roleName", roleData.name);

	if (status === "Active") {
		response = await newRoles.activateRole(roleId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("active");
	} else if (status === "Inactive" || status === "Deactivate" || status === "De-activate") {
		response = await newRoles.activateRole(roleId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("active");
		response = await newRoles.deActivateRole(roleId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("inactive");
	} else if (status === "Retired") {
		response = await newRoles.activateRole(roleId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("active");
		response = await newRoles.retiredRole(roleId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("retired");
	}
});

When("user calls the bulk Role {string} action API", async (action: string) => {
	response = await newRoles.bulkActionRoles(action, roleIds, true);
});

When("user {string} the role via API", async function (status: string) {
	if (status === "Activate") {
		response = await newRoles.activateRole(id);
		responseBody = await response.json();
		console.log("active response error:", responseBody);
	} else if (status === "De-activate") {
		response = await newRoles.deActivateRole(id);
		responseBody = await response.json();
		console.log("De-active response error:", responseBody);
	} else if (status === "Re-activate") {
		response = await newRoles.reActivateRole(id);
		responseBody = await response.json();
	} else if (status === "Retired") {
		response = await newRoles.retiredRole(id);
		console.log("Retired response error:", responseBody);
		responseBody = await response.json();
	} else if (status === "Delete") {
		response = await newRoles.deleteRole(id);
		if (response.status() === 400) {
			responseBody = await response.json();
		}
	} else if (status === "delete") {
		response = await newRoles.deleteAttachedRole(id);
		if (response.status() === 400) {
			responseBody = await response.json();
		}
	}
});

Then("verify the status for role to be {int}", async function (statusCode) {
	expect(response.status()).toBe(statusCode);
});

Then("role response status should be {string}", async function (status) {
	const statusText = status.toLowerCase();
	expect(responseBody.status).toBe(statusText);
});

Then("role response status should {string}", async function (status) {
	expect(responseBody.message).toBe(status);
});

Then("role response should be {string}", async function (responseMsg) {
	if (responseBody.message) {
		expect(responseBody.message).toContain(responseMsg);
	} else {
		expect(responseBody[0]).toContain(responseMsg);
	}
});

Given("attached to the Position", async () => {
	const updatApiRoleData: RolesData = getRandomRole();
	apiRoleData.name = updatApiRoleData.name;
	apiRoleData.description = updatApiRoleData.description;

	response = await newPosition.createNewPosition(apiRoleData.name, "draft");
	responseBody = await response.json();
	const positionId = responseBody.id;

	response = await newRoles.attachRoleToPosition(id, positionId);
	await expect(response).toBeOK();
});

When("User post to role chatter", async function () {
	note = getRandomPhrase();
	response = await newRoles.postToChatter(id, note, "user", true);
});

Then("User return response for Role status to be {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then("User get the note for role", async function () {
	responseBody = await response.json();
	expect(responseBody.note).toEqual(note);
});

Given("that a role has {int} posts to chatter", async function (chatters: number) {
	const updatApiRoleData: RolesData = getRandomRole();
	apiRoleData.name = updatApiRoleData.name;
	apiRoleData.description = updatApiRoleData.description;

	this.response = await newRoles.createRole(apiRoleData.name, apiRoleData.description, "draft");
	responseBody = await this.response.json();
	id = await responseBody.id;

	const baseNote = getRandomPhrase();
	for (let i = 0; i < chatters; i++) {
		const note = `${baseNote} ${i}`;
		const response = await newRoles.postToChatter(id, note, "role", true);
		await expect(response).toBeOK();
	}
});

When("user calls the chatter list API for the role", async function () {
	response = await newRoles.listRoleChatter(id);
});

Then("verify the status for Role Chatter list to be {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
	responseBody = await response.json();
});

Then("count of entries for the role chatter should be {int}", async function (chatterEntries: number) {
	expect(responseBody.results.length).toBe(chatterEntries);
});

Then("count of total role chatter should be {int}", async function (count: number) {
	expect(responseBody.count).toBe(count);
});

Given("the Roles with different statuses", async function () {
	const statusesList = ["draft", "Active", "De-activate", "Retired"];
	const roles = [];

	for (const status of statusesList) {
		const updatApiRoleData: RolesData = getRandomRole();
		apiRoleData.name = updatApiRoleData.name;
		apiRoleData.description = updatApiRoleData.description;

		this.response = await newRoles.createRole(apiRoleData.name, apiRoleData.description, "draft");
		responseBody = await this.response.json();
		id = await responseBody.id;

		console.log(`Role created with ID: ${id} and initial status: draft`);

		if (status === "Active") {
			response = await newRoles.activateRole(id);
			responseBody = await response.json();
			expect(responseBody.status).toBe("active");
			console.log(`Role ID: ${id} updated to status: active`);
		} else if (status === "De-activate") {
			let response = await newRoles.activateRole(id);
			responseBody = await response.json();
			expect(responseBody.status).toBe("active");
			console.log(`Role ID: ${id} updated to status: active`);

			response = await newRoles.deActivateRole(id);
			responseBody = await response.json();
			expect(responseBody.status).toBe("inactive");
			console.log(`Role ID: ${id} updated to status: inactive`);
		} else if (status === "Retired") {
			let response = await newRoles.activateRole(id);
			responseBody = await response.json();
			expect(responseBody.status).toBe("active");
			console.log(`Role ID: ${id} updated to status: active`);

			response = await newRoles.retiredRole(id);
			responseBody = await response.json();
			expect(responseBody.status).toBe("retired");
			console.log(`Role ID: ${id} updated to status: retired`);
		}

		roles.push({ id, status });
	}
	this.roles = roles;
	console.log("All created roles with statuses:", this.roles);
});

Given("the Role with different statuses created {int} times", async function (iterations: number) {
	const statusesList = ["draft", "Active", "De-activate", "Retired"];
	const roles = [];

	for (let i = 0; i < iterations; i++) {
		for (const status of statusesList) {
			const updatApiRoleData: RolesData = getRandomRole();
			apiRoleData.name = updatApiRoleData.name;
			apiRoleData.description = updatApiRoleData.description;

			this.response = await newRoles.createRole(apiRoleData.name, apiRoleData.description, "draft");
			responseBody = await this.response.json();
			id = await responseBody.id;

			console.log(`Role created with ID: ${id} and initial status: draft`);

			if (status === "Active") {
				response = await newRoles.activateRole(id);
				responseBody = await response.json();
				expect(responseBody.status).toBe("active");
				console.log(`Role ID: ${id} updated to status: active`);
			} else if (status === "De-activate") {
				let response = await newRoles.activateRole(id);
				responseBody = await response.json();
				expect(responseBody.status).toBe("active");
				console.log(`Role ID: ${id} updated to status: active`);

				response = await newRoles.deActivateRole(id);
				responseBody = await response.json();
				expect(responseBody.status).toBe("inactive");
				console.log(`Role ID: ${id} updated to status: inactive`);
			} else if (status === "Retired") {
				let response = await newRoles.activateRole(id);
				responseBody = await response.json();
				expect(responseBody.status).toBe("active");
				console.log(`Role ID: ${id} updated to status: active`);

				response = await newRoles.retiredRole(id);
				responseBody = await response.json();
				expect(responseBody.status).toBe("retired");
				console.log(`Role ID: ${id} updated to status: retired`);
			}

			roles.push({ id, status });
		}
	}
	this.roles = roles;

	console.log("All created roles with statuses:", this.roles);
});

Given("role is attached to Responsibility", async () => {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.createResponsibility(updateNewRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	const responsibilityId = responseBody.id;

	response = await responsibilityApiCalls.assignRoleToResponsibility(responsibilityId, id);

	await expect(response).toBeOK();
});

Given("role is attached to responsibility with checklist", async () => {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.assignRoleToResponsibility(checkpointResponsibilityId, id);

	await expect(response).toBeOK();
});

Given("active role is attached to Responsibility", async () => {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.createResponsibility(updateNewRole.name, "active");
	responseBody = await response.json();
	expect(responseBody.status).toBe("active");
	const responsibilityId = responseBody.id;

	response = await responsibilityApiCalls.assignRoleToResponsibility(responsibilityId, id);

	await expect(response).toBeOK();
});

When("user calls the attach responsibility to role API", async function () {
	response = await responsibilityApiCalls.assignRoleToResponsibility(responsibilityId, roleIds[0]);
});

When("user attaches the responsibility to the active role", async function () {
	response = await responsibilityApiCalls.assignRoleToResponsibility(responsibilityId, id);
	await expect(response).toBeOK();
});

Then("verify the response for the attach responsibility to role API is {int}", async function (statusCode: number) {
	responseBody = await response.json();
	expect(response.status()).toBe(statusCode);
});

Then(
	"verify the responseBody for the attach responsibility to role API contains the attachment details",
	async function () {
		responseBody = await response.json();
		const attachment = responseBody.attachments[0];
		const attachmentsCount = responseBody.attachments_count.responsibility;
		expect(attachment.type).toBe("responsibility");
		expect(attachment.id).toBe(responsibilityId);
		expect(attachmentsCount).toBe(1);
	},
);

When(
	"user calls the detach API to detach a {string} responsibility from a role",
	async function (responsibilityType: string) {
		switch (responsibilityType.toLowerCase()) {
			case "attached":
			case "detached":
				response = await newRoles.detachResponsibilityFromRole(id, responsibilityId);
				break;
			case "nonexistent":
				response = await newRoles.detachResponsibilityFromRole(id, 5555);
		}
	},
);

Then(
	"verify the responseBody for the detach responsibility from role API doesn't contain the attachment details",
	async function () {
		responseBody = await response.json();
		expect(responseBody.attachments.length).toBe(0);
		const attachment = responseBody.attachments[0];
		expect(attachment).toBeUndefined();
		const attachmentsCount = responseBody.attachments_count.role;
		expect(attachmentsCount).toBeUndefined();
	},
);

Then("verify error message for detach responsibility from role API is {string}", async function (errorText: string) {
	responseBody = await response.json();
	const actualMessage =
		responseBody.message || responseBody.detail || responseBody.error || JSON.stringify(responseBody);
	expect(actualMessage).toContain(errorText);
});

When("user get the specific role by id", async () => {
	response = await newRoles.getRolesById(id);
	await expect(response).toBeOK();
	responseBody = await response.json();
});

Then("response should contain the attached responsibility details", async () => {
	expect(responseBody.attachments).toHaveLength(1);
	const attachment = responseBody.attachments[0];

	expect(attachment.type).toBe("responsibility");
	expect(attachment.checkpoint_count).toBe(0);
	expect(attachment.attached_to).toBeDefined();

	expect(attachment.attached_to.type).toBe("role");
	expect(attachment.attached_to.id).toBe(id);
	expect(attachment.assignments_count).toBe(0);

	expect(attachment.status).toBe("draft");
});

When("user calls the archive role API", async function () {
	response = await newRoles.archiveRole(id);
});

When("user calls the unarchive role API", async function () {
	response = await newRoles.unarchiveRole(id);
});

Then("verify status for archive role API to be {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then("verify the role is archived", async function () {
	responseBody = await response.json();
	expect(responseBody.archived).toBe(true);
});

Then("verify the role is unarchived", async function () {
	responseBody = await response.json();
	expect(responseBody.archived).toBe(false);
});

Then("verify the error message for the archive role api to be {string}", async function (errorText: string) {
	responseBody = await response.json();
	expect(responseBody.message).toContain(errorText);
});

Then("verify Role response has activated_by field", async () => {
	expect(responseBody.activated_by).not.toBeNull();
});

Then("verify Role response has activated_on field", async () => {
	expect(responseBody.activated_on).not.toBeNull();
});

Then("verify archive Role response has archived_by field", async () => {
	expect(responseBody.archived_by).not.toBeNull();
});

Then("verify archive Role response has archived_on field", async () => {
	expect(responseBody.archived_on).not.toBeNull();
});

Then("verify de-activated Role response has removed_by field", async () => {
	expect(responseBody.removed_by).not.toBeNull();
});

Then("verify de-activated Role response has removed_on field", async () => {
	expect(responseBody.removed_on).not.toBeNull();
});

Then("verify retired role response has removed_by field", async () => {
	expect(responseBody.removed_by).not.toBeNull();
});

Then("verify retired role response has removed_on field", async () => {
	expect(responseBody.removed_on).not.toBeNull();
});

Then("verify the draft role is deleted with associated draft responsibilities", async () => {
	await expect(response).toBeOK();
});

When("the user attach responsibility to role via api", async () => {
	response = await newRoles.RoletoResponsibility(id);
});

Then("verify the draft role is deleted with associated active responsibilities", async () => {
	await expect(response).toBeOK();
});

Given("clear role IDs for bulk testing", async () => {
	roleIds = [];
	responsibilityIds.length = 0;
});

Then("verify the bulk Role {string} action API returns {int}", async (action: string, statusCode: number) => {
	const expectedCode = action.toLowerCase() === "delete" && statusCode === 200 ? 204 : statusCode;
	expect(response.status()).toBe(expectedCode);
});

Then("verify bulk {string} response contains role details", async (action: string) => {
	if (action.toLowerCase() === "activate") {
		expect(responseBody.id).toBeDefined();
		expect(roleIds).toContain(responseBody.id);
		response = await newRoles.getRole(responseBody.id);
		responseBody = await response.json();
		expect(responseBody.status).toBe("active");
	} else {
		const results = responseBody.results;
		expect(results.length).toBe(roleIds.length);
		for (let i = 0; i < results.length; i++) {
			expect(roleIds).toContain(results[i].id);
		}
	}
});

Then("verify all roles are {string}", async (status: string) => {
	for (const roleId of roleIds) {
		response = await newRoles.getRole(roleId);
		responseBody = await response.json();
		expect(responseBody.status).toBe(status.toLowerCase());
	}
});

Then("verify all attached responsibilities are activated", async () => {
	for (const responsibilityId of responsibilityIds) {
		response = await responsibilityApiCalls.getSpecificResponsibility(responsibilityId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("active");
	}
});

Given("user attaches each responsibility to each role", async () => {
	expect(roleIds.length).toBe(responsibilityIds.length);
	for (let i = 0; i < roleIds.length; i++) {
		response = await responsibilityApiCalls.assignRoleToResponsibility(responsibilityIds[i], roleIds[i]);
		await expect(response).toBeOK();
	}
});

Then("verify error message for attach responsibility to role API is {string}", async (errorText: string) => {
	responseBody = await response.json();
	expect(responseBody.message).toContain(errorText);
});

Then("user calls the Get Role Filter API", async () => {
	response = await responsibilityApiCalls.getRoleFilterBySpecificRoleId(id);
	responseBody = await response.json();
});

Given("user has invalid role IDs for testing", async () => {
	const invalidRoleIds = [-1, 999999999, 0, Math.floor(Math.random() * 1000000) + 1000000, -999999];

	roleIds = invalidRoleIds;
});

When("user calls role API with invalid role ID", async () => {
	const invalidRoleId = roleIds[0];
	response = await newRoles.getRolesById(invalidRoleId);
	responseBody = await response.json();
});

Then("verify the responseBody for the Get Role Filter API contains the attachment details", async () => {
	expect(responseBody).toHaveProperty("results");
	expect(responseBody.results.length).toBeGreaterThan(0);
	const result = responseBody.results[0];
	expect(result).toHaveProperty("count_role_attachments");
	expect(result).toHaveProperty("attached_role_count");
	expect(result.attached_role_count).toBe(1);
	expect(result.count_role_attachments).toBe(1);
});

Then("user store the role count", async function () {
	const sidebarResponse = JSON.parse(getSharedData("sidebarCountsResponse"));
	expect(sidebarResponse).toBeDefined();
	expect(sidebarResponse).toHaveProperty("roles");
	storedRoleCount = sidebarResponse.roles;
});

Then("verify the role count is same as the stored role count", async function () {
	const sidebarResponse = JSON.parse(getSharedData("sidebarCountsResponse"));
	expect(sidebarResponse).toBeDefined();
	expect(sidebarResponse).toHaveProperty("roles");
	expect(sidebarResponse.roles).toBe(storedRoleCount);
});

Then("verify the role count is increased by 1", async function () {
	const sidebarResponse = JSON.parse(getSharedData("sidebarCountsResponse"));
	expect(sidebarResponse).toBeDefined();
	expect(sidebarResponse).toHaveProperty("roles");
	expect(sidebarResponse.roles).toBe(storedRoleCount + 1);
});

When("user tries to retired the role", async function () {
	response = await newRoles.retiredRole(id);
	responseBody = await response.json();
	await expect(response).toBeOK();
});

Then("verify the role count is decreased by 1", async function () {
	const sidebarResponse = JSON.parse(getSharedData("sidebarCountsResponse"));
	expect(sidebarResponse).toBeDefined();
	expect(sidebarResponse).toHaveProperty("roles");
	expect(sidebarResponse.roles).toBe(storedRoleCount);
	const previousCount = storedRoleCount + 1;
	expect(sidebarResponse.roles).toBe(previousCount - 1);
});

When("user calls the getRoles API with limit {int} and offset {int}", async function (limit: number, offset: number) {
	response = await newRoles.getRoles(limit, offset);
	responseBody = await response.json();
	await expect(response).toBeOK();
});

Then("verify the role response contains at most {int} records", async function (maxCount: number) {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);
	expect(responseBody.results.length).toBeLessThanOrEqual(maxCount);
	expect(responseBody.results.length).toBeGreaterThanOrEqual(0);
});

Then("verify the role response contains pagination metadata", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("count");
	expect(responseBody).toHaveProperty("next");
	expect(responseBody).toHaveProperty("previous");
	expect(typeof responseBody.count).toBe("number");
	expect(typeof responseBody.next === "string" || responseBody.next === null).toBe(true);
	expect(typeof responseBody.previous === "string" || responseBody.previous === null).toBe(true);
});

Then("verify the role response count matches the total number of roles", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("count");
	expect(responseBody.count).toBeGreaterThan(0);
});

Given("user creates 3 responsibilities for sequence reordering", async function () {
	const responsibilityData1 = getRandomRole();
	const responsibilityData2 = getRandomRole();
	const responsibilityData3 = getRandomRole();

	response = await responsibilityApiCalls.createResponsibility(responsibilityData1.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	const responsibilityId1 = responseBody.id;

	response = await responsibilityApiCalls.createResponsibility(responsibilityData2.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	const responsibilityId2 = responseBody.id;

	response = await responsibilityApiCalls.createResponsibility(responsibilityData3.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	const responsibilityId3 = responseBody.id;

	setSharedData("responsibilityId1", responsibilityId1.toString());
	setSharedData("responsibilityId2", responsibilityId2.toString());
	setSharedData("responsibilityId3", responsibilityId3.toString());
	setSharedData("responsibilityName1", responsibilityData1.name);
	setSharedData("responsibilityName2", responsibilityData2.name);
	setSharedData("responsibilityName3", responsibilityData3.name);
});

When("user attaches all 3 responsibilities to the role", async function () {
	const sharedRoleId = parseInt(getSharedData("roleId"));
	const responsibilityId1 = parseInt(getSharedData("responsibilityId1"));
	const responsibilityId2 = parseInt(getSharedData("responsibilityId2"));
	const responsibilityId3 = parseInt(getSharedData("responsibilityId3"));
	response = await responsibilityApiCalls.assignRoleToResponsibility(responsibilityId1, sharedRoleId);
	await expect(response).toBeOK();
	response = await responsibilityApiCalls.assignRoleToResponsibility(responsibilityId2, sharedRoleId);
	await expect(response).toBeOK();
	await new Promise((resolve) => setTimeout(resolve, 5000));
	response = await responsibilityApiCalls.assignRoleToResponsibility(responsibilityId3, sharedRoleId);
	await expect(response).toBeOK();
	response = await newRoles.getRole(sharedRoleId);
	responseBody = await response.json();
	await expect(response).toBeOK();
	const attachedResponsibilityIds = extractResponsibilityIdsFromResponse(responseBody);
	expect(attachedResponsibilityIds).toContain(responsibilityId1);
	expect(attachedResponsibilityIds).toContain(responsibilityId2);
	expect(attachedResponsibilityIds).toContain(responsibilityId3);
});

When("user calls the sequence reorder API with reordered responsibility IDs", async function () {
	const sharedRoleId = parseInt(getSharedData("roleId"));
	const responsibilityId1 = parseInt(getSharedData("responsibilityId1"));
	const responsibilityId2 = parseInt(getSharedData("responsibilityId2"));
	const responsibilityId3 = parseInt(getSharedData("responsibilityId3"));
	const reorderedResponsibilityIds = [responsibilityId3, responsibilityId2, responsibilityId1];
	response = await newRoles.getRole(sharedRoleId);
	responseBody = await response.json();
	await expect(response).toBeOK();
	const currentlyAttachedResponsibilityIds = extractResponsibilityIdsFromResponse(responseBody);
	expect(currentlyAttachedResponsibilityIds).toContain(responsibilityId1);
	expect(currentlyAttachedResponsibilityIds).toContain(responsibilityId2);
	expect(currentlyAttachedResponsibilityIds).toContain(responsibilityId3);
	response = await newRoles.reorderRoleResponsibilities(sharedRoleId, reorderedResponsibilityIds);

	if (!response.ok()) {
		const errorText = await response.text();
		throw new Error(`Sequence reorder API failed with status ${response.status()}: ${errorText}`);
	}

	responseBody = await response.json();
});

Then("verify the new order of responsibilities in the role response", async function () {
	const responsibilityId1 = parseInt(getSharedData("responsibilityId1"));
	const responsibilityId2 = parseInt(getSharedData("responsibilityId2"));
	const responsibilityId3 = parseInt(getSharedData("responsibilityId3"));

	if (responseBody.attachments && Array.isArray(responseBody.attachments)) {
		expect(responseBody.attachments.length).toBeGreaterThanOrEqual(3);
		const reorderedResponsibilityIds = responseBody.attachments.map((attachment: { id: number }) => attachment.id);
		expect(reorderedResponsibilityIds[0]).toBe(responsibilityId3);
		expect(reorderedResponsibilityIds[1]).toBe(responsibilityId2);
		expect(reorderedResponsibilityIds[2]).toBe(responsibilityId1);
	} else {
		throw new Error("Unexpected response structure from sequence reorder API - missing attachments array");
	}
});

When("user calls the getRoles API with query params {string}", async function (queryParams: string) {
	const actualRoleName = getSharedData("roleName");
	expect(actualRoleName).toBeDefined();
	
	const dynamicQueryParams = `?name=${encodeURIComponent(actualRoleName)}`;
	console.log("Original query params:", queryParams);
	
	response = await newRoles.getRolesWithQueryParams(dynamicQueryParams);
	responseBody = await response.json();
	await expect(response).toBeOK();
});

Then("verify the role name is in the response", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBe(true);
	expect(responseBody.results.length).toBeGreaterThan(0);

	const createdRoleName = getSharedData("roleName");
	expect(createdRoleName).toBeDefined();

	const createdRole = responseBody.results.find((role: { name: string }) => 
		role.name === createdRoleName
	);

	if (createdRole) {
		expect(createdRole).toHaveProperty("name");
		expect(createdRole).toHaveProperty("code_str");
		expect(createdRole).toHaveProperty("status");
		expect(createdRole.status).toBe("active");
		
		const actualRoleName = getSharedData("roleName");
		if (actualRoleName) {
			expect(createdRole.name).toBe(actualRoleName);
		}
	} else {
		
		throw new Error(`Created role "${createdRoleName}" not found in search results`);
	}
});

function extractResponsibilityIdsFromResponse(responseBody: unknown): number[] {
	if (Array.isArray(responseBody)) {
		return responseBody.map((attachment: { responsibility: number }) => attachment.responsibility);
	} else if (
		typeof responseBody === "object" &&
		responseBody !== null &&
		"results" in responseBody &&
		Array.isArray((responseBody as { results: unknown[] }).results)
	) {
		return (responseBody as { results: Array<{ responsibility: number }> }).results.map(
			(attachment) => attachment.responsibility,
		);
	} else if (
		typeof responseBody === "object" &&
		responseBody !== null &&
		"responsibilities" in responseBody &&
		Array.isArray((responseBody as { responsibilities: unknown[] }).responsibilities)
	) {
		return (responseBody as { responsibilities: Array<{ responsibility: number }> }).responsibilities.map(
			(attachment) => attachment.responsibility,
		);
	} else if (
		typeof responseBody === "object" &&
		responseBody !== null &&
		"attachments" in responseBody &&
		Array.isArray((responseBody as { attachments: unknown[] }).attachments)
	) {
		const attachments = (responseBody as { attachments: Array<{ id: number; type: string }> }).attachments;
		const responsibilityAttachments = attachments.filter((attachment) => attachment.type === "responsibility");
		return responsibilityAttachments.map((attachment) => attachment.id);
	} else {
		throw new Error("Unexpected response structure from getRole API");
	}
}

export { apiRoleData, id };
