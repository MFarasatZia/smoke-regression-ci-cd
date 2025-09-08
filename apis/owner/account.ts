import { BaseClass } from "../../helpers/BaseClass";
import { getUserDetails } from "../../helpers/jsonHelper";
import { request } from "@playwright/test";

interface User {
	email: string;
	password: string;
	multiple_accounts_email: string;
	super_user_email: string;
	super_user_password: string;
}

export default class AccountApis {
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

	async createContext() {
		return this.contextCreator("email", "password");
	}

	async createAdminContext() {
		return this.contextCreator("super_user_email", "super_user_password");
	}

	async createNewAccount(name: string) {
		const context = await this.createAdminContext();

		const response = await context.post("/api/common/account/create/", {
			data: {
				name: name,
			},
		});

		return response;
	}

	async createAccountError(name: string) {
		const context = await this.createContext();

		const response = await context.post("/api/common/account/create/", {
			data: {
				name: name,
			},
		});

		return response;
	}

	async createUserForAccount(
		email: string,
		firstName: string,
		lastName: string,
		status: string,
		isOwner: boolean,
		token: string,
	) {
		const context = await request.newContext({
			baseURL: process.env.API_BASE_URL,
			extraHTTPHeaders: {
				Authorization: `Token ${token}`,
				"Content-Type": "application/json",
			},
		});
		return context.post(`/api/common/account/${process.env.ACCOUNT_ID}/user/`, {
			data: {
				email,
				// eslint-disable-next-line camelcase
				first_name: firstName,
				// eslint-disable-next-line camelcase
				last_name: lastName,
				// eslint-disable-next-line camelcase
				account_permission: {
					// eslint-disable-next-line camelcase
					has_access: true,
					// eslint-disable-next-line camelcase
					is_owner: isOwner,
					// eslint-disable-next-line camelcase
					has_readiness_access: true,
					// eslint-disable-next-line camelcase
					has_knowledge_access: true,
					// eslint-disable-next-line camelcase
					has_compensation_access: true,
					// eslint-disable-next-line camelcase
					created_by: process.env.ACCOUNT_ID,
					// eslint-disable-next-line camelcase
					updated_by: process.env.ACCOUNT_ID,
				},
				// eslint-disable-next-line camelcase
				is_superuser: "false",
				// eslint-disable-next-line camelcase
				state: `${status}`,
			},
		});
	}

	async renameAccount(accountId: number, newName: string) {
		const context = await this.createContext();

		const response = await context.patch(`/api/common/account/${process.env.ACCOUNT_ID}/rename/`, {
			data: {
				name: newName,
			},
		});

		return response;
	}

	async updateAccessDetails(accountId: number, id: number) {
		const context = await this.createContext();

		const response = await context.post(`/api/common/account/${process.env.ACCOUNT_ID}/access/${id}/`, {
			data: {
				// eslint-disable-next-line camelcase
				has_access: true,
				// eslint-disable-next-line camelcase
				is_suspended: true,
				// eslint-disable-next-line camelcase
				is_owner: true,
				// eslint-disable-next-line camelcase
				is_co_owner: true,
				// eslint-disable-next-line camelcase
				has_readiness_access: true,
				// eslint-disable-next-line camelcase
				has_knowledge_access: true,
				// eslint-disable-next-line camelcase
				has_performance_access: true,
				// eslint-disable-next-line camelcase
				has_compensation_access: true,
				// eslint-disable-next-line camelcase
				created_by: 0,
				// eslint-disable-next-line camelcase
				updated_by: 0,
			},
		});

		return response;
	}

	async suspendAccount(accountId: number, reason: string) {
		const context = await this.createContext();

		const response = await context.post(`/api/common/account/${process.env.ACCOUNT_ID}/suspend/`, {
			data: {
				reason: reason,
			},
		});

		return response;
	}

	async createNewBadge(accountId: number, badgeLevel: number, issuedTo: number, issuedFor: number) {
		const context = await this.createContext();
		const response = await context.post(`/api/proficiency/account/${process.env.ACCOUNT_ID}/badge/`, {
			data: {
				level: badgeLevel,
				// eslint-disable-next-line camelcase
				issued_to: issuedTo,
				// eslint-disable-next-line camelcase
				issued_for: issuedFor,
			},
		});
		return response;
	}

	async createUserAccount(userId: number, payload: { name: string }) {
		const context = await this.createContext();
		const response = await context.post(`/api/common/account/${process.env.ACCOUNT_ID}/user/${userId}/account/`, {
			data: payload,
		});
		return response;
	}

	async getUserAccount(userId: number, accountRecordId: number) {
		const context = await this.createContext();
		const response = await context.get(
			`/api/common/account/${process.env.ACCOUNT_ID}/user/${userId}/account/${accountRecordId}/`,
		);
		return response;
	}

	async removeBadge(accountId: number, badgeId: number, method: string, reason: string) {
		const context = await this.createContext();
		const response = await context.post(`/api/proficiency/account/${process.env.ACCOUNT_ID}/badge/${badgeId}/remove/`, {
			data: {
				badge: badgeId,
				method: method,
				reason: reason,
			},
		});
		return response;
	}

	async createUserForAdmin(
		newEmail: string,
		firstName: string,
		lastName: string,
		isOwner: boolean,
		isSuperUser: boolean,
	) {
		const context = await this.createAdminContext();

		const response = await context.post("/api/common/user-create/", {
			data: {
				email: newEmail,
				// eslint-disable-next-line camelcase
				first_name: firstName,
				// eslint-disable-next-line camelcase
				last_name: lastName,
				permissions: {
					// eslint-disable-next-line camelcase
					has_access: true,
					// eslint-disable-next-line camelcase
					is_owner: isOwner,
					// eslint-disable-next-line camelcase
					has_readiness_access: true,
					// eslint-disable-next-line camelcase
					has_knowledge_access: true,
					// eslint-disable-next-line camelcase
					has_performance_access: true,
					// eslint-disable-next-line camelcase
					has_compensation_access: true,
				},
				// eslint-disable-next-line camelcase
				super_user: isSuperUser,
				account: process.env.ACCOUNT_ID,
			},
		});
		return response;
	}

	async renameUser(userId: number, firstName: string, lastName: string) {
		const context = await this.createAdminContext();

		const response = await context.post(`/api/common/account/${process.env.ACCOUNT_ID}/user/${userId}/rename/`, {
			data: {
				// eslint-disable-next-line camelcase
				first_name: firstName,
				// eslint-disable-next-line camelcase
				last_name: lastName,
			},
		});
		return response;
	}

	async deleteUser(userId: number) {
		const context = await this.createAdminContext();

		const response = await context.delete(`/api/common/user/${userId}/`);
		return response;
	}

	async listAllUsers() {
		const context = await this.createAdminContext();

		const response = await context.get("/api/common/user/");
		return response;
	}

	async createNotificationCreation(userId: number) {
		const context = await this.createContext();
		const response = await context.post(`/api/common/account/${process.env.ACCOUNT_ID}/user/${userId}/notification/`);
		return response;
	}

	async createPushNotification(userId: number) {
		const context = await this.createContext();
		const response = await context.post(`/api/common/account/${process.env.ACCOUNT_ID}/user/${userId}/push/`);
		return response;
	}

	async accountLogin(accountId: number) {
		const context = await this.createContext();
		const response = await context.post("/api/common/account-login/", {
			data: {
				// eslint-disable-next-line camelcase
				account_id: accountId,
			},
		});
		return response;
	}
}

export { User };
