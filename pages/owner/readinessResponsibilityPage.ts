import { expect } from "@playwright/test";
import { BaseClass } from "../../helpers/BaseClass";
import { elements } from "../../xpath/owner/readinessCatalogsResponsibilitiesPageElements";
import { getRandomRole } from "../../helpers/util/random";
import { addedEmployeeData } from "../../steps/owner/employeeApiSteps";

export default class ReadinessResponsibilitiesPage {
	baseInstance: BaseClass;

	constructor(baseInstance: BaseClass) {
		this.baseInstance = baseInstance;
	}

	async verifyResponsibilitiesSubSectionIsFocused() {
		const ariaSelectedAttribute = await this.baseInstance.getHtmlAttributeByXPath(
			elements.responsibilitesSubMenu,
			"aria-selected",
		);
		expect(ariaSelectedAttribute).toBe("true");
	}

	async clickOnIssueBadgeBtn() {
		await this.baseInstance.clickElement(elements.IssueBadgeModal.issueBadgeButton, "Click on grant badge button");
	}

	async verifyRowNotApplicableIcon() {
		expect(await this.baseInstance.isDisplayed(elements.verifyRowNotApplicableIcon)).toBeTruthy();
	}

	async verifyRowPassed() {
		expect(await this.baseInstance.isDisplayed(elements.verifyRowPassed)).toBeTruthy();
	}

	async verifyNoResetDefault() {
		expect(await this.baseInstance.isDisplayed(elements.verifyNoResetDefault)).toBeFalsy();
	}

	async verifyRowFailed() {
		expect(await this.baseInstance.isDisplayed(elements.verifyRowFailed)).toBeTruthy();
	}

	async grantBadgeModalDisplayed() {
		await this.baseInstance.isDisplayed(elements.IssueBadgeModal.issuebadgeModal);
	}

	async employeeBadgeSearch(name: string) {
		await this.baseInstance.clickElement(elements.employeeBadgeSearch, "search for employee to grant badge");
		await this.baseInstance.enterTextsequentially(elements.employeeBadgeSearch, name, "Enter employee name");
	}

	async issueBadgeModalDisplayed() {
		await this.baseInstance.isDisplayed(elements.IssueBadgeModal.issuebadgeModal);
	}

	async clickOnNextButton() {
		await this.baseInstance.clickElement(elements.IssueBadgeModal.nextButton, "Click On Next Button");
	}

	async verifyListOfCheckpoint() {
		expect(await this.baseInstance.isDisplayed(elements.verifyListOfCheckpoint)).toBeTruthy();
	}

	async proficiencyModalDisplayed() {
		await this.baseInstance.isDisplayed(elements.IssueBadgeModal.proficiencyPage);
	}

	async clickOnPickEmployeeField() {
		await this.baseInstance.clickElement(
			elements.IssueBadgeModal.employeeFieldDropDown,
			"Click on employee field drop down",
		);
		await this.baseInstance.wait(3);
	}

	async verifyCaretIconIsDownwards() {
		await this.baseInstance.wait(3);
		await this.baseInstance.isDisplayed(elements.IssueBadgeModal.employeeFieldDropDown);
	}

	async verifyCaretIconIsUp() {
		await this.baseInstance.isDisplayed(elements.employeeFieldCaretUp);
	}

	async clickUpCaretIcon() {
		await this.baseInstance.clickElement(elements.employeeFieldCaretUp, "click on up caret icon");
	}

	async clickOnEmployeeField() {
		await this.baseInstance.clickElement(elements.employeeField, "Click on employee field");
	}

	async verifyEmployeeList() {
		await this.baseInstance.isDisplayed(elements.employeeList);
	}

	async verifyEmployeeListNotVisible() {
		!(await this.baseInstance.isDisplayed(elements.employeeList));
	}

	async selectFirstEmployee() {
		await this.baseInstance.clickElement(elements.IssueBadgeModal.firstEmployeeInList, "Select first employee");
		await this.baseInstance.wait(3);
	}

	async userClickOnCrossIcon() {
		await this.baseInstance.clickElement(elements.IssueBadgeModal.userClickOnCrossIcon, "Select first employee");
	}

	async verifyNextBtnDisabled() {
		await this.baseInstance.isDisabled(elements.IssueBadgeModal.nextButton);
	}

	async selectBadgeFromList() {
		await this.baseInstance.clickElement(elements.badgeList, "Select badge");
	}

	async verifyForceBadgeDisplayed() {
		await this.baseInstance.isDisplayed(elements.pathToReadinessBadge.giveBadge);
	}

	async clickOnGiveBadge() {
		await this.baseInstance.clickElement(elements.pathToReadinessBadge.giveBadge, "click on force badge");
		await this.baseInstance.wait(5);
	}

	async badgeIsDisplayedOnEmployee(badge: string) {
		await this.baseInstance.isDisplayed(elements.badgeHolder(badge));
	}

	async clickResponsibilitiesMenu() {
		await this.baseInstance.clickElementByRole("tab", "Responsibilities");
		await this.baseInstance.waitForElementToDisappear(elements.noData);
	}

	async verifyHeaderTextIsDisplayed(headerLabel: string) {
		const headerText = await this.baseInstance.getText(elements.headerText);
		expect(headerText).toBe(headerLabel);
	}

	async verifyAddResponsibilityButtonIsDisplayed() {
		return await this.baseInstance.isDisplayed(elements.addResponsabilityButton);
	}

	async verifyDashboardColumnIsDisplayed() {
		return await this.baseInstance.isDisplayed(elements.dashboardColumnText);
	}

	async verifyStatusColumnIsDisplayed() {
		return await this.baseInstance.isDisplayed(elements.statusColumnText);
	}

	async verifyAttachedToColumnIsDisplayed() {
		return await this.baseInstance.isDisplayed(elements.attachedToColumnText);
	}

	async clickAddResponsibilityButton() {
		await this.baseInstance.clickElement(elements.addResponsibilityButton, "Add responsibility button");
	}

	async hoverAddResponsibilityButton() {
		await this.baseInstance.isDisplayed(elements.hoverResponsibilityButton);
	}

	async verifyResponsibilityModalIsDisplayed() {
		await this.baseInstance.isDisplayed(elements.addResponsibilityField);
	}

	async verifyLoadingBtnIndicator() {
		await this.baseInstance.isDisplayed(elements.loadingBtnIndicator);
	}

	async addResponsibility(name: string) {
		await this.baseInstance.wait(2);
		await this.baseInstance.enterText(elements.addResponsibilityField, name, "Add responsibility text field");
	}

	async verifyCharacterLimitValidationMessage() {
		await this.baseInstance.wait(2);
		const isDisplayed = await this.baseInstance.isDisplayed(elements.characterLimitValidationMessage);
		expect(isDisplayed).toBeTruthy();
	}

	async clickSaveButton() {
		await this.baseInstance.wait(2);
		await this.baseInstance.clickElement(elements.saveAsDraftButton, "Save as draft");
	}

	async clickSaveButtonFromRenameModal() {
		await this.baseInstance.clickElement(elements.renameModal.saveBtn, "Click save button");
	}

	async searchForResponsibilityAndGetBadge(responsibility: string, status: string) {
		await this.baseInstance.waitForElementToDisappear(elements.saveAsDraftButton);
		await this.baseInstance.wait(10);
		await this.baseInstance.clearText(elements.searchField, "clear field");
		await this.baseInstance.enterTextsequentially(elements.searchField, responsibility, "Search Field");
		const draftStatus = await this.baseInstance.getText(elements.badge);
		expect(draftStatus).toContain(status);
	}

	async searchForResponsibility(responsibility: string) {
		await this.baseInstance.waitForElementToDisappear(elements.saveAsDraftButton);
		await this.baseInstance.clearText(elements.searchField, "clear field");
		await this.baseInstance.enterTextsequentially(elements.searchField, responsibility, "Search Field");
		await this.baseInstance.waitForPageToLoad();
	}

	async clickOnFirstResponsibility() {
		await this.baseInstance.clickElement(elements.firstResponsibility, "Click on first responsibility");
		expect(await this.baseInstance.isDisplayed(elements.badgeHoldersModal.activeBadgeHoldersTab)).toBeTruthy();
		await this.baseInstance.wait(5);
	}

	async addCheckpointInst(criteria: string, level: string) {
		await this.baseInstance.clickElement(elements.checklist.addCheckpointButton, "Click on add checkpoint");
		await this.baseInstance.fillText(elements.checklist.addCheckpointModal.criteriaField, criteria);
		await this.selectCheckpointLevel(level);
		await this.baseInstance.clickElementByRole("button", "Save");
	}

	async addCharacterCheckpointInst(instructions: string, criteria: string, level: string) {
		await this.baseInstance.clickElement(elements.checklist.addCheckpointButton, "Click on add checkpoint");
		await this.baseInstance.fillText(elements.checklist.addCheckpointModal.criteriaField, criteria);
		await this.selectCheckpointLevel(level);
		await this.baseInstance.clickElementByRole("button", "Save");
	}

	async verifyBackgroundColor() {
		await this.baseInstance.isDisplayed(elements.verifyBgCheckpoints);
	}

	async clickOntheFirst3DotMenu() {
		await this.baseInstance.clickElement(elements.firstThreeDotMenu, "Click on first Three Dot menu");
	}

	async verifyStatusForResponsibility(status: string) {
		await this.baseInstance.wait(5);
		const draftStatus = await this.baseInstance.getText(elements.badge);
		expect(draftStatus).toContain(status);
	}

	async optionTobeVisibel(text: string) {
		await this.baseInstance.isDisplayed(elements.optionFromThreeDotMenu.option(text));
	}

	async selectOptionFromMenu(text: string) {
		await this.baseInstance.clickElement(elements.optionFromThreeDotMenu.option(text), "Select option");
	}

	async optionToNotExist(text: string) {
		!(await this.baseInstance.exists(elements.optionFromThreeDotMenu.option(text)));
	}

	async clickOnThreeDotMenuFor(name: string) {
		await this.baseInstance.clickElement(
			elements.threeDotMenuForAResponsibility.option(name),
			"click on the three dot menu",
		);
		await this.baseInstance.wait(5);
	}

	async clickOnTheOption(text: string) {
		await this.baseInstance.clickElement(elements.optionFromThreeDotMenu.option(text), `Click on ${text}`);
		await this.baseInstance.wait(5);
		if (text === "Activate") {
			await this.baseInstance.isDisplayed(elements.activateModal.modal);
			await this.baseInstance.clickElement(elements.activateModal.button, "Click Activate Modal btn");
			await this.baseInstance.waitForElementToDisappear(elements.activateModal.modal);
		} else if (text === "Retire") {
			await this.baseInstance.isDisplayed(elements.retireModal.modal);
			await this.baseInstance.clickElement(elements.retireModal.btn, "Click Retire Modal btn");
			expect(await this.baseInstance.isDisplayed(elements.veirfyLoaderActionsIcons)).toBeTruthy();
			await this.baseInstance.waitForElementToDisappear(elements.retireModal.modal);
		} else if (text === "De-activate") {
			await this.baseInstance.isDisplayed(elements.deActivateModal.modal);
			await this.baseInstance.clickElement(elements.deActivateModal.btn, "Click De Activate Modal btn");
			await this.baseInstance.waitForElementToDisappear(elements.deActivateModal.modal);
		} else if (text === "Re-activate") {
			await this.baseInstance.isDisplayed(elements.reActivateModal.modal);
			await this.baseInstance.clickElement(elements.reActivateModal.btn, "Click Re Activate Modal btn");
			expect(await this.baseInstance.isDisplayed(elements.veirfyLoaderActionsIcons)).toBeTruthy();
			await this.baseInstance.waitForElementToDisappear(elements.reActivateModal.modal);
		}
	}

	async deleteModalIsDisplayed() {
		await this.baseInstance.isDisplayed(elements.deleteModal.modal);
	}

	async confirmDeleteOption() {
		await this.baseInstance.clickElement(elements.deleteModal.btn, "Click on Delete");
		await this.baseInstance.wait(3);
	}

	async verifyResponsibilityToNotExist(name: string) {
		!(await this.baseInstance.exists(elements.getStatusForAResponsibility.name(name)));
	}

	async verifyTheRenamePopup() {
		await this.baseInstance.isDisplayed(elements.renameModal.modal);
	}

	async applyRename(name: string) {
		await this.baseInstance.clearText(elements.renameModal.Input, "clear Text");
		await this.baseInstance.keyboardType(name);
	}
	async addResponsibilityOntheFly() {
		const responsibility = getRandomRole();
		await this.baseInstance.enterText(
			elements.enterNewResponsibilityName,
			responsibility.name,
			"Enter Responsibility Name",
		);

		return responsibility.name;
	}

	async createNewResponsibility() {
		await this.baseInstance.clickElement(elements.addNewResponsibility, "Add new responsibility");
		await this.baseInstance.isDisplayed(elements.confirmNewResponsibility);
		await this.baseInstance.clickElement(elements.confirmNewResponsibility, "Confirm Button");
		await this.baseInstance.isDisplayed(elements.reponsibilityAttachedSuccess);
	}

	async affirmResponsibilityAttached() {
		await this.baseInstance.keyboardType(this.addResponsibilityOntheFly.name);
		await this.baseInstance.clickElement(elements.attachResponsibility, "Attach Reponsibility");
	}

	async verifyResponsibilityAttached() {
		await this.baseInstance.isDisplayed(elements.attachedResponsibilitySuccessToast);
	}

	async openResponsibilityModal() {
		await this.baseInstance.wait(5);
		await this.baseInstance.waitForElement(elements.clickOnResponsibilitiesOnHeader);
		await this.baseInstance.clickElement(
			elements.clickOnResponsibilitiesOnHeader,
			"Click on Responsibilities on Header",
		);
		await this.baseInstance.wait(5);
		await this.baseInstance.clickElement(elements.clickOnResponsibility, "Click on Responsibility");
	}

	async addBadgeHolder() {
		await this.baseInstance.clickElement(elements.IssueBadgeModal.issueBadgeButton, "Grant Badge Button");
	}

	async verifyBadgeDialog() {
		await this.baseInstance.isDisplayed(elements.badgeHolderDialog);
	}

	async selectEmployee(name: string) {
		await this.baseInstance.clickElement(elements.pickEmployeeList, "Click on Pick Employee Input");
		await this.baseInstance.enterText(elements.searchEmployeeList, name, "search for employee");
		await this.baseInstance.clickElement(elements.selectEmployee(name), "Select first Employee");
	}

	async selectEmployeeBadge() {
		await this.baseInstance.clickElement(
			elements.selectEmployeeBadge("Apprentice - Can do with supervision"),
			"Select Badge for Employee",
		);
	}

	async selectEmployeeBadges(badgeName) {
		await this.baseInstance.clickElement(
			elements.selectEmployeeBadge(badgeName),
			`Select Badge for Employee: ${badgeName}`,
		);
	}

	async verifyReadinessValue(readinessValue) {
		await this.baseInstance.isDisplayed(elements.isElementDisplayed(readinessValue));
	}

	async forceBadge() {
		await this.baseInstance.clickElement(elements.forceBadgeButton, "Force Badge Button");
	}

	async verifyBadgeOnResponsibilityModal() {
		await this.baseInstance.isDisplayed(elements.badgeOnResponsibilityModal);
	}

	async removeBadge() {
		await this.baseInstance.clickElement(elements.removeBadge, "Remove badge from Responsibility");
	}

	async removeBadgePop() {
		await this.baseInstance.isDisplayed(elements.removeBadgePopup);
	}

	async confirmRemoveBadge() {
		await this.baseInstance.clickElement(elements.confirmRemoveBadge, "Confirm Remove Badge");
	}

	async searchBadge(firstName) {
		await this.baseInstance.clickElement(elements.searchBadgeInput, "Search Badge");
		await this.baseInstance.keyboardType(firstName);
	}

	async verifySearchResult(firstName) {
		await this.baseInstance.isDisplayed(elements.verifySearchedBadgeVisible(firstName));
		await this.baseInstance.wait(5);
	}

	async verifyCatalogsPage() {
		await this.baseInstance.isDisplayed(elements.catalogsPage);
	}

	async verifyResponsibilitiesVisible() {
		await this.baseInstance.wait(5);
		await this.baseInstance.clickElement(
			elements.clickOnResponsibilitiesOnHeader,
			"Click on Responsibilities on Header",
		);
		await this.baseInstance.isDisplayed(elements.verifyResponsibilityExist);
	}

	async searchForResponsibilityAndOpenIt(responsibility: string) {
		await this.baseInstance.waitForElementToDisappear(elements.saveAsDraftButton);
		await this.baseInstance.wait(5);
		await this.baseInstance.enterTextsequentially(elements.searchField, responsibility, "Search Field");
		const responsibilityXpath = `(//span[normalize-space()="${responsibility}"]/parent::*/parent::*/parent::*)[1]`;
		if (await this.baseInstance.isDisplayed(responsibilityXpath)) {
			await this.baseInstance.clickElement(responsibilityXpath, "Responsibility name");
		} else {
			throw `Responsibility ${responsibility} was not found in the system`;
		}
	}

	async searchForResponsibilityAndNotOpen(responsibility: string) {
		await this.baseInstance.waitForElementToDisappear(elements.saveAsDraftButton);
		await this.baseInstance.wait(5);
		await this.baseInstance.enterTextsequentially(elements.searchField, responsibility, "Search Field");
		const responsibilityXpath = `(//span[normalize-space()="${responsibility}"]/parent::*/parent::*/parent::*)[1]`;
		await this.baseInstance.isDisplayed(responsibilityXpath);
	}

	async applyFilter(status: string) {
		const statusLower = status.toLowerCase();
		await this.baseInstance.isDisplayed(elements.filters.filterButton);
		await this.baseInstance.clickElement(elements.filters.filterButton, "Filter Button");
		await this.baseInstance.clickElement(elements.filters.filterOptions(statusLower), "Select Filter Option");
		await this.baseInstance.clickElement(elements.filters.saveFilter, "Save Filter");
	}

	async verifyCounterIsNotVisible() {
		expect(await this.baseInstance.isDisplayed(elements.verifyCounterIsNotVisible)).toBeFalsy();
	}

	async clickOnRoleDataCard() {
		await this.baseInstance.clickElement(elements.roleDataCard, "Click on role data card");
	}

	async roleDatahideCard() {
		expect(await this.baseInstance.isDisplayed(elements.roleDatahideCard)).toBeFalsy();
	}

	async displayAttachmentsPopup() {
		await this.baseInstance.isDisplayed(elements.attachmentsPopup);
	}

	async clickOnDetachResponsibility() {
		await this.baseInstance.clickElement(elements.clickOnDetachResponsibility, "click on detach the Responsibility");
		await this.baseInstance.waitForElementToDisappear(elements.clickOnDetachResponsibility);
	}

	async searchesForResponsibility(responsibility: string) {
		await this.baseInstance.waitForElementToDisappear(elements.saveAsDraftButton);
		await this.baseInstance.enterTextsequentially(elements.searchField, responsibility, "Search Field");
		const responsibilityXpath = `(//span[normalize-space()="${responsibility}"]/parent::*/parent::*/parent::*)[1]`;
		await this.baseInstance.isDisplayed(responsibilityXpath);
		await this.baseInstance.wait(5);
	}

	async verifyBadgeOrder(badgeLevel: string, index: number) {
		expect(await this.baseInstance.isDisplayed(elements.badgeHoldersModal.badgeWrapper)).toBeTruthy();
		expect(
			await this.baseInstance.getHtmlAttributeByXPathUsingIndex(elements.badgeHoldersModal.badgesList, "class", index),
		).toContain(badgeLevel);
	}

	async verifyBreadCrumbsOnResponsibility() {
		expect(
			await this.baseInstance.isDisplayed(elements.breadCrumbComponent.breadCrumbOnResponsibilityPage),
		).toBeTruthy();
	}

	async selectCheckpointLevel(level: string) {
		const lowerCaseLevel = level.toLowerCase();
		await this.baseInstance.clickElementByRole("button", "icon Apprentice");
		switch (lowerCaseLevel) {
			case "apprentice":
				await this.baseInstance.clickElementByRole("menuitem", "icon Apprentice");
				break;
			case "professional":
				await this.baseInstance.clickElementByRole("menuitem", "icon Professional");
				break;
			case "coach":
				await this.baseInstance.clickElementByRole("menuitem", "icon Coach");
				break;
			case "master":
				await this.baseInstance.clickElementByRole("menuitem", "icon Master");
				break;
		}
	}

	async openResponsibilityTab(tab: string) {
		switch (tab.toLowerCase()) {
			case "description":
				await this.baseInstance.clickElementByRole("tab", "Description");
				break;
			case "checklist":
				await this.baseInstance.clickElementByRole("tab", "Checklist");
				break;
			case "badge holders":
				await this.baseInstance.clickElementByRole("tab", "Badge Holders");
				break;
			case "assignments":
				await this.baseInstance.clickElementByRole("tab", "Assignments");
				break;
			case "defaults":
				await this.baseInstance.clickElementByRole("tab", "Defaults");
				break;
			case "chatter":
				await this.baseInstance.clickElementByRole("tab", "Chatter");
				break;
			case "responsibilities":
				await this.baseInstance.clickElementByRole("tab", "Responsibilities");
				break;
			case "evaluation":
				await this.baseInstance.clickElementByRole("tab", "Evaluation");
				break;
			case "roles":
				await this.baseInstance.clickElementByRole("tab", "Roles");
		}

		await this.baseInstance.wait(5);
	}

	async verifyResponsibilityStatus(status: string) {
		await this.baseInstance.isDisplayed(elements.verifyResponsibilityStatus(status));
	}

	async verifyPopUpForInstructionLink(criteria: string, instructions: string, level: string) {
		await this.baseInstance.clickElementByRole("button", "Add Checkpoint");
		await this.selectCheckpointLevel(level);
		await this.baseInstance.fillText(elements.checklist.addCheckpointModal.criteriaField, criteria);
		await this.baseInstance.fillText(elements.checklist.addCheckpointModal.instructionsField, instructions);
		const instructionsField = elements.checklist.addCheckpointModal.instructionsField;
		await this.baseInstance.clickElement(instructionsField, "click element");
		await this.baseInstance.selectText(instructionsField);
		await this.baseInstance.clickElement(elements.clickAttachLinkButton, "Click on Attach Link Button");
	}

	async addCheckpoint(criteria: string, instructions: string, level: string) {
		await this.baseInstance.clickElementByRole("button", "Add Checkpoint");
		await this.selectCheckpointLevel(level);
		await this.baseInstance.fillText(elements.checklist.addCheckpointModal.criteriaField, criteria);
		await this.baseInstance.fillText(elements.checklist.addCheckpointModal.instructionsField, instructions);
		const instructionsField = elements.checklist.addCheckpointModal.instructionsField;
		await this.baseInstance.clickElement(instructionsField, "click element");
		await this.baseInstance.selectText(instructionsField);
		await this.baseInstance.clickElement(elements.clickAttachLinkButton, "Click on Attach Link Button");
		const globalUrl = "https://www.example.com";
		await this.baseInstance.fillText(elements.checklist.attachLinkModal, globalUrl);
		await this.baseInstance.clickElement(elements.saveBtn, "Click on Save Btn");
		await this.baseInstance.wait(1);
		await this.baseInstance.clickElement(elements.saveCheckpointBtn, "Click on Save Btn");
	}

	async addCheckpointWithoutInst(criteria: string, level: string) {
		await this.baseInstance.clickElement(elements.addCheckpointBtn, "click add checkpoint button");
		await this.baseInstance.fillText(elements.checklist.addCheckpointModal.criteriaField, criteria);
		await this.selectCheckpointLevel(level);
		await this.baseInstance.clickElementByRole("button", "Save");
	}

	async verifyChatterName(criteria: string) {
		await this.baseInstance.isDisplayed(elements.chatterName.name(criteria));
	}

	async verifyChecklistName(criteria: string) {
		await this.baseInstance.isDisplayed(elements.checklistPage.name(criteria));
	}

	async criteriaModalAppears() {
		await this.baseInstance.isDisplayed(elements.criteriaModal);
	}

	async clickCloseIcon() {
		await this.baseInstance.clickElement(elements.closeIcon, "click on close icon");
	}

	async clickOnFilterCloseIcon() {
		await this.baseInstance.clickElement(elements.filterCloseIcon, "click on filter close icon");
	}

	async applyStatusFilter(status: string) {
		const statusLow = status.toLowerCase();
		await this.baseInstance.isDisplayed(elements.filter.filterMoreButton);
		await this.baseInstance.clickElement(elements.filter.filterMoreButton, "Click on Filter Button");
		await this.baseInstance.wait(5);
		await this.baseInstance.clickElement(elements.filter.filterStatusOptions(statusLow), "Select Filter Option");
		await this.baseInstance.wait(5);
		await this.baseInstance.clickElement(elements.filter.saveFilter, "Save Filter");
	}

	async applyStatusFilterForCheckpoint(status: string) {
		const statusLow = status.toLowerCase();
		await this.baseInstance.clickElement(elements.filter.filterStatusOptions(statusLow), "Select Filter Option");
		await this.baseInstance.wait(5);
		await this.baseInstance.clickElement(elements.filter.saveFilter, "Save Filter");
	}

	async applyStatusFilterForResponsibilityAssignment(status: string) {
		const statusLow = status.toLowerCase();
		await this.baseInstance.clickElement(
			elements.applyStatusFilterForResponsibilityAssignment(statusLow),
			"Select Filter Option",
		);
		await this.baseInstance.wait(5);
		await this.baseInstance.clickElement(elements.filter.saveFilter, "Save Filter");
	}

	async clickOnFilterButton() {
		await this.baseInstance.clickElement(elements.filter.filterButton, "Click on Filter Button");
	}

	async selectFilter(status: string) {
		const statusLow = status.toLowerCase();
		await this.baseInstance.clickElement(elements.filter.filterStatusOptions(statusLow), "Select Filter Option");
		await this.baseInstance.wait(5);
	}

	async statusFiltersDisplayed(status: string) {
		const statusLow = status.toLowerCase();
		expect(await this.baseInstance.isDisplayed(elements.filter.filterStatusOptions(statusLow))).toBeTruthy();
	}

	async clickOnSaveBtn() {
		await this.baseInstance.clickElement(elements.filter.saveFilter, "Save Filter");
		await this.baseInstance.reloadPage();
	}

	async clickOnMoreFilterBtn() {
		await this.baseInstance.clickElement(elements.moreFilterBtn, "click on more filter btn");
	}

	async verifyFilterIsRemoved(option: string) {
		const filter = await this.baseInstance.getHtmlAttributeByXPath(elements.filterCheckBox.filter(option), "class");
		expect(filter).not.toContain("checkbox-checked");
	}

	async verifyFilteredResults(status) {
		await this.baseInstance.getAllElements(elements.filter.filteredResults(status).toLowerCase());
	}

	async removeStatusFilter(status) {
		await expect(this.baseInstance.isDisplayed(elements.filter.selectedFilter(status).toLowerCase())).toBeTruthy();
		await this.baseInstance.clickElement(elements.filter.removeFilter(status).toLowerCase(), "Remove Selected Filter");
		await this.baseInstance.wait(2);
	}

	async clickOnAssignmentCard() {
		await this.baseInstance.clickElement(elements.clickOnAssignmentCard, "click on asssignment card");
	}

	async verifyAssignmentPage() {
		expect(await this.baseInstance.isDisplayed(elements.verifyAssignmentPage)).toBeTruthy();
	}

	async verifyFilterRemoved(status) {
		!(await this.baseInstance.isDisplayed(elements.filter.selectedFilter(status).toLowerCase()));
	}

	async verifyFilterDisplayed(status) {
		await this.baseInstance.isDisplayed(elements.filter.selectedFilter(status).toLowerCase());
	}

	async applyMultipleFilters(filterArray: string[]) {
		await this.baseInstance.isDisplayed(elements.filter.filterMoreButton);
		await this.baseInstance.clickElement(elements.filter.filterMoreButton, "Click on Filter Button");

		for (const filter of filterArray) {
			await this.baseInstance.clickElement(
				elements.filter.filterStatusOptions(filter).toLowerCase(),
				"Select Filter Option",
			);
		}
		await this.baseInstance.clickElement(elements.filter.saveFilter, "Save Filter");
	}

	async verifyMultipleFilteredResults(filterArray: string[]) {
		for (const filter of filterArray) {
			await expect(this.baseInstance.isDisplayed(elements.filter.filteredResults(filter).toLowerCase())).toBeTruthy();
		}
	}

	async verifyCheckpointCriteriaAndInstructions(criteria: string) {
		expect(await this.baseInstance.isDisplayed(elements.checklist.checkpointCriteria(criteria))).toBeTruthy();
	}

	async verifyChatterText(index: number, message: string) {
		expect(await this.baseInstance.getTextByIndex(elements.chatter.messageList, index)).toEqual(message);
	}

	async verifyLoadMorebuttonIsDisplayed() {
		const isLoadMoreButtonDisplayed = this.baseInstance.isDisplayed(elements.chatter.loadMoreButton);
		expect(isLoadMoreButtonDisplayed).toBeTruthy();
	}

	async verifyNumberOfMessagesInChatter(expectedNoOfMessages: number) {
		expect(await this.baseInstance.getElementCount(elements.chatter.messageList)).toEqual(expectedNoOfMessages);
	}

	async getResponsibilityCode() {
		return await this.baseInstance.getTextContent(elements.responsibilityCode);
	}

	async clickChecklistActionMenu() {
		await this.baseInstance.wait(5);
		await this.baseInstance.clickElement(elements.checklist.checkpointActionMenu, "Click on Checklist Action Menu");
	}

	async clickActionMenuChecklist() {
		await this.baseInstance.clickElement(elements.clickActionMenuChecklist, "Click on Checkpoint action menu");
	}

	async verifyChecklistActionVisble(action: string) {
		await this.baseInstance.isDisplayed(elements.checklist.checklistActions.checklistActionOption(action));
	}

	async clickOnChecklistAction(action: string) {
		await this.baseInstance.clickElement(
			elements.checklist.checklistActions.checklistActionOption(action),
			"Select Action Option for Checklist",
		);
	}

	async verifyChangeChecklistModal() {
		await this.baseInstance.isDisplayed(elements.checklist.addCheckpointModal.changeCheckpointModal);
	}

	async updateChecklistInstruction(instructions: string) {
		await this.baseInstance.isDisplayed(elements.checklist.addCheckpointModal.changeCheckpointModal);
		await this.baseInstance.fillText(elements.checklist.addCheckpointModal.updateInstruction, instructions);
	}

	async updateCheckpointLevel(level: string) {
		await this.baseInstance.clickElement(elements.checklist.clickOnBadgeIcon, "Update Checklist Level");
		await this.baseInstance.clickElement(elements.checklist.checklistBadgeLevel(level), "Update Checklist Level");
	}

	async saveUpdatedChecklist() {
		await this.baseInstance.clickElement(
			elements.checklist.addCheckpointModal.saveChecklistButton,
			"Save Updated Checklist",
		);
	}

	async verifyInstructionsUpdated(updatedChecklistInstruction) {
		await this.baseInstance.isDisplayed(elements.checklist.checkpointInstruction(updatedChecklistInstruction));
	}

	async verifyChecklistBadgeUpdated(badgeLevel) {
		await this.baseInstance.isDisplayed(elements.checklist.checklistBadgeLevel(badgeLevel));
	}

	async selectCheckpointAction(action: string) {
		await this.baseInstance.clickElement(
			elements.checklist.checklistActions.checklistActionOption(action),
			"Click on Delete Checkpoint Option",
		);
	}

	async selectMenuOption(action: string) {
		await this.baseInstance.clickElement(elements.optionMenu.option(action), "select option");
	}

	async clickActivateButton() {
		await this.baseInstance.clickElement(elements.activateButton, "click on button");
	}

	async verifyDeleteCheckpointPopUp(action) {
		await this.baseInstance.isDisplayed(elements.checklist.checklistActions.deleteChecklistPopUp(action));
	}

	async performCheckpointAction(action: string) {
		await this.baseInstance.isDisplayed(elements.checklist.checklistActions.deleteCheckpoint(action));
		await this.baseInstance.clickElement(
			elements.checklist.checklistActions.deleteCheckpoint(action),
			"Perform Checkpoint Action",
		);

		await this.baseInstance.wait(20);
	}

	async verifyCheckpointRemoved(criteria) {
		!(await this.baseInstance.isDisplayed(elements.checklist.checkpointCriteria(criteria)));
	}

	async verifyCheckpointStatus(criteria, status: string) {
		await this.baseInstance.isDisplayed(elements.checklist.checklistStatus(criteria, status));
	}

	async navigateToCheckpoint(responsibility: string) {
		await this.searchForResponsibilityAndOpenIt(responsibility);
		await this.baseInstance.clickElement(elements.checklist.checklistTab, "Open Checklist Tab");
		await this.baseInstance.wait(20);
	}

	async navigateToResponsibility(responsibility: string) {
		await this.searchForResponsibilityAndOpenIt(responsibility);
	}

	async verifySaveButtonDisabled() {
		!(await this.baseInstance.isEnabled(elements.checklist.addCheckpointModal.disabledSaveCheckpointButton));
	}

	async verifySaveButtonEnabled() {
		await this.baseInstance.isEnabled(elements.checklist.addCheckpointModal.saveChecklistButton);
	}

	async clickFilterButton() {
		await this.baseInstance.clickElement(elements.filter.filterButton, "Click on Filter Button");
	}
	async filterButton() {
		await this.baseInstance.clickElement(elements.filterButton, "the user click on Filter Button");
		await this.baseInstance.wait(5);
	}
	async noFilter(status: string) {
		expect(await this.baseInstance.isDisplayed(elements.noFilter(status))).toBeTruthy();
		await this.baseInstance.wait(5);
	}

	async clicknoPositionButton(status: string) {
		await this.baseInstance.clickElement(elements.noPositionButton(status), "the user click on Filter Button");
		await this.baseInstance.wait(2);
	}

	async verifyChecklistCount() {
		expect(await this.baseInstance.isDisplayed(elements.verifyChecklistCount)).toBeTruthy();
	}

	async clickFilterButtonisVisible() {
		expect(
			await this.baseInstance.clickElement(elements.filter.filterMoreButton, "Click on Filter Button"),
		).toBeFalsy();
	}

	async hoverOverCheckpointCounter(badge: string) {
		await this.baseInstance.hoverOverElement(elements.checklist.checkpointCounter.checkpointBadge(badge));
	}

	async hoverOverCriteria() {
		await this.baseInstance.hoverOverElement(elements.firstCheckpoint);
	}

	async hoverOverBadgeName() {
		await this.baseInstance.hoverOverElement(elements.badgeHoldersModal.BadgeName);
	}

	async hoverOverBadgeIcon() {
		await this.baseInstance.hoverOverElement(elements.badgeHoldersModal.BadgeIcon);
	}

	async verifyBadgeIconTooltips() {
		await this.baseInstance.isDisplayed(elements.badgeHoldersModal.badgeIconTooltips);
	}

	async clickCheckpointCounter(badge: string) {
		await this.baseInstance.clickElement(
			elements.checklist.checkpointCounter.checkpointBadge(badge),
			"Click checkpoint button",
		);
	}

	async clickResponsibilityBadgeCounter(badge: string) {
		await this.baseInstance.clickElement(elements.badgeCounter(badge), "Click on badge counter");
	}

	async checkpointCounterSelected(badge: string) {
		await this.baseInstance.clickElement(
			elements.checklist.checkpointCounterSelected.selectedBadge(badge),
			"Select the Badge",
		);
	}

	async badgeCounterSelected(badge: string) {
		await this.baseInstance.isDisplayed(elements.badgeCounterSelected.badgeSelected(badge));
	}

	async badgeIsDisplayedOnResponsibility(badge: string) {
		await this.baseInstance.isDisplayed(elements.responsibilityModalBadge.badgeHolder(badge));
	}

	async searchFieldForBadgeHolder() {
		await this.baseInstance.isDisplayed(elements.searchFieldForBadgeHolder);
	}

	async verifyNoBadgeHolderText() {
		await this.baseInstance.isDisplayed(elements.verifyNoBadgeHolderText);
	}

	async verifyChecklistStatusIsVisible() {
		await this.baseInstance.isDisplayed(elements.checklist.checklistTable);
	}

	async verifyFilteredCriteria() {
		await this.baseInstance.isDisplayed(elements.checklist.checklistFilteredCriteria);
	}
	async verifyCheckpointCriteria(criteria: string) {
		expect(await this.baseInstance.isDisplayed(elements.checklist.checkpointCriteria(criteria))).toBeTruthy();
	}

	async verifyCoachCheckpointCounter() {
		expect(await this.baseInstance.isDisplayed(elements.verifyCoachCheckpointCounter)).toBeTruthy();
	}

	async verifyMasterCheckpointCounter() {
		expect(await this.baseInstance.isDisplayed(elements.verifyMasterCheckpointCounter)).toBeTruthy();
	}

	async verifyApprenticeCheckpointCounter() {
		expect(await this.baseInstance.isDisplayed(elements.verifyApprenticeCheckpointCounter)).toBeTruthy();
	}

	async verifyProfessionalCheckpointCounter() {
		expect(await this.baseInstance.isDisplayed(elements.verifyProfessionalCheckpointCounter)).toBeTruthy();
	}

	async verifyCheckpointBadgeStatus(badgeStatus: string) {
		await this.baseInstance.clickElement(
			elements.checklist.badgeStatusFilter.selectCheckpointBadge(badgeStatus),
			"Select Badge Filter",
		);
	}

	async verifyNewCheckPointIsDisplayed(checkpointCriteria: string) {
		await this.baseInstance.clickElement(elements.searchInputCheck, "Search Checkpoint");
		await this.baseInstance.clearText(elements.searchInputCheck, "clear search");
		await this.baseInstance.enterText(elements.searchInputCheck, checkpointCriteria, "Checkpoint");
		await this.baseInstance.wait(2);
		const newCheckPoint = await this.baseInstance.getText(elements.firstCheckpoint);
		expect(newCheckPoint).toBe(checkpointCriteria);
	}

	async clickOnSeeMoreButton() {
		await this.baseInstance.clickElement(elements.clickOnSeeMoreButton, "click on See More Button");
	}

	async clickNewCheckPoint(checkpointCriteria: string) {
		await this.baseInstance.clickElement(elements.searchInputCheck, "Search Checkpoint");
		await this.baseInstance.clearText(elements.searchInputCheck, "clear search");
		await this.baseInstance.enterText(elements.searchInputCheck, checkpointCriteria, "Checkpoint");
		await this.baseInstance.wait(2);
		await this.baseInstance.clickElement(elements.firstCheckpoint, "click on first checkpoint");
	}

	async verifyHoverCheckpointTootips(level: string) {
		await this.baseInstance.isDisplayed(elements.checklist.checkpointHoverToltipsHover.checkpointtoltips(level));
	}

	async verifyCriteriaHoverTooltip() {
		await this.baseInstance.isDisplayed(elements.criteriaHoverTooltip);
	}

	async verifyHoverBadgeNameTootips() {
		await this.baseInstance.isDisplayed(elements.badgeHoldersModal.badgetoltips);
	}

	async verifySelectedCheckpointTooltips(level: string) {
		await this.baseInstance.isDisplayed(
			elements.checklist.checkpointSelectedToltipsHover.checkpointSelectedtoltips(level),
		);
	}

	async verifyChatterRecords() {
		await this.baseInstance.clickElement(elements.chatters.chatterTable, "chatter is visible");
	}

	async verifyChatterRecordsToday() {
		await this.baseInstance.isDisplayed(elements.chatters.chatterTableRecordsToday);
	}
	async clickThreeDotofResponsibility() {
		await this.baseInstance.clickElement(elements.firstResponsibilityThreeDot, "Click on three dot");
	}

	async getResponsibilityStatusBadge(status: string) {
		const statusText = status.toLowerCase();
		await this.baseInstance.waitForElement(elements.responsibilityBadge.status(statusText));
		await this.baseInstance.isDisplayed(elements.responsibilityBadge.status(statusText));
	}

	async clickOnSearchField() {
		await this.baseInstance.clickElement(elements.responsibilitySearchfield, "click on search field");
	}

	async hoverOverIssueBadge() {
		await this.baseInstance.isDisplayed(elements.hoverOverIssueBadge);
	}

	async hoverOverAddCheckPointButton() {
		await this.baseInstance.isDisplayed(elements.hoverOverAddCheckPointButton);
	}

	async verifySearchLabel() {
		await this.baseInstance.isDisplayed(elements.searchLabel);
	}

	async verifyActiveFilterIsDisplayed(status: string) {
		expect(this.baseInstance.isDisplayed(elements.filter.selectedFilter(status).toLowerCase())).toBeTruthy();
		await this.baseInstance.wait(2);
	}

	async verifyDefaultFilterIsDisplayed(status: string) {
		expect(this.baseInstance.isDisplayed(elements.filter.selectedFilter(status).toLowerCase())).toBeTruthy();
		await this.baseInstance.wait(2);
	}

	async hoverOverBadgeHolderCounter(badge: string) {
		await this.baseInstance.hoverOverElement(elements.badgeHoldersModal.badgeHolderCounter.badgeHolderBadge(badge));
	}

	async verifyHoverBadgeHolderTootips(level: string) {
		await this.baseInstance.isDisplayed(
			elements.badgeHoldersModal.badgeHolderHoverToltipsHover.badgeHoldertoltips(level),
		);
	}

	async clickBadgeHolderCounter(badge: string) {
		await this.baseInstance.clickElement(
			elements.badgeHoldersModal.badgeHolderCounter.badgeHolderBadge(badge),
			"Click badge holder button",
		);
	}

	async columnNamesAreDisplayed() {
		await this.baseInstance.isDisplayed(elements.colNames.firstCol);
		await this.baseInstance.isDisplayed(elements.colNames.secondCol);
		await this.baseInstance.isDisplayed(elements.colNames.thirdCol);
		await this.baseInstance.isDisplayed(elements.colNames.fourthCol);
		await this.baseInstance.isDisplayed(elements.colNames.fifthCol);
	}

	async naviagteToLastPage() {
		const activePosition = await this.baseInstance.getAllElements(elements.IssueBadgeModal.nextButton);
		const activePositionCount = activePosition.length;
		while (activePositionCount >= 10) {
			await this.baseInstance.clickElement(elements.IssueBadgeModal.nextButton, "Click on Next Button");
		}

		!(await this.baseInstance.isDisplayed(elements.IssueBadgeModal.nextButton));
	}

	async naviagteToLastChecklistPage() {
		const activePosition = await this.baseInstance.getAllElements(elements.checklistNextBtn);
		const activePositionCount = activePosition.length;
		while (activePositionCount >= 10) {
			await this.baseInstance.clickElement(elements.checklistNextBtn, "Click on Next Button");
		}

		!(await this.baseInstance.isDisplayed(elements.checklistNextBtn));
	}

	async checklistNextBtnVisible() {
		await this.baseInstance.isDisplayed(elements.checklistNextBtn);
	}

	async checklistPreviousBtnNotVisible() {
		!(await this.baseInstance.isDisplayed(elements.checklistPreviousBtn));
	}

	async checklistPreviousBtnVisible() {
		!(await this.baseInstance.isDisplayed(elements.checklistPreviousBtn));
	}

	async verifyTheEmptyChecklist() {
		await this.baseInstance.isDisplayed(elements.emptyChecklist);
	}

	async clickOnFailBtn() {
		await this.baseInstance.clickElement(elements.failBtn, "Click on fail button");
	}

	async clickOnNotApplicableBtn() {
		await this.baseInstance.clickElement(elements.markAsNotApplicableBtn, "Click on fail button");
	}

	async failBadgeVisible() {
		await this.baseInstance.isDisplayed(elements.failBadge);
	}

	async notApplicableBadgeVisible() {
		await this.baseInstance.isDisplayed(elements.notApplicableBadge);
	}

	async resetBadgeVisible() {
		await this.baseInstance.isDisplayed(elements.resetBadge);
	}

	async clickOnPassBtn() {
		await this.baseInstance.clickElement(elements.IssueBadgeModal.passBtn, "Click on pass button");
	}

	async passBadgeAppears() {
		await this.baseInstance.isDisplayed(elements.IssueBadgeModal.passBadge);
	}

	async verifyResponsibilityNameNotHyperlinked() {
		await this.baseInstance.isDisplayed(elements.responsibilityName);
	}

	async hoverOverThreeDotsMenu() {
		await this.baseInstance.hoverOverElement(elements.hoverOverThreeDotMenuButton);
	}

	async clickOnChatterDrawer() {
		await this.baseInstance.clickElement(elements.chatterDrawerIcon, "click on chatter drawer");
	}

	async chatterDrawerDisplayed() {
		await this.baseInstance.isDisplayed(elements.chatterDrawer);
	}

	async verifyNoCheckpointsFound() {
		await this.baseInstance.isDisplayed(elements.noCheckpointsFound);
	}

	async verifyBadgeTabAppears() {
		await this.baseInstance.isDisplayed(elements.badgeHolderTab);
	}

	async hoverOverChecklistMenu() {
		await this.baseInstance.hoverOverElement(elements.checklistThreeDot);
	}

	async verifyStatusIsDisable(status) {
		await expect(this.baseInstance.isDisplayed(elements.filter.selectedFilter(status).toLowerCase())).toBeTruthy();
	}

	async applyStatusFilters(status: string) {
		const statusLow = status.toLowerCase();
		await this.baseInstance.isDisplayed(elements.filter.filterButton);
		await this.baseInstance.clickElement(elements.filter.filterButton, "Click on Filter Button");
		await this.baseInstance.wait(5);
		await this.baseInstance.clickElement(elements.filter.filterStatusOptions(statusLow), "Select Filter Option");
		await this.baseInstance.wait(5);
		await this.baseInstance.clickElement(elements.filter.saveFilter, "Save Filter");
	}

	async verifyDataVisibleOnAssignmentsTab() {
		expect(await this.baseInstance.isDisplayed(elements.assignmentTabData)).toBeTruthy();
	}

	async clickOnFilterBtn() {
		await this.baseInstance.clickElement(elements.assignmentFilterBtn, "click on filter btn");
		await this.baseInstance.wait(5);
	}

	async verifyFilterModalIsDisplayed() {
		expect(await this.baseInstance.isDisplayed(elements.filterModal)).toBeTruthy();
	}

	async verifyListOfEmployee() {
		expect(this.baseInstance.isDisplayed(elements.verifyListOfEmployee)).toBeTruthy();
	}

	async verifyEmployeeCards() {
		await this.baseInstance.isDisplayed(elements.verifyEmployeeCards);
	}

	async verifyRequestedTag() {
		await this.baseInstance.isDisplayed(elements.verifyRequestedTag);
	}

	async verifyRequester() {
		await this.baseInstance.isDisplayed(elements.verifyRequester);
	}

	async verifyAccptedTag() {
		await this.baseInstance.isDisplayed(elements.verifyAccptedTag);
	}

	async clickOnAssignmentFilterBtn() {
		await this.baseInstance.clickElement(elements.clickOnAssignmentFilterBtn, "click on assignmnet filter btn");
	}

	async filterModalIsNotDisplayed() {
		!(await this.baseInstance.isDisplayed(elements.filterModal));
		await this.baseInstance.wait(10);
	}

	async noCheckpointsFoundTextVisible() {
		expect(await this.baseInstance.isDisplayed(elements.noCheckpointText)).toBeTruthy();
	}

	async verifyAddCheckpointBtnVisible() {
		expect(await this.baseInstance.isDisplayed(elements.addCheckpointBtn)).toBeTruthy();
	}

	async verifyNoCheckpointsVisibleText() {
		expect(await this.baseInstance.isDisplayed(elements.noCheckpointsVisibleText)).toBeTruthy();
	}

	async verifyChecklistFilterisDisplayed() {
		expect(await this.baseInstance.isDisplayed(elements.verifyChecklistFilterisDisplayed)).toBeTruthy();
	}

	async clickOnClearFilter() {
		await this.baseInstance.clickElement(elements.clickOnClearFilter, "click on Filter button");
	}

	async verifyAssignmentFilters(status: string) {
		expect(this.baseInstance.isDisplayed(elements.verifyAssignmentFilters(status))).toBeTruthy();
	}

	async openAndCloseCheckpointsModal() {
		await this.baseInstance.clickElement(elements.addcheckpoint, "open Checkpoints Modal");
		await this.baseInstance.clickElement(elements.closeCheckpointsModal, "open Checkpoints Modal");
	}

	async assignmentModalNotDisplayed() {
		expect(await this.baseInstance.isDisplayed(elements.assignmentModalNotDisplayed)).toBeFalsy();
	}

	async verifyFilterTagDisplayed(tag: string) {
		expect(await this.baseInstance.isDisplayed(elements.proficiencyFilterTags(tag))).toBeTruthy();
	}

	async selectEvaluateFilter(filter: string) {
		await this.baseInstance.clickElement(elements.evaluateFilter(filter), "select filter");
	}

	async noRespFoundTextVisible() {
		await this.baseInstance.isDisplayed(elements.noRespFoundText);
	}

	async removeFilter() {
		await this.baseInstance.clickElement(elements.removeStatusFilter, "remove status filter");
	}

	async resetIcon() {
		await this.baseInstance.clickElement(elements.resetIcon, "remove status filter");
	}
	async verifyConfirmationDialog() {
		expect(await this.baseInstance.isDisplayed(elements.verifyConfirmationDialog)).toBeTruthy();
	}

	async verifyPendingEvaluiationStatus() {
		expect(await this.baseInstance.isDisplayed(elements.verifyPendingEvaluiationStatus)).toBeTruthy();
	}

	async clickOnNotApplicableButton() {
		const expectedBgColor = "background-color: rgb(80, 77, 86);";
		const buttonSelector =
			"//button[contains(@class, 'passFail-button') and contains(@class, 'btn-hover')]/span[normalize-space()='N/A']/..";
		const value = await this.baseInstance.getHtmlAttributeByXPath(buttonSelector, "style");
		expect(value).toContain(expectedBgColor);
		await this.baseInstance.clickElement(elements.clickOnNotApplicableButton, "click On Not Applicable Button");
	}

	async reasonFieldForNotApplicableModal() {
		expect(await this.baseInstance.isDisplayed(elements.reasonFieldForNotApplicableModal)).toBeTruthy();
	}

	async reasonFieldForFailModal() {
		expect(await this.baseInstance.isDisplayed(elements.reasonFieldForFailModal)).toBeTruthy();
	}

	async verifyNotApplicableBtnDisabled() {
		const isNotApplicableBtnDisabled = await this.baseInstance.isEnabled(elements.notApplicableBtnDisabled);
		expect(isNotApplicableBtnDisabled).toBeFalsy();
	}

	async verifyFailedBtnDisabled() {
		const isNotApplicableBtnDisabled = await this.baseInstance.isEnabled(elements.failedBtnDisabled);
		expect(isNotApplicableBtnDisabled).toBeFalsy();
	}

	async clickOnFailedBtn() {
		await this.baseInstance.clickElement(elements.failedBtnDisabled, "click on Failed Btn");
	}

	async enterReason() {
		const reasonFieldXPath = "//textarea[@id=\"reason\"]";
		const staticText = "This is the static reason text.";
		const objectDescription = "Reason Field";
		await this.baseInstance.enterText(reasonFieldXPath, staticText, objectDescription);
	}

	async clickOnPassedIconButton() {
		const expectedBgColor = "background-color: rgb(23, 178, 106);";
		const buttonSelector =
			"//button[contains(@class, 'passFail-button') and contains(@style, 'background-color: rgb(23, 178, 106)')]";
		const value = await this.baseInstance.getHtmlAttributeByXPath(buttonSelector, "style");
		expect(value).toContain(expectedBgColor);
		await this.baseInstance.clickElement(buttonSelector, "Click on Passed Icon Button");
	}

	async clickOnFailedIconButton() {
		const expectedBgColor = "background-color: rgb(217, 45, 32);";
		const failedButtonSelector =
			"//button[contains(@class, 'passFail-button') and contains(@style, 'background-color: rgb(217, 45, 32)')]";
		const value = await this.baseInstance.getHtmlAttributeByXPath(failedButtonSelector, "style");
		expect(value).toContain(expectedBgColor);
		await this.baseInstance.clickElement(failedButtonSelector, "Click on Passed Icon Button");
	}

	async clickOnConfirmButton() {
		await this.baseInstance.clickElement(elements.clickOnConfirmButton, "click On Confirm Button");
	}

	async verifyChecklistHaveNoCounter() {
		expect(await this.baseInstance.isDisplayed(elements.verifyChecklistHaveNoCounter)).toBeTruthy();
	}

	async clickOnCheckPointCounter() {
		await this.baseInstance.clickElement(elements.verifyChecklistHaveNoCounter, "click on check point counter");
	}

	async clickOnGrayCheckPointCounter() {
		await this.baseInstance.clickElement(elements.checkpointCounter, "click on checkpoint counter");
	}

	async verifyBadge(badge: string) {
		expect(await this.baseInstance.isDisplayed(elements.verifyBadge(badge))).toBeTruthy();
	}

	async openIssueBadgeDropDown() {
		await this.baseInstance.clickElement(elements.openIssueBadgeDropDown, "user open Issue Badge Drop Down");
	}

	async grantBadgeToEmployee() {
		await this.baseInstance.clickElement(elements.grantBadgeToEmployee, "grant Badge To Employee");
	}

	async hoverOverProfessioanlInspectionBadge() {
		await this.baseInstance.hoverOverElement(elements.hoverOverProfessioanlInspectionBadge);
	}

	async hoverOverApprenticeInspectionBadge() {
		await this.baseInstance.hoverOverElement(elements.hoverOverApprenticeInspectionBadge);
	}

	async verifyBadgeStatusToolip(status: string) {
		await this.baseInstance.isDisabled(elements.verifyBadgeStatusToolip(status));
	}

	async verfiyIssueBadge(employeeName: string) {
		await this.baseInstance.isDisplayed(elements.verfiyIssueBadge(employeeName || addedEmployeeData.firstName));
	}
	async verifyOnlyResponsibilityAssignmentVisible() {
		await this.baseInstance.isVisible(elements.onlyRespInspectProficiency);
	}
	async verifyAssignmentsTreeVisible() {
		await this.baseInstance.isVisible(elements.assignmentTreeRespInspectProficiency);
	}

	async hoverOverCommentIcon() {
		await this.baseInstance.hoverOverElement(elements.commentIcon);
	}

	async toolTipContentVisible() {
		await this.baseInstance.isDisplayed(elements.toolTipContent);
	}

	async verifyBadgeDefaultData() {
		await this.baseInstance.isDisplayed(elements.verifyBadgeDefaultData);
	}

	async clickOnDropdownButton() {
		await this.baseInstance.clickElement(elements.dropdownButton, "click on dropdown button");
	}

	async clickOnActiveCheckpoint() {
		await this.baseInstance.clickElement(elements.clickOnActiveCheckpoint, "click on active checkpoint");
	}

	async clickOnAIInstructionsButton() {
		await this.baseInstance.clickElement(elements.clickOnAIInstructionsButton, "click on AI Instructions button");
	}

	async clickOnAddInstructionsButton() {
		await this.baseInstance.clickElement(elements.clickOnAddInstructionsButton, "click on Add Instructions button");
	}

	async clickOnSaveInstructionsButton() {
		await this.baseInstance.clickElement(elements.saveInstructionsButton, "click on Save Instructions button");
	}

	async verifyInstructionsAreAddedInTheCheckpoint() {
		expect(await this.baseInstance.isDisplayed(elements.InstructionsAddedInCheckpoint)).toBeTruthy();
	}

	async clickOnAddWithAIButton() {
		await this.baseInstance.clickElement(elements.addWithAIButton, "click on Add with AI button");
	}

	async verifyCriteriaToInstruction() {
		expect(await this.baseInstance.isDisplayed(elements.verifyCriteriaToInstruction)).toBeFalsy();
	}

	async clickOnAddCheckpointsButton(button: string) {
		await this.baseInstance.clickElement(elements.addCheckpointsButton(button), "click on Add Checkpoints button");
	}

	async showColumn(column: string) {
		expect(await this.baseInstance.isDisplayed(elements.showColumn(column))).toBeTruthy();
	}

	async getActiveResponsibilityHeaderCount() {
		return await this.baseInstance.getTextContent(elements.activeResponsibilityHeaderCount);
	}

	async clickOnGiveUpgradeBadge() {
		await this.baseInstance.clickElement(elements.pathToReadinessBadge.giveUpgradeBadge, "click On Give Upgrade Badge");
	}

	async clickOnMasterInspectionBadge() {
		await this.baseInstance.clickElement(
			elements.pathToReadinessBadge.clickOnMasterInspectionBadge,
			"click on coach inspection badge",
		);
	}

	async clickOnRemoveBadgeButton() {
		await this.baseInstance.clickElement(
			elements.pathToReadinessBadge.removeBadgeButton,
			"click on remove badge button",
		);
		await this.baseInstance.clickElement(elements.pathToReadinessBadge.confirmButton, "click on remove badge button");
	}
}
