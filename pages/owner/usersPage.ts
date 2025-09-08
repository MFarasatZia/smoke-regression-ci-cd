import { BaseClass } from "../../helpers/BaseClass";
import { elements } from "../../xpath/owner/usersPageElements";

export default class UsersPage {
	baseInstance: BaseClass;
	reports = [];
	reportData = [];

	constructor(baseInstance: BaseClass) {
		this.baseInstance = baseInstance;
	}

	async enterSearchKeyword(keyword: string) {
		await this.baseInstance.enterTextsequentially(elements.searchInput, keyword, "Search input");
	}

	async getFullNameText() {
		return await this.baseInstance.getText(elements.usersTableFirstRow.fullName);
	}
}
