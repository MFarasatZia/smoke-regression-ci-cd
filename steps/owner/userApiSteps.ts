import { Given, Then, When } from "@cucumber/cucumber";
import { baseInstance } from "../../helpers/BaseClass";
import { expect } from "@playwright/test";
import UserApis from "../../apis/owner/user";
import { generateRandomUserData, getRandomPhrase, UserData } from "../../helpers/util/random";
import EmployeeApis from "../../apis/owner/employee";
import { addedEmployeeData, createdUserEmail } from "./employeeApiSteps";
import AccountApis from "../../apis/owner/account";
import { getLatestResetPasswordLinkFromEmail } from "../../helpers/util/mailtrap";
import { newAccountId, userDataFromChangeOwnership, userIdFromChangeOwnership } from "../admin/adminAccountApiSteps";
import { createdAdminUserId } from "../admin/adminUsersApiSteps";

const accountId = 3;
const userId = 3;
let createdUserId: number;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let createUserState: string;
let note: string;
let token: string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any, camelcase
let response: any, responseBody: any, id: number, userStatus: string;
let userData: UserData;
let userDataForSpecificAccount: UserData;
let expectedNumberOfAccounts: number;
let userAccessId: number;
let changedUserData: UserData;
const userAPiCalls: UserApis = new UserApis(baseInstance);
const employeeApiCalls: EmployeeApis = new EmployeeApis(baseInstance);
const adminAPiCalls: AccountApis = new AccountApis(baseInstance);

Given("user have a user with owner permission in an account", async () => {
	response = await userAPiCalls.getUserAccess(accountId, userId);
	responseBody = await response.json();
	console.log(responseBody);
});

Given("that a user is blocked", async function () {
	userData = generateRandomUserData();
	response = await userAPiCalls.createNewUser(
		userData.email,
		userData.firstName,
		userData.lastName,
		"blocked",
		true,
		false,
		false,
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
	console.log(responseBody);
});

Given("that a user is in state {string}", async function (status: string) {
	userData = generateRandomUserData();
	response = await userAPiCalls.createNewUser(
		userData.email,
		userData.firstName,
		userData.lastName,
		status.toLowerCase(),
		true,
		false,
		false,
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
	createdUserId = responseBody.id;
	createUserState = responseBody.state;
});

When("user resend invitation via API", async function () {
	responseBody = await response.json();
	const userId = responseBody.id;
	response = await userAPiCalls.resendsInvite(userId);
});

Then("verify response that resending an invite should only update the last_invited_at timestamp", async () => {
	const responseBody = await response.json();
	const firstInvitedOn = responseBody.first_invited_on;
	const lastInvitedAt = responseBody.last_invited_at;
	const currentTime = new Date();
	const firstInvitedOnTime = new Date(firstInvitedOn);
	const lastInvitedAtTime = new Date(lastInvitedAt);
	const timeDifferenceFirstInvited = Math.abs(currentTime.getTime() - firstInvitedOnTime.getTime());
	const timeDifferenceLastInvited = Math.abs(currentTime.getTime() - lastInvitedAtTime.getTime());
	const acceptableDifference = 5 * 60 * 1000;
	expect(timeDifferenceFirstInvited).toBeLessThan(acceptableDifference);
	expect(timeDifferenceLastInvited).toBeLessThan(acceptableDifference);
	expect(firstInvitedOn).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{6}Z$/);
	expect(lastInvitedAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{6}Z$/);
});

Then("verify first_invited_on field has value in response", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody.first_invited_on).not.toBeNull();
});

Then("verify last_invited_at field has value in response", async function () {
	expect(responseBody).toBeDefined();
	expect(responseBody.last_invited_at).not.toBeNull();
});

Given("that user is in state {string} and is co-owner", async function (status: string) {
	userData = generateRandomUserData();
	response = await userAPiCalls.createNewUser(
		userData.email,
		userData.firstName,
		userData.lastName,
		status.toLowerCase(),
		true,
		false,
		false,
		true,
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
	createdUserId = responseBody.id;
});

Given("user is in state {string} and is co-owner of account with id {int}", async function (status: string) {
	userDataForSpecificAccount = generateRandomUserData();
	response = await userAPiCalls.createNewUser(
		userDataForSpecificAccount.email,
		userDataForSpecificAccount.firstName,
		userDataForSpecificAccount.lastName,
		status.toLowerCase(),
		true,
		false,
		false,
		true,
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
	createdUserId = responseBody.id;
});

Given("that user is in state suspended and is co-owner", async function () {
	userData = generateRandomUserData();
	response = await userAPiCalls.createNewUser(
		userData.email,
		userData.firstName,
		userData.lastName,
		"invited",
		true,
		false,
		false,
		true,
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
	expect(responseBody.state).toContain("invited");
	createdUserId = responseBody.id;

	response = await userAPiCalls.createSuspendUser(createdUserId);

	await expect(response).toBeOK();
	const suspendResponseBody = await response.json();
	expect(suspendResponseBody.state).toContain("invited");
});

export { userData };

When(/^calling the check-access API for the respective user$/, async function () {
	response = await employeeApiCalls.employeeCheckAccess(createdUserEmail);
	responseBody = await response.json();
});

Given("user Has Permission in that account", async () => {
	expect(responseBody.is_owner).toBeTruthy();
});

When("user try to suspend the user", async () => {
	response = await userAPiCalls.suspendUserAccess(userId);
	responseBody = await response.json();
});

Then("user get error \"Owner cannot be suspended\"", async () => {
	expect(responseBody).toEqual(["Owner cannot be suspended."]);
});
Then("Verify that user state is {string}", async function (status: string) {
	expect(responseBody.user.state).toBe(status);
});

Given(/^user has a employee linked and state is not blocked$/, async function () {
	userData = generateRandomUserData();
	response = await userAPiCalls.createNewUser(
		userData.email,
		userData.firstName,
		userData.lastName,
		"operational",
		true,
		false,
		false,
	);

	await expect(response).toBeOK();
	responseBody = await response.json();
	expect(responseBody.state).toBe("operational");

	response = await employeeApiCalls.createEmployee(
		addedEmployeeData.firstName,
		addedEmployeeData.lastName,
		addedEmployeeData.title,
		"draft",
	);
	responseBody = await response.json();
	expect(responseBody.current_status).toBe("draft");
});

Then(/^you return existing employee$/, function () {
	expect(responseBody.employee.first_name).toBe(addedEmployeeData.firstName);
	expect(responseBody.employee.last_name).toBe(addedEmployeeData.lastName);
	if (responseBody.employee.title !== undefined) {
		expect(responseBody.employee.title).toBe(addedEmployeeData.title);
	}
});

Given("that user call api to list all user for an Account", async () => {
	response = await userAPiCalls.getMyUserDetails();
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
	responseBody = await response.json();
});

Then("user in that specific account is listed", async () => {
	expect(responseBody).toBeDefined();
	expect(responseBody.id).toBeDefined();
	expect(typeof responseBody.id).toBe("number");
	expect(responseBody.id).toBeGreaterThan(0);
	expect(responseBody.email).toBeDefined();
	expect(responseBody.first_name).toBeDefined();
	expect(responseBody.last_name).toBeDefined();
});

Then("verify response is {int}", async (statusCode: number) => {
	expect(response.status()).toBe(statusCode);
});

Given("that user call api to list all user for a particular system", async () => {
	response = await userAPiCalls.getAllUsers();
	responseBody = await response.json();
});

Then("all users should be listed", async () => {
	await expect(response).toBeOK();
	if (responseBody.count === 1) {
		expect(responseBody.results[0].state).toBe("operational");
		expect(responseBody.results[0].email).toBe("single.automation@exiqtive.com");
	}
});

Given("you attempt to create a user that is owner of an account", async function () {
	userData = generateRandomUserData();
	const updatedUserData = generateRandomUserData();

	((userData.email = updatedUserData.email),
	(userData.firstName = updatedUserData.firstName),
	(userData.lastName = updatedUserData.lastName),
	(response = await adminAPiCalls.createUserForAdmin(
		userData.email,
		userData.firstName,
		userData.lastName,
		true,
		true,
	)));

	responseBody = await response.json();
	id = responseBody.id;
	userStatus = responseBody.state_str;
});

Then("the current user is sysadmin", async function () {
	console.log(responseBody);
	expect(responseBody.is_superuser).toBe(true);
});

Then("you return user id when sucessfull", async function () {
	expect(responseBody.id).toBe(id);
});

Then("you send invite to join the account", async function () {
	expect(responseBody.state_str).toBe(userStatus);
});

Given("you attempt to create a sysadmin", async function () {
	userData = generateRandomUserData();
	const updatedUserData = generateRandomUserData();

	((userData.email = updatedUserData.email),
	(userData.firstName = updatedUserData.firstName),
	(userData.lastName = updatedUserData.lastName),
	(response = await adminAPiCalls.createUserForAdmin(
		userData.email,
		userData.firstName,
		userData.lastName,
		false,
		true,
	)));
	responseBody = await response.json();
	id = responseBody.id;
	userStatus = responseBody.state_str;
});
Then("SysAdmin is True", async function () {
	expect(responseBody.is_superuser).toBe(true);
});
Then("return user_id when succesfull", async function () {
	expect(responseBody.id).toBe(id);
});
Then("user is in status invited", async function () {
	expect(responseBody.state_str).toBe(userStatus);
});

Given("that a user already exists with the state invited", async function () {
	userData = generateRandomUserData();
	response = await userAPiCalls.createNewUser(
		userData.email,
		userData.firstName,
		userData.lastName,
		"invited",
		true,
		false,
		false,
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
	expect(responseBody.state).toContain("invited");
	console.log("invited User:", responseBody);
	createdUserId = responseBody.id;
});

Given("that a user already exists with the state Has Access", async function () {
	userData = generateRandomUserData();
	response = await userAPiCalls.createNewUser(
		userData.email,
		userData.firstName,
		userData.lastName,
		"operational",
		true,
		false,
		false,
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
	expect(responseBody.state).toContain("operational");
	createdUserId = responseBody.id;
});

Given("that a user already exists with the state suspended", async function () {
	userData = generateRandomUserData();
	response = await userAPiCalls.createNewUser(
		userData.email,
		userData.firstName,
		userData.lastName,
		"invited",
		true,
		false,
		false,
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
	expect(responseBody.state).toContain("invited");
	createdUserId = responseBody.id;

	response = await userAPiCalls.createSuspendUser(createdUserId);

	await expect(response).toBeOK();
	const suspendResponseBody = await response.json();
	expect(suspendResponseBody.state).toContain("invited");
});

Given("that a user already exists with the state closed", async function () {
	userData = generateRandomUserData();
	response = await userAPiCalls.createNewUser(
		userData.email,
		userData.firstName,
		userData.lastName,
		"operational",
		true,
		false,
		false,
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
	expect(responseBody.state).toContain("operational");
	createdUserId = responseBody.id;

	response = await userAPiCalls.createClosedUser(createdUserId);

	await expect(response).toBeOK();
	const suspendResponseBody = await response.json();
	expect(suspendResponseBody.state).toContain("closed");
});

When(/^you post to user chatter$/, async function () {
	note = getRandomPhrase();
	response = await userAPiCalls.postToChatter(createdUserId, note, "user", true);
});

Then("you return response for User status to be {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then(/^the note for user$/, async function () {
	responseBody = await response.json();
	expect(responseBody.note).toEqual(note);
});

Given("that a user has {int} posts to chatter", async function (chatters: number) {
	userData = generateRandomUserData();
	response = await userAPiCalls.createNewUser(
		userData.email,
		userData.firstName,
		userData.lastName,
		"invited",
		true,
		false,
		false,
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
	expect(responseBody.state).toContain("invited");
	createdUserId = responseBody.id;

	const baseNote = getRandomPhrase();
	for (let i = 0; i < chatters; i++) {
		const note = `${baseNote} ${i}`;
		const response = await userAPiCalls.postToChatter(createdUserId, note, "user", true);
		await expect(response).toBeOK();
	}
});

When("user calls the chatter list API for the user", async function () {
	response = await userAPiCalls.listUserChatter(createdUserId);
});

Then("verify the status for User Chatter list to be {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
	responseBody = await response.json();
});

Then("count of entries for the user chatter should be {int}", async function (chatterEntries: number) {
	expect(responseBody.results.length).toBe(chatterEntries);
});

Then("count of total user chatter should be {int}", async function (count: number) {
	expect(responseBody.count).toBe(count);
});

Given(/^that the list of user accounts is retrieved via API$/, async function () {
	response = await userAPiCalls.getUserAccounts(2);
	await expect(response).toBeOK();
	responseBody = await response.json();
	expectedNumberOfAccounts = (await responseBody.count) - 1;
});

When("the user signs up", async function () {
	response = await userAPiCalls.getPasswordToken(createdAdminUserId);
	await expect(response).toBeOK();
	responseBody = await response.json();
	token = responseBody;

	response = await userAPiCalls.signUp("aaaa", "aaaa", token, createdAdminUserId);
	await expect(response).toBeOK();
});

Then("verify the slack related resources are displayed", async function () {
	expect(responseBody.account_permissions[0].slack_url).toBeTruthy();
	expect(responseBody.account_permissions[0]).toHaveProperty("slack_channel_id");
	expect(responseBody.account_permissions[0]).toHaveProperty("slack_user_id");
	expect(responseBody.account_permissions[0]).toHaveProperty("slack_enabled");
});

When("that user calls the disable slack API", async function () {
	response = await userAPiCalls.disableSlack(3);
});

Then("Verify the response status for disable slack API to be {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then(/^Verify slack notifications are disabled$/, async function () {
	responseBody = await response.json();
	expect(responseBody.slack_user_id).toBeNull();
	expect(responseBody.slack_enabled).toBeFalsy();
});

When("verify user has access in the account {int}", async function (accountId: number) {
	response = await userAPiCalls.getUserAccess(accountId, createdUserId);
	responseBody = await response.json();
	userAccessId = responseBody.id;
	if (accountId === 3) {
		expect(responseBody.user.email).toBe(userData.email);
		expect(responseBody.user.first_name).toBe(userData.firstName);
		expect(responseBody.user.last_name).toBe(userData.lastName);
	} else {
		expect(responseBody.user.email).toBe(userDataForSpecificAccount.email);
		expect(responseBody.user.first_name).toBe(userDataForSpecificAccount.firstName);
		expect(responseBody.user.last_name).toBe(userDataForSpecificAccount.lastName);
	}
	expect(responseBody.user.id).toBe(createdUserId);
});

When("user calls the change user access API for a {string}", async function (userType: string) {
	switch (userType.toLowerCase()) {
		case "new user":
			changedUserData = generateRandomUserData();
			response = await userAPiCalls.changeUserAccess(
				userAccessId,
				changedUserData.firstName,
				changedUserData.lastName,
				changedUserData.email,
			);
			break;
		case "existing user":
			changedUserData = userDataForSpecificAccount;
			response = await userAPiCalls.changeUserAccess(
				userAccessId,
				changedUserData.firstName,
				changedUserData.lastName,
				changedUserData.email,
			);
			break;
		case "account user":
			changedUserData = userDataForSpecificAccount;
			response = await userAPiCalls.changeUserAccess(userAccessId, "Dan", "Raolinarivo", "dan@hazenfield.com");
			break;
	}
});

Then("verify the response for the change user access API to be {int}", async function (statusCode: number) {
	responseBody = await response.json();
	expect(response.status()).toBe(statusCode);
	if (response.status() !== 400) {
		createdUserId = responseBody.user.id;
		userData = changedUserData;
	}
});

Given("user is in state {string} and is co-owner", async function (status: string) {
	userData = generateRandomUserData();
	response = await userAPiCalls.createNewUser(
		userData.email,
		userData.firstName,
		userData.lastName,
		status.toLowerCase(),
		true,
		false,
		false,
		true,
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
	createdUserId = responseBody.id;
});

Then("verify a invitation is received for the user", async function () {
	const invite = await getLatestResetPasswordLinkFromEmail(userData.email);
	expect(invite).not.toBeNull();
});

Then("verify the error message for the change user access API is {string}", async function (errorMessage: string) {
	responseBody = await response.json();
	expect(responseBody.non_field_errors).toContain(errorMessage);
});

When("user calls the change ownership API", async function () {
	response = await userAPiCalls.changeOwnerShip(newAccountId, userDataFromChangeOwnership.email);
	responseBody = await response.json();
	console.log(responseBody);
});

Then("verify the response for change ownership API is {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then("verify the owner details are updated", async function () {
	expect(responseBody.owner_first_name).toBe(userDataFromChangeOwnership.firstName);
	expect(responseBody.owner_last_name).toBe(userDataFromChangeOwnership.lastName);
	expect(responseBody.owner_email).toBe(userDataFromChangeOwnership.email);
	expect(responseBody.owner).toBe(userIdFromChangeOwnership);
});

Then("verify the account status to be {string}", async function (accountStatus: string) {
	expect(responseBody.status).toBe(accountStatus.toLowerCase());
});

export { responseBody, expectedNumberOfAccounts, createdUserId };
