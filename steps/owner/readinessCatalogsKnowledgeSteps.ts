import { Then } from "@cucumber/cucumber";
import ReadinessCatalogsKnowledgePage from "../../pages/owner/readinessKnowledgePage";
import { baseInstance } from "../../helpers/BaseClass";
import { newRole } from "./readinessCatalogsResponsibilitiesApiSteps";

const readinessCatalogsPage: ReadinessCatalogsKnowledgePage = new ReadinessCatalogsKnowledgePage(baseInstance);

Then("Verify the Knowledge tab is not visible", async function () {
	await readinessCatalogsPage.verifyKnowledgeTabNotVisible();
});

Then("click on the 'Responsibility' action menu", async function () {
	await readinessCatalogsPage.searchResponsibility(newRole.name);
	await readinessCatalogsPage.openResponsibilityActionMenu(newRole.name);
});

Then("Verify the {string} option is not visible", async function (option: string) {
	await readinessCatalogsPage.verifyAttachResponsibilityNotVisible(option);
});
