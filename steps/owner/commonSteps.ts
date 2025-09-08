import { When, Then, Given } from "@cucumber/cucumber";
import { baseInstance } from "../../helpers/BaseClass";
import * as assert from "assert";
import { getEmailMessageSubject } from "../../helpers/util/mailtrap";
import { addedUserData } from "./settingsSteps";
import LeftNavigationPage from "../../pages/owner/leftNavigationPage";
import ReadinessCatalogsResponsibilitiesPage from "../../pages/owner/readinessResponsibilityPage";

const leftNavigationPage: LeftNavigationPage = new LeftNavigationPage(baseInstance);
const readinessCatalogsPage: ReadinessCatalogsResponsibilitiesPage = new ReadinessCatalogsResponsibilitiesPage(
	baseInstance,
);

When("Take screenshot", async function () {
	await baseInstance.takeScreenshot();
});

When("Wait for {int} seconds", async function (seconds: number) {
	await baseInstance.wait(seconds);
});

Given("Set user as {string}", async function (user: string) {
	baseInstance.user = user;
});

When("User clicks back button", async function () {
	await baseInstance.goBackButton();
});

Then("Verify Set your Password email", async function () {
	const actualSubject = await getEmailMessageSubject(addedUserData.email);
	const expectedSubject = "Set your password";
	assert(
		actualSubject.toLowerCase() == expectedSubject.toLowerCase(),
		"Expected: " + expectedSubject + " Actual: " + actualSubject,
	);
});

Given("user navigate to {string} page", async (page: string) => {
	await leftNavigationPage.navigateTo(page);
	if (page === "Responsibilities") {
		await readinessCatalogsPage.clickResponsibilitiesMenu();
	}
});
