import { Given, Then, When } from "@cucumber/cucumber";
import { baseInstance } from "../../helpers/BaseClass";
import { elements } from "../../xpath/admin/adminLeftNavigationElements";
import { expect } from "@playwright/test";
import { AccountData, generateRandomUserData, getRandomAccount } from "../../helpers/util/random";
import AdminAccountPage from "../../pages/admin/adminAccountPage";
import { newAccountAPIData, originalAccountName } from "./adminAccountApiSteps";
import { adminUserData } from "./adminUsersApiSteps";
import { findMessageByEmail, getUserInviteLinkFromEmail } from "../../helpers/util/mailtrap";

let accountData: AccountData;
let newUser: AccountData;
let inviteLink: string;
const adminAccountPage = new AdminAccountPage(baseInstance);

When("user searches for account", async function () {
	const accountName =
		typeof newAccountAPIData.firstName === "undefined" ? accountData.firstName : newAccountAPIData.firstName;
	await adminAccountPage.searchForCreatedAccount(accountName);
});

Then("verify the account name is displayed in the account tree", async function () {
	const actualName = await baseInstance.getTextByIndex(elements.account.accountName, 0);
	expect(actualName).toEqual(newAccountAPIData.firstName);
});

When("user creates a account", async function () {
	await adminAccountPage.clickAddAccountButton();
	await adminAccountPage.verifyAccountModalIsDisplayed("Add account");
	await adminAccountPage.verifySaveAsDraftButtonIsDisabled();
	accountData = generateRandomUserData();
	await adminAccountPage.fillAccountName(accountData.firstName);
	await adminAccountPage.clickSaveAsDraftButton();
});

Then(/^verify that the account name is displayed in the accounts page$/, async function () {
	await adminAccountPage.searchForCreatedAccount(accountData.firstName);
	await adminAccountPage.verifyAccountName(accountData.firstName);
});

Then("verify that the account is in status {string}", async function (expectedAccountStatus: string) {
	await adminAccountPage.verifyAccountStatus(expectedAccountStatus);
});

When("user removes the default account status filters", async function () {
	await adminAccountPage.removeDefaultFilters();
});

When("user user clicks the three dotted button", async function () {
	await adminAccountPage.clickThreeDottedButton();
});

Then("verify the {string} account action is displayed", async function (action: string) {
	await adminAccountPage.verifyActionIsDisplayed(action);
});

Then("verify {int} account actions are displayed", async function (expectedNumberOfActionsDisplayed: number) {
	await adminAccountPage.verifyActionsCount(expectedNumberOfActionsDisplayed);
});

When("user opens the {string} modal", async function (accountModalName: string) {
	switch (accountModalName.toLowerCase()) {
		case "add account":
			await adminAccountPage.clickAddAccountButton();
			await adminAccountPage.verifyAccountModalIsDisplayed(accountModalName);
			break;
		case "activate account":
			await adminAccountPage.searchForCreatedAccount(newAccountAPIData.firstName);
			await adminAccountPage.clickThreeDottedButton();
			await adminAccountPage.clickActivateButton();
			await adminAccountPage.verifyAccountModalIsDisplayed(accountModalName);
			break;
		case "rename account":
			await adminAccountPage.searchForCreatedAccount(newAccountAPIData.firstName);
			await adminAccountPage.clickThreeDottedButton();
			await adminAccountPage.clickRenameButton();
			await adminAccountPage.verifyAccountModalIsDisplayed(accountModalName);
			break;
		case "close account":
			await adminAccountPage.searchForCreatedAccount(originalAccountName);
			await adminAccountPage.clickThreeDottedButton();
			await adminAccountPage.clickCloseButton();
			await adminAccountPage.verifyAccountModalIsDisplayed(accountModalName);
			break;
		case "change owner":
			await adminAccountPage.searchForCreatedAccount(originalAccountName);
			await adminAccountPage.clickThreeDottedButton();
			await adminAccountPage.clickChangeOwnerButton();
			await adminAccountPage.verifyAccountModalIsDisplayed(accountModalName);
			break;
		case "delete account":
			await adminAccountPage.searchForCreatedAccount(originalAccountName);
			await adminAccountPage.clickThreeDottedButton();
			await adminAccountPage.clickDeleteButton();
			await adminAccountPage.verifyAccountModalIsDisplayed(accountModalName);
			break;
		case "re-open":
			await adminAccountPage.searchForCreatedAccount(originalAccountName);
			await adminAccountPage.clickThreeDottedButton();
			await adminAccountPage.clickReOpenButton();
			await adminAccountPage.verifyAccountModalIsDisplayed(accountModalName);
			break;
		case "open":
			await adminAccountPage.searchForCreatedAccount(newAccountAPIData.firstName);
			await adminAccountPage.clickThreeDottedButton();
			await adminAccountPage.clickActivateButton();
			await adminAccountPage.verifyAccountModalIsDisplayed(accountModalName);
			break;
	}
});

When("user adds the same account name", async function () {
	await adminAccountPage.fillAccountName(newAccountAPIData.firstName);
});

Then("verify that the error message {string} is displayed", async function (expectedErrorMessage: string) {
	await adminAccountPage.verifyAccountNameErrorMessage(expectedErrorMessage);
});

When("user adds a account name with length smaller than 3", async function () {
	await adminAccountPage.fillAccountName(newAccountAPIData.firstName.substring(0, 2));
});

Then("verify the account name is filled", async function () {
	await adminAccountPage.verifyAccountNameIsPrefilledInRenameModal(newAccountAPIData.firstName);
});

When("user tries to add account using a existing account name", async function () {
	await adminAccountPage.fillAccountName("Hazenfield");
	await adminAccountPage.clickSaveAsDraftButton();
});

When("user renames the account using {string}", async function (newAccountName: string) {
	await adminAccountPage.clearAccountNameField();
	switch (newAccountName) {
		case "Valid name":
			accountData = generateRandomUserData();
			await adminAccountPage.fillAccountName(accountData.firstName);
			await adminAccountPage.clickSaveButton();
			break;
		case "Existing name":
			await adminAccountPage.fillAccountName("Hazenfield");
			await adminAccountPage.clickSaveButton();
			break;
		case "Name smaller than 3 characters":
			await adminAccountPage.fillAccountName("Az");
			break;
	}
});

When("user activates the account with {string}", async function (userType: string) {
	await adminAccountPage.verifyNextButtonIsDisabled();
	switch (userType.toLowerCase()) {
		case "non existing user":
			accountData = generateRandomUserData();
			await adminAccountPage.fillEmailField(accountData.email);
			await adminAccountPage.clickNextButton();
			await adminAccountPage.verifyActivateModalButtonIsDisabled();
			await adminAccountPage.fillFirstNameLastNameFields(accountData.firstName, accountData.lastName);
			await adminAccountPage.clickInviteAndWaitForSignupButton();
			break;
		case "existing user":
			await adminAccountPage.fillEmailField("dan@hazenfield.com");
			await baseInstance.wait(10);
			await adminAccountPage.clickNextButton();

			await adminAccountPage.verifyExistingUserTextIsDisplayed(newAccountAPIData.firstName);
			await adminAccountPage.clickActivateModalButton();
			break;
		case "closed user":
		case "blocked user":
			await adminAccountPage.fillEmailField(adminUserData.email);
			await adminAccountPage.clickNextButton();
			break;
	}

	await baseInstance.wait(3);
});

Then("user activate the account with {string}", async (userType: string) => {
	await adminAccountPage.verifyNextButtonIsDisabled();
	switch (userType.toLowerCase()) {
		case "non existing user":
			accountData = generateRandomUserData();
			await adminAccountPage.fillEmailField(accountData.email);
			await adminAccountPage.clickNextButton();
			await adminAccountPage.verifyActivateModalButtonIsDisabled();
			await adminAccountPage.fillFirstNameLastNameFields(accountData.firstName, accountData.lastName);
			break;
		case "existing user":
			await adminAccountPage.fillEmailField("dan@hazenfield.com");
			await adminAccountPage.clickNextButton();
			await adminAccountPage.verifyExistingUserTextIsDisplayed(newAccountAPIData.firstName);
			await adminAccountPage.clickActivateModalButton();
			break;
		case "closed user":
			await adminAccountPage.fillEmailField(adminUserData.email);
			await adminAccountPage.clickNextButton();
	}
});

Then("verify the text of invite button", async () => {
	await adminAccountPage.VerifyInviteAndWaitForSignupButton();
});

Then("verify user receives the invite email in mailtrap", async () => {
	const recipientEmail = accountData.email;
	const message = await findMessageByEmail(recipientEmail);

	expect(message).not.toBeNull();
});

When("verify the email is received in the mailbox and extract the invite link", async () => {
	const recipientEmailForPass = accountData.email;
	inviteLink = await getUserInviteLinkFromEmail(recipientEmailForPass);
	console.log("This is the link =============> " + inviteLink);
	console.log(inviteLink);
	expect(inviteLink).not.toBeNull();
});

Then("user clicks on the invite link", async () => {
	await adminAccountPage.clickOnTheInviteLink(inviteLink);
});

Then("user verify the login page url", async () => {
	await adminAccountPage.verifyLoginUrl();
});

When("Verify that Existing user email recognized when activating account", async function () {
	await adminAccountPage.verifyNextButtonIsDisabled();
	await adminAccountPage.fillEmailField("eric@nanoramic.com");
	await adminAccountPage.clickNextButton();
	await adminAccountPage.verifyExistingUserTextIsDisplayed(newAccountAPIData.firstName);
});

Then("Verify that email is closed in the system", async function () {
	await adminAccountPage.verifyEmailClosedPopUp();
});

Then("Verify that email is blocked in the system", async function () {
	await adminAccountPage.verifyEmailBlockedPopUp();
});

When(/^user fills the email field with a email that has invalid format$/, async function () {
	await adminAccountPage.fillEmailField("test@test");
});

Then("verify error message {string} is displayed", async function (expectedErrorMessage: string) {
	await adminAccountPage.verifyActivateAccountInvalidEmailErrorText(expectedErrorMessage);
});

When("user {string} the account", async function (accountAction: string) {
	switch (accountAction) {
		case "close":
			await adminAccountPage.clickCloseAccountModalButton();
			break;
		case "re-opens":
			await adminAccountPage.clickReOpenAccountModalButton();
			break;
	}
});

When("user deletes the account", async function () {
	await adminAccountPage.clickDeleteAccountModalButton();
});

When("user opens the accounts action menu", async function () {
	await adminAccountPage.searchForCreatedAccount(newAccountAPIData.firstName);
	await adminAccountPage.clickThreeDottedButton();
});

Then("verify the {string} account action is not displayed", async function (accountAction: string) {
	switch (accountAction.toLowerCase()) {
		case "close":
			await adminAccountPage.verifyCloseActionIsNotDisplayed();
			break;
		case "change owner":
			await adminAccountPage.verifyChangeAccountOwnerActionIsNotDisplayed();
			break;
	}
});

When("user changes owner using {string}", async function (userType: string) {
	newUser = getRandomAccount();
	switch (userType.toLowerCase()) {
		case "existing user":
			await adminAccountPage.fillChangeAccountOwnerEmailField("dan@hazenfield.com");
			await adminAccountPage.clickNextButtonFromChangeAccountOwnerModal();
			await adminAccountPage.verifyExistingUserTextIsDisplayed(originalAccountName);
			await adminAccountPage.clickChangeOwnerButtonFromActionModal();
			break;
		case "closed user":
		case "blocked user":
			await adminAccountPage.fillChangeAccountOwnerEmailField(adminUserData.email);
			await adminAccountPage.clickNextButtonFromChangeAccountOwnerModal();
			break;
		case "non existing user":
			await adminAccountPage.fillChangeAccountOwnerEmailField(newUser.email);
			await adminAccountPage.clickNextButtonFromChangeAccountOwnerModal();
			await adminAccountPage.verifyNonExistingUserTextIsDisplayed(newUser.email, originalAccountName);
			await adminAccountPage.verifyChangeOwnerButtonFromActionModalIsDisabled();
			await adminAccountPage.fillFirstLastNameFromChangeAccountOwnerModal(newUser.firstName, newUser.lastName);
			await adminAccountPage.verifyChangeOwnerButtonFromActionModalIsEnabled();
			await adminAccountPage.clickChangeOwnerButtonFromActionModal();
	}
});

Then("verify the {string} is displayed in the owner column", async function (userType: string) {
	switch (userType.toLowerCase()) {
		case "existing user":
			await adminAccountPage.searchForCreatedAccount(newAccountAPIData.firstName);
			await adminAccountPage.verifyAccountOwnerNameIsDisplayedInTheAccountsTable("Dan", "RAOELINARIVO");
			await adminAccountPage.verifyAccountOwnerEmailIsDisplayedInTheAccountsTable("dan@hazenfield.com");
			break;
		case "non existing user":
			await adminAccountPage.searchForCreatedAccount(newAccountAPIData.firstName);
			await adminAccountPage.verifyAccountOwnerNameIsDisplayedInTheAccountsTable(newUser.firstName, newUser.lastName);
			await adminAccountPage.verifyAccountOwnerEmailIsDisplayedInTheAccountsTable(newUser.email);
			break;
		case "no user":
			await adminAccountPage.searchForCreatedAccount(newAccountAPIData.firstName);
			await adminAccountPage.verifyNoAccountOwnerIsDisplayedInTheAccountsTable();
	}
});

Then("verify {string} modal is displayed", async function (modalType: string) {
	switch (modalType.toLowerCase()) {
		case "blocked user":
			await adminAccountPage.verifyAccountModalIsDisplayed(modalType);
			await adminAccountPage.verifyBlockedAccountTextIsDisplayed(adminUserData.email);
			break;
		case "closed user":
			await adminAccountPage.verifyAccountModalIsDisplayed(modalType);
			await adminAccountPage.verifyClosedAccountTextIsDisplayed(adminUserData.email);
			break;
	}
});

Then("verify the user is not visible", async function () {
	await adminAccountPage.verifyUserNotVisible(newAccountAPIData.firstName, newAccountAPIData.lastName);
});

When("User enter the Account Owner Email", async () => {
	await adminAccountPage.fillEmailField(adminUserData.email);
});

When("click on next button", async () => {
	await adminAccountPage.clickNextButton();
});

Then("verify the default account status filters are displayed", async function () {
	await adminAccountPage.verifyDraftFilterIsDisplayed();
	await adminAccountPage.verifyOpenFilterIsDisplayed();
});

When("user searches the created account on the admin portal", async function () {
	await adminAccountPage.searchForCreatedAccount(originalAccountName);
});

Then("verify the account is visible in the Accounts page", async function () {
	await adminAccountPage.verifyAccountName(originalAccountName);
});

When("user removes the {string} filter from the Accounts page", async function (filter: string) {
	switch (filter.toLowerCase()) {
		case "open":
			await adminAccountPage.removeOpenFilter();
			break;
		case "draft":
			await adminAccountPage.removeDraftFilter();
			break;
		case "pending":
			await adminAccountPage.removePendingActivationFilter();
			break;
		case "suspended":
			await adminAccountPage.removeSuspendedFilter();
			break;
		case "closed":
			await adminAccountPage.removeClosedFilter();
			break;
	}
});

Then("verify the is account not visible anymore", async function () {
	await adminAccountPage.verifyAccountIsNoDisplayedInTable(newAccountAPIData.firstName);
});

Given("user adds the {string} status filter", async function (filterType: string) {
	await adminAccountPage.addFilter(filterType);
});

Then("Verify that filter bar not disappeared when user close the account", async function () {
	await adminAccountPage.verifyDraftFilterIsDisplayed();
	await adminAccountPage.verifyOpenFilterIsDisplayed();
});

export { accountData };
