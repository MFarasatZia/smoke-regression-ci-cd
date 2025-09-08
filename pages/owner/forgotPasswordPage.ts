import { BaseClass } from "../../helpers/BaseClass";
import { elements } from "../../xpath/owner/forgotPasswordPageElements";

export default class ForgotPasswordPage {
	baseInstance: BaseClass;

	constructor(baseInstance: BaseClass) {
		this.baseInstance = baseInstance;
	}

	async verifyForgotPasswordPageIsDisplayed() {
		await this.baseInstance.expectToContainUrl("/forgot-password");
	}

	async resetPassword(userEmail: string) {
		await this.baseInstance.fillText(elements.emailField, userEmail);
	}

	async clickResetPasswordButton() {
		await this.baseInstance.clickElement(elements.resetPasswordButton, "Click reset password button");
	}

	async clickResendPasswordLinkButton() {
		await this.baseInstance.wait(65);
		await this.baseInstance.clickElement(
			elements.clickToResentPasswordButton,
			"Click resend password reset link button",
		);
	}
}
