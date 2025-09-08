export const elements = {
	header: {
		employeeReadinessHeading: "//span[normalize-space()='Employees Readiness']",
	},

	employeesTable: {
		employeesList: "//div[@class='v-data-table__wrapper']//tbody",
		currentReadinessProgressTableHeader: "//th[normalize-space()='Readiness']",
		primaryReadinessTableHeader: "//th[normalize-space()='Primary']",
		backUpReadinessHeader: "//th[normalize-space()='Provides backup to']",
		prepareForReadinessHeader: "//th[normalize-space()='Prepares for']",
		actingAsReadinessHeader: "//th[normalize-space()='Acting As']",
	},
	dropDownIcon: "//div[contains(@class,'d-flex flex-row')]/following-sibling::div[1]",
	recalcButton: "//span[normalize-space(text())='Recalculate']",
	readinessValue: "//span[normalize-space(text())='0']",
	requiresRecalcFilter: "//label[normalize-space(text())='Requires Recalc']",
	recalcEmployee: "//div[contains(@class,'employee-readiness-bar recalc-active')]",
	recalcAllBtn: "//span[normalize-space(text())='Recalculate All']",
};
