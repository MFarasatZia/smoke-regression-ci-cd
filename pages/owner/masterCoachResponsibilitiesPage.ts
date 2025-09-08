import { BaseClass } from "../../helpers/BaseClass";
import { elements } from "../../xpath/owner/masterCoachResponsibilitiesPageElements";

export default class MasterCoachResponsibilitiesPage {
	baseInstance: BaseClass;

	constructor(baseInstance: BaseClass) {
		this.baseInstance = baseInstance;
	}

	async openMasterCoachTab(tab: string) {
		switch (tab.toLowerCase()) {
			case "mastered responsibilities":
				await this.baseInstance.clickElementByRole("tab", "Mastered Responsibilities");
				break;
			case "pending proficiency evaluations":
				await this.baseInstance.clickElementByRole("tab", "Pending Proficiency Evaluations");
				break;
		}
	}

	async verifyMasteredResponsibilitiesDisplayed() {
		await this.baseInstance.isDisplayed(elements.masteredResponsibilitiesDisplayed);
	}
}
