import { Then, When } from "@cucumber/cucumber";
import MasterCoachResponsibilitiesPage from "../../pages/owner/masterCoachResponsibilitiesPage";
import { baseInstance } from "../../helpers/BaseClass";

const masterCoachResponsibilitiesPage: MasterCoachResponsibilitiesPage = new MasterCoachResponsibilitiesPage(
	baseInstance,
);
When("user open the {string} tab", async function (tab: string) {
	await masterCoachResponsibilitiesPage.openMasterCoachTab(tab);
});

Then("verify that Static Mastered responsibilities page displayed", async function () {
	await masterCoachResponsibilitiesPage.verifyMasteredResponsibilitiesDisplayed();
});
