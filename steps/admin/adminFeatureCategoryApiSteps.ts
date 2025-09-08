import { Given, Then, When } from "@cucumber/cucumber";
import { APIResponse, expect } from "@playwright/test";
import FeatureCategoryApi from "../../apis/admin/featureCategory";
import { baseInstance } from "../../helpers/BaseClass";
import { generateRandomCategory } from "../../helpers/util/random";

let response: APIResponse;
let featureCategoryName: string;
let responseBody;
let featureCategoryId: number;
let globalFeatureId: number;
const featureCategoryApiCalls = new FeatureCategoryApi(baseInstance);
Given("user calls the category feature post API", async function () {
	featureCategoryName = generateRandomCategory().categoryName;
	response = await featureCategoryApiCalls.createFeatureCategory(featureCategoryName);
	expect(response.status()).toBe(201);
	responseBody = await response.json();
	featureCategoryId = responseBody.id;
});

Given("user calls the global feature post API", async function () {
	featureCategoryName = generateRandomCategory().categoryName;
	const globalFeaturePayload = {
		id: featureCategoryId,
		name: featureCategoryName,
		category: featureCategoryId,
	};
	response = await featureCategoryApiCalls.createGlobalFeature(globalFeaturePayload);
	expect(response.status()).toBe(201);
	responseBody = await response.json();
	globalFeatureId = responseBody.id;
});

Given("user calls the global feature read API", async function () {
	response = await featureCategoryApiCalls.getGlobalFeatureById(globalFeatureId);
	expect(response.status()).toBe(200);
	responseBody = await response.json();
});

Then("verify the global feature details are returned", async function () {
	expect(responseBody.name).toBe(featureCategoryName);
	expect(responseBody.category).toBe(featureCategoryId);
	expect(responseBody.active).toBe(false);
	expect(responseBody.description).toBeNull();
});

Then(
	"verify the response status code for the category feature create API is {int}",
	async function (statusCode: number) {
		expect(response.status()).toBe(statusCode);
	},
);

Given("that a category feature exists", async function () {
	featureCategoryName = generateRandomCategory().categoryName;
	response = await featureCategoryApiCalls.createFeatureCategory(featureCategoryName);
	expect(response.status()).toBe(201);
	responseBody = await response.json();
	featureCategoryId = responseBody.id;
});

When("user calls the category feature get API", async function () {
	response = await featureCategoryApiCalls.getFeatureCategory(featureCategoryId);
});

Then("verify the response for the category feature get API is {int}", async function (statusCode: number) {
	expect(response.status()).toBe(statusCode);
	responseBody = await response.json();
});

Then("verify the response body for the category feature get API contains the expected elements", async function () {
	expect(responseBody.id).toBe(featureCategoryId);
	expect(responseBody.name).toBe(featureCategoryName);
});
