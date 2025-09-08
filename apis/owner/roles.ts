import { request } from "@playwright/test";
import { BaseClass } from "../../helpers/BaseClass";
import { getUserDetails } from "../../helpers/jsonHelper";

export default class RolesApis {
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

	async createRole(name: string, description: string, status: string) {
		const context = await this.createContext();

		const response = await context.post(`/api/common/v2/account/${process.env.ACCOUNT_ID}/role/`, {
			data: {
				status: status,
				name: name,
				description: description,
				account: process.env.ACCOUNT_ID,
			},
		});

		return response;
	}

	async getCatalogsList() {
		const context = await this.createContext();
		const response = await context.get(`/api/common/account/${process.env.ACCOUNT_ID}/catalogs/`);
		return response;
	}

	async detachRoleFromPosition(parentId: number, roleId: number) {
		const context = await this.createContext();

		return context.post(`/api/common/v2/account/${process.env.ACCOUNT_ID}/role/${roleId}/detach/`, {
			data: {
				// eslint-disable-next-line camelcase
				parent_id: parentId,
			},
		});
	}

	async getUserAccessDetails(userId: number) {
		const context = await this.createContext();
		const response = await context.get(`/api/common/account/${process.env.ACCOUNT_ID}/user/${userId}/access/`);
		return response;
	}

	async getRoles(limit?: number, offset?: number) {
		const context = await this.createContext();
		let url = `/api/common/v2/account/${process.env.ACCOUNT_ID}/role/`;

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

	async getRolesById(roleId: number) {
		const context = await this.createContext();
		const response = await context.get(`/api/common/account/${process.env.ACCOUNT_ID}/role/${roleId}`);
		return response;
	}

	async getPositionRoles(positionId: number) {
		const context = await this.createContext();
		const response = await context.get(`/api/common/account/${process.env.ACCOUNT_ID}/position/${positionId}/role/`);
		return response;
	}

	async updateRole(roleId: number, status: string, name: string, description: string) {
		const context = await this.createContext();

		const response = await context.put(`/api/common/account/${process.env.ACCOUNT_ID}/role/${roleId}/`, {
			data: {
				status: status,
				name: name,
				description: description,
				account: process.env.ACCOUNT_ID,
			},
		});

		return response;
	}

	async activateRole(roleId: number) {
		const context = await this.createContext();
		const response = await context.post(`/api/common/v2/account/${process.env.ACCOUNT_ID}/role/${roleId}/activate/`);
		return response;
	}

	async activateRoleWithActivateResponsibility(roleId: number) {
		const context = await this.createContext();

		return await context.post(`/api/common/account/${process.env.ACCOUNT_ID}/role/${roleId}/activate/`, {
			data: {
				// eslint-disable-next-line camelcase
				activate_responsibilities: "True",
			},
		});
	}

	async bulkActionRoles(action: string, objectIds: number[], activateResponsibilities: boolean = true) {
		const context = await this.createContext();

		const actionEndpoints = {
			activate: "activate",
			retire: "retire",
			archive: "archive",
			unarchive: "unarchive",
			reactivate: "reactivate",
			delete: "delete",
		};

		const endpoint = actionEndpoints[action.toLowerCase()];
		if (!endpoint) {
			throw new Error(`Unsupported bulk action: ${action}`);
		}

		interface BulkRequestData {
			// eslint-disable-next-line camelcase
			object_ids: number[];
			// eslint-disable-next-line camelcase
			activate_responsibilities?: string;
		}

		const requestData: BulkRequestData = {
			// eslint-disable-next-line camelcase
			object_ids: objectIds,
		};

		if (action.toLowerCase() === "activate") {
			// eslint-disable-next-line camelcase
			requestData.activate_responsibilities = activateResponsibilities ? "True" : "False";
		}

		const url = `/api/common/account/${process.env.ACCOUNT_ID}/role/${endpoint}/bulk/`;

		return action.toLowerCase() === "delete"
			? await context.delete(url, { data: requestData })
			: await context.post(url, { data: requestData });
	}

	async reActivateRole(roleId: number) {
		const context = await this.createContext();
		const response = await context.post(`/api/common/account/${process.env.ACCOUNT_ID}/role/${roleId}/re-activate/`);
		return response;
	}

	async deActivateRole(roleId: number) {
		const context = await this.createContext();
		const response = await context.post(`/api/common/account/${process.env.ACCOUNT_ID}/role/${roleId}/de-activate/`);
		return response;
	}

	async retiredRole(roleId: number) {
		const context = await this.createContext();
		const response = await context.post(`/api/common/v2/account/${process.env.ACCOUNT_ID}/role/${roleId}/retire/`);
		return response;
	}

	async deleteRole(roleId: number) {
		const context = await this.createContext();
		const response = await context.delete(`/api/common/account/${process.env.ACCOUNT_ID}/role/${roleId}/`);
		return response;
	}
	async deleteAttachedRole(roleId: number) {
		const context = await this.createContext();

		const response = await context.delete(`/api/common/account/${process.env.ACCOUNT_ID}/role/${roleId}/delete/`);

		return response;
	}

	async attachRoleToPosition(roleId: number, positionId: number) {
		const context = await this.createContext();

		return await context.post(`/api/common/account/${process.env.ACCOUNT_ID}/role/${roleId}/position/`, {
			data: {
				role: roleId,
				position: positionId,
			},
		});
	}

	async attachResponsibilityToRole(attachmentId: number, roleId: number) {
		const context = await this.createContext();

		return context.post(`/api/common/account/${process.env.ACCOUNT_ID}/role/${roleId}/attach/`, {
			data: {
				// eslint-disable-next-line camelcase
				attachment_id: attachmentId,
			},
		});
	}

	async detachResponsibilityFromRole(parentId: number, responsibilityId: number) {
		const context = await this.createContext();

		return context.post(`/api/common/v2/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/detach/`, {
			data: {
				// eslint-disable-next-line camelcase
				parent_id: parentId,
			},
		});
	}

	async postToChatter(roleId: number, note: string, table: string, isHistory: boolean) {
		const context = await this.createContext();

		const response = await context.post(`/api/proficiency/account/${process.env.ACCOUNT_ID}/role/${roleId}/chatter/`, {
			data: {
				// eslint-disable-next-line camelcase
				is_history: isHistory,
				note: note,
				table: table,
				account: process.env.ACCOUNT_ID,
				// eslint-disable-next-line camelcase
				record_id: roleId,
			},
		});

		return response;
	}

	async listRoleChatter(roleId: number) {
		const context = await this.createContext();

		return await context.get(`/api/common/account/${process.env.ACCOUNT_ID}/role/${roleId}/chatter/`);
	}

	async archiveRole(roleId: number) {
		const context = await this.createContext();

		return await context.post(
			`https://api.dev.exiqtive.com/api/common/account/${process.env.ACCOUNT_ID}/role/${roleId}/archive/`,
		);
	}

	async unarchiveRole(roleId: number) {
		const context = await this.createContext();

		return await context.post(
			`https://api.dev.exiqtive.com/api/common/account/${process.env.ACCOUNT_ID}/role/${roleId}/unarchive/`,
		);
	}

	async RoletoResponsibility(responsibilityId: number) {
		const context = await this.createContext();

		return await context.post(
			`https://api.dev.exiqtive.com/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/role-to-responsibility/`,
		);
	}

	async getRole(roleId: number) {
		const context = await this.createContext();
		return await context.get(`/api/common/account/${process.env.ACCOUNT_ID}/role/${roleId}/`);
	}

	async reorderRoleResponsibilities(roleId: number, responsibilityIds: number[]) {
		const context = await this.createContext();
		const response = await context.post(
			`/api/common/account/${process.env.ACCOUNT_ID}/role/${roleId}/sequence-reorder/`,
			{
				data: {
					// eslint-disable-next-line camelcase
					reordered_ids: responsibilityIds,
				},
			},
		);
		return response;
	}

	async getRolesWithQueryParams(queryParams: string) {
		const context = await this.createContext();
		return await context.get(`/api/common/v2/account/${process.env.ACCOUNT_ID}/role${queryParams}`);
	}

}
