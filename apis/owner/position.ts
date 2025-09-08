import { request } from "@playwright/test";
import { BaseClass } from "../../helpers/BaseClass";
import { getUserDetails } from "../../helpers/jsonHelper";

export default class PositionApis {
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

	async createNewPosition(name: string, status: string) {
		const context = await this.createContext();
		const response = await context.post(`/api/proficiency/v2/account/${process.env.ACCOUNT_ID}/position/`, {
			data: {
				status: status,
				name: name,
				account: process.env.ACCOUNT_ID,
			},
		});

		return response;
	}

	async updatePosition(positionId: number, name: string, status: string) {
		const context = await this.createContext();

		const response = await context.patch(`/api/common/account/${process.env.ACCOUNT_ID}/position/${positionId}/`, {
			data: {
				name: name,
				account: process.env.ACCOUNT_ID,
				status: status,
			},
		});

		return response;
	}

	async deletePosition(positionId: number) {
		const context = await this.createContext();

		const response = await context.delete(`/api/common/account/${process.env.ACCOUNT_ID}/position/${positionId}/`);

		return response;
	}

	async activatePosition(positionId: number) {
		const context = await this.createContext();
		const response = await context.post(
			`/api/common/v2/account/${process.env.ACCOUNT_ID}/position/${positionId}/activate/`,
		);

		return response;
	}

	async getPositionDetails(positionId: number) {
		const context = await this.createContext();
		const response = await context.get(`/api/common/v2/account/${process.env.ACCOUNT_ID}/position/${positionId}/`);
		return response;
	}

	async getPositionDetailsWithNoPositionAssignment(positionId: number) {
		const context = await this.createContext();
		const response = await context.get(
			`/api/common/v2/account/${process.env.ACCOUNT_ID}/position/${positionId}/?not_assigned=true`,
		);

		return response;
	}

	async deActivatePosition(positionId: number) {
		const context = await this.createContext();

		const response = await context.post(
			`/api/common/v2/account/${process.env.ACCOUNT_ID}/position/${positionId}/de-activate/`,
		);

		return response;
	}

	async reActivatePosition(positionId: number) {
		const context = await this.createContext();
		const response = await context.post(
			`/api/common/account/${process.env.ACCOUNT_ID}/position/${positionId}/re-activate/`,
		);

		return response;
	}

	async retirePosition(positionId: number) {
		const context = await this.createContext();
		const response = await context.post(
			`/api/common/v2/account/${process.env.ACCOUNT_ID}/position/${positionId}/retire/`,
		);
		return response;
	}

	async getAllPositions(limit?: number, offset?: number) {
		const context = await this.createContext();
		let url = `/api/common/v2/account/${process.env.ACCOUNT_ID}/position/`;

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

	async asignRoleToAPosition(positionId: number, roleId: number) {
		const context = await this.createContext();
		const response = await context.post(
			`/api/common/v2/account/${process.env.ACCOUNT_ID}/position/${positionId}/attach/`,
			{
				data: {
					// eslint-disable-next-line camelcase
					attachment_id: roleId,
				},
			},
		);
		return response;
	}

	async clonePosition(positionId: number, positionName: string) {
		const context = await this.createContext();
		const response = await context.post(`/api/common/account/${process.env.ACCOUNT_ID}/position/${positionId}/clone/`, {
			data: {
				name: positionName,
				// eslint-disable-next-line camelcase
				account: process.env.ACCOUNT_ID,
			},
		});
		return response;
	}

	async assignPositionToEmployee(employeeId: number, positionId: number, commitment: number, allocation: number) {
		const context = await this.createContext();

		const today = new Date();
		const futureDate = new Date(today.getTime() + Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000);
		const effectiveDate = futureDate.toISOString().split("T")[0];

		const response = await context.post(`/api/common/v2/account/${process.env.ACCOUNT_ID}/position-assignment/add/`, {
			data: {
				employee: employeeId,
				position: positionId,
				commitment: commitment,
				allocation: allocation,
				// eslint-disable-next-line camelcase
				effective_on: effectiveDate,
				notify: true,
			},
		});

		return response;
	}

	async assignPositionToEmployeeWithNoCommitmentAndAllocation(employeeId: number, positionId: number) {
		const context = await this.createContext();
		const today = new Date();
		const futureDate = new Date(today.getTime() + Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000);
		const effectiveDate = futureDate.toISOString().split("T")[0];

		const response = await context.post(`/api/common/account/${process.env.ACCOUNT_ID}/position-assignment/add/`, {
			data: {
				employee: employeeId,
				position: positionId,
				// eslint-disable-next-line camelcase
				effective_on: effectiveDate,
			},
		});

		return response;
	}

	async relievePositionAssignment(assignmentId: number, effectiveByDate?: string) {
		const context = await this.createContext();

		const effectiveDate =
			effectiveByDate ||
			(() => {
				const today = new Date();
				const futureDate = new Date(today.getTime() + Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000);
				return futureDate.toISOString().split("T")[0];
			})();

		const response = await context.post(
			`/api/common/v2/account/${process.env.ACCOUNT_ID}/position-assignment/${assignmentId}/relieve/`,
			{
				data: {
					// eslint-disable-next-line camelcase
					effective_by: effectiveDate,
				},
			},
		);

		return response;
	}

	async postToChatter(positionId: number, note: string, table: string, isHistory: boolean) {
		const context = await this.createContext();

		const response = await context.post(
			`/api/common/account/${process.env.ACCOUNT_ID}/position/${positionId}/chatter/`,
			{
				data: {
					// eslint-disable-next-line camelcase
					is_history: isHistory,
					note: note,
					table: table,
					account: process.env.ACCOUNT_ID,
					// eslint-disable-next-line camelcase
					record_id: positionId,
				},
			},
		);

		return response;
	}

	async listPositionChatter(positionId: number) {
		const context = await this.createContext();

		return await context.get(`/api/common/account/${process.env.ACCOUNT_ID}/position/${positionId}/chatter/`);
	}

	async attachRoleToPosition(attachmentId: number, positionId: number) {
		const context = await this.createContext();

		return context.post(`/api/common/v2/account/${process.env.ACCOUNT_ID}/position/${positionId}/attach/`, {
			data: {
				// eslint-disable-next-line camelcase
				attachment_id: attachmentId,
			},
		});
	}

	async detachRoleFromPosition(parentId: number, roleId: number) {
		const context = await this.createContext();

		return context.post(`/api/common/account/${process.env.ACCOUNT_ID}/role/${roleId}/detach/`, {
			data: {
				// eslint-disable-next-line camelcase
				parent_id: parentId,
			},
		});
	}

	async archivePosition(positionId: number) {
		const context = await this.createContext();
		return await context.post(`/api/common/account/${process.env.ACCOUNT_ID}/position/${positionId}/archive/`);
	}

	async unarchivePosition(positionId: number) {
		const context = await this.createContext();
		return await context.post(`/api/common/account/${process.env.ACCOUNT_ID}/position/${positionId}/unarchive/`);
	}

	async bulkActionPositions(action: string, objectIds: number[], activateResponsibilities: boolean = false) {
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
			activate_responsibilities?: boolean;
		}

		const requestData: BulkRequestData = {
			// eslint-disable-next-line camelcase
			object_ids: objectIds,
		};

		if (action.toLowerCase() === "activate") {
			// eslint-disable-next-line camelcase
			requestData.activate_responsibilities = activateResponsibilities;
		}

		const url = `/api/common/account/${process.env.ACCOUNT_ID}/position/${endpoint}/bulk/`;

		return action.toLowerCase() === "delete"
			? await context.delete(url, { data: requestData })
			: await context.post(url, { data: requestData });
	}

	async getPositionFilter(positionId: number) {
		const context = await this.createContext();
		return await context.get(`/api/proficiency/v2/account/${process.env.ACCOUNT_ID}/role/?position=${positionId}`);
	}

	async getPositionsWithQueryParams(queryParams: string) {
		const context = await this.createContext();
		return await context.get(`/api/proficiency/v2/account/${process.env.ACCOUNT_ID}/position${queryParams}`);
	}

	async getPositionsWithCodeStr(codeStr?: string) {
		const context = await this.createContext();
		const codeStrParam = codeStr || "";
		const encodedCodeStr = encodeURIComponent(codeStrParam);
		const url = `/api/proficiency/v2/account/${process.env.ACCOUNT_ID}/position/?code_str=${encodedCodeStr}`;
		return await context.get(url);
	}

	async getPositionsWithName(positionName?: string) {
		const context = await this.createContext();
		const nameParam = positionName || "123456";
		const url = `/api/proficiency/v2/account/${process.env.ACCOUNT_ID}/position/?name=${encodeURIComponent(nameParam)}`;
		return await context.get(url);
	}

	async reorderPositionRoles(positionId: number, roleIds: number[]) {
		const context = await this.createContext();
		const response = await context.post(
			`/api/common/account/${process.env.ACCOUNT_ID}/position/${positionId}/sequence-reorder/`,
			{
				data: {
					// eslint-disable-next-line camelcase
					reordered_ids: roleIds,
				},
			},
		);
		return response;
	}

}
