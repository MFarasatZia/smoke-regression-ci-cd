export const elements = {
	addRolesButton: "//button[normalize-space()='Add Role']",
	rolesList: "//div[@class='dx-treelist-rowsview dx-treelist-nowrap']",
	rolesSubMenu: "//*[contains(text(), 'Roles')]",
	clickOnRolePag: "//div[@role='tab' and @class='menu-tabs v-tab' and text()=' Roles ']",
	addRoleButton: "//span[normalize-space()='Add Role']",
	clickOnCloseIcon: "//span[@class='v-btn__content']//span[@class='d-flex']",
	clickOnAssignmentModal: "(//span[@class='assigment-badge'][normalize-space()='2'])[1]",
	verifyCounterIsNotVisible: "//span[@class='badge' and contains(text(), 'active')]",
	filterButton: "//button[@class='search-bar']",
	filtrModal: "//div[@class='filter-modal-text' and contains(normalize-space(.), 'Filter Roles')]",
	verifyDetachResponsibilityModal: "//h3[normalize-space()='Detach Responsibility']",
	verifyNoAssignmentRolesFoundIsVisible:
		"//div[@class='v-card__text text-center head-desc' and normalize-space(text())='List of people assigned to the object']",
	roleDataCard: "(//div[@class='d-flex'])[1]",
	attachmentsPopup: "//div[@class='attach-text']",
	clickOnDetachResponsibility: "(//span[@class='detach-text'][normalize-space()='Detach'])[1]",
	addRoleButtonIndicator: "//span[@class ='v-icon notranslate mr-2 theme--light']",
	rolesTable: "[id=\"tree-grid\"]",
	rolesTree: "//*[contains(concat(' ', normalize-space(@class), ' '), ' ex-orgobject-treelist ')]",
	rolesChatterRecords: "//div[@class='activity_stream mx-8']//div[@class='row']",
	addRoleField: "//label[text()='Enter Role Name']/following-sibling::input",
	actionsButton: "(//div[@class='employee_availability_icon'])[1]",
	clickOnDetachFromRoleBtn: "(//span[normalize-space()='Detach from Role'])[1]",
	verifyDetachFromRoleBtn: "(//span[normalize-space()='Detach from Role'])[1]",
	verifyShowModalNotAppear: "//div[@class='row row-mid align-center justify-center']",
	clickOnDetachBtn: "(//span[normalize-space()='Detach'])[1]",
	saveAsDraftButton: "//button[normalize-space()=\"Save as Draft\"]",
	searchField: "div[data-testid=\"ex-searchbar\"] input[data-testid=\"search-input\"]",
	firstRole: "(//span[@data-testid='obj-card-name'])[1]",
	responsibilityIsAttached:
		"//div[contains(@class, 'dx-treelist')]//tr[contains(@class, 'dx-row') and contains(@class, 'dx-data-row')]",
	chatterCountTab:
		"//span[@aria-label='Badge' and @role='status' and contains(@class, 'v-badge__badge') and text()='1']",
	firstThreeDotMenu: "//tr[1]//div[contains(@class,'employee_availability_icon')]",
	searchInput: "//*[@data-testid='search-input']",
	statusBadge: (badge: string) => `//span[normalize-space()='${badge}' and starts-with(@class, 'storybook-badge')]`,
	badge: "//span[starts-with(@class, 'storybook-badge')]",
	Rolebadge: {
		status: (badge: string) => `(//span[normalize-space()='${badge}'])[1]`,
	},
	verifyDisplayBtn: (text: string) => `//span[@class='button-text' and text()='${text}']`,
	clickOnDisplayBtn: "(//span[normalize-space()='Add new with AI'])[1]",
	verfiyAiModaltext: (text: string) => `//span[@class='ai-dialog-title' and text()='${text}']`,
	actionsActivateButton: "//div[contains(@class,'menuable__content__active')]//span[normalize-space()='Activate']",
	clickOnCreateAndAttachBtn: "(//span[normalize-space()='Create and Attach'])[1]",
	responsibilityMarkedWithTick:
		"//div[contains(@class, 'res-v-list-item') and contains(@class, 'v-list-item--disabled')]",
	verifyRoleStatus: (status: string) => `//span[normalize-space()='${status}']`,
	actionsAttachResponsibilityButton:
		"//div[contains(@class,'menuable__content__active')]//span[normalize-space()='Attach Responsibility']",
	actionsRenameButton: "//div[contains(@class,'menuable__content__active')]//span[normalize-space()='Rename']",
	modalActivateButton: "//button[normalize-space()='Activate']",
	nextPageButton: "//button[normalize-space()='Next']",
	clickOnElipssesButton: "(//div[@class='employee_availability_icon'])[1]",
	modalActionOption: (status: string) =>
		`//div[contains(@class,'menuable__content__active')]//li[normalize-space()='${status}']`,
	hoverOverSpecificRoles: "//div[@class='dx-treelist-text-content']",
	deActivateConfirmation: "//button[normalize-space()='De-Activate']",
	activateConfirmation: "//button[normalize-space()='Activate']",
	reActivateConfirmation: "//button[normalize-space()='Re-Activate']",
	confirmAction: (action: string) => `//button[normalize-space()='${action}']`,
	deActivateOptionConfirmation: "//div[@class='v-dialog v-dialog--active']",
	actionsRetiredButton: "(//span[normalize-space()='Retire'])[1]",
	clickAndVerifyReactiveButton: "(//span[normalize-space()='Re-Activate'])[1]",
	activeRoleHeaderCount: "(//span[@aria-label='Badge'])[1]",
	expandRoleWithResponsibility: "//tr[1]//td[2]//div[@class='dx-treelist-empty-space dx-treelist-collapsed']",
	secoundThreeDotMenu: "//tr[2]//div[contains(@class,'employee_availability_icon')]",
	secoundBadge: "(//span[starts-with(@class, 'storybook-badge')])[2]",
	attachedResponsibilityThreeDot: "(//div[@class='employee_availability_icon'])[2]",
	attachedResponsibilityBadge: "//span[starts-with(@class, 'storybook-badge')]",
	filters: {
		filterButton: "//button[@class='px-4 d-flex flex-nowrap align-center search-bar']",
		filterOptions: (option: string) => `//span[contains(@class, 'label') and normalize-space()='${option}']`,
		saveFilter: "//button[normalize-space()='Save Filter']",
		filteredResults: (status: string) =>
			`//span[contains(@class, 'storybook-badge storybook-badge--inactive') and text()=' ${status} ']`,
		selectedFilter: (status: string) => `//span[@class='v-chip__content' and normalize-space()='${status}']`,
		removeFilter: (status: string) => `//span[normalize-space()='${status}']//*[@class='search-cross-icon']`,
	},

	attachResponsibilityModal: {
		modal: "//div[normalize-space()='+Attach Responsibility to Role']/ancestor::div[5]",
		attachButton: "//button[normalize-space()='Attach']",
		createAndAttachResponsibilityOnTheFlyButton: ".attach-modal-popup div[role=\"listitem\"]",
		attachResponsibilityConfirmationModal: (responsibilityName: string) =>
			`//div[contains(text(), 'Are you sure you want to create and attach Responsibility ${responsibilityName} ?')]`,
	},

	addRolesModal: {
		popup: "//div[@class='v-card__title dialog-title']",
		input: "//label[contains(.,'Enter Role Name')]/following-sibling::*",
		saveBtn: "//button[normalize-space()='Save as Draft']",
	},

	pagination: {
		// pageNavigationButtons: "//button[contains(@class, \"v-pagination__item\")]",
		pageNavigationButtons: "//button[@aria-label='Current Page, Page 1']",
	},

	searchForResponsibilityField: "//label[normalize-space()='Search for Responsibility']/following-sibling::input",
	clearAttachedResponsibility:
		"//button[@type='button' and contains(@aria-label, 'Clear') and contains(@class, 'mdi-close')]",
	responsibilityFieldCaret: "//button[@aria-label=' appended action']",
	addedResponsibilityAlert: "//div[@role=\"alert\" and text()='Responsibility attached successfully.']",
	expandRole: "(//div[@class='dx-treelist-empty-space dx-treelist-collapsed'])[1]",
	verifyResponsibilityForRole: (responsibility: string) => `//span[normalize-space()='${responsibility}']`,
	expandedResponsibility:
		"(//div[@class='dx-treelist-empty-space dx-treelist-expanded']/parent::*/parent::*/parent::*/following-sibling::tr//span[@data-testid='obj-card-name'])[1]",
	attchResponsibiltyPopupOptions: {
		activate: "//div[contains(@class,'menuable__content__active')]//li[normalize-space()='Activate']",
		rename: "//div[contains(@class,'menuable__content__active')]//li[normalize-space()='Rename']",
		retire: "//div[contains(@class,'menuable__content__active')]//li[normalize-space()='Retire']",
		deActivate: "//div[contains(@class,'menuable__content__active')]//li[normalize-space()='De-activate']",
	},
	attchResponsibiltyActivatePopup: {
		modalHeader: "//h3[normalize-space()='Activate Responsibility']",
		modalBtn: "//button[normalize-space()='Activate']",
	},

	attchResponsibiltyRetirePopup: {
		modalHeader: "//h3[normalize-space()='Retire responsibility']",
		modalBtn: "//button[normalize-space()='Retire']",
	},

	attchResponsibiltyDeActivatePopup: {
		modalHeader: "//h3[normalize-space()='De-Activate Responsibility']",
		modalBtn: "//button[normalize-space()='De-Activate']",
	},

	attachResponsibiltyRenamePopup: {
		modalHeader: "//button[normalize-space()='Rename Responsibility']",
		modalinput: "(//*[@data-testid='search-input'])[2]",
		modalBtn: "//button[normalize-space()='Save']",
	},

	renameResposnibilityName: (input: string) => `//span[normalize-space()='${input}']`,

	roleThreeDotMenuOptions: {
		option: (optionName: string) =>
			`//div[contains(@class,'menuable__content__active')]//li[normalize-space()='${optionName}']`,
	},

	retireRoleModal: {
		modal: "//h3[normalize-space()='Retire Role']",
		btn: "//button[normalize-space()='Retire']",
	},
	deleteRoleModal: {
		modal: "//h3[normalize-space()='Delete Role']",
		btn: "//button[normalize-space()='Delete']",
		attachedResponsibilityCheckboxChecked: "//span[@class='icon-check']",
	},
	renameRoleModal: {
		modal: "//div[contains(@class, 'v-card__title dialog-title') and text()=' Rename Role ']",
		input: "//label[normalize-space()='Role Name*']/parent::*//input",
		btn: "//button[normalize-space()='Save']",
	},

	rolesTitle: {
		option: (text: string) => `//span[normalize-space()='${text}']`,
	},

	getStatusForARole: {
		option: (text: string) => `//span[normalize-space()='${text}']/ancestor::tr/td[5]//span`,
	},

	confirmButton: "//span[normalize-space()='Confirm']",
	attachButtonResponsibility:
		"//button[contains(@class, 'storybook-button') and normalize-space()='Attach Responsibility']",
	attachResponsibilityButton:
		"//div[contains(@class,'menuable__content__active')]//span[normalize-space()='Attach Responsibility']",
	dropdownSelector: "//div[contains(@class,'menuable__content__active')]",
	responsibilityBreadCrumb: "//a[normalize-space()='Responsibility']",
	roleBreadCrumb: "//a[normalize-space()='Roles']",
	roleThreeDot: "//div[@class='org-menu']//div[@class='ex-generic-selector-default-activator']",
	saveBtn: "//button[normalize-space()='Save']",
	attachmentTab: "//div[contains(text(), 'Attachment') and contains(@class, 'v-tab--active')]",
	breadcrumbComponent: {
		breadcrumbOnRolesPage: "//ul[@class='v-breadcrumbs ex-breadcrumbs custom-bread theme--light']",
	},
	roleAttachments: {
		attachments: "//div[@class='d-flex align-center']",
		openRoleAttachmentModal: "//div[@class='d-flex']",
		verifyAttachmentModal: "//div[@class= 'attach-text' and normalize-space()='Attachments']",
		verifyResponsibilityAttached: "//div[@class='d-flex org-object-card']",
		detachResponsibility:
			"//span[@data-testid='obj-card-name']/ancestor::div/following-sibling::div//button[normalize-space()='Detach']",
	},

	columnNames: {
		firstCol: "//td[normalize-space() = 'Role']",
		secondCol: "//td[normalize-space() = 'Dashboard']",
		thirdCol: "//td[normalize-space() = 'Attached To']",
		fourthCol: "//td[normalize-space() = 'Assignment']",
		fifthCol: "//td[normalize-space() = 'Status']",
	},

	previousButton: "//button[normalize-space() = 'Previous']",
	nextButton: "//button[normalize-space() = 'Next']",
	hoverOverThreeDotMenuButton: "(//div[@class='icon-container'])[1]",
	addResponsibilityBtn: "//button[normalize-space() ='Add Responsibility']",
	roleModalError: "//div[@class='v-messages__message message-transition-enter-to']",

	attachedResponsibility: "(//div[@class ='d-flex org-object-card'])[2]",
	attachResponsibilityDropDown: "//div[@class='v-list res-custom-list v-sheet theme--light']",
	caretIconToclose: "//button[@aria-label=' appended action']",
	clickOnDetachButton: "(//span[@class='v-btn__content'][normalize-space()='Detach'])[1]",
	clickOnDetachModalButton: "//button[span[text()='Detach']]",
	veirfyLoaderIcons: "//div[@class='ex-white-spinner v-icon__component theme--light']",
	clickOnCollapseIcon: "//div[@class='toggle-button']//button//img[contains(@src, 'collapseIcon')]",
	verifyHideLeftNavigation: "(//div[@class='v-list v-sheet theme--light v-list--dense'])[2]",
	notificationBellIcon: "//div[@data-testid='notification-bell']",
	confirmationModalForResponsibility:
		"//div[@class='custom-popup v-card v-sheet theme--light']//div[@class='container container--fluid fill-height']",
	clickOutsideModal: "//body/div[@id='app']/div[1]",
	roleDetachModalText: "//div[@class='v-card__text text-center head-desc']",
	noRolesFoundText: "//div[@class='no-record']",
	clearSearchBtn: "//button[@class='clear-button v-btn v-btn--block v-btn--text theme--light v-size--default']",
	checkpointCounter: "//div[@class='checkpoint-badge checkpoint-badge-gray']",
	selectActivateOption: "(//span[contains(text(),'Activate')])[2]",
	clickOnActivateBtn: "(//span[contains(text(),'Activate')])[2]",
	verifyAttachedActivateResponsibilityStatus:
		"(//span[@class='storybook-badge storybook-badge--draft'][normalize-space()='activate'])[2]",
	activateAttachedDraftResponsibility: "(//button[normalize-space() ='Activate'])[2]",
	skipAttachedDraftResponsibility: " //span[normalize-space()='Skip']",
	verifyAttachedDraftResponsibilitiesStatus:
		"(//span[@class='storybook-badge storybook-badge--draft'][normalize-space()='draft'])[1]",
	navigationActiveRoleCount: "(//span[@class='qty_badge d-flex align-center px-3'])[3]",
	dragHandles: "//td[contains(@class, 'dx-command-drag')]//span[contains(@class, 'dx-treelist-drag-icon')]",
	verifyResponsibilitiesOrder: "//tbody//tr[@aria-level=\"2\"]//span[@data-testid=\"obj-card-name\"]",
	specificResponsibilityByName: (responsibilityName: string) =>
		`//tr//td//span[normalize-space()="${responsibilityName}"]`,
};
