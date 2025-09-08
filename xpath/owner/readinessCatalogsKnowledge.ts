export const elements = {
	header: {
		knowledgeHeader: "//div[normalize-space()='Knowledge']",
	},
	searchField: "div[data-testid='ex-searchbar'] input[data-testid='search-input']",
	actionMenu: {
		responsibilityActionMenu: (name: string) =>
			`//span[normalize-space()='${name}']/ancestor::td/following-sibling::td//div[@class="employee_availability_icon"]`,
		options: (option: string) => `(//span[normalize-space()='${option}'])[1]`,
	},
};
