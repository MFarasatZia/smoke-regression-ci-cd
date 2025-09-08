import { Given, Then, When } from "@cucumber/cucumber";
import UserApi from "../../apis/owner/user";
import { baseInstance } from "../../helpers/BaseClass";
import { expect } from "@playwright/test";
import { getRandomNumber } from "../../helpers/util/random";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, camelcase
let response: any, responseBody: any;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let Currency: number;
let currencyId: number;
const userApiCalls: UserApi = new UserApi(baseInstance);

Given("User call the common currencies list API", async () => {
	response = await userApiCalls.getCurrenciesList();
	responseBody = await response.json();
});

Given("User Call the Common Currencies List API", async () => {
	response = await userApiCalls.getOperatingCurrenciesList();
	responseBody = await response.json();
});

Then("verify response for currencies list API call is 200", async () => {
	expect(response.status()).toBe(200);
});

Then("verify response for Opperating currencies API is 201", async () => {
	expect(response.status()).toBe(201);
});

Then("Verify that response of the API is {int}", async (statusCode) => {
	expect(response.status()).toBe(statusCode);
});

Then("User Verify the response Body", async () => {
	expect(responseBody).toHaveProperty("count");
	expect(responseBody).toHaveProperty("next");
	expect(responseBody).toHaveProperty("previous");
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBeTruthy();
});

Given("User Call the Create Opearating Currency", async function () {
	const currency = getRandomNumber(1, 10);
	response = await userApiCalls.createOperatingCurrency(currency, this.operatingCountryId);
	responseBody = await response.json();
	this.currencyId = responseBody.id;
});

When("User Call the Get Operating Currency", async function () {
	if (!this.currencyId) {
		throw new Error("Currency ID is undefined. Ensure that Create Operating Currency is executed first.");
	}

	response = await userApiCalls.getOperatingCurrency(this.currencyId);
	responseBody = await response.json();
});

When("User call the Get Operating currecny Chatter Read", async () => {
	response = await userApiCalls.getOperatingCurrencyChatterRead(currencyId);
	responseBody = await response.json();
});

Then("User verifify the response for Opperating currencies API", async () => {
	expect(responseBody).toHaveProperty("status");
	expect(responseBody).toHaveProperty("exchange_rate_to_reference");
	expect(responseBody).toHaveProperty("currency");
});

When("response has count,pagination", async () => {
	expect(responseBody.count).toBeGreaterThan(0);
	if (responseBody.next) expect(new URL(responseBody.next)).toBeInstanceOf(URL);
	if (responseBody.previous) expect(new URL(responseBody.previous)).toBeInstanceOf(URL);
});

Then("Verify the currency_id in the response body", async () => {
	expect(responseBody).toHaveProperty("currency_id");
	expect(typeof responseBody.currency_id).toBe("number");
});

Then("Verify that the countries field is in the response body", async () => {
	expect(responseBody).toHaveProperty("countries");
	expect(Array.isArray(responseBody.countries)).toBeTruthy();
});
