export const elements = {
	catalogsPage: "//span[normalize-space()='Readiness Catalogs']",
	verifyResponsibilityExist: "(//span[@data-testid='obj-card-name'])[1]",
	verifyChecklistCount: "(//div[@class='level level-professional'][normalize-space()='12'])[1]",
	clickActionMenuChecklist: "(//div[@class='icon-container'])[1]",
	verifyListOfEmployee: "//div[@class='response-card-page v-card v-sheet theme--light']",
	verifyCoachCheckpointCounter: "(//div[@class='checkpoint-coach'][normalize-space()='1'])[1]",
	searchFieldForBadgeHolder: "//input[@id='input-2868']",
	verifyNoBadgeHolderText: "(//div[@class='no-record'][normalize-space()='No Badge Holders found'])[2]",
	verifyMasterCheckpointCounter: "(//div[@class='checkpoint-master'][normalize-space()='1'])[1]",
	verifyApprenticeCheckpointCounter: "(//div[@class='checkpoint-apprentice'][normalize-space()='1'])[1]",
	verifyChecklistHaveNoCounter: "(//div[@class='checkpoint-badge checkpoint-badge-red'])",
	verifyProfessionalCheckpointCounter: "(//div[@class='checkpoint-professional'][normalize-space()='1'])[1]",
	verifyEmployeeCards: "(//span[@class='current-status-text mt-2' and text()='Current:'])[1]",
	verifyRequestedTag: "//div[text()='Requested by/on']",
	verifyAccptedTag: "//div[text()='Assigned By/On']",
	clickOnAssignmentCard: "(//span[@class='assigment-badge'][normalize-space()='1'])[1]",
	verifyAssignmentPage: "//div[@class='response-card-page v-card v-sheet theme--light']",
	verifyRequester: "(//div[@class='v-list-item__title'][normalize-space()='John Doe'])[3]",
	clickOnDetachResponsibility: "(//span[@class='v-btn__content'][normalize-space()='Detach'])[1]",
	reasonFieldForNotApplicableModal: "(//h3[normalize-space()='Mark Criteria as Not Applicable'])[1]",
	reasonFieldForFailModal: "//span[normalize-space()='Fail']",
	notApplicableBtnDisabled: "//span[normalize-space()='Mark as Not Applicable']",
	failedBtnDisabled: "//span[normalize-space()='Fail']",
	markAsNotApplicableBtn: "//span[normalize-space()='Mark as Not Applicable']",
	verifyBadgeDefaultData: "(//div[contains(text(),'Badge Default')])[2]",
	filterButton: "//button[@class='search-bar']",
	clickOnActiveCheckpoint: "(//tr[contains(@class, 'dx-data-row') and contains(@class, 'dx-row-lines')])[1]",
	clickOnAIInstructionsButton: "//div[contains(@class, 'v-dialog')]//span[contains(@class, 'v-btn__content')]",
	clickOnAddInstructionsButton:
		"//div[contains(@class, 'v-dialog')]//button[contains(@class, 'storybook-button') and contains(., 'Add instructions')]",
	saveInstructionsButton:
		"//div[contains(@class, 'v-dialog')]//button[contains(@class, 'storybook-button') and contains(., 'Save')]",
	InstructionsAddedInCheckpoint: "(//button[contains(@class, 'textBtn') and text()='See more'])[1]",
	noFilter: (status: string) =>
		`//div[normalize-space()= 'Attachments']/parent::*//label[normalize-space()='${status}']/preceding-sibling::*`,
	noPositionButton: (status: string) =>
		`//div[normalize-space()= 'Attachments']/parent::*//label[normalize-space()='${status}']/preceding-sibling::*`,
	roleDatahideCard: "(//div[@class='d-flex'])[1]",
	clickOnNotApplicableButton:
		"//button[contains(@class, 'passFail-button') and contains(@class, 'btn-hover')]/span[normalize-space()='N/A']/..",
	clickOnPassedIconButton:
		"//button[contains(@class, 'passFail-button') and contains(@style, 'background-color: rgb(23, 178, 106)')]",
	removeStatusFilter:
		"(//span[contains(normalize-space(text()), 'Not Yet Passed')]//img[@class='search-cross-icon'])[1]",
	resetIcon: "//img[@class='cross-icon' and @alt='Passed Icon' and contains(@src, 'badge-cross-icon')]",
	verifyConfirmationDialog:
		"//div[@data-v-a88b7f28 and contains(@class, 'v-card__text text-center head-desc') and normalize-space()='Are you sure you want to Reset this evaluation?']",
	verifyRowNotApplicableIcon: "(//span[normalize-space()='N/A'])[1]",
	verifyRowPassed: "//div[contains(@class, '_parent-container') and ./span[text()='Passed']]",
	verifyRowFailed: "//div[contains(@class, '_parent-container') and ./span[text()='Failed']]",
	verifyNoResetDefault: "(//p[@class='was-reset'])[1]",
	verifyPendingEvaluiationStatus: "//div[@class='pass-fail-buttons reset-pending']",
	clickOnConfirmButton: "(//span[normalize-space()='Confirm'])[1]",
	roleDataCard: "(//div[@class='d-flex'])[1]",
	attachmentsPopup: "//div[@class='attach-text']",
	addcheckpoint: "(//span[@class='mr-1'][normalize-space()='Add Checkpoint'])[1]",
	addWithAIButton: "(//span[@class='button-text'][normalize-space()='Add with AI'])[1]",
	verifyCriteriaToInstruction: "//td[@class='dx-cell-focus-disabled']//div//p[contains(text(),' ')]",
	addCheckpointsButton: (button: string) => `(//span[normalize-space()='${button}'])[1]`,
	clickOnResponsibilitiesOnHeader: "//div[@role='tab' and contains(.,'Responsibilities')]",
	saveBtn: "(//span[contains(text(),'Save')])[2]",
	isElementDisplayed: (readinessValue) => `(//span[contains(text(),'${readinessValue}%')])[2]`,
	filters: {
		filterButton: "//button[@class='search-bar']",
		filterOptions: (option: string) => `//span[contains(@class, 'label') and normalize-space()='${option}']`,
		saveFilter: "//button[normalize-space()='Save Filter']",
	},
	verifyResponsibilityStatus: (status: string) =>
		`(//span[@class="prop-status-label proficiency-text--novice" and text()="${status}"])[1]`,
	verifyCounterIsNotVisible: "//span[@class='badge' and contains(text(), 'active')]",
	saveCheckpointBtn: "(//span[normalize-space()='Save'])[1]",
	clickOnSeeMoreButton: "(//button[@class='textBtn textBtn-91'][normalize-space()='See more'])[1]",
	clickOnResponsibility: "(//span[@data-testid='obj-card-name'])[1]",
	verifyBgCheckpoints: "(//div[@class='d-flex'])[1]",
	hoverOverIssueBadge: "(//span[contains(normalize-space(text()), 'Issue Badge')])[2]",
	employeeBadgeSearch: "//label[contains(@class, 'v-label')]/following-sibling::input[@type='text']",
	hoverOverGrantBadge:
		"//button[contains(@class, 'storybook-button') and contains(@class, 'storybook-plus-button-undefined')]",
	hoverOverAddCheckPointButton:
		"(//button[@data-v-9af3ba40 and contains(@class, 'storybook-button') and .//span[@class='mr-1' and text()='Add Checkpoint']])[1]",
	badgeHolderDialog: " //div[normalize-space()='+ Force Badge for Employee']",
	searchEmployeeList: "(//*[@data-testid='search-input'])[3]",
	pickEmployeeList: "(//div[@class='v-select__selections'])[2]",
	selectEmployee: (name: string) => `//div[@class='v-list-item__title content-title-emp' and contains(.,'${name}')]`,
	selectEmployeeBadge: (badgeName: string) => `(//span[normalize-space()="${badgeName}"])[1]`,
	badgeOnResponsibilityModal: "//div[@class='pro-holder-badge holder-badge--Professional']",
	responsibilityModalBadge: {
		badgeHolder: (badge: string) => `//div[@class='pro-holder-badge holder-badge--${badge}']`,
	},

	forceBadgeButton: "//button[normalize-space()='Force Badge']",
	removeBadge:
		"(//span[@class='holder-status-label holder-text--Apprentice']/following-sibling::button/span[@class='v-btn__content'])[1]",
	removeBadgePopup: "//div[normalize-space()='Remove Badge']",
	confirmRemoveBadge: "//span[normalize-space()='Confirm']",
	searchBadgeInput: "(//input[@data-testid='search-input'])[2]",
	verifySearchedBadgeVisible: (badgeName: string) => `//span[normalize-space()='${badgeName}']/parent::div`,
	responsibilitesSubMenu: "//*[contains(text(), 'Responsibilities')]",
	addResponsabilityButton: "//button[contains(text(), 'Add Responsibility')]",
	headerText: ".text-title",
	dashboardColumnText: "//div[contains(text(), 'Dashboard')]",
	attachedToColumnText: "//span[contains(text(), 'Attached To')]",
	statusColumnText: "//div[contains(text(), 'Status')]",
	addResponsibilityButton: "//button[normalize-space()='Add Responsibility']",
	hoverResponsibilityButton:
		"//button[contains(@class, 'storybook-button') and contains(@class, 'storybook-plus-button-undefined')]",
	addResponsibilityField: "//label[text()='Responsibility Name*']/following-sibling::div //input",
	characterLimitValidationMessage: "//div[contains(text(), 'Responsibility name cannot exceed 120 characters')]",
	loadingBtnIndicator: "//span[@class ='v-icon notranslate mr-2 theme--light']",
	enterNewResponsibilityName: "//div[normalize-space()='Search for Responsibility']//input",
	saveAsDraftButton: "//button[normalize-space()='Save as Draft']",
	searchField: "div[data-testid='ex-searchbar'] input[data-testid='search-input']",
	badge: "//span[starts-with(@class, 'storybook-badge')]",
	responsibilityCode: "[data-testid='obj-card-code']",
	firstThreeDotMenu: "//div[@class='icon-container']",
	getStatusForAResponsibility: {
		name: (respoName: string) => `//span[normalize-space()='${respoName}']/ancestor::tr/td[5]//span`,
	},
	menuBtnForAProject: {
		name: (respoName: string) =>
			`//span[normalize-space()='${respoName}']/ancestor::tr/td[6]//div[contains(@class,'employee_availability_icon')]`,
	},
	optionFromThreeDotMenu: {
		option: (text: string) => `//div[contains(@class,'menuable__content__active')]//li[normalize-space()='${text}']`,
	},
	threeDotMenuForAResponsibility: {
		option: (text: string) =>
			`//span[normalize-space()='${text}']/ancestor::tr/td[6]//div[contains(@class,'employee_availability_icon')]`,
	},
	activateModal: {
		modal: "//h3[normalize-space()='Activate Responsibility']",
		button: "//button[normalize-space()='Activate']",
	},
	deleteModal: {
		modal: "//h3[normalize-space()='Delete Role']",
		btn: "//button[normalize-space()='Delete']",
	},
	renameModal: {
		modal: "//div[@class='v-card__title dialog-title']",
		Input: "//label[normalize-space()='Responsibility Name*']/parent::*//input",
		saveBtn: "//button[normalize-space()='Save']",
	},
	retireModal: {
		modal: "//h3[normalize-space()='Retire responsibility']",
		btn: "//button[normalize-space()='Retire']",
	},
	deActivateModal: {
		modal: "//h3[normalize-space()='De-Activate Role']",
		btn: "//button[normalize-space()='De-Activate']",
	},
	reActivateModal: {
		modal: "//h3[normalize-space()='Re-Activate Role']",
		btn: "//button[normalize-space()='Re-Activate']",
	},
	nextPageButton: "//button[normalize-space()='Next']",
	noData: "//span[normalize-space()='No data']",
	addNewResponsibility: "//div[@class='v-list custom-list v-sheet theme--light']",
	confirmNewResponsibility: "//button[normalize-space()='Confirm']",
	reponsibilityAttachedSuccess: "//div[@role='status' and contains(.,'Item added successfully')]",
	attachResponsibility: "//button[contains(.,'Attach')]",
	attachedResponsibilitySuccessToast: "//div[normalize-space()='Responsibility attached successfully.']",
	badgeHoldersModal: {
		activeBadgeHoldersTab: "//div[contains(text(), 'Badge Holders') and contains(@class, 'v-tab--active')]",
		badgeWrapper: ".wrap-frame.badge-items",
		badgesList: ".pro-holder-badge",
		BadgeName: "(//div[@class='pro-holder-badge holder-badge--Master'])[1]",
		BadgeIcon:
			"//button[@class='avail-close-btn holder-cross-icon v-btn v-btn--icon v-btn--round theme--light v-size--default hover-cross-Coach']//span[@class='v-btn__content']",
		badgeIconTooltips: "//div[@class='_title' and text()='Remove Badge']",
		badgetoltips: "//div[contains(text(),'Creates Standards')]",
		masterBadgeName: ".holder-text--Master",
		coachBadgeName: ".holder-text--Coach",
		professionalBadgeName: ".holder-text--Professional",
		apprenticeBadgeName: ".holder-text--Apprentice",
		badgeHolderCounter: {
			badgeHolderBadge: (badge: string) => `(//div[@class='level level-${badge}'])[1]`,
		},
		badgeHolderHoverToltipsHover: {
			badgeHoldertoltips: (level: string) =>
				`//div[@class='_title' and contains(text(), 'Click to filter Badges by level') and contains(text(), ${level})]`,
		},
	},
	breadCrumbComponent: {
		breadCrumbOnResponsibilityPage: "//div[@data-testid='ex-responsibility-badge-holder']/ul",
	},
	checklist: {
		checklistTab: "//div[text()=' Checklist ']",
		attachLinkModal: "//label[normalize-space()='Add link to attach']/following-sibling::input",
		checkpointCounter: {
			checkpointBadge: (badge: string) => `(//div[@class='level level-${badge}'])[1]`,
		},

		badgeStatusFilter: {
			selectCheckpointBadge: (status) => `(//div[@class='level level-${status}'])[1]`,
		},
		checkpointCounterSelected: {
			selectedBadge: (badge: string) => `(//div[@class='level level-${badge} selected'])[1]`,
		},
		checklistFilteredCriteria:
			"//p[normalize-space()='test']/parent::div//span[@class='v-chip v-chip--no-color theme--light v-size--default proficiency-badge-plain--coach']",
		addCheckpointButton: "(//span[@class='mr-1'][normalize-space()='Add Checkpoint'])[1]",
		checklistTable: "(//div[@role='presentation'])[9]",
		checkpointHoverToltipsHover: {
			checkpointtoltips: (level: string) =>
				`//div[@class='_title' and contains(text(), 'Click to filter checkpoints by level') and contains(text(), '${level}')]`,
		},
		checkpointSelectedToltipsHover: {
			checkpointSelectedtoltips: (level: string) =>
				`//div[@role='tooltip' and normalize-space()='Unselect to remove filter by Checkpoint level ${level}']`,
		},
		checkpointCriteria: (checkpointText: string) => `(//p[@class='criteria-text' and text()='${checkpointText}'])[1]`,
		checkpointInstruction: (instruction: string) => `(//div[@class='instructions']//p[text()='${instruction}'])[1]`,
		checkpointActionMenu: "(//div[@class = 'icon-container'])[1]",
		clickOnBadgeIcon: "(//div[@class='select-item-level'])[2]",
		checklistBadgeLevel: (badgeLevel: string) => `(//div[@role='listbox']//div[normalize-space()='${badgeLevel}'])[6]`,
		checklistStatus: (checkpointText: string, status: string) =>
			`(//div[normalize-space()='${checkpointText}']/ancestor::td/following-sibling::td//span[normalize-space()='${status}'])[1]`,
		checklistActions: {
			checklistActionOption: (action: string) =>
				`//div[contains(@class,'menuable__content__active')]//li[normalize-space()='${action}']`,
			deleteChecklistPopUp: (action: string) => `//h3[normalize-space()='${action} Checkpoint']`,
			deleteCheckpoint: (action: string) => `//button[normalize-space()='${action}']`,
		},
		addCheckpointModal: {
			changeCheckpointModal: "//div[normalize-space()='Change Checkpoint']",
			criteriaField: ".v-dialog__content--active input[data-testid=\"search-input\"]",
			instructionsField: "div[aria-label=\"Editor content\"]",
			updateInstruction: "(//div[@aria-label='Editor content']/p)[1]",
			saveChecklistButton: "//button[normalize-space()='Save']",
			disabledSaveCheckpointButton: "//button[normalize-space()='Save' and @disabled='disabled']",
		},
	},

	badgeCounter: (badge: string) => `(//div[@class='level level-${badge}'])`,

	badgeCounterSelected: {
		badgeSelected: (badge: string) => `(//div[@class='level level-${badge} selected'])[1]`,
	},

	chatter: {
		messageList: ".v-window-item--active .chatter-view .message-text",
		loadMoreButton: ".v-window-item--active button",
	},
	filter: {
		filterMoreButton: "(//span[@class='filter'][normalize-space()='More Filters'])[1]",
		filterButton: "(//button[@class='px-4 d-flex flex-nowrap align-center search-bar'])[1]",
		filterStatusOptions: (status: string) =>
			`//div[normalize-space()= 'Status']/parent::*//span[normalize-space()='${status}']/preceding-sibling::*`,
		saveFilter: "//button[normalize-space()='Save Filter']",
		filteredResults: (status: string) =>
			`//span[@data-testid='obj-card-name']/ancestor::td/following-sibling::td//span[normalize-space()='${status}']`,
		selectedFilter: (status: string) => `(//span[@class='v-chip__content' and normalize-space()='${status}'])[1]`,
		removeFilter: (status: string) => `(//span[normalize-space()='${status}']//*[@class='search-cross-icon'])[1]`,
	},
	chatters: {
		chatterTable: "//div[@class='v-window-item v-window-item--active']//div[@class='v-card__text']'",
		chatterTableRecordsToday:
			"//div[@class='v-window-item v-window-item--active']//div[@class='divider'][normalize-space()='Today']",
	},

	searchInputCheck: "(//input[@data-testid='search-input'])[2]",
	firstCheckpoint: "(//p[@class='criteria-text'])[1]",
	responsibilityThreeDot: "//div[@class='org-menu']//div[@class='ex-generic-selector-default-activator']",
	responsibilityBadge: {
		status: (badge: string) => `//div[@class='response-left']//span[normalize-space() ='${badge}']`,
	},

	firstResponsibility: "(//span[@class='object-card-name'])[1]",
	searchfield: "div[data-testid='ex-searchbar'] input[data-testid='search-input']",
	criteriaModal: "//div[normalize-space()='Change Checkpoint']",
	criteriaHoverTooltip: "(//div[@id='el-tooltip-5835']//div[normalize-space()='Click to edit'])[3]",
	responsibilitySearchfield: "div[data-testid='ex-searchbar'] input[data-testid='search-input']",
	searchLabel: "(//label[normalize-space() ='Search'])[2]",
	employeeFieldCaretUp:
		"//button[@class='v-icon notranslate v-icon--link mdi mdi-chevron-up theme--light primary--text']",
	employeeField: "//input[@type='text']",
	employeeList: "//div[@class='employee-list-view']",
	verifyListOfCheckpoint: "(//div[@class='pass-fail-buttons reset-pending'])[1]",
	saveButton: "//span[contains(text(),'Save')]/ancestor::button",
	badgeList: "(//span[@class='pt-2'])[1]",
	pathToReadinessBadge: {
		giveBadge: "(//span[contains(text(),'Give Badge')])[4]",
		giveUpgradeBadge: "(//span[contains(text(),'Give Badge')])[3]",
		confirmButton: "//span[normalize-space()='Confirm']",
		removeBadgeButton: "(//span[normalize-space()='Remove Badge'])[1]",
		clickOnMasterInspectionBadge: "(//div[@class='status-box professional x-mark'])[3]",
	},
	badgeHolder: (badge: string) => `(//span[@class='prop-status-label proficiency-text--${badge} ml-3'])`,
	optionMenu: {
		option: (action: string) =>
			`//div[@class='v-menu__content theme--light menuable__content__active ex-generic-selector']//li[contains(.,'${action}')]`,
	},
	activateButton: "//button[normalize-space() = 'Activate']",
	colNames: {
		firstCol: "//td[normalize-space() = 'Responsibility']",
		secondCol: "//td[normalize-space() = 'Dashboard']",
		thirdCol: "//td[normalize-space() = 'Attached To']",
		fourthCol: "//td[normalize-space() = 'Assignment']",
		fifthCol: "//td[normalize-space() = 'Status']",
	},

	checklistNextBtn: "(//button[normalize-space() = 'Next'])[1]",
	checklistPreviousBtn: "(//button[normalize-space() = 'Previous'])[1]",
	emptyChecklist: "(//div[@class='no-record'][normalize-space()='No Checkpoints found'])[1]",
	failBtn: "(//button[@class = 'passFail-button btn-hover'])[2]",
	notApplicableBtn: "(//button[@class = 'passFail-button btn-hover'])[3]",
	notApplicableBadge: "//button[@class='passedFailed-btn']",
	failBadge: "//td[@class='dx-cell-focus-disabled']//button[@class='passedFailed-btn']",
	resetBadge: "(//div[@class='_reset-footer'])[1]",
	clickAttachLinkButton: "//div[@class='dx-button-content']//i[@class='dx-icon dx-icon-link']",
	responsibilityName:
		"//td[@class='dx-treelist-cell-expandable dx-cell-focus-disabled']//div[@class='dx-treelist-text-content']",
	hoverOverThreeDotMenuButton: "(//div[@class='icon-container'])[1]",
	firstResponsibilityThreeDot: "(//div[@class='icon-container'])[1]",
	chatterDrawerIcon: "(//div[@class= 'v-image v-responsive chatter-icon theme--light'])[1]",
	addCheckpointBtn: "(//button[normalize-space() = 'Add Checkpoint'])[1]",
	chatterDrawer: "(//div[@class='v-list-item__title chatter-text'][normalize-space()='Chatter'])[1]",
	chatterName: {
		name: (criteria: string) =>
			`//div[@class='v-list-item__title chatter-text-title'][normalize-space()='${criteria}']`,
	},
	closeIcon: "(//span[@class='v-btn__content'])[3]",
	checklistPage: {
		name: (criteria: string) => `//span[@class='object-card-name'][normalize-space() = '${criteria}']`,
	},
	noCheckpointsFound:
		"//div[@class='v-window-item v-window-item--active']//div[@class='no-record'][normalize-space()='No Checkpoints exists for this responsibility']",
	badgeHolderTab: "//div[@class='menu-tabs v-tab v-tab--active']",
	checklistThreeDot: "(//div[@class='icon-container'])[1]",
	filterCheckBox: {
		filter: (option: string) =>
			`//div[normalize-space()= 'Status']/parent::*//span[normalize-space()='${option}']/parent::*//*[name()='svg']`,
	},
	moreFilterBtn: "//button[normalize-space() = 'More Filters']",
	assignmentTabData: "//div[@class='v-window-item v-window-item--active']//div[6]",
	assignmentFilterBtn: "(//button[normalize-space() ='Filters'])[2]",
	filterModal: "//div[@class='filter-modal-popup pb-1 v-card v-sheet theme--light']",
	veirfyLoaderActionsIcons: "//div[@class='ex-white-spinner v-icon__component theme--light']",
	noCheckpointText: "(//div[@class='no-record'][normalize-space()='No Checkpoint exists for this responsibility'])[1]",
	noCheckpointsVisibleText: "//div[@class = 'no-record'][normalize-space() = 'No Checkpoints Visible']",
	verifyChecklistFilterisDisplayed: "(//span[@class='v-chip__content'][normalize-space()='draft'])[1]",
	clickOnClearFilter: "(//span[contains(text(),'Clear Filter')])[2]",
	closeCheckpointsModal:
		"//div[@class='close-icon-container']//i[@class='v-icon notranslate mdi mdi-close theme--light']",
	assignmentModalNotDisplayed: "//div[@class='heading' and normalize-space(text())='Add Checkpoint']",
	clickOnAssignmentFilterBtn:
		"//div[@class='v-window-item v-window-item--active']//span[@class='filter'][normalize-space()='More Filters']",
	applyStatusFilterForResponsibilityAssignment: (status: string) =>
		`//div[normalize-space()= 'Status']/parent::*//span[normalize-space()='${status}']/preceding-sibling::*`,
	verifyAssignmentFilters: (status: string) => `(//span[@class='v-chip__content'][normalize-space()='${status}'])[1]`,
	proficiencyFilterTags: (tag: string) => `//span[contains(text(),'${tag}')]`,
	evaluateFilter: (filter: string) => `//label[normalize-space()='${filter}']`,
	filterCloseIcon: "//button[@class='filter-close-btn v-btn v-btn--icon v-btn--round theme--light v-size--default']",
	noRespFoundText: "//div[@class='no-record']",
	checkpointCounter: "//div[@class='checkpoint-badge checkpoint-badge-gray']",
	verifyBadge: (badge: string) =>
		`//div[contains(@class, 'pentagon') and contains(@class, 'Professional') and normalize-space()='Ready for ${badge}']`,
	openIssueBadgeDropDown: "//div[contains(@class, 'select-item-level') and text()='Issue Badge']",
	grantBadgeToEmployee: "(//span[normalize-space()='Grant Professional'])[1]",
	verfiyIssueBadge: (employeeName: string) =>
		`//span[contains(@class, 'holder-status-label') and contains(@class, 'holder-text--Coach') and normalize-space(text())='${employeeName}']`,
	onlyRespInspectProficiency: "(//div[contains(@class,'pr-0 col-3')]//div)[2]",
	assignmentTreeRespInspectProficiency: "(//div[@class='row ps-4']//div)[1]",
	commentIcon: "//div[@class='comment-icon-container']",
	toolTipContent: "//div[@id='el-tooltip-1736']//div//div[@class='_tooltip-content']",
	hoverOverProfessioanlInspectionBadge: "(//div[@class='outer-square professional']//div)[1]",
	hoverOverApprenticeInspectionBadge: "(//div[@class='outer-square apprentice']//div)[1]",
	clickOnMasterInspectionBadge: "(//div[@class='status-box professional x-mark'])[3]",
	clickOnRemoveBadgeButton: "(//span[normalize-space()='Remove Badge'])[1]",
	verifyBadgeStatusToolip: (status: string) => `//div[normalize-space(text())='${status}']`,
	dropdownButton: "//button[@class='v-icon notranslate v-icon--link mdi mdi-chevron-down theme--light']",
	showColumn: (column: string) => {
		if (column === "Master") {
			return "//div[contains(@class, 'dx-template-wrapper')]//span[text()='Masters']";
		}
		if (column === "Assignments" || column === "Assignemnts") {
			return "//div[contains(@class, 'dx-template-wrapper')]//span[text()='Assignments']";
		}
		return `//div[contains(@class, 'dx-template-wrapper')]//span[text()='${column}']`;
	},

	IssueBadgeModal: {
		issueBadgeButton: "//span[normalize-space()='Issue Badge']",
		issuebadgeModal:
			"//div[contains(@class, 'v-card__title') and contains(@class, 'head-title-emp') and contains(@class, 'head-title-attach-emp')]",
		employeeFieldDropDown:
			"//button[@class='v-icon notranslate append-icon-hover v-icon--link mdi mdi-chevron-down theme--light']",
		firstEmployeeInList: "(//div[@class='d-flex align-center'])[1]",
		userClickOnCrossIcon: "//button[@data-v-e7382b44 and @type='button' and contains(@class, 'mdi-chevron-down')]",
		nextButton: "//button[normalize-space() = 'Next']",
		proficiencyPage: "//div[contains(text(),'Inspect Proficiency for a Responsibility')]",
		passBtn: "//div[@class='pass-fail-buttons']//button[1]",
		passBadge: "//td[@class='dx-cell-focus-disabled']//button[@class='passedFailed-btn']",
	},
	activeResponsibilityHeaderCount: "(//span[@aria-label='Badge'])[2]",
};
