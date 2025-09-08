import { Given, Then, When } from "@cucumber/cucumber";
import { APIResponse, expect } from "@playwright/test";
import AdminAccountApis from "../../apis/admin/adminAccount";
import { baseInstance } from "../../helpers/BaseClass";
import { AccountData, generateRandomUserData, getRandomAccount, UserData } from "../../helpers/util/random";
import AdminUserApi from "../../apis/admin/adminUser";

let accountData: UserData;
let newAccountAPIData: AccountData;
let userData: UserData;
let newAccountId: number;
let invitedUserEmailViaAccountCreation: string;
let userIdFromOpenAccount: number;
let userDataFromChangeOwnership: UserData;
let userIdFromChangeOwnership: number;
let originalAccountName: string;
let response: APIResponse;
let responseBody;
let token: string;
const adminAccountApiCalls = new AdminAccountApis(baseInstance);
const adminUserApiCalls = new AdminUserApi(baseInstance);

When("user calls the close account API", async function () {
	response = await adminAccountApiCalls.closeAccount(newAccountId);
});

Then("verify the response for the close account API is {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then("verify the account is in status {string}", async function (status: string) {
	responseBody = await response.json();
	expect(responseBody.status).toContain(status.toLowerCase());
});

Then("verify the error message for the close account API is {string}", async function (errorMessage: string) {
	responseBody = await response.json();
	expect(responseBody).toContain(errorMessage);
});

When("user calls the change owner API using {string}", async function (option: string) {
	switch (option.toLowerCase()) {
		case "existing email address":
			newAccountAPIData.email = "dan@hazenfield.com";
			response = await adminAccountApiCalls.changeOwner(newAccountId, "dan@hazenfield.com");
			break;
		case "nonexistent email address":
			// eslint-disable-next-line no-case-declarations
			newAccountAPIData.email = generateRandomUserData().email;
			response = await adminAccountApiCalls.changeOwner(newAccountId, newAccountAPIData.email);
			break;
	}
	responseBody = await response.json();
});

Then("verify the response for the change owner API is {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then("verify the owner fields contains the updated value", async function () {
	responseBody = await response.json();
	expect(responseBody.owner).toBe(3);
	expect(responseBody.owner_email).toBe(newAccountAPIData.email);
});

Then("verify the error message for the change owner API is {string}", async function (errorText: string) {
	responseBody = await response.json();
	expect(responseBody).toContain(errorText);
});

When("user calls the delete account API", async function () {
	response = await adminAccountApiCalls.deleteAccount(newAccountId);
});

Then("verify the response for the delete account API is {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then("verify the error message for the delete account API is {string}", async function (errorText: string) {
	responseBody = await response.json();
	expect(responseBody).toContain(errorText);
});

When("user that is not super user calls the create account API", async function () {
	accountData = generateRandomUserData();
	response = await adminAccountApiCalls.createAccountUsingNormalUser(accountData.firstName);
});

Then("verify the response for the create account API is {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then("verify error message for the create account API is {string}", async function (errorText: string) {
	responseBody = await response.json();
	expect(responseBody.detail).toContain(errorText);
});

When("super user calls the create account API", async function () {
	accountData = generateRandomUserData();
	response = await adminAccountApiCalls.createAccount(accountData.firstName);
	await expect(response).toBeOK();
	responseBody = await response.json();
	newAccountId = responseBody.id;
});

Then("user should receive the account creation response", async function () {
	expect(responseBody).toHaveProperty("id");
	expect(responseBody.readiness).toBe(true);
	expect(responseBody.performance).toBe(false);
	expect(responseBody.compensation).toBe(false);
	expect(responseBody.knowledge).toBe(false);
});

Then("verify the status of the account is {string}", async function (status: string) {
	responseBody = await response.json();
	const actualStatus = responseBody.status;
	expect(actualStatus).toEqual(status.toLowerCase());
});

When("user calls the rename account API", async function () {
	newAccountAPIData = generateRandomUserData();
	response = await adminAccountApiCalls.renameAccount(newAccountId, newAccountAPIData.firstName);
});

Then("verify the account is renamed", async function () {
	responseBody = await response.json();
	expect(responseBody.name).toEqual(newAccountAPIData.firstName);
});

When("user call the open account API with {string}", async function (userType: string) {
	switch (userType.toLowerCase()) {
		case "nonexisting user":
			userData = generateRandomUserData();
			invitedUserEmailViaAccountCreation = userData.email;
			response = await adminAccountApiCalls.openAccount(
				newAccountId,
				userData.email,
				userData.firstName,
				userData.lastName,
			);
			responseBody = await response.json();
			userIdFromOpenAccount = responseBody.owner;
			break;
		case "existing user":
			userData = generateRandomUserData();
			userData.email = "eric@nanoramic.com";
			userData.firstName = "Eric";
			userData.lastName = "Kish";
			response = await adminAccountApiCalls.openAccount(
				newAccountId,
				userData.email,
				userData.firstName,
				userData.lastName,
			);
			break;
	}
});

Then("verify the response for the open account API is {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then("verify the user is the owner of the account", async function () {
	responseBody = await response.json();
	expect(responseBody.owner_first_name).toEqual(userData.firstName);
	expect(responseBody.owner_last_name).toEqual(userData.lastName);
	expect(responseBody.owner_email).toEqual(userData.email);
	if (userData.email === "eric@nanoramic.com") {
		expect(responseBody.owner).toBe(2);
	}
});

Given("that a account is in status {string}", async function (status: string) {
	newAccountAPIData = getRandomAccount();
	response = await adminAccountApiCalls.createAccount(newAccountAPIData.firstName);

	await expect(response).toBeOK();
	responseBody = await response.json();
	newAccountId = responseBody.id;
	originalAccountName = newAccountAPIData.firstName;
	const updateAccountData: AccountData = getRandomAccount();

	switch (status.toLowerCase()) {
		case "pending activation":
			response = await adminAccountApiCalls.openAccount(
				newAccountId,
				newAccountAPIData.email,
				updateAccountData.firstName,
				updateAccountData.lastName,
			);
			responseBody = await response.json();
			break;
		case "open for existing user":
			response = await adminAccountApiCalls.openAccount(
				newAccountId,
				"eric@nanoramic.com",
				updateAccountData.firstName,
				updateAccountData.lastName,
			);
			responseBody = await response.json();
			break;
		case "closed":
			response = await adminAccountApiCalls.openAccount(
				newAccountId,
				"eric@nanoramic.com",
				newAccountAPIData.firstName,
				newAccountAPIData.lastName,
			);
			await expect(response).toBeOK();
			responseBody = await response.json();
			response = await adminAccountApiCalls.closeAccount(newAccountId);
			await expect(response).toBeOK();
			break;
		case "suspended":
			newAccountAPIData = generateRandomUserData();
			response = await adminAccountApiCalls.openAccount(
				newAccountId,
				"eric@nanoramic.com",
				newAccountAPIData.firstName,
				newAccountAPIData.lastName,
			);
			await expect(response).toBeOK();
			responseBody = await response.json();

			response = await adminAccountApiCalls.suspendAccount(newAccountId, "reason");
			await expect(response).toBeOK();
			responseBody = await response.json();
			newAccountAPIData.firstName = originalAccountName;
			break;
	}
});

export { newAccountAPIData, originalAccountName };

Then("verify error message for the open account API is {string}", async function (errorText: string) {
	responseBody = await response.json();
	expect(responseBody).toContain(errorText);
});

When("user call the suspend account API reason {string}", async function (reason: string) {
	response = await adminAccountApiCalls.suspendAccount(newAccountId, reason);
});

Then("verify the response for the suspend account API is {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then("verify error message for the suspend account API is {string}", async function (errorText: string) {
	responseBody = await response.json();
	expect(responseBody).toContain(errorText);
});

When("user calls the get account API", async function () {
	response = await adminAccountApiCalls.getAccount(newAccountId);
});

Then("verify the account status is {string}", async function (accountStatus: string) {
	responseBody = await response.json();
	expect(responseBody.status).toContain(accountStatus.toLowerCase());
});

When("user calls the {string} API for the user invited to open the account", async function (apiType: string) {
	switch (apiType.toLowerCase()) {
		case "cancel invite":
			response = await adminUserApiCalls.cancelInvite(userIdFromOpenAccount);
			break;
		case "delete":
			response = await adminUserApiCalls.deleteUser(userIdFromOpenAccount);
			break;
	}
	await expect(response).toBeOK();
});

Then("verify the owner details are not persisted", async function () {
	responseBody = await response.json();
	expect(responseBody.owner_first_name).toBeNull();
	expect(responseBody.owner_last_name).toBeNull();
	expect(responseBody.owner_email).toBeNull();
	expect(responseBody.owner).toBeNull();
});

When("user calls the get token API", async () => {
	response = await adminUserApiCalls.getPasswordToken(userIdFromOpenAccount);
	await expect(response).toBeOK();
});

When("User Call the Admin count list API", async () => {
	response = await adminUserApiCalls.getAdminCountList();
	await expect(response).toBeOK();
});

When("User verifies the active accounts count is valid", async () => {
	const response = await adminUserApiCalls.getAdminCountList();
	await expect(response).toBeOK();
	const responseData = await response.json();
	const activeAccounts = responseData.active_accounts;
	expect(typeof activeAccounts).toBe("number");
	expect(activeAccounts).toBeGreaterThanOrEqual(0);
});

When("User verifies the active users count is valid", async () => {
	const response = await adminUserApiCalls.getAdminCountList();
	await expect(response).toBeOK();
	const responseData = await response.json();
	const activeUsers = responseData.active_users;
	expect(typeof activeUsers).toBe("number");
	expect(activeUsers).toBeGreaterThanOrEqual(0);
});

Then("verify the API response is 200", async () => {
	response = await adminUserApiCalls.getPasswordToken(userIdFromOpenAccount);
	await expect(response.status()).toBe(200);
});

Then("verify the response has token", async () => {
	response = await adminUserApiCalls.getPasswordToken(userIdFromOpenAccount);
	responseBody = await response.json();
	await expect(responseBody).not.toBeNull();
	token = responseBody;
});

Then("user calls the signup api", async () => {
	response = await adminUserApiCalls.signUp("aaaa", "aaaa", token, userIdFromOpenAccount);
	await expect(response).toBeOK();
});

Then("verify signup api response is 200", async () => {
	await expect(response.status()).toBe(200);
	responseBody = await response.json();
});

Then("verify account state is operational", async () => {
	await expect(responseBody.state).toBe("operational");
});

When("user calls the update account API", async function () {
	const updatedAccountData = {
		// eslint-disable-next-line camelcase
		show_employee_directory: true,
		// eslint-disable-next-line camelcase
		show_responsibilities_directories: true,
	};
	response = await adminAccountApiCalls.updateAccount(newAccountId, updatedAccountData);
	responseBody = await response.json();
	console.log(responseBody);
});

Then("Verify that the account is updated successfully", async function () {
	expect(responseBody.show_employee_directory).toBe(true);
	expect(responseBody.show_responsibilities_directories).toBe(true);
});

Given("a {string} in state {string} exists in the account", async function (userType: string, userStatus: string) {
	userDataFromChangeOwnership = generateRandomUserData();

	const createCoOwnerInDraftState = async () => {
		response = await adminUserApiCalls.createUserInAccount(
			userDataFromChangeOwnership.email,
			userDataFromChangeOwnership.firstName,
			userDataFromChangeOwnership.lastName,
			true,
			false,
			true,
			false,
			false,
			false,
			true,
			newAccountId,
		);
		await expect(response).toBeOK();
		responseBody = await response.json();
		userIdFromChangeOwnership = responseBody.id;
	};

	const createAppsUserInDraftState = async () => {
		response = await adminUserApiCalls.createUserInAccount(
			userDataFromChangeOwnership.email,
			userDataFromChangeOwnership.firstName,
			userDataFromChangeOwnership.lastName,
			true,
			true,
			true,
			true,
			true,
			true,
			false,
			newAccountId,
		);
		await expect(response).toBeOK();
		responseBody = await response.json();
		userIdFromChangeOwnership = responseBody.id;
	};

	const setUpPasswordAndSignUp = async () => {
		response = await adminUserApiCalls.getPasswordToken(userIdFromChangeOwnership);
		await expect(response).toBeOK();
		responseBody = await response.json();
		token = responseBody;
		userDataFromChangeOwnership.password = "aaaa";
		response = await adminUserApiCalls.signUp(
			userDataFromChangeOwnership.password,
			userDataFromChangeOwnership.password,
			token,
			userIdFromChangeOwnership,
		);
		await expect(response).toBeOK();
	};

	switch (userType) {
		case "co-owner":
			await createCoOwnerInDraftState();
			if (userStatus.toLowerCase() === "operational") {
				await setUpPasswordAndSignUp();
			}
			break;
		case "apps-user":
			await createAppsUserInDraftState();
			if (userStatus.toLowerCase() === "operational") {
				await setUpPasswordAndSignUp();
			}
			break;
	}
});

export {
	newAccountId,
	userIdFromOpenAccount,
	invitedUserEmailViaAccountCreation,
	userDataFromChangeOwnership,
	userIdFromChangeOwnership,
};
