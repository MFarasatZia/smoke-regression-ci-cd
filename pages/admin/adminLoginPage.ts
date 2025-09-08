import { BaseClass } from "../../helpers/BaseClass";
import { elements } from "../../xpath/admin/adminLoginPageElements";
import { getUserDetails } from "../../helpers/jsonHelper";

export default class AdminLoginPage {
	baseInstance: BaseClass;

	constructor(baseInstance: BaseClass) {
		this.baseInstance = baseInstance;
	}

	async openAdminPortal() {
		await this.baseInstance.openURL(process.env.BASE_URL_ADMIN_PANEL);
	}

	async typeEmail(email: string) {
		await this.baseInstance.enterText(elements.usernameInput, email, "Email input");
	}

	async typePassword(password: string) {
		await this.baseInstance.enterText(elements.passwordInput, password, "Password input");
	}

	async clickLoginButton() {
		await this.baseInstance.clickElement(elements.signInBtn, "Login button");
		await this.baseInstance.waitForPageToLoad();
	}

	async loginToAdminPortal() {
		const username = (await getUserDetails(this.baseInstance.user)).super_user_email;
		const password = (await getUserDetails(this.baseInstance.user)).super_user_password;
		await this.typeEmail(username);
		await this.typePassword(password);
		await this.clickLoginButton();
	}

	async loginToAdminWithCustomCredentials(username: string, password: string) {
		await this.typeEmail(username);
		await this.typePassword(password);
		await this.clickLoginButton();
	}

	async loginWithCustomCredentials(userName: string, password: string) {
		await this.typeEmail(userName);
		await this.typePassword(password);
		await this.clickLoginButton();
	}

	async clickForgotPasswordButton() {
		await this.baseInstance.clickElement(elements.forgotPasswordButton, "Forgot password button");
	}

	async verifyLoginDeniedDueToBlockedOrClosedUser(email: string) {
		await this.baseInstance.expectElementToBeVisible(elements.userClosedOrBlockedMessage(email));
	}
}
