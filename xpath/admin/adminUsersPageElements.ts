export const elements = {
	searchField: "div[data-testid=\"ex-searchbar\"] input[data-testid=\"search-input\"]",
	clearSearchButton: "div[data-testid=\"ex-searchbar\"] .v-btn__content",
	threeDottedButtonList: ".employee_availability_icon",
	addSystemAdminButton: "div[data-testid=\"ex-searchbar\"] .search-button button",
	badge: ".storybook-admin-status-badge span",
	userCounter: ".active-badge",
	loadingSpinner: ".loader-container",
	actions: {
		deleteButton: "//span[text()='Delete']/ancestor::li[1]",
		renameButton: "//div[contains(@class, 'menuable__content__active')] //span[text()='Rename']/ancestor::li[1]",
		unBlockButton: "//span[text()='Un-Block']/ancestor::li[1]",
		blockbutton: "//span[text()='Block']/ancestor::li[1]",
		unClosebutton: "//span[text()='Un-Close']/ancestor::li[1]",
		closeButton: "//span[text()='Close']/ancestor::li[1]",
		cancelButton: "//span[text()='Cancel Invite']/ancestor::li[1]",
		resendInviteButton: "//span[text()='Resend Invite']/ancestor::li[1]",
		cancelInviteButton: "//span[text()='Cancel Invite']/ancestor::li[1]",
		actionButtonsList: ".menuable__content__active .dropdown-menu li",
		hideBlockButton: "(//span[contains(text(),'Block')])[2]",
		blockedbutton: "(//span[contains(text(),'Block')])[2]",
		blockdisplaybutton: "//span[normalize-space()='Block']/ancestor::button",
		clearAll: "//span[normalize-space()='Clear All']/ancestor::button",
	},
	modals: {
		modal: ".v-dialog--active .pop-up",
		modalText: ".v-dialog--active .action_popup_message",
		modalErrorMessage: ".v-dialog--active .pop-up .modal_content p",
		existingUserErrorMessage: (firstName: string, lastName: string, email: string) =>
			`//p[text()=' User ${firstName} ${lastName} with email: ${email} already has access to this account. ']`,
		addSystemAdminModalText: ".v-dialog--active .pop-up h3",
		modalButtonsList: ".v-dialog--active button",
		emailField: "#email input[data-testid=\"search-input\"]",
		emailText: ".pop-up .text-disabled",
		nextButton: ".pop-up button",
		firstNameField: "//label[text()='Enter user first name']/following-sibling::input",
		lastNameField: "//label[text()='Enter user last name']/following-sibling::input",
		addButton: "//span[text()=' Add']/ancestor::button",
		renameModal: {
			renameModalTitleText: ".action_popup_title",
			firstNameField: "(//div[contains(@class, 'v-dialog--active')]//input[@data-testid='search-input'])[1]",
			lastNameField: "(//div[contains(@class, 'v-dialog--active')]//input[@data-testid='search-input'])[2]",
			renameButton: "//span[text()='Rename']/ancestor::button",
		},
		unBlockModal: {
			unblockbutton: "//span[text()='Un-block']/ancestor::button",
		},

		blockModal: {
			blockbutton: "//span[text()='Block']/ancestor::button",
		},

		uncloseModal: {
			unclosebutton: "//span[text()='Un-close']/ancestor::button",
		},

		closeModal: {
			closebutton: "//span[text()='Close']/ancestor::button",
		},
		cancelModal: {
			cancelButton: "//span[text()='Cancel']/ancestor::button",
		},
	},
	userName: (firstName: string) => `//div[contains(@data-testid, "useradmincard-name-${firstName}")]`,
	accountCounter: ".account-count",
	loadIcon: "//div[@class='vld-icon']//*[name()='svg']",
	activeFilters: {
		invited: "//span[contains(@class, \"search-bar-filter\")]//span[text()=' invited ']",
		operational: "//span[contains(@class, \"search-bar-filter\")]//span[text()=' operational ']",
		closed: "//span[contains(@class, \"search-bar-filter\")]//span[text()=' closed ']",
		blocked: "//span[contains(@class, \"search-bar-filter\")]//span[text()=' blocked ']",
	},
	usersFiltersButton: "//span[text()='Filters']/ancestor::button",
	usersMoreFiltersButton: "//span[text()='More Filters']/ancestor::button",
	usersModalFilter: {
		modal: ".filter-modal-popup",
		invitedCheckbox:
			"//div[contains(@class, 'filter-checkbox')]//span[text()='invited']/preceding-sibling::span/button",
		operationalCheckbox:
			"//div[contains(@class, 'filter-checkbox')]//span[text()='operational']/preceding-sibling::span/button",
		closedCheckbox: "//div[contains(@class, 'filter-checkbox')]//span[text()='closed']/preceding-sibling::span/button",
		blockedCheckbox:
			"//div[contains(@class, 'filter-checkbox')]//span[text()='blocked']/preceding-sibling::span/button",
		saveFilterButton: "//span[normalize-space(text())=\"Save Filter\"]/ancestor::button",
	},
	lastLoginText: ".last-login-text",
};
