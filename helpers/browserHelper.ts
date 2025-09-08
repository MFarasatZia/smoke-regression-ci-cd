import { LaunchOptions, chromium, firefox, webkit } from "@playwright/test";
/**
 * Launch options for initializing browser
 */
const options: LaunchOptions = {
	headless: String(process.env.HEADLESS).toUpperCase() === "TRUE", // Convert to string and check
	args: ["--start-maximized"],
};

/**
 * This method is used to create browser instance.
 * Browser type is set in from helpers/environment/env.d.ts
 * @returns Browser
 */
export const invokeBrowser = () => {
	const browserType = process.env.npm_config_BROWSER || "chrome";
	switch (browserType) {
		case "chrome":
			return chromium.launch(options);

		case "firefox":
			return firefox.launch(options);
		case "webkit":
			return webkit.launch(options);
		default:
			throw new Error("Unknown browser");
	}
};
