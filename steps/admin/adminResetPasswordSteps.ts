import { baseInstance } from "../../helpers/BaseClass";
import {Then, When} from "@cucumber/cucumber";
import AdminResetPasswordPage from "../../pages/admin/adminResetPasswordPage";
import { adminUserData } from "./adminUsersApiSteps";
import {uiUserData} from "./adminUsersSteps";

const adminResetPasswordPage: AdminResetPasswordPage = new AdminResetPasswordPage(baseInstance);

When(/^super user opens the reset password page$/, async function () {
	await adminResetPasswordPage.openResetPasswordPage();
	await adminResetPasswordPage.verifyResetPasswordPageIsDisplayed();
});

When(/^super user opens the setup password page$/, async function () {
	await adminResetPasswordPage.openResetPasswordPage();
	await adminResetPasswordPage.verifySetupPasswordPageIsDisplayed();
});

When(/^super user successfully resets his password$/, async function () {
	const password = adminUserData?.password ? adminUserData.password : uiUserData.password;
	console.log("new password: " + password);
	await adminResetPasswordPage.resetPassword(password, password);
	await adminResetPasswordPage.verifyResetPasswordConfirmationMessageIsDisplayed();
});

When(/^super user tries to reset his password using previous password$/, async function () {
	const password = adminUserData.password;
	await adminResetPasswordPage.resetPassword(password, password);
});

When(/^super user successfully signs up$/, async function () {
	await adminResetPasswordPage.resetPassword(adminUserData.password, adminUserData.confirmPassword);
});

When("super user clicks on {string} button from reset password page", async function (button: string) {
	switch (button.toLowerCase()) {
		case "continue":
			await adminResetPasswordPage.clickContinueButton();
			break;
	}
});

Then("verify the password is not reset", async function () {
	await adminResetPasswordPage.verifyResetPasswordConfirmationMessageIsNotDisplayed();
});

When("the user opens the password reset link from mailtrap", async function () {
	await adminResetPasswordPage.openResetPasswordPage();
});

Then("verify the admin password reset page is displayed", async function () {
	await adminResetPasswordPage.verifyResetPasswordPageIsDisplayed();
});