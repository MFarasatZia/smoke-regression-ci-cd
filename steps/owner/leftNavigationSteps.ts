import { Given, Then, When } from "@cucumber/cucumber";
import LeftNavigationPage from "../../pages/owner/leftNavigationPage";
import { baseInstance } from "../../helpers/BaseClass";

const leftNavigationPage: LeftNavigationPage = new LeftNavigationPage(baseInstance);

Given("User is on {string} Page", async function (page: string) {
	await leftNavigationPage.navigateTo(page);
});

Then("User clicks on {string} page", async function (page: string) {
	await leftNavigationPage.navigateTo(page);
});

Given("the user is on the {string} page", async function (page: string) {
	await leftNavigationPage.navigateTo(page);
});

Then("verify user is on {string} page", async function (page: string) {
	await leftNavigationPage.verifyLeftNavigationPageIsDisplayed(page);
});

Then(/^verify the user credentials are displayed near the logout button$/, async function () {
	await leftNavigationPage.verifyUserName("Dan RAOELINARIVO");
	await leftNavigationPage.verifyUserEmail("dan@hazenfield.com");
});

Then("verify user lands on {string} page", async function (page: string) {
	await leftNavigationPage.verifyLeftNavigationPageIsDisplayed(page);
});
Then("verify the global search field is visible", async function () {
	await leftNavigationPage.verifyGlobalSearchField();
});

Then("verify the notification bell icon is displayed", async function () {
	await leftNavigationPage.verifyNotificationBellIcon();
});

When("User click on the notification bell icon", async function () {
	await leftNavigationPage.openNotification();
});

Then("verify the notifications visible", async function () {
	await leftNavigationPage.verifyNotificationItems();
});

When("user logs into the portal", async function () {});

When("user logs out", async function () {
	await leftNavigationPage.clickLogoutButton();
});

When("User verified that Login Form Label and Placeholder is not visible", async () => {
	await leftNavigationPage.isVisiblePlaceHolder();
});

Then("then verify the {string} is displayed", async function (section: string) {
	switch (section.toLowerCase()) {
		case "account sidebar navigation":
			await leftNavigationPage.verifySideBarPanelIsDisplayed();
			break;
		case "readiness section":
			await leftNavigationPage.verifyReadinessSectionIsDisplayed();
			break;
		case "settings section":
			await leftNavigationPage.verifySettingsSectionIsDisplayed();
			break;
		case "organization section":
			await leftNavigationPage.verifyOrganizationSectionIsDisplayed();
			break;
		case "knowledge":
		case "performance":
		case "compensation":
	}
});

Then("User navigates to {string} page", async function (page: string) {
	await leftNavigationPage.navigateTo(page);
});

Then("verify {string} section is not displayed", async function (section: string) {
	switch (section.toLowerCase()) {
		case "settings":
		case "knowledge":
		case "performance":
		case "compensation":
	}
});

Then("verify user is redirected to the login page", async function () {
	await leftNavigationPage.verifyLogoutPageIsDisplayed();
});

Then("the user clicks on the Sign In button and verify the Loader", async function () {
	await leftNavigationPage.clickSignInBtn();
});

Then("verify that The Remember for 30 days checkbox not to be visible", async function () {
	await leftNavigationPage.verifyRememberMeIsNotDisplayed();
});

Then("user clicks on the brand logo", async function () {
	await leftNavigationPage.clickBrandLogo();
});

Then("Verify the Alignment of Remember Me for 30 Days Checkbox", async function () {
	await leftNavigationPage.verifyAlignmentOfRememberMeCheckBox();
});

Then("Verify that the Dynamic Account Name is displayed", async function () {
	await leftNavigationPage.verifyDynamicAccountName();
});
