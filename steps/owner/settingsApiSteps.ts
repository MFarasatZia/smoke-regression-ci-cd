import { Given, When } from "@cucumber/cucumber";
import UserApi from "../../apis/owner/user";
import { baseInstance } from "../../helpers/BaseClass";
import { UserData, generateRandomUserData } from "../../helpers/util/random";
import { expect } from "@playwright/test";

const accountId = 3;

let userId, response, responseBody;
let addedUserData: UserData = generateRandomUserData();
const userApiCalls: UserApi = new UserApi(baseInstance);

Given("User add {int} user in the setting > user", async function (numberOfUsers: number) {
	await userApiCalls.createMultipleUsers(numberOfUsers);
});

Given("Create a new user with API", async function () {
	response = await userApiCalls.createNewUser(
		addedUserData.email,
		addedUserData.firstName,
		addedUserData.lastName,
		"invited",
		false,
		false,
		false,
	);
	await expect(response).toBeOK();
	responseBody = await response.json();
});

When("user has access in account", async function () {
	const email = addedUserData.email;
	// eslint-disable-next-line camelcase
	const first_name = addedUserData.firstName;
	// eslint-disable-next-line camelcase
	const last_name = addedUserData.lastName;
	const hasAccess = true;
	const isSuspended = true;
	const isOwner = false;

	await userApiCalls.createNewUser(email, first_name, last_name, "invited", hasAccess, isSuspended, isOwner);
	await userApiCalls.getUserAccess(accountId, userId);
});

Given("user have a owner permission in an account", async () => {
	await userApiCalls.getUserAccess(accountId, userId);
});

When("user has access suspended in account", async function () {
	const updateUserData: UserData = generateRandomUserData();
	addedUserData = updateUserData;
	const email = addedUserData.email;
	// eslint-disable-next-line camelcase
	const suspendUserFirst_name = addedUserData.firstName;
	// eslint-disable-next-line camelcase
	const last_name = addedUserData.lastName;
	const hasAccess = false;
	const isSuspended = true;
	const isOwner = false;

	response = await userApiCalls.createNewUser(
		email,
		suspendUserFirst_name,
		last_name,
		"suspended",
		hasAccess,
		isSuspended,
		isOwner,
	);
	responseBody = await response.json();
	userId = responseBody.id;
});

export { addedUserData };
