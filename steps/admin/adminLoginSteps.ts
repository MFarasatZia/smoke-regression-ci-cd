import { Then, When } from "@cucumber/cucumber";
import AdminLoginPage from "../../pages/admin/adminLoginPage";
import { baseInstance } from "../../helpers/BaseClass";
import { adminUserData } from "./adminUsersApiSteps";
import { uiUserData } from "./adminUsersSteps";

const adminLoginPage: AdminLoginPage = new AdminLoginPage(baseInstance);

When("the super user clicks the {string} button", async function (button: string) {
	switch (button.toLowerCase()) {
		case "forgot password":
			await adminLoginPage.clickForgotPasswordButton();
			break;
	}
});

When("super user logs with a {string} user", async function (userType: string) {
	const email = adminUserData?.email ? adminUserData.email : uiUserData.email;
	const password = adminUserData?.password ? adminUserData.password : uiUserData.password;
	switch (userType.toLowerCase()) {
		case "new":
			await adminLoginPage.loginWithCustomCredentials(email, password);
	}
});

When("super user opens the admin portal", async function () {
	await adminLoginPage.openAdminPortal();
});

Then("verify the the user is not allowed to log in", async function () {
	await adminLoginPage.verifyLoginDeniedDueToBlockedOrClosedUser(adminUserData.email);
});
