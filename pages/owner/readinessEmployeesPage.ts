import { expect } from "@playwright/test";
import { BaseClass } from "../../helpers/BaseClass";
import { elements } from "../../xpath/owner/readinessEmployeesElements";

export default class ReadinessEmployeesPage {
	baseInstance: BaseClass;
	reports = [];
	reportData = [];

	constructor(baseInstance: BaseClass) {
		this.baseInstance = baseInstance;
	}

	async verifyEmployeesPage() {
		await expect(this.baseInstance.isDisplayed(elements.header.employeeReadinessHeading)).toBeTruthy();
	}

	async verfiyActiveEmployeeList() {
		await expect(this.baseInstance.isDisplayed(elements.employeesTable.employeesList)).toBeTruthy();
	}

	async verifyCurrentReadinessProgress() {
		await expect(
			this.baseInstance.isDisplayed(elements.employeesTable.currentReadinessProgressTableHeader),
		).toBeTruthy();
	}

	async verifyPrimaryReadinessProgress() {
		await expect(this.baseInstance.isDisplayed(elements.employeesTable.primaryReadinessTableHeader)).toBeTruthy();
	}

	async verifyBackUpReadiness() {
		await expect(this.baseInstance.isDisplayed(elements.employeesTable.backUpReadinessHeader)).toBeTruthy();
	}

	async verifyPrepareForHeader() {
		await expect(this.baseInstance.isDisplayed(elements.employeesTable.prepareForReadinessHeader)).toBeTruthy();
	}

	async verifyActingAsHeader() {
		await expect(this.baseInstance.isDisplayed(elements.employeesTable.actingAsReadinessHeader)).toBeTruthy();
	}

	async clickOnDropDownIcon() {
		await this.baseInstance.clickElement(elements.dropDownIcon, "click on drop down icon");
	}

	async clickOnRecalcButton() {
		await this.baseInstance.clickElement(elements.recalcButton, "click on recalc button");
	}

	async readinessValueNotZero() {
		!(await this.baseInstance.isDisplayed(elements.readinessValue));
	}

	async selectRecalcFilter() {
		await this.baseInstance.clickElement(elements.requiresRecalcFilter, "select recalc filter");
	}

	async recalcEmployeeVisible() {
		await this.baseInstance.isDisplayed(elements.recalcEmployee);
	}

	async clickOnRecalcAllBtn() {
		await this.baseInstance.clickElement(elements.recalcAllBtn, "click on recalc all button");
	}

	async recalcAllBtnNotVisible() {
		!(await this.baseInstance.isDisplayed(elements.recalcAllBtn));
	}
}
