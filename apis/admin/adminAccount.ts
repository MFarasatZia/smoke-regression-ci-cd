import { BaseClass } from "../../helpers/BaseClass";
import { getUserDetails } from "../../helpers/jsonHelper";
import { request } from "@playwright/test";
import { User } from "../owner/account";

export default class AdminAccountApis {
	baseInstance: BaseClass;

	constructor(baseInstance: BaseClass) {
		this.baseInstance = baseInstance;
	}

	private async contextCreator(emailKey: keyof User, passwordKey: keyof User) {
		const userDetails = await getUserDetails(this.baseInstance.user);
		const username = userDetails[emailKey];
		const password = userDetails[passwordKey];

		const credentials = Buffer.from(`${username}:${password}`).toString("base64");

		return request.newContext({
			baseURL: process.env.API_BASE_URL,
			extraHTTPHeaders: {
				Authorization: `Basic ${credentials}`,
				"Content-Type": "application/json",
			},
		});
	}

	async createAdminContext() {
		return this.contextCreator("super_user_email", "super_user_password");
	}

	async createContext() {
		return this.contextCreator("email", "password");
	}

	async createAccountUsingNormalUser(accountName: string) {
		const context = await this.createContext();

		return context.post("/api/common/account/create/", {
			data: {
				name: accountName,
			},
		});
	}

	async createAccount(accountName: string) {
		const context = await this.createAdminContext();

		return context.post("/api/common/account/create/", {
			data: {
				name: accountName,
			},
		});
	}

	async renameAccount(accountId: number, newName: string) {
		const context = await this.createAdminContext();

		return await context.patch(`/api/common/account/${accountId}/rename/`, {
			data: {
				name: newName,
			},
		});
	}

	async openAccount(accountId: number, newEmail: string, firstName: string, lastName: string) {
		const context = await this.createAdminContext();

		return await context.put(`/api/common/account/${accountId}/open/`, {
			data: {
				email: newEmail,
				// eslint-disable-next-line camelcase
				first_name: firstName,
				// eslint-disable-next-line camelcase
				last_name: lastName,
			},
		});
	}

	async suspendAccount(accountId: number, reason: string) {
		const context = await this.createAdminContext();

		return await context.post(`/api/common/account/${accountId}/suspend/`, {
			data: {
				reason: reason,
			},
		});
	}

	async closeAccount(accountId: number) {
		const context = await this.createAdminContext();

		return await context.post(`/api/common/account/${accountId}/close/`, {
			data: {
				// eslint-disable-next-line camelcase
				account_id: accountId,
			},
		});
	}

	async changeOwner(accountId: number, newAccountEmail: string) {
		const context = await this.createAdminContext();

		return await context.post(`/api/common/account/${accountId}/change-owner/`, {
			data: {
				email: newAccountEmail,
			},
		});
	}

	async deleteAccount(accountId: number) {
		const context = await this.createAdminContext();

		return await context.delete(`/api/common/account/${accountId}/delete/`);
	}

	async getAccount(accountId: number) {
		const context = await this.createAdminContext();

		return await context.get(`/api/common/account/${accountId}/`);
	}

	async updateAccount(
		accountId: number,
		updatedData: { show_employee_directory: boolean; show_responsibilities_directories: boolean },
	) {
		const context = await this.createAdminContext();
		return await context.patch(`/api/common/account/${accountId}/`, {
			data: updatedData,
		});
	}
}
