import { BaseClass } from "../../helpers/BaseClass";
import { elements } from "../../xpath/owner/resetPasswordPageElements";
import { getLatestResetPasswordLinkFromEmail, getResetLinkFromFirstEmail } from "../../helpers/util/mailtrap";
import { adminUserData } from "../../steps/admin/adminUsersApiSteps";
import { uiUserData } from "../../steps/admin/adminUsersSteps";


export default class AdminResetPasswordPage {
	baseInstance: BaseClass;

	constructor(baseInstance: BaseClass) {
		this.baseInstance = baseInstance;
	}

	async verifyResetPasswordPageIsDisplayed() {
		await this.baseInstance.isDisplayed(elements.setNewPasswordPage);
	}

	async verifySetupPasswordPageIsDisplayed() {
		await this.baseInstance.expectToContainUrl("exiqtive.com/setup/password?token=");
	}

	async verifyResetPasswordConfirmationMessageIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.resetPasswordConfirmationMessage);
	}

	async verifyResetPasswordConfirmationMessageIsNotDisplayed() {
		await this.baseInstance.expectElementToBehidden(elements.resetPasswordConfirmationMessage);
	}

	async resetPassword(password: string, confirmPassword: string) {
		await this.baseInstance.waitForPageToLoad();
		await this.baseInstance.enterTextsequentially(elements.passwordField, password, "Entering password");
		await this.baseInstance.enterTextsequentially(
			elements.confirmPasswordField,
			confirmPassword,
			"Entering confirm password",
		);
		await this.baseInstance.expectElementToBeEnabled(elements.resetPasswordButton);
		await this.baseInstance.clickElement(elements.resetPasswordButton, "Click reset password button");
	}

	async openResetPasswordPage() {
		const resetLink = await getLatestResetPasswordLinkFromEmail(adminUserData.email);
		await this.baseInstance.openURL(resetLink);

	}

	async openResetPasswordPageUsingFirstEmail() {
		await this.baseInstance.wait(5);
		let resetPasswordURL = await getResetLinkFromFirstEmail(uiUserData?.email ? uiUserData.email : adminUserData.email);
		console.log(resetPasswordURL);

		if (resetPasswordURL.endsWith(".") || resetPasswordURL.endsWith(")")) {
			resetPasswordURL = resetPasswordURL.slice(0, -1);
		}

		if (!resetPasswordURL.startsWith("http://") && !resetPasswordURL.startsWith("https://")) {
			resetPasswordURL = "https://" + resetPasswordURL;
		}
		console.log(resetPasswordURL);
		await this.baseInstance.openURL(resetPasswordURL);
	}

	async clickContinueButton() {
		await this.baseInstance.clickElement(elements.continueButton, "Click continue button");
	}
}
