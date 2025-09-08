export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			BROWSER: "chrome" | "firefox" | "webkit";
			ENV: "DEV" | "PROD" | "STAGING";
			BASEURL: string;
			BASEURLADMINPANEL: string;
			API_BASE_URL: string;
			ACCOUNT_ID: string;
			HEADLESS: boolean;
		}
	}
}
