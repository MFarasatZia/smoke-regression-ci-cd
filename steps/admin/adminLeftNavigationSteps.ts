import { Given, Then, When } from "@cucumber/cucumber";
import { baseInstance } from "../../helpers/BaseClass";
import AdminLoginPage from "../../pages/admin/adminLoginPage";
import AdminLeftNavigationPage from "../../pages/admin/adminLeftNavigationPage";
import { adminUserData } from "./adminUsersApiSteps";
import { expect } from "@playwright/test";
const adminLoginPage: AdminLoginPage = new AdminLoginPage(baseInstance);
const adminLeftNavigationPage: AdminLeftNavigationPage = new AdminLeftNavigationPage(baseInstance);

When("user logs into admin portal as super user", async function () {
	await adminLoginPage.loginToAdminPortal();
});

When("super user tries to login with a {string} user", async function (userType: string) {
	switch (userType.toLowerCase()) {
		case "closed":
		case "blocked":
			await adminLoginPage.loginToAdminWithCustomCredentials(adminUserData.email, adminUserData.password);
			break;
	}
});

When("user logs into admin portal with a super user created via API", async function () {
	await adminLoginPage.loginToAdminWithCustomCredentials(adminUserData.email, "aaaa");
});

Then("verify the user lands on the {string} page", async function (page: string) {
	await adminLeftNavigationPage.verifyPageIsDisplayed(page);
});

When("user navigates to {string} admin page", async function (page: string) {
	await adminLeftNavigationPage.navigateTo(page);
});

Then("user remove the {string} status", async function (status: string) {
	await adminLeftNavigationPage.removeStatusFilter(status);
});

When("user is logs out from admin portal", async function () {
	await adminLeftNavigationPage.clickAdminLogoutButton();
});

Then("verify user is redirected to the admin login page", async function () {
	await adminLeftNavigationPage.reloadThePage();
	await adminLeftNavigationPage.verifyAdminLogoutPageIsDisplayed();
});

Then("user is on admin portal and The Remember for 30 days checkbox not to be visible", async function () {
	await adminLeftNavigationPage.verifyAdminRememberMeIsNotDisplayed();
});

Given("verify the admin editing switch is toggled {string}", async function (adminEditing: string) {
	switch (adminEditing) {
		case "off":
			expect(await adminLeftNavigationPage.getAdminEditingBoolean()).toBe("false");
			break;
		case "on":
			expect(await adminLeftNavigationPage.getAdminEditingBoolean()).toBe("true");
			break;
	}
});
When("user clicks the admin editing switch", async function () {
	await adminLeftNavigationPage.clickAdminEditingSwitch();
});

When("user clicks on perticuler user", async function () {
	await adminLeftNavigationPage.clickUser();
});

Then("verify that Users Form in Users", async function () {
	await adminLeftNavigationPage.verifyUserFormIsDisplayed();
});
