import { Given, Then, When } from "@cucumber/cucumber";
import { RemovableBannerData, generateRandomBannerData } from "../../helpers/util/random";
import { baseInstance } from "../../helpers/BaseClass";
import BannerApis from "../../apis/owner/banner";
import { expect } from "@playwright/test";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let response;
let responseBody;
let bannerId: number;
const newBannerData: RemovableBannerData = generateRandomBannerData();
const bannerApiCalls: BannerApis = new BannerApis(baseInstance);

Given("user creates a removable_banner", async () => {
	response = await bannerApiCalls.createRemovableBanner(
		newBannerData.text,
		newBannerData.subText,
		newBannerData.learnMore,
	);

	responseBody = await response.json();
	await expect(response).toBeOK();
	bannerId = responseBody.id;
});

When("user call the api to remove the removable_banner", async () => {
	response = await bannerApiCalls.removeBanner(bannerId);

	responseBody = await response.json();
	await expect(response).toBeOK();
});

Then("verify the response is 200", async () => {
	expect(response.status()).toBe(200);
});

Then("verify banner key is visible in the response", async () => {
	expect(responseBody.banner).not.toBeNull();
});

Then("verify removed_by key is visible in the response", async () => {
	expect(responseBody.removed_by).not.toBeNull();
});

Then("verify removed_on key is visible in the response", async () => {
	expect(responseBody.removed_on).not.toBeNull();
});

Given("user call API for removable banner list", async () => {
	response = await bannerApiCalls.getBannerList();
	const responseBody = await response.json();
	await expect(response).toBeOK();
	expect(responseBody).toBeTruthy();
});

When("User calls the Removable Banner Read API and verifies the response fields", async function () {
	const response = await bannerApiCalls.getRemovableBannerById(bannerId);
	expect(response.status()).toBe(200);
	const responseBody = await response.json();
	expect(responseBody).toBeTruthy();
	expect(responseBody.id).toBe(bannerId);
	expect(responseBody).toHaveProperty("text");
	expect(responseBody).toHaveProperty("sub_text");
	expect(responseBody).toHaveProperty("learn_more");
	expect(responseBody).toHaveProperty("banner_type");
});

Given("user creates an add removable banner", async () => {
	response = await bannerApiCalls.addRemovableBanner(
		newBannerData.text,
		newBannerData.subText,
		newBannerData.learnMore,
	);

	responseBody = await response.json();
	await expect(response).toBeOK();
	bannerId = responseBody.id;
});

When("response of the API is 201", async () => {
	expect(response.status()).toBe(201);
});

Then("verify response has banner_id", async () => {
	expect(responseBody.banner_id).not.toBeNull();
});

Then("verify response has text field", async () => {
	expect(responseBody.text).not.toBeNull();
});

Then("verify response has sub_text field", async () => {
	expect(responseBody.sub_text).not.toBeNull();
});

Then("verify response has learn_more field", async () => {
	expect(responseBody.learn_more).not.toBeNull();
});

Then("verify response has banner_type", async () => {
	expect(responseBody.banner_type).not.toBeNull();
});

Then("verify response has line field", async () => {
	expect(responseBody.lines).not.toBeNull();
});

Then("verify response has created_by field", async () => {
	expect(responseBody.created_by).not.toBeNull();
});

Then("verify response has created_on field", async () => {
	expect(responseBody.created_on).not.toBeNull();
});
