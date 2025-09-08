import { expect } from "@playwright/test";
import { BaseClass } from "../../helpers/BaseClass";
import { elements } from "../../xpath/owner/organizationPositionPageElements";

export default class OrganizationPositionPage {
	baseInstance: BaseClass;
	reports = [];
	reportData = [];

	constructor(baseInstance: BaseClass) {
		this.baseInstance = baseInstance;
	}

	async clickOnAddPositionBtn() {
		await this.baseInstance.clickElement(elements.addPositionButton, "Click on add position button");
	}

	async addPositionButtonIsDisplayed() {
		await this.baseInstance.isDisplayed(elements.addPositionButton);
	}

	async verifyAddPositionModal() {
		await this.baseInstance.isDisplayed(elements.addPositionModal.header);
		await this.baseInstance.isDisplayed(elements.addPositionModal.positionNameInput);
		await this.baseInstance.isDisplayed(elements.addPositionModal.saveButton);
	}

	async addPositionName(positionName: string) {
		await this.baseInstance.clickElement(elements.addPositionModal.positionNameInput, "Click on Input field");
		await this.baseInstance.enterText(elements.addPositionModal.positionNameInput, positionName, "Enter Position Name");
	}

	async saveTheNewPosition() {
		await this.baseInstance.clickElement(elements.addPositionModal.saveButton, "Click Position Save button");
	}

	async saveBtnLoadingIndicator() {
		await this.baseInstance.isDisplayed(elements.btnLoadingIndicator);
	}

	async verifyNewPositionIsCreated(positionName: string) {
		await this.baseInstance.isDisplayed(elements.particularNameOfPosition.option(positionName));
	}

	async searchForPosition(positionName: string) {
		await this.baseInstance.wait(5);
		await this.baseInstance.clickElement(elements.searchInput, "Click on the Search field");
		await this.baseInstance.clearText(elements.searchInput, "clear the input");
		await this.baseInstance.wait(5);
		await this.baseInstance.reloadPage();
		await this.baseInstance.enterTextsequentially(elements.searchInput, positionName, "Enter Position Name");
	}

	async verifySearchForPosition() {
		const value = await this.baseInstance.getText(elements.searchInput);
		expect(value).not.toBeNull();
	}

	async getTheCodeForPosition() {
		const value = await this.baseInstance.getTextContent(elements.positionCode);
		return value;
	}

	async verifyAPositionInCompleteTable(positionName: string) {
		const allPosition = await this.baseInstance.getAllElements(elements.allPositionNames);
		for (const option in allPosition) {
			const text = await this.baseInstance.getText(option);
			expect(text).toContain(positionName);
		}
	}

	async verifycapacityIconForSpecificPositionToBe() {
		const expectedStyle = "color: rgb(127, 86, 217)";
		await this.baseInstance.wait(5);
		const styleAttribute = await this.baseInstance.getHtmlAttributeByXPath(elements.capacityOptionAvailable, "style");
		expect(styleAttribute).toContain(expectedStyle);
	}

	async clickOnTheDeleteOption() {
		await this.baseInstance.clickElement(elements.menuPopUpOptions.delete, "Click on the delete menu");
	}

	async clickOnTheActivateOption() {
		await this.baseInstance.clickElement(elements.menuPopUpOptions.activate, "Click on the Active menu");
	}

	async clickOnTheDeactivateOption() {
		await this.baseInstance.clickElement(elements.menuPopUpOptions.deActivate, "Click on the De-Activate menu");
	}

	async clickOnTheReactivateOption() {
		await this.baseInstance.clickElement(elements.menuPopUpOptions.reActivate, "Click on the Re-Activate menu");
	}
	async clickOnTheRetiredOption() {
		await this.baseInstance.clickElement(elements.menuPopUpOptions.retired, "Click on the Retired menu");
	}

	async verifyOptionNotToBeDisplayed(option: string) {
		!(await this.baseInstance.exists(elements.threeDotMenuPopUpOptions.option(option)));
	}

	async selectOptions(option: string) {
		await this.baseInstance.clickElement(elements.threeDotMenuPopUpOptions.option(option), "Click on options");
	}

	async searchForRoleAndGetBadge(responsibility: string, status: string) {
		await this.baseInstance.waitForElement(elements.badge);
		await this.baseInstance.enterText(elements.searchField, responsibility, "Search Field");
		const draftStatus = await this.baseInstance.getText(elements.badge);
		expect(draftStatus).toContain(status);
	}

	async getTheStatusBadge(status: string) {
		await this.baseInstance.waitForElement(elements.badge);
		await this.baseInstance.wait(5);
		const draftStatus = await this.baseInstance.getText(elements.badge);
		expect(draftStatus).toContain(status);
	}

	async getPositionStatusBadge(status: string) {
		const statusText = status.toLowerCase();
		await this.baseInstance.waitForElement(elements.positionbadge.status(statusText));
		await this.baseInstance.isDisplayed(elements.positionbadge.status(statusText));
	}

	async getOpenPositionStatusBadge(status: string) {
		const statusText = status.toLowerCase();
		await this.baseInstance.waitForElement(elements.openPositionbadge.status(statusText));
		await this.baseInstance.isDisplayed(elements.openPositionbadge.status(statusText));
	}

	async clickOntheFirst3DotMenu() {
		await this.baseInstance.clickElement(elements.firstThreeDotMenu, "Click on first Three Dot menu");
		await this.baseInstance.wait(2);
	}

	async clickOnPositionThreeDot() {
		await this.baseInstance.clickElement(elements.positionThreeDotMenu, "Click On Menu button");
	}

	async clickOnOpenPositionThreeDotMenu() {
		await this.baseInstance.clickElement(elements.threeDotMenuOpenPosition, "Click On Menu button");
	}

	async clickOnPositionThreeDotMenu() {
		await this.baseInstance.clickElement(elements.threeDotMenu, "Click On Menu button");
	}

	async deleteModalShouldBeDisplayed() {
		await this.baseInstance.isDisplayed(elements.deletePositionModal.ModalHeader);
	}

	async detachModalShouldBeDisplayed() {
		await this.baseInstance.isDisplayed(elements.detachPositionModal.ModalHeader);
	}

	async deleteThePosition() {
		await this.baseInstance.wait(3);
		await this.baseInstance.clickElement(elements.deletePositionModal.Btn, "Click on the delete button");
	}

	async detachThePosition() {
		await this.baseInstance.wait(3);
		await this.baseInstance.clickElement(elements.detachPositionModal.Btn, "Click on the delete button");
	}

	async clickOnTheClone() {
		await this.baseInstance.clickElement(elements.menuPopUpOptions.clone, "Clone");
	}
	async verifyAPositionNotExistInTable(positionName: string) {
		await this.baseInstance.wait(8);
		const allPosition = await this.baseInstance.getAllElements(elements.allPositionNames);
		for (const option in allPosition) {
			const text = await allPosition[option].textContent();
			expect(text).not.toContain(positionName);
		}
	}

	async menuOptionVisible(option: string) {
		await this.baseInstance.isDisplayed(elements.threeDotMenuPopUpOptions.option(option));
	}

	async menuOptionNotVisible(option: string) {
		expect(await this.baseInstance.isDisplayed(elements.threeDotMenuPopUpOptions.option(option))).toBeFalsy();
	}

	async ClickOnMenuOption(option: string) {
		await this.baseInstance.clickElement(elements.threeDotMenuPopUpOptions.option(option), "Click on option");
	}

	async verifyTheDraftStatusOfPosition() {
		await this.baseInstance.isDisplayed(elements.getNameForTheProject.draft);
	}

	async verifyPositionTableIsVisible() {
		await this.baseInstance.isDisplayed(elements.positionTable);
	}

	async verifyHoverOverAddPosition() {
		await this.baseInstance.isDisplayed(elements.hoverOverAddPosition);
	}

	async verifyPositionHeaderIsVisible() {
		await this.baseInstance.isDisplayed(elements.positionHeaderTab);
	}
	async verifyOccupiedHeaderIsVisible() {
		await this.baseInstance.isDisplayed(elements.occupiedHeaderTab);
	}
	async verifyActingHeaderIsVisible() {
		await this.baseInstance.isDisplayed(elements.actingAsHeaderTab);
	}
	async verifyActionHeaderIsVisible() {
		await this.baseInstance.isDisplayed(elements.actionHeaderTab);
	}
	async verifyStatusHeaderIsVisible() {
		await this.baseInstance.isDisplayed(elements.statusHeaderTab);
	}

	async verifyFirstDataToVisible() {
		await this.baseInstance.isDisplayed(elements.positionFirstData);
	}
	async verifyFirstPositionToVisible() {
		await this.baseInstance.isDisplayed(elements.positionFirstData);
	}
	async verifypositionFirstDataCardToVisible() {
		await this.baseInstance.isDisplayed(elements.positionFirstDataCard);
	}

	async verifyPositionFirstDataBadgeToVisible() {
		await this.baseInstance.isDisplayed(elements.positionFirstDataBadge);
	}

	async clickOnPositionRoleCounter() {
		await this.baseInstance.clickElement(elements.positionFirstDataBadge, "click on position role counter");
	}

	async verifyPositionFirstDataNameToVisible() {
		await this.baseInstance.isDisplayed(elements.positionFirstDataName);
	}

	async verifyPositionFirstDataCodeToVisible() {
		await this.baseInstance.isDisplayed(elements.positionFirstDataCode);
	}

	async openTheMenuPopupForPosition(value: string) {
		await this.baseInstance.waitForElement(elements.positionFirstDataName);
		await this.baseInstance.clickElement(
			elements.OpenThreeDotMenuFor.forAnyRow.option(value),
			"Open Three dot menu for row",
		);
	}

	async verifyRenameOptionToBeDisplayed() {
		await this.baseInstance.isDisplayed(elements.menuPopUpOptions.rename);
	}

	async clonePopup() {
		await this.baseInstance.isDisplayed(elements.clonePopUpModel.clonePopupDialog);
		await this.baseInstance.clickElement(elements.clonePopUpModel.cloneButton, "click on Clone Button");
	}

	async clickOnRenameOption() {
		await this.baseInstance.wait(5);
		await this.baseInstance.clickElement(elements.menuPopUpOptions.rename, "Click on rename Option");
		await this.baseInstance.wait(5);
	}

	async verifyRenameModalIsDisplayed() {
		await this.baseInstance.isDisplayed(elements.renamePositionModal.ModalConatainer);
	}

	async enterTheNewName(name: string) {
		await this.baseInstance.clearText(elements.renamePositionModal.inputfeild, "click Rename Input Filed");
		await this.baseInstance.keyboardType(name);
	}

	async clickSavebtnForRename() {
		await this.baseInstance.clickElement(elements.renamePositionModal.saveButton, "click save modal");
	}

	async clickOnSaveFilterButton() {
		await this.baseInstance.clickElement(elements.filterModal.saveFilter, "Click on button");
	}

	async clickOntheCapcityIcon() {
		await this.baseInstance.waitForElement(elements.positionFirstDataCard);
		await this.baseInstance.clickElement(elements.positionFirstDataCard, "click on the Capicty Icon");
	}

	async capcityModalIsVisible() {
		await this.baseInstance.isDisplayed(elements.capacityPopup.modalConatiner);
	}

	async verfiyThatOneFTEIsSelected() {
		const expectedStyle = "color: rgb(127, 86, 217)";
		const styleAttribute = await this.baseInstance.getHtmlAttributeByXPath(
			elements.capacityPopup.oneFTEOption,
			"style",
		);
		expect(styleAttribute).toContain(expectedStyle);
	}

	async clickOnZeroPointFiveFTE() {
		await this.baseInstance.clickElement(elements.capacityPopup.zeroPointFiveOption, "click on 0.5 FTE");
		await this.baseInstance.wait(5);
	}

	async clickcapacityIconForSpecificPosition(optionName: string) {
		await this.baseInstance.clickElement(
			elements.capacityIconForSpecificPosition.option(optionName),
			"click On the Capicity Icon",
		);
	}

	async verfiyThatZeroPointFiveFTEIsSelected() {
		const expectedStyle = "color: rgb(127, 86, 217)";
		const styleAttribute = await this.baseInstance.getHtmlAttributeByXPath(
			elements.capacityPopup.zeroPointFiveOption,
			"style",
		);
		expect(styleAttribute).toContain(expectedStyle);
	}

	async clickOnCloseCapacityIcon() {
		await this.baseInstance.clickElement(elements.capacityPopup.closeIcon, "click close icon");
	}

	async clickOnURLPostion() {
		await this.baseInstance.clickElement(elements.urlPostionName, "Click on Hyperlink");
	}

	async verifyPostionModal() {
		await this.baseInstance.isDisplayed(elements.postionModal);
	}

	async verifyNoAssignmentRolesFoundIsVisible() {
		await this.baseInstance.clickElement(elements.clickOnCloseIcon, "close the modal");
		expect(await this.baseInstance.isDisplayed(elements.filtrModal)).toBeTruthy();
		expect(await this.baseInstance.isDisplayed(elements.verifyNoAssignmentRolesFoundIsVisible)).toBeFalsy();
	}

	async clickOnAssignmentModal() {
		await this.baseInstance.clickElement(elements.clickOnAssignmentModal, "click on assignment modal");
	}

	async verifyAttachRoleMenu() {
		await this.baseInstance.isDisplayed(elements.attachedRoleMenu);
	}

	async clickOnAttachRoleButton() {
		await this.baseInstance.clickElement(elements.attachRoleButton, "Add Role Button");
	}

	async verifyAttachRoleModal() {
		await this.baseInstance.isDisplayed(elements.attachRoleModel);
	}

	async typeNewRoleName(name: string) {
		await this.baseInstance.wait(2);
		await this.baseInstance.enterText(elements.enterNewRoleName, name, "New Role");
	}

	async clickOutsideConfirmationModal() {
		await this.baseInstance.clickElement(elements.clickOutsideModal, "click outside modal");
		await this.baseInstance.wait(10);
	}

	async clickOnAddNewRole() {
		await this.baseInstance.wait(2);
		await this.baseInstance.clickElement(
			elements.attachRolePopup.createAndAttachNewRoleButton,
			"Add New Role Button Click",
		);
	}

	async clickOnConfirmButton() {
		await this.baseInstance.clickElement(elements.addNewRoleConfirm, "Confirm Role Button Click");
	}

	async attachNewRoleItem(newRoleName: string) {
		await this.baseInstance.clickElement(elements.closeAttachRolePopUp, "Close Attach Model Pop-up");
		await this.baseInstance.wait(2);
		await this.baseInstance.clickElement(elements.attachRoleButton, "Attach Role Button");
		await this.baseInstance.wait(2);
		await this.baseInstance.isDisplayed(elements.attachRoleModel);
		await this.baseInstance.wait(2);
		await this.baseInstance.clickElement(elements.searchRole, "Search Role");
		await this.baseInstance.clickElement(elements.selectRoleFromList(newRoleName), "Click in Search Field");
		await this.baseInstance.keyboardType(newRoleName);
		await this.baseInstance.clickElement(elements.attachRoleToPositionButton, "Attach Role to Postion");
	}

	async verifyRoleAttached(newRoleName: string) {
		await this.baseInstance.isDisplayed(elements.roleAttachedSuccess);
		await this.baseInstance.isDisplayed(elements.roleAttachedToPosition(newRoleName));
	}

	async selectRoleFromTheList() {
		await this.baseInstance.wait(5);
		console.log("User is on the role list Search", elements.roleList);
		await this.baseInstance.clickElement(elements.selectFirstRole, "Select First Role");
	}

	async selectRole() {
		await this.baseInstance.waitForElementToDisappear(elements.roleList);
		await this.baseInstance.clickElement(elements.selectFirstRole, "Select First Role");
	}

	async clickOnAttachButton() {
		await this.baseInstance.clickElement(elements.attachRoleToPositionButton, "Attach Role to Position");
	}

	async verifyRoleAttachedToPosition() {
		await this.baseInstance.isDisplayed(elements.attachedRole);
	}

	async verifyNoRolesAttachedScreen() {
		!(await this.baseInstance.isDisplayed(elements.verifyNoRolesAttachedScreen));
	}

	async verifyReactivateModal() {
		await this.baseInstance.isDisplayed(elements.reActivatePositionModal.ModalHeader);
	}
	async verifyRetiredModal() {
		await this.baseInstance.isDisplayed(elements.retiredPositionModal.ModalHeader);
	}

	async verifyDeactivateModal() {
		await this.baseInstance.isDisplayed(elements.deActivatePositionModal.ModalHeader);
	}

	async clickOnDetactivatePoistion() {
		await this.baseInstance.clickElement(elements.deActivatePositionModal.Btn, "click on Deactivate Position");
	}

	async clickOnActivatePositionBtn() {
		await this.baseInstance.clickElement(elements.activatePositionModal.Btn, "Click on Activate Position Btn");
		await this.baseInstance.waitForElementToDisappear(elements.activatePositionModal.Btn);
	}

	async verifyActivateModal() {
		await this.baseInstance.isDisplayed(elements.activatePositionModal.ModalHeader);
	}

	async verfiyActivatePositionModal() {
		expect(await this.baseInstance.isDisplayed(elements.attchResponsibiltyActivatePopup.modalHeader)).toBeFalsy();
	}

	async clickOnDeactivatePositionBtn() {
		await this.baseInstance.clickElement(elements.deActivatePositionModal.Btn, "Click on De-Activate Position Btn");
		await this.baseInstance.waitForElementToDisappear(elements.deActivatePositionModal.Btn);
	}

	async clickOnReactivatePositionBtn() {
		await this.baseInstance.clickElement(elements.reActivatePositionModal.Btn, "Click on Activate Position Btn");
		expect(await this.baseInstance.isDisplayed(elements.veirfyLoaderActionsIcons)).toBeTruthy();
		await this.baseInstance.waitForElementToDisappear(elements.reActivatePositionModal.Btn);
	}

	async clickOnRetiredPositionBtn() {
		await this.baseInstance.clickElement(elements.retiredPositionModal.Btn, "Click on Retired Position Btn");
		expect(await this.baseInstance.isDisplayed(elements.veirfyLoaderActionsIcons)).toBeTruthy();
		await this.baseInstance.waitForElementToDisappear(elements.retiredPositionModal.Btn);
	}

	async verifyMenuItemsOnPositionModal() {
		await this.baseInstance.isDisplayed(elements.positionModal);
	}

	async verifyRolesAttachedInMenuItem() {
		await this.baseInstance.isDisplayed(elements.verifyRolesAttached);
	}

	async verifyPositionFilterModal() {
		await this.baseInstance.isDisplayed(elements.filterModal.modalHeader);
		await this.baseInstance.isDisplayed(elements.filterModal.rolesHeader);
		await this.baseInstance.isDisplayed(elements.filterModal.statusHeader);
		await this.baseInstance.isDisplayed(elements.filterModal.occupiedHeader);
	}

	async verifyStatusfilter(statusName: string) {
		const style = await this.baseInstance.getHtmlAttributeByXPath(
			elements.filterModal.statusFilter.option(statusName),
			"style",
		);
		expect(style).toContain("rgb(127, 86, 217)");
	}

	async verifyOtherfilter(name: string, statusName: string) {
		await this.baseInstance.wait(5);
		const style = await this.baseInstance.getHtmlAttributeByXPath(
			elements.filterModal.verifyOtherFilter.option(name, statusName),
			"style",
		);
		expect(style).toContain("rgb(127, 86, 217)");
	}

	async verifyfilterNotSelected(name: string, statusName: string) {
		const style = await this.baseInstance.getHtmlAttributeByXPath(
			elements.filterModal.verifyOtherFilter.option(name, statusName),
			"style",
		);
		expect(style).not.toContain("rgb(127, 86, 217)");
	}

	async applyStatusfilter(statusName: string) {
		await this.baseInstance.waitForElement(elements.filterModal.statusHeader);
		await this.baseInstance.clickElement(
			elements.filterModal.statusFilter.option(statusName),
			"Click on the status filter",
		);
	}

	async saveTheFilter() {
		await this.baseInstance.waitForElement(elements.filterModal.saveFilter);
		await this.baseInstance.clickElement(elements.filterModal.saveFilter, "Save filter");
	}

	async applyOtherfilter(name: string, statusName: string) {
		await this.baseInstance.waitForElement(elements.filterModal.modalHeader);
		await this.baseInstance.clickElement(
			elements.filterModal.otherFilter.option(name, statusName),
			"Click on the other filter",
		);
	}

	async clickfilterBtn() {
		await this.baseInstance.waitForElement(elements.filterButton);
		await this.baseInstance.clickElement(elements.filterButton, "click filter button");
	}

	async verifyTheStatusFilter(text: string) {
		await this.baseInstance.wait(5);
		const allStatus = await this.baseInstance.getTextFromAllElements(elements.badge);
		for (const status of allStatus) {
			expect(status).toContain(text);
		}
	}

	async verifyCapacityIcon() {
		await this.baseInstance.wait(7);
		const allPosition = await this.baseInstance.getAllElements(elements.capacityIcon);
		const allCapacity = await this.baseInstance.getAllElements(elements.oneFTECapacity);
		expect(allCapacity.length).toBe(allPosition.length);
	}

	async removeAppliedFilter(name: string) {
		await this.baseInstance.clickElement(elements.filterModal.removeAppliedFilter.option(name), "Remove Filter");
	}

	async verifyClonedPositionVisible(positionName: string) {
		await this.baseInstance.isDisplayed(elements.clonedPosition(positionName));
	}

	async verifyAttachResponsibilityActionDoesNotExist() {
		!(await this.baseInstance.exists(elements.menuPopUpOptions.attachResponsibilityOption));
	}

	async getAllActivePositionCount() {
		let totalPositionCount = 0;
		let activePosition = await this.baseInstance.getAllElements(elements.allActiveBadge);
		let activePositionCount = activePosition.length;
		const maxIterations = 10;
		let iteration = 0;

		while (activePositionCount === 10 && iteration < maxIterations) {
			totalPositionCount += 10;
			await this.baseInstance.waitForElement(elements.nextPageButton);
			await this.baseInstance.clickElement(elements.nextPageButton, "Click on Next Button");
			activePosition = await this.baseInstance.getAllElements(elements.allActiveBadge);
			activePositionCount = activePosition.length;
			iteration++;
		}

		totalPositionCount += activePositionCount;

		return totalPositionCount;
	}

	async getHeaderActivePositionCount() {
		const positionCount = await this.baseInstance.getText(elements.headerActiveBadge);
		return positionCount;
	}

	async getLeftMenuActivePositionCount() {
		const positionCount = await this.baseInstance.getText(elements.leftMenuActiveBadge);
		return positionCount;
	}

	async clickOnClearSearchBtn() {
		await this.baseInstance.clickElement(elements.clearSearchBtn, "Clear Search Btn");
		await this.baseInstance.wait(3);
	}

	async verifyPositionList() {
		await this.baseInstance.isDisplayed(elements.positionList);
	}

	async openSpecificPosition(positionName: string) {
		await this.baseInstance.clickElement(elements.openSpecificPosition(positionName), "Specific Position Name");
	}

	async verifyPathForSpecificPosition() {
		await this.baseInstance.isDisplayed(elements.pathForPostion);
	}

	async clickOnCorrespondingTab() {
		await this.baseInstance.clickElement(elements.organizationPostionTab, "Corresponding Tab");
	}

	async clickCreateAndAttachNewRoleButton() {
		await this.baseInstance.clickElement(
			elements.attachRolePopup.createAndAttachNewRoleButton,
			"Click create and attach role buton",
		);
	}

	async verifyAttachRoleConfirmationModalIsDisplayed(roleName: string) {
		await this.baseInstance.isDisplayed(elements.attachRolePopup.confirmationModal(roleName));
	}

	async verifyAttachRoleConfirmationNotificationIsDisplayed() {
		await this.baseInstance.wait(5);
		await this.baseInstance.isDisplayed(elements.attachRolePopup.confirmationNotification);
	}

	async verifyRoleStatus(roleStatus: string) {
		expect(await this.baseInstance.getText(elements.roleStatus)).toBe(roleStatus);
	}

	async verifyRoleIsAttachedToThePosition(newRoleName: string) {
		await this.baseInstance.isDisplayed(elements.roleAttachedToPosition(newRoleName));
	}

	async clickonAttachedRole() {
		await this.baseInstance.clickElement(elements.attachRoleButton, "Click on Attach Role NAme");
	}

	async verifyRolesDetailsPage() {
		await this.baseInstance.isDisplayed(elements.attachRoleDetailsHeader);
	}

	async verifyBreadCrumbForRoleDeatils(value: string) {
		await this.baseInstance.waitForElement(elements.attachRoleDetailsBreadcrumbs);
		const getBreadcrumbText = await this.baseInstance.getText(elements.attachRoleDetailsBreadcrumbs);
		expect(getBreadcrumbText).toBeDefined();
		expect(getBreadcrumbText).not.toBeNull();
		const normalizedBreadcrumb = getBreadcrumbText.toLowerCase().replace(/\s+/g, " ").trim();
		const normalizedValue = value.toLowerCase();
		if (normalizedValue === "responsibility") {
			const isValid = normalizedBreadcrumb.includes("responsibility") || normalizedBreadcrumb.includes("role");
			expect(isValid).toBeTruthy();
		} else {
			expect(normalizedBreadcrumb).toContain(normalizedValue);
		}
	}

	async clickOnTheFirstRoleAttached() {
		await this.baseInstance.waitForElement(elements.expandRole);
		await this.baseInstance.clickElement(elements.expandRole, "Expand Role Button Click");
	}

	async getAllTheCodeAndVerify(value: string) {
		const getAllCodes = await this.baseInstance.getTextFromAllElements(elements.getAllCodes);
		for (const element of getAllCodes) {
			expect(element).toContain(value);
		}
	}

	async verifyattachedResponsibilityIcon() {
		await this.baseInstance.isDisplayed(elements.expandedResposbilityIcon);
	}

	async clickOnAttachedRoleName() {
		await this.baseInstance.clickElement(elements.attachedRoleName, "Click on the attach Role btn");
	}

	async clickOnAttachedResponsibilityName(responsibilityName: string) {
		await this.baseInstance.clickElement(
			elements.attachedResponsibilityName(responsibilityName),
			"Click on the attach Responsibility btn",
		);
	}

	async verifyResponsibilityDetailsHeader() {
		await this.baseInstance.isDisplayed(elements.responsibilityDeatilsHeader);
	}

	async getActiveAttachRolesCount() {
		const positionCount = await this.baseInstance.getText(elements.attachRolesActiveCount);
		return positionCount;
	}

	async getSuggestionList() {
		return this.baseInstance.getElementCount(elements.suggestionList);
	}
	async openPositionTab(tab: string) {
		switch (tab.toLowerCase()) {
			case "description":
				await this.baseInstance.clickElementByRole("tab", "Description");
				break;
			case "checklist":
				await this.baseInstance.clickElementByRole("tab", "Roles Attached");
				break;
			case "assignments":
				await this.baseInstance.clickElementByRole("tab", "Assignments");
				break;
			case "chatter":
				await this.baseInstance.clickElementByRole("tab", "Chatter");
				break;
		}

		await this.baseInstance.wait(5);
	}

	async verifyChatterRecords() {
		await this.baseInstance.clickElement(elements.chatterTable, "chatter is visible");
	}

	async verifyChatterRecordsToday() {
		await this.baseInstance.clickElement(elements.chatterTableRecordsToday, "chatter today records visible");
	}

	async verifyChatterCountTab() {
		await this.baseInstance.isDisplayed(elements.chatterCountTab);
	}

	async verifyAttachRoleModalAppears() {
		expect(await this.baseInstance.isDisplayed(elements.attachRoleModal)).toBeTruthy();
	}

	async verifyCloneofClonedPositionVisible(positionName: string) {
		await this.baseInstance.isDisplayed(elements.cloneOfClonedPosition(positionName));
	}

	async clickOnAttachRoleBtn() {
		await this.baseInstance.clickElement(elements.attachRoleBtn, "Click on Attach Role Button");
		await this.baseInstance.wait(2);
	}

	async clickOnRoleDataCard() {
		await this.baseInstance.clickElement(elements.roleDataCard, "Click on role data card");
	}

	async verifyDetachModal() {
		expect(await this.baseInstance.isDisplayed(elements.verifyDetachModal)).toBeTruthy();
	}

	async displayAttachmentsPopup() {
		await this.baseInstance.isDisplayed(elements.attachmentsPopup);
	}

	async clickOnCloseIcon() {
		await this.baseInstance.clickElement(elements.clickOnCloseIcon, "close the modal");
	}

	async attachmentsPopupNotVisible() {
		!(await this.baseInstance.isDisplayed(elements.attachmentsPopup));
	}

	async clickOnDetachPosition() {
		await this.baseInstance.clickElement(elements.detachPosition, "click on detach position");
	}

	async verifyAttachRoleBtnIsDisplayed() {
		await this.baseInstance.isDisplayed(elements.attachRoleBtnIsDisplayed);
	}

	async verifyColorRowsForPositions(status: string) {
		const activeBg = "background-color: rgb(236, 253, 243)";
		const draftBg = "background-color: rgb(249, 250, 251);";

		if (status === "Active") {
			const rowSelector = "//span[normalize-space()='active']/../../../parent::tr";
			const value = await this.baseInstance.getHtmlAttributeByXPath(rowSelector, "style");
			expect(value).toContain(activeBg);
		} else if (status === "Draft") {
			const rowSelector = "//span[normalize-space()='draft']/../../../parent::tr";
			const value = await this.baseInstance.getHtmlAttributeByXPath(rowSelector, "style");
			expect(value).toContain(draftBg);
		}
	}

	async verifyHoverOverPosition() {
		await this.baseInstance.hoverOverElement(elements.hoverOverPosition);
	}

	async verifyPositionNameNotHyperlinked(position) {
		!(await this.baseInstance.isDisplayed(elements.positionName(position)));
	}

	async verifyAttachedRolesList() {
		await this.baseInstance.isDisplayed(elements.attachedRolesList);
	}

	async verfyRolesActionDropDown() {
		await this.baseInstance.isDisplayed(elements.rolesActionDropDown);
	}

	async hoverOverThreeDotsMenu() {
		await this.baseInstance.hoverOverElement(elements.hoverOverThreeDotMenuButton);
	}

	async verifyOptions(option: string) {
		!(await this.baseInstance.isDisplayed(elements.threeDotMenuPopUpOptions.option(option)));
	}

	async attachedRolesThreeDotMenu() {
		await this.baseInstance.clickElement(elements.attachedRolesThreeDotMenu, "Click On Menu button");
	}

	async verifyAttachRoleBtnDisplayed() {
		await this.baseInstance.isDisplayed(elements.attachRoleButton);
	}

	async verifyNoRolesAttachedTextVisible() {
		await this.baseInstance.isDisplayed(elements.noRolesAttachedText);
	}

	async verifyNoAttachedRolesFoundText() {
		await this.baseInstance.isDisplayed(elements.verifyNoAttachedRolesFoundText);
	}

	async verfiyRolesAttachedOrganizationIsVisible(expectedCount: string) {
		expect(
			await this.baseInstance.isDisplayed(elements.verfiyRolesAttachedOrganizationIsVisible(expectedCount)),
		).toBeFalsy();
	}

	async getRolesAttachedOrganizationCount() {
		const rolesAttachedElement = "//div[contains(text(), 'Roles attached Organization')]";
		const rolesText = await this.baseInstance.getText(rolesAttachedElement);
		// Extract the number from text like "Roles attached Organization 7 Active"
		const match = rolesText.match(/(\d+)\s+(active|Active)/i);
		return match ? parseInt(match[1]) : 0;
	}

	async verifyRolesAttachedCountIsNotZero() {
		const count = await this.getRolesAttachedOrganizationCount();
		expect(count).toBeGreaterThan(0);
	}

	async verifyNoAttachedRolesFoundIsVisible() {
		expect(await this.baseInstance.isDisplayed(elements.verifyNoAttachedRolesFoundIsVisible)).toBeTruthy();
	}

	async noPositionFoundTextDisplayed() {
		await this.baseInstance.isDisplayed(elements.noPosFoundText);
	}

	async verifyReadinessValue(readinessValue: number) {
		await this.baseInstance.isDisplayed(elements.readinessValue(readinessValue));
	}
}
