import * as fs from "fs";
import fetch from "node-fetch";

// Function to upload report to the server
async function uploadReport() {
	const reportFile = "test-results/json-report/cucumber-report.json";
	const data = fs.readFileSync(reportFile);
	const stats = fs.statSync(reportFile);
	const fileSizeInBytes = stats.size;

	const headers = {
		"Content-length": fileSizeInBytes,
		"X-API-KEY": process.env.BEHAVE_PRO_API_KEY,
		"X-COMMIT-ID": process.env.COMMIT_ID,
		"X-BUILD-ID": process.env.CODEBUILD_BUILD_ID
	};

	try {
		const response = await fetch("https://test-reports.behave.pro/REST/1.0/bdd/report", {
			method: "PUT",
			headers,
			body: data
		});

		if (!response.ok) {
			throw new Error(`Failed to upload report. Status: ${response.status}`);
		}

		const responseData = await response.json();

		console.log(response.status);
		console.log(responseData);
		console.log(headers);
	} catch (error) {
		console.error("Error uploading report:", error);
	}
}

// Upload report
uploadReport().catch(error => console.error("Unhandled error during report upload:", error));
