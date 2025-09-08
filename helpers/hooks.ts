import {
	After,
	Before,
	AfterAll,
	BeforeAll,
	BeforeStep,
	AfterStep,
	setDefaultTimeout,
	Status,
} from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { Base, baseInstance } from "./BaseClass";
import { invokeBrowser } from "./browserHelper";
import { setEnvFile } from "./environment/env";
import { createLogger } from "winston";
import { options } from "../helpers/util/logger";
import { CustomWorld } from "./customWorld";
import LoginPage from "../pages/owner/loginPage";
// import AdminLoginPage from "../pages/admin/adminLoginPage"; //commented until ER-657 is fixed
import { getUserDetails } from "./jsonHelper";

let browser: Browser;
let browserContext: BrowserContext;
let hasBackendTag: boolean;
let hasAdminTag: boolean;
let hasCustomLoginTag: boolean;
let userName: string;
let password: string;

// Set default timeout X seconds globally
setDefaultTimeout(90 * 1000);

/**
 * BeforeAll hook launches created a browser instance before starting suite execution
 */
BeforeAll(async function () {
	// Get environment from CLI
	setEnvFile(baseInstance.getEnv());

	browser = await invokeBrowser();
});

/**
 * Before hook creates logs and launches a browser context and new page before every scenario
 */
Before(async function (this: CustomWorld, { pickle }) {
	// eslint-disable-next-line @typescript-eslint/no-this-alias
	Base.worldInstance = this;
	this.scenarioName = pickle.name + "_" + pickle.id;

	this.startTime = new Date();

	Base.logger = createLogger(options(this.scenarioName));
	Base.logger.info("Environment: " + process.env.ENV);
	Base.logger.info("Browser type: " + process.env.BROWSER);
	Base.logger.info("Start Time: " + this.startTime);

	const browserContextOptions = {
		...(process.env.VIDEO == "true" ? { recordVideo: { dir: "test-results/videos/" } } : {}),
		viewport: {
			width: 1680,
			height: 1050,
		},
	};

	const loginPage: LoginPage = new LoginPage(baseInstance);
	// const adminLoginPage: AdminLoginPage = new AdminLoginPage(baseInstance); //commented until ER-657 is fixed

	hasBackendTag = pickle.tags.some((tag) => tag.name.toLowerCase() === "@backend");
	hasAdminTag = pickle.tags.some((tag) => tag.name.toLowerCase() === "@admin");
	hasCustomLoginTag = pickle.tags.some((tag) => tag.name.toLowerCase() === "@customlogin");
	baseInstance.user = process.env.DEFAULT_SIGN_IN_USER;

	if (!hasBackendTag) {
		browserContext = await browser.newContext(browserContextOptions);
		Base.page = await browserContext.newPage();
		if (hasAdminTag) {
			await baseInstance.openURL(process.env.BASE_URL_ADMIN_PANEL);
			// await adminLoginPage.loginToAdminPortal(); //commented until ER-657 is fixed
		} else if (hasCustomLoginTag) {
			await baseInstance.openURL(process.env.BASE_URL);
		} else {
			userName = (await getUserDetails(baseInstance.user)).email;
			password = (await getUserDetails(baseInstance.user)).password;
			await baseInstance.openURL(process.env.BASE_URL);
			await loginPage.loginToMainPortal(userName, password);
			if (process.env.DEFAULT_SIGN_IN_USER == "Dev") {
				if (await loginPage.isMultipleAccountsPageDisplayed()) {
					await loginPage.selectHazenfieldAccount();
				}
			} else if (process.env.DEFAULT_SIGN_IN_USER == "Stg") {
				if (await loginPage.isMultipleAccountsPageDisplayed()) {
					await loginPage.selectAhsanAccount();
				}
			}
		}
	}
});

BeforeStep(async function () {
	// TODO:
});

/**
 * AfterStep hook will take screenshot if step fails
 */
AfterStep(async function ({ result }) {
	if (result.status !== Status.PASSED) {
		Base.logger.error("Step Name: " + Base.worldInstance.scenarioName);
		Base.logger.error("Step failed with error: " + result.exception);
		Base.logger.error("Message: " + result.exception.message + ", Error Type: " + result.exception.type);
		if (!hasBackendTag) {
			await baseInstance.takeScreenshot();
		}
	}
});

/**
 * After hook closes the page
 */
After(async function ({ result }) {
	Base.logger.info("Scenario status: " + result.status);
	if (!hasBackendTag) {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		try {
			if (Base.page && !Base.page.isClosed()) {
				await Base.page.close();
			}
			if (browserContext) {
				await browserContext.close();
			}
		} catch (error) {
			Base.logger.warn("Error during cleanup: " + error.message);
		}
	}
});

/**
 * AfterAll hook closes the browser and logger
 */
AfterAll(async function () {
	await browser.close();
});
