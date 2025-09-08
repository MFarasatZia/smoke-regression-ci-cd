export const elements = {
	certaAssociateBtn: "(//span[contains(text(),'I am a')]//following-sibling::div/div/a)[2]",
	loginUsingEmailAndPasswordBtn: "//*[contains(text(),'Login using e-mail and password')]",
	usernameInput: "//input[@type='email']",
	passwordInput: "//input[@type='password']",
	forgotPasswordButton: "a[href=\"/forgot-password\"]",
	signInBtn: "(//button[@data-testid='btn-login'])[1]",
	loadIcon: ".loader-container",
	userClosedOrBlockedMessage: (email: string) =>
		`//span[text()='The user with email ${email} is closed/blocked at the level of the system.']`,
	accountBlockedOrSuspendedMessage: (accountStatus: string) =>
		`//span[text()='Account is ${accountStatus}, please contact EXiQtive support.']`,
	multipleAccountsSection: {
		multipleAccountsAlert: ".alert-content",
		continueSelectButton: ".multipleAccount button[data-testid=btn-login]",
		accountsSelectionDropdownButton: ".login-select-filled button",
		accountSelectionDropdownOptionsList: ".login-select-filled .login-custom-list .v-list-item__content",
		accountSelectionValue: (accountName: string) =>
			`//div[@class = "login-select-filled"] //div[@class="v-list-item__content" and text() = " ${accountName} "]`,
		searchAccountField: ".multipleAccount .login-picker input",
		logoutButton: "(//span[normalize-space()='Logout'])[1]",
	},
};
