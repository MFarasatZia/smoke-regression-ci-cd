import { getUserDetails } from "../../helpers/jsonHelper";
import { request } from "@playwright/test";
import { BaseClass } from "../../helpers/BaseClass";

interface User {
	email: string;
	password: string;
	super_user_email: string;
	super_user_password: string;
}

export default class CheckpointApi {
	baseInstance: BaseClass;

	constructor(baseInstance: BaseClass) {
		this.baseInstance = baseInstance;
	}

	getProficiencyLevelNumber(level: string): number {
		switch (level.toLowerCase()) {
			case "apprentice":
				return 1;
			case "professional":
				return 2;
			case "coach":
				return 3;
			case "master":
				return 4;
			default:
				return 1;
		}
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

	private async createFileUploadContext(emailKey: keyof User, passwordKey: keyof User) {
		const userDetails = await getUserDetails(this.baseInstance.user);
		const username = userDetails[emailKey];
		const password = userDetails[passwordKey];

		const credentials = Buffer.from(`${username}:${password}`).toString("base64");

		return request.newContext({
			baseURL: process.env.API_BASE_URL,
			extraHTTPHeaders: {
				Authorization: `Basic ${credentials}`,
			},
		});
	}

	async createContext() {
		return this.contextCreator("email", "password");
	}

	async createNewCheckpoint(
		responsibilityId: number,
		proficiencyLevel: number,
		checkpointCriteria: string,
		checkpointInstructions: string,
	) {
		const context = await this.createContext();

		const response = await context.post(
			`/api/proficiency/v2/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/checkpoint/create/`,
			{
				data: {
					// eslint-disable-next-line camelcase
					level: proficiencyLevel,
					criteria: checkpointCriteria,
					instructions: checkpointInstructions,
					account: process.env.ACCOUNT_ID,
					responsibility: responsibilityId,
				},
			},
		);

		return response;
	}

	async updateCheckpoint(
		criteria: string,
		responsibilityId: number,
		proficiencyLevel: number,
		instructions: string,
		checkpointId: string,
		sequence: number,
	) {
		const context = await this.createContext();

		const response = await context.put(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/checkpoint/${checkpointId}/`,
			{
				data: {
					// eslint-disable-next-line camelcase
					proficiency_level: proficiencyLevel,
					criteria: criteria,
					instructions: instructions,
					account: process.env.ACCOUNT_ID,
					responsibility: responsibilityId,
					sequence: sequence,
				},
			},
		);

		return response;
	}

	async deleteCheckpoint(responsibilityId: number, checkpointId: number) {
		const context = await this.createContext();

		const response = await context.delete(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/checkpoint/${checkpointId}/delete/`,
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

	async retireCheckpoint(responsibilityId: number, checkpointId: number) {
		const context = await this.createContext();

		const response = await context.post(
			`/api/proficiency/v2/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/checkpoint/${checkpointId}/retire/`,
		);

		return response;
	}

	async reactivateCheckpoint(responsibilityId: number, checkpointId: number) {
		const context = await this.createContext();

		const response = await context.post(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/checkpoint/${checkpointId}/reactivate/`,
		);

		return response;
	}
	async evaluatePassCheckpoint(
		responsibilityId: number,
		employeeId: number,
		checkpointId: number,
		evaluationStatus: string,
		evaluationReason: string,
	) {
		const context = await this.createContext();

		const response = await context.post(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/checkpoint/${checkpointId}/pass/`,
			{
				data: {
					status: evaluationStatus,
					reason: evaluationReason,
					employee: employeeId,
					checkpoint: checkpointId,
				},
			},
		);

		return response;
	}

	async evaluateFailCheckpoint(
		responsibilityId: number,
		employeeId: number,
		checkpointId: number,
		evaluationStatus: string,
		evaluationReason: string,
	) {
		const context = await this.createContext();

		const response = await context.post(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/checkpoint/${checkpointId}/fail/`,
			{
				data: {
					status: evaluationStatus,
					reason: evaluationReason,
					employee: employeeId,
					checkpoint: checkpointId,
				},
			},
		);

		return response;
	}

	async evaluateNotApplicableCheckpoint(
		responsibilityId: number,
		employeeId: number,
		checkpointId: number,
		evaluationStatus: string,
		evaluationReason: string,
	) {
		const context = await this.createContext();

		const response = await context.post(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/checkpoint/${checkpointId}/not-applicable/`,
			{
				data: {
					status: evaluationStatus,
					reason: evaluationReason,
					employee: employeeId,
					checkpoint: checkpointId,
				},
			},
		);

		return response;
	}
	async evaluateResetCheckpoint(
		responsibilityId: number,
		employeeId: number,
		checkpointId: number,
		evaluationStatus: string,
		evaluationReason: string,
	) {
		const context = await this.createContext();

		const response = await context.post(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/checkpoint/${checkpointId}/reset/`,
			{
				data: {
					status: evaluationStatus,
					reason: evaluationReason,
					employee: employeeId,
					checkpoint: checkpointId,
				},
			},
		);

		return response;
	}

	async getCheckpointDrawer(checkpointId: number) {
		const context = await this.createContext();

		const response = await context.get(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/checkpoint/${checkpointId}/chatter/`,
		);

		return response;
	}

	async getAllCheckpoint(responsibilityId: number, employeeId: number) {
		const context = await this.createContext();
		const response = await context.get(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/employee/${employeeId}/`,
		);
		return response;
	}

	async moveCheckpoint(checkpointId: number, responsibilityId: number) {
		const context = await this.createContext();
		const response = await context.post(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/checkpoint/${checkpointId}/move/`,
			{
				data: {
					// eslint-disable-next-line camelcase
					responsibility_id: responsibilityId,
				},
			},
		);

		return response;
	}

	async getCheckpointsV2(responsibilityId: number, search?: string, status?: string, proficiencyLevel?: string) {
		const context = await this.createContext();
		const queryParams = new URLSearchParams();
		if (search) queryParams.append("search", search);
		if (status) queryParams.append("status", status);
		if (proficiencyLevel) queryParams.append("proficiency_level", proficiencyLevel);

		const queryString = queryParams.toString();
		const url = `/api/proficiency/v2/account/${process.env.ACCOUNT_ID}/responsibility/${responsibilityId}/checkpoint/${queryString ? `?${queryString}` : ""}`;

		const response = await context.get(url);
		return response;
	}

	async uploadMicrolearningVideo(checkpointId: number, videoFilePath: string) {
		const context = await this.createFileUploadContext("email", "password");
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const fs = require("fs");
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const FormData = require("form-data");
		const fileBuffer = fs.readFileSync(videoFilePath);
		const formData = new FormData();
		formData.append("file", fileBuffer, {
			filename: "SampleVideo_1280x720_1mb.mp4",
			contentType: "video/mp4",
		});

		const response = await context.post(
			`/api/proficiency/account/${process.env.ACCOUNT_ID}/checkpoint/${checkpointId}/video/`,
			{
				data: formData.getBuffer(),
				headers: {
					"Content-Type": `multipart/form-data; boundary=${formData.getBoundary()}`,
				},
			},
		);

		return response;
	}
}
