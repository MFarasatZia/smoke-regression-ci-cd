export const elements = {
	positionTable: "//div[@class='v-data-table__wrapper']//table//thead",
	chatterTable: "//div[@class='v-window-item v-window-item--active']//div[@class='v-card__text']'",
	hoverOverThreeDotMenuButton: "(//div[@class='icon-container'])[1]",
	verifyNoRolesAttachedScreen: "(//div[@class='no-record'])[1]",
	clickOutsideModal: "//body/div[@id='app']/div[1]",
	clickOnCloseIcon: "//span[@class='v-btn__content']//span[@class='d-flex']",
	attachedRolesThreeDotMenu: "(//div[@class='icon-container'])[1]",
	hoverOverAddPosition: "//button[@data-v-53fd3a0e and @type='button' and contains(@class, 'add-position-btn')]",
	chatterTableRecordsToday:
		"//div[@class='v-window-item v-window-item--active']//div[@class='divider'][normalize-space()='Today']",
	positionList: "//div[@class='v-data-table__wrapper']//tbody",
	openSpecificPosition: (positionName: string) =>
		`//div[@data-testid="ex-codename"]//*[contains(text(), '${positionName}')]`,
	pathForPostion: "//ul[@class='v-breadcrumbs ex-breadcrumbs mb-6 px-4 theme--light']",
	organizationPostionTab: "//a[normalize-space()='Positions Organization']",
	positionHeaderTab: "//th[normalize-space() = 'Position']",

	occupiedHeaderTab: "//span[normalize-space()='Occupied by /']",
	actingAsHeaderTab: "//span[normalize-space()='Acting As']",
	actionHeaderTab: "//th[6]",
	btnLoadingIndicator: "//span[normalize-space()='Status']",
	statusHeaderTab: "//span[normalize-space()='Status']",
	positionFirstData: "//tbody/tr[1]",
	positionFirstDataCard: "(//div[@class='circle bg_transparent position_icon_br_normal']/parent::*/parent::*)[1]",
	positionFirstDataBadge: "(//span[@data-testid='ex-roles-counter-badge'])[1]",
	positionFirstDataName: "//tbody/tr[1]//a[contains(@class,'medium-name')]",
	positionFirstDataCode: "//tbody/tr[1]//span[contains(text(),'null')]",
	positionFirstCapitictyIcon: "(//div[@class='circle bg_white position_icon_br_normal'])[1]",
	positionCode: "//span[@class='medium-code']",
	addPositionButton: "(//span[normalize-space()='Add Position'])[1]",
	roleAttachedSuccess: "//div[normalize-space()='Roles attached successfully.']",
	attachedRole: "(//span[@data-testid='obj-card-name'])[1]",
	roleAttachedToPosition: (roleName: string) => `//span[normalize-space()='${roleName}']`,
	selectRoleName: "(//div[@class='v-list-item__content'])[1]",
	positionModal: "//div[@class='v-slide-group__content v-tabs-bar__content']",
	verifyRolesAttached: "(//div[@class='v-slide-group__content v-tabs-bar__content']//div[@role='tab'])[1]",
	addPositionModal: {
		header: "//div[contains(text(),'+ Add Position')]",
		positionNameInput: "//label[normalize-space()='Enter Position Name']/following-sibling::*",
		saveButton: "//span[normalize-space()='Save']",
	},
	allPositionNames: "//div[contains(@class, 'no-record') and text()=' No Positions found ']",
	clonedPosition: (name: string) => `//span[normalize-space()='Clone of ${name}']`,
	retiredPosition: (name: string) => `//span[normalize-space()='Retire of ${name}']`,
	cloneOfClonedPosition: (name: string) => `//span[normalize-space()='Clone of Clone of ${name}']`,
	chatterCountTab:
		"//span[@aria-label='Badge' and @role='status' and contains(@class, 'v-badge__badge') and text()='1']",
	urlPostionName: "(//a[@class='url-name medium-name'])[1]",
	postionModal: "//span[@class='text-title mr-2 align-self-end' and text()='Positions Organization']",
	attachedRoleMenu: "//div[@data-test='position-menu']",
	attachRoleButton: "//button[normalize-space()='Attach Role']",
	enterNewRoleName: "(//label[normalize-space()='Search for Role'])[1]",
	closeAttachRolePopUp: "(//span[@class='v-btn__content']//i)[3]",
	attachRoleModel: "//div[@class='attach-modal-popup v-card v-sheet theme--light']",
	enterRoleInSearch: "(//label[contains(text(),'Search for Role')])[1]",
	roleList: "(//button[@aria-label=' appended action'])[1]",
	searchRole: "//label[normalize-space()='Search for Role']//following-sibling::input",
	selectFirstRole: "(//div[@class='v-list-item__content'])[1]",
	selectRoleFromList: (roleName: string) => `//div[@role='listitem']//div[contains(.,'${roleName}')]`,
	addNewRole: "//div[@class='v-list-item__content new-item-list']",
	addNewRoleConfirm: "//span[normalize-space()='Confirm']",
	attachTheNewRole: "//div[@class='v-list-item__content']",
	attachRoleToPositionButton: "//button[normalize-space()='Attach']",
	particularNameOfPosition: {
		option: (text: string) => `(//div[normalize-space()='${text}'])[1]`,
	},
	searchInput: "div[data-testid=\"ex-searchbar\"] input[data-testid='search-input']",
	capacityIconForSpecificPosition: {
		option: (text: string) => `//span[normalize-space()='${text}']/ancestor::div[2]//div[@data-testid='capacity-icon']`,
	},
	capacityOptionAvailable: "(//div[contains(@class,'menuable__content__active')]//i)[1]",
	OpenThreeDotMenuFor: {
		allOptions: "//td[6]//*[name()='svg']",
		forAnyRow: {
			option: (text: string) => `//tr[${text}]/td[6]//*[name()='svg']`,
		},
		active: "(//tr//span[text()='active']/parent::*/parent::*/parent::*/parent::*/td[6/div//*[name()='svg'])[1]",
		draft: "(//tr//span[text()='draft']/parent::*/parent::*/parent::*/parent::*/td[6]/div//*[name()='svg'])[1]",
		terminated:
			"(//tr//span[text()='terminated']/parent::*/parent::*/parent::*/parent::*/td[6]/div//*[name()='svg])[1]",
	},
	menuPopUpOptions: {
		terminate:
			"//div[@class='v-menu__content theme--light menuable__content__active ex-generic-selector']//span[contains(text(),'Terminate')]",
		edit: "//div[@class='v-menu__content theme--light menuable__content__active ex-generic-selector']//span[contains(text(),'Edit')]",
		activate:
			"//div[@class='v-menu__content theme--light menuable__content__active ex-generic-selector']//span[contains(text(),'Activate')]",
		delete:
			"//div[@class='v-menu__content theme--light menuable__content__active ex-generic-selector']//span[contains(text(),'Delete')]",
		reActivate:
			"//div[@class='v-menu__content theme--light menuable__content__active ex-generic-selector']//span[contains(text(),'Re-Activate')]",
		deActivate:
			"//div[@class='v-menu__content theme--light menuable__content__active ex-generic-selector']//span[contains(text(),'De-Activate')]",
		retired:
			"//div[@class='v-menu__content theme--light menuable__content__active ex-generic-selector']//span[contains(text(),'Retire')]",
		changePicture:
			"//div[@class='v-menu__content theme--light menuable__content__active ex-generic-selector']//span[contains(text(),'Change Picture')]",
		giveAccess:
			"//div[@class='v-menu__content theme--light menuable__content__active ex-generic-selector']//span[contains(text(),'Give Access')]",
		rename:
			"//div[@class='v-menu__content theme--light menuable__content__active ex-generic-selector']//span[contains(text(),'Rename')]",
		clone:
			"//div[@class='v-menu__content theme--light menuable__content__active ex-generic-selector']//span[contains(text(),'Clone')]",
		attachResponsibilityOption:
			"//div[@class='v-menu__content theme--light menuable__content__active ex-generic-selector']//span[contains(text(),'Attach Responsibility')]",
	},
	threeDotMenuPopUpOptions: {
		option: (text: string) => `//div[contains(@class,'menuable__content__active')]//li[normalize-space()='${text}']`,
	},
	activatePositionModal: {
		ModalHeader: "//h3[normalize-space()='Activate Position']",
		Btn: "//button[normalize-space()='Activate']",
	},
	attchResponsibiltyActivatePopup: {
		modalHeader: "//h3[normalize-space()='Activate Responsibility']",
	},
	deActivatePositionModal: {
		ModalHeader: "//h3[normalize-space()='De-Activate Position']",
		Btn: "//button[normalize-space()='De-Activate']",
	},
	reActivatePositionModal: {
		ModalHeader: "//h3[normalize-space()='Re-Activate Position']",
		Btn: "//button[normalize-space()='Re-Activate']",
	},
	retiredPositionModal: {
		ModalHeader: "//h3[normalize-space()='Retire Position']",
		Btn: "//button[contains(@class, 'storybook-button--btn-normal-termination')]//span[normalize-space()='Retire']",
	},
	clonePopUpModel: {
		clonePopupDialog: "//div[@class='v-dialog v-dialog--active']",
		cloneButton: "//button[span[text()='Clone']]",
	},

	deletePositionModal: {
		ModalHeader: "//h3[normalize-space()='Delete Position']",
		Btn: "//button[normalize-space()='Delete']",
	},

	detachPositionModal: {
		ModalHeader: "//h3[normalize-space()='Detach Role']",
		Btn: "//button[normalize-space()='Detach']",
	},

	renamePositionModal: {
		ModalConatainer: "//div[@class='container container--fluid fill-height']",
		inputfeild: "//label[normalize-space()='Rename Position']//following-sibling::input",
		saveButton: "//button[normalize-space()='Save']",
	},
	getNameForTheProject: {
		draft: "(//tr//span[text()='draft']/parent::*/parent::*/parent::*/parent::*/td[1]/div/div/div/div[3]/span[2])[1]",
	},
	nextPageButton: "//button[normalize-space()='Next']",
	capacityPopup: {
		modalConatiner: "//div[@role='menu'][contains(@class,'menuable__content__active')]",
		oneFTEOption:
			"(//div[@role='menu'][contains(@class,'menuable__content__active ')]//div[@class='v-input--selection-controls__ripple'])[1]",
		zeroPointFiveOption:
			"//div[@role='menu']//div[@class='v-radio theme--light']//div[@class='v-input--selection-controls__ripple']",
		closeIcon: "//div[@role='menu'][contains(@class,'menuable__content__active ')]//button",
	},
	filterModal: {
		modalHeader: "//div[@class='filter-modal-text']",
		statusHeader: "//div[normalize-space()='Status']",
		occupiedHeader: "//div[contains(text(),'Occupied')]",
		rolesHeader: "//div[contains(text(),'Capacity')]",
		statusFilter: {
			option: (status: string) =>
				`//div[contains(text(),'Status')]/parent::div//span[normalize-space()='${status}']/parent::*/span/button`,
		},
		otherFilter: {
			option: (name: string, status: string) =>
				`//div[contains(text(),'${name}')]/parent::div//label[normalize-space()='${status}']`,
		},
		verifyOtherFilter: {
			option: (name: string, status: string) =>
				`//div[contains(text(),'${name}')]/parent::div//label[normalize-space()='${status}']/parent::*//i`,
		},
		removeAppliedFilter: {
			option: (name: string) => `//span[contains(text(),'${name}')]/img`,
		},
		saveFilter: "//button[normalize-space()='Save Filter']",
	},
	filterButton: "//button[@class='px-4 d-flex flex-nowrap align-center search-bar']",
	filtrModal: "//div[@class='filter-modal-text' and contains(normalize-space(.), 'Filter Roles')]",
	verifyNoAssignmentRolesFoundIsVisible:
		"//div[@class='v-card__text text-center head-desc' and normalize-space(text())='List of people assigned to the object']",
	firstThreeDotMenu: "//div[@class='icon-container']",
	searchField: "//input[@data-testid='search-input']",
	badge: "(//td[4]//span[starts-with(@class, 'capitalize')])[1]",
	allActiveBadge: "//td[5]//span[starts-with(@class, 'capitalize') and normalize-space() = 'active']",
	positionbadge: {
		status: (badge: string) => `(//div[@class='header-container']//span[normalize-space() = '${badge}'])[2]`,
	},
	openPositionbadge: {
		status: (badge: string) => `(//span[@class='storybook-badge storybook-badge--${badge.toLowerCase()}'])[1]`,
	},
	capacityIcon: "//div[@data-testid='capacity-icon']",
	oneFTECapacity: "//div[@class='circle bg_transparent position_icon_br_normal']",
	headerActiveBadge: "//span[@class='active-badge']",
	leftMenuActiveBadge: "(//span[@class='qty_badge d-flex align-center px-3'])[2]",
	clearSearchBtn: "//span[normalize-space()='clear search']",
	clearSearchAllBtn: "//span[normalize-space()='Clear All']",
	attachRolePopup: {
		createAndAttachNewRoleButton:
			"//div[@class='v-list-item__content new-item-list']/span[contains(@class, 'create-attach-btn') and contains(text(), 'Create and attach new Role')]",
		confirmationNotification: ".Vue-Toastification__toast--success.top-right",
		confirmationModal: (roleName: string) =>
			`//div[contains(@class, 'v-dialog--active')] //div[contains(text(), "Are you sure you want to create and attach Role ${roleName}")]`,
	},
	roleStatus: ".storybook-badge--draft",
	attechedRoleName: "[data-testid='obj-card-name']",
	getAllCodes: "[data-testid='obj-card-code']",
	attachRoleDetailsHeader: "[class='header-icon-badge']",
	attachRoleDetailsBreadcrumbs: "//ul[@class='v-breadcrumbs ex-breadcrumbs custom-bread theme--light']",
	expandRole: "//div[@class='dx-treelist-empty-space dx-treelist-collapsed']",
	expandedResposbilityIcon: "//tr[2]/td[3]//*[name()='svg']",
	attachedRoleName: "(//span[@class='object-card-name'])[2]",
	attachedResponsibilityName: (responsibilityName: string) =>
		`//span[@data-testid='obj-card-name']//span[normalize-space(text())='${responsibilityName}']`,
	responsibilityDeatilsHeader: "[data-test='responsibility-menu']",
	attachRolesActiveCount: "(//span[@role='status'])[1]",
	suggestionList: "[role='listitem']",
	attachRoleModal: "//div[normalize-space()='+Attach Role to Position']",
	attachRoleBtn: "//span[contains(text(),'Role')]/ancestor::button",
	attachRoleBtnIsDisplayed: "//span[normalize-space()='Attach Roles']",
	positionThreeDotMenu: "//div[@class='org-menu']//div[@class='ex-generic-selector-default-activator']",
	threeDotMenuOpenPosition: "//div[@class='employee_availability_icon']//*[name()='svg']",
	threeDotMenu: "(//div[@class='icon-container'])[2]",
	roleDataCard: "(//div[@class='d-flex'])[1]",
	clickOnAssignmentCard: "(//span[@class='assigment-badge'])[1]",
	clickOnAssignmentModal: "(//span[@class='assigment-badge'][normalize-space()='2'])[1]",
	verifyDetachModal: "(//div[@class='container container--fluid fill-height'])[1]",
	attachmentsPopup: "//div[@class='attach-text']",
	detachPosition: "(//span[@class='detach-text text-red'][normalize-space()='Detach'])[1]",
	verifyLoader: "//span[@aria-hidden='true' and contains(@class, 'v-icon notranslate theme--light')]",
	hoverOverPosition: "//div[@data-testid='ex-codename' and contains(@class, 'ml-2')]",
	positionName: (text: string) => `//a[normalize-space()="${text}"]`,
	attachedRolesList: "attachedRolesList",
	rolesActionDropDown: "//div[@class='']//ul[@class='dropdown-menu ex_dropdownmenu pl-0']",
	noRolesAttachedText: "//div[normalize-space() ='No attached Roles found']",
	verifyNoAttachedRolesFoundText: "//div[@class='no-record' and contains(text(), 'No attached Roles found')]",
	verfiyRolesAttachedOrganizationIsVisible: (count: string) =>
		`//div[contains(text(), 'Roles attached Organization') and contains(text(), '${count}')]`,
	verifyNoAttachedRolesFoundIsVisible: "(//div[@class='no-record'][normalize-space()='No attached Roles found'])[1]",
	veirfyLoaderActionsIcons: "//div[@data-v-3cfedc38]",
	noPosFoundText: "//div[@class='no-record']",
	readinessValue: (readinessValue: number) =>
		`//span[contains(@class, 'progress-value')]//span[normalize-space(text())='${readinessValue}%']`,
};
