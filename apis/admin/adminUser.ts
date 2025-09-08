import { getUserDetails } from "../../helpers/jsonHelper";
import { request } from "@playwright/test";
import { BaseClass } from "../../helpers/BaseClass";
import { User } from "../owner/account";

export default class AdminUserApi {
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

	async createUserInAccount(
		email: string,
		firstName: string,
		lastName: string,
		hasAccess: boolean,
		hasCompensationAccess: boolean,
		hasEmployeePortalAccess: boolean,
		hasKnowledgeAccess: boolean,
		hasPerformanceAccess: boolean,
		hasReadinessAccess: boolean,
		isCoOwner: boolean,
		accountId?: number,
	) {
		const resolvedAccountId = accountId || process.env.ACCOUNT_ID;
		const context = await this.createContext();
		return context.post(`/api/common/account/${resolvedAccountId}/user/`, {
			data: {
				email: email,
				// eslint-disable-next-line camelcase
				first_name: firstName,
				// eslint-disable-next-line camelcase
				last_name: lastName,
				// eslint-disable-next-line camelcase
				account_permission: {
					// eslint-disable-next-line camelcase
					has_access: hasAccess,
					// eslint-disable-next-line camelcase
					has_compensation_access: hasCompensationAccess,
					// eslint-disable-next-line camelcase
					has_employee_portal_access: hasEmployeePortalAccess,
					// eslint-disable-next-line camelcase
					has_knowledge_access: hasKnowledgeAccess,
					// eslint-disable-next-line camelcase
					has_performance_access: hasPerformanceAccess,
					// eslint-disable-next-line camelcase
					has_readiness_access: hasReadinessAccess,
					// eslint-disable-next-line camelcase
					is_co_owner: isCoOwner,
				},
			},
		});
	}

	async createSystemAdmin(firstName: string, lastName: string, email: string, isSuperUser: boolean, state: string) {
		const context = await this.createAdminContext();

		// Use the working endpoint that creates users with proper permissions
		return context.post(`/api/common/account/${process.env.ACCOUNT_ID}/user/`, {
			data: {
				email: email,
				// eslint-disable-next-line camelcase
				first_name: firstName,
				// eslint-disable-next-line camelcase
				last_name: lastName,
				// eslint-disable-next-line camelcase
				account_permission: {
					// eslint-disable-next-line camelcase
					has_access: true,
					// eslint-disable-next-line camelcase
					has_compensation_access: isSuperUser, // Super users get all permissions
					// eslint-disable-next-line camelcase
					has_employee_portal_access: true,
					// eslint-disable-next-line camelcase
					has_readiness_access: isSuperUser,
					// eslint-disable-next-line camelcase
					has_knowledge_access: isSuperUser,
					// eslint-disable-next-line camelcase
					has_performance_access: isSuperUser,
					// eslint-disable-next-line camelcase
					is_owner: false, // Super users are not account owners
				},
				// eslint-disable-next-line camelcase
				is_superuser: isSuperUser,
				state: state,
			},
		});
	}

	async renameUserAccount(
		userId: number, // Ensure that userId is being passed correctly
		firstName: string,
		lastName: string,
	) {
		const context = await this.createAdminContext();

		return await context.post(`/api/common/user/${userId}/rename/`, {
			data: {
				// eslint-disable-next-line camelcase
				first_name: firstName,
				// eslint-disable-next-line camelcase
				last_name: lastName,
			},
		});
	}
	async getPasswordToken(userId: number) {
		const context = await this.createAdminContext();

		return await context.get(`/api/common/user/${userId}/token/`);
	}

	async getAdminCountList() {
		const context = await this.createAdminContext();
		return await context.get("api/common/admin/count/");
	}

	async signUp(password: string, passwordConfirm: string, token: string, userId: number) {
		const context = await this.createAdminContext();

		return await context.post(`/api/common/user/${userId}/signup/`, {
			data: {
				password: password,
				// eslint-disable-next-line camelcase
				password_confirm: passwordConfirm,
				token: token,
			},
		});
	}

	async resendInvite(userId: number, account: number) {
		const context = await this.createAdminContext();

		return await context.post(`/api/common/user/${userId}/resend-invite/`, {
			data: {
				user: userId,
				account: account,
			},
		});
	}

	async cancelInvite(userId: number) {
		const context = await this.createAdminContext();

		return await context.post(`/api/common/user/${userId}/cancel-invite/`, {
			data: {
				user: userId,
			},
		});
	}

	async getUser(userId: number) {
		const context = await this.createAdminContext();

		return await context.get(`/api/common/user/${userId}`);
	}

	async patchUser(userId: number, superAdminEditing: string) {
		const context = await this.createAdminContext();

		return await context.patch(`/api/common/user/${userId}/`, {
			data: {
				// eslint-disable-next-line camelcase
				super_admin_editing: superAdminEditing,
			},
		});
	}

	async patchUserToSuperUser(userId: number) {
		const context = await this.createAdminContext();

		return await context.patch(`/api/common/user/${userId}/`, {
			data: {
				// eslint-disable-next-line camelcase
				is_superuser: true,
			},
		});
	}

	async getAllUsers() {
		const context = await this.createAdminContext();

		return await context.get("/api/common/user/");
	}

	async getAllOperationalUsers() {
		const context = await this.createAdminContext();
		let operationalUserCount = 0;
		let url = "/api/common/user/";

		try {
			while (url) {
				const response = await context.get(url);

				if (response.ok()) {
					const data = await response.json();
					const users = data.results;

					const operational = users.filter((user: { state: string }) => user.state === "operational");
					operationalUserCount += operational.length;

					url = data.next;
				} else {
					break;
				}
			}
			return operationalUserCount;
		} catch (error) {
			console.error("Error fetching users:", error);
			return 0;
		}
	}

	async userBlock(userId: number) {
		const context = await this.createAdminContext();

		return await context.post(`/api/common/user/${userId}/block/`, {
			data: {
				user: userId,
			},
		});
	}

	async userClose(userId: number) {
		const context = await this.createAdminContext();

		return await context.post(`/api/common/user/${userId}/close/`, {
			data: {
				user: userId,
			},
		});
	}

	async userUnblock(userId: number) {
		const context = await this.createAdminContext();

		return await context.post(`/api/common/user/${userId}/unblock/`, {
			data: {
				user: userId,
			},
		});
	}

	async userUnclose(userId: number) {
		const context = await this.createAdminContext();

		return await context.post(`/api/common/user/${userId}/unclose/`, {
			data: {
				user: userId,
			},
		});
	}

	async userSuspend(userId: number, accountId: number) {
		const context = await this.createAdminContext();

		return await context.post(`/api/common/user/${userId}/suspend/`, {
			data: {
				user: userId,
				account: accountId,
			},
		});
	}

	async resetPassword(email: string) {
		const context = await this.createAdminContext();

		return await context.post("/api/common/reset-password/", {
			data: {
				email: email,
			},
		});
	}

	async testEmail(email: string) {
		const context = await this.createAdminContext();

		return await context.post(`/api/common/account/${process.env.ACCOUNT_ID}/test/email/`, {
			data: {
				email: email,
			},
		});
	}

	async deleteUser(userId: number) {
		const context = await this.createAdminContext();

		return await context.delete(`/api/common/user/${userId}/`);
	}
}
