import { Given, Then, When } from "@cucumber/cucumber";
import EmployeeApis from "../../apis/owner/employee";
import CheckpointApis from "../../apis/owner/checkpoint";
import { baseInstance } from "../../helpers/BaseClass";
import ResponsibilityApis from "../../apis/owner/responsibility";
import UserApi from "../../apis/owner/user";
import {
	getRandomRole,
	RolesData,
	EmployeeData,
	generateRandomEmployeeData,
	generateRandomUserData,
	UserData,
} from "../../helpers/util/random";
import { expect } from "@playwright/test";
import { responsibilityId } from "./readinessCatalogsResponsibilitiesApiSteps";
import { employeeId } from "./employeeApiSteps";

const checkpointCriteria = "criteria";
let checkpointResponsibilityId: number;
let response;
let responseBody;
let checkpointId;
let sequence;
let newResponsibilityId: number;
let localEmployeeId: number;
const evaluationReason = "Test";
const newUserData: UserData = generateRandomUserData();
const newUser: UserApi = new UserApi(baseInstance);
const checkpointApiCalls: CheckpointApis = new CheckpointApis(baseInstance);
const addedEmployeeData: EmployeeData = generateRandomEmployeeData();
const employeeApiCalls: EmployeeApis = new EmployeeApis(baseInstance);
const responsibilityApiCalls: ResponsibilityApis = new ResponsibilityApis(baseInstance);
const responsibilityData: RolesData = getRandomRole();
const checkpointData: RolesData = getRandomRole();
const newRole: RolesData = getRandomRole();

When("user create a checkpoint via API", async function () {
	response = await responsibilityApiCalls.createResponsibility(responsibilityData.name, "draft");
	await expect(response).toBeOK();
	responseBody = await response.json();
	checkpointResponsibilityId = responseBody.id;
	response = await checkpointApiCalls.createNewCheckpoint(
		checkpointResponsibilityId,
		2,
		checkpointData.name,
		checkpointData.description,
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
	checkpointId = responseBody.id;
	sequence = responseBody.sequence;
});

When("user creates a checkpoint via API", async function () {
	response = await checkpointApiCalls.createNewCheckpoint(
		responsibilityId,
		2,
		checkpointData.name,
		checkpointData.description,
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
	checkpointId = responseBody.id;
	sequence = responseBody.sequence;
});

Then("user return status 200 with the checkpoint_id", async function () {
	await expect(response).toBeOK();
	responseBody = await response.json();
	expect(responseBody.id).not.toBeNull();
});

When("user change checkpoint criteria via API", async function () {
	const newCriteria = responsibilityData.description;
	response = await checkpointApiCalls.updateCheckpoint(
		newCriteria,
		checkpointResponsibilityId,
		2,
		"",
		checkpointId,
		sequence,
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
	checkpointId = responseBody.id;
	expect(responseBody.criteria).toEqual(newCriteria);
});

When("user change checkpoint instructions via API", async function () {
	const newCheckpointInstructions = responsibilityData.description;
	response = await checkpointApiCalls.updateCheckpoint(
		checkpointCriteria,
		checkpointResponsibilityId,
		2,
		newCheckpointInstructions,
		checkpointId,
		sequence,
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
	expect(responseBody.instructions).toEqual(newCheckpointInstructions);
});

When("user change checkpoint level via API", async function () {
	const checkpointLevel = sequence + 1;
	response = await checkpointApiCalls.updateCheckpoint(
		checkpointCriteria,
		checkpointResponsibilityId,
		2,
		"",
		checkpointId,
		checkpointLevel,
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
	expect(responseBody.sequence).toEqual(checkpointLevel);
});

When("user delete checkpoint via API", async function () {
	response = await checkpointApiCalls.deleteCheckpoint(checkpointResponsibilityId, checkpointId);
	expect(response.status()).toBe(204);
});

Then("user return status 200", async function () {
	await expect(response).toBeOK();
});

When("user activate checkpoint via API", async function () {
	response = await checkpointApiCalls.activateCheckpoint(checkpointResponsibilityId, checkpointId);
});

Then("user list all checkpoint", async function () {
	response = await checkpointApiCalls.getAllCheckpoint(checkpointResponsibilityId, employeeId);
	await expect(response).toBeOK();
	responseBody = await response.json();
});

Then("verify updated_by field is not null", async () => {
	expect(responseBody.updated_by).not.toBeNull();
});

Then("user verify the status code  200 and status {string}", async function (status: string) {
	await expect(response).toBeOK();
	responseBody = await response.json();
	expect(responseBody.status).toEqual(status);
});

When("user attempt to delete checkpoint via API", async function () {
	response = await checkpointApiCalls.deleteCheckpoint(checkpointResponsibilityId, checkpointId);
});

When("user retire checkpoint via API", async function () {
	response = await checkpointApiCalls.retireCheckpoint(checkpointResponsibilityId, checkpointId);
});

When("user reactivate checkpoint via API", async function () {
	response = await checkpointApiCalls.reactivateCheckpoint(checkpointResponsibilityId, checkpointId);
});

When("user change checkpoint sequence to a level below the previous one", async function () {
	const checkpointLevel = sequence - 1;
	response = await checkpointApiCalls.updateCheckpoint(
		checkpointCriteria,
		checkpointResponsibilityId,
		1,
		"",
		checkpointId,
		checkpointLevel,
	);
});

Then("user verify the error {string}", async function (status: string) {
	expect(response.status()).toBe(400);
	responseBody = await response.json();
	expect(responseBody).toContain(status);
});

Then("User have a Checkpoint in status {string}", async function (status: string) {
	const newResponsibilityData: RolesData = getRandomRole();
	responsibilityData.name = newResponsibilityData.name;

	const newCheckpointData: RolesData = getRandomRole();
	checkpointData.name = newCheckpointData.name;
	response = await responsibilityApiCalls.createResponsibility(responsibilityData.name, "draft");
	await expect(response).toBeOK();
	responseBody = await response.json();
	checkpointResponsibilityId = responseBody.id;
	response = await responsibilityApiCalls.activateResponsibility(checkpointResponsibilityId);
	responseBody = await response.json();
	await expect(response).toBeOK();
	response = await checkpointApiCalls.createNewCheckpoint(
		checkpointResponsibilityId,
		2,
		newCheckpointData.name,
		checkpointData.description,
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
	checkpointId = responseBody.id;

	if (status === "Active") {
		response = await checkpointApiCalls.activateCheckpoint(checkpointResponsibilityId, checkpointId);
		responseBody = await response.json();
		await expect(response).toBeOK();
	} else if (status === "Retired") {
		response = await checkpointApiCalls.activateCheckpoint(checkpointResponsibilityId, checkpointId);
		responseBody = await response.json();
		await expect(response).toBeOK();

		response = await checkpointApiCalls.retireCheckpoint(checkpointResponsibilityId, checkpointId);
		responseBody = await response.json();
		await expect(response).toBeOK();
	}
});

Then("User Retired the checkpoint", async function () {
	response = await checkpointApiCalls.retireCheckpoint(checkpointResponsibilityId, checkpointId);
	responseBody = await response.json();
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
});

Given("User creates another responsibility in status {string}", async function (status: string) {
	const updateNewRole: RolesData = getRandomRole();
	newRole.name = updateNewRole.name;

	response = await responsibilityApiCalls.createResponsibility(newRole.name, "draft");
	responseBody = await response.json();
	expect(responseBody.status).toBe("draft");
	newResponsibilityId = responseBody.id;

	if (status === "Active") {
		response = await responsibilityApiCalls.activateResponsibility(newResponsibilityId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("active");
	} else if (status === "Inactive") {
		response = await responsibilityApiCalls.activateResponsibility(newResponsibilityId);
		responseBody = await response.json();
		response = await responsibilityApiCalls.deActivateResponsibility(newResponsibilityId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("inactive");
	} else if (status === "Retired") {
		response = await responsibilityApiCalls.activateResponsibility(newResponsibilityId);
		responseBody = await response.json();
		response = await responsibilityApiCalls.retiredResponsibility(newResponsibilityId);
		responseBody = await response.json();
		expect(responseBody.status).toBe("retired");
	}
});

Then("User have 12 Checkpoints in status {string}", async function (status: string) {
	const newResponsibilityData: RolesData = getRandomRole();
	responsibilityData.name = newResponsibilityData.name;

	response = await responsibilityApiCalls.createResponsibility(newResponsibilityData.name, "draft");
	await expect(response).toBeOK();
	responseBody = await response.json();
	checkpointResponsibilityId = responseBody.id;

	for (let i = 0; i < 12; i++) {
		const newCheckpointData: RolesData = getRandomRole();
		checkpointData.name = newCheckpointData.name;

		response = await checkpointApiCalls.createNewCheckpoint(
			checkpointResponsibilityId,
			2,
			newCheckpointData.name,
			checkpointData.description,
		);

		await expect(response).toBeOK();
		responseBody = await response.json();
		const checkpointId = responseBody.id;

		if (status === "Active") {
			response = await checkpointApiCalls.activateCheckpoint(checkpointResponsibilityId, checkpointId);
			responseBody = await response.json();
			await expect(response).toBeOK();
		} else if (status === "Retired") {
			response = await checkpointApiCalls.activateCheckpoint(checkpointResponsibilityId, checkpointId);
			responseBody = await response.json();
			await expect(response).toBeOK();

			response = await checkpointApiCalls.retireCheckpoint(checkpointResponsibilityId, checkpointId);
			responseBody = await response.json();
			await expect(response).toBeOK();
		}
	}
});

Then("Verify the Endpoint for chatter drawer in Responsibility> Checklist", async function () {
	response = await checkpointApiCalls.getCheckpointDrawer(checkpointId);
	responseBody = await response.json();
});

Given("that user has {string} checkpoint with responsibility badge", async function (status: string) {
	const newResponsibilityData: RolesData = getRandomRole();
	responsibilityData.name = newResponsibilityData.name;

	const newCheckpointData: RolesData = getRandomRole();
	checkpointData.name = newCheckpointData.name;

	response = await responsibilityApiCalls.createResponsibility(newResponsibilityData.name, "draft");
	await expect(response).toBeOK();
	responseBody = await response.json();
	checkpointResponsibilityId = responseBody.id;

	response = await checkpointApiCalls.createNewCheckpoint(
		checkpointResponsibilityId,
		2,
		newCheckpointData.name,
		checkpointData.description,
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
	checkpointId = responseBody.id;

	if (status === "Active") {
		response = await checkpointApiCalls.activateCheckpoint(checkpointResponsibilityId, checkpointId);
		responseBody = await response.json();
		await expect(response).toBeOK();
	} else if (status === "Retired") {
		response = await checkpointApiCalls.activateCheckpoint(checkpointResponsibilityId, checkpointId);
		responseBody = await response.json();
		await expect(response).toBeOK();

		response = await checkpointApiCalls.retireCheckpoint(checkpointResponsibilityId, checkpointId);
		responseBody = await response.json();
		await expect(response).toBeOK();
	}

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

	await responsibilityApiCalls.grantBadgeToResponsibility(
		checkpointResponsibilityId,
		1,
		userId,
		checkpointResponsibilityId,
	);

	responseBody = await response.json();
	await expect(response).toBeOK();
});

Given("User has a Employee", async function () {
	this.response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);
	responseBody = await this.response.json();
	localEmployeeId = responseBody.id;
});

Then("User create an checkpoint evaluation for {string}", async function (status: string) {
	const { getSharedData } = await import("../../helpers/util/sharedData");
	const employeeIdFromShared = parseInt(getSharedData("employeeId"));

	if (status === "passed") {
		this.response = await checkpointApiCalls.evaluatePassCheckpoint(
			checkpointResponsibilityId,
			employeeIdFromShared,
			checkpointId,
			status,
			evaluationReason,
		);
		responseBody = await this.response.json();
	} else if (status === "failed") {
		this.response = await checkpointApiCalls.evaluateFailCheckpoint(
			checkpointResponsibilityId,
			employeeIdFromShared,
			checkpointId,
			status,
			evaluationReason,
		);
		responseBody = await this.response.json();
	} else if (status == "not_applicable") {
		this.response = await checkpointApiCalls.evaluateNotApplicableCheckpoint(
			checkpointResponsibilityId,
			employeeIdFromShared,
			checkpointId,
			status,
			evaluationReason,
		);
		responseBody = await this.response.json();
	} else if (status === "reset") {
		this.response = await checkpointApiCalls.evaluateResetCheckpoint(
			checkpointResponsibilityId,
			employeeIdFromShared,
			checkpointId,
			status,
			evaluationReason,
		);
		responseBody = await this.response.json();
	}
});

Then("that a checkpoint evaluation exists for {string}", async function (status: string) {
	if (status === "passed") {
		this.response = await checkpointApiCalls.evaluatePassCheckpoint(
			checkpointResponsibilityId,
			localEmployeeId,
			checkpointId,
			status,
			evaluationReason,
		);
		responseBody = await this.response.json();
	} else if (status === "failed") {
		this.response = await checkpointApiCalls.evaluateFailCheckpoint(
			checkpointResponsibilityId,
			localEmployeeId,
			checkpointId,
			status,
			evaluationReason,
		);
		responseBody = await this.response.json();
	} else if (status === "not_applicable") {
		this.response = await checkpointApiCalls.evaluateNotApplicableCheckpoint(
			checkpointResponsibilityId,
			localEmployeeId,
			checkpointId,
			status,
			evaluationReason,
		);
		responseBody = await this.response.json();
	} else if (status === "reset") {
		this.response = await checkpointApiCalls.evaluateResetCheckpoint(
			checkpointResponsibilityId,
			localEmployeeId,
			checkpointId,
			status,
			evaluationReason,
		);
		responseBody = await this.response.json();
	}
});

Then("Set status to {string}", async (expectedStatus: string) => {
	if (responseBody && responseBody.status) {
		await expect(responseBody.status).toContain(expectedStatus);
	} else {
		await expect(responseBody).toBeDefined();
	}
});

Then("Verify the evaluation error {string}", async function (responseMsg: string) {
	if (responseBody && responseBody.message) {
		expect(responseBody.message).toContain(responseMsg);
	} else if (responseBody && responseBody[0]) {
		expect(responseBody[0]).toContain(responseMsg);
	} else {
		await expect(responseBody).toBeDefined();
	}
});

Then("Verify set the evaluation reason to be {string}", async function (reason: string) {
	if (responseBody && responseBody.reason !== undefined) {
		if (reason === "Test") {
			expect(responseBody.reason).toBe(reason);
		} else {
			expect(responseBody.reason).toBe(null);
		}
	} else {
		await expect(responseBody).toBeDefined();
	}
	expect(response.status()).toBe(201);
});

Given("the Checkpoint with different statuses", async function () {
	const newResponsibilityData: RolesData = getRandomRole();
	responsibilityData.name = newResponsibilityData.name;

	this.response = await responsibilityApiCalls.createResponsibility(responsibilityData.name, "draft");
	responseBody = await this.response.json();
	checkpointResponsibilityId = await responseBody.id;

	const statusesList = ["draft", "Active", "Retired"];
	const checkpoints = [];

	for (const status of statusesList) {
		const newCheckpointData: RolesData = getRandomRole();
		checkpointData.name = newCheckpointData.name;

		this.response = await checkpointApiCalls.createNewCheckpoint(
			checkpointResponsibilityId,
			3,
			checkpointData.name,
			checkpointData.description,
		);
		responseBody = await this.response.json();
		checkpointId = await responseBody.id;

		if (status === "Active") {
			response = await checkpointApiCalls.activateCheckpoint(checkpointResponsibilityId, checkpointId);
			responseBody = await response.json();
			expect(responseBody.status).toBe("active");
		} else if (status === "Retired") {
			let response = await checkpointApiCalls.activateCheckpoint(checkpointResponsibilityId, checkpointId);
			responseBody = await response.json();
			expect(responseBody.status).toBe("active");

			response = await checkpointApiCalls.retireCheckpoint(checkpointResponsibilityId, checkpointId);
			responseBody = await response.json();
			expect(responseBody.status).toBe("retired");
		}
		checkpoints.push({ checkpointId, status });
	}

	this.roles = checkpoints;
});

Then("User creates a Checkpoint with status {string} and level {int}", async function (status: string, level: number) {
	const newResponsibilityData: RolesData = getRandomRole();
	responsibilityData.name = newResponsibilityData.name;

	const newCheckpointData: RolesData = getRandomRole();
	checkpointData.name = newCheckpointData.name;

	response = await responsibilityApiCalls.createResponsibility(responsibilityData.name, "draft");
	response = await checkpointApiCalls.createNewCheckpoint(
		checkpointResponsibilityId,
		level,
		newCheckpointData.name,
		checkpointData.description,
	);

	responseBody = await response.json();
	checkpointId = responseBody.id;

	if (status === "Active") {
		response = await checkpointApiCalls.activateCheckpoint(checkpointResponsibilityId, checkpointId);
		responseBody = await response.json();
		await expect(response).toBeOK();
	} else if (status === "Retired") {
		response = await checkpointApiCalls.activateCheckpoint(checkpointResponsibilityId, checkpointId);
		responseBody = await response.json();
		await expect(response).toBeOK();

		response = await checkpointApiCalls.retireCheckpoint(checkpointResponsibilityId, checkpointId);
		responseBody = await response.json();
		await expect(response).toBeOK();
	}
});

When("user calls the move checkpoint API", async () => {
	response = await checkpointApiCalls.moveCheckpoint(checkpointId, newResponsibilityId);
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
	responseBody = await response.json();
});

Then("verify the checkpoint is moved to the new responsibility", async () => {
	expect(responseBody.responsibility).toBe(newResponsibilityId);
});

When(
	"user create a checkpoint via API with criteria {string} and instructions {string}",
	async function (criteria: string, instructions: string) {
		response = await responsibilityApiCalls.createResponsibility(responsibilityData.name, "draft");
		await expect(response).toBeOK();
		responseBody = await response.json();
		checkpointResponsibilityId = responseBody.id;

		response = await checkpointApiCalls.createNewCheckpoint(checkpointResponsibilityId, 2, criteria, instructions);
		await expect(response).toBeOK();
		responseBody = await response.json();
		checkpointId = responseBody.id;
		sequence = responseBody.sequence;
		response = await checkpointApiCalls.activateCheckpoint(checkpointResponsibilityId, checkpointId);
		await expect(response).toBeOK();
	},
);

When("user calls get checkpoints endpoint with search parameter {string}", async function (searchTerm: string) {
	response = await checkpointApiCalls.getCheckpointsV2(checkpointResponsibilityId, searchTerm);
	await expect(response).toBeOK();
	responseBody = await response.json();
});

Then("verify all checkpoints contains {string} are returned", async function (searchTerm: string) {
	expect(responseBody).toBeTruthy();
	expect(responseBody.count).toBeGreaterThan(0);
	expect(Array.isArray(responseBody.results)).toBe(true);
	expect(responseBody.results.length).toBeGreaterThan(0);

	let foundMatch = false;
	for (const checkpoint of responseBody.results) {
		const criteriaContains =
			checkpoint.criteria && checkpoint.criteria.toLowerCase().includes(searchTerm.toLowerCase());
		const instructionsContains =
			checkpoint.instructions && checkpoint.instructions.toLowerCase().includes(searchTerm.toLowerCase());

		if (criteriaContains || instructionsContains) {
			foundMatch = true;
		}
	}

	expect(foundMatch).toBe(true);
});

Given("checkpoints with different statuses", async function () {
	response = await responsibilityApiCalls.createResponsibility(responsibilityData.name, "draft");
	await expect(response).toBeOK();
	responseBody = await response.json();
	checkpointResponsibilityId = responseBody.id;

	const statuses = ["draft", "active", "retired"];

	for (let i = 0; i < statuses.length; i++) {
		const status = statuses[i];
		const checkpointData = getRandomRole();

		response = await checkpointApiCalls.createNewCheckpoint(
			checkpointResponsibilityId,
			2,
			checkpointData.name,
			checkpointData.description,
		);
		await expect(response).toBeOK();
		responseBody = await response.json();
		const checkpointId = responseBody.id;

		if (status === "active") {
			response = await checkpointApiCalls.activateCheckpoint(checkpointResponsibilityId, checkpointId);
			await expect(response).toBeOK();
		} else if (status === "retired") {
			response = await checkpointApiCalls.activateCheckpoint(checkpointResponsibilityId, checkpointId);
			await expect(response).toBeOK();
			response = await checkpointApiCalls.retireCheckpoint(checkpointResponsibilityId, checkpointId);
			await expect(response).toBeOK();
		} else if (status === "inactive") {
			response = await checkpointApiCalls.activateCheckpoint(checkpointResponsibilityId, checkpointId);
			await expect(response).toBeOK();
			response = await responsibilityApiCalls.deActivateResponsibility(checkpointResponsibilityId);
			await expect(response).toBeOK();
		}
	}
});

When("user calls get checkpoints endpoint with status filter {string}", async function (statusFilter: string) {
	response = await checkpointApiCalls.getCheckpointsV2(checkpointResponsibilityId, undefined, statusFilter);
	await expect(response).toBeOK();
	responseBody = await response.json();
});

Then("verify all checkpoints have status {string}", async function (expectedStatus: string) {
	expect(responseBody).toBeTruthy();
	expect(responseBody.count).toBeGreaterThan(0);
	expect(Array.isArray(responseBody.results)).toBe(true);
	expect(responseBody.results.length).toBeGreaterThan(0);

	let allCheckpointsMatchExpectedStatus = true;

	for (const checkpoint of responseBody.results) {
		const checkpointStatus = checkpoint.status.toLowerCase();
		const isExpectedStatus = expectedStatus.toLowerCase() === checkpointStatus;

		if (!isExpectedStatus) {
			allCheckpointsMatchExpectedStatus = false;
		}
	}

	expect(allCheckpointsMatchExpectedStatus).toBe(true);
});

Then("Verify the response status is {string}", async (status: string) => {
	await expect(response).toBeOK();
	expect(response.status()).toBe(parseInt(status));
	if (responseBody && responseBody.reset_on !== undefined) {
		expect(responseBody.reset_on).not.toBeNull();
	}
	if (responseBody && responseBody.reset_by !== undefined) {
		expect(responseBody.reset_by).not.toBeNull();
	}
	responseBody = await response.json();
});

Given("checkpoints with different proficiency levels", async function () {
	response = await responsibilityApiCalls.createResponsibility(responsibilityData.name, "draft");
	await expect(response).toBeOK();
	responseBody = await response.json();
	checkpointResponsibilityId = responseBody.id;

	const proficiencyLevels = [1, 2, 3, 4];

	for (let i = 0; i < proficiencyLevels.length; i++) {
		const proficiencyLevel = proficiencyLevels[i];
		const checkpointData = getRandomRole();

		response = await checkpointApiCalls.createNewCheckpoint(
			checkpointResponsibilityId,
			proficiencyLevel,
			checkpointData.name,
			checkpointData.description,
		);
		await expect(response).toBeOK();
		responseBody = await response.json();
		const checkpointId = responseBody.id;

		response = await checkpointApiCalls.activateCheckpoint(checkpointResponsibilityId, checkpointId);
		await expect(response).toBeOK();
	}
});

When(
	"user calls get checkpoints endpoint with proficiency level filter {string}",
	async function (proficiencyLevelFilter: string) {
		response = await checkpointApiCalls.getCheckpointsV2(
			checkpointResponsibilityId,
			undefined,
			undefined,
			proficiencyLevelFilter,
		);
		await expect(response).toBeOK();
		responseBody = await response.json();
	},
);

Then("verify all checkpoints have proficiency level {string}", async function (expectedLevel: string) {
	expect(responseBody).toBeTruthy();
	expect(responseBody.count).toBeGreaterThan(0);
	expect(Array.isArray(responseBody.results)).toBe(true);
	expect(responseBody.results.length).toBeGreaterThan(0);

	const expectedLevelNumber = checkpointApiCalls.getProficiencyLevelNumber(expectedLevel);
	let allCheckpointsMatchExpectedLevel = true;

	for (const checkpoint of responseBody.results) {
		const checkpointLevel = checkpoint.proficiency_level;
		const isExpectedLevel = checkpointLevel === expectedLevelNumber;

		if (!isExpectedLevel) {
			allCheckpointsMatchExpectedLevel = false;
		}
	}

	expect(allCheckpointsMatchExpectedLevel).toBe(true);
});

Then("there are various checkpoints", async function () {
	response = await responsibilityApiCalls.createResponsibility(responsibilityData.name, "draft");
	await expect(response).toBeOK();
	responseBody = await response.json();
	checkpointResponsibilityId = responseBody.id;

	const checkpointData = [
		{
			criteria: "JavaScript testing framework",
			instructions: "Implement unit tests using Jest",
			proficiencyLevel: 3,
			status: "active",
		},
		{
			criteria: "React component testing",
			instructions: "Write tests for React components",
			proficiencyLevel: 2,
			status: "active",
		},
		{
			criteria: "API integration testing",
			instructions: "Test API endpoints with Postman",
			proficiencyLevel: 3,
			status: "draft",
		},
		{
			criteria: "Database testing",
			instructions: "Test database connections and queries",
			proficiencyLevel: 1,
			status: "active",
		},
	];

	for (let i = 0; i < checkpointData.length; i++) {
		const data = checkpointData[i];

		response = await checkpointApiCalls.createNewCheckpoint(
			checkpointResponsibilityId,
			data.proficiencyLevel,
			data.criteria,
			data.instructions,
		);
		await expect(response).toBeOK();
		responseBody = await response.json();
		const checkpointId = responseBody.id;

		if (data.status === "active") {
			response = await checkpointApiCalls.activateCheckpoint(checkpointResponsibilityId, checkpointId);
			await expect(response).toBeOK();
		}
	}
});

When("user calls get checkpoints endpoint with combined filters", async function () {
	response = await checkpointApiCalls.getCheckpointsV2(checkpointResponsibilityId, "test", "active", "coach");
	await expect(response).toBeOK();
	responseBody = await response.json();
});

Then("verify all checkpoints match combined criteria", async function () {
	expect(responseBody).toBeTruthy();
	expect(responseBody.count).toBeGreaterThan(0);
	expect(Array.isArray(responseBody.results)).toBe(true);
	expect(responseBody.results.length).toBeGreaterThan(0);

	let allCheckpointsMatchCriteria = true;

	for (const checkpoint of responseBody.results) {
		const criteriaContains = checkpoint.criteria && checkpoint.criteria.toLowerCase().includes("test");
		const instructionsContains = checkpoint.instructions && checkpoint.instructions.toLowerCase().includes("test");
		const containsSearchTerm = criteriaContains || instructionsContains;
		const hasActiveStatus = checkpoint.status.toLowerCase() === "active";
		const hasCoachLevel = checkpoint.proficiency_level === 3;

		if (!containsSearchTerm || !hasActiveStatus || !hasCoachLevel) {
			allCheckpointsMatchCriteria = false;
		}
	}

	expect(allCheckpointsMatchCriteria).toBe(true);
});

When("user create a microlearning video via API", async function () {
	const videoFilePath = "helpers/upload/SampleVideo_1280x720_1mb.mp4";

	response = await checkpointApiCalls.uploadMicrolearningVideo(checkpointId, videoFilePath);
	await expect(response).toBeOK();
	responseBody = await response.json();
	expect(responseBody).toBeDefined();
});

export { responsibilityData, checkpointCriteria, checkpointData, checkpointResponsibilityId, localEmployeeId };
