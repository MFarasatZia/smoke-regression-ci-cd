import { When, DataTable, Then, Given } from "@cucumber/cucumber";
import { APIResponse, expect } from "@playwright/test";
import SettingsPage from "../../pages/owner/settingsPage";
import { baseInstance } from "../../helpers/BaseClass";
import { generateRandomUserData, UserData } from "../../helpers/util/random";
import { findMessageByEmail, getLatestResetLinkFromEmail } from "../../helpers/util/mailtrap";
import * as assert from "assert";
import { createdUserId, userData } from "./userApiSteps";
import LoginPage from "../../pages/owner/loginPage";
import { getUserDetails } from "../../helpers/jsonHelper";
import { userDataFromChangeOwnership } from "../admin/adminAccountApiSteps";
import UserApi from "../../apis/owner/user";
import { formatDate } from "../../helpers/util/basic";

const settingsPage: SettingsPage = new SettingsPage(baseInstance);
const loginPage: LoginPage = new LoginPage(baseInstance);
let resetLink: string;
let newPassword;
let response: APIResponse;
const addedUserData: UserData = generateRandomUserData();

Given("that in the search or filter bar you have button \"Add user\"", async function () {
	await settingsPage.navigateToTab("Settings");
});

Given("that you are in Account > Settings > Users list", async function () {
	await settingsPage.navigateToTab("Settings");
	await settingsPage.verifyUserList();
});

Given("user verify the add user button", async () => {
	await settingsPage.verifyTheAddUser();
});

Given("user clicks on Add user button", async () => {
	await settingsPage.clickOnAddUser();
});

Given("user selects a specific user", async () => {
	await baseInstance.reloadPage();
	await settingsPage.searchUser();
});

Then("Verify {string} option is not visible on menu", async (option: string) => {
	await settingsPage.verifySettingsMenuNotVisible(option);
});

When("user clicks on continue button", async () => {
	await settingsPage.clickOnContinueBtn();
	await baseInstance.wait(5);
});

When("user clicks on sign in button", async () => {
	await settingsPage.clickOnSignInBtn;
});

When("user enter signin details", async () => {
	const userName = (await getUserDetails(baseInstance.user)).email;
	const password = (await getUserDetails(baseInstance.user)).password;
	await baseInstance.openURL(process.env.BASE_URL);
	await loginPage.loginToMainPortal(userName, password);
});

Then("user searches a specific user", async () => {
	await settingsPage.searchUser();
});

When("User opens {string} tab", async function (tab: string) {
	await settingsPage.navigateToTab(tab);
	await baseInstance.wait(5);
});

When("user clicks on currencies card", async () => {
	await settingsPage.clickOnCurrenciesCard();
	await baseInstance.wait(5);
});

Then("verify label of the page", async () => {
	await settingsPage.verifyCurrencyPageTitleVisible();
});

Then("user clicks on back button", async () => {
	await settingsPage.clickOnBackBtn();
});

Then("verify user lands on configurations tab", async () => {
	await settingsPage.currencyCardVisible();
});

Then("user clicks on the cross icon of the currency picker", async () => {
	await settingsPage.clickOnClearBtn();
});

Then("verify no currency is selected", async () => {
	await settingsPage.currencyIsNotSelected();
});

Then("user clicks on the field", async () => {
	await settingsPage.clickOnSearchField();
});

Then("verify dropdown list appears", async () => {
	await settingsPage.currencyListDisplayed();
});

Then("user types the currency name {string}", async (name: string) => {
	await settingsPage.searchForCurrency(name);
});

Then("user selects the currency", async () => {
	await settingsPage.selectFirstCurrency();
});

When("User enters Suspend User email in email field", async () => {
	await settingsPage.enterEmail(userData.email);
});

When("User enters email in email field", async () => {
	await settingsPage.enterEmail(addedUserData.email);
});

When("User enters Existing Email", async () => {
	await settingsPage.fillEmailField("dan@hazenfield.com");
	await baseInstance.wait(10);
});

When("User Enter invalid email in the email field", async () => {
	const invalidEmail = "invalidemail@";
	await settingsPage.enterEmail(invalidEmail);
});

Then("Verify the error {string}", async (error: string) => {
	await settingsPage.verifyTheError(error);
});

Then("error {string} is reset", async (error: string) => {
	await settingsPage.verifyTheErrorReset(error);
});

Then("User Close the Add User Modal by clicking the x icon", async () => {
	await settingsPage.clickOnXIcon();
});

When("User enters {string} in email field", async function (email: string) {
	await settingsPage.enterEmail(email);
});

When("User clicks on next button", async () => {
	await settingsPage.clickOnNextBtn();
});

When("User Click on Cancel Invite", async () => {
	await settingsPage.clickCancelInvite();
});

When("Verify that no user found", async () => {
	await settingsPage.verifyErrorMessage();
});

Then("verify that the modal text ends with a {string}", async (mark: string) => {
	const firstName = addedUserData.firstName;
	const lastName = addedUserData.lastName;
	const expectedText = `What kind of access do you need for ${firstName} ${lastName} ${mark}`;
	const modalText = await settingsPage.getModalText(firstName, lastName, mark);
	expect(modalText).toBe(expectedText);
});

When("User clicks on confirm button", async () => {
	await settingsPage.clickOnConfirm();
});

When("User enters firstname in firstname field", async () => {
	await settingsPage.enterFirstName(addedUserData.firstName);
});

When("User enters {string} in firstname field", async function (fName: string) {
	await settingsPage.enterFirstName(fName);
});

When("User enters lastname in lastname field", async () => {
	await settingsPage.enterLastName(addedUserData.lastName);
});

When("User enters {string} in lastname field", async function (lName: string) {
	await settingsPage.enterLastName(lName);
});

When("User selects {string} access", async function (access: string) {
	await settingsPage.selectAccessLevel(access);
});

When("User selects the apps for access", async function (dataTable: DataTable) {
	const table = dataTable.rows().slice(0);
	await settingsPage.selectApp(table);
});

When("you go to Account > Settings", async function () {
	await settingsPage.navigateToTab("Settings");
});

When("User looking at the user list", async function () {
	assert(await settingsPage.verifyUserList);
});

When("User Click on Add button", async function () {
	await settingsPage.verifyAddButton();
	await settingsPage.clickOnAddButton();
});

When("Verify That User Are Able to Add User", async function () {
	await settingsPage.clickOnAddButton();
});

When("user Look at the list of user", async function () {
	await settingsPage.verifyUserList();
});

Then("Verify email already exists message", async function () {
	assert(
		await settingsPage.verifyUserAlreadyExistsMesage,
		"User already Existing validation message appears: " + (await settingsPage.verifyUserAlreadyExistsMesage()),
	);
});

Then("User land on Settings Page", async function () {
	assert(await settingsPage.verifySettingsPadeHeading);
});

Then("you see a horizontal menu", async function () {
	assert(await settingsPage.verifyHorizontalMenu);
});

Then("the first default item in the horizontal menu is Users", async function () {
	assert(await settingsPage.verifyFirstElement);
});

Then("User has a badge to count active users", async function () {
	assert(await settingsPage.verifyUserBadge);
});

Then("you always see a user with Owner permission", async function () {
	assert(await settingsPage.verifyOwnerBadge);
});

Then("the owner is NEVER suspended", async function () {
	assert(await settingsPage.canNotSuspendOwner);
});

Then("you open modal wizard \"Add user\"", async function () {
	assert(settingsPage.verifyAddUserPopup);
});

Then("User verify the Add user model", async function () {
	await settingsPage.verifyAddUserPopup();
});

Then("the list is ordered by user full name A..Z", async function () {
	await settingsPage.verifyUserFullNameOrder();
});

Then("User can search the user column for full name", async function () {
	await settingsPage.searchUserFullName();
});

Then("User show list in pages of {int} users", async function (numberOfUsers: number) {
	await settingsPage.verifyNumberOfUserInList(numberOfUsers);
});

Then("you see first step to collect user email", async function () {
	await settingsPage.enterEmail(addedUserData.email);
});

Then("User show page navigator", async function () {
	await settingsPage.previousPageNavigator();
	await settingsPage.nextPageNavigator();
});

Then("status badge is {string}", async function (hasAccess: string) {
	await settingsPage.verifyAccessBadge(hasAccess);
});

Then("Verify that {string} is Display", async function (Suspend: string) {
	await settingsPage.verifySuspendUserOptnVisible(Suspend);
});

Then("action {string} is available", async function (Suspend: string) {
	await settingsPage.verifySuspendUserOptionVisible(Suspend);
});

When("user click on three dotes user menu", async () => {
	await settingsPage.clickOnUserThreeDot();
});

Then("verify newly added user appears in the list", async () => {
	const createdUser = `${addedUserData.firstName} ${addedUserData.lastName}`;
	await settingsPage.verifyNewUserCreated(createdUser);
});

Then("verify the user is co-owner", async () => {
	await settingsPage.badgeIsDisplayed();
});

Then("Verify User Have Apps Access", async () => {
	await settingsPage.badgeIsNotDisplayed();
});

When("user clicks on Three dot Menu button", async () => {
	await settingsPage.clickOnThreeDotMenu();
});

When("user select {string} option from the menu", async (option: string) => {
	await settingsPage.selectMenuOption(option);
});

Then("verify Suspend Access popup appeared", async () => {
	await settingsPage.verifySuspendModal();
});

Then("User Click on Suspend Button", async () => {
	await settingsPage.clickOnSuspendUser();
});

When("user select rename option from the menu", async () => {
	await settingsPage.selectRenameOption();
});

When("Rename Button is Not Active", async () => {
	await settingsPage.isRenameActive();
});

Then("User Add Update Deatil regarding User", async () => {
	addedUserData.email = userData.email;
	await settingsPage.fillFirstNameFieldFromRenameModal(addedUserData.firstName);
	await settingsPage.fillLastNameFieldFromRenameModal(addedUserData.lastName);
});

Then("Veirfy that Rename Button Active", async () => {
	await settingsPage.verifyRenameBtnActive();
});

Then("user should not see Resend option", async () => {
	await settingsPage.verifyResendOptionIsNotVisible();
});

Then("user should not see change password option", async () => {
	await settingsPage.verifyChangePasswordOptionIsNotVisible();
});

When("user clicks on Resend button", async () => {
	await settingsPage.clickOnResendButton();
});

When("Verify the Rename Popup on User Settings Page", async () => {
	await settingsPage.clickOnRenameButton();
});

When("User click on Suspend Button", async () => {
	await settingsPage.suspendBtn();
});

Then("verify the email is received in the mail box", async () => {
	const recipientEmail = userData.email;
	const message = await findMessageByEmail(recipientEmail);

	expect(message).not.toBeNull();
});

Given("verify the email is received in the mailbox and extract the reset link", async () => {
	const recipientEmailForPass = userData.email;
	resetLink = await getLatestResetLinkFromEmail(recipientEmailForPass);
	console.log("This is the link =============> " + resetLink);
	console.log(resetLink);
	expect(resetLink).not.toBeNull();
});

Given("user clicks on the link", async () => {
	await settingsPage.clickOnTheLink(resetLink);
});

When("user set the password", async () => {
	newPassword = generateRandomUserData();
	await settingsPage.setPassword(newPassword.password);
	console.log(newPassword.password);
});

When("user set the confirm password", async () => {
	const confirmPass = newPassword.password;
	await settingsPage.setConfirmPassword(confirmPass);
});

When("user click on reset password button", async () => {
	await settingsPage.clickOnResetBtn();
	await baseInstance.wait(5);
});

Then("verify user is suspended", async () => {
	await settingsPage.verifyToastDisplayed();
});

Then("verify user is invited", async () => {
	await settingsPage.verifyToastDisplayed();
});

Then("verify user status changes to {string}", async (status: string) => {
	await settingsPage.verifyUserStatus(status);
});

When("User click on {string} tab", async function (tab: string) {
	await settingsPage.openSettingsTab(tab);
});

Then("Verify that all integration options are displayed", async function () {
	await settingsPage.verifyIntegrationOptionsDisplayed();
});

Given("user add a news user with {string} access to all apps", async function (accessType: string) {
	await settingsPage.addNewUser(accessType, "all");
});

When("user clicks and select the on filter", async () => {
	await settingsPage.clickfilterBtn();
	await settingsPage.verifySettingFilterModal();
});

When("user select {string} Status filter", async (status: string) => {
	await settingsPage.applyStatusfilter(status);
});

Then("user save filter on setting page", async () => {
	await settingsPage.clickOnSaveFilterButton();
});

Then("user see a list of user filtered by {string} status", async (status: string) => {
	await settingsPage.verifyTheStatusFilter(status);
});

Then("User Searched for Non-Existent User", async () => {
	await settingsPage.searchNonExistentUser();
});

Then("Verify that No User Found", async () => {
	await settingsPage.verifyNOUserFoundText();
});

When("filter modal is displayed", async () => {
	await settingsPage.verifySettingFilterModal();
	await baseInstance.wait(3);
});

Then("verify {string} status filter is visible", async (option: string) => {
	await settingsPage.filterOptionsVisible(option);
});

Then("the system confirms the email is available to be used by the selected user", async () => {
	const confirmationMessage = await settingsPage.getConfirmationMessage();
	expect(confirmationMessage).toContain(addedUserData.email);
	expect(confirmationMessage).toContain(userData.firstName);
});

Then(
	"the system confirms the email is already associated with an external user and prompts for support assistance",
	async () => {
		const expectedMessage = `The email ${userData.email} is already associated with an external user. If you want this external user to be associated with the user ${userData.firstName} ${userData.lastName}, please contact exIQtive support.`;
		const actualMessage = await settingsPage.getPopupMessage();
		expect(actualMessage).toContain(userData.email);
		expect(actualMessage).toBe(expectedMessage);
	},
);

Then("Verify the Popup message", async () => {
	const expectedMessage =
		"The email dan@hazenfield.com is already used by user Dan RAOELINARIVO in this account. You cannot use it again.";
	const actualMessage = await settingsPage.getConfirmationPopUpMessage();
	expect(actualMessage).toBe(expectedMessage);
});

Given("user searches for the account owner", async function () {
	await settingsPage.searchCustomUser("Eric Kish");
});

When("user switches the owner", async function () {
	await settingsPage.selectAnotherOwner();
});

Then("verify the status of the new user is owner", async function () {
	await baseInstance.reloadPage();
	await settingsPage.searchCustomUser(userDataFromChangeOwnership.firstName);
	assert(settingsPage.verifyOwnerBadge());
});

Then("verify the status of the old owner is co-owner", async function () {
	await baseInstance.reloadPage();
	await settingsPage.searchCustomUser("Eric Kish");
	await settingsPage.verifyCoOwnerBadgeIsDisplayed();
});

Then("verify the activity column displays the {string}", async function (dateType: string) {
	const userAPiCalls: UserApi = new UserApi(baseInstance);
	response = await userAPiCalls.getUser(createdUserId);
	const responseBody = await response.json();
	const rawDate = responseBody.date_of_invite;
	const transformedDate = formatDate(rawDate);

	switch (dateType.toLowerCase()) {
		case "invited on":
			await settingsPage.verifyDateInActivityColumn("Invited on", transformedDate);
			break;
		case "last seen on":
			await settingsPage.verifyDateInActivityColumn("Last seen on", transformedDate);
			break;
	}
});

Then("Verify the first invited text", async function () {
	await settingsPage.verifyFirstInvitedText();
});

Then("user add less than 3 character", async function () {
	await settingsPage.addLessThanThreeCharacter();
});

Then("the user clicks on the Directories card", async function () {
	await settingsPage.clickOnDirectoriesCard();
});

Then("user verify the text {string}", async (text: string) => {
	await settingsPage.verifyToggleText(text);
});

Then("verify that the user can click on the breadcrumb to navigate back to the Configurations page", async () => {
	await settingsPage.clickOnBreadCrumb();
});

When("User Click on Add Currency button", async () => {
	await settingsPage.addCurrencyButton();
});

Then("verify the Add Currency Modal appears", async () => {
	await settingsPage.addCurrencyModel();
});

Then("verify that Currency is already added in Operating Currency", async () => {
	await settingsPage.addCurrencyModel();
});

When("user clicks on Countries card", async () => {
	await settingsPage.clickOnCountriesCard();
	await baseInstance.wait(5);
});

When("the user clicks on the Add Country button", async () => {
	await settingsPage.clickOnAddCountryButton();
});

Then("verify the Add Country Modal appears", async () => {
	await settingsPage.addCurrencyModel();
});

When("the user clicks on the Add Country modal button", async () => {
	await settingsPage.clickOnAddCountryModelButton();
});

Then("verify that Country is added in the Operating Country", async () => {
	await settingsPage.countryIsAdded();
});

When("the user clicks on the Chatter icon", async () => {
	await settingsPage.clickOnChatterIcon();
});

Then("verify the chatter model is visible", async () => {
	await settingsPage.ChatterModel();
});

When("user clicks on cross icon", async () => {
	await settingsPage.clickOnCrossIcon();
});

Then("verify that the chatter model is closed", async () => {
	await settingsPage.verifyChatterModelIsClosed();
});

When("user clicks on the action menu button", async () => {
	await settingsPage.clickOnActionMenuButton();
});

When("user selects the retire option", async () => {
	await settingsPage.selectRetireOption();
});

Then("verify the retire popup is displayed", async () => {
	await expect(await settingsPage.verifyRetirePopupDisplayed()).toBeTruthy();
});

When("user clicks on the retire button", async () => {
	await settingsPage.clickOnRetireButton();
});

When("user removes the filters", async () => {
	await settingsPage.removeActiveAndDraftFilters();
});

Then("verify the country is retired", async () => {
	await expect(await settingsPage.verifyCountryIsRetired()).toBeTruthy();
});

When("user selects the re-activate option", async () => {
	await settingsPage.selectReActivateOption();
});

Then("verify the re-activate popup is displayed", async () => {
	await expect(await settingsPage.verifyReActivatePopupDisplayed()).toBeTruthy();
});

When("user clicks on the re-activate button", async () => {
	await settingsPage.clickOnReActivateButton();
});

Then("verify the country is re-activated", async () => {
	await expect(await settingsPage.verifyCountryIsReActivated()).toBeTruthy();
});

When("user search the Country", async function () {
	await settingsPage.searchCountry(this.countryName);
});

export { addedUserData };
