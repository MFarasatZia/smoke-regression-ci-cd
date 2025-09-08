import { BaseClass } from "../../helpers/BaseClass";
import { User } from "../owner/account";
import { getUserDetails } from "../../helpers/jsonHelper";
import { request } from "@playwright/test";

export default class FeatureCategoryApi {
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

	async createFeatureCategory(categoryName: string, parentId?: number) {
		const context = await this.createAdminContext();

		return await context.post("/api/common/feature-category/", {
			data: {
				name: categoryName,
				parent: parentId,
			},
		});
	}

	async getFeatureCategory(featureCategoryId: number) {
		const context = await this.createAdminContext();

		return await context.get(`/api/common/feature-category/${featureCategoryId}/`);
	}

	async createGlobalFeature(payload: { id: number; name: string; category: number }) {
		const context = await this.createAdminContext();
		return await context.post("/api/common/global-feature/", {
			data: payload,
		});
	}

	async getGlobalFeatureById(id: number) {
		const context = await this.createAdminContext();
		return await context.get(`/api/common/global-feature/${id}/`);
	}
}
