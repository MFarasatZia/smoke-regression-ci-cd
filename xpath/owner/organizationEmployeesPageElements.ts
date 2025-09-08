export const elements = {
	header: {
		employeesHeading: "//span[normalize-space()='Employees Organization']",
	},
	verifyLoader: "//div[@class='ex-white-spinner v-icon__component theme--light']",
	clickOnCloseModal:
		"//button[@class='v-btn v-btn--icon v-btn--round theme--light v-size--default']//i[@class='v-icon notranslate mdi mdi-close theme--light']",
	clickOnAddEmployee: "//button[@data-v-26220c26 and @type='button' and contains(@class, 'add-employee-btn')]",
	inputFiled: {
		firtName: "//label[normalize-space()='Enter first name']",
		lastName: "//label[normalize-space()='Enter employee last name']",
		titleName: "//label[normalize-space()='Enter employee title']",
	},
	clickOnRelieveEmployee:
		"//button[@class='close-btn v-btn v-btn--icon v-btn--round theme--light v-size--default']//span[@class='v-btn__content']",
	isRemoveAssignmnetVisible: "//h3[normalize-space()='Remove Assignment']",
	relieveEmployee: "//button[contains(@class, 'storybook-button') and .//span[normalize-space(.)='Relieve']]",
	verifyTheAddLoadingText: "//span[@class='loader-text ml-4' and text()='Loading...']",
	searchFirstPosition: "(//div[@class='v-list-item__content'])[1]",
	clickAssignToEmployee: (employee: string) =>
		`//td[contains(.,'${employee}')]//following-sibling::td[normalize-space()='Assign to Primary']//button[@type='button']`,
	assignToEmployeeEffectiveOnDate: (expectedDate?: string) => {
		const date =
			expectedDate ||
			new Date().toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric",
			});
		return `//span[@data-v-3c6499bd and text()='${date}']`;
	},
	relievePositionEffectiveByDate: (expectedDate?: string) => {
		const date =
			expectedDate ||
			new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric",
			});
		return `//span[contains(@class, 'effective-by-date') and text()='${date}']`;
	},
	urlPostionName: "(//a[@class='url-name medium-name'])[1]",
	postionModal: "//div[@class='position-modal-popup v-card v-sheet theme--light']",
	attachRoleBtn: "//span[contains(text(),'Role')]/ancestor::button",
	enterRoleInSearch: "//label[@class='response-label-class']",
	roleList: "//button[@class='v-icon notranslate v-icon--link mdi mdi-chevron-down theme--light']",
	selectFirstRole: "(//div[@class='v-list-item__content'])[1]",
	attachRoleToPositionButton: "//button[normalize-space()='Attach']",
	clickOnAssignmentColumn: "(//span[@class='assigment-badge'])[1]",
	attachedRole: "(//span[@data-testid='obj-card-name'])[1]",
	clickEmployeeInList: "(//div[@class='v-list-item__title'])[1]",
	hoverOverThreeDotMenuButton: "(//div[@class='icon-container'])[1]",
	assignToButtonDisplayed: "(//div[@class='d-flex no-primary-assignment align-center'])[1]",
	assignToPositionDisplayed:
		"//div[contains(@class, 'modal-title') and contains(@class, 'mb-1') and normalize-space()='Assign to occupy position']",
	hoverCrossIcon: "(//button[@class='close-btn v-btn v-btn--icon v-btn--round theme--light v-size--default'])[1]",
	clickRoleassignmentcard:
		"(//span[@class='roles-counter v-chip v-chip--clickable v-chip--label v-chip--no-color theme--light v-size--default roles-res-red'])[1]",
	nextButton:
		"//div[normalize-space()='Give Access to Employee']//following-sibling::div//button[normalize-space()='Next']",
	inviteEmployee: "(//span[normalize-space()='Invite'])[1]",
	clickOnSuspendAccess: "(//span[normalize-space()='Suspend'])[1]",
	verfiySuspendUserToolTip: "//div[@class='_title' and normalize-space(text())='Employee has access suspended']",
	selectEmployee: (app: string) => `//span[normalize-space(.)='${app}'']`,
	employeeFirstDataCard: "//div[@data-v-6126b477 and @class='employee_availability_icon']",
	emailAlreadyUsedMessage: "//h3[normalize-space()='Email already used']",
	employeeSelectAppsOnly: (app: string) => `//span[@class='access-name' and normalize-space(text())='${app}']`,
	emailEmployee: "//label[normalize-space()='Enter Employee Email']/following-sibling::input",
	noEmployeesFoundHeading: "//h3[normalize-space()='No employees found']",
	addEmployeeBtn: "//button[normalize-space()='Add Employee'] | //button[normalize-space()='+ Add Employee']",
	employeeServiceOnly: "//span[normalize-space()='Employee Services only']",
	searchInput: "div[data-testid='ex-searchbar'] input[data-testid='search-input']",
	clickOnAssignPrepareForBtn:
		"//div[normalize-space(text())='Assign to prepare for position']/parent::div/parent::div//button[normalize-space() = 'Assign']",
	selectPrepareForPosition: "//div[@class = 'v-list-item__title d-flex justify-space-between align-center']",
	pickPositionPrepareFor: "(//div[@class='v-text-field__slot'])[2]",
	assignPrepareForPosition:
		"(//button[@class='mr-2 assign-btn storybook-button storybook-button--btn-small storybook-button--small storybook-button--undefined storybook-plus-button-active storybook-button--active-small'])[1]",
	prepareForColumn: "//span[text()='Prepares for']",
	employeeName: (text: string) => `//span[normalize-space()='${text}']`,
	capacityPopup: {
		modalConatiner: "//div[@role='menu'][contains(@class,'menuable__content__active')]",
		oneFTEOption:
			"(//div[@class='v-radio mb-4 theme--light v-item--active']//div[@class='v-input--selection-controls__ripple'])[1]",
		zeroPointFiveOption:
			"//div[@class='v-menu__content theme--light menuable__content__active ex-generic-selector customLeftTransition']//div[@class='v-radio mb-4 theme--light']//div[@class='v-input--selection-controls__input']",
		closeIcon: "//div[@role='menu'][contains(@class,'menuable__content__active ')]//button",
	},
	zeroPointFiveIcon: "//div[@class='circle bg_black_white']",
	badge: "(//div[@class='storybook-status-badge storybook-status-badge--active'])[1]",
	assignmentBadge: "//span[@class='mb-6 storybook-badge storybook-badge--active']",
	positionbadge: "//span[@class='capitalize text-inter text_green' and normalize-space(text())='active']",
	statusBadge: (status: string) => `(//span[normalize-space()='${status}'])[1]`,
	verifyCapacitySelectorPopup: "(//span[@class='text_fte mb-4'][normalize-space()='Capacity'])[2]",
	employeeAssignment: (employeeName: string) => `//span[contains(text(), '${employeeName}')]`,
	firstEmployeeFullName: "//tr[1]//td[1]//span[@class='text_name']",
	firstEmployeeTitle: "//tr[1]//td[1]//span[@class='text_position']",
	filterEmpolyeeButton: "//button[normalize-space()='Filters']",
	statusForAllEmployees: "//td[6]/div/div",
	clearSearchBtn: "//span[normalize-space()='clear search']",
	saveButtonLoadIndicator: "//span[@class ='v-icon notranslate mr-2 theme--light']",
	availabilityButton: "//div[@class='circle bg_white']",
	allEmployeesNames: "//a[@class='text_name underlined']",
	headerActiveBadge: "//span[@class='active-badge']",
	navigationCount: "(//span[@class='qty_badge d-flex align-center px-3'])[1]",
	employeeOperationsMenuButton: "div[data-testid=\"employee-operations-menu\"] .ex-generic-selector-default-activator",
	importantComponentSelector: {
		importantComponent: "//div[@class='importance-container']",
		importantSelector:
			"//div[@class='v-menu__content theme--light menuable__content__active ex-generic-selector']//div[@class='inner-content']",
		hoverOverImportantContainer: "(//div[@class='importance-container'])[1]",
		hoverImportantSelectorToolTip: "//div[contains(text(),'Importance selector')]",
		importanceSelectorDialogueBox: "(//p[@class='title mt-2'][normalize-space()='Importance'])[3]",
	},
	chatterTab: "//a[@data-test='Chatter']",
	employeePositionsMenu: "(//div[normalize-space()='Positions History'])[1]",
	employeeBadgesMenu: "//div[normalize-space()='Badges']",
	assignmentsDefaultFilter: "//span[@class='v-chip__content'][normalize-space()='active']",

	employeeMenuTab: {
		option: (menu: string) => `//div[normalize-space()='${menu}']`,
	},

	pathToReadinessPage: "//div[normalize-space()='Readiness' and @class='readiness-title']",
	pathToReadinessTab: "//div[@class='v-list-item__title emp-sidebar-title' and text()='Path to Readiness']",
	readinessValue: "(//span[contains(text(),'0')])[4]",
	titleAtSpecificEmployee: "//span[text()='Employee Path to Readiness']",
	treeInPathToReadiness: "//div[@class='ex-pathtoread-treelist pt-4']",
	employeeAvailabilityTo: {
		option: (text: string) => `(//div[normalize-space()='${text}'])[1]`,
	},
	closeAvailabilityPopupButton: "//div[1]/div[2]/button[1]/span[1]/i[1]",

	employeeTable: {
		dataTable: "//table",
		employeeColumnHeader: "//th/span[normalize-space()='Employee']",
		primaryColumnHeader: "//th//span[normalize-space()='Primary']",
		primaryColumnHeaderIcon: "//th//span[normalize-space()='Primary']/preceding-sibling::img",
		actingAsColumnHeader: "//th//span[normalize-space()='Acting As']/preceding-sibling::img",
		actingAsColumnHeaderIcon: "//th//span[normalize-space()='Acting As']/preceding-sibling::img",
		providesBackupToColumnHeader: "//th//span[normalize-space()='Provides backup to']",
		providesBackupToColumnHeaderIcon: "//th//span[normalize-space()='Provides backup to']/preceding-sibling::img",
		preparesForColumnHeader: "//th//span[normalize-space()='Prepares for']",
		preparesForColumnHeaderIcon: "//th//span[normalize-space()='Prepares for']/preceding-sibling::img",
		statusColumnHeader: "//th//span[normalize-space()='Status']",
		names: "//span[@class='text_name']",
		employeePicture: "img[data-name=\"avatar-image\"]",
	},

	addEmployeeModal: {
		addEmployeeModalHeader: "//div[normalize-space()='+ Add Employee']",
		firstNameInput: "//label[normalize-space()='First Name*']/parent::*//input",
		lastNameInput: "//label[normalize-space()='Last Name*']/parent::*//input",
		titleInput: "//label[normalize-space()='Title*']/parent::*//input",
		saveBtn: "//button[normalize-space()='Save as Draft']",
	},

	firstEmployeeEllipsis: "(//div[@class = 'icon-container'])[1]",
	firstEmployeeEllipsisMenu: "//div[@role='menu']//ul",
	firstEmployeeEllipsisDropdownMenuOptions: {
		option: (text: string) => `//span[normalize-space()="${text}"]`,
	},

	editEmployeeModal: {
		editEmployeeModalHeader: "//div[normalize-space()='Edit Employee']",
		firstNameInput: "//label[normalize-space()='First Name*']/following-sibling::div//input",
		lastNameInput: "//label[normalize-space()='Last Name*']/following-sibling::div//input",
		titleInput: "//label[normalize-space()='Title*']/following-sibling::div//input",
		saveBtn: "//span[contains(text(),'Save as Draft')]/ancestor::button",
		editEmployeeSaveBtn: "//span[contains(text(),'Save')]/ancestor::button",
	},

	activateEmployeeModal: {
		activateEmployeeModalHeader: "//h3[normalize-space()='Activate Employee']",
		activateBtn: "//button[normalize-space()='Activate']",
	},

	terminateEmployeeModal: {
		terminateEmployeeModalHeader: "//h3[normalize-space()='Terminate Employee']",
		terminateBtn: "//button[normalize-space()='Terminate']",
	},
	reActivateEmployeeModal: {
		reActivateEmployeeModalHeader: "//h3[normalize-space()='Re-Activate Employee']",
		reActivateBtn: "//button[normalize-space()='Re-Activate']",
	},

	deleteEmployeeModal: {
		deleteEmployeeModalHeader: "//h3[normalize-space()='Delete Employee']",
		deleteBtn: "//button[@type='button']//span[contains(text(),'Delete')]",
	},
	changeProfilePictureForTheEmplyee: {
		croper: "[class='cr-boundary']",
		header: "//div[normalize-space()='Profile Picture']",
		selectImageButton: "//*[@class=\"vicp-drop-area\"]/span[1]/span",
		uploadImageInput: "[id='fileInput']",
		uploadImageButton: "//button[normalize-space()='Save']",
		removeImageButton: ".remove-image",
	},
	alert: "div[role=\"alert\"]",

	menuOptionClick: {
		allOptions: "//div[@role=\"menu\"]//ul/li",
		active: "(//tr//span[text()='active']/parent::*/parent::*/parent::*/parent::*//td[7]/div/div)[1]",
		draft: "(//tr//span[text()='draft']/parent::*/parent::*/parent::*/parent::*//td[7]/div/div)[1]",
		terminated: "(//tr//span[text()='terminated']/parent::*/parent::*/parent::*/parent::*//td[7]/div/div)[1]",
	},
	menuPopUpOptions: {
		terminate:
			"//div[@class='v-menu__content theme--light menuable__content__active ex-generic-selector']//span[contains(text(),'Terminate')]",
		edit: "//div[@class='v-menu__content theme--light menuable__content__active ex-generic-selector']//span[contains(text(),'Edit')]",
		activate:
			"//div[@class='v-menu__content theme--light menuable__content__active ex-generic-selector']//span[contains(text(),'Activate')]",
		Delete:
			"//div[@class='v-menu__content theme--light menuable__content__active ex-generic-selector']//span[contains(text(),'Delete')]",
		reActivate:
			"//div[@class='v-menu__content theme--light menuable__content__active ex-generic-selector']//span[contains(text(),'Re-Activate')]",
		changePicture:
			"//div[@class='v-menu__content theme--light menuable__content__active ex-generic-selector']//span[contains(text(),'Change Picture')]",
		giveAccess:
			"//div[@class='v-menu__content theme--light menuable__content__active ex-generic-selector']//span[contains(text(),'Give Access')]",
	},

	threeDotMenuOptions: {
		option: (menuName: string) =>
			`//div[contains(@class,'menuable__content__active')]//li[normalize-space()='${menuName}']`,
	},
	threeDotMenuBtn: "(//div[@class='icon-container'])[3]",
	clickOnIssueBadge: "(//span[contains(text(),'Give Badge')])[3]",
	clickOnIssueBadgeBtn: "(//span[contains(text(),'Issue Badge')])[2]",
	clickOnAwardBadgeBtn: "(//span[normalize-space()='Award professional Badge'])[1]",
	employeeProfileThreeDotMenuButton: {
		option: (optionName: string) =>
			`//div[contains(@class,'menuable__content__active')]//li[normalize-space()='${optionName}']`,
	},
	employeeMenuButton: "//div[@class='employee-three-dots']",

	currentStatus: {
		terminated: "(//span[normalize-space()='terminated'])[1]",
		active: "(//span[normalize-space()='active'])[1]",
	},

	filterForEmployee: {
		applyTheFilter: {
			option: (filterType: string, filterName: string) =>
				`//div[normalize-space()='${filterType}']/parent::*/div[2]/div//label[contains(text(),'${filterName}')]`,
		},
		applyStatusFilter: {
			option: (filterType: string, filterName: string) =>
				`(//div[normalize-space()='${filterType}']/parent::*/div[2]/div//span[contains(text(),'${filterName}')]/parent::*//button)[1]`,
		},
		saveFilterButton: "//button[normalize-space()='Save Filter']",
		filterPopupHeader: "//div[@class='filter-modal-text']",
		filterModal: "//div[@class='filter-modal-popup pb-1 v-card v-sheet theme--light']/parent::*",
		NoFilterOptionFor: {
			option: (text: string) => `(//div[normalize-space()='${text}']/parent::*/div[2]/div/div/div/div/div/div/i)[1]`,
		},
		appliedFilterCheck: {
			option: (text: string) => `//span[@class="v-chip__content"][normalize-space()='${text}']`,
		},
		removeAppliedFilter: {
			option: (text: string) => `//span[@class="v-chip__content"][normalize-space()='${text}']/img`,
		},
	},
	nextPageButton: "//button[normalize-space()='Next']",
	employeeSideBar: {
		sideBar: "//div[@class='employee-sideBar-panel']",
		clickOnSpecificEmployeeName: (employeeName: string) => `(//a[contains(.,'${employeeName}')])[1]`,
		verifyHoverOverEmployee: (employeeName: string) =>
			`(//div[@class='d-flex flex-column magenta-hover-custom']//a[contains(text(),'${employeeName}')])[1]`,
		employeeName: (employeeName: string) => `//span[contains(.,'${employeeName}')]`,
		hoverOnClientLogo: "//div[@data-test='ClientLogo']",
		expandableSideBar: "//div[@class='main-sideBar-panel']",
	},
	verifyThePrimaryOccupationTag: (employeeName: string) => `//span[contains(text(), '${employeeName}')]`,
	employeeDetailsPage: {
		leftBarPathToReadiness:
			"//div[@class='v-list-item__title emp-sidebar-title'][normalize-space()='Path to Readiness']/parent::*/span",
		headerReadinessValue: "//div[@class='custom-readiness']//div[@class='progress-value ml-2']",
	},
	uploadPictureModalBtn: { option: (btnName: string) => `//button[normalize-space()='${btnName}']` },
	avatarImageForemployee: "[data-name='avatar-image']",
	activateButton: "//button[normalize-space() ='Activate']",
	chatterTable: "//div[@class='stream-wrapper']",
	todayChatterRecord: "//div[@class='stream-wrapper']//div[@class='divider'][normalize-space() = 'Today']",
	notificationBtn: "//div[@class='notification-bell']",
	notificationPage: "//div[@class='notification-title']",
	hoverAddEmployee: "//button[@data-v-349b758e and @type='button' and contains(@class, 'add-employee-btn')]",
	assignPositionSearch: "//input[@type='text']",
	positionSearch: "div[data-testid='ex-searchbar'] input[data-testid='search-input']",
	firstPosition: "(//div[@class = 'v-list-item v-list-item--link theme--light'])[1]",
	nextBtn: "//button[contains(.,'Next')]",
	nextBtnToIssueBadge: "(//button[contains(@class,'storybook-button') and .//span[normalize-space()='Next']])[1]",
	nextBtnToIssueBadgeToResponsibility:
		"(//button[contains(@class,'storybook-button') and .//span[normalize-space()='Next']])[2]",
	removeResponsibilityFilter: "(//span[normalize-space()='Current']//*[@class='search-cross-icon'])[1]",
	assignBtn:
		"//div[normalize-space(text())='Assign to occupy position']/parent::div/parent::div//button[normalize-space() = 'Assign']",
	assignedPosition: "d-flex flex-column bordered-box",
	relievePosition: "//button[@class='close-btn v-btn v-btn--icon v-btn--round theme--light v-size--default']",
	EmployeeReliveBtn: "//span[contains(@class, 'close_button')]",
	relieveBtn: "//button[normalize-space() = 'Relieve']",
	assignPositionBtn: "(//div[@class ='d-flex no-primary-assignment align-center'])[1]",
	capacityIcon: "(//div[@class='ex-generic-selector-default-activator'])[1]",
	employeeProfileName: "//div[@class='d-flex flex-column magenta-hover-custom']",
	employeeNameContainer: "(//div[@class= 'd-flex flex-column magenta-hover-custom'])[1]",
	confirmBtn: "//button[contains(.,'Confirm')]",
	clickOnUnArchiveBtn: "//button[@type='button']//span[contains(text(),'Unarchive')]",
	userRemoveSelectedFilter:
		"//span[contains(@class, 'v-chip__content') and contains(., 'No Archived')]//img[contains(@class, 'search-cross-icon')]",
	noEmpFoundText: "//div[@class='no-record']",
	applyArchivedFilter: "(//label[normalize-space()='Show'])[1]",
	clearBtn: "//span[normalize-space()='Clear Search']",
	archiveFilter: (filter: string) => `//label[normalize-space()='${filter}']`,
	archiveStatus: "//span[normalize-space()='Archived']",
	verifyNoPositionMatchingResult:
		"//div[contains(@class, 'v-list-item__title') and contains(text(), 'Nothing matching your search')]",
	employeeBadge: "//span[@class='v-chip v-chip--no-color theme--light v-size--default proficiency-badge--apprentice']",
	issuedByOn: "(//div[@class='resp-assig-date'])[1]",
	badgeReason: "(//div[@class='dx-template-wrapper'])[2]",
	currentBadgeFilter: "//span[normalize-space(text())='Current']",
	badgeCrossIcon: "(//div[@class='badge-icon']/following-sibling::div)[1]",
	noBadgeFoundText: "//div[normalize-space(text())='No Badges found']",
	clearFilterBtn: "//span[normalize-space(text())='Clear Filter']",
	badgeFilter: (filter: string) => `//span[normalize-space(text())='${filter}']`,
	removedBadge: "//span[contains(@class,'v-chip v-chip--no-color')]",
	badgeCounter: "//div[@class='level level-apprentice']",
	issuedByOnDate: "(//p[@class='assigned-date-text mb-0'])[1]",
	removedByOnDate: "((//p[@class='assigned-date-text mb-0'])[2])",
	positionAssignCaretIcon: "//div[@class='dx-treelist-icon-container']//div[1]",
	respAssignmentCaretIcon: "//div[@class='dx-treelist-empty-space dx-treelist-collapsed']",
	roleAssignCaretIcon: "//div[@class='dx-treelist-icon-container']//div[2]",
	roleAssignment: "(//div[@class='assignment-card ex-custom-assign-card'])[2]",
	responsibilityAssignment: "(//div[@class='assignment-card ex-custom-assign-card'])[3]",
	noDefaultActiveFilter: "(//span[@class='v-chip__content'][normalize-space()='active'])[1]",
	noviceBadge: "(//span[@class='prop-status-label proficiency-text--novice'][normalize-space()='Novice'])[3]",
	responsibiliyThreeDotsMenu: "(//*[name()='svg'][@class='icon-svg'])[3]",
	positionAssignment: "(//div[@class='ml-4 dx-template-wrapper']//div)[1]",
	clickOnIssueBadgeDropDownButton: "//div[@class='v-input__icon v-input__icon--append']",
	isEnableNextBtn: "(//span[normalize-space()='Next'])[1]",
	issueBadgeModal: "//div[@class='v-card__title head-title-modal head-title-attach-modal']",
	respCaretIcon: "//div[@class='v-input__icon v-input__icon--append']",
	respSearchField: "(//div[@class='v-text-field__slot'])[2]",
	firstResponsibility: "(//div[@data-v-33eb6843]/img[@alt='icon'])[1]",
	verifiyAssignmentStatusIsActive: (badge: string) =>
		`(//span[@class='mb-6 storybook-badge storybook-badge--active'][normalize-space()='${badge}'])[3]`,
	verifiyAssignmentStatusIsTerminated: (badge: string) =>
		`(//span[@class='mb-6 storybook-badge storybook-badge--terminated'][normalize-space()='${badge}'])[3]`,
	verifiyAssignmentIsRelieved: (badge: string) =>
		`(//span[@class='mb-6 storybook-badge storybook-badge--relieved'][normalize-space()='${badge}'])[3]`,
	noPosText: "//div[normalize-space(text())='No Position Assigned Yet']",
	pathAssignBtn: "//span[normalize-space(text())='Assign']",
	pathPosCard: "//div[@class='assignment-card ex-custom-assign-card']",
	pathActivateBtn: "//button[contains(@class,'ml-2 storybook-button')]//span[normalize-space() = 'Activate']",
	notActivatedText: "//div[normalize-space(text())='Employee Not Yet Activated']",
	activateEmpBtn:
		"//h3[normalize-space(text())='Activate Employee']/parent::div/parent::div//button[normalize-space() = 'Activate']",
	empActiveBadge: "//span[normalize-space(text())='active']",
	pathReActivateBtn: "//button[contains(@class,'ml-2 storybook-button')]//span[normalize-space() = 'Re-Activate']",
	empStatusText: "//div[normalize-space(text())='Employee Status: Terminated']",
	reActivateEmpBtn:
		"//h3[normalize-space(text())='Re-Activate Employee']/parent::div/parent::div//button[normalize-space() = 'Re-Activate']",
	confirmationMessageWithEmployeeName: (employeeName: string) =>
		`//span[@data-v-ab5eb994 and normalize-space()='${employeeName} is about to be activated. This is irreversible. Once you activate, you cannot move back the employee in status Draft.']`,
	clickOnAssignToEmployeeBtn: "//button[normalize-space()='Assign']",
	verifyPrimaryPositionAssignment:
		"//div[contains(@class, 'tooltip')]//div[normalize-space(text())='Position Assignment']",
	hoverOverPrimaryPositionAssignment: "(//*[name()='svg'])[2]",
	expandPositionInPathToReadiness: (positionName: string) =>
		`//span[normalize-space()="${positionName}"]//ancestor::tr//td//div[@class="dx-treelist-empty-space dx-treelist-collapsed"]`,
	expandRoleInPathToReadiness: (roleName: string) =>
		`//span[normalize-space()="${roleName}"]//ancestor::tr//td//div[@class="dx-treelist-empty-space dx-treelist-collapsed"]`,
	verifyCountOfAttachActiveRole: (count: number) =>
		`//span[@class='roles-res-label count-label-black' and number(text()) = ${count}]`,
	verifyCountOfAttachActiveResponsibility: (count: number) =>
		`//span[@class='roles-res-label res-count count-label-black' and number(text()) = ${count}]`,
	verifyEmployeeBadge: (badgeName: string) => `(//span[normalize-space()="${badgeName}"])[1]`,
	verifyGiveBadgeModal:
		"//div[contains(@class, 'v-card__title') and normalize-space(text()) = 'Give Badge for Responsibility']",
	clickOnGiveUpgradeBadge: "(//span[normalize-space()='Give Upgrade'])[1]",
	activeResponsibilityAssignment: (responsibilityName: string) =>
		`(//span[normalize-space()='${responsibilityName}'])[1]`,
};
