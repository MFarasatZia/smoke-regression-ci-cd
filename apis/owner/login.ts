import { request } from "@playwright/test";
import { BaseClass } from "../../helpers/BaseClass";
import { getUserDetails } from "../../helpers/jsonHelper";

export default class LoginApis {
	baseInstance: BaseClass;

	constructor(baseInstance: BaseClass) {
		this.baseInstance = baseInstance;
	}

	async login() {
		const username = (await getUserDetails(this.baseInstance.user)).email;
		const password = (await getUserDetails(this.baseInstance.user)).password;

		const context = await request.newContext({
			// Create a request context with the necessary headers
			baseURL: process.env.API_BASE_URL,
			extraHTTPHeaders: {
				"Content-Type": "application/json",
			},
		});

		const response = await context.fetch("/api/common/login/", {
			// Make a POST request using the created context

			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			data: {
				email: username,
				password: password,
			},
		});

		return response;
	}

	async loginToAdminPortal(username: string, password: string) {
		const context = await request.newContext({
			// Create a request context with the necessary headers
			baseURL: process.env.API_BASE_URL,
			extraHTTPHeaders: {
				"Content-Type": "application/json",
			},
		});

		const response = await context.post("/api/common/admin/login/", {
			// Make a POST request using the created context

			headers: {
				"Content-Type": "application/json",
			},
			data: {
				email: username,
				password: password,
			},
		});

		return response;
	}
}
