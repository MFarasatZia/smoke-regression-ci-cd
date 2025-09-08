import { BaseClass } from "../../helpers/BaseClass";
import { expect } from "@playwright/test";
import { elements } from "../../xpath/admin/adminAccountPageElements";

export default class AdminAccountPage {
	baseInstance: BaseClass;

	constructor(baseInstance: BaseClass) {
		this.baseInstance = baseInstance;
	}

	async clickAddAccountButton() {
		await this.baseInstance.clickElementByRole("button", "Add account");
	}

	async verifyAccountModalIsDisplayed(modalType: string) {
		switch (modalType.toLowerCase()) {
			case "add account":
				await this.baseInstance.expectElementToBeVisible(elements.addAccountModalText);
				break;
			case "rename Account":
				await this.baseInstance.expectElementToBeVisible(elements.renameAccountModalText);
				break;
			case "activate account":
				await this.baseInstance.expectElementToBeVisible(elements.activateAccountModalText);
				break;
			case "close account":
				await this.baseInstance.expectElementToBeVisible(elements.closeAccountModalText);
				break;
			case "delete account":
				expect(await this.baseInstance.isDisplayed(elements.deleteAccountModalText)).toBeTruthy();
				break;
			case "change owner":
				await this.baseInstance.expectElementToBeVisible(elements.changeAccountOwnerModalText);
				break;
			case "email is blocked":
				await this.baseInstance.expectElementToBeVisible(elements.emailIsBlockedModalText);
				break;
			case "email is closed":
				await this.baseInstance.expectElementToBeVisible(elements.emailIsClosedModalText);
				break;
			case "re-open account":
				await this.baseInstance.expectElementToBeVisible(elements.reOpenAccountText);
				break;
		}
	}

	async verifyBlockedAccountTextIsDisplayed(userEmail: string) {
		await this.baseInstance.expectElementToBeVisible(
			elements.actionModals.blockedUserModal.blockedUserErrorText(userEmail),
		);
	}

	async verifyClosedAccountTextIsDisplayed(userEmail: string) {
		await this.baseInstance.expectElementToBeVisible(
			elements.actionModals.closedUserModal.closedUserErrorText(userEmail),
		);
	}

	async clearAccountNameField() {
		await this.baseInstance.clearText(elements.actionModals.accountNameField, "Clear account name");
	}

	async verifySaveAsDraftButtonIsDisabled() {
		const isDraftButtonEnabled: boolean = await this.baseInstance.isEnabled(elements.actionModals.saveAsDraftButton);
		expect(isDraftButtonEnabled).toBeFalsy();
	}

	async fillAccountName(accountName: string) {
		await this.baseInstance.fillText(elements.actionModals.accountNameField, accountName);
	}

	async clickSaveAsDraftButton() {
		await this.baseInstance.clickElement(elements.actionModals.saveAsDraftButton, "Click save as draft button");
	}

	async clickSaveButton() {
		await this.baseInstance.clickElement(elements.actionModals.saveButton, "Click save button");
	}

	async searchForCreatedAccount(accountName: string) {
		const isClearSearchButtonDisplayed: boolean = await this.baseInstance.isDisplayed(elements.clearSearchButton);
		if (isClearSearchButtonDisplayed) {
			await this.baseInstance.clickElement(elements.clearSearchButton, "Click clear search button");
		}
		await this.baseInstance.fillText(elements.searchField, accountName);
	}

	async verifyAccountName(expectedAccountName: string) {
		expect(await this.baseInstance.getTextByIndex(elements.accountNameList, 0)).toBe(expectedAccountName);
	}

	async verifyAccountIsNoDisplayedInTable(expectedAccountName: string) {
		expect!(await this.baseInstance.isDisplayed(elements.accountNameInTable(expectedAccountName)));
	}

	async verifyAccountStatus(expectedAccountStatus: string) {
		expect(await this.baseInstance.getText(elements.accountStatus)).toBe(expectedAccountStatus);
	}

	async verifyAccountNameErrorMessage(expectedErrorMessage: string) {
		expect(await this.baseInstance.getText(elements.actionModals.enterAccountNameFieldErrorMessage)).toBe(
			expectedErrorMessage,
		);
	}

	async clickThreeDottedButton() {
		const numberOfDisplayedAccount = await this.baseInstance.getElementCount(elements.threeDottedButtonList);
		expect(numberOfDisplayedAccount).toBe(1);
		await this.baseInstance.clickElement(elements.threeDottedButtonList, "Click the three dotted button list");
	}

	async verifyActionIsDisplayed(action: string) {
		switch (action.toLowerCase()) {
			case "rename":
				await this.baseInstance.expectElementToBeVisible(elements.actionsMenu.renameButton);
				break;
			case "cancel invite":
				await this.baseInstance.expectElementToBeVisible(elements.actionsMenu.cancelInvite);
				break;
			case "activate":
				await this.baseInstance.expectElementToBeVisible(elements.actionsMenu.activateButton);
				break;
			default:
				throw new Error(`Unsupported action: ${action}`);
		}
	}

	async verifyActionsCount(expectedNumberOfActionsDisplayed: number) {
		const actualElements: number = await this.baseInstance.getElementCount(elements.actionsMenu.actionButtonsList);
		expect(actualElements).toBe(expectedNumberOfActionsDisplayed);
	}

	async clickActivateButton() {
		await this.baseInstance.clickElement(elements.actionsMenu.activateButton, "Click activate button");
	}

	async clickRenameButton() {
		await this.baseInstance.clickElement(elements.actionsMenu.renameButton, "Click rename button");
	}

	async clickCloseButton() {
		await this.baseInstance.clickElement(elements.actionsMenu.closeButton, "Click close button");
	}

	async clickDeleteButton() {
		await this.baseInstance.clickElement(elements.actionsMenu.deleteButton, "Click close button");
	}

	async clickChangeOwnerButton() {
		await this.baseInstance.clickElement(elements.actionsMenu.changeOwnerButton, "Click change owner button");
	}

	async clickReOpenButton() {
		await this.baseInstance.clickElement(elements.actionsMenu.reOpenButton, "Click re-open button");
	}

	async clickOpenButton() {
		await this.baseInstance.clickElement(elements.actionsMenu.OpenButton, "Click re-open button");
	}

	async verifyCloseActionIsNotDisplayed() {
		const isCloseActionDisplayed: boolean = await this.baseInstance.isDisplayed(elements.actionsMenu.closeButton);
		expect(isCloseActionDisplayed).toBeFalsy();
	}

	async verifyChangeAccountOwnerActionIsNotDisplayed() {
		const isCloseActionDisplayed: boolean = await this.baseInstance.isDisplayed(elements.actionsMenu.changeOwnerButton);
		expect(isCloseActionDisplayed).toBeFalsy();
	}

	async verifyAccountNameIsPrefilledInRenameModal(expectedAccountName: string) {
		const actualAccountName = await this.baseInstance.getInputValue(elements.actionModals.accountNameField);
		expect(actualAccountName).toBe(expectedAccountName);
	}

	async verifyNextButtonIsDisabled() {
		const isNextButtonEnabled = await this.baseInstance.isEnabled(elements.actionModals.nextButton);
		expect(isNextButtonEnabled).toBeFalsy();
	}

	async verifyActivateModalButtonIsDisabled() {
		const isActivateButtonEnabled = await this.baseInstance.isEnabled(elements.actionModals.activateButton);
		expect(isActivateButtonEnabled).toBeFalsy();
	}

	async fillEmailField(email: string) {
		await this.baseInstance.fillText(elements.actionModals.emailField, email);
	}

	async verifyActivateAccountInvalidEmailErrorText(expectedErrorMessage: string) {
		const actualErrorMessage = await this.baseInstance.getText(elements.actionModals.activateAccountEmailErrorMessage);
		expect(actualErrorMessage).toEqual(expectedErrorMessage);
	}

	async clickNextButton() {
		await this.baseInstance.clickElement(elements.actionModals.nextButton, "Click next button");
	}

	async verifyEmailClosedPopUp() {
		await this.baseInstance.expectElementToBeVisible(elements.verifyEmailClosedPopUp);
	}

	async verifyEmailBlockedPopUp() {
		await this.baseInstance.expectElementToBeVisible(elements.verifyEmailBlockedPopUp);
	}

	async clickInviteAndWaitForSignupButton() {
		await this.baseInstance.clickElement(
			elements.actionModals.inviteAndWaitForSignupButton,
			"Click invite and wait for signup button",
		);
	}

	async VerifyInviteAndWaitForSignupButton() {
		expect(await this.baseInstance.isDisplayed(elements.actionModals.inviteAndWaitForSignupButton)).toBeTruthy();
	}

	async clickActivateModalButton() {
		await this.baseInstance.clickElement(elements.actionModals.activateButton, "Click activate button");
	}

	async clickCloseAccountModalButton() {
		await this.baseInstance.clickElement(elements.actionModals.closeButton, "Click close button");
	}

	async clickDeleteAccountModalButton() {
		await this.baseInstance.clickElement(elements.actionModals.deleteButton, "Click close button");
	}

	async clickReOpenAccountModalButton() {
		await this.baseInstance.clickElement(elements.actionModals.reOpen, "Click re-open button");
	}

	async fillFirstNameLastNameFields(firstName: string, lastName: string) {
		await this.baseInstance.fillText(elements.actionModals.firstName, firstName);
		await this.baseInstance.fillText(elements.actionModals.lastName, lastName);
	}

	async verifyExistingUserTextIsDisplayed(accountName: string) {
		await this.baseInstance.isDisplayed(elements.actionModals.alreadyExistingUserText(accountName));
	}

	async verifyNonExistingUserTextIsDisplayed(userEmail: string, accountName: string) {
		expect(
			await this.baseInstance.isDisplayed(
				elements.actionModals.changeOwnerModal.changeOwnerModalSecondStep.nonExistingUserText(userEmail, accountName),
			),
		).toBeTruthy();
	}

	async fillChangeAccountOwnerEmailField(email: string) {
		await this.baseInstance.fillText(elements.actionModals.changeOwnerModal.changeAccountOwnerEmailField, email);
	}

	async clickNextButtonFromChangeAccountOwnerModal() {
		await this.baseInstance.clickElement(
			elements.actionModals.changeOwnerModal.nextButtonFromChangeAccountOwner,
			"Click next button",
		);
	}

	async clickChangeOwnerButtonFromActionModal() {
		await this.baseInstance.clickElement(
			elements.actionModals.changeOwnerModal.changeOwnerButton,
			"Click change owner button",
		);
	}

	async verifyChangeOwnerButtonFromActionModalIsDisabled() {
		const isChangeOwnerButtonDisabled: boolean = await this.baseInstance.isEnabled(
			elements.actionModals.changeOwnerModal.changeOwnerButton,
		);
		expect(isChangeOwnerButtonDisabled).toBeFalsy();
	}

	async verifyChangeOwnerButtonFromActionModalIsEnabled() {
		const isChangeOwnerButtonDisabled: boolean = await this.baseInstance.isEnabled(
			elements.actionModals.changeOwnerModal.changeOwnerButton,
		);
		expect(isChangeOwnerButtonDisabled).toBeTruthy();
	}

	async fillFirstLastNameFromChangeAccountOwnerModal(firstName: string, lastName: string) {
		await this.baseInstance.fillText(
			elements.actionModals.changeOwnerModal.changeOwnerModalSecondStep.firstNameField,
			firstName,
		);
		await this.baseInstance.fillText(
			elements.actionModals.changeOwnerModal.changeOwnerModalSecondStep.lastNameField,
			lastName,
		);
	}

	async verifyAccountOwnerNameIsDisplayedInTheAccountsTable(firstName: string, lastName: string) {
		const isNameDisplayed: boolean = await this.baseInstance.isDisplayed(
			elements.accountOwnerFullNameText(firstName, lastName),
		);
		expect(isNameDisplayed).toBeTruthy();
	}

	async verifyAccountOwnerEmailIsDisplayedInTheAccountsTable(email: string) {
		const isNameDisplayed: boolean = await this.baseInstance.isDisplayed(elements.accountOwnerEmailText(email));
		expect(isNameDisplayed).toBeTruthy();
	}

	async verifyNoAccountOwnerIsDisplayedInTheAccountsTable() {
		const accountOwnerName = await this.baseInstance.getText(elements.accountOwnerCellText);
		expect(accountOwnerName).toEqual("");
	}

	async verifyUserNotVisible(firstName: string, lastName: string) {
		const isNameDisplayed: boolean = await this.baseInstance.isDisplayed(
			elements.accountOwnerFullNameText(firstName, lastName),
		);
		expect(isNameDisplayed).not.toBeTruthy();
	}

	async fillEmailFieldAccount(email: string) {
		await this.baseInstance.fillText(elements.actionModals.emailField, email);
	}

	async removeDefaultFilters() {
		console.log("Removing default account status filters");
		await this.clickMoreFiltersButton();
		console.log("Clicked on 'More Filters' button");
		await this.verifyFilterModalIsDisplayed();
		console.log("Filter modal is displayed");
		await this.clickDraftFilterCheckbox();
		console.log("Unchecked 'Draft' filter");
		await this.clickOpenFilterCheckbox();
		console.log("Unchecked 'Open' filter");
		await this.clickSaveFilterButton();
		console.log("Clicked on 'Save Filter' button");
	}

	async addFilter(filter: string) {
		if (await this.baseInstance.isDisplayed(elements.accountsFiltersButton)) {
			await this.clickFiltersButton();
		} else {
			await this.clickMoreFiltersButton();
		}
		await this.verifyFilterModalIsDisplayed();
		switch (filter.toLowerCase()) {
			case "pending activation":
				await this.clickPendingActivationFilterCheckbox();
				break;
			case "closed":
				await this.clickClosedFilterCheckbox();
				break;
			case "suspended":
				await this.clickSuspendedFilterCheckbox();
				break;
		}
		await this.clickSaveFilterButton();
	}

	async clickFiltersButton() {
		await this.baseInstance.clickElement(elements.accountsFiltersButton, "Click users filter button");
	}

	async clickMoreFiltersButton() {
		await this.baseInstance.clickElement(elements.accountsMoreFiltersButton, "Click more filters button");
	}

	async verifyFilterModalIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.accountsModalFilter.modal);
	}

	async verifyOpenFilterIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.accountsActiveFilters.openFilter);
	}

	async verifyDraftFilterIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.accountsActiveFilters.draftFilter);
	}

	async verifyClosedFilterIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.accountsActiveFilters.closedFilter);
	}

	async verifySuspendedFilterIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.accountsActiveFilters.suspendedFilter);
	}

	async verifyPendingFilterIsDisplayed() {
		await this.baseInstance.expectElementToBeVisible(elements.accountsActiveFilters.pendingFilter);
	}

	async clickDraftFilterCheckbox() {
		await this.baseInstance.clickElement(elements.accountsModalFilter.draftCheckbox, "Click draft filter button");
	}

	async clickOpenFilterCheckbox() {
		await this.baseInstance.clickElement(elements.accountsModalFilter.openCheckbox, "Click open filter button");
	}

	async clickPendingActivationFilterCheckbox() {
		await this.baseInstance.clickElement(
			elements.accountsModalFilter.pendingActivationCheckbox,
			"Click pending filter button",
		);
	}

	async clickClosedFilterCheckbox() {
		await this.baseInstance.clickElement(elements.accountsModalFilter.closedCheckbox, "Click closed filter button");
	}

	async clickSuspendedFilterCheckbox() {
		await this.baseInstance.clickElement(
			elements.accountsModalFilter.suspendedCheckbox,
			"Click suspended filter button",
		);
	}

	async clickSaveFilterButton() {
		await this.baseInstance.clickElement(elements.accountsModalFilter.saveFilterButton, "Click save filter button");
	}

	async removeOpenFilter() {
		await this.baseInstance.clickElement(elements.accountsActiveFilters.openFilterCloseButton, "Closing open filter");
	}

	async removePendingActivationFilter() {
		await this.baseInstance.clickElement(
			elements.accountsActiveFilters.pendingFilterCloseButton,
			"Closing pending filter",
		);
	}

	async removeDraftFilter() {
		await this.baseInstance.clickElement(elements.accountsActiveFilters.draftFilterCloseButton, "Closing draft filter");
	}

	async removeSuspendedFilter() {
		await this.baseInstance.clickElement(
			elements.accountsActiveFilters.suspendedFilterCloseButton,
			"Closing suspended filter",
		);
	}

	async removeClosedFilter() {
		await this.baseInstance.clickElement(
			elements.accountsActiveFilters.closedFilterCloseButton,
			"Closing closed filter",
		);
	}

	async clickOnTheInviteLink(url: string) {
		await this.baseInstance.openURL(url);
	}

	async verifyLoginUrl() {
		const loginURL = await this.baseInstance.getCurrentUrl();
		expect(loginURL).toContain("https://account.dev.exiqtive.com/login");
	}
}
