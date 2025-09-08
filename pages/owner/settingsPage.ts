import { expect, Locator } from "@playwright/test";
import { BaseClass } from "../../helpers/BaseClass";
import { elements } from "../../xpath/owner/settingPageElements";
import { addedUserData } from "../../steps/owner/settingsApiSteps";
import { userData } from "../../steps/owner/userApiSteps";
import { userDataFromChangeOwnership } from "../../steps/admin/adminAccountApiSteps";

export default class SettingsPage {
	baseInstance: BaseClass;
	reports = [];
	reportData = [];
	firstName: string;
	lastName: string;

	constructor(baseInstance: BaseClass) {
		this.baseInstance = baseInstance;
	}

	async navigateToTab(destination: string) {
		switch (destination.toLowerCase()) {
			case "users":
				await this.baseInstance.clickElement(elements.tabMenu.usersTab, "Users Tab");
				break;
			case "configurations":
				await this.baseInstance.clickElementByRole("tab", "Configurations");
				break;
			case "settings":
				await this.baseInstance.clickElement(elements.tabMenu.settingsTab, "Settings");
				break;
			default:
				throw new Error("Invalid tab menu provided");
		}
	}

	async logoIsDisplayed() {
		return await this.baseInstance.isDisplayed(elements.header.settingsHeading);
	}

	async enterEmail(email: string) {
		await this.baseInstance.enterText(elements.users.addUserModal.emailInput, email, "Email input");
	}

	async clickOnNextBtn() {
		await this.baseInstance.clickElement(elements.users.addUserModal.nextBtn, "Next button");
	}

	async clickCancelInvite() {
		await this.baseInstance.clickElement(elements.clickCancelInvite, "click on Cancel Invite");
	}

	async verifyErrorMessage() {
		await this.baseInstance.isDisplayed(elements.NoUserFoundDisplay);
	}

	async getModalText(firstName: string, lastName: string, mark: string): Promise<string> {
		return await this.baseInstance.getText(elements.users.addUserModal.modalTextElement(firstName, lastName, mark));
	}

	async clickOnConfirm() {
		await this.baseInstance.clickElement(elements.users.addUserModal.confirmBtn, "Confirm button");
	}

	async enterFirstName(firstName: string) {
		await this.baseInstance.enterText(elements.users.addUserModal.firstNameInput, firstName, "First Name input");
	}

	async enterLastName(lastName: string) {
		await this.baseInstance.enterText(elements.users.addUserModal.lastNameInput, lastName, "Last Name input");
	}

	async selectAccessLevel(access: string) {
		if (!access) {
			access = "apps user";
		}
		switch (access.toLowerCase()) {
			case "apps user":
				await this.baseInstance.clickElement(elements.users.addUserModal.appsUserRadio, "Apps user Radio");
				break;
			case "co-owner":
				await this.baseInstance.clickElement(elements.users.addUserModal.coownerRadio, "Co-Owner user Radio");
				break;
			case "operator":
				await this.baseInstance.clickElement(elements.users.addUserModal.OperatorRadio, "Operator user Radio");
				break;
			default:
				throw new Error(`Invalid access level provided: ${access} please provide apps-user or co-owner`);
		}
	}

	async selectApp(table: string[][]) {
		for (const row of table) {
			await this.baseInstance.checkCheckbox(elements.users.addUserModal.appsCheckbox(row[0]));
		}
	}

	async verifyUserAlreadyExistsMesage(): Promise<boolean> {
		return await this.baseInstance.isDisplayed(elements.users.addUserModal.existingUserValidationMessage);
	}

	async verifySettingsPadeHeading(): Promise<boolean> {
		return await this.baseInstance.isDisplayed(elements.header.settingsHeading);
	}

	async verifyHorizontalMenu(): Promise<string[]> {
		const horizontalMenuItems = await this.baseInstance.getAllElements(elements.tabMenu.hortizontalMenu);
		const expectedElementCount = 8;
		if (horizontalMenuItems.length !== expectedElementCount) {
			throw new Error(`Expected ${expectedElementCount} elements, but found ${horizontalMenuItems.length} elements`);
		}

		const textArray: string[] = [
			"Users",
			"Subscription",
			"Organization",
			"Readiness",
			"Proficiency",
			"Knowledge",
			"Compensation",
			"Performance",
		];
		for (let i = 0; i < horizontalMenuItems.length; i++) {
			const element = elements[i];
			const textContent = await element.textContent();
			textArray.push(textContent);
		}
		return textArray;
	}

	async verifyFirstElement(): Promise<boolean> {
		const horizontalMenuItems = await this.baseInstance.getAllElements(elements.tabMenu.hortizontalMenu);
		const expectedText = "Users";
		if (horizontalMenuItems.length === 0) {
			throw new Error("Horizontal menu is empty");
		}
		const firstElementText = await horizontalMenuItems[0].textContent();
		return firstElementText === expectedText;
	}

	async verifyUserBadge(): Promise<boolean> {
		return await this.baseInstance.isDisplayed(elements.users.activeBadge);
	}

	async verifyUserList(): Promise<boolean> {
		await this.navigateToTab("Settings");
		return await this.baseInstance.isDisplayed(elements.users.usersList);
	}

	async verifyOwnerBadge(): Promise<boolean> {
		return await this.baseInstance.isDisplayed(elements.users.ownerAccess);
	}

	async canNotSuspendOwner(): Promise<void> {
		await this.baseInstance.clickElement(elements.users.ownerMenuIcon, "Owner Menu");
		!(await this.baseInstance.isDisplayed(elements.users.suspendOwnerOption));
	}

	async verifyAddButton(): Promise<boolean> {
		return await this.baseInstance.isDisplayed(elements.users.addButton);
	}

	async clickOnAddButton(): Promise<void> {
		await this.baseInstance.clickElement(elements.users.addButton, "Add user button");
	}

	async verifyAddUserPopup() {
		return await this.baseInstance.isDisplayed(elements.users.addUserModal.addUserPopup);
	}

	async verifyNumberOfUserInList(numberOfUsers: number) {
		const userCount = await this.baseInstance.getElementCount(elements.users.numberOfUserInList);
		await expect(userCount).toBeGreaterThanOrEqual(numberOfUsers);
		console.log("User Found:", userCount);
		console.log("Expected Count:", numberOfUsers);
	}

	async getUserFullNames(): Promise<string[]> {
		const userElements = await this.baseInstance.getAllElements(elements.users.userFullNameVisibleInList(""));
		const userFullNames = await Promise.all(
			userElements.map(async (element: Locator) => {
				return await element.textContent();
			}),
		);
		return userFullNames;
	}

	async verifyUserFullNameOrder() {
		const userFullNames = await this.getUserFullNames();
		const sortedUserFullNames = [...userFullNames].sort();
		const isAlphabetical = userFullNames.every((name, index) => name === sortedUserFullNames[index]);
		await expect(isAlphabetical).toBe(true);
	}

	async searchUserFullName() {
		const secondUserInList = await this.baseInstance.getText(elements.users.getSecondUserName);
		await this.baseInstance.clickElement(elements.users.searchInputField, "Search");
		await this.baseInstance.keyboardType(secondUserInList);
		const searchResults = await this.baseInstance.getText(elements.users.numberOfUserInList);
		await expect(searchResults).toContain(secondUserInList);
		await this.baseInstance.clearText(elements.users.searchInputField, "Search");
		await this.baseInstance.wait(3);
	}

	async searchUser() {
		await this.baseInstance.wait(5);
		await this.baseInstance.reloadPage();
		await this.baseInstance.clickElement(elements.users.searchInputField, "Search");
		await this.baseInstance.keyboardType(userData.firstName);
		await this.baseInstance.wait(5);
	}

	async searchCustomUser(userName: string) {
		await this.baseInstance.wait(5);
		await this.baseInstance.reloadPage();
		await this.baseInstance.clickElement(elements.users.searchInputField, "Search");
		await this.baseInstance.keyboardType(userName);
		await this.baseInstance.wait(5);
	}

	async previousPageNavigator(): Promise<boolean> {
		return await this.baseInstance.isDisplayed(elements.users.previousPageButton);
	}

	async nextPageNavigator(): Promise<boolean> {
		return await this.baseInstance.isDisplayed(elements.users.nextPageButton);
	}

	async verifyAccessBadge(hasAccess): Promise<void> {
		await this.baseInstance.wait(2);
		await this.baseInstance.reloadPage();
		await this.baseInstance.clickElement(elements.users.searchInputField, "Search");
		await this.baseInstance.keyboardType(addedUserData.firstName);
		if (hasAccess === "Has Access") {
			await this.baseInstance.isDisplayed(elements.users.accessBadge("Has Access").toLowerCase());
		} else if (hasAccess === "Suspended") {
			await this.baseInstance.isDisplayed(elements.users.accessBadge("Suspended").toLowerCase());
		}
	}

	async verifySuspendUserOptionVisible(Suspend: string) {
		await this.baseInstance.clickElement(elements.users.userMenuIcon(addedUserData.firstName), "User Menu icon");
		if (Suspend === "Suspend") {
			await this.baseInstance.isDisplayed(elements.users.userAccess("Suspend"));
		} else if (Suspend === "Give back access") {
			await this.baseInstance.isDisplayed(elements.users.userAccess("Give back access"));
		}
		await this.baseInstance.wait(3);
	}

	async verifySuspendUserOptnVisible(Suspend: string) {
		await this.baseInstance.isDisplayed(elements.users.userAccess(Suspend));

		await this.baseInstance.wait(3);
	}

	async verifyTheAddUser() {
		await this.baseInstance.isDisplayed(elements.addUserButton);
	}
	async clickOnAddUser() {
		await this.baseInstance.clickElement(elements.addUserButton, "Click on Add User Button");
	}

	async clickOnUserThreeDot() {
		await this.baseInstance.clickElement(elements.userThreeDot, "Click on User three menu");
	}

	async verifyUserAccess() {
		await this.baseInstance.isDisplayed(elements.users.userAccess("Give back access"));
	}

	async verifyAddUserConfirmationModalIsNotVisible() {
		await this.baseInstance.expectElementToBehidden(elements.users.addUserModal.confirmBtn);
	}

	async verifyNewUserCreated(userName: string) {
		await this.baseInstance.waitForElementToDisappear(elements.users.addButton);
		// await this.baseInstance.clearText(elements.searchField, "Clear Text");
		await this.baseInstance.enterText(elements.searchField, userName, "Search filed");
		const newUserName = await this.baseInstance.getText(elements.getFirstUserName);
		expect(newUserName).toBe(userName);
	}

	async selectProficiencyAppsAccessCheckbox() {
		await this.baseInstance.clickNthElement(
			elements.users.addUserModal.appsCheckboxList,
			"Click Proficiency access checkbox",
			0,
		);
	}

	async selectKnowledgeAppsAccessCheckbox() {
		await this.baseInstance.clickNthElement(
			elements.users.addUserModal.appsCheckboxList,
			"Click Knowledge access checkbox",
			1,
		);
	}

	async selectPerformanceAppsAccessCheckbox() {
		await this.baseInstance.clickNthElement(
			elements.users.addUserModal.appsCheckboxList,
			"Click Performance access checkbox",
			2,
		);
	}

	async selectCompensationAppsAccessCheckbox() {
		await this.baseInstance.clickNthElement(
			elements.users.addUserModal.appsCheckboxList,
			"Click Compensation access checkbox",
			3,
		);
	}

	async selectAllAccessToAppsCheckboxes() {
		await this.selectProficiencyAppsAccessCheckbox();
		await this.selectKnowledgeAppsAccessCheckbox();
		await this.selectPerformanceAppsAccessCheckbox();
		await this.selectCompensationAppsAccessCheckbox();
	}

	async badgeIsDisplayed() {
		await this.baseInstance.isDisplayed(elements.coOwnerBadge);
	}

	async badgeIsNotDisplayed() {
		expect(await this.baseInstance.isDisplayed(elements.appsBadge)).toBeFalsy();
	}

	async verifySettingsMenuNotVisible(option: string) {
		!(await this.baseInstance.isDisplayed(elements.settingsMenu.options(option)));
	}

	async clickOnThreeDotMenu() {
		await this.baseInstance.clickElement(elements.threeDotMenu, "Click on menu button");
	}

	async selectMenuOption(option: string) {
		await this.baseInstance.clickElement(elements.threeDotMenuOption.options(option), "Select option from the menu");
	}

	async verifySuspendModal() {
		expect(await this.baseInstance.isDisplayed(elements.verifySuspendModal)).toBeTruthy();
	}

	async clickOnSuspendUser() {
		await this.baseInstance.clickElement(elements.clickOnSuspendUser, "click On Suspend User");
	}

	async selectRenameOption() {
		await this.baseInstance.clickElement(elements.selectRenameOption, "Select option from the menu");
	}

	async isRenameActive() {
		expect(await this.baseInstance.isDisplayed(elements.isRenameActive)).toBeTruthy();
	}

	async verifyRenameBtnActive() {
		expect(await this.baseInstance.isDisplayed(elements.verifyRenameBtnActive)).toBeTruthy();
		await this.baseInstance.clickElement(elements.verifyRenameBtnActive, "click on rename button");
	}

	async verifyResendOptionIsNotVisible() {
		!(await this.baseInstance.isDisplayed(elements.resendOption));
	}

	async verifyChangePasswordOptionIsNotVisible() {
		!(await this.baseInstance.isDisplayed(elements.changePassword));
	}

	async clickOnResendButton() {
		await this.baseInstance.clickElement(elements.resendButton, "click on button");
	}

	async clickOnRenameButton() {
		await this.baseInstance.clickElement(elements.renameButton, "click on Rename Button");
	}

	async verifyToastDisplayed() {
		await this.baseInstance.isDisplayed(elements.toast);
	}

	async suspendBtn() {
		await this.baseInstance.clickElement(elements.suspendBtn, "click on Suspend Option");
	}

	async verifyUserStatus(status: string) {
		const badge = status.toLowerCase();
		await this.baseInstance.isDisplayed(elements.userBadge.badge(badge));
	}

	async verifyIntegrationOptionsDisplayed() {
		await this.baseInstance.isDisplayed(elements.integrationOptionsDisplayed);
	}

	async clickOnTheLink(url: string) {
		await this.baseInstance.openURL(url);
	}

	async openSettingsTab(tab: string) {
		switch (tab.toLowerCase()) {
			case "User":
				await this.baseInstance.clickElementByRole("tab", "User");
				break;
			case "Subscription":
				await this.baseInstance.clickElementByRole("tab", "Subscription");
				break;
			case "Integrations":
				await this.baseInstance.clickElementByRole("tab", "Integrations");
				break;
		}
	}

	async setPassword(pass: string) {
		await this.baseInstance.clickElement(elements.newPassword, "Enter Password");
		await this.baseInstance.keyboardType(pass);
	}

	async setConfirmPassword(confirm: string) {
		await this.baseInstance.clickElement(elements.confirmPassword, "Enter confirm password");
		await this.baseInstance.keyboardType(confirm);
	}

	async clickOnResetBtn() {
		await this.baseInstance.clickElement(elements.resetPassBtn, "Click on Reset Button");
	}

	async clickOnContinueBtn() {
		await this.baseInstance.clickElement(elements.continueBtn, "Click on Reset Button");
	}

	async clickOnSignInBtn() {
		await this.baseInstance.clickElement(elements.signInBtn, "Click on Reset Button");
	}

	async addNewUser(accessType: string, appsAccess: string) {
		await this.clickOnAddUser();
		await this.enterEmail(addedUserData.email);
		await this.clickOnNextBtn();
		await this.enterFirstName(addedUserData.firstName);
		await this.enterLastName(addedUserData.lastName);
		await this.clickOnNextBtn();
		await this.selectAccessLevel(accessType);
		await this.clickOnNextBtn();
		if (appsAccess.toLowerCase() === "all" && accessType.toLowerCase() === "apps user") {
			await this.selectAllAccessToAppsCheckboxes();
			await this.clickOnNextBtn();
			await this.clickOnConfirm();
			await this.verifyAddUserConfirmationModalIsNotVisible();
		}
		const createdUser = `${addedUserData.firstName} ${addedUserData.lastName}`;
		await this.verifyNewUserCreated(createdUser);
	}

	async verifyTheError(error) {
		await this.baseInstance.isDisplayed(elements.verifyTheError(error));
	}

	async verifyTheErrorReset(error) {
		expect(await this.baseInstance.isDisplayed(elements.verifyTheError(error))).toBeFalsy();
	}

	async clickOnXIcon() {
		await this.baseInstance.clickElement(elements.clickOnXIcon, "close the modal");
	}

	async clickfilterBtn() {
		await this.baseInstance.clickElement(elements.filterButton, "click filter button");
	}

	async verifySettingFilterModal() {
		await this.baseInstance.isDisplayed(elements.filterModal.statusHeader);
		await this.baseInstance.isDisplayed(elements.filterModal.employeeHeader);
	}

	async filterOptionsVisible(option: string) {
		const optionName = option.toLowerCase();
		await this.baseInstance.isDisplayed(elements.filterStatus.name(optionName));
	}

	async applyStatusfilter(statusName: string) {
		await this.baseInstance.waitForElement(elements.filterModal.statusHeader);
		const filterStatus = statusName.toLowerCase();
		await this.baseInstance.clickElement(
			elements.filterModal.statusFilter.option(filterStatus),
			"Click on the status filter",
		);
	}

	async clickOnSaveFilterButton() {
		await this.baseInstance.clickElement(elements.filterModal.saveFilter, "Click on button");
	}

	async verifyTheStatusFilter(text: string) {
		await this.baseInstance.wait(5);
		const userBadge = text.toLowerCase();
		await this.baseInstance.isDisplayed(elements.badge.status(userBadge));
	}

	async searchNonExistentUser() {
		await this.baseInstance.wait(5);
		await this.baseInstance.reloadPage();
		await this.baseInstance.clickElement(elements.users.searchInputField, "Search");
		await this.baseInstance.keyboardType("testing123");
		await this.baseInstance.wait(5);
	}

	async verifyNOUserFoundText() {
		expect(await this.baseInstance.isDisplayed(elements.verifyNOUserFoundText)).toBeTruthy();
	}

	async fillFirstNameFieldFromRenameModal(firstName: string) {
		await this.baseInstance.clearText(elements.modals.renameModal.firstNameField, "Clear first name field");
		await this.baseInstance.fillText(elements.modals.renameModal.firstNameField, firstName);
	}

	async fillLastNameFieldFromRenameModal(lastName: string) {
		await this.baseInstance.clearText(elements.modals.renameModal.lastNameField, "Clear last name field");
		await this.baseInstance.fillText(elements.modals.renameModal.lastNameField, lastName);
	}

	async clickOnCurrenciesCard() {
		await this.baseInstance.clickElement(elements.currenciesCard, "click on currencies card");
	}

	async currencyCardVisible() {
		expect(await this.baseInstance.isDisplayed(elements.currenciesCard)).toBeTruthy();
	}

	async verifyCurrencyPageTitleVisible() {
		expect(await this.baseInstance.isDisplayed(elements.currencyPageLabel)).toBeTruthy();
	}

	async clickOnBackBtn() {
		await this.baseInstance.clickElement(elements.backBtn, "clicks on back btn");
	}

	async clickOnClearBtn() {
		await this.baseInstance.clickElement(elements.clearBtn, "click on clear btn");
	}

	async currencyIsNotSelected() {
		await this.baseInstance.isDisplayed(elements.selectCurrencyLabel);
	}

	async clickOnSearchField() {
		await this.baseInstance.clickElement(elements.currencySearch, "click on search filed");
	}

	async currencyListDisplayed() {
		await this.baseInstance.isDisplayed(elements.currencyList);
	}

	async searchForCurrency(name: string) {
		await this.baseInstance.enterTextsequentially(elements.currencySearch, name, "Enter currency name");
	}

	async selectFirstCurrency() {
		await this.baseInstance.clickElement(elements.firstCurrency, "select first currency");
	}

	async selectAnotherOwner() {
		await this.baseInstance.clickElement(
			elements.modals.transferOwnershipModal.userSelectionDropdownList,
			"Click Pick a user dropdown list",
		);
		await this.baseInstance.fillText(
			elements.modals.transferOwnershipModal.userSelectionSearchBar,
			userDataFromChangeOwnership.firstName,
		);
		await this.baseInstance.clickElement(
			elements.modals.transferOwnershipModal.firstResultsInList,
			"Click first element in Pick a user list",
		);
		await this.baseInstance.clickElement(
			elements.modals.transferOwnershipModal.switchOwnerButton,
			"Click switch owner button",
		);
	}

	async verifyCoOwnerBadgeIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.coOwnerBadge);
	}

	async verifyDateInActivityColumn(dateType: string, dateTime: string) {
		await this.baseInstance.expectElementToBeVisible(`//span[text()=' ${dateType}  ']`);
		await this.baseInstance.expectElementToBeVisible(`//span[text()=' ${dateTime} ']`);
	}

	async getConfirmationMessage() {
		const confirmationMessage = await this.baseInstance.getText(
			"//p[contains(@class, 'font-weight-400') and contains(@class, 'text-disabled') and contains(normalize-space(), 'is available to be used by user')]",
		);
		return confirmationMessage;
	}

	async getConfirmationPopUpMessage() {
		const confirmationPopUpMessage = await this.baseInstance.getText(
			"//p[contains(@class, 'font-weight-400') and contains(@class, 'font-size-14') and contains(@class, 'text-disabled') and contains(@class, 'mt-2')]",
		);
		return confirmationPopUpMessage;
	}

	async getPopupMessage() {
		const message = await this.baseInstance.getText(
			"//p[contains(@class, 'font-weight-400') and contains(@class, 'text-disabled') and contains(normalize-space(), 'is already associated with an external user')]",
		);
		return message;
	}

	async fillEmailField(email: string) {
		await this.baseInstance.fillText(elements.users.addUserModal.emailInput, email);
	}

	async verifyFirstInvitedText() {
		await this.baseInstance.isDisabled(elements.firstInvitedText);
	}

	async addLessThanThreeCharacter() {
		await this.baseInstance.clickElement(elements.searchInputCheck, "Search Checkpoint");
		await this.baseInstance.clearText(elements.searchInputCheck, "Clear Search");
		await this.baseInstance.keyboardType("ab");
	}

	async clickOnDirectoriesCard() {
		await this.baseInstance.clickElement(elements.clickOnDirectoriesCard, "click On Directories Card");
	}

	async verifyToggleText(text: string) {
		await this.baseInstance.isDisplayed(elements.verifyToggleText(text));
	}

	async clickOnBreadCrumb() {
		await this.baseInstance.clickElement(elements.clickOnBreadCrumb, "click On Bread Crumb");
	}

	async addCurrencyButton() {
		await this.baseInstance.clickElement(elements.addCurrencyButton, "User Click on Add Currency button");
	}

	async addCurrencyModel() {
		await this.baseInstance.isDisplayed(elements.addCurrencyModel);
	}

	async clickOnCountriesCard() {
		await this.baseInstance.clickElement(elements.clickOnCountriesCard, "click on countries card");
	}

	async clickOnAddCountryButton() {
		await this.baseInstance.clickElement(elements.addCountryButton, "clicks on the Add Country modal button");
	}

	async clickOnAddCountryModelButton() {
		await this.baseInstance.clickElement(elements.addCountryModelButton, "click on add country model button");
	}

	async countryIsAdded() {
		await this.baseInstance.isDisplayed(elements.countryIsAdded);
		await this.baseInstance.wait(2);
	}

	async clickOnChatterIcon() {
		await this.baseInstance.clickElement(elements.clickOnChatterIcon, "click on chatter icon");
		await this.baseInstance.wait(2);
	}

	async ChatterModel() {
		expect(await this.baseInstance.isDisplayed(elements.ChatterModelTextTitle)).toBeTruthy();
		expect(await this.baseInstance.isDisplayed(elements.chatterAccountVerification)).toBeTruthy();
		expect(await this.baseInstance.isDisplayed(elements.chatterDayLabel)).toBeTruthy();
	}

	async clickOnCrossIcon() {
		await this.baseInstance.clickElement(elements.clickOnXIcon, "close the modal");
		await this.baseInstance.wait(2);
	}

	async verifyChatterModelIsClosed() {
		expect(await this.baseInstance.isDisplayed(elements.verifyChatterModelIsExpandable)).toBeFalsy();
	}

	async clickOnActionMenuButton() {
		await this.baseInstance.clickElement(elements.actionMenuButton, "Action menu button");
	}

	async selectRetireOption() {
		await this.baseInstance.clickElement(elements.retireOption, "Retire option");
	}

	async verifyRetirePopupDisplayed() {
		return await this.baseInstance.isDisplayed(elements.retirePopup);
	}

	async clickOnRetireButton() {
		await this.baseInstance.clickElement(elements.retireButton, "Retire button");
	}

	async removeActiveAndDraftFilters() {
		await this.baseInstance.clickElement(elements.activeFilterChip, "Active filter chip");
		await this.baseInstance.wait(1);
		await this.baseInstance.clickElement(elements.draftFilterChip, "Draft filter chip");
		await this.baseInstance.wait(1);
	}

	async verifyCountryIsRetired() {
		return await this.baseInstance.isDisplayed(elements.retiredCountryStatus);
	}

	async selectReActivateOption() {
		await this.baseInstance.clickElement(elements.reActivateOption, "Re-activate option");
	}

	async verifyReActivatePopupDisplayed() {
		return await this.baseInstance.isDisplayed(elements.reActivatePopup);
	}

	async clickOnReActivateButton() {
		await this.baseInstance.clickElement(elements.reActivateButton, "Re-activate button");
	}

	async verifyCountryIsReActivated() {
		return await this.baseInstance.isDisplayed(elements.activeCountryStatus);
	}

	async searchCountry(countryName: string) {
		await this.baseInstance.clickElement(elements.countrySearchField, "Country search field");
		await this.baseInstance.enterText(elements.countrySearchField, countryName, "Enter country name");
		await this.baseInstance.wait(2);
	}
}
