import { BaseClass } from "../../helpers/BaseClass";
import { elements } from "../../xpath/admin/adminUsersPageElements";
import { expect } from "@playwright/test";

export default class AdminUsersPage {
	baseInstance: BaseClass;

	constructor(baseInstance: BaseClass) {
		this.baseInstance = baseInstance;
	}

	async searchForCreatedUser(userName: string) {
		if (await this.baseInstance.isVisible(elements.clearSearchButton)) {
			await this.baseInstance.clickElement(elements.clearSearchButton, "Click clear search button");
		}
		await this.baseInstance.fillText(elements.searchField, userName);
		expect(await this.baseInstance.isDisplayed(elements.userName(userName))).toBeTruthy();
	}

	async removeDefaultFilters() {
		await this.clickMoreFiltersButton();
		await this.verifyFilterModalIsDisplayed();
		await this.clickInvitedFilterCheckbox();
		await this.clickOperationalFilterCheckbox();
		await this.clickSaveFilterButton();
	}

	async clickFiltersButton() {
		await this.baseInstance.clickElement(elements.usersFiltersButton, "Click users filter button");
	}

	async clickMoreFiltersButton() {
		await this.baseInstance.clickElement(elements.usersMoreFiltersButton, "Click more filters button");
	}

	async verifyFilterModalIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.usersModalFilter.modal);
	}

	async clickInvitedFilterCheckbox() {
		await this.baseInstance.clickElement(elements.usersModalFilter.invitedCheckbox, "Click invited filters button");
	}

	async clickOperationalFilterCheckbox() {
		await this.baseInstance.clickElement(
			elements.usersModalFilter.operationalCheckbox,
			"Click operational filters button",
		);
	}

	async clickClosedFilterCheckbox() {
		await this.baseInstance.clickElement(elements.usersModalFilter.closedCheckbox, "Click closed filters button");
	}

	async clickBlockedFilterCheckbox() {
		await this.baseInstance.clickElement(elements.usersModalFilter.blockedCheckbox, "Click blocked filters button");
	}

	async clickSaveFilterButton() {
		await this.baseInstance.clickElement(elements.usersModalFilter.saveFilterButton, "Click save filters button");
		await this.baseInstance.wait(5);
	}

	async verifyUserBadge(userBadge: string) {
		const badge: string = await this.baseInstance.getText(elements.badge);
		expect(badge).toEqual(userBadge);
	}

	async searchUser(userName: string) {
		await this.baseInstance.fillText(elements.searchField, userName);
	}

	async verifyUserIsNoLongerDisplayed(userName: string) {
		if (await this.baseInstance.isDisplayed(elements.clearSearchButton)) {
			await this.baseInstance.clickElement(elements.clearSearchButton, "Click clear search button");
		}
		await this.baseInstance.fillText(elements.searchField, userName);
		await this.baseInstance.wait(5);
		expect(await this.baseInstance.isDisplayed(elements.userName(userName))).toBeFalsy();
	}

	async clickThreeDottedButton() {
		const numberOfDisplayedAccount = await this.baseInstance.getElementCount(elements.threeDottedButtonList);
		expect(numberOfDisplayedAccount).toBe(1);
		await this.baseInstance.clickElement(elements.threeDottedButtonList, "Click the three dotted button list");
	}

	async clickThreeDottedButtonByIndex(index: number) {
		await this.baseInstance.clickNthElement(
			elements.threeDottedButtonList,
			`Click the three dotted button list from index ${index}`,
			index,
		);
	}

	async clickDeleteActionButton() {
		await this.baseInstance.clickElement(elements.actions.deleteButton, "Click delete button");
	}

	async clickUnBlockActionButton() {
		await this.baseInstance.clickElement(elements.actions.unBlockButton, "Click Un-Block button");
	}

	async clickBlockActionButton() {
		await this.baseInstance.clickElement(elements.actions.blockbutton, "Click on Block button");
	}

	async clickUnCloseActionButton() {
		await this.baseInstance.clickElement(elements.actions.unClosebutton, "Click on Un-close button");
	}

	async clickCloseActionButton() {
		await this.baseInstance.clickElement(elements.actions.closeButton, "Click on close button");
	}

	async hideBlockButton() {
		expect(await this.baseInstance.isDisplayed(elements.actions.hideBlockButton)).toBeFalsy();
		await this.baseInstance.wait(5);
	}
	async blockedbutton() {
		await this.baseInstance.clickElement(elements.actions.blockedbutton, "the user clicks on blocks button");
		await this.baseInstance.wait(3);
	}

	async blockdisplaybutton() {
		await this.baseInstance.clickElement(
			elements.actions.blockdisplaybutton,
			"block option is shown when the user is the co-owner",
		);
		await this.baseInstance.wait(3);
	}

	async clearAll() {
		await this.baseInstance.clickElement(elements.actions.clearAll, "the user clicks on clear All button");
		await this.baseInstance.wait(3);
	}

	async clickCancelActionButton() {
		await this.baseInstance.clickElement(elements.actions.cancelButton, "Click on cancel button");
	}

	async clickRenameActionButton() {
		await this.baseInstance.clickElement(elements.actions.renameButton, "Click rename button");
	}

	async verifyActionIsNotDisplayed(action: string) {
		let isButtonDisplayed: boolean;
		switch (action.toLowerCase()) {
			case "rename":
				isButtonDisplayed = await this.baseInstance.isDisplayed(elements.actions.renameButton);
				expect(isButtonDisplayed).toBeFalsy();
		}
	}

	async verifyDeleteButtonIsNotDisplayed() {
		expect(await this.baseInstance.isDisplayed(elements.actions.deleteButton)).toBeFalsy();
	}

	async verifyUnBlockModalIsDisplayed(firstName: string, lastName: string) {
		const actualText: string = await this.baseInstance.getText(elements.modals.modalText);
		expect(actualText).toEqual(`You are about to un-block ${firstName} ${lastName}`);
	}

	async verifyBlockModalIsDisplayed(firstName: string, lastName: string) {
		const actualText: string = await this.baseInstance.getText(elements.modals.modalText);
		expect(actualText).toEqual(`You are about to block ${firstName} ${lastName}`);
	}

	async verifyUncloseModalIsDisplayed(firstName: string, lastName: string) {
		const actualText: string = await this.baseInstance.getText(elements.modals.modalText);
		expect(actualText).toEqual(`You are about to un-close ${firstName} ${lastName}`);
	}

	async verifycloseModalIsDisplayed(firstName: string, lastName: string) {
		const actualText: string = await this.baseInstance.getText(elements.modals.modalText);
		expect(actualText).toEqual(`You are about to close ${firstName} ${lastName}`);
	}

	async verifyCancelModalIsDisplayed(firstName: string, lastName: string) {
		const actualText: string = await this.baseInstance.getText(elements.modals.modalText);
		expect(actualText).toEqual(`You are about to cancel invite sent to ${firstName} ${lastName}.`);
	}

	async verifyDeleteModalIsDisplayed(firstName: string, lastName: string) {
		const actualText: string = await this.baseInstance.getText(elements.modals.modalText);
		expect(actualText).toEqual(`You are about to delete ${firstName} ${lastName}.`);
	}

	async verifyRenameModalIsDisplayed() {
		const actualTitleName: string = await this.baseInstance.getText(elements.modals.renameModal.renameModalTitleText);
		expect(actualTitleName).toEqual("Rename");
	}

	async verifyRenameButtonFromModalIsDisabled() {
		const isRenameButtonEnabled: boolean = await this.baseInstance.isEnabled(elements.modals.renameModal.renameButton);
		expect(isRenameButtonEnabled).toBeFalsy();
	}

	async verifyRenameButtonFromModalIsEnabled() {
		await this.baseInstance.expectElementToBeEnabled(elements.modals.renameModal.renameButton);
	}

	async clickRenameButtonFromRenameModal() {
		await this.baseInstance.clickElement(elements.modals.renameModal.renameButton, "Click rename button");
	}

	async clickUnblockButtonFromUnblockModal() {
		await this.baseInstance.clickElement(elements.modals.unBlockModal.unblockbutton, "Click Un-Block button");
	}

	async clickBlockButtonFromUnblockModal() {
		await this.baseInstance.clickElement(elements.modals.blockModal.blockbutton, "Click on Block button");
	}

	async clickUncloseButtonFromUnblockModal() {
		await this.baseInstance.clickElement(elements.modals.uncloseModal.unclosebutton, "Click on un-close button");
	}

	async clickcloseButtonFromUnblockModal() {
		await this.baseInstance.clickElement(elements.modals.closeModal.closebutton, "Click on close button");
	}

	async clickCancelInviteForUser() {
		await this.baseInstance.clickElement(elements.modals.cancelModal.cancelButton, "Click on Cancel button");
	}

	async fillFirstNameFieldFromRenameModal(firstName: string) {
		await this.baseInstance.clearText(elements.modals.renameModal.firstNameField, "Clear first name field");
		await this.baseInstance.fillText(elements.modals.renameModal.firstNameField, firstName);
	}

	async fillLastNameFieldFromRenameModal(lastName: string) {
		await this.baseInstance.clearText(elements.modals.renameModal.lastNameField, "Clear last name field");
		await this.baseInstance.fillText(elements.modals.renameModal.lastNameField, lastName);
	}

	async clickDeleteButtonFromModal() {
		await this.baseInstance.clickNthElement(elements.modals.modalButtonsList, "Click delete button", 1);
		await this.baseInstance.waitForElementToDisappear(elements.modals.modalText);
	}

	async getAccessToAccountsCounter() {
		return await this.baseInstance.getText(elements.accountCounter);
	}

	async clickAddSystemAdminButton() {
		return await this.baseInstance.clickElement(elements.addSystemAdminButton, "Click + Add System Admin button");
	}

	async verifyAddSystemAdminModalIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.modals.addSystemAdminModalText);
		const actualText: string = await this.baseInstance.getText(elements.modals.addSystemAdminModalText);
		expect(actualText).toContain("+ Add System Admin");
	}

	async verifyNextButtonIsDisabled() {
		await this.baseInstance.expectElementToBeDisabled(elements.modals.nextButton);
	}

	async verifyNextButtonIsEnabled() {
		await this.baseInstance.expectElementToBeEnabled(elements.modals.nextButton);
	}

	async fillUserEmailField(email: string) {
		await this.baseInstance.fillText(elements.modals.emailField, email);
	}

	async clickNextButton() {
		await this.baseInstance.clickElement(elements.modals.nextButton, "Click next button");
	}

	async verifyEmailIsDisplayedInSecondCreationModal(expectedEmail: string) {
		const actualEmail: string = await this.baseInstance.getText(elements.modals.emailText);
		expect(actualEmail).toBe(expectedEmail);
	}

	async fillFirstNameField(firstName: string) {
		await this.baseInstance.fillText(elements.modals.firstNameField, firstName);
	}

	async fillLastNameField(lastName: string) {
		await this.baseInstance.fillText(elements.modals.lastNameField, lastName);
	}

	async verifyAddButtonIsDisabled() {
		await this.baseInstance.expectElementToBeDisabled(elements.modals.addButton);
	}

	async verifyAddButtonIsEnabled() {
		await this.baseInstance.expectElementToBeEnabled(elements.modals.addButton);
	}

	async clickAddButton() {
		await this.baseInstance.clickElement(elements.modals.addButton, "Click add button");
	}

	async waitForModalToDisappear() {
		await this.baseInstance.waitForElementToDisappear(elements.modals.modal);
	}

	async verifyExistingUserErrorMessage(firstName: string, lastName: string, email: string) {
		await this.baseInstance.expectElementToBeVisible(
			elements.modals.existingUserErrorMessage(firstName, lastName, email),
		);
	}

	async waitForLoadIconToDisappear() {
		if (await this.baseInstance.isDisplayed(elements.loadIcon)) {
			await this.baseInstance.waitForElementToDisappear(elements.loadIcon);
		}
	}

	async verifyRenameActionIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.actions.renameButton);
	}

	async verifyResendInviteActionIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.actions.resendInviteButton);
	}

	async verifyResendInviteActionIsNotDisplayed() {
		!(await this.baseInstance.isDisplayed(elements.actions.resendInviteButton));
	}

	async verifyCancelInviteActionIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.actions.cancelInviteButton);
	}

	async verifyDeleteActionIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.actions.deleteButton);
	}

	async verifyCloseActionIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.actions.closeButton);
	}

	async verifyBlockActionIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.actions.blockbutton);
	}

	async verifyUnBlockActionIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.actions.unBlockButton);
	}

	async verifyUnCloseActionIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.actions.unClosebutton);
	}

	async verifyActionsCount(expectedNumberOfActionsDisplayed: number) {
		const actualElements: number = await this.baseInstance.getElementCount(elements.actions.actionButtonsList);
		expect(actualElements).toBe(expectedNumberOfActionsDisplayed);
	}

	async verifyUserNotVisible(firstName: string) {
		expect!(await this.baseInstance.isDisplayed(elements.userName(firstName)));
	}

	async verifyUserIsVisible(firstName: string) {
		await this.baseInstance.expectElementToBeVisible(elements.userName(firstName));
	}

	async getUserCounter() {
		const activeUsersCount: string = await this.baseInstance.getText(elements.userCounter);

		return parseInt(activeUsersCount.replace(" active", "").trim(), 10);
	}

	async waitForLoadingSpinnerToDisappear() {
		if (await this.baseInstance.isDisplayed(elements.loadingSpinner)) {
			await this.baseInstance.waitForElementToDisappear(elements.loadingSpinner);
		}
	}

	async verifyInvitedFilterIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.activeFilters.invited);
	}

	async verifyOperationalFilterIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.activeFilters.operational);
	}

	async verifyClosedFilterIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.activeFilters.closed);
	}

	async verifyBlockedFilterIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.activeFilters.blocked);
	}

	async removeInvitedFilter() {
		await this.baseInstance.clickElement(elements.activeFilters.invited, "Click remove invited filter button");
	}

	async removeOperationalFilter() {
		await this.baseInstance.clickElement(elements.activeFilters.operational, "Click remove operational filter button");
	}

	async removeClosedFilter() {
		await this.baseInstance.clickElement(elements.activeFilters.closed, "Click remove closed filter button");
	}

	async removeBlockedFilter() {
		await this.baseInstance.clickElement(elements.activeFilters.blocked, "Click remove blocked filter button");
	}

	async addInvitedFilter() {
		await this.clickMoreFiltersButton();
		await this.verifyFilterModalIsDisplayed();
		await this.clickInvitedFilterCheckbox();
		await this.clickSaveFilterButton();
	}

	async addOperationalFilter() {
		await this.clickMoreFiltersButton();
		await this.verifyFilterModalIsDisplayed();
		await this.clickOperationalFilterCheckbox();
		await this.clickSaveFilterButton();
	}

	async addClosedFilter() {
		await this.clickMoreFiltersButton();
		await this.verifyFilterModalIsDisplayed();
		await this.clickClosedFilterCheckbox();
		await this.clickSaveFilterButton();
	}

	async addBlockedFilter() {
		await this.clickMoreFiltersButton();
		await this.verifyFilterModalIsDisplayed();
		await this.clickBlockedFilterCheckbox();
		await this.clickSaveFilterButton();
	}
}
