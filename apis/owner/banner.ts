import { request } from "@playwright/test";
import { BaseClass } from "../../helpers/BaseClass";
import { getUserDetails } from "../../helpers/jsonHelper";

export default class BannerApis {
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

	async createRemovableBanner(text: string, subText: string, learnMore: string) {
		const context = await this.createContext();
		return context.post("/api/common/removable-banner/", {
			data: {
				text: text,
				// eslint-disable-next-line camelcase
				sub_text: subText,
				// eslint-disable-next-line camelcase
				learn_more: learnMore,
			},
		});
	}

	async addRemovableBanner(text: string, subText: string, learnMore: string) {
		const context = await this.createContext();
		return context.post(`/api/common/account/${process.env.ACCOUNT_ID}/removable-banner-create/`, {
			data: {
				text: text,
				// eslint-disable-next-line camelcase
				sub_text: subText,
				// eslint-disable-next-line camelcase
				learn_more: learnMore,
			},
		});
	}

	async removeBanner(bannerId: number) {
		const context = await this.createContext();
		return context.post(`/api/common/account/${process.env.ACCOUNT_ID}/banner/${bannerId}/remove-banner/`);
	}

	async getBannerList() {
		const context = await this.createContext();

		const response = await context.get("/api/common/removable-banner/");

		return response;
	}

	async getRemovableBannerById(bannerId: number) {
		const context = await this.createContext();

		const response = await context.get(`/api/common/removable-banner/${bannerId}/`);

		return response;
	}
}
