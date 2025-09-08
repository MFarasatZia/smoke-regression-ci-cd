import { BaseClass } from "../../helpers/BaseClass";
import { elements } from "../../xpath/owner/leftNavigationElements";
import { expect } from "@playwright/test";

export default class LeftNavigationPage {
	baseInstance: BaseClass;
	reports = [];
	reportData = [];

	constructor(baseInstance: BaseClass) {
		this.baseInstance = baseInstance;
	}

	async reloadThePage() {
		await this.baseInstance.wait(2);
		await this.baseInstance.reloadPage();
		await this.baseInstance.wait(10);
	}

	async navigateTo(destination: string) {
		switch (destination.toLowerCase()) {
			case "my services":
				await this.baseInstance.clickElement(elements.leftNavigation.myServicesOption, "My services Option");
				break;
			case "settings":
				await this.baseInstance.wait(2);
				await this.baseInstance.clickElement(elements.leftNavigation.settingsOption, "Settings Option");
				break;
			case "users":
				await this.baseInstance.openURL("https://account.dev.exiqtive.com/users");
				break;
			case "employees":
				await this.baseInstance.wait(5);
				await this.baseInstance.dispatchEventclickElement(
					elements.leftNavigation.organizationOption,
					"Organization Option",
				);
				await this.baseInstance.clickElement(
					elements.leftNavigation.organizationOptions.employeesOption,
					"Employees Option",
				);
				await this.baseInstance.waitForElementToDisappear(elements.noEmployeeFound);
				break;
			case "position":
				await this.baseInstance.wait(5);
				await this.baseInstance.dispatchEventclickElement(
					elements.leftNavigation.organizationOption,
					"Organization Option",
				);
				await this.baseInstance.clickElement(
					elements.leftNavigation.organizationOptions.positionOption,
					"Position Option",
				);
				break;
			case "responsibilities":
				await this.baseInstance.wait(5);
				await this.baseInstance.clickElement(elements.leftNavigation.readinessOption, "Readiness Options");
				await this.baseInstance.clickElement(
					elements.leftNavigation.readinessOptions.catalogsOption,
					"Catalogs Options",
				);
				await this.baseInstance.clickElementByRole("tab", "Responsibilities");
				break;
			case "roles":
				await this.baseInstance.wait(5);
				await this.baseInstance.clickElement(elements.leftNavigation.readinessOption, "Readiness Options");
				await this.baseInstance.clickElement(elements.leftNavigation.readinessOptions.catalogsOption, "Catalog Option");
				await this.baseInstance.clickElementByRole("tab", "Roles");
				break;
			case "readinessemployees":
				await this.baseInstance.wait(5);
				await this.baseInstance.clickElement(elements.leftNavigation.readinessOption, "Readiness Option");
				await this.baseInstance.clickElement(
					elements.leftNavigation.readinessOptions.employeesOption,
					"Employees Option",
				);
				break;
			case "be a master/coach":
				await this.baseInstance.clickElement(
					elements.leftNavigation.servicesOptions.beAMasterCoachOptionButton,
					"Master Coach Option",
				);
				break;
			default:
				throw new Error("Invalid destination provided");
		}
	}

	async logoIsDisplayed() {
		return await this.baseInstance.isDisplayed(elements.header.logo);
	}

	async verifyUserName(expectedUserName: string) {
		expect(await this.baseInstance.getText(elements.leftNavigation.userName)).toBe(expectedUserName);
	}

	async verifyUserEmail(expectedUserEmail: string) {
		expect(await this.baseInstance.getText(elements.leftNavigation.userEmail)).toBe(expectedUserEmail);
	}

	async verifyLeftNavigationPageIsDisplayed(page: string) {
		switch (page) {
			case "Employees Organization":
				await this.baseInstance.expectToContainUrl("/organization/employees");
				break;
			case "My stuff":
				await this.baseInstance.expectToContainUrl("exiqtive.com/services/my-stuff");
				break;
			default:
				throw new Error(`Unknown page: ${page}`);
		}
	}

	async verifyGlobalSearchField() {
		await this.baseInstance.isDisplayed(elements.leftNavigation.searchField);
	}

	async verifyNotificationBellIcon() {
		await this.baseInstance.isDisplayed(elements.leftNavigation.notificationBellIcon);
	}

	async openNotification() {
		await this.baseInstance.clickElement(elements.leftNavigation.notificationBellIcon, "Click on Notification Icon");
	}

	async verifyNotificationItems() {
		await this.baseInstance.isDisplayed(elements.leftNavigation.notificationItems);
	}

	async verifySideBarPanelIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.leftNavigation.sideBarPanel);
	}

	async verifyReadinessSectionIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.leftNavigation.readinessOption);
	}

	async verifySettingsSectionIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.leftNavigation.settingsOption);
	}

	async verifyOrganizationSectionIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.leftNavigation.organizationOption);
	}

	async clickLogoutButton() {
		await this.baseInstance.clickElement(elements.leftNavigation.logoutButton, "Click logout button");
	}

	async isVisiblePlaceHolder() {
		expect(await this.baseInstance.isDisplayed(elements.isVisibleEmailPlaceHolder)).toBeFalsy();
		expect(await this.baseInstance.isDisplayed(elements.isVisiblePasswordPlaceHolder)).toBeFalsy();
	}
	async verifyLogoutPageIsDisplayed() {
		await this.baseInstance.expectToContainUrl("/login");
	}

	async verifyRememberMeIsNotDisplayed() {
		expect!(await this.baseInstance.isDisplayed(elements.rememberMeCheckbox));
	}

	async verifyAlignmentOfRememberMeCheckBox() {
		await this.baseInstance.isDisplayed(elements.alignmnetOfRememberMeCheckbox);
	}

	async clickBrandLogo() {
		await this.baseInstance.clickElement(elements.leftNavigation.logoButton, "click the logo button");
		await this.baseInstance.isDisplayed(elements.loaderDisplay);
	}

	async clickSignInBtn() {
		await this.baseInstance.clickElement(elements.leftNavigation.signInBtn, "click the Sign in button");
	}

	async verifyHoverOverAddRoles() {
		await this.baseInstance.isDisplayed(elements.hoverOverAddRoles);
	}

	async verifyHoverOverAttachResponsibility() {
		await this.baseInstance.isDisplayed(elements.hoverOverAttachResponsibility);
	}

	async verifyDynamicAccountName() {
		await this.baseInstance.isDisplayed(elements.verifyDynamicAccountName);
	}
}
