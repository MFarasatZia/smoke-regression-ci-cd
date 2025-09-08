import { Then, When } from "@cucumber/cucumber";
import { getUserDetails } from "../../helpers/jsonHelper";
import { baseInstance } from "../../helpers/BaseClass";
import { APIResponse, expect } from "@playwright/test";
import AdminLoginApis from "../../apis/admin/adminLogin";
import { faker } from "@faker-js/faker";

const adminLoginApiCalls: AdminLoginApis = new AdminLoginApis(baseInstance);
let response: APIResponse;
let responseBody;

When("{string} logs to admin portal via API", async function (userType: string) {
	let userName: string;
	let password: string;
	switch (userType.toLowerCase()) {
		case "super user":
			userName = (await getUserDetails(baseInstance.user)).super_user_email;
			password = (await getUserDetails(baseInstance.user)).super_user_password;
			break;
		case "normal user":
			userName = (await getUserDetails(baseInstance.user)).email;
			password = (await getUserDetails(baseInstance.user)).password;
			break;
		case "nonexistent user":
			userName = faker.internet.email();
			password = faker.internet.password();
	}
	response = await adminLoginApiCalls.loginToAdminPortal(userName, password);
	responseBody = await response.json();
});

Then("verify the response for the admin login API is {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
});

Then("verify the admin login API returns the token", async function () {
	responseBody = await response.json();
	expect(responseBody.token).not.toBeNull();
});

Then("verify response for admin login API contains text {string}", async function (errorText: string) {
	responseBody = await response.json();
	expect(responseBody.detail).toContain(errorText);
});
