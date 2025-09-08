import { BaseClass } from "../../helpers/BaseClass";
import { getUserDetails } from "../../helpers/jsonHelper";
import { request } from "@playwright/test";

export default class ResponsibilityApis {
	baseInstance: BaseClass;

	constructor(baseInstance: BaseClass) {
		this.baseInstance = baseInstance;
	}

	private async createContext() {
		const username = (await getUserDetails(this.baseInstance.user)).email;
		const password = (await getUserDetails(this.baseInstance.user)).password;
		const credentials = Buffer.from(`${username}:${password}`).toString("base64");
		return request.newContext({
			baseURL: process.env.API_BASE_URL,
			extraHTTPHeaders: {
				Authorization: `Basic ${credentials}`,
				"Content-Type": "application/json",
			},
		});
	}

	async createResponsibility(name: string, status: string) {
		const context = await this.createContext();
		const response = await context.post(`/api/proficiency/v2/account/${process.env.ACCOUNT_ID}/responsibility/`, {
			data: {
				status: status,
				name: name,
				account: process.env.ACCOUNT_ID,
			},
		});

		return response;
	}

	async activateResponsibility(responsibilityId: number) {
		const context = await this.createContext();
		const response = await context.post(
			`/api/common/v2/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/activate/`,
		);
		return response;
	}

	async deActivateResponsibility(responsibilityId: number) {
		const context = await this.createContext();
		const response = await context.post(
			`/api/common/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/de-activate/`,
		);
		return response;
	}

	async reActivateResponsibility(responsibilityId: number) {
		const context = await this.createContext();
		const response = await context.post(
			`/api/common/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/re-activate/`,
		);
		return response;
	}

	async retiredResponsibility(responsibilityId: number) {
		const context = await this.createContext();
		const response = await context.post(
			`/api/common/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/retire/`,
		);
		return response;
	}

	async activateCheckpoint(responsibilityId: number, checkpointId: number) {
		const context = await this.createContext();

		const response = await context.post(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/checkpoint/${checkpointId}/activate/`,
		);

		return response;
	}

	async createNewCheckpoint(
		responsibilityId: number,
		proficiencyLevel: number,
		checkpointCriteria: string,
		checkpointInstructions: string,
	) {
		const context = await this.createContext();

		const response = await context.post(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/checkpoint/`,
			{
				data: {
					// eslint-disable-next-line camelcase
					proficiency_level: proficiencyLevel,
					criteria: checkpointCriteria,
					instructions: checkpointInstructions,
					account: process.env.ACCOUNT_ID,
					responsibility: responsibilityId,
				},
			},
		);

		return response;
	}

	async deleteResponsibility(responsibilityId: number) {
		const context = await this.createContext();

		const response = await context.delete(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/`,
		);

		return response;
	}

	async deleteAttachedResponsibility(responsibilityId: number) {
		const context = await this.createContext();

		const response = await context.delete(
			`/api/common/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/delete/`,
		);

		return response;
	}

	async assignRoleToResponsibility(responsibilityId: number, roleId: number) {
		const context = await this.createContext();

		const response = await context.post(
			`/api/proficiency/v2/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/role-to-responsibility/`,
			{
				data: {
					responsibility: responsibilityId,
					role: roleId,
				},
			},
		);

		return response;
	}

	async getAllResponsibility() {
		const context = await this.createContext();
		const response = await context.get(`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/`);
		return response;
	}

	async getAllResponsibilitiesV2(limit?: number, offset?: number) {
		const context = await this.createContext();
		let url = `/api/proficiency/v2/account/${process.env.ACCOUNT_ID}/responsibility/`;

		const params = new URLSearchParams();
		if (limit !== undefined) {
			params.append("limit", limit.toString());
		}
		if (offset !== undefined) {
			params.append("offset", offset.toString());
		}

		if (params.toString()) {
			url += `?${params.toString()}`;
		}

		const response = await context.get(url);
		return response;
	}

	async responsibilityBadgeHistory(responsibilityId: number) {
		const context = await this.createContext();
		const response = await context.get(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/badge-history/`,
		);
		return response;
	}

	async getSpecificResponsibility(responsibilityId: number) {
		const context = await this.createContext();

		const response = await context.get(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/`,
		);

		return response;
	}

	async getSpecificResponsibilityV2(responsibilityId: number) {
		const context = await this.createContext();

		const response = await context.get(
			`/api/proficiency/v2/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/`,
		);

		return response;
	}

	async grantBadgeToResponsibility(responsibilityId: number, level: number, issuedTo: number, issuedFor: number) {
		const context = await this.createContext();

		const response = await context.post(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/badge/`,
			{
				data: {
					level: level,
					// eslint-disable-next-line camelcase
					issued_to: issuedTo,
					// eslint-disable-next-line camelcase
					issued_for: issuedFor,
				},
			},
		);

		return response;
	}

	async getResponsibilityBadges(responsibilityId: number) {
		const context = await this.createContext();
		const response = await context.get(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/badge/`,
		);
		return response;
	}

	async getOldBadgeDetails(oldBadgeId: number) {
		const context = await this.createContext();
		const response = await context.get(`/api/proficiency/account/${process.env.ACCOUNT_ID}/badge/${oldBadgeId}/`);
		return response;
	}

	async removeBadgeForResponsibility(badgeId: number, method: string, reason: string) {
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

	async deleteBadgeForResponsibility(badgeId: number) {
		const context = await this.createContext();
		const response = await context.delete(`/api/proficiency/account/${process.env.ACCOUNT_ID}/badge/${badgeId}/`);
		return response;
	}

	async grantProficiencyBadgeForResponsibility(
		responsibilityId: number,
		employeeId: number,
		proficiencyLevel: number,
		forced: boolean,
	) {
		const context = await this.createContext();

		const response = await context.post(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/grant-badge/`,
			{
				data: {
					employee: employeeId,
					// eslint-disable-next-line camelcase
					proficiency_level: proficiencyLevel,
					forced: forced,
				},
			},
		);

		return response;
	}

	async postToChatter(responsibilityId: number, note: string, table: string, isHistory: boolean) {
		const context = await this.createContext();

		const response = await context.post(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/chatter/`,
			{
				data: {
					// eslint-disable-next-line camelcase
					is_history: isHistory,
					note: note,
					table: table,
					account: process.env.ACCOUNT_ID,
					// eslint-disable-next-line camelcase
					record_id: responsibilityId,
				},
			},
		);

		return response;
	}

	async listResponsibilityChatter(responsibilityId: number) {
		const context = await this.createContext();

		return await context.get(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/chatter/`,
		);
	}

	async archiveResponsibility(responsibilityId: number) {
		const context = await this.createContext();

		return await context.post(
			`https://api.dev.exiqtive.com/api/common/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/archive/`,
		);
	}

	async unarchiveResponsibility(responsibilityId: number) {
		const context = await this.createContext();

		return await context.post(
			`https://api.dev.exiqtive.com/api/common/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/unarchive/`,
		);
	}

	async openAIchatCompletion() {
		const context = await this.createContext();

		return await context.post(
			`https://api.dev.exiqtive.com/api/common/v1/openai-chat-completions/
			`,
			{
				data: {
					model: "gpt-4o-mini",
					messages: [
						{
							role: "user",
							content: "Create a new checkpoint for the responsibility",
						},
					],
				},
			},
		);
	}

	async askOpenAI() {
		const context = await this.createContext();

		return await context.post("https://api.dev.exiqtive.com/api/common/v1/openai/", {
			data: {
				input: "Create a new checkpoint for the responsibility",
			},
		});
	}

	async createProficiencyBadge(employeeId: number, responsibilityId: number, levelNumber: number) {
		const context = await this.createContext();

		const response = await context.post(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/create-proficiency-badge/`,
			{
				data: {
					employee: employeeId,
					responsibility: responsibilityId,
					level: levelNumber,
					forced: true,
				},
			},
		);

		return response;
	}

	async getRoleFilterBySpecificRoleId(roleId: number) {
		const context = await this.createContext();
		const response = await context.get(
			`/api/proficiency/v2/account/${process.env.ACCOUNT_ID}/responsibility/?role=${roleId}`,
		);
		return response;
	}

	async getResponsibilitiesFilteredByBadgeLevel(
		noMasters?: boolean,
		noCoaches?: boolean,
		noProfessionals?: boolean,
		archived?: boolean,
		attachments?: string,
		recentlyActivated?: boolean,
		recentlyRetired?: boolean,
		recentlyDeactivated?: boolean,
	) {
		const context = await this.createContext();
		let url = `/api/proficiency/v2/account/${process.env.ACCOUNT_ID}/responsibility/`;

		const params = new URLSearchParams();
		if (noMasters !== undefined) {
			params.append("no_masters", noMasters.toString());
		}
		if (noCoaches !== undefined) {
			params.append("no_coaches", noCoaches.toString());
		}
		if (noProfessionals !== undefined) {
			params.append("no_professionals", noProfessionals.toString());
		}
		if (archived !== undefined) {
			params.append("archived", archived.toString());
		}
		if (attachments !== undefined) {
			params.append("attachments", attachments);
		}
		if (recentlyActivated !== undefined) {
			params.append("recently_activated", recentlyActivated.toString());
		}
		if (recentlyRetired !== undefined) {
			params.append("recently_retired", recentlyRetired.toString());
		}
		if (recentlyDeactivated !== undefined) {
			params.append("recently_deactivated", recentlyDeactivated.toString());
		}

		if (params.toString()) {
			url += `?${params.toString()}`;
		}

		const response = await context.get(url);
		return response;
	}

	async getResponsibilitiesWithQueryParams(queryParams: string) {
		const context = await this.createContext();
		const response = await context.get(`/api/proficiency/v2/account/${process.env.ACCOUNT_ID}/responsibility/${queryParams}`);
		return response;
	}

}
