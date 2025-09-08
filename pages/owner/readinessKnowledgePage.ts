import { BaseClass } from "../../helpers/BaseClass";
import { elements } from "../../xpath/owner/readinessCatalogsKnowledge";

export default class ProficiencyRolesPage {
	baseInstance: BaseClass;
	reports = [];
	reportData = [];

	constructor(baseInstance: BaseClass) {
		this.baseInstance = baseInstance;
	}

	async verifyKnowledgeTabNotVisible() {
		!(await this.baseInstance.isDisplayed(elements.header.knowledgeHeader));
	}

	async searchResponsibility(name) {
		await this.baseInstance.clickElement(elements.searchField, "Search Responsibility");
		await this.baseInstance.enterText(elements.searchField, name, "Search for Responsibility");
	}

	async openResponsibilityActionMenu(name) {
		await this.baseInstance.clickElement(elements.actionMenu.responsibilityActionMenu(name), "Click On Action Menu");
	}

	async verifyAttachResponsibilityNotVisible(option) {
		!(await this.baseInstance.isDisplayed(elements.actionMenu.options(option)));
	}
}
