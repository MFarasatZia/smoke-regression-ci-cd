import { APIRequestContext, APIResponse, request } from "@playwright/test";
import { BaseClass } from "../../helpers/BaseClass";
import { getUserDetails } from "../../helpers/jsonHelper";
import { faker } from "@faker-js/faker";

interface User {
	email: string;
	password: string;
	multiple_accounts_email: string;
	super_user_email: string;
	super_user_password: string;
}

export default class UserApi {
	baseInstance: BaseClass;

	constructor(baseInstance: BaseClass) {
		this.baseInstance = baseInstance;
	}

	async createNewUser(
		email: string,
		firstName: string,
		lastName: string,
		status: string,
		hasAccess: boolean,
		isSuspended: boolean,
		isOwner: boolean,
		isCoOwner: boolean = false,
	) {
		return await this.createUser(email, firstName, lastName, status, hasAccess, isSuspended, isOwner, isCoOwner);
	}

	async resendsInvite(userId: number) {
		const context = await this.createAdminContext();

		return await context.post(`/api/common/user/${userId}/resend-invite/`, {
			data: {
				user: userId,
				account: process.env.ACCOUNT_ID,
			},
		});
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

	async createAccountOwnerContextContext() {
		return this.contextCreator("multiple_accounts_email", "password");
	}

	async createContextUsingMultilpleAccountCredentials() {
		return this.contextCreator("multiple_accounts_email", "password");
	}

	async createAdminContext() {
		return this.contextCreator("super_user_email", "super_user_password");
	}

	async createUser(
		email: string,
		firstName: string,
		lastName: string,
		status: string,
		hasAccess: boolean,
		isSuspended: boolean,
		isOwner: boolean,
		isCoOwner: boolean,
	) {
		const context = await this.createContext();

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
					has_access: hasAccess,
					// eslint-disable-next-line camelcase
					is_suspended: isSuspended,
					// eslint-disable-next-line camelcase
					is_owner: isOwner,
					// eslint-disable-next-line camelcase
					is_co_owner: isCoOwner,
					// eslint-disable-next-line camelcase
					has_readiness_access: true,
					// eslint-disable-next-line camelcase
					has_knowledge_access: true,
					// eslint-disable-next-line camelcase
					has_compensation_access: true,
					// eslint-disable-next-line camelcase
					created_by: 1,
					// eslint-disable-next-line camelcase
					updated_by: 1,
				},
				// eslint-disable-next-line camelcase
				is_superuser: "false",
				state: `${status}`,
			},
		});
	}

	async createSuspendUser(userId: number) {
		const context = await this.createContext();

		return context.post(`/api/common/user/${userId}/suspend/`, {
			data: {
				user: userId,
				account: process.env.ACCOUNT_ID,
			},
		});
	}

	async createClosedUser(userId: number) {
		const context = await this.createContext();

		return context.post(`/api/common/user/${userId}/close/`, {
			data: {
				user: userId,
				account: process.env.ACCOUNT_ID,
			},
		});
	}

	async createPassword(userId: number, password: string) {
		const context = await this.createAdminContext();

		return context.post(`/api/common/user/${userId}/password/`, {
			data: {
				password: password,
			},
		});
	}

	async createMultipleUsers(numberOfUsers: number) {
		// const token = loginResponseBody.token;

		const responses: APIResponse[] = [];

		for (let i = 0; i < numberOfUsers; i++) {
			const email = faker.internet.email();
			const firstName = "Test " + faker.person.firstName();
			const lastName = faker.person.lastName();
			const hasAccess = true;
			const isSuspended = false;
			const isOwner = false;

			try {
				const response = await this.createUser(
					email,
					firstName,
					lastName,
					"invited",
					hasAccess,
					isSuspended,
					isOwner,
					false,
				);
				responses.push(response);

				console.log(`User ${i + 1} created successfully.`);
			} catch (error) {
				console.error(`Error creating user ${i + 1}:`, error);
			}
		}
		return responses;
	}

	async getAccountAccessDetails() {
		const context = await this.createContext();
		const response = await context.get(`/api/common/account/${process.env.ACCOUNT_ID}/access/`);
		return response;
	}

	async getUserAccess(accountId: number, userId: number) {
		let context: APIRequestContext;
		if (accountId === 2) {
			context = await this.createContextUsingMultilpleAccountCredentials();
		} else {
			context = await this.createContext();
		}
		const response = await context.get(`/api/common/account/${process.env.ACCOUNT_ID}/user/${userId}/access/`);
		return response;
	}

	async suspendUserAccess(userId: number) {
		const context = await this.createContext();
		const response = await context.post(`/api/common/account/${process.env.ACCOUNT_ID}/access/${userId}/suspend/`);
		return response;
	}

	async getMyUserDetails() {
		const context = await this.createContext();

		return await context.get("/api/common/my-user/");
	}

	async getAllUsers() {
		const context = await this.createContext();
		return await context.get("/api/common/user/");
	}

	async postToChatter(userId: number, note: string, table: string, isHistory: boolean) {
		const context = await this.createContext();

		const response = await context.post(`/api/common/account/${process.env.ACCOUNT_ID}/user/${userId}/chatter/`, {
			data: {
				// eslint-disable-next-line camelcase
				is_history: isHistory,
				note: note,
				table: table,
				account: process.env.ACCOUNT_ID,
				// eslint-disable-next-line camelcase
				record_id: userId,
			},
		});

		return response;
	}

	async listUserChatter(userId: number) {
		const context = await this.createContext();

		return await context.get(`/api/common/account/${process.env.ACCOUNT_ID}/user/${userId}/chatter/`);
	}

	async getUserAccounts(userId: number) {
		const context = await this.createContextUsingMultilpleAccountCredentials();

		return await context.get(`/api/common/user/${userId}/account/`);
	}

	async getPasswordToken(userId: number) {
		const context = await this.createAdminContext();

		return await context.get(`/api/common/user/${userId}/token/`);
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

	async disableSlack(userId: number) {
		const context = await this.createContext();

		return await context.post(`/api/common/slack/${process.env.ACCOUNT_ID}/${userId}/disable/`, {});
	}

	async changeUserAccess(accessId: number, firstName: string, lastName: string, email: string) {
		const context = await this.createContext();

		return await context.post(`/api/common/slack/${process.env.ACCOUNT_ID}/access/${accessId}/change-user/`, {
			data: {
				// eslint-disable-next-line camelcase
				first_name: firstName,
				// eslint-disable-next-line camelcase
				last_name: lastName,
				email: email,
			},
		});
	}

	async getCurrenciesList() {
		const context = await this.createContext();
		return await context.get("/api/common/currencies/");
	}

	async createOperatingCurrency(currency: number, operatingCountryId: number) {
		const context = await this.createContext();

		return await context.post(`/api/common/account/${process.env.ACCOUNT_ID}/operating-currency/`, {
			data: {
				currency: currency,
				// eslint-disable-next-line camelcase
				operating_country: operatingCountryId,
			},
		});
	}

	async createOperatingCountry(status: string, accountId: number, countryId: number) {
		const context = await this.createContext();

		return context.post(`/api/common/account/${accountId}/operating-country/`, {
			data: {
				status: status,
				account: accountId,
				country: countryId,
			},
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	async createPayRange(operatingCountryId: number, payload: object) {
		const context = await this.createContext();

		const endpoint = `/api/common/account/3/operating-country/${operatingCountryId}/pay-range/`;

		const response = await context.post(endpoint, {
			data: payload,
			headers: {
				"Content-Type": "application/json",
			},
		});

		const responseBody = await response.json();

		return responseBody.id;
	}

	async getPayRange(operatingCountryId: number) {
		const context = await this.createContext();

		const endpoint = `/api/common/account/${process.env.ACCOUNT_ID}/operating-country/${operatingCountryId}/pay-range/`;

		const response = await context.get(endpoint, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		const responseBody = await response.json();
		return {
			status: response.status,
			body: responseBody,
		};
	}

	async getOperatingCountriesRead(operatingCountryId: number, payRangeId: number) {
		const context = await this.createContext();
		return await context.get(
			`/api/common/account/${process.env.ACCOUNT_ID}/operating-country/${operatingCountryId}/pay-range/${payRangeId}/`,
		);
	}

	async getOperatingCountryChatter(accountId: number, operatingCountryId: number) {
		const context = await this.createContext();
		return context.get(`/api/common/account/${accountId}/operating-country/${operatingCountryId}/chatter/`, {
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	async getOperatingCurrenciesList() {
		const context = await this.createContext();
		return await context.get(`/api/common/account/${process.env.ACCOUNT_ID}/operating-currency/`);
	}

	async getOperatingCurrency(currencyId: number) {
		const context = await this.createContext();

		return await context.get(`/api/common/account/${process.env.ACCOUNT_ID}/operating-currency/${currencyId}/`);
	}

	async getOperatingCurrencyChatterRead(currency: number) {
		const context = await this.createContext();
		return await context.get(`/api/common/account/${process.env.ACCOUNT_ID}/operating-currency/chatter/${currency}/`);
	}

	async getOperatingCountriesList() {
		const context = await this.createContext();
		return await context.get(`/api/common/account/${process.env.ACCOUNT_ID}/operating-country/`);
	}

	async changeOwnerShip(accountId: number, newOwnerEmail: string) {
		const context = await this.createAccountOwnerContextContext();

		return await context.post(`/api/common/account/${accountId}/change-owner/`, {
			data: {
				email: newOwnerEmail,
			},
		});
	}

	async getUser(userId: number) {
		const context = await this.createAdminContext();

		return await context.get(`/api/common/user/${userId}`);
	}

	async getCountriesList() {
		const context = await this.createContext();
		return await context.get("/api/common/country/");
	}

	async getCountryById(countryId: number) {
		const context = await this.createContext();
		return await context.get(`/api/common/country/${countryId}/`);
	}

	async createPayAggrement() {
		const context = await this.createContext();
		return await context.post(`/api/common/account/${process.env.ACCOUNT_ID}/pay-agreement/`);
	}

	async retrievePayAggrement() {
		const context = await this.createContext();
		return await context.get(`/api/common/account/${process.env.ACCOUNT_ID}/pay-agreement/`);
	}

	async updatePayAggrement(account: number, payAgrement: number) {
		const context = await this.createContext();
		return await context.patch(`/api/common/account/${account}/pay-agreement/${payAgrement}/`);
	}

	async deletePayAggrement(account: number, payAgrement: number) {
		const context = await this.createContext();
		return await context.delete(`/api/common/account/${account}/pay-agreement/${payAgrement}/`);
	}
}
