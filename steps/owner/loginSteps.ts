import { Given, When, Then } from "@cucumber/cucumber";
import LoginPage from "../../pages/owner/loginPage";
import { baseInstance } from "../../helpers/BaseClass";
import { getUserDetails } from "../../helpers/jsonHelper";
import { originalAccountName } from "../admin/adminAccountApiSteps";
import { userData } from "./userApiSteps";
import { addedUserData } from "./settingsApiSteps";
import { adminUserData } from "../admin/adminUsersApiSteps";

const loginPage: LoginPage = new LoginPage(baseInstance);

Given("User navigates to application url", async function () {
	await loginPage.openApplicationUrl();
});

When("User enters username in username field", async function () {
	await loginPage.enterEmail("");
});

When("User enters password in password field", async function () {
	await loginPage.enterPassword("");
});

When("User clicks on login button", async function () {
	await loginPage.clickLoginButton();
});

Then("Fail", async function () {
	throw new Error("This step intentionally fails");
});

Given("the user logs with a {string} user", async function (userType: string) {
	let userName: string;
	let password: string;
	switch (userType.toLowerCase()) {
		case "multiple accounts":
			userName = (await getUserDetails(baseInstance.user)).multiple_accounts_email;
			password = (await getUserDetails(baseInstance.user)).password;
			break;
		case "new":
			userName = userData.email;
			password = "aaaa";
			break;
		case "reset password":
			userName = userData.email;
			password = userData.password;
			break;
		case "ui created user":
			userName = addedUserData.email;
			password = addedUserData.password;
			break;
	}
	await loginPage.loginToMainPortal(userName, password);
});

Given("the user navigates to the multiple accounts section", async function () {
	await loginPage.verifyMultipleAccountsAlertIsDisplayed();
});

Then("verify the Continue Select button is disabled", async function () {
	await loginPage.verifyContinueSelectButtonIsDisabled();
});

Then("verify the user can choose from multiple accounts", async function () {
	await loginPage.verifySelectAccountDropdownReturnsMoreThanOneResult();
});

When("the user clicks the account dropdown", async function () {
	await loginPage.clickOnSelectAccountDropdownList();
});

When("the user selects the created account", async function () {
	await loginPage.searchForAccount(originalAccountName);
	await loginPage.selectAccount(originalAccountName);
});

When("the user clicks on Continue Select button", async function () {
	await baseInstance.wait(3);
	await loginPage.clickContinueSelectButton();
});

When("user logs into the created account", async function () {
	await loginPage.searchForAccount(originalAccountName);
	await loginPage.selectAccount(originalAccountName);
	await loginPage.clickContinueSelectButton();
});

When("the user clicks the {string} button", async function (button: string) {
	switch (button.toLowerCase()) {
		case "forgot password":
			await loginPage.clickForgotPasswordButton();
			break;
	}
});

When("user clicks the logout button", async function () {
	await loginPage.clickLogoutButton();
});

Then("verify the login page is displayed", async function () {
	await loginPage.verifyLoginPageIsDisplayed();
});

When("user tries to login with a {string} user", async function (userType: string) {
	const defaultUsername = (await getUserDetails(baseInstance.user)).email;
	const defaultPassword = (await getUserDetails(baseInstance.user)).password;
	await baseInstance.wait(10);
	await baseInstance.reloadPage();
	switch (userType.toLowerCase()) {
		case "blocked":
		case "closed":
			await baseInstance.openURL(process.env.BASE_URL);
			await loginPage.loginToMainPortal(adminUserData.email, adminUserData.password);
			break;
		case "default":
			await loginPage.loginToMainPortal(defaultUsername, defaultPassword);
	}
});

Then("verify the user is not allowed to log in", async function () {
	await loginPage.verifyLoginDeniedDueToBlockedOrClosedUser(adminUserData.email);
});

Then("verify the {string} account error message is displayed", async function (accountState: string) {
	await loginPage.verifyAccountBlockedOrSuspendedErrorMessage(accountState);
});
