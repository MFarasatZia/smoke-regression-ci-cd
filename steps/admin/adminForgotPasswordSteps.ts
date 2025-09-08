import { When } from "@cucumber/cucumber";
import { baseInstance } from "../../helpers/BaseClass";
import AdminForgotPasswordPage from "../../pages/admin/adminForgotPasswordPage";
import { adminUserData } from "./adminUsersApiSteps";

const adminForgotPasswordPage: AdminForgotPasswordPage = new AdminForgotPasswordPage(baseInstance);

When("verify super user lands on Forgot password page", async function () {
	await adminForgotPasswordPage.verifyForgotPasswordPageIsDisplayed();
});

When(/^super user resets his password$/, async function () {
	await adminForgotPasswordPage.resetPassword(adminUserData.email);
	await adminForgotPasswordPage.clickResetPasswordButton();
});

When(/^super user clicks the 'Click to resend' button$/, async function () {
	await adminForgotPasswordPage.clickResendPasswordLinkButton();
});
