import { When } from "@cucumber/cucumber";
import ForgotPasswordPage from "../../pages/owner/forgotPasswordPage";
import { baseInstance } from "../../helpers/BaseClass";
import { userData } from "./userApiSteps";

const forgotPasswordPage: ForgotPasswordPage = new ForgotPasswordPage(baseInstance);

When("verify user lands on Forgot password page", async function () {
	await forgotPasswordPage.verifyForgotPasswordPageIsDisplayed();
});

When(/^the user resets his password$/, async function () {
	await forgotPasswordPage.resetPassword(userData.email);
	await forgotPasswordPage.clickResetPasswordButton();
});

When(/^user clicks the 'Click to resend' button$/, async function () {
	await forgotPasswordPage.clickResendPasswordLinkButton();
});
