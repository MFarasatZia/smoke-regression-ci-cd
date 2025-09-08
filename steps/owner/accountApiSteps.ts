import { Then, When } from "@cucumber/cucumber";
import { AccountData, getRandomAccount } from "../../helpers/util/random";
import { baseInstance } from "../../helpers/BaseClass";
import AccountApis from "../../apis/owner/account";
import { expect } from "@playwright/test";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let response: any, responseBody: any;
let userId: number;
let newAccountData: AccountData = getRandomAccount();
let userName: string;
const accountApiCalls: AccountApis = new AccountApis(baseInstance);

When("the user is {string} with API", async function (userAction: string) {
	if (userAction === "Created") {
		response = await accountApiCalls.createUserForAdmin(
			newAccountData.email,
			newAccountData.firstName,
			newAccountData.lastName,
			false,
			false,
		);

		responseBody = await response.json();
		userId = responseBody.id;
	} else if (userAction === "Renamed") {
		const updateAccountData: AccountData = getRandomAccount();
		newAccountData = updateAccountData;

		response = await accountApiCalls.renameUser(userId, newAccountData.firstName, newAccountData.lastName);

		responseBody = await response.json();
		userName = responseBody.first_name;
	} else if (userAction === "Deleted") {
		response = await accountApiCalls.deleteUser(userId);
		responseBody = response.json;
	}
});

When("the user account is created with API", async function () {
	const userId = 3;
	const randomName = `User_${Math.random().toString(36).substring(7)}`;
	response = await accountApiCalls.createUserAccount(userId, {
		name: randomName,
	});
	responseBody = await response.json();
	expect(responseBody.name).toBe(randomName);
});

When("User Call the Get User Account API", async function () {
	const userId = 3;
	const accountRecordId = 3;
	response = await accountApiCalls.getUserAccount(userId, accountRecordId);
	const statusCode = response.status();
	responseBody = await response.json();
	expect(statusCode).toBe(200);
	expect(responseBody).toHaveProperty("name");
});

Then("the user account currency should be verified", async function () {
	expect(responseBody).toHaveProperty("currency");
	expect(responseBody.currency).not.toBeNull();
});

Then("Verify the response status for user to be {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then("Verify that the user name is updated", async function () {
	expect(responseBody.first_name).toBe(userName);
});

Then("Verify the user is deleted", async function () {
	response = await accountApiCalls.listAllUsers();
	responseBody = response.json;
	expect(responseBody).not.toContain(userId);
});

Then("Verify the user Last login", async function () {
	await expect(response).toBeOK();
	responseBody = await response.json();
	expect(responseBody.last_login).not.toBeNull();
});

Then("verify response for create user API is {int}", async function (statusCode: number) {
	responseBody = await response.json();
	expect(response.status()).toBe(statusCode);
});

Then("user status is {string}", async function (userState: string) {
	responseBody = await response.json();
	expect(responseBody.state).toBe(userState);
});

When("User call the create notification API", async function () {
	response = await accountApiCalls.createNotificationCreation(userId);
	responseBody = await response.json();
});

Then("User call the create push notification API", async function () {
	response = await accountApiCalls.createPushNotification(userId);
	responseBody = await response.json();
});

Then("User verify the message \"'Success, notification pushed successfully set'\"", async function () {
	const expectedMessage = "Success, notification pushed successfully set";
	if (responseBody.status !== undefined) {
		expect(responseBody.status).toBe(expectedMessage);
	} else if (responseBody.message !== undefined) {
		expect(responseBody.message).toBe(expectedMessage);
	} else {
		throw new Error(
			`Expected response to contain 'status' or 'message' property but found: ${JSON.stringify(responseBody)}`,
		);
	}
});

When("user calls the account login API", async function () {
	const accountId = parseInt(process.env.ACCOUNT_ID!);
	response = await accountApiCalls.accountLogin(accountId);
	responseBody = await response.json();
});

Then("verify the response status for account login API is {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then("verify the last_accessed field is present and valid", async function () {
	expect(responseBody).toHaveProperty("last_accessed_at");
	expect(responseBody.last_accessed_at).not.toBeNull();
	expect(responseBody.last_accessed_at).not.toBeUndefined();
});

export { newAccountData };
