import { BaseClass } from "../../helpers/BaseClass";
import { elements } from "../../xpath/owner/loginPageElements";
import { expect } from "@playwright/test";

export default class LoginPage {
	baseInstance: BaseClass;

	constructor(baseInstance: BaseClass) {
		this.baseInstance = baseInstance;
	}

	async openApplicationUrl() {
		await this.baseInstance.openURL(process.env.BASEURL);
	}

	async clickLoginButton() {
		await this.baseInstance.clickElement(elements.signInBtn, "Login button");
		await this.baseInstance.waitForPageToLoad();
	}

	async enterEmail(email: string) {
		await this.baseInstance.enterText(elements.usernameInput, email, "Email input");
	}

	async enterPassword(password: string) {
		await this.baseInstance.enterText(elements.passwordInput, password, "Password input");
	}

	async loginToMainPortal(email: string, password: string) {
		await this.enterEmail(email);
		await this.enterPassword(password);
		await this.clickLoginButton();
	}

	async waitForLoadIconToDisappear() {
		if (await this.baseInstance.isDisplayed(elements.loadIcon)) {
			await this.baseInstance.waitForElementToDisappear(elements.loadIcon);
		}
	}

	async verifyMultipleAccountsAlertIsDisplayed() {
		const actualMultipleAccountText: string = await this.baseInstance.getText(
			elements.multipleAccountsSection.multipleAccountsAlert,
		);
		expect(actualMultipleAccountText).toEqual("You have access to multiple accounts. Select one.");
	}

	async isMultipleAccountsPageDisplayed() {
		return await this.baseInstance.isDisplayed(elements.multipleAccountsSection.multipleAccountsAlert);
	}

	async selectHazenfieldAccount() {
		await this.clickOnSelectAccountDropdownList();
		await this.searchForAccount("Single Automation");
		await this.selectAccount("Single Automation");
		await this.clickContinueSelectButton();
	}

	async selectAhsanAccount() {
		await this.clickOnSelectAccountDropdownList();
		await this.searchForAccount("Ahsan Test");
		await this.selectAccount("Ahsan Test");
		await this.clickContinueSelectButton();
	}

	async verifyContinueSelectButtonIsDisabled() {
		const isContinueSelectButtonDisabled = await this.baseInstance.isEnabled(
			elements.multipleAccountsSection.continueSelectButton,
		);
		expect(isContinueSelectButtonDisabled).toBeFalsy();
	}

	async clickContinueSelectButton() {
		await this.baseInstance.clickElement(
			elements.multipleAccountsSection.continueSelectButton,
			"Click Continue / Select button",
		);
	}

	async clickOnSelectAccountDropdownList() {
		await this.baseInstance.clickElement(
			elements.multipleAccountsSection.accountsSelectionDropdownButton,
			"click multiple accounts dropdown button",
		);
	}

	async verifySelectAccountDropdownReturnsMoreThanOneResult() {
		const accountNumber: number = await this.baseInstance.getElementCount(
			elements.multipleAccountsSection.accountSelectionDropdownOptionsList,
		);
		expect(accountNumber).toBeGreaterThan(1);
	}

	async searchForAccount(accountName: string) {
		await this.baseInstance.fillText(elements.multipleAccountsSection.searchAccountField, accountName);
	}

	async selectAccount(accountName: string) {
		await this.baseInstance.clickElement(
			elements.multipleAccountsSection.accountSelectionValue(accountName),
			`Click on account ${accountName}`,
		);
	}

	async clickForgotPasswordButton() {
		await this.baseInstance.clickElement(elements.forgotPasswordButton, "Click forgot password button");
	}

	async clickLogoutButton() {
		await this.baseInstance.clickElement(elements.multipleAccountsSection.logoutButton, "Click logout button");
	}

	async verifyLoginPageIsDisplayed() {
		await this.baseInstance.expectToContainUrl("/login");
	}

	async verifyLoginDeniedDueToBlockedOrClosedUser(email: string) {
		await this.baseInstance.expectElementToBeVisible(elements.userClosedOrBlockedMessage(email));
	}

	async verifyAccountBlockedOrSuspendedErrorMessage(accountStatus: string) {
		await this.baseInstance.expectElementToBeVisible(elements.accountBlockedOrSuspendedMessage(accountStatus));
	}
}
