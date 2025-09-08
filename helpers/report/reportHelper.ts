import { baseInstance } from "../BaseClass";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const reporter = require("cucumber-html-reporter");

const options = {
	theme: "bootstrap",
	jsonFile: "test-results/json-report/cucumber-report.json",
	output: "test-results/html-report/light-cucumber-report.html",
	reportSuiteAsScenarios: true,
	scenarioTimestamp: true,
	launchReport: true,
	metadata: {
		Environment: baseInstance.getEnv(),
		Browser: process.env.npm_config_BROWSER || "Chrome",
		Platform: "Windows 10",
		Parallel: "Scenarios",
		Headless: process.env.npm_config_HEADLESS || false,
	},
	failedSummaryReport: true,
};

reporter.generate(options);
