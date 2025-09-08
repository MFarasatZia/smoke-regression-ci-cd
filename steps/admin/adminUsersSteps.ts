import { Given, Then, When } from "@cucumber/cucumber";
import AdminUsersPage from "../../pages/admin/adminUsersPage";
import { baseInstance } from "../../helpers/BaseClass";
import { expectedNumberOfAccounts } from "../owner/userApiSteps";
import { adminUserData } from "./adminUsersApiSteps";
import { expect } from "@playwright/test";
import { generateRandomUserData, UserData } from "../../helpers/util/random";
import AdminUserApi from "../../apis/admin/adminUser";
import { accountData } from "./adminAccountSteps";
import { getLatestResetPasswordLinkFromEmail } from "../../helpers/util/mailtrap";

const adminUsersPage = new AdminUsersPage(baseInstance);
let uiUserData: UserData;

When("user removes the default filters", async function () {
	await adminUsersPage.removeDefaultFilters();
});

When("user opens the {string} modal from Users section", async function (modal: string) {
	await adminUsersPage.waitForLoadIconToDisappear();
	switch (modal.toLowerCase()) {
		case "delete":
			await adminUsersPage.searchForCreatedUser(adminUserData.firstName);
			await adminUsersPage.clickThreeDottedButton();
			await adminUsersPage.clickDeleteActionButton();
			await adminUsersPage.verifyDeleteModalIsDisplayed(adminUserData.firstName, adminUserData.lastName);
			break;
		case "rename":
			await adminUsersPage.searchForCreatedUser(adminUserData.firstName);
			await adminUsersPage.clickThreeDottedButton();
			await adminUsersPage.clickRenameActionButton();
			await adminUsersPage.verifyRenameModalIsDisplayed();
			await adminUsersPage.verifyRenameButtonFromModalIsDisabled();
			break;
		case "un-block":
			await adminUsersPage.searchForCreatedUser(adminUserData.firstName);
			await adminUsersPage.clickThreeDottedButton();
			await adminUsersPage.clickUnBlockActionButton();
			await adminUsersPage.verifyUnBlockModalIsDisplayed(adminUserData.firstName, adminUserData.lastName);
			break;
		case "block":
			await adminUsersPage.searchForCreatedUser(adminUserData.firstName);
			await adminUsersPage.clickThreeDottedButton();
			await adminUsersPage.clickBlockActionButton();
			await adminUsersPage.verifyBlockModalIsDisplayed(adminUserData.firstName, adminUserData.lastName);
			break;
		case "un-close":
			await adminUsersPage.searchForCreatedUser(adminUserData.firstName);
			await adminUsersPage.clickThreeDottedButton();
			await adminUsersPage.clickUnCloseActionButton();
			await adminUsersPage.verifyUncloseModalIsDisplayed(adminUserData.firstName, adminUserData.lastName);
			break;
		case "close":
			await adminUsersPage.searchForCreatedUser(adminUserData.firstName);
			await adminUsersPage.clickThreeDottedButton();
			await adminUsersPage.clickCloseActionButton();
			await adminUsersPage.verifycloseModalIsDisplayed(adminUserData.firstName, adminUserData.lastName);
			break;
		case "cancel":
			await adminUsersPage.searchForCreatedUser(adminUserData.firstName);
			await adminUsersPage.clickThreeDottedButton();
			await adminUsersPage.clickCancelActionButton();
			await adminUsersPage.verifyCancelModalIsDisplayed(adminUserData.firstName, adminUserData.lastName);
			break;
	}
});

When(/^user clicks the delete button$/, async function () {
	await adminUsersPage.clickDeleteButtonFromModal();
});

Then(/^verify the user is no longer visible$/, async function () {
	await adminUsersPage.verifyUserIsNoLongerDisplayed(adminUserData.firstName);
});

When(/^user opens the actions menu$/, async function () {
	await adminUsersPage.searchForCreatedUser(adminUserData.firstName);
	await adminUsersPage.clickThreeDottedButton();
});

Then("verify the {string} action is not displayed", async function (actionButton: string) {
	switch (actionButton.toLowerCase()) {
		case "delete":
			await adminUsersPage.verifyDeleteButtonIsNotDisplayed();
	}
});

Then("verify the number of accounts is correctly displayed in the accounts counter", async function () {
	await adminUsersPage.searchUser("Eric Kish");
	const actualCounter = await adminUsersPage.getAccessToAccountsCounter();
	expect(actualCounter).toEqual(`+${expectedNumberOfAccounts.toString()}`);
});

When("user creates a super user", async function () {
	uiUserData = generateRandomUserData();
	uiUserData.email = "admin_" + uiUserData.email;
	await adminUsersPage.clickAddSystemAdminButton();
	await adminUsersPage.verifyAddSystemAdminModalIsDisplayed();
	await adminUsersPage.verifyNextButtonIsDisabled();
	await adminUsersPage.fillUserEmailField(uiUserData.email);
	await adminUsersPage.verifyNextButtonIsEnabled();
	await adminUsersPage.clickNextButton();
	await adminUsersPage.verifyEmailIsDisplayedInSecondCreationModal(uiUserData.email);
	await adminUsersPage.verifyAddButtonIsDisabled();
	await adminUsersPage.fillFirstNameField(uiUserData.firstName);
	await adminUsersPage.fillLastNameField(uiUserData.lastName);
	await adminUsersPage.verifyAddButtonIsEnabled();
	await adminUsersPage.clickAddButton();
	await adminUsersPage.waitForModalToDisappear();
});

When("user tries to create a super user with a existing user email", async function () {
	await adminUsersPage.clickAddSystemAdminButton();
	await adminUsersPage.verifyAddSystemAdminModalIsDisplayed();
	await adminUsersPage.verifyNextButtonIsDisabled();
	await adminUsersPage.fillUserEmailField("eric@nanoramic.com");
	await adminUsersPage.verifyNextButtonIsEnabled();
	await adminUsersPage.clickNextButton();
});

Then("verify that the user is displayed in the users tree", async function () {
	await adminUsersPage.searchForCreatedUser(uiUserData.firstName);
});
Then("verify that badge is in status {string}", async function (badgeStatus: string) {
	await baseInstance.wait(5);
	await adminUsersPage.verifyUserBadge(badgeStatus);
});

Then("verify that a error message for existing user is displayed", async function () {
	await adminUsersPage.verifyExistingUserErrorMessage("Eric", "Kish", "eric@nanoramic.com");
});

When("user renames another user", async function () {
	uiUserData = generateRandomUserData();
	uiUserData.email = adminUserData.email;
	await adminUsersPage.fillFirstNameFieldFromRenameModal(uiUserData.firstName);
	await adminUsersPage.fillLastNameFieldFromRenameModal(uiUserData.lastName);
	await adminUsersPage.verifyRenameButtonFromModalIsEnabled();
	await adminUsersPage.clickRenameButtonFromRenameModal();
});

Then("verify the new user name is displayed users table", async function () {
	await adminUsersPage.searchForCreatedUser(uiUserData.firstName);
});

When("user searches the created user on the account section", async function () {
	await adminUsersPage.searchForCreatedUser(accountData.firstName);
});

When("user searches the created user on the admin portal", async function () {
	await adminUsersPage.searchForCreatedUser(adminUserData.firstName);
});

When("user clicks the action button", async function () {
	await adminUsersPage.clickThreeDottedButton();
});

Then("verify the {string} action is not displayed in the action dropdown", async function (action: string) {
	await adminUsersPage.verifyActionIsNotDisplayed(action);
});

When("user clicks Un-Block button", async () => {
	await adminUsersPage.clickUnblockButtonFromUnblockModal();
	await adminUsersPage.waitForLoadIconToDisappear();
});

When("user clicks on Block button", async () => {
	await adminUsersPage.clickBlockButtonFromUnblockModal();
	await adminUsersPage.waitForLoadIconToDisappear();
});

When("user clicks on Un-Close button", async () => {
	await adminUsersPage.clickUncloseButtonFromUnblockModal();
	await adminUsersPage.waitForLoadIconToDisappear();
});

When("user clicks on Close button", async () => {
	await adminUsersPage.clickcloseButtonFromUnblockModal();
	await adminUsersPage.waitForLoadIconToDisappear();
});

When("user clicks on Cancel button", async () => {
	await adminUsersPage.clickCancelInviteForUser();
});

When("user clicks the action button for a {string}", async function (userType: string) {
	switch (userType.toLowerCase()) {
		case "super user":
			await adminUsersPage.clickThreeDottedButtonByIndex(0);
			break;
		case "created user":
			await adminUsersPage.searchForCreatedUser(adminUserData.firstName);
			await adminUsersPage.clickThreeDottedButton();
			break;
	}
});

Then("verify {string} action is displayed", async function (action: string) {
	switch (action.toLowerCase()) {
		case "rename":
			await adminUsersPage.verifyRenameActionIsDisplayed();
			break;
		case "resend invite":
			await adminUsersPage.verifyResendInviteActionIsDisplayed();
			break;
		case "cancel invite":
			await adminUsersPage.verifyCancelInviteActionIsDisplayed();
			break;
		case "delete":
			await adminUsersPage.verifyDeleteActionIsDisplayed();
			break;
		case "close":
			await adminUsersPage.verifyCloseActionIsDisplayed();
			break;
		case "block":
			await adminUsersPage.verifyBlockActionIsDisplayed();
			break;
		case "un-close":
			await adminUsersPage.verifyUnCloseActionIsDisplayed();
			break;
		case "un-block":
			await adminUsersPage.verifyUnBlockActionIsDisplayed();
			break;
	}
});

Then("verify Resend Invite action is not visible", async () => {
	await adminUsersPage.verifyResendInviteActionIsNotDisplayed();
});

Then("verify {int} actions are displayed", async function (expectedNumberOfActionsDisplayed: number) {
	await adminUsersPage.verifyActionsCount(expectedNumberOfActionsDisplayed);
});

Then("verify the user should not be visible", async function () {
	await adminUsersPage.verifyUserNotVisible(adminUserData.firstName);
});

Then("verify the active users counter display the correct value", async function () {
	const adminUsersApiCalls: AdminUserApi = new AdminUserApi(baseInstance);
	const expectedOperationalUsersCount = await adminUsersApiCalls.getAllOperationalUsers();
	const actualUsersCount = await adminUsersPage.getUserCounter();
	expect(actualUsersCount).toEqual(expectedOperationalUsersCount);
});

Then("verify {string} filter is displayed", async function (filterType: string) {
	switch (filterType.toLowerCase()) {
		case "invited":
			await adminUsersPage.verifyInvitedFilterIsDisplayed();
			break;
		case "operational":
			await adminUsersPage.verifyOperationalFilterIsDisplayed();
			break;
	}
});

Then("verify all user status filters are displayed", async function () {
	await adminUsersPage.verifyInvitedFilterIsDisplayed();
	await adminUsersPage.verifyOperationalFilterIsDisplayed();
	await adminUsersPage.verifyClosedFilterIsDisplayed();
	await adminUsersPage.verifyBlockedFilterIsDisplayed();
});

Then("verify the user is visible in the User page", async function () {
	await adminUsersPage.verifyUserIsVisible(adminUserData.firstName);
});

When("user removes the {string} filter from the Users page", async function (filter: string) {
	switch (filter.toLowerCase()) {
		case "invited":
			await adminUsersPage.removeInvitedFilter();
			break;
		case "operational":
			await adminUsersPage.removeOperationalFilter();
			break;
		case "closed":
			await adminUsersPage.removeClosedFilter();
			break;
		case "blocked":
			await adminUsersPage.removeBlockedFilter();
			break;
	}
});

Given("user adds the {string} filter", async function (filterType: string) {
	switch (filterType.toLowerCase()) {
		case "invited":
			await adminUsersPage.addInvitedFilter();
			break;
		case "operational":
			await adminUsersPage.addOperationalFilter();
			break;
		case "closed":
			await adminUsersPage.addClosedFilter();
			break;
		case "blocked":
			await adminUsersPage.addBlockedFilter();
			break;
	}
});

When(/^user refreshes the page$/, async function () {
	await baseInstance.reloadPage();
});

Then("user deletes the user created by activating account", async function () {
	await adminUsersPage.searchForCreatedUser(accountData.firstName);
	await adminUsersPage.clickThreeDottedButton();
	await adminUsersPage.clickDeleteActionButton();
	await adminUsersPage.verifyDeleteModalIsDisplayed(accountData.firstName, accountData.lastName);
	await adminUsersPage.clickDeleteButtonFromModal();
	await adminUsersPage.waitForLoadIconToDisappear();
});

Then("user cancels the invite to the user created by activating account", async function () {
	await adminUsersPage.searchForCreatedUser(accountData.firstName);
	await adminUsersPage.clickThreeDottedButton();
	await adminUsersPage.clickCancelActionButton();
	await adminUsersPage.verifyCancelInviteActionIsDisplayed();
	await adminUsersPage.clickCancelInviteForUser();
	await adminUsersPage.waitForLoadIconToDisappear();
});

Then("verify invitation email is received in the mail box", async function () {
	const invitation = await getLatestResetPasswordLinkFromEmail(adminUserData.email);
	expect(invitation).not.toBeNull();
});

When("the user clicks the three dotted button", async function () {
	await adminUsersPage.clickThreeDottedButton();
});

Then("block option is hidden when the user is the owner", async function () {
	await adminUsersPage.hideBlockButton();
});

Then("the user clicks on blocks button", async function () {
	await adminUsersPage.blockedbutton();
});

Then("block option is shown when the user is the co-owner", async function () {
	await adminUsersPage.blockdisplaybutton();
});

Then("the user clicks on clear All button", async function () {
	await adminUsersPage.clearAll();
});
export { uiUserData };
