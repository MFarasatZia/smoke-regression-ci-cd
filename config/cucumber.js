/* eslint-disable no-undef */
module.exports = {
	default: {
		tags: process.env.TAGS,
		formatOptions: {
			snippetInterface: "async-await",
		},
		paths: ["Features/**/*.feature"],
		glue: "./steps/",
		dryRun: false,
		require: ["./steps/*.ts", "steps/**/*.ts", "helpers/hooks.ts"],
		requireModule: ["ts-node/register"],
		format: [
			"progress-bar",
			"json:test-results/json-report/cucumber-report.json",
			"html:test-results/html-report/dark-cucumber-report.html",
			"rerun:@rerun.txt",
		],
		parallel: 2,
	},
	rerun: {
		formatOptions: {
			snippetInterface: "async-await",
		},
		glue: "./steps/*/",
		dryRun: false,
		require: ["./steps/*.ts", "helpers/hooks.ts"],
		requireModule: ["ts-node/register"],
		format: ["progress-bar", "json:test-results/cucumber-report.json", "rerun:@rerun.txt"],
		parallel: 2,
	},
};
