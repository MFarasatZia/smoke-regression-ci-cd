export const elements = {
	passwordField: "(//input[@type=\"password\"])[1]",
	confirmPasswordField: "(//input[@type=\"password\"])[2]",
	resetPasswordButton: "//span[normalize-space(text())=\"Reset password\"]/ancestor::button",
	resetPasswordConfirmationMessage: "//p[text()='Your password has been successfully reset. ']",
	continueButton: "//span[normalize-space(text())=\"Continue\"]/ancestor::button",
	setNewPasswordPage: "//h2[normalize-space()='Set new password']"
};
