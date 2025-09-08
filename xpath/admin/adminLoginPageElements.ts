export const elements = {
	usernameInput: "//label[text()=\"Enter your email\"]/following-sibling::input",
	passwordInput: "//label[text()=\"Enter your password\"]/following-sibling::input",
	signInBtn: ".loginWrapper button[data-testid=\"btn-login\"]",
	forgotPasswordButton: "//a[normalize-space()='Forgot Password']",
	userClosedOrBlockedMessage: (email: string) =>
		`//span[text()='The user with email ${email} is closed/blocked at the level of the system.']`,
};
