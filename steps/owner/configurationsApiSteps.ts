import { Given, Then, When } from "@cucumber/cucumber";
import UserApi from "../../apis/owner/user";
import { baseInstance } from "../../helpers/BaseClass";
import { APIResponse, expect } from "@playwright/test";
import { getRandomNumber } from "../../helpers/util/random";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, camelcase
let response: APIResponse, responseBody: any;
const userApiCalls: UserApi = new UserApi(baseInstance);

Given("user calls the countries list API", async () => {
	response = await userApiCalls.getCountriesList();
	responseBody = await response.json();
});

Given("User has an Operating Country", async function () {
	const dynamicCountryId = getRandomNumber(1, 100);
	response = await userApiCalls.createOperatingCountry("active", 5, dynamicCountryId);
	responseBody = await response.json();

	this.operatingCountryId = responseBody.id;
	this.countryName = responseBody.country.name;
});

Given("User Calls the Create Pay Range API", async function () {
	const dynamicName = `payrange_${getRandomNumber(100, 999)}`;
	const bottomOfRange = getRandomNumber(50, 150);
	const topOfRange = bottomOfRange + getRandomNumber(10, 100);
	const midOfRange = Math.floor((bottomOfRange + topOfRange) / 2);

	const payload = {
		name: dynamicName,
		// eslint-disable-next-line camelcase
		is_country_wide: true,
		region: "string",
		// eslint-disable-next-line camelcase
		expressed_as: "per_hour",
		// eslint-disable-next-line camelcase
		bottom_of_range: bottomOfRange,
		// eslint-disable-next-line camelcase
		top_of_range: topOfRange,
		// eslint-disable-next-line camelcase
		mid_of_range: midOfRange,
		status: "active",
		account: 3, // Static account ID
		country: this.operatingCountryId,
		// eslint-disable-next-line camelcase
		operating_currency: this.currencyId,
	};
	this.payRangeId = await userApiCalls.createPayRange(this.operatingCountryId, payload);
});

Given("User Calls the Get Pay Range API", async function () {
	const payRangeResponse = await userApiCalls.getPayRange(this.operatingCountryId);
	this.payRangeResponse = payRangeResponse.body;
	responseBody = payRangeResponse.body;
});

Given("User call the Get Operating country Pay Range Read API", async function () {
	response = await userApiCalls.getOperatingCountriesRead(this.operatingCountryId, this.payRangeId);
	this.payRangeResponse = response.body;
	responseBody = await response.json();
});

Then("verify response structure for Operating country Pay Range Read API", async () => {
	expect(responseBody).toHaveProperty("id");
	expect(responseBody).toHaveProperty("status");
	expect(responseBody).toHaveProperty("country");
});

Then("verify response structure for the Pay Range API response", async () => {
	const results = Array.isArray(responseBody.results) ? responseBody.results : [responseBody];
	expect(Array.isArray(results)).toBeTruthy();
	results.forEach((payRange) => {
		expect(payRange).toHaveProperty("id");
		expect(payRange).toHaveProperty("account");
		expect(payRange).toHaveProperty("country");
		expect(typeof payRange.id).toBe("number");
		expect(typeof payRange.account).toBe("number");
		expect(typeof payRange.country).toBe("number");
	});
});

When("user call the Get Operating Country API", async () => {
	response = await userApiCalls.getOperatingCountriesList();
	responseBody = await response.json();
});

Then("Verify that 'country_wide_location' is not in the response", async () => {
	expect(responseBody.country_wide_location).toBeFalsy();
});

When("verify response for countries list API call is 200", async () => {
	expect(response.status()).toBe(200);
});

Then("verify response structure for the country list response body", async () => {
	expect(responseBody).toHaveProperty("count");
	expect(responseBody).toHaveProperty("next");
	expect(responseBody).toHaveProperty("previous");
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBeTruthy();
	if (responseBody.next) expect(new URL(responseBody.next)).toBeInstanceOf(URL);

	responseBody.results.forEach((country) => {
		expect(country).toHaveProperty("name");
		expect(country).toHaveProperty("currency_name");
		expect(country).toHaveProperty("currency");
		expect(country).toHaveProperty("flag_icon");
		expect(country.currency).toHaveProperty("name");
		expect(country.currency).toHaveProperty("code");
		expect(country.currency).toHaveProperty("symbol");
		expect(country.currency.name).toBeDefined();
		expect(country.currency.code).toBeDefined();
		expect(country.currency.symbol).toBeDefined();
	});
});

When("User call the Chatter API for the Operating Country", async function () {
	response = await userApiCalls.getOperatingCountryChatter(3, this.operatingCountryId);
	responseBody = await response.json();
});

Then("Verify the response of the chatter API for operating country", async () => {
	expect(response.status()).toBe(200);
	expect(responseBody.results[0].note).toContain("Added");
});

Then("verify response structure for the Operating Country Chatter API", async () => {
	expect(responseBody).toHaveProperty("count");
	expect(responseBody).toHaveProperty("next");
	expect(responseBody).toHaveProperty("previous");
	expect(responseBody).toHaveProperty("results");
	expect(Array.isArray(responseBody.results)).toBeTruthy();
	if (responseBody.next) expect(new URL(responseBody.next)).toBeInstanceOf(URL);
	expect(responseBody.count).toBe(1);

	responseBody.results.forEach((result) => {
		expect(result).toHaveProperty("id");
		expect(result).toHaveProperty("created_on");
		expect(result).toHaveProperty("updated_on");
		expect(result).toHaveProperty("recorded_on");
		expect(result).toHaveProperty("recorded_by_name");
		expect(result).toHaveProperty("is_history");
		expect(result).toHaveProperty("note");
		expect(result).toHaveProperty("table");
		expect(result).toHaveProperty("record_id");
		expect(result).toHaveProperty("created_by");
		expect(result).toHaveProperty("updated_by");
		expect(result).toHaveProperty("account");
		expect(result).toHaveProperty("access");
		expect(result).toHaveProperty("recorded_by");
		expect(result.id).toBeDefined();
		expect(result.created_on).toBeDefined();
		expect(result.updated_on).toBeDefined();
		expect(result.recorded_on).toBeDefined();
		expect(result.recorded_by_name).toBeDefined();
		expect(result.is_history).toBeDefined();
		expect(result.note).toBeDefined();
		expect(result.table).toBeDefined();
		expect(result.record_id).toBeDefined();
		expect(result.account).toBeDefined();
		expect(result.access).toBeDefined();
		expect(result.recorded_by).toBeDefined();
	});
});

When("the user calls the Create Pay Aggrement API", async () => {
	response = await userApiCalls.createPayAggrement();
	responseBody = await response.json();
});

When("the user calls the Retrieve Pay Aggrement API", async () => {
	response = await userApiCalls.retrievePayAggrement();
	responseBody = await response.json();
});

When("the user calls the Update Pay Aggrement API", async () => {
	const agreementId = Math.floor(Math.random() * 10) + 1;
	response = await userApiCalls.updatePayAggrement(4, agreementId);
	responseBody = await response.json();
});

When("the user calls the Delete Pay Aggrement API", async () => {
	response = await userApiCalls.deletePayAggrement(4, 3);
	responseBody = await response.json();
});

Then("Verify that 'work_hours_per_year' is in the response", async () => {
	responseBody.results.forEach((item: number) => {
		expect(item).toHaveProperty("work_hours_per_year");
	});
});
