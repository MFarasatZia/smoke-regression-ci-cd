import { Given, Then, When } from "@cucumber/cucumber";
import { generateRandomUserData, UserData } from "../../helpers/util/random";
import AdminUserApi from "../../apis/admin/adminUser";
import { baseInstance } from "../../helpers/BaseClass";
import { APIResponse, expect } from "@playwright/test";
import AdminAccountApis from "../../apis/admin/adminAccount";
import { getTokenFromEmail } from "../../helpers/util/mailtrap";
import { invitedUserEmailViaAccountCreation, newAccountId, userIdFromOpenAccount } from "./adminAccountApiSteps";

let adminUserData: UserData;
let accountData: UserData;
let response: APIResponse;
let responseBody;
let createdAdminUserId: number;
let resetPasswordToken: string;
let token: string;
const adminUserApicalls: AdminUserApi = new AdminUserApi(baseInstance);
const adminAccountApiCalls: AdminAccountApis = new AdminAccountApis(baseInstance);

Given("that a {string} is in state {string}", async function (userType: string, state: string) {
	adminUserData = generateRandomUserData();

	const createCoOwnerInDraftState = async () => {
		response = await adminUserApicalls.createUserInAccount(
			adminUserData.email,
			adminUserData.firstName,
			adminUserData.lastName,
			true,
			false,
			true,
			false,
			false,
			false,
			true,
		);
		console.log(response);
		await expect(response).toBeOK();
		responseBody = await response.json();
		createdAdminUserId = responseBody.id;
		console.log(`${adminUserData.firstName}   ${adminUserData.email}      ${createdAdminUserId}`);
	};

	const createAppsUserInDraftState = async () => {
		response = await adminUserApicalls.createUserInAccount(
			adminUserData.email,
			adminUserData.firstName,
			adminUserData.lastName,
			true,
			true,
			true,
			true,
			true,
			true,
			false,
		);
		await expect(response).toBeOK();
		responseBody = await response.json();
		createdAdminUserId = responseBody.id;
		console.log(`${adminUserData.firstName}   ${adminUserData.email}      ${createdAdminUserId}`);
	};

	const createSuperUserInDraftState = async () => {
		response = await adminUserApicalls.createUserInAccount(
			adminUserData.email,
			adminUserData.firstName,
			adminUserData.lastName,
			true,
			true,
			true,
			true,
			true,
			true,
			false,
		);
		await expect(response).toBeOK();
		responseBody = await response.json();
		createdAdminUserId = responseBody.id;

		response = await adminUserApicalls.patchUserToSuperUser(createdAdminUserId);
		await expect(response).toBeOK();

		console.log(`${adminUserData.firstName}   ${adminUserData.email}      ${createdAdminUserId}`);
	};

	const setUpPasswordAndSignUp = async () => {
		response = await adminUserApicalls.getPasswordToken(createdAdminUserId);
		await expect(response).toBeOK();
		responseBody = await response.json();
		token = responseBody;
		adminUserData.password = "aaaa";
		response = await adminUserApicalls.signUp(
			adminUserData.password,
			adminUserData.password,
			token,
			createdAdminUserId,
		);
		await expect(response).toBeOK();
	};

	const updateUserState = async (state: string) => {
		switch (state.toLowerCase()) {
			case "blocked":
				response = await adminUserApicalls.userBlock(createdAdminUserId);
				await expect(response).toBeOK();
				break;
			case "closed":
				response = await adminUserApicalls.userClose(createdAdminUserId);
				await expect(response).toBeOK();
				break;
		}
	};

	switch (userType.toLowerCase()) {
		case "super user":
			await createSuperUserInDraftState();

			if (state.toLowerCase() === "operational") {
				await setUpPasswordAndSignUp();
			}

			if (state.toLowerCase() === "blocked" || state.toLowerCase() === "closed") {
				await setUpPasswordAndSignUp();
				await updateUserState(state);
			}
			break;

		case "co-owner":
			if (state.toLowerCase() === "blocked" || state.toLowerCase() === "closed") {
				await createCoOwnerInDraftState();
				await setUpPasswordAndSignUp();
				await updateUserState(state);
			} else {
				await createCoOwnerInDraftState();

				if (state.toLowerCase() === "operational") {
					await setUpPasswordAndSignUp();
				}
			}
			break;

		case "apps-user":
			if (state.toLowerCase() === "blocked" || state.toLowerCase() === "closed") {
				await createAppsUserInDraftState();
				await setUpPasswordAndSignUp();
				await updateUserState(state);
			} else {
				await createAppsUserInDraftState();

				if (state.toLowerCase() === "operational") {
					await setUpPasswordAndSignUp();
				}
			}
			break;
	}
});

When("user used rename account API calls", async function () {
	adminUserData = generateRandomUserData();
	response = await adminUserApicalls.renameUserAccount(
		createdAdminUserId,
		adminUserData.firstName,
		adminUserData.lastName,
	);
});

Then("response status for user to be {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then("user name is updated", async function () {
	responseBody = await response.json();
	expect(responseBody.first_name).toBe(adminUserData.firstName);
	expect(responseBody.last_name).toBe(adminUserData.lastName);
});

When("user calls the signup API using {string}", async function (passwordType: string) {
	switch (passwordType.toLowerCase()) {
		case "mismatched passwords":
			response = await adminUserApicalls.signUp("aaaa", "bbbb", "token", createdAdminUserId);
			break;
		case "valid credentials":
			createdAdminUserId = createdAdminUserId ?? userIdFromOpenAccount;
			response = await adminUserApicalls.signUp("aaaa", "aaaa", resetPasswordToken, createdAdminUserId);
			break;
	}
});

Then("verify response for signup API call is {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
	responseBody = await response.json();
});

Then("verify error message for the user signup API contains text {string}", async function (errorMessage: string) {
	if (errorMessage === "Only invited user can signup." || errorMessage === "Only invited user can sign up") {
		expect(responseBody).toContain("Only invited user can signup.");
	}
	if (errorMessage === "Passwords do not match.") {
		expect(responseBody.non_field_errors).toContain(errorMessage);
	}
});

When("user calls the resend invite API", async function () {
	responseBody = await response.json();
	const userId = responseBody.id;
	response = await adminUserApicalls.resendInvite(userId, 3);
});

Then("verify response for resend invite API call is {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

When(/^user calls the cancel invite API$/, async function () {
	createdAdminUserId = createdAdminUserId ?? userIdFromOpenAccount;
	response = await adminUserApicalls.cancelInvite(createdAdminUserId);
});

Then("verify response for cancel invite API call is {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then("verify user is deleted from the DB", async function () {
	response = await adminUserApicalls.getUser(createdAdminUserId);
	expect(response.status()).toBe(404);
});

Then("verify response for cancel invite API contains text {string}", async function (errorText: string) {
	responseBody = await response.json();
	expect(responseBody).toContain(errorText);
});

When("user calls the user block API", async function () {
	response = await adminUserApicalls.userBlock(createdAdminUserId);
});

Then("verify response for user block API is {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then("verify response for user block API contains text {string}", async function (errorText: string) {
	responseBody = await response.json();
	expect(responseBody).toContain(errorText);
});

When("user calls the user close API", async function () {
	response = await adminUserApicalls.userClose(createdAdminUserId);
});

Then("verify response for user close API is {int}", async function (statusCode: number) {
	responseBody = await response.json();
	expect(response.status()).toBe(statusCode);
});

Then("verify response for user close API contains text {string}", async function (errorText: string) {
	responseBody = await response.json();
	expect(responseBody).toContain(errorText);
});

When("user calls the user unblock API", async function () {
	response = await adminUserApicalls.userUnblock(createdAdminUserId);
});

Then("verify response for user unblock API is {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then("verify response for user unblock API contains text {string}", async function (errorText: string) {
	responseBody = await response.json();
	expect(responseBody).toContain(errorText);
});

When("user calls the user unclose API", async function () {
	response = await adminUserApicalls.userUnclose(createdAdminUserId);
});

Then("verify response for user unclose API is {int}", async function (statusCode: number) {
	responseBody = await response.json();
	expect(response.status()).toBe(statusCode);
});

Then("verify response for user unclose API contains text {string}", async function (errorText: string) {
	responseBody = await response.json();
	expect(responseBody).toContain(errorText);
});

When("user calls the user suspend API for {string}", async function (userType: string) {
	switch (userType.toLowerCase()) {
		case "owner":
			response = await adminUserApicalls.userSuspend(2, newAccountId);
			break;
		case "non-owner":
			response = await adminUserApicalls.userSuspend(createdAdminUserId, 3);
			break;
	}
});

Then("verify response for user suspend API is {int}", async function (statusCode: number) {
	responseBody = await response.json();
	expect(response.status()).toBe(statusCode);
});

Given("that super a user is owner of a account", async function () {
	accountData = generateRandomUserData();
	const accountName = accountData.firstName;
	response = await adminAccountApiCalls.createAccount(accountName);
	await expect(response).toBeOK();
	responseBody = await response.json();
	const accountId = responseBody.id;
	response = await adminAccountApiCalls.openAccount(
		accountId,
		adminUserData.email,
		adminUserData.firstName,
		adminUserData.lastName,
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
	createdAdminUserId = responseBody.owner;
});

When("user calls the reset password API using {string}", async function (emailType: string) {
	const email: string = adminUserData?.email !== undefined ? adminUserData.email : generateRandomUserData().email;
	switch (emailType.toLowerCase()) {
		case "valid format email":
			response = await adminUserApicalls.resetPassword(email);
			if (adminUserData?.email === email) {
				await expect(response).toBeOK();
				responseBody = await response.json();
				resetPasswordToken = await getTokenFromEmail(email);
			}
			break;
		case "invalid format email":
			response = await adminUserApicalls.resetPassword(email.replace("@", ""));
			break;
		case "email created via invite from account creation":
			response = await adminUserApicalls.resetPassword(invitedUserEmailViaAccountCreation);
			await expect(response).toBeOK();
			responseBody = await response.json();
			resetPasswordToken = await getTokenFromEmail(invitedUserEmailViaAccountCreation);
	}
});

Then("verify response for reset password API call is {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then("verify the reset password API sends a token in the email", async function () {
	resetPasswordToken = await getTokenFromEmail(adminUserData.email);
	expect(resetPasswordToken).not.toBeNull();
});

Then("verify user state is {string}", async function (userState: string) {
	responseBody = await response.json();
	expect(responseBody.state).toBe(userState.toLowerCase());
});

Then("verify the error message for the reset password API contains text {string}", async function (errorText: string) {
	responseBody = await response.json();
	expect(responseBody).toContain(errorText);
});

Then("verify response for user suspend API contains text {string}", async function (errorText: string) {
	responseBody = await response.json();
	expect(responseBody).toContain(errorText);
});

Given("that user is in state {string}", async function (state: string) {
	adminUserData = generateRandomUserData();
	response = await adminUserApicalls.createUserInAccount(
		adminUserData.email,
		adminUserData.firstName,
		adminUserData.lastName,
		true,
		true,
		true,
		true,
		true,
		true,
		false,
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
	createdAdminUserId = responseBody.id;

	if (state.toLowerCase() !== "invited") {
		if (state.toLowerCase() === "operational") {
			response = await adminUserApicalls.getPasswordToken(createdAdminUserId);
			await expect(response).toBeOK();
			responseBody = await response.json();
			const token = responseBody;
			adminUserData.password = "aaaa";

			response = await adminUserApicalls.signUp("aaaa", "aaaa", token, createdAdminUserId);
			await expect(response).toBeOK();
		}

		if (state.toLowerCase() === "blocked" || state.toLowerCase() === "closed") {
			response = await adminUserApicalls.getPasswordToken(createdAdminUserId);
			await expect(response).toBeOK();
			responseBody = await response.json();
			const token = responseBody;
			adminUserData.password = "aaaa";

			response = await adminUserApicalls.signUp("aaaa", "aaaa", token, createdAdminUserId);
			await expect(response).toBeOK();

			if (state.toLowerCase() === "blocked") {
				response = await adminUserApicalls.userBlock(createdAdminUserId);
			} else if (state.toLowerCase() === "closed") {
				response = await adminUserApicalls.userClose(createdAdminUserId);
			}
			await expect(response).toBeOK();
		}
	}
});

When("the super user signs up", async function () {
	response = await adminUserApicalls.getPasswordToken(createdAdminUserId);
	await expect(response).toBeOK();
	responseBody = await response.json();
	token = responseBody;

	response = await adminUserApicalls.signUp("aaaa", "aaaa", token, createdAdminUserId);
	await expect(response).toBeOK();
});

When("user calls the test email API", async function () {
	response = await adminUserApicalls.testEmail(adminUserData.email);
	await expect(response).toBeOK();
});

Then("verify the test email returns state {string}", async function (state: string) {
	responseBody = await response.json();
	expect(responseBody.state).toEqual(state.toLowerCase());
});

When("user calls the get user API", async function () {
	response = await adminUserApicalls.getUser(createdAdminUserId);
});

Then(
	"verify the response for get user API contains super_admin_editing set as {}",
	async function (superAdminEditing: string) {
		responseBody = await response.json();
		switch (superAdminEditing) {
			case "false":
				expect(responseBody.super_admin_editing).toBeFalsy();
				break;
			case "true":
				expect(responseBody.super_admin_editing).toBeTruthy();
				break;
		}
	},
);

When("user calls the patch user API to change super_admin_editing to {}", async function (superAdminEditing: string) {
	response = await adminUserApicalls.patchUser(createdAdminUserId, superAdminEditing);
	await expect(response).toBeOK();
});

Then("verify the response for patch user API is {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then(
	"verify the response for patch user API contains super_admin_editing set as {}",
	async function (superAdminEditing: string) {
		responseBody = await response.json();
		switch (superAdminEditing) {
			case "false":
				expect(responseBody.super_admin_editing).toBeFalsy();
				break;
			case "true":
				expect(responseBody.super_admin_editing).toBeTruthy();
				break;
		}
	},
);

export { adminUserData, createdAdminUserId };
