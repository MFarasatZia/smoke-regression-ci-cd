export const elements = {
	accountNameInTable: (accountName: string) =>
		`//div[contains(@class, 'v-data-table__wrapper')]//span[text()='${accountName}']`,
	addAccountModalText: "//h3[text()='+ Add account']",
	addAccountButton: "//span[text()='Add account']/ancestor::button",
	renameAccountModalText: "//h3[text()='Rename Account']",
	verifyEmailClosedPopUp: "//h3[normalize-space()='Email is Closed in the System']",
	verifyEmailBlockedPopUp: "//h3[normalize-space()='Email is blocked']",
	activateAccountModalText: "//h3[text()='Activate account']",
	closeAccountModalText: "//h3[text()='Close Account']",
	deleteAccountModalText: "//h3[text()='Delete Account']",
	changeAccountOwnerModalText: "(//h3[normalize-space()='Change Account owner'])[1]",
	emailIsBlockedModalText: "//h3[text()='Email is blocked']",
	emailIsClosedModalText: "//h3[text()='Email is Closed in the System']",
	reOpenAccountText: "//h3[text()='Re-Open Account']",
	actionModals: {
		accountNameField: ".v-dialog--active input[data-testid='search-input']",
		saveAsDraftButton: "//span[text()=\"Save as Draft\"]/ancestor::button",
		closeButton: "//span[text()=\"Close\"]/ancestor::button",
		reOpen: "//span[text()=\"Re-Open\"]/ancestor::button",
		deleteButton: "//span[text()=\"Delete\"]/ancestor::button",
		enterAccountNameFieldErrorMessage: ".v-dialog--active .v-messages__wrapper",
		saveButton: "//span[text()=\"Save\"]/ancestor::button",
		nextButton: "//div[contains(@class, \"v-dialog--active\")] //span[contains(text(), 'Next')]/ancestor::button",
		activateButton: "//span[normalize-space(text())=\"Activate\"]/ancestor::button",
		inviteAndWaitForSignupButton: "//span[text()=\"Invite and wait for signup\"]/ancestor::button",
		emailField: "//label[text()='Account owner email*'] /ancestor::div[1]//input",
		firstName: "//label[text()='First Name *'] /ancestor::div[1]//input",
		lastName: "//label[text()='Last Name *'] /ancestor::div[1]//input",

		alreadyExistingUserText: (accountName: string) =>
			`//div[text()= "The email dan@hazenfield.com already exists and is linked to user Dan RAOELINARIVO. We will give access in the '${accountName}' account and make it owner of the account. "]`,
		activateAccountEmailErrorMessage: ".error--text .message-transition-enter-to",
		changeOwnerModal: {
			nextButtonFromChangeAccountOwner: ".v-dialog--active div > button",
			changeAccountOwnerEmailField: ".v-dialog--active input[data-testid=\"search-input\"]",
			changeOwnerButton: "//span[text()=\"Change Owner\"]/ancestor::button",
			changeOwnerModalSecondStep: {
				nonExistingUserText: (userEmail: string, accountName: string) =>
					`//div[text()=' A user with email ${userEmail} does not exist in the system. We will create a new user for it and will give it access in the ${accountName} account as owner. ']`,
				firstNameField: "//label[text()='Enter user first name']/following-sibling::input",
				lastNameField: "//label[text()='Enter user last name']/following-sibling::input",
			},
		},
		blockedUserModal: {
			blockedUserErrorText: (userEmail: string) =>
				`//div[contains(@class, 'modal-message') and contains(text(), ' The email ${userEmail} is blocked at the level of the system. Use a different email or unblock the user.')]`,
		},
		closedUserModal: {
			closedUserErrorText: (userEmail: string) =>
				`//div[contains(normalize-space(text()), "The user with email ${userEmail} is closed at the level of the system. Use a different email or make this user operational again.")]`,
		},
	},
	searchField: "div[data-testid=\"ex-searchbar\"] input[data-testid=\"search-input\"]",
	clearSearchButton: "//span[normalize-space(text()) = \"clear search\"]/ancestor::button",
	accountStatus: "span[class=\"status-label\"]",
	accountNameList: ".v-data-table__wrapper tbody tr div",
	threeDottedButtonList: ".employee_availability_icon",
	actionsMenu: {
		activateButton: "//div[contains(@class,'menuable__content__active')]//li[normalize-space()='Activate']",
		renameButton: "//div[contains(@class, \"menuable__content__active\")]//span[text()=\"Rename\"]/ancestor::li",
		cancelInvite: "//div[contains(@class, \"menuable__content__active\")]//span[text()=\"Cancel Invite\"]/ancestor::li",
		closeButton: "//div[contains(@class, \"menuable__content__active\")]//span[text()=\"Close\"]/ancestor::li",
		deleteButton: "//div[contains(@class, \"menuable__content__active\")]//span[text()=\"Delete\"]/ancestor::li",
		changeOwnerButton: "//div[@role=\"menu\"]//span[text()=\"Change Owner\"]/ancestor::li",
		reOpenButton: "//div[contains(@class, \"menuable__content__active\")]//span[text()=\"Re-Open\"]/ancestor::li",
		OpenButton: "//div[contains(@class, \"menuable__content__active\")]//span[text()=\"Open\"]/ancestor::li",
		actionButtonsList: ".menuable__content__active .dropdown-menu li",
	},
	accountOwnerFullNameText: (firstName: string, lastName: string) =>
		`//div[@data-testid="useradmincard-name-${firstName} ${lastName}"]`,
	accountOwnerEmailText: (email: string) => `//div[@data-testid="useradmincard-email-${email}"]`,
	accountOwnerCellText: ".my-4.v-list-item",
	accountsFiltersButton: "//span[text()='Filters']/ancestor::button",
	accountsMoreFiltersButton: "//span[text()='More Filters']/ancestor::button",
	accountsActiveFilters: {
		openFilter: "//span[text() = ' open ']/ancestor::span",
		draftFilter: "//span[text() = ' draft ']/ancestor::span",
		closedFilter: "//span[text() = ' closed ']/ancestor::span",
		suspendedFilter: "//span[text() = ' suspended ']/ancestor::span",
		pendingFilter: "//span[text() = ' pending ']/ancestor::span",
		openFilterCloseButton: "//span[text() = ' open ']/ancestor::span//img",
		draftFilterCloseButton: "//span[text() = ' draft ']/ancestor::span//img",
		closedFilterCloseButton: "//span[text() = ' closed ']/ancestor::span//img",
		suspendedFilterCloseButton: "//span[text() = ' suspended ']/ancestor::span//img",
		pendingFilterCloseButton: "//span[text() = ' pending activation ']/ancestor::span//img",
	},
	accountsModalFilter: {
		modal: ".filter-modal-popup",
		draftCheckbox: "//div[contains(@class, 'filter-checkbox')]//span[text()='draft']/preceding-sibling::span/button",
		openCheckbox: "//div[contains(@class, 'filter-checkbox')]//span[text()='open']/preceding-sibling::span/button",
		closedCheckbox: "//div[contains(@class, 'filter-checkbox')]//span[text()='closed']/preceding-sibling::span/button",
		suspendedCheckbox:
			"//div[contains(@class, 'filter-checkbox')]//span[text()='suspended']/preceding-sibling::span/button",
		pendingActivationCheckbox:
			"//div[contains(@class, 'filter-checkbox')]//span[text()='pending activation']/preceding-sibling::span/button",
		saveFilterButton: "//span[normalize-space()='Save Filter']/ancestor::button",
	},
};
