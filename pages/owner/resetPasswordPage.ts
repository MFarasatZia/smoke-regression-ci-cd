import { BaseClass } from "../../helpers/BaseClass";
import { elements } from "../../xpath/owner/resetPasswordPageElements";
import { getLatestResetLinkFromEmail, getResetLinkFromFirstEmail } from "../../helpers/util/mailtrap";
import { userData } from "../../steps/owner/userApiSteps";
import { addedUserData } from "../../steps/owner/settingsApiSteps";

export default class ResetPasswordPage {
	baseInstance: BaseClass;

	constructor(baseInstance: BaseClass) {
		this.baseInstance = baseInstance;
	}

	async verifyResetPasswordPageIsDisplayed() {
		const resetUrlCheck = this.baseInstance.expectToContainUrl(`${process.env.BASE_URL}reset/password?token=`);
		const setupUrlCheck = this.baseInstance.expectToContainUrl(`${process.env.BASE_URL}setup/password?token=`);
		await Promise.any([resetUrlCheck, setupUrlCheck]).catch(() => {
			throw new Error("Neither reset nor setup password URL is displayed.");
		});
	}

	async verifyResetPasswordConfirmationMessageIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.resetPasswordConfirmationMessage);
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
		await this.baseInstance.wait(5);
		let resetPasswordURL = await getLatestResetLinkFromEmail(userData?.email ? userData.email : addedUserData.email);

		if (resetPasswordURL.endsWith(".")) {
			resetPasswordURL = resetPasswordURL.slice(0, -1);
		}

		if (!resetPasswordURL.startsWith("http://") && !resetPasswordURL.startsWith("https://")) {
			resetPasswordURL = "https://" + resetPasswordURL;
		}
		await this.baseInstance.openURL(resetPasswordURL);
	}

	async openResetPasswordPageUsingSecondEmail() {
		await this.baseInstance.wait(5);
		let resetPasswordURL = await getResetLinkFromFirstEmail(userData?.email ? userData.email : addedUserData.email);
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
