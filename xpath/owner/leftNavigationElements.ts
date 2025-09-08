export const elements = {
	header: {
		logo: "//div[@data-test='ClientLogo']",
	},
	rememberMeCheckbox: "//div[contains(.,'Remember for')]",
	isVisibleEmailPlaceHolder: "//input[@placeholder='Enter your email']",
	isVisiblePasswordPlaceHolder: "//input[@placeholder='Enter your password']",
	alignmnetOfRememberMeCheckbox:
		"//button[@class='v-icon notranslate img-icon v-icon--link theme--light transparent--text']",
	hoverOverAddRoles: "//button[@data-v-9af3ba40 and @type='button' and contains(@class, 'storybook-button')]",
	hoverOverAttachResponsibility:
		"//button[@data-v-9af3ba40 and @type='button' and contains(@class, 'storybook-button')]",
	loaderDisplay: "//div[@class='ex-white-spinner v-icon__component theme--light']",
	leftNavigation: {
		sideBarPanel: ".main-sideBar-panel",
		settingsOption: "//a[normalize-space()='Settings']",
		organizationOption: "//div[@data-test='Organization']//div[@role='button']",
		searchField: "(//input[@data-testid='search-input'])[1]",
		notificationBellIcon: "//div[@data-testid='notification-bell']",
		notificationItems: "//div[@data-testid='ex-notification-feed']",
		logoutButton: "//button[@class='v-btn v-btn--icon v-btn--round theme--light v-size--default']",
		logoButton: "(//div[@class='v-responsive__content'])[2]",
		signInBtn: "//span[normalize-space()='Sign in']",
		organizationOptions: {
			employeesOption: "//a[contains(@href,\"/organization/employees\")]//span[normalize-space()=\"Employees\"]",
			positionOption: "//span[normalize-space()='Positions']",
		},
		readinessOption: "//div[@data-test='Readiness']//div[@role='button']",
		readinessOptions: {
			employeesOption: "//div[@data-test='Readiness']//span[normalize-space()='Employees']",
			catalogsOption: "//span[normalize-space()='Catalogs']",
		},
		myServicesHeader: "//h1[text()=\"My Stuff\"]",
		myServicesOption: "//div[@class='v-list-item__title sidebar-title' and normalize-space()='My Services']",
		servicesOptions: {
			myStuffOption: "//span[text()=\"My Stuff\"]",
			managingOthersOption: "//span[text()=\"Managing Others\"]",
			beAMasterCoachOption: "//span[text()=\"Be a Master/Coach\"]",
			beAMasterCoachOptionButton: "//span[normalize-space()='Be a Master/Coach']",
		},
		userName: ".v-list-item__title.user-name",
		userEmail: ".v-list-item__subtitle.user-email",
	},

	noEmployeeFound: "//h3[contains(text(),'No employees found')]",
	verifyDynamicAccountName:
		"//div[@class='d-flex justify-start account-name' and normalize-space(.)='Single Automation']",
};
