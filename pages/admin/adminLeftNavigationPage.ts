import { BaseClass, baseInstance } from "../../helpers/BaseClass";
import { elements } from "../../xpath/admin/adminLeftNavigationElements";
import { expect } from "@playwright/test";

export default class AdminLeftNavigationPage {
	baseInstance: BaseClass;

	constructor(baseInstance: BaseClass) {
		this.baseInstance = baseInstance;
	}

	async reloadThePage() {
		await this.baseInstance.wait(2);
		await this.baseInstance.reloadPage();
		await this.baseInstance.wait(10);
	}

	async navigateTo(page: string) {
		switch (page.toLowerCase()) {
			case "users":
				await this.waitForLoadIconToDisappear();
				await this.baseInstance.clickElement(elements.sideBar.users, "Go to user page");
				await this.waitForLoadIconToDisappear();
				await this.baseInstance.wait(5);
				break;
			case "accounts":
				await this.baseInstance.clickElement(elements.sideBar.accounts, "Go to accounts page");
				await this.waitForLoadIconToDisappear();
				break;
			case "subscriptions":
				await this.baseInstance.clickElement(elements.sideBar.subscriptions, "Go to subscription page");
				await this.waitForLoadIconToDisappear();
				break;
		}
	}

	async waitForLoadIconToDisappear() {
		if (await this.baseInstance.isDisplayed(elements.loadIcon)) {
			await this.baseInstance.waitForElementToBeDetachedFromDOM(elements.loadIcon);
		}
	}

	async verifyPageIsDisplayed(page: string) {
		switch (page) {
			case "accounts":
				expect(await baseInstance.isDisplayed(elements.sideBar.accountsMenuSelected)).toBeTruthy();
				expect(await baseInstance.getCurrentUrl()).toContain(".exiqtive.com/accounts");
				break;
			case "users":
				expect(await baseInstance.isDisplayed(elements.sideBar.usersMenuSelected)).toBeTruthy();
				expect(await baseInstance.getCurrentUrl()).toContain(".exiqtive.com/users");
				break;
			case "Subscriptions":
				expect(await baseInstance.isDisplayed(elements.sideBar.subscriptionsMenuSelected)).toBeTruthy();
				expect(await baseInstance.getCurrentUrl()).toContain(".exiqtive.com/subscriptions");
				break;
		}
	}

	async clickAdminLogoutButton() {
		await this.baseInstance.clickElement(elements.sideBar.logoutButton, "Click logout button");
	}

	async removeStatusFilter(status) {
		await expect(this.baseInstance.isDisplayed(elements.selectedFilter(status).toLowerCase())).toBeTruthy();
		await this.baseInstance.clickElement(elements.removeFilter(status).toLowerCase(), "Remove Selected Filter");
		await this.baseInstance.wait(2);
	}

	async verifyAdminLogoutPageIsDisplayed() {
		await this.baseInstance.expectToContainUrl("/login");
	}

	async verifyAdminRememberMeIsNotDisplayed() {
		expect!(await this.baseInstance.isDisplayed(elements.rememberMeCheckboxAdminPortal));
	}

	async getAdminEditingBoolean() {
		return await this.baseInstance.getHtmlAttributeByXPath(elements.adminEditingSwitch, "aria-checked");
	}

	async clickAdminEditingSwitch() {
		await this.baseInstance.clickElement(elements.adminEditingButton, "Click admin editing switch");
	}

	async clickUser() {
		await this.baseInstance.clickElement(elements.clickUser, "Click user");
	}

	async verifyUserFormIsDisplayed() {
		await this.baseInstance.clickElement(elements.clickOnBreadCrumbUser, "Click on Breadcrumb user");
		await this.baseInstance.clickElement(elements.clickUser, "Click user");
		expect(await this.baseInstance.isDisplayed(elements.userHeaderName)).toBeTruthy();
		expect(await this.baseInstance.isDisplayed(elements.userEmail)).toBeTruthy();
		expect(await this.baseInstance.isDisplayed(elements.userStatus)).toBeTruthy();
		expect(await this.baseInstance.isDisplayed(elements.activeTab)).toBeTruthy();
	}

}
