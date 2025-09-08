import ResetPasswordPage from "../../pages/owner/resetPasswordPage";
import { baseInstance } from "../../helpers/BaseClass";
import { Given, Then, When } from "@cucumber/cucumber";
import { userData } from "./userApiSteps";
import { addedUserData } from "./settingsApiSteps";

const resetPasswordPage: ResetPasswordPage = new ResetPasswordPage(baseInstance);

When(/^the user opens the reset password page$/, async function () {
	await resetPasswordPage.openResetPasswordPage();
	await resetPasswordPage.verifyResetPasswordPageIsDisplayed();
});

When(/^the user successfully resets his password$/, async function () {
	await resetPasswordPage.resetPassword(userData.password, userData.confirmPassword);
	await resetPasswordPage.verifyResetPasswordConfirmationMessageIsDisplayed();
});

When("user clicks on {string} button from reset password page", async function (button: string) {
	switch (button.toLowerCase()) {
		case "continue":
			await resetPasswordPage.clickContinueButton();
			break;
	}
});

Given("the user successfully signs up", async function () {
	const password = userData?.password ? userData.password : addedUserData.password;

	await resetPasswordPage.resetPassword(password, password);
	await resetPasswordPage.clickContinueButton();
});

Then("verify the account password reset page is displayed", async function () {
	await resetPasswordPage.verifyResetPasswordPageIsDisplayed();
});
