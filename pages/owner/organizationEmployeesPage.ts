import { expect, Locator } from "@playwright/test";
import { BaseClass } from "../../helpers/BaseClass";
import { elements } from "../../xpath/owner/organizationEmployeesPageElements";
import { addedEmployeeData } from "../../steps/owner/employeeApiSteps";

export default class OrganizationEmployeesPage {
	baseInstance: BaseClass;
	reports = [];
	reportData = [];

	constructor(baseInstance: BaseClass) {
		this.baseInstance = baseInstance;
	}

	async enterSearchKeyword(keyword: string) {
		await this.baseInstance.clickElement(elements.searchInput, "Search Input");
		await this.baseInstance.enterText(elements.searchInput, keyword, "Search Keyword");
		await this.baseInstance.wait(8);
	}

	async getHeaderText() {
		return await this.baseInstance.getText(elements.header.employeesHeading);
	}

	async addEmployeeBtnIsDisplayed() {
		return await this.baseInstance.isDisplayed(elements.addEmployeeBtn);
	}

	async employeeListIsDisplayed() {
		await this.baseInstance.waitForElement(elements.employeeTable.dataTable);
		return await this.baseInstance.isDisplayed(elements.employeeTable.dataTable);
	}

	async noEmployeesFoundHeadingIsDisplayed() {
		return await this.baseInstance.isDisplayed(elements.employeeTable.dataTable);
	}

	async clickOnAddEmployeeBtn() {
		await this.baseInstance.clickElement(elements.addEmployeeBtn, "+ Add Employee Button");
	}

	async enterFirstName(firstName: string) {
		await this.baseInstance.enterText(elements.addEmployeeModal.firstNameInput, firstName, "Employee First Name input");
		await this.baseInstance.wait(2);
	}

	async enterLastName(lastName: string) {
		await this.baseInstance.enterText(elements.addEmployeeModal.lastNameInput, lastName, "Employee Last Name input");
		await this.baseInstance.wait(2);
	}

	async enterTitle(title: string) {
		await this.baseInstance.enterText(elements.addEmployeeModal.titleInput, title, "Employee Title input");
		await this.baseInstance.wait(2);
	}

	async updateFirstName(firstName: string) {
		await this.baseInstance.waitForElement(elements.editEmployeeModal.firstNameInput);
		await this.baseInstance.clearText(elements.editEmployeeModal.firstNameInput, "Clear First Name input");
		await this.baseInstance.enterText(
			elements.editEmployeeModal.firstNameInput,
			firstName,
			"Employee First Name input",
		);
		await this.baseInstance.wait(1);
	}

	async updateLastName(lastName: string) {
		await this.baseInstance.waitForElement(elements.editEmployeeModal.lastNameInput);
		await this.baseInstance.clearText(elements.editEmployeeModal.lastNameInput, "Clear Last Name input");
		await this.baseInstance.enterText(elements.editEmployeeModal.lastNameInput, lastName, "Employee Last Name input");
		await this.baseInstance.wait(1);
	}

	async updateTitle(title: string) {
		await this.baseInstance.waitForElement(elements.editEmployeeModal.titleInput);
		await this.baseInstance.clearText(elements.editEmployeeModal.titleInput, "Clear Title input");
		await this.baseInstance.enterText(elements.editEmployeeModal.titleInput, title, "Employee Title input");
		await this.baseInstance.wait(1);
	}

	async clickSaveBtn() {
		await this.baseInstance.clickElement(elements.editEmployeeModal.saveBtn, "Save Button");
		await this.baseInstance.wait(2);
		await this.baseInstance.waitForPageToLoad();
	}

	async clickOnEditEmployeeSaveBtn() {
		await this.baseInstance.clickElement(elements.editEmployeeModal.editEmployeeSaveBtn, "Save Button");
		await this.baseInstance.wait(2);
		await this.baseInstance.waitForPageToLoad();
	}

	async getFirstEmployeeName() {
		return await this.baseInstance.getText(elements.firstEmployeeFullName);
	}

	async getFirstEmployeeTitle() {
		return await this.baseInstance.getText(elements.firstEmployeeTitle);
	}

	async editEmployee() {
		await this.baseInstance.waitForElement(elements.firstEmployeeEllipsis);
		await this.clickEmployeeEllipsisMenu();
		await this.baseInstance.clickElement(elements.menuPopUpOptions.edit, "Edit Employee option");
		await this.baseInstance.wait(5);
	}

	async clickEmployeeEllipsisMenu() {
		await this.baseInstance.clickElement(elements.firstEmployeeEllipsis, "Employee Ellipsis menu");
	}

	async getEmployeeEllipsisMenuOptions() {
		return await this.baseInstance.getAllElements(elements.firstEmployeeEllipsisMenu);
	}

	async clickOnMenuForActiveStatusEmployee() {
		return await this.baseInstance.clickElement(elements.menuOptionClick.active, "Active Employee Ellipsis menu");
	}

	async clickOnMenuForDraftStatusEmployee() {
		await this.baseInstance.waitForElement(elements.firstEmployeeEllipsis);
		await this.baseInstance.wait(8);
		while (!(await this.baseInstance.exists(elements.menuOptionClick.draft))) {
			await this.baseInstance.wait(1);
			await this.baseInstance.clickElement(elements.nextPageButton, "click on next");
		}
		return await this.baseInstance.clickElement(elements.menuOptionClick.draft, "Active Employee Ellipsis menu");
	}

	async clickOnMenuForChangeProfilePictureOfEmployee() {
		return await this.baseInstance.clickElement(
			elements.menuPopUpOptions.changePicture,
			"Click change profile picture",
		);
	}

	async terminateEmployeeOptionIsDisplayed() {
		return await this.baseInstance.isDisplayed(elements.menuPopUpOptions.terminate);
	}

	async activateEmployeeOptionIsDisplayed() {
		return await this.baseInstance.isDisplayed(elements.menuPopUpOptions.activate);
	}

	async deleteEmployeeOptionIsDisplayed() {
		return await this.baseInstance.isDisplayed(elements.menuPopUpOptions.Delete);
	}

	async reActivateEmployeeOptionIsDisplayed() {
		return await this.baseInstance.isDisplayed(elements.menuPopUpOptions.reActivate);
	}

	async editEmployeeOptionIsDisplayed() {
		return await this.baseInstance.isDisplayed(elements.menuPopUpOptions.edit);
	}

	async changePictureOfEmployeeOptionIsDisplayed() {
		return await this.baseInstance.isDisplayed(elements.menuPopUpOptions.changePicture);
	}

	async clickOnTerminateEmployeeOption() {
		await this.baseInstance.clickElement(elements.menuPopUpOptions.terminate, "Click on Terminate Employee Option");
		await this.baseInstance.clickElement(
			elements.terminateEmployeeModal.terminateBtn,
			"Click on Terminate Employee Option",
		);
		await this.baseInstance.wait(2);
	}

	async clickOnTerminateBtn() {
		await this.baseInstance.clickElement(
			elements.terminateEmployeeModal.terminateBtn,
			"Click on Terminate Employee Option",
		);
	}

	async termoinatedStatusDisplayed() {
		return await this.baseInstance.isDisplayed(elements.currentStatus.terminated);
	}

	async activeStatusDisplayed() {
		return await this.baseInstance.isDisplayed(elements.currentStatus.active);
	}

	async verifyAssignToButtonDisplayed() {
		return await this.baseInstance.isDisplayed(elements.assignToButtonDisplayed);
	}

	async verifyAssignToPositionDisplayed() {
		await this.baseInstance.isDisplayed(elements.assignToPositionDisplayed);
	}

	async verifyAssignToPositionNotDisplayed() {
		!(await this.baseInstance.isDisplayed(elements.assignToPositionDisplayed));
	}

	async terminatedStatusDisplayed() {
		return await this.baseInstance.isDisplayed(elements.currentStatus.terminated);
	}

	async clickAssignToEmployee(employeeName: string, expectedDate?: string) {
		await this.baseInstance.clickElement(
			elements.clickAssignToEmployee(employeeName),
			"click on assign to employee button",
		);
		await this.baseInstance.waitForElement(elements.assignToEmployeeEffectiveOnDate(expectedDate));
		expect(await this.baseInstance.isDisplayed(elements.assignToEmployeeEffectiveOnDate(expectedDate))).toBeTruthy();
	}

	async verifyAssignToEmployeeBtnVisible() {
		await this.baseInstance.isDisplayed(elements.assignPositionBtn);
	}

	async deleteTheDraftStatusEmployee() {
		await this.baseInstance.clickElement(elements.menuPopUpOptions.Delete, "Draft Employee Ellipsis menu");
		await this.baseInstance.clickElement(elements.deleteEmployeeModal.deleteBtn, "Click on Terminate Employee Option");
		await this.baseInstance.wait(2);
	}

	async clickOnDeleteBtn() {
		await this.baseInstance.clickElement(elements.deleteEmployeeModal.deleteBtn, "Click on Terminate Employee Option");
	}

	async getTheMenuOptionsAndVerifyToNotInclude(optionValue: string) {
		const allOptions = await this.baseInstance.getAllElements(elements.menuOptionClick.allOptions);
		for (const option in allOptions) {
			const text = await this.baseInstance.getText(option);
			expect(text).not.toEqual(optionValue);
		}
	}

	async getTheEmployeeNamesAndVerifyToNotInclude(optionValue: string) {
		const allOptions = await this.baseInstance.getAllElements(elements.employeeTable.names);
		for (const option in allOptions) {
			const text = await this.baseInstance.getText(option);
			expect(text).not.toEqual(optionValue);
		}
	}

	async clickOnMenuForTerminatedStatusEmployee() {
		await this.baseInstance.waitForElement(elements.firstEmployeeEllipsis);
		await this.baseInstance.wait(2);
		while (!(await this.baseInstance.exists(elements.menuOptionClick.terminated))) {
			await this.baseInstance.wait(1);
			await this.baseInstance.clickElement(elements.nextPageButton, "click on next");
		}
		return await this.baseInstance.clickElement(elements.menuOptionClick.terminated, "Active Employee Ellipsis menu");
	}

	async reActivateTheTerminatedStatusEmployee() {
		await this.baseInstance.clickElement(elements.menuPopUpOptions.reActivate, "Click reActive Employee Ellipsis menu");
		await this.baseInstance.clickElement(
			elements.reActivateEmployeeModal.reActivateBtn,
			"Click on reActive Employee Option",
		);
		await this.baseInstance.wait(2);
	}

	async clickOnReActivateBtn() {
		await this.baseInstance.clickElement(
			elements.reActivateEmployeeModal.reActivateBtn,
			"Click on reActive Employee Option",
		);
	}

	async clickOnActivatePositionBtn() {
		await this.baseInstance.clickElement(elements.activateEmployeeModal.activateBtn, "Click on Active Employee Option");
	}

	async activateTheTerminatedStatusEmployee() {
		await this.baseInstance.clickElement(elements.menuPopUpOptions.activate, "Click Active Employee Ellipsis menu");
		await this.baseInstance.clickElement(elements.activateEmployeeModal.activateBtn, "Click on Active Employee Option");
		await this.baseInstance.wait(2);
	}

	async clickOnActivateBtn() {
		await this.baseInstance.clickElement(elements.activateEmployeeModal.activateBtn, "Click on Active Employee Option");
		await this.baseInstance.wait(2);
	}

	async changePictureForEmployee() {
		await this.baseInstance.uploadFile(
			elements.changeProfilePictureForTheEmplyee.uploadImageInput,
			"./helpers/upload/the_pic.jpg",
		);

		await this.baseInstance.wait(5);
	}

	async verifyPictureIsShownInTable() {
		expect(await this.baseInstance.isDisplayed(elements.employeeTable.employeePicture)).toBeTruthy();
		expect(await this.baseInstance.getHtmlAttributeByXPath(elements.employeeTable.employeePicture, "alt")).toContain(
			"employee profile picture",
		);
	}

	async verifyPictureIsNotShownInTable() {
		expect(await this.baseInstance.isDisplayed(elements.employeeTable.employeePicture)).toBeFalsy();
	}

	async clickOnFilterOption() {
		await this.baseInstance.wait(6);
		await this.baseInstance.waitForElement(elements.filterEmpolyeeButton);
		await this.baseInstance.clickElement(elements.filterEmpolyeeButton, "click on the Filter Employee Button");
		await this.baseInstance.wait(2);
	}

	async applyStatusFilterForEmployees(filterType: string, filterName: string) {
		await this.baseInstance.clickElement(
			elements.filterForEmployee.applyStatusFilter.option(filterType, filterName),
			"Apply the filter",
		);
	}

	async applyFilterForEmployees(filterType: string, filterName: string) {
		await this.baseInstance.clickElement(
			elements.filterForEmployee.applyTheFilter.option(filterType, filterName),
			"Apply the filter",
		);
	}

	async clickOnSaveFilterForEmployeeButton() {
		await this.baseInstance.clickElement(
			elements.filterForEmployee.saveFilterButton,
			"Save the Applied Filter for the Employee",
		);
		await this.baseInstance.wait(2);
	}

	async verifyTheStatusForTheAllEmployeeToBe(statusValue: string) {
		await this.baseInstance.wait(2);
		const employees = await this.baseInstance.getAllElements(elements.statusForAllEmployees);
		if (employees.length != 0) {
			for (const employee of employees) {
				const currentStatus = await employee.textContent();
				expect(currentStatus).toBe(statusValue);
			}
		}
	}

	async verifyFilterModalPopUp() {
		await this.baseInstance.isDisplayed(elements.filterForEmployee.filterModal);
		const FilterPopupTiltle = await this.baseInstance.getText(elements.filterForEmployee.filterPopupHeader);
		expect(FilterPopupTiltle).toBe("Filter Employee Organization");
	}

	async verifyNoFilterShouldBeAppliedFor(filterType: string) {
		const expectedStyle = "color: rgb(127, 86, 217)";
		const styleAttribute = await this.baseInstance.getHtmlAttributeByXPath(
			elements.filterForEmployee.NoFilterOptionFor.option(filterType),
			"style",
		);
		expect(styleAttribute).toContain(expectedStyle);
	}

	async verifyNoFilterShouldNotBeAppliedFor(filterType: string) {
		await this.baseInstance.wait(2);
		const styleAttribute = await this.baseInstance.getHtmlAttributeByXPath(
			elements.filterForEmployee.NoFilterOptionFor.option(filterType),
			"style",
		);
		expect(styleAttribute).toBeNull();
	}

	async verifyTheAppliedFilters(filterType: string) {
		await this.baseInstance.isDisplayed(elements.filterForEmployee.appliedFilterCheck.option(filterType));
	}

	async removeTheAppliedFilter(filterType: string) {
		await this.baseInstance.clickElement(
			elements.filterForEmployee.removeAppliedFilter.option(filterType),
			"Remove the Applied Filter ",
		);
	}

	async verifyTheAvailabilityForAllTheEmplyeeToBe(value: string) {
		const allEmployeees = await this.baseInstance.getAllElements(elements.availabilityButton);
		if (allEmployeees.length != 0) {
			for (const employee of allEmployeees) {
				await employee.click();
				const hasClass = await this.baseInstance.getHtmlAttributeByXPath(
					elements.employeeAvailabilityTo.option(value),
					"class",
				);
				expect(hasClass).toContain("v-item--active");
				await this.baseInstance.wait(2);
			}
		}
	}

	async verifyTheNameForTheEmployees(expectedName: string) {
		await this.baseInstance.waitForElement(elements.allEmployeesNames);
		const allEmployeees = await this.baseInstance.getAllElements(elements.allEmployeesNames);
		if (allEmployeees.length == 0) {
			await this.baseInstance.wait(10);
		}
		expect(allEmployeees.length).toBeGreaterThan(0);
		for (const employee of allEmployeees) {
			await expect(employee).toContainText(expectedName);
		}
	}

	async verifyEmployeeNamenotDisplayed(name: string) {
		!(await this.baseInstance.isDisplayed(elements.employeeName(name)));
	}

	async verifyEmployeeNameDisplayed(name: string) {
		await this.baseInstance.isDisplayed(elements.employeeName(name));
	}

	async confirmationMessageWithEmployeeName(name: string) {
		expect(await this.baseInstance.isDisplayed(elements.confirmationMessageWithEmployeeName(name))).toBeTruthy();
	}

	async verifyNameToExist(name: string) {
		await this.baseInstance.isDisplayed(elements.employeeName(name));
	}

	async verifySearchText(text: string) {
		await this.baseInstance.wait(5);
		const searchText = await this.baseInstance.getText(elements.searchInput);
		expect(searchText).toMatch(text);
	}

	async verifyclearSearchOption() {
		await this.baseInstance.isDisplayed(elements.clearSearchBtn);
	}

	async verifyTheSaveButtonLoadIndicator() {
		await this.baseInstance.isDisplayed(elements.saveButtonLoadIndicator);
	}

	async headerActiveBageDisplayed() {
		await this.baseInstance.waitForElement(elements.headerActiveBadge);
		await this.baseInstance.isDisplayed(elements.headerActiveBadge);
	}

	async verifyHeaderActiveBage() {
		const text = await this.baseInstance.getTextContent(elements.headerActiveBadge);
		expect(text).toContain("active");
	}

	async clickOperationMenuButton() {
		await this.baseInstance.clickElement(
			elements.employeeOperationsMenuButton,
			"Click employee Operations Menu Button",
		);
	}

	async getUserFullNames(): Promise<string[]> {
		const userElements = await this.baseInstance.getAllElements(elements.employeeName(""));
		const userFullNames = await Promise.all(
			userElements.map(async (element: Locator) => {
				return await element.textContent();
			}),
		);
		return userFullNames;
	}

	async verifyEmployeeListSorting() {
		const userFullNames = await this.getUserFullNames();
		const sortedUserFullNames = [...userFullNames].sort();
		const isAlphabetical = userFullNames.every((name, index) => name === sortedUserFullNames[index]);
		await expect(isAlphabetical).toBe(true);
	}

	async searchEmployee(employee: string) {
		await this.baseInstance.clickElement(elements.searchInput, "Search Employee");
		await this.baseInstance.clearText(elements.searchInput, "clear search");
		await this.baseInstance.enterTextsequentially(elements.searchInput, employee, "Employee Name");
		await this.baseInstance.wait(5);
	}

	async clickOnSpecificEmployee(employee: string) {
		await this.baseInstance.clickElement(
			elements.employeeSideBar.clickOnSpecificEmployeeName(employee || addedEmployeeData.firstName),
			"Open Specific Employee",
		);
	}

	async clickOnEmployeeNameContainer() {
		await this.baseInstance.clickElement(elements.employeeNameContainer, "click whole container");
	}

	async seeEmployeeData() {
		!(await this.baseInstance.isDisplayed(elements.employeeSideBar.sideBar));
	}

	async verifyExpandableSideBar() {
		await this.baseInstance.hoverOverElement(elements.employeeSideBar.hoverOnClientLogo);
		await this.baseInstance.isDisplayed(elements.employeeSideBar.expandableSideBar);
	}

	async getAllActiveEmployeeCount() {
		let totalEmployeeCount = 0;
		const activePosition = await this.baseInstance.getAllElements(elements.badge);
		let activePositionCount = activePosition.length;
		while (activePositionCount === 10) {
			totalEmployeeCount = totalEmployeeCount + 10;
			await this.baseInstance.clickElement(elements.nextPageButton, "Click on Next Button");
			const activePosition = await this.baseInstance.getAllElements(elements.badge);
			activePositionCount = activePosition.length;
		}
		totalEmployeeCount = totalEmployeeCount + activePositionCount;

		return totalEmployeeCount;
	}

	async getAllActiveAssignments() {
		const activeAssignments = await this.baseInstance.getAllElements(elements.assignmentBadge);
		const totalEmployeeCount = activeAssignments.length;

		return totalEmployeeCount;
	}

	async getNavigationActiveAssignmentsCount() {
		const navigationCount = await this.baseInstance.getText(
			"(//span[@class='creditChip v-chip theme--light v-size--default'])[4]",
		);
		return navigationCount;
	}

	async getHeaderActiveEmployeeCount() {
		const positionCount = await this.baseInstance.getText(elements.headerActiveBadge);
		return positionCount;
	}

	async getNavigationActiveEmployeeCount() {
		const navigationCount = await this.baseInstance.getText("(//span[@class='qty_badge d-flex align-center px-3'])[1]");
		return navigationCount;
	}

	async verifyEmployeeNameHyperlinked(employee: string) {
		await this.baseInstance.isDisplayed(elements.employeeName(employee));
	}

	async verifyEmployeeNameNotHyperlinked(employee: string) {
		!(await this.baseInstance.isDisplayed(elements.employeeName(employee)));
	}

	async verifyReadinessValue() {
		await this.baseInstance.isDisplayed(elements.readinessValue);
	}

	async verifyPathToReadinessTab() {
		await this.baseInstance.isDisplayed(elements.pathToReadinessTab);
		await this.baseInstance.isDisplayed(elements.pathToReadinessPage);
	}

	async verifyTitleAtSpecificEmployee() {
		await this.baseInstance.isDisplayed(elements.titleAtSpecificEmployee);
	}

	async verifyTreeInPathToReadinessPage() {
		await this.baseInstance.isDisplayed(elements.treeInPathToReadiness);
	}

	async clickOnImportantComponent() {
		await this.baseInstance.clickElement(
			elements.importantComponentSelector.importantComponent,
			"click on Importnat Selector",
		);
		await this.baseInstance.isDisplayed(elements.importantComponentSelector.importantSelector);
	}

	async hoverOverImportantSelector() {
		await this.baseInstance.hoverOverElement(elements.importantComponentSelector.hoverOverImportantContainer);
	}

	async clickOnImportantSelector() {
		await this.baseInstance.clickElement(
			elements.importantComponentSelector.hoverOverImportantContainer,
			"click on Importance Selector",
		);
	}

	async verfiyImportanceSelectorDialogueBox() {
		expect(
			await this.baseInstance.isDisplayed(elements.importantComponentSelector.importanceSelectorDialogueBox),
		).toBeFalsy();
	}

	async verifyImportantSelector() {
		await this.baseInstance.isDisplayed(elements.importantComponentSelector.hoverImportantSelectorToolTip);
	}

	async clickChatterTab() {
		await this.baseInstance.clickElement(elements.chatterTab, "Click on chatter tab");
	}

	async clickEmployeePositionsMenu() {
		await this.baseInstance.clickElement(elements.employeePositionsMenu, "Click on assignment tab");
	}

	async verifyNoDefaultActiveFilter() {
		expect(await this.baseInstance.isDisplayed(elements.noDefaultActiveFilter)).toBeFalsy();
	}

	async clickEmployeeBadgesMenu() {
		await this.baseInstance.clickElement(elements.employeeBadgesMenu, "Click on badges tab");
	}

	async verifyChatterRecords() {
		await this.baseInstance.isDisplayed(elements.chatterTable);
	}

	async verifyChatterRecordToday() {
		await this.baseInstance.isDisplayed(elements.todayChatterRecord);
	}

	async getValueEmployeeLeftNavPathToReadiness() {
		return await this.baseInstance.getTextContent(elements.employeeDetailsPage.leftBarPathToReadiness);
	}

	async getValueEmployeeHeaderPathToReadiness() {
		return await this.baseInstance.getTextContent(elements.employeeDetailsPage.headerReadinessValue);
	}

	async verifyUploadPictureModalIsDisplayed() {
		await this.baseInstance.isDisplayed(elements.changeProfilePictureForTheEmplyee.header);
	}

	async verifyTheBadgeForEmployee(status: string) {
		const statusEmployee = await this.baseInstance.getTextContent(elements.statusBadge(status));
		const statusValue = status.toLowerCase();
		expect(statusEmployee).toBe(statusValue);
	}

	async verifyTheBadgeForPosition(status: string) {
		const statusPosition = await this.baseInstance.getTextContent(elements.positionbadge);
		const statusValue = status.toLowerCase();
		expect(statusPosition).toBe(statusValue);
	}

	async selectTheOptionsFromThreeDotMenu(option: string) {
		await this.baseInstance.clickElement(
			elements.employeeProfileThreeDotMenuButton.option(option),
			`select the ${option} option`,
		);
	}

	async verifyLoaderIsDisplayed() {
		expect(await this.baseInstance.isDisplayed(elements.verifyLoader)).toBeTruthy();
	}

	async verifyEmployeeNameVisibleInProfile() {
		expect(await this.baseInstance.isDisplayed(elements.employeeProfileName)).toBeTruthy();
	}

	async selectOptionFromMenu(option: string) {
		await this.baseInstance.clickElement(elements.threeDotMenuOptions.option(option), "Select option from menu");
		await this.baseInstance.wait(3);
	}

	async verifyBtnToBeDisabled(btnName: string) {
		return await this.baseInstance.getHtmlAttributeByXPath(elements.uploadPictureModalBtn.option(btnName), "disabled");
	}

	async clickOnBtnForUploadModal(btnName: string) {
		await this.baseInstance.clickElement(elements.uploadPictureModalBtn.option(btnName), `click on ${btnName}`);
		await this.baseInstance.waitForElementToDisappear(elements.uploadPictureModalBtn.option(btnName));
	}

	async verifyTheAvatarImage() {
		await this.baseInstance.wait(5);
		await this.baseInstance.isDisplayed(elements.avatarImageForemployee);
	}

	async verifyTheAvatarImageToNotExist() {
		!(await this.baseInstance.exists(elements.avatarImageForemployee));
	}

	async verifyExistingProfilePic() {
		await this.baseInstance.exists(elements.changeProfilePictureForTheEmplyee.croper);
	}

	async clickOnEmployeeProfileMenu() {
		await this.baseInstance.waitForElement(elements.employeeMenuButton);
		await this.baseInstance.clickElement(elements.employeeMenuButton, "Click On Menu Button");
	}

	async selectEmployeeProfileMenuOption(option: string) {
		await this.baseInstance.clickElement(
			elements.employeeProfileThreeDotMenuButton.option(option),
			`Select the ${option} option`,
		);
	}

	async verifyOptionIsNotDisplayed(option: string) {
		!(await this.baseInstance.isDisplayed(elements.threeDotMenuOptions.option(option)));
	}

	async verifyTheOptionIsDisplayed(option: string) {
		await this.baseInstance.isDisplayed(elements.threeDotMenuOptions.option(option));
	}

	async clickActivateButton() {
		await this.baseInstance.clickElement(elements.activateButton, "Click on activate btn");
	}

	async enterEmployeeEmail(email: string) {
		await this.baseInstance.enterText(elements.emailEmployee, email, "Email input");
	}

	async clickOnNext() {
		await this.baseInstance.clickElement(elements.nextButton, "click on next button");
	}

	async clickSelectAppsEmployee(app: string) {
		await this.baseInstance.clickElement(elements.employeeSelectAppsOnly(app), "click on employee co owner only");
		await this.baseInstance.clickElement(elements.nextButton, "click on next button");
	}
	async clickInviteEmployee() {
		await this.baseInstance.clickElement(elements.inviteEmployee, "click on Employee Service Only");
	}

	async clickOnSuspendAccess() {
		await this.baseInstance.clickElement(elements.clickOnSuspendAccess, "click On Suspend Access");
	}

	async verfiySuspendUserToolTip() {
		await this.baseInstance.hoverOverElement(elements.verfiySuspendUserToolTip);
	}

	async selectAppsForEmployee(app: string) {
		await this.baseInstance.clickElement(elements.selectEmployee(app), "click on Employee Selected Apps");
	}

	async verifyEmailAlreadyUsed() {
		await this.baseInstance.clickElement(elements.emailAlreadyUsedMessage, "verify error message");
	}

	async clickOnNotificationBtn() {
		await this.baseInstance.clickElement(elements.notificationBtn, "Click On notification btn");
	}

	async verifyNotificationPageVisible() {
		await this.baseInstance.isDisplayed(elements.notificationPage);
	}

	async verifyHoverAddEmployee() {
		await this.baseInstance.isDisplayed(elements.hoverAddEmployee);
	}

	async verifyemployeeFirstDataCardToVisible() {
		await this.baseInstance.isDisplayed(elements.employeeFirstDataCard);
	}

	async clickOntheCapcityIcon() {
		await this.baseInstance.isDisplayed(elements.employeeFirstDataCard);
		await this.baseInstance.clickElement(elements.employeeFirstDataCard, "click on the Capicty Icon");
	}

	async clickOntheEmployeeCapcityIcon() {
		await this.baseInstance.isDisplayed(elements.capacityIcon);
		await this.baseInstance.clickElement(elements.capacityIcon, "click on the Capicty Icon");
		await this.baseInstance.wait(3);
	}

	async capcityModalIsVisible() {
		await this.baseInstance.wait(3);
		await this.baseInstance.isDisplayed(elements.capacityPopup.modalConatiner);
	}

	async capcityModalIsNotVisible() {
		await this.baseInstance.wait(3);
		!(await this.baseInstance.isDisplayed(elements.capacityPopup.modalConatiner));
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

	async verfiyThatZeroPointFiveFTEIsDisplayed() {
		expect(await this.baseInstance.isDisplayed(elements.zeroPointFiveIcon)).toBeTruthy();
	}

	async clickOnCloseCapacityIcon() {
		await this.baseInstance.clickElement(elements.capacityPopup.closeIcon, "click close icon");
	}

	async hoverOverThreeDotsMenu() {
		await this.baseInstance.hoverOverElement(elements.hoverOverThreeDotMenuButton);
	}

	async clickOnEmployeeThreeDotMenuBtn() {
		await this.baseInstance.clickElement(elements.threeDotMenuBtn, "click on menu button");
	}

	async clickOnIssueBadge() {
		await this.baseInstance.clickElement(elements.clickOnIssueBadge, "click On Issue Badge");
		await this.baseInstance.clickElement(elements.clickOnIssueBadgeBtn, "click On Issue Badge");
	}

	async clickOnSearch() {
		await this.baseInstance.clickElement(elements.assignPositionSearch, "Click on search field");
	}

	async searchForSpecificPosition(positionName: string) {
		await this.baseInstance.wait(5);
		await this.baseInstance.clickElement(elements.searchInput, "Click on the Search field");
		await this.baseInstance.clearText(elements.searchInput, "clear the input");
		await this.baseInstance.reloadPage();
		await this.baseInstance.enterTextsequentially(elements.searchInput, positionName, "Enter Position Name");
	}

	async searchForPosition(positionName: string) {
		await this.baseInstance.enterTextsequentially(elements.assignPositionSearch, positionName, "Enter Position Name");
	}

	async verifyThePrimaryOccupationTag(position: string) {
		expect(await this.baseInstance.isDisplayed(elements.verifyThePrimaryOccupationTag(position))).toBeTruthy();
	}

	async clickOnReliveEmployeeIcon() {
		await this.baseInstance.clickElement(elements.EmployeeReliveBtn, "click On Relive Employee Icon");
	}

	async verifyNoPrimaryOccupationTag(positionName: string, employee: string = addedEmployeeData.firstName) {
		await this.baseInstance.clickElement(elements.searchInput, "Click on the Search field");
		await this.baseInstance.clearText(elements.searchInput, "Clear the input");
		await this.baseInstance.enterTextsequentially(elements.searchInput, positionName, "Enter Position Name");
		const isTagDisplayed = await this.baseInstance.isDisplayed(elements.verifyThePrimaryOccupationTag(employee));
		expect(isTagDisplayed).toBeFalsy();
	}

	async selectFirstPosition() {
		await this.baseInstance.clickElement(elements.searchFirstPosition, "select first position");
	}

	async selectFirstPositionInList() {
		await this.baseInstance.clickElement(elements.firstPosition, "Select first position");
	}

	async clickOnNextBtn() {
		await this.baseInstance.wait(3);
		await this.baseInstance.clickElement(elements.nextBtn, "Click on next btn");
	}

	async clickOnNextBtnToIssueBadge() {
		await this.baseInstance.clickElement(elements.nextBtnToIssueBadge, "Click on next btn");
	}

	async clickOnNextBtnToIssueBadgeToResponsibility() {
		await this.baseInstance.clickElement(elements.nextBtnToIssueBadgeToResponsibility, "Click on next btn");
	}

	async removeResponsibilityFilter() {
		await this.baseInstance.clickElement(elements.removeResponsibilityFilter, "Click on remove filter");
	}

	async clickOnAssignBtn() {
		await this.baseInstance.clickElement(elements.assignBtn, "Click on assign btn");
	}

	async verifyAssignedPosition() {
		await this.baseInstance.isDisplayed(elements.assignedPosition);
	}

	async clickOnRelieveEmployee() {
		await this.baseInstance.clickElement(elements.clickOnRelieveEmployee, "click on Relieve Employee");
	}

	async relieveEmployee() {
		await this.baseInstance.clickElement(elements.relieveEmployee, "click on relieve Employee");
	}

	async clickOnRelievePosition(expectedDate?: string) {
		await this.baseInstance.clickElement(elements.relievePosition, "Click on relieve position");
		await this.baseInstance.isDisplayed(elements.relievePositionEffectiveByDate(expectedDate));
	}

	async clickOnRelieveBtn() {
		await this.baseInstance.clickElement(elements.relieveBtn, "Click on relieve btn");
		await this.baseInstance.wait(3);
	}

	async clickOnURLPostion() {
		await this.baseInstance.wait(5);
		await this.baseInstance.clickElement(elements.urlPostionName, "Click on Hyperlink");
	}

	async verifyPostionModal() {
		await this.baseInstance.isDisplayed(elements.postionModal);
	}

	async clickOnAttachRoleBtn() {
		await this.baseInstance.clickElement(elements.attachRoleBtn, "Click on Attach Role Button");
	}

	async selectRoleFromTheList() {
		await this.baseInstance.isDisplayed(elements.enterRoleInSearch);
		await this.baseInstance.wait(3);
		await this.baseInstance.clickElement(elements.roleList, "Enter Role Name");
	}

	async selectRole() {
		await this.baseInstance.clickElement(elements.selectFirstRole, "Select First Role");
	}

	async clickOnAttachButton() {
		await this.baseInstance.clickElement(elements.attachRoleToPositionButton, "Attach Role to Position");
	}

	async clickOnAssignmentColumn() {
		await this.baseInstance.clickElement(elements.clickOnAssignmentColumn, "click on the Assignment column");
	}

	async verifyRoleAttachedToPosition() {
		await this.baseInstance.isDisplayed(elements.attachedRole);
	}

	async clickEmployeeInList() {
		await this.baseInstance.clickElement(elements.clickEmployeeInList, "click on employee list");
	}

	async verifyHoverOverEmployee(employee: string) {
		expect(
			await this.baseInstance.isDisplayed(
				elements.employeeSideBar.verifyHoverOverEmployee(employee || addedEmployeeData.firstName),
			),
		).toBeTruthy();
	}

	async verifyTheAddLoadingText() {
		expect(await this.baseInstance.isDisplayed(elements.verifyTheAddLoadingText)).toBeTruthy();
	}

	async verifyEmployeeAssigned(employee: string) {
		await this.baseInstance.isDisplayed(elements.employeeAssignment(employee || addedEmployeeData.firstName));
	}

	async verifyCapacitySelectorNotOpen() {
		!(await this.baseInstance.isDisplayed(elements.verifyCapacitySelectorPopup));
	}

	async clickOnCloseModal() {
		await this.baseInstance.clickElement(elements.clickOnCloseModal, "click On Close Modal");
	}

	async clickOnAddEmployee() {
		await this.baseInstance.clickElement(elements.addEmployeeBtn, "click on add employee button");
	}

	async verifyAddEmployeeInputField() {
		expect(await this.baseInstance.isDisplayed(elements.inputFiled.firtName)).toBeTruthy();
		expect(await this.baseInstance.isDisplayed(elements.inputFiled.lastName)).toBeTruthy();
		expect(await this.baseInstance.isDisplayed(elements.inputFiled.titleName)).toBeTruthy();
	}

	async verifyDefaultFilterInAssignments() {
		expect(await this.baseInstance.isDisplayed(elements.assignmentsDefaultFilter)).toBeFalsy();
	}

	async clickOnConfirmBtn() {
		await this.baseInstance.clickElement(elements.confirmBtn, "Click on confirm button");
	}

	async clickOnUnArchiveBtn() {
		await this.baseInstance.clickElement(elements.clickOnUnArchiveBtn, "click on Unarchive Button");
	}

	async noEmployeesFoundTextDisplayed() {
		await this.baseInstance.isDisplayed(elements.noEmpFoundText);
	}

	async applyArchivedFilter() {
		await this.baseInstance.clickElement(elements.applyArchivedFilter, "select filter");
	}

	async clickClearSearchBtn() {
		await this.baseInstance.clickElement(elements.clearBtn, "click on clear search");
	}

	async selectFilterOptionArchive(filter: string) {
		await this.baseInstance.clickElement(elements.archiveFilter(filter), "select filter option");
	}

	async archiveStatusBadge() {
		await this.baseInstance.isDisplayed(elements.archiveStatus);
	}

	async verifiyAssignmentStatusIsActive(badge: string) {
		await this.baseInstance.isDisplayed(elements.verifiyAssignmentStatusIsActive(badge));
	}

	async verifiyAssignmentStatusIsTerminated(badge: string) {
		await this.baseInstance.isDisplayed(elements.verifiyAssignmentStatusIsTerminated(badge));
	}

	async verifiyAssignmentIsRelieved(badge: string) {
		await this.baseInstance.isDisplayed(elements.verifiyAssignmentIsRelieved(badge));
	}

	async verifyNoPositionMatchingResult() {
		await this.baseInstance.isDisplayed(elements.verifyNoPositionMatchingResult);
	}

	async currentBadgeVisible() {
		await this.baseInstance.isDisplayed(elements.employeeBadge);
	}

	async issuedByOnVisible() {
		await this.baseInstance.isDisplayed(elements.issuedByOn);
	}

	async badgeReasonVisible() {
		await this.baseInstance.isDisplayed(elements.badgeReason);
	}

	async currentFilterVisible() {
		await this.baseInstance.isDisplayed(elements.currentBadgeFilter);
	}

	async clickOnCorssIcon() {
		await this.baseInstance.clickElement(elements.badgeCrossIcon, "click on cross icon");
	}

	async verfifyNoviceBadge() {
		await this.baseInstance.isDisplayed(elements.noviceBadge);
	}

	async responsibiliyThreeDotsMenu() {
		await this.baseInstance.clickElement(elements.responsibiliyThreeDotsMenu, "responsibiliy Three Dots Menu");
	}

	async noBadgeTextVisible() {
		await this.baseInstance.isDisplayed(elements.noBadgeFoundText);
	}

	async clickOnClearFilterBtn() {
		await this.baseInstance.clickElement(elements.clearFilterBtn, "click on clear filter button");
	}

	async selectBadgeFilter(filter: string) {
		await this.baseInstance.clickElement(elements.badgeFilter(filter), "select filter");
	}

	async removedBadgeVisible() {
		await this.baseInstance.isDisplayed(elements.removedBadge);
	}

	async badgeCounterVisible() {
		await this.baseInstance.isDisplayed(elements.badgeCounter);
	}

	async issuedByOnDateVisible() {
		await this.baseInstance.isDisplayed(elements.issuedByOnDate);
	}

	async removedByOnDateVisible() {
		await this.baseInstance.isDisplayed(elements.removedByOnDate);
	}

	async roleAssignmentNotVisible() {
		!(await this.baseInstance.isDisplayed(elements.positionAssignCaretIcon));
	}

	async roleAssignmentVisible() {
		await this.baseInstance.clickElement(elements.positionAssignCaretIcon, "user click on caret icon");
		await this.baseInstance.isDisplayed(elements.roleAssignment);
	}

	async responsibilityAssignmentVisible() {
		await this.baseInstance.clickElement(elements.positionAssignCaretIcon, "user click on caret icon");
		await this.baseInstance.clickElement(elements.roleAssignCaretIcon, "user click on caret icon");
		await this.baseInstance.isDisplayed(elements.responsibilityAssignment);
	}

	async issueBadgeModalVisible() {
		await this.baseInstance.isDisplayed(elements.issueBadgeModal);
	}

	async searchResponsibility(responsibility: string) {
		await this.baseInstance.clickElement(elements.respCaretIcon, "user clicks on search field");
		await this.baseInstance.wait(3);
		await this.baseInstance.enterTextsequentially(elements.respSearchField, responsibility, "Search Field");
	}

	async searchSpeResponsibility(responsibility: string) {
		await this.baseInstance.clickElement(elements.respCaretIcon, "user clicks on search field");
		console.log(responsibility);
	}

	async selectResponsibility() {
		await this.baseInstance.wait(3);
		await this.baseInstance.clickElement(elements.firstResponsibility, "select first responsibility");
		await this.baseInstance.wait(3);
	}

	async positionAssignmentVisible() {
		await this.baseInstance.isDisplayed(elements.positionAssignment);
	}

	async clickOnIssueBadgeDropDownButton() {
		await this.baseInstance.clickElement(elements.clickOnIssueBadgeDropDownButton, "click On Issue Badge");
	}

	async verifyNoArchivedResponsibilityAppear() {
		await this.baseInstance.isDisabled(elements.isEnableNextBtn);
	}

	async noAssignmentTextVisible() {
		await this.baseInstance.isDisplayed(elements.noPosText);
	}

	async clickOnPathAssignBtn() {
		await this.baseInstance.clickElement(elements.pathAssignBtn, "click on assign btn");
	}

	async pathAssignBtnVisible() {
		await this.baseInstance.isDisplayed(elements.pathAssignBtn);
	}

	async pathPositionVisible() {
		await this.baseInstance.isDisabled(elements.pathPosCard);
	}

	async employeeNotActivatedText() {
		await this.baseInstance.isDisplayed(elements.notActivatedText);
	}

	async pathActivateBtnVisible() {
		await this.baseInstance.isDisplayed(elements.pathActivateBtn);
	}

	async clickPathActivateBtn() {
		await this.baseInstance.clickElement(elements.pathActivateBtn, "user clicks on activate button");
	}

	async clickEmpActivateBtn() {
		await this.baseInstance.clickElement(elements.activateEmpBtn, "user activates employee");
	}

	async empActiveBadgeVisible() {
		await this.baseInstance.isDisabled(elements.empActiveBadge);
	}

	async employeeStatusText() {
		await this.baseInstance.isDisplayed(elements.empStatusText);
	}

	async pathReActivateBtnVisible() {
		await this.baseInstance.isDisplayed(elements.pathReActivateBtn);
	}

	async clickPathReActivateBtn() {
		await this.baseInstance.clickElement(elements.pathReActivateBtn, "user clicks on re-activate button");
	}

	async clickEmpReActivateBtn() {
		await this.baseInstance.clickElement(elements.reActivateEmpBtn, "user activates employee");
	}

	async prepareForColumn() {
		await this.baseInstance.clickElement(elements.prepareForColumn, "user views the 'Prepares for' column");
	}

	async assignPrepareForPosition() {
		await this.baseInstance.clickElement(
			elements.assignPrepareForPosition,
			"user clicks on Assign to prepare for position",
		);
	}

	async pickPositionPrepareFor() {
		await this.baseInstance.clickElement(elements.pickPositionPrepareFor, "user picks the position for prepare for");
	}

	async selectPrepareForPosition() {
		await this.baseInstance.clickElement(elements.selectPrepareForPosition, "user picks the position for prepare for");
	}

	async clickOnAssignPrepareForBtn() {
		await this.baseInstance.clickElement(
			elements.clickOnAssignPrepareForBtn,
			"user picks the position for prepare for",
		);
	}

	async hoverCrossIcon() {
		await this.baseInstance.hoverOverElement(elements.hoverCrossIcon);
		await this.baseInstance.wait(2);
	}

	async clickRoleassignmentcard() {
		await this.baseInstance.clickElement(
			elements.clickRoleassignmentcard,
			"the user clicks on roles responsibility assignment component",
		);
	}

	async clickOnAssignToEmployeeBtn() {
		await this.baseInstance.clickElement(
			elements.clickOnAssignToEmployeeBtn,
			"user clicks on assign to employee button",
		);
	}

	async verifyPrimaryPositionAssignment() {
		await this.baseInstance.isDisplayed(elements.verifyPrimaryPositionAssignment);
	}

	async hoverOverPrimaryPositionAssignment() {
		await this.baseInstance.hoverOverElement(elements.hoverOverPrimaryPositionAssignment);
	}

	async expandPositionInPathToReadiness(positionName: string) {
		await this.baseInstance.clickElement(
			elements.expandPositionInPathToReadiness(positionName),
			`Expand position: ${positionName}`,
		);
		await this.baseInstance.wait(2);
	}

	async expandRoleInPathToReadiness(roleName: string) {
		await this.baseInstance.clickElement(elements.expandRoleInPathToReadiness(roleName), `Expand role: ${roleName}`);
	}

	async verifyCountOfAttachActiveRole(count: number) {
		await this.baseInstance.isDisplayed(elements.verifyCountOfAttachActiveRole(count));
	}

	async verifyCountOfAttachActiveResponsibility(count: number) {
		await this.baseInstance.isDisplayed(elements.verifyCountOfAttachActiveResponsibility(count));
	}

	async verifyAppreticeBadge(badge: string) {
		await this.baseInstance.isDisplayed(elements.verifyEmployeeBadge(badge));
	}

	async verifyGiveBadgeModal() {
		await this.baseInstance.isDisplayed(elements.verifyGiveBadgeModal);
	}

	async clickOnGiveUpgradeBadge() {
		await this.baseInstance.clickElement(elements.clickOnGiveUpgradeBadge, "click On Give Upgrade Badge");
	}

	async activeResponsibilityAssignmentVisible(responsibilityName: string) {
		expect(
			await this.baseInstance.isDisplayed(elements.activeResponsibilityAssignment(responsibilityName)),
		).toBeTruthy();
	}

	async clickOnAwardBadgeBtn() {
		await this.baseInstance.clickElement(elements.clickOnAwardBadgeBtn, "click On Award Badge");
	}
}
