import { BaseClass } from "../../helpers/BaseClass";
import { expect } from "@playwright/test";
import { elements } from "../../xpath/owner/readinessCatalogsRolesPageElements";
import { getRandomRole } from "../../helpers/util/random";
import { trimStringToLength } from "../../helpers/util/basic";
import { apiRoleData } from "../../steps/owner/rolesApiSteps";

export default class ReadinessRolesPage {
	baseInstance: BaseClass;

	constructor(baseInstance: BaseClass) {
		this.baseInstance = baseInstance;
	}

	async verifyRolesSubSectionIsFocused() {
		const ariaSelectedAttribute = await this.baseInstance.getHtmlAttributeByXPath(
			elements.rolesSubMenu,
			"aria-selected",
		);
		expect(ariaSelectedAttribute).toBe("true");
	}

	async rolesTableVerification() {
		await this.baseInstance.isDisplayed(elements.rolesTable);
	}

	async verifyAddRoleButtonIsDisplayed() {
		await this.baseInstance.isDisplayed(elements.addRoleButton);
	}

	async verifyAddRoleButtonIndicator() {
		await this.baseInstance.isDisplayed(elements.addRoleButtonIndicator);
	}

	async verifyReadinessRolesTreeIsDisplayed() {
		await this.baseInstance.isDisplayed(elements.rolesTree);
	}

	async clickAddRoleButton() {
		await this.baseInstance.clickElement(elements.addRoleButton, "Add Role button");
	}

	async verifyAddRoleModalIsDisplayed() {
		await this.baseInstance.isDisplayed(elements.addRoleField);
	}

	async addRole() {
		const responsibility = getRandomRole();
		await this.baseInstance.enterText(elements.addRoleField, apiRoleData.name, "Add responsibility text field");

		return responsibility.name;
	}

	async clickSaveAsDraftButton() {
		await this.baseInstance.wait(2);
		await this.baseInstance.clickElement(elements.saveAsDraftButton, "Save as draft");
		await this.baseInstance.waitForElementToDisappear(elements.saveAsDraftButton);
		await this.baseInstance.wait(8);
	}

	async selectModalActionButton(status) {
		await this.baseInstance.wait(2);
		await this.baseInstance.clickElement(elements.modalActionOption(status), "De-Activate");
		await this.baseInstance.wait(8);
	}

	async deleteModalIsVisible() {
		await this.baseInstance.isDisplayed(elements.deleteRoleModal.modal);
	}

	async renameRoleModalIsVisible() {
		await this.baseInstance.isDisplayed(elements.renameRoleModal.modal);
	}

	async clickOnDetachFromRoleBtn() {
		await this.baseInstance.clickElement(elements.clickOnDetachFromRoleBtn, "click on detach from role");
	}

	async clickOnDetachModalButton() {
		await this.baseInstance.clickElement(elements.clickOnDetachModalButton, "click on Detach");
	}

	async clickOnDetachBtn() {
		await this.baseInstance.clickElement(elements.clickOnDetachBtn, "click on Detach");
	}

	async saveRenamedRole() {
		await this.baseInstance.clickElement(elements.renameRoleModal.btn, "Save the renamed role");
	}

	async renameTheRole(name: string) {
		await this.baseInstance.clearText(elements.renameRoleModal.input, "clear the name");
		await this.baseInstance.wait(2);
		await this.baseInstance.keyboardType(name);
	}

	async confirmDeleteRoleBtn() {
		await this.baseInstance.clickElement(elements.deleteRoleModal.btn, "Click Delete Modal btn");
		await this.baseInstance.wait(5);
	}

	async verifyDeleteAttachedResponsibilityCheckboxIsChecked() {
		await this.baseInstance.wait(2);
		const isChecked = await this.baseInstance.isDisplayed(
			elements.deleteRoleModal.attachedResponsibilityCheckboxChecked,
		);
		expect(isChecked).toBeTruthy();
	}

	async verifyRoleToNotExist(name: string) {
		!(await this.baseInstance.exists(elements.getStatusForARole.option(name)));
	}

	async verifyRoleToExist(name: string) {
		await this.baseInstance.wait(5);
		await this.baseInstance.isDisplayed(elements.rolesTitle.option(name));
	}

	async searchForRoleAndGetBadge(role: string, expectedBadge: string) {
		await this.baseInstance.clearText(elements.searchField, "Clear Search Field");
		await this.baseInstance.waitForElement(elements.badge);
		await this.baseInstance.enterTextsequentially(elements.searchInput, role, "Search Field");
		const draftStatus = await this.baseInstance.getText(elements.badge);
		expect(draftStatus).toContain(expectedBadge);
	}

	async searchForRole(role: string) {
		await this.baseInstance.clickElement(elements.searchInput, "click on search Field");
		await this.baseInstance.clearText(elements.searchInput, "clear Field");
		await this.baseInstance.enterTextsequentially(elements.searchInput, role, "Search Field");
	}

	async verifyReAttachRoleResponsibility(role: string) {
		await this.baseInstance.waitForElement(elements.badge);
		await this.baseInstance.clearText(elements.searchInput, "clear Field");
		await this.baseInstance.enterTextsequentially(elements.searchInput, role, "Search Field");
		await this.baseInstance.clickElement(elements.roleDataCard, "Click on role data card");
		await this.baseInstance.clickElement(elements.clickOnDetachButton, "click on detach button");
	}

	async getRoleStatus(expectedBadge: string) {
		await this.baseInstance.wait(5);
		const draftStatus = await this.baseInstance.getText(elements.badge);
		expect(draftStatus).toContain(expectedBadge);
	}

	async getRoleStatusBadge(status: string) {
		const statusText = status.toLowerCase();
		await this.baseInstance.waitForElement(elements.Rolebadge.status(statusText));
		await this.baseInstance.isDisplayed(elements.Rolebadge.status(statusText));
	}

	async clickActionsButtonForSpecificRole(role: string) {
		await this.baseInstance.clearText(elements.searchInput, "Clear Search Field");
		await this.baseInstance.enterTextsequentially(elements.searchInput, role, "Search Field");
		await this.baseInstance.wait(3);
		await this.baseInstance.clickElement(elements.actionsButton, "Actions button");
	}

	async verifyActionIsDisplayed(action: string) {
		let result: boolean = false;
		switch (action) {
			case "Activate":
				result = await this.baseInstance.isDisplayed(elements.actionsActivateButton);
				break;
			case "Attach Responsibility":
				result = await this.baseInstance.isDisplayed(elements.actionsAttachResponsibilityButton);
				break;
			case "Rename":
				result = await this.baseInstance.isDisplayed(elements.actionsRenameButton);
				break;
			case "Retire":
				result = await this.baseInstance.isDisplayed(elements.actionsRetiredButton);
				break;
		}
		expect(result).toBe(true);
	}

	async verifyDeActivateActionIsDisplayed(status) {
		await this.baseInstance.wait(3);
		await this.baseInstance.isDisplayed(elements.modalActionOption(status));
	}

	async verifyHoverOverSpecificRoles() {
		await this.baseInstance.wait(3);
		await this.baseInstance.isDisplayed(elements.hoverOverSpecificRoles);
	}

	async changeRoleStatus(action) {
		if (action === "Activate") {
			await this.baseInstance.isDisplayed(elements.activateConfirmation);
			await this.baseInstance.clickElement(elements.activateConfirmation, "Activate the Role");
		} else if (action === "De-Activate") {
			const result = await this.baseInstance.isDisplayed(elements.deActivateOptionConfirmation);
			expect(result).toBe(true);
			await this.baseInstance.clickElement(elements.deActivateConfirmation, "De-Activate the Role");
		} else if (action === "Re-Activate") {
			await this.baseInstance.isDisplayed(elements.reActivateConfirmation);
			await this.baseInstance.clickElement(elements.reActivateConfirmation, "Re-Activate the Role");
		}
	}

	async deActiveoptionToNotExist(status) {
		expect(await this.baseInstance.isDisplayed(elements.modalActionOption(status))).toBeFalsy();
	}

	async activateRole() {
		await this.baseInstance.clickElement(elements.actionsButton, "Actions button");
		await this.baseInstance.clickElement(elements.actionsActivateButton, "Actions Activate button");
		await this.baseInstance.clickElement(elements.modalActivateButton, "Activate Modal - Activate button");
		await this.baseInstance.waitForElementToDisappear(elements.modalActivateButton);
	}

	async confirmActionForRole(action: string) {
		await this.baseInstance.clickElement(elements.confirmAction(action), "Confirm the Action for Role");
	}

	async activateAttachResponsobility() {
		await this.baseInstance.clickElement(elements.attchResponsibiltyPopupOptions.activate, "Actions Activate button");
		await this.baseInstance.isDisplayed(elements.attchResponsibiltyActivatePopup.modalHeader);
		await this.baseInstance.clickElement(
			elements.attchResponsibiltyActivatePopup.modalBtn,
			"Activate Modal - Activate button",
		);
		await this.baseInstance.waitForElementToDisappear(elements.attchResponsibiltyActivatePopup.modalBtn);
	}

	async retireAttachResponsobility() {
		await this.baseInstance.clickElement(elements.attchResponsibiltyPopupOptions.retire, "Actions retire button");
		await this.baseInstance.isDisplayed(elements.attchResponsibiltyRetirePopup.modalHeader);
		await this.baseInstance.clickElement(
			elements.attchResponsibiltyRetirePopup.modalBtn,
			"Retire Modal - Retire button",
		);
		await this.baseInstance.waitForElementToDisappear(elements.attchResponsibiltyRetirePopup.modalBtn);
	}

	async deActivateAttachResponsobility() {
		await this.baseInstance.clickElement(
			elements.attchResponsibiltyPopupOptions.deActivate,
			"Actions De-activate button",
		);
		await this.baseInstance.isDisplayed(elements.attchResponsibiltyDeActivatePopup.modalHeader);
		await this.baseInstance.clickElement(
			elements.attchResponsibiltyDeActivatePopup.modalBtn,
			"De-activate  Modal - De-activate button",
		);
		await this.baseInstance.waitForElementToDisappear(elements.attchResponsibiltyDeActivatePopup.modalBtn);
	}

	async clickOnAssignmentModal() {
		await this.baseInstance.clickElement(elements.clickOnAssignmentModal, "click on assignment modal");
	}

	async clickOnCloseIcon() {
		await this.baseInstance.clickElement(elements.clickOnCloseIcon, "close the modal");
	}

	async clickfilterBtn() {
		await this.baseInstance.clickElement(elements.filterButton, "click filter button");
	}

	async verifyCounterIsNotVisible() {
		expect(await this.baseInstance.isDisplayed(elements.verifyCounterIsNotVisible)).toBeFalsy();
	}

	async renameAttachResponsibility(name: string) {
		await this.baseInstance.clickElement(elements.attchResponsibiltyPopupOptions.rename, "Actions Rename button");
		await this.baseInstance.isDisplayed(elements.attachResponsibiltyRenamePopup.modalHeader);
		await this.baseInstance.clearText(elements.attachResponsibiltyRenamePopup.modalinput, "Clear the text");
		await this.baseInstance.enterText(elements.attachResponsibiltyRenamePopup.modalinput, name, "search-input");
		await this.baseInstance.clickElement(
			elements.attachResponsibiltyRenamePopup.modalBtn,
			"Rename Modal - Save button",
		);
		await this.baseInstance.waitForElementToDisappear(elements.attachResponsibiltyRenamePopup.modalBtn);
	}

	async verifynewResponsibilityName(value: string) {
		await this.baseInstance.clickElement(elements.expandRoleWithResponsibility, "Expand the Role");
		await this.baseInstance.wait(3);
		await this.baseInstance.isDisplayed(elements.renameResposnibilityName(value));
	}

	async verifynewAttachedResponsibilityName(value: string) {
		await this.baseInstance.isDisplayed(elements.renameResposnibilityName(value));
	}

	async clickOnFirst3DotMenu() {
		await this.baseInstance.clickElement(elements.clickOnElipssesButton, "Elipsses Button");
	}

	async applyFilter(status: string) {
		const statusLower = status.toLowerCase();
		await this.baseInstance.isDisplayed(elements.filters.filterButton);
		await this.baseInstance.clickElement(elements.filters.filterButton, "Filter Button");

		await this.baseInstance.clickElement(elements.filters.filterOptions(statusLower), "Select Filter Option");
		await this.baseInstance.clickElement(elements.filters.saveFilter, "Save Filter");
	}

	async applyMultipleFilters(stringArray: string[]) {
		await this.baseInstance.isDisplayed(elements.filters.filterButton);
		await this.baseInstance.clickElement(elements.filters.filterButton, "Click Filter Button");

		for (const status of stringArray) {
			await this.baseInstance.clickElement(
				elements.filters.filterOptions(status).toLowerCase(),
				"Select Filter Option",
			);
		}
		await this.baseInstance.clickElement(elements.filters.saveFilter, "Save Filter");
	}

	async verifyFilteredResults(status) {
		await expect(this.baseInstance.getAllElements(elements.filters.filteredResults(status).toLowerCase())).toBeTruthy();
	}

	async verifyMultipleFilteredResults(statusArray: string[]) {
		for (const status of statusArray) {
			await expect(this.baseInstance.isDisplayed(elements.filters.filteredResults(status).toLowerCase())).toBeTruthy();
		}
	}

	async removeStatusFilter(status) {
		await expect(this.baseInstance.isDisplayed(elements.filters.selectedFilter(status).toLowerCase())).toBeTruthy();
		await expect(this.baseInstance.isDisplayed(elements.filters.filteredResults(status).toLowerCase())).toBeTruthy();

		await this.baseInstance.clickElement(elements.filters.removeFilter(status).toLowerCase(), "Remove Selected Filter");
	}

	async verifyFilterRemoved(status) {
		await !this.baseInstance.isDisplayed(elements.filters.selectedFilter(status).toLowerCase());
	}

	async getAllActiveRolesCount(badge: string) {
		let totalPositionCount = 0;
		const activePosition = await this.baseInstance.getAllElements(elements.statusBadge(badge));
		let activePositionCount = activePosition.length;
		while (activePositionCount >= 10) {
			totalPositionCount = totalPositionCount + 10;
			await this.baseInstance.clickElement(elements.nextPageButton, "Click on Next Button");
			await this.baseInstance.waitForElement(elements.badge);
			const activePosition = await this.baseInstance.getAllElements(elements.badge);
			activePositionCount = activePosition.length;
		}
		totalPositionCount = totalPositionCount + activePositionCount;

		return totalPositionCount;
	}

	async getActiveRolesHeaderCount() {
		return await this.baseInstance.getTextContent(elements.activeRoleHeaderCount);
	}

	async clickOnThreeDotMenuForAttached() {
		await this.baseInstance.clickElement(elements.expandRoleWithResponsibility, "Expand the Role");
		await this.baseInstance.clickElement(elements.secoundThreeDotMenu, "Click on the Responsibility Attached");
	}

	async expandRole() {
		await this.baseInstance.clickElement(elements.expandRoleWithResponsibility, "Expand the Role");
	}

	async clickOnThreeDotMenuOfResponsibility() {
		await this.baseInstance.clickElement(
			elements.attachedResponsibilityThreeDot,
			"Click on the Responsibility Attached",
		);
	}

	async verifyStatusForAttachResponsibility(status) {
		await this.baseInstance.clickElement(elements.expandRoleWithResponsibility, "Expand the Role");
		const draftStatus = await this.baseInstance.getText(elements.secoundBadge);
		expect(draftStatus).toContain(status);
	}

	async verifyStatusOfAttachedResponsibility(status) {
		const draftStatus = await this.baseInstance.getText(elements.attachedResponsibilityBadge);
		expect(draftStatus).toContain(status);
	}

	async selectOptionFromThreeDotMenu(option: string) {
		await this.baseInstance.clickElement(elements.roleThreeDotMenuOptions.option(option), "select option from menu");
	}

	async optionFromThreeDotMenuVisible(option: string) {
		await this.baseInstance.isDisplayed(elements.roleThreeDotMenuOptions.option(option));
	}

	async clickOnConfirmButton() {
		await this.baseInstance.clickElement(elements.confirmButton, "Click on confirm button");
	}

	async clickOnAttachResponsibilityButton() {
		await this.baseInstance.clickElement(elements.attachResponsibilityButton, "Click on attach responsibility button");
	}

	async clickOnAttachButtonResponsibility() {
		await this.baseInstance.clickElement(elements.attachButtonResponsibility, "Click on attach responsibility button");
	}

	async selectRole(name: string) {
		await this.baseInstance.wait(5);
		await this.baseInstance.enterTextsequentially(elements.searchField, name, "Search for Role");
		await this.baseInstance.clickElement(elements.firstRole, name);
	}

	async clickOntheFirst3DotMenu() {
		await this.baseInstance.clickElement(elements.firstThreeDotMenu, "Click on first Three Dot menu");
	}

	async clickAttachResponsibilityButton() {
		await this.baseInstance.waitForElement(elements.dropdownSelector);
		await this.baseInstance.waitForElement(elements.attachResponsibilityButton);
		await this.baseInstance.wait(1);
		await this.baseInstance.clickElement(elements.attachResponsibilityButton, "Click on Attach Responsibility");
	}

	async verifyAttachResponsibilityModalIsDisplayed() {
		expect(await this.baseInstance.isDisplayed(elements.attachResponsibilityModal.modal)).toBeTruthy();
	}

	async clickAndVerifyReactiveButton() {
		await this.baseInstance.clickElement(elements.clickAndVerifyReactiveButton, "click the reactive button");
	}

	async clearSearchField() {
		await this.baseInstance.clickElement(elements.searchInput, "Click search field");
		await this.baseInstance.fillText(elements.searchInput, "");
		await this.baseInstance.wait(2);
	}

	async navigateThroughPagesAndExpandTheRole(roleName: string) {
		let roleFound = false;
		await this.baseInstance.waitForPageToLoad();

		const expandable = `//span[@data-testid="obj-card-name" and contains(text(), "${roleName}")]//ancestor::td/div[@class="dx-treelist-text-content"]/preceding-sibling::div`;

		while (roleFound) {
			if (await this.baseInstance.isDisplayed(expandable)) {
				await this.baseInstance.clickElement(expandable, `Expandable button for role: ${roleName}`);
				roleFound = true;
			} else {
				if (!elements.pagination || !elements.pagination.pageNavigationButtons) {
					console.error("Page navigation buttons are not defined.");
					break;
				}

				const pageNavigationButtonsCount = await this.baseInstance.getElementCount(
					elements.pagination.pageNavigationButtons,
				);

				if (typeof pageNavigationButtonsCount !== "number") {
					console.error("Failed to retrieve the number of page navigation buttons.");
					break;
				}

				if (pageNavigationButtonsCount > 0) {
					for (let i = 0; i < pageNavigationButtonsCount; i++) {
						await this.baseInstance.waitForPageToLoad();
						await this.baseInstance.scrollIntoView(elements.pagination.pageNavigationButtons, i + 1);
						await this.baseInstance.clickNthElement(
							elements.pagination.pageNavigationButtons,
							"Page navigation button",
							i + 1,
						);

						if (await this.baseInstance.isVisible(expandable)) {
							await this.baseInstance.clickElement(expandable, `Expandable button for role: ${roleName}`);
							roleFound = true;
							break;
						}
					}
				} else {
					console.error("No page navigation buttons found.");
					break;
				}
			}
		}
	}

	async verifyTheResponsibilityIsAttachedToTheRole(responsibilityName: string) {
		const trimmedName = trimStringToLength(responsibilityName, 10);
		const selectors = [
			`//span[@data-testid='obj-card-name' and contains(text(), "${trimmedName}")]`,
			`//span[@class='object-card-name underlined' and contains(text(), "${trimmedName}")]`,
			`//span[contains(text(), "${trimmedName}")]`,
		];

		let found = false;
		for (const selector of selectors) {
			try {
				if (await this.baseInstance.isDisplayed(selector)) {
					found = true;
					break;
				}
			} catch (error) {
				void error;
			}
		}

		if (!found) {
			try {
				await this.expandRole();
				await this.baseInstance.wait(2);
				found = await this.baseInstance.isDisplayed(selectors[0]);
			} catch (error) {
				void error;
			}
		}

		expect(found).toBeTruthy();
	}

	async attachTheResponsibility(responsibility: string) {
		await this.baseInstance.clickElement(elements.searchForResponsibilityField, "Search for responsibility");
		await this.baseInstance.keyboardType(responsibility);
		const responsibilityXpath = `//div[@role='listitem']//div[normalize-space()='${responsibility}']`;
		if (await this.baseInstance.isDisplayed(responsibilityXpath)) {
			await this.baseInstance.clickElement(responsibilityXpath, "Click responsibility");
		}
		await this.baseInstance.clickElement(elements.attachResponsibilityModal.attachButton, "Click on Attach button");
	}

	async selectTheResponsibility(responsibility: string) {
		await this.baseInstance.clickElement(elements.searchForResponsibilityField, "Search for responsibility");
		await this.baseInstance.keyboardType(responsibility);
		const responsibilityXpath = `//div[@role='listitem']//div[normalize-space()='${responsibility}']`;
		if (await this.baseInstance.isDisplayed(responsibilityXpath)) {
			await this.baseInstance.clickElement(responsibilityXpath, "Click responsibility");
		}
	}

	async clearTheSearchField() {
		await this.baseInstance.clickElement(elements.responsibilityFieldCaret, "Click on caret icon");
		await this.baseInstance.clearText(elements.searchForResponsibilityField, "Search for responsibility");
		await this.baseInstance.clickElement(elements.clearAttachedResponsibility, "Click on cross icon");
	}

	async attachBtnDisabled() {
		await this.baseInstance.expectElementToBeDisabled(elements.attachResponsibilityModal.attachButton);
	}

	async clickOnSearchFieldOfResponsibility() {
		await this.baseInstance.clickElement(elements.searchForResponsibilityField, "Search for responsibility");
		expect(await this.baseInstance.isDisplayed(elements.veirfyLoaderIcons)).toBeTruthy();
	}

	async attachResponsibilityOnTheFly(responsibility: string) {
		await this.baseInstance.clickElement(elements.searchForResponsibilityField, "Search for responsibility");
		await this.baseInstance.keyboardType(responsibility);
		await this.baseInstance.clickElement(
			elements.attachResponsibilityModal.createAndAttachResponsibilityOnTheFlyButton,
			"Click on create and attach new responsibility button",
		);
		const isModalDisplayed = await this.baseInstance.isDisplayed(
			elements.attachResponsibilityModal.attachResponsibilityConfirmationModal(responsibility),
		);
		expect(isModalDisplayed).toBeTruthy();
		await this.clickConfirmationbutton();
		await this.baseInstance.clickElement(elements.attachResponsibilityModal.attachButton, "Click on Attach button");
	}

	async attachResponsibility(responsibiity: string) {
		await this.baseInstance.clickElement(elements.searchForResponsibilityField, "Search for responsibility");
		await this.baseInstance.keyboardType(responsibiity);
		await this.baseInstance.clickElement(
			elements.attachResponsibilityModal.createAndAttachResponsibilityOnTheFlyButton,
			"Click on create and attach new responsibility button",
		);
	}

	async attachResponsibilitytoRole() {
		await this.baseInstance.isDisabled(elements.responsibilityIsAttached);
		await this.baseInstance.wait(10);
	}

	async confirmationModalDisplayed() {
		await this.baseInstance.isDisplayed(elements.confirmationModalForResponsibility);
	}

	async confirmationModalIsNotDisplayed() {
		!(await this.baseInstance.isDisplayed(elements.confirmationModalForResponsibility));
	}

	async clickOutsideConfirmationModal() {
		await this.baseInstance.clickElement(elements.clickOutsideModal, "click outside modal");
		await this.baseInstance.wait(10);
	}

	async clickConfirmationbutton() {
		await this.baseInstance.clickElementByRole("button", "Confirm");
	}

	async verifyResponsibilityConfirmationAlertIsDisplayed() {
		expect(await this.baseInstance.isDisplayed(elements.addedResponsibilityAlert)).toBeTruthy();
	}

	async clickOnTheFirstRole() {
		await this.baseInstance.wait(8);
		while (!(await this.baseInstance.exists(elements.expandRole))) {
			await this.baseInstance.wait(1);
			await this.baseInstance.clickElement(elements.nextPageButton, "click on next");
		}

		await this.baseInstance.clickElement(elements.expandRole, "expandRole btn click");
	}

	async clickOnTheResponsibiityAttachedToRole() {
		await this.baseInstance.clickElement(elements.expandedResponsibility, "CLick on the expanded responsibiity");
	}

	async verifyResponsibilityBreadcrumb() {
		await this.baseInstance.isDisplayed(elements.responsibilityBreadCrumb);
	}

	async verifyRolesBreadcrumb() {
		await this.baseInstance.isDisplayed(elements.roleBreadCrumb);
	}

	async verifyRoleStatus(status: string) {
		await this.baseInstance.isDisplayed(elements.verifyRoleStatus(status).toLowerCase());
	}

	async optionToNotExist(text: string) {
		!(await this.baseInstance.exists(elements.roleThreeDotMenuOptions.option(text)));
	}

	async clickOnTheOption(text: string) {
		await this.baseInstance.clickElement(elements.roleThreeDotMenuOptions.option(text), `Click on ${text}`);
		await this.baseInstance.wait(5);
		if (text === "Retire") {
			await this.baseInstance.isDisplayed(elements.retireRoleModal.modal);
			await this.baseInstance.clickElement(elements.retireRoleModal.btn, "Click Retire Moal btn");
			expect(await this.baseInstance.isDisplayed(elements.veirfyLoaderIcons)).toBeTruthy();
			await this.baseInstance.wait(5);
		}
	}

	async verifyStatusForRole(status: string) {
		await this.baseInstance.wait(5);
		const draftStatus = await this.baseInstance.getText(elements.badge);
		expect(draftStatus).toContain(status);
	}

	async optionTobeVisible(option: string) {
		await this.baseInstance.isDisplayed(elements.roleThreeDotMenuOptions.option(option));
	}

	async typeRoleName(name: string) {
		await this.baseInstance.clickElement(elements.addRolesModal.input, "Click input field");
		await this.baseInstance.keyboardType(name);
		await this.baseInstance.wait(2);
	}

	async typespaces(name: string) {
		await this.baseInstance.clickElement(elements.addRolesModal.input, "Click input field");
		await this.baseInstance.keyboardType(name);
		await this.baseInstance.wait(2);
	}

	async verifyErrorMessage() {
		await this.baseInstance.isDisplayed(elements.roleModalError);
	}

	async clickOnSaveButton() {
		await this.baseInstance.clickElement(elements.addRolesModal.saveBtn, "click on save button");
		await this.baseInstance.wait(2);
		await this.baseInstance.waitForElementToDisappear(elements.addRolesModal.popup);
	}

	async verifyTheResponsibilityIsAttachedToRole(responsibility: string) {
		await this.baseInstance.clearText(elements.searchField, "clear Text");
		await this.baseInstance.enterTextsequentially(elements.searchField, responsibility, "Search Field");
		await this.baseInstance.wait(5);
		const newResponsibility = await this.baseInstance.getText(elements.verifyResponsibilityForRole(responsibility));
		expect(newResponsibility).toBe(responsibility);
	}

	async verifyResponsibilityAttached(responsibility: string) {
		const newResponsibility = await this.baseInstance.getText(elements.verifyResponsibilityForRole(responsibility));
		expect(newResponsibility).toBe(responsibility);
	}

	async clickOnRoleThreeDot() {
		await this.baseInstance.clickElement(elements.actionsButton, "Click On Menu button");
		await this.baseInstance.wait(2);
	}

	async clickSaveBtn() {
		await this.baseInstance.clickElement(elements.saveBtn, "Click on save btn");
	}

	async clickRolesMenu() {
		await this.baseInstance.clickElementByRole("tab", "Roles");
	}

	async searchForRolesAndOpenIt(roles: string) {
		await this.baseInstance.waitForElementToDisappear(elements.saveAsDraftButton);
		await this.baseInstance.enterText(elements.searchField, roles, "Search Field");
		const rolesXpath = `(//span[normalize-space()="${roles}"])[1]`;
		if (await this.baseInstance.isDisplayed(rolesXpath)) {
			await this.baseInstance.clickElement(rolesXpath, "Roles name");
		} else {
			throw `Roles ${roles} was not found in the system`;
		}
		expect(await this.baseInstance.isDisplayed(elements.attachmentTab)).toBeTruthy();
		await this.baseInstance.wait(5);
	}

	async verifyBreadcrumbsForRoles() {
		expect(await this.baseInstance.isDisplayed(elements.breadcrumbComponent.breadcrumbOnRolesPage)).toBeTruthy();
	}

	async verifyChatterCountTab() {
		await this.baseInstance.isDisplayed(elements.chatterCountTab);
	}

	async openRolesTab(tab: string) {
		switch (tab.toLowerCase()) {
			case "chatter":
				await this.baseInstance.clickElementByRole("tab", "Chatter");
				break;
		}

		await this.baseInstance.wait(5);
	}

	async verifyRolesChatterRecords() {
		await this.baseInstance.getAllElements(elements.rolesChatterRecords);
	}

	async verifyResponsibilityAttachedToRole() {
		await this.baseInstance.clickElement(elements.roleAttachments.openRoleAttachmentModal, "Open Role Attachments");
		await this.baseInstance.isDisplayed(elements.roleAttachments.verifyAttachmentModal);
		await this.baseInstance.isDisplayed(elements.roleAttachments.verifyResponsibilityAttached);
	}

	async detachResponsibility() {
		await this.baseInstance.clickElement(elements.roleAttachments.openRoleAttachmentModal, "Open Role Attachments");
		await this.baseInstance.clickElement(
			elements.roleAttachments.detachResponsibility,
			"Detach the Responsibility from Role",
		);
	}

	async verifyResponsibilityDetached() {
		await this.baseInstance.isDisplayed(elements.roleAttachments.openRoleAttachmentModal);
		await this.baseInstance.isDisplayed(elements.roleAttachments.verifyAttachmentModal);
		expect!(await this.baseInstance.isDisplayed(elements.roleAttachments.verifyResponsibilityAttached));
	}

	async verifyRoleAttachmentVisible() {
		await this.baseInstance.isDisplayed(elements.roleAttachments.attachments);
	}

	async verifyRoleAttachmentNotVisible() {
		expect!(await this.baseInstance.isDisplayed(elements.roleAttachments.attachments));
	}

	async searchTheResponsibility(responsibility: string) {
		await this.baseInstance.clickElement(elements.searchForResponsibilityField, "Search for responsibility");
		await this.baseInstance.keyboardType(responsibility);
		const responsibilityXpath = `//div[@role='listitem']//div[normalize-space()='${responsibility}']`;
		if (await this.baseInstance.isDisplayed(responsibilityXpath)) {
			await this.baseInstance.clickElement(responsibilityXpath, "Click responsibility");
		}
	}

	async verifyResponsibilityMarkedWithTick() {
		await this.baseInstance.isDisplayed(elements.responsibilityMarkedWithTick);
	}

	async columnNamesAreDisplayed() {
		await this.baseInstance.isDisplayed(elements.columnNames.firstCol);
		await this.baseInstance.isDisplayed(elements.columnNames.secondCol);
		await this.baseInstance.isDisplayed(elements.columnNames.thirdCol);
		await this.baseInstance.isDisplayed(elements.columnNames.fourthCol);
		await this.baseInstance.isDisplayed(elements.columnNames.fifthCol);
	}

	async previousBtnNotDisplayed() {
		!(await this.baseInstance.isDisplayed(elements.previousButton));
	}

	async previousBtnDisplayed() {
		await this.baseInstance.isDisplayed(elements.previousButton);
	}

	async nextBtnDisplayed() {
		await this.baseInstance.isDisplayed(elements.nextButton);
	}

	async naviagteToLastPage() {
		const activePosition = await this.baseInstance.getAllElements(elements.nextButton);
		const activePositionCount = activePosition.length;
		while (activePositionCount >= 10) {
			await this.baseInstance.clickElement(elements.nextButton, "Click on Next Button");
		}

		!(await this.baseInstance.isDisplayed(elements.nextButton));
	}

	async hoverOverThreeDotsMenu() {
		await this.baseInstance.hoverOverElement(elements.hoverOverThreeDotMenuButton);
	}

	async addResponsibilityBtnVisible() {
		await this.baseInstance.isDisplayed(elements.addResponsibilityBtn);
	}

	async clickOnAttachedResponsibility() {
		await this.baseInstance.clickElement(elements.attachedResponsibility, "Click on the first attached responsibility");
	}

	async verifyDetachFromRoleBtn() {
		const isDetachButtonVisible = await this.baseInstance.isDisplayed(elements.verifyDetachFromRoleBtn);
		expect(isDetachButtonVisible).toBeFalsy();
	}

	async verifyShowModalNotAppear() {
		const isModalVisible = await this.baseInstance.isDisplayed(elements.verifyShowModalNotAppear);
		expect(isModalVisible).toBeFalsy();
	}

	async verifyResponsibilityDropDownAppears() {
		await this.baseInstance.isDisplayed(elements.attachResponsibilityDropDown);
	}

	async verifyResponsibilityDropDownDisappears() {
		!(await this.baseInstance.isDisplayed(elements.attachResponsibilityDropDown));
	}

	async clickOnCaretIcon() {
		await this.baseInstance.clickElement(elements.caretIconToclose, "click on caret icon");
	}

	async clickOnDetachButton() {
		await this.baseInstance.clickElement(elements.clickOnDetachButton, "click on detach button");
		await this.baseInstance.waitForElementToDisappear(elements.clickOnDetachButton);
	}

	async verifyDetachResponsibilityModal() {
		expect(await this.baseInstance.isDisplayed(elements.verifyDetachResponsibilityModal)).toBeTruthy();
	}

	async clickOnCollapseIcon() {
		await this.baseInstance.clickElement(elements.clickOnCollapseIcon, "click on collapse icon");
	}

	async verifyHideLeftNavigation() {
		await this.baseInstance.isDisplayed(elements.notificationBellIcon);
	}

	async clickOnRoleDataCard() {
		await this.baseInstance.clickElement(elements.roleDataCard, "Click on role data card");
	}

	async displayAttachmentsPopup() {
		expect(await this.baseInstance.isDisplayed(elements.attachmentsPopup)).toBeTruthy();
	}

	async clickOnDetachResponsibility() {
		await this.baseInstance.clickElement(elements.clickOnDetachResponsibility, "click on detach the Responsibility");
	}

	async verifyTextInDetachModal() {
		expect(await this.baseInstance.isDisplayed(elements.roleDetachModalText)).toBeTruthy();
	}

	async clearAttachedResponsibilityField() {
		await this.baseInstance.clearText(elements.clearAttachedResponsibility, "clear field");
	}

	async attachedFieldNotEmpty() {
		await this.baseInstance.isDisplayed(elements.clearAttachedResponsibility);
	}

	async reachesRolesPage() {
		await this.baseInstance.clickElement(elements.clickOnRolePag, "click on Role Page");
	}

	async noRolesFoundTextVisible() {
		await this.baseInstance.isDisplayed(elements.noRolesFoundText);
	}

	async clickOnClearSearchBtn() {
		await this.baseInstance.clickElement(elements.clearSearchBtn, "click on clear search");
	}

	async checkpointCounterVisible() {
		await this.baseInstance.isDisplayed(elements.checkpointCounter);
	}

	async verifyDisplayBtn(text: string) {
		await this.baseInstance.isDisabled(elements.verifyDisplayBtn(text));
	}

	async clickOnAddNewWithAiBtn() {
		await this.baseInstance.clickElement(elements.clickOnDisplayBtn, "click on add new iwth ai btn");
	}

	async verfiyAiModaltext(text: string) {
		await this.baseInstance.isDisplayed(elements.verfiyAiModaltext(text));
	}

	async clickOnCreateAndAttachBtn() {
		await this.baseInstance.clickElement(elements.clickOnCreateAndAttachBtn, "click On Create And Attach Btn");
	}

	async selectActivateOption() {
		await this.baseInstance.clickElement(elements.selectActivateOption, "Select the Activate Option");
	}

	async clickOnActivateBtn() {
		await this.baseInstance.clickElement(elements.clickOnActivateBtn, "click On  Activate Btn");
	}

	async activateAttachedDraftResponsibility() {
		await this.baseInstance.clickElement(
			elements.activateAttachedDraftResponsibility,
			"activate Attached Draft Responsibility",
		);
	}

	async skipAttachedDraftResponsibility() {
		await this.baseInstance.clickElement(
			elements.skipAttachedDraftResponsibility,
			"Skip Attached Draft Responsibility",
		);
	}

	async verifyAttachedActivateResponsibilityStatus() {
		await this.baseInstance.isDisplayed(elements.verifyAttachedActivateResponsibilityStatus);
	}
	async verifyAttachedDraftResponsibilitiesStatus() {
		expect(await this.baseInstance.isDisplayed(elements.verifyAttachedDraftResponsibilitiesStatus)).toBeTruthy();
	}

	async reorderResponsibilitiesViaDragAndDrop(): Promise<string[]> {
		await this.baseInstance.wait(2);
		const dragHandles = await this.baseInstance.getAllElements(elements.dragHandles);
		if (dragHandles.length >= 3) {
			const initialOrder = await this.getResponsibilityNames();
			const firstResponsibility = dragHandles[1];
			const secondResponsibility = dragHandles[2];
			await firstResponsibility.dragTo(secondResponsibility);
			await this.baseInstance.wait(3);
			await this.waitForOrderToBeSaved();
			const newOrder = await this.getResponsibilityNames();
			if (JSON.stringify(initialOrder) === JSON.stringify(newOrder)) {
				console.log(
					"⚠️ Warning: Order appears to be the same after drag and drop. The operation might not have been saved.",
				);
			} else {
				console.log("✅ Order successfully changed after drag and drop operation");
			}

			return newOrder;
		} else {
			const responsibilityNames = await this.getResponsibilityNames();
			return responsibilityNames;
		}
	}

	private async getResponsibilityNames(): Promise<string[]> {
		let responsibilityNames: string[] = [];

		const selectors = [
			elements.verifyResponsibilitiesOrder,
			"//span[@data-testid='obj-card-name']",
			"//tbody//tr//span[contains(@class, 'obj-card-name') or contains(@data-testid, 'obj-card-name')]",
		];

		for (const selector of selectors) {
			try {
				responsibilityNames = await this.baseInstance.getTextFromAllElements(selector);
				if (responsibilityNames.length > 0) {
					break;
				}
			} catch (error) {
				console.log(`Selector failed: ${selector}`);
			}
		}

		const trimmedNames = responsibilityNames.slice(0, 3).map((name) => name.trim());
		return trimmedNames;
	}

	private async waitForOrderToBeSaved(): Promise<void> {
		try {
			const loadingSelectors = [
				"//div[contains(@class, 'loading')]",
				"//div[contains(@class, 'spinner')]",
				"//div[contains(@class, 'progress')]",
				"//div[contains(@class, 'saving')]",
			];

			for (const selector of loadingSelectors) {
				try {
					await this.baseInstance.waitForElementToDisappear(selector);
				} catch (error) {
					console.log(`Loading indicator disappeared: ${selector}`);
				}
			}
		} catch (error) {
			console.log("No loading indicators found or already disappeared");
		}
		await this.baseInstance.wait(2);
	}

	async verifyElementOrder(expectedOrder: string[], description: string = "Elements"): Promise<void> {
		await this.baseInstance.wait(3);
		const foundResponsibilities: string[] = [];
		for (const expectedName of expectedOrder) {
			try {
				const dynamicXpath = elements.specificResponsibilityByName(expectedName);
				const elementExists = await this.baseInstance.isDisplayed(dynamicXpath);
				if (elementExists) {
					foundResponsibilities.push(expectedName);
				} else {
					console.log(`❌ Responsibility not found: "${expectedName}"`);
				}
			} catch (error) {
				console.log(`Error finding responsibility "${expectedName}": ${error}`);
			}
		}

		if (foundResponsibilities.length !== expectedOrder.length) {
			await this.verifyElementOrderAlternative(expectedOrder, description);
			return;
		}
		for (let i = 0; i < expectedOrder.length; i++) {
			const expectedName = expectedOrder[i];
			const foundName = foundResponsibilities[i];

			if (expectedName !== foundName) {
				throw new Error(
					`${description} elements are not in the expected order.\nExpected: ${expectedOrder.join(", ")}\nFound: ${foundResponsibilities.join(", ")}`,
				);
			}
		}
	}

	async verifyElementOrderAlternative(expectedOrder: string[], description: string = "Elements"): Promise<void> {
		let allElements: string[] = [];
		const selectors = [
			"//tbody//tr[@aria-level='2']//span[@data-testid='obj-card-name']",
			"//span[@data-testid='obj-card-name']",
			"//tbody//tr//span[contains(@class, 'obj-card-name') or contains(@data-testid, 'obj-card-name')]",
		];

		for (const selector of selectors) {
			try {
				allElements = await this.baseInstance.getTextFromAllElements(selector);
				if (allElements.length > 0) {
					break;
				}
			} catch (error) {
				console.log(`Selector failed: ${selector}`);
			}
		}

		const trimmedElements = allElements.map((text) => text.trim());

		const foundOrder: string[] = [];
		for (const expectedName of expectedOrder) {
			const index = trimmedElements.findIndex((name) => name === expectedName);
			if (index !== -1) {
				foundOrder.push(expectedName);
			}
		}

		if (foundOrder.length !== expectedOrder.length) {
			throw new Error(
				`Not all expected ${description} were found.\nExpected: ${expectedOrder.join(", ")}\nFound: ${foundOrder.join(", ")}\nAll elements on page: ${trimmedElements.join(", ")}`,
			);
		}

		for (let i = 0; i < expectedOrder.length; i++) {
			if (foundOrder[i] !== expectedOrder[i]) {
				throw new Error(
					`${description} elements are not in the expected order.\nExpected: ${expectedOrder.join(", ")}\nActual: ${foundOrder.join(", ")}\nAll elements on page: ${trimmedElements.join(", ")}`,
				);
			}
		}
	}

}
