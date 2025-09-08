import { expect, Page } from "@playwright/test";
import { Logger } from "winston";
import { CustomWorld } from "./customWorld";
import { ARIARole } from "./util/basic";

const resultPath: string = "./test-results/";
const screenshotPath: string = resultPath + "screenshots/";

export const Base = {
	page: undefined as Page,
	logger: undefined as Logger,
	worldInstance: undefined as CustomWorld,
};

export class BaseClass {
	public downloadPath: string = resultPath + "downloads/";

	public user: string;

	//Get the environment from CLI
	getEnv(): string {
		let env = "";
		switch (process.env.ENV) {
			case "DEV":
				env = "DEV";
				break;
			case "PROD":
				env = "PROD";
				break;
			case "STAGING":
				env = "STAGING";
				break;
			default:
				throw "Please specify 'DEV' or 'PROD' or 'STAGING' environment";
		}
		return env;
	}

	customLog(message: string) {
		Base.logger.info(message);
		Base.worldInstance.attach(message);
	}

	/**
	 * This method will load the url string
	 * @param url url string to load
	 */
	async openURL(url: string) {
		try {
			await Base.page.goto(url);
			Base.logger.info("Opening " + url);
		} catch (error) {
			Base.logger.error("Error opening url: +" + url + " : " + error);
		}
	}

	/**
	 * This method will wait for given time
	 * @param seconds number of seconds to wait
	 */
	async wait(seconds: number) {
		Base.logger.info("Waiting for " + seconds + " seconds ");
		return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
	}

	/**
	 * This method will wait for page to load
	 *
	 */
	async waitForPageToLoad() {
		await Base.page.waitForLoadState("load");
		await Base.page.waitForLoadState("domcontentloaded");
	}

	/**
	 * This method will scroll into the view of a element that is not visible
	 *
	 */
	async scrollIntoView(xpath: string, index: number): Promise<void> {
		try {
			const elementHandle = Base.page.locator(xpath).nth(index);
			await elementHandle.scrollIntoViewIfNeeded();
		} catch (error) {
			console.error(`Error scrolling into view for xpath: ${xpath} : ${error}`);
		}
	}

	/**
	 * This method will take a screenshot
	 * @param name name of the screenshot
	 */
	async takeScreenshot() {
		const img = await Base.page.screenshot({
			path: screenshotPath + "/" + Base.worldInstance.scenarioName + "/" + Base.worldInstance.scenarioName + ".png",
			type: "png",
			fullPage: true,
		});
		Base.worldInstance.attach(img, "image/png");
	}

	async takeScreenshotOfPage(page: Page) {
		const img = await page.screenshot({
			path: screenshotPath + "/" + Base.worldInstance.scenarioName + "/" + Base.worldInstance.scenarioName + ".png",
			type: "png",
			fullPage: true,
		});
		Base.worldInstance.attach(img, "image/png");
	}

	/**
	 * This method will wait for the element to disappear
	 * @param xpath xpath of the input field
	 */
	async waitForElementToDisappear(xpath: string) {
		try {
			for (let i = 0; i < 30; i++) {
				const bool = await Base.page.locator(xpath).isVisible({ timeout: 1000 });
				if (bool) {
					Base.logger.info("Waiting for " + xpath + " to disappear");
					await this.wait(1);
				} else {
					break;
				}
			}
		} catch (error) {
			Base.logger.error("Error waiting for element to disappear: " + xpath + " : " + error);
		}
	}

	/**
	 * This method will wait for the element to disappear
	 * @param xpath xpath of the input field
	 */
	async waitForElementToBeDetachedFromDOM(xpath: string) {
		if (await Base.page.isVisible(xpath)) {
			await Base.page.waitForSelector(xpath, { state: "detached", timeout: 60000 });
		}
	}

	/**
	 * This method will wait for element to be displayed
	 * @param xpath xpath of the element
	 */
	async waitForElement(xpath: string) {
		Base.logger.info("Waiting for element to be displayed " + xpath);
		try {
			await Base.page.waitForSelector(xpath);
		} catch (error) {
			Base.logger.error("Error waiting for element: " + xpath + " : " + error);
		}
	}

	async waitForTextInElement(selector: string, text: string) {
		Base.logger.info(`Waiting for text "${text}" to be displayed in element ${selector}`);
		try {
			await Base.page.waitForFunction(
				({ selector, text }) => {
					const element = document.querySelector(selector);
					return element ? element.textContent.includes(text) : false;
				},
				{ selector, text }, // context object containing the selector and text
				{ timeout: 5000 }, // options object with timeout
			);
			Base.logger.info(`Text "${text}" is displayed in element ${selector}`);
		} catch (error) {
			Base.logger.error(`Error waiting for text "${text}" in element ${selector}: ${error}`);
		}
	}

	async exists(xpath: string) {
		let count: number;
		let exists: boolean;
		try {
			count = await Base.page.locator(xpath).count();
			if (count > 0) {
				exists = true;
			} else {
				exists = false;
			}
			return exists;
		} catch (error) {
			console.error("Error checking existence for element: " + xpath + " : " + error);
		}
		Base.logger.info("Checking existence for " + xpath + " : " + exists);
	}

	/**
	 * This method will return is element is displayed or not
	 * @param xpath xpath of the element
	 */
	async isDisplayed(xpath: string) {
		await this.waitForElement(xpath);
		let visiblity: boolean = false;
		try {
			visiblity = await Base.page.locator(xpath).isVisible();
		} catch (error) {
			console.error("Error checking visibility for element: " + xpath + " : " + error);
		}
		Base.logger.info("Checking visiblity for " + xpath + " : " + visiblity);
		return visiblity;
	}

	/**
	 * This method will return is element is displayed or not without using the waitForElement() method
	 * @param xpath xpath of the element
	 */
	async isVisible(xpath: string) {
		let visiblity: boolean = false;
		try {
			visiblity = await Base.page.locator(xpath).isVisible();
		} catch (error) {
			console.error("Error checking visibility for element: " + xpath + " : " + error);
		}
		Base.logger.info("Checking visiblity for " + xpath + " : " + visiblity);
		return visiblity;
	}

	async waitForURLToContain(expectedString: string, timeout = 30000, interval = 100) {
		const startTime = Date.now();
		let currentURL: string;
		while (Date.now() - startTime < timeout) {
			currentURL = await this.getCurrentUrl();
			if (currentURL.includes(expectedString)) {
				return true;
			}
			await new Promise((resolve) => setTimeout(resolve, interval));
		}
		throw new Error(`URL did not contain "${expectedString}" within ${timeout}ms. Current URL: ${currentURL}`);
	}

	/**
	 * This method is used to click element
	 * @param xpath xpath of the element
	 * @param object name of the element
	 */
	async clickElement(xpath: string, object: string) {
		await this.waitForElement(xpath);
		try {
			await Base.page.locator(xpath).click();
			Base.logger.info("Clicked on " + object + " with xpath " + xpath);
		} catch (error) {
			Base.logger.error("Error clicking element: " + xpath + " : " + error);
		}
	}

	async clickNthElement(xpath: string, object: string, nth: number) {
		await this.waitForElement(xpath);
		try {
			await Base.page.locator(xpath).nth(nth).click();
			Base.logger.info("Clicked on " + object + " with xpath " + xpath);
		} catch (error) {
			Base.logger.error("Error clicking element: " + xpath + " : " + error);
		}
	}

	async clickElementByRole(role: ARIARole, name: string) {
		try {
			await Base.page.getByRole(role, { name }).click();
		} catch (error) {
			console.error(`Failed to click on the menu item with role: ${role} and name: ${name}`, error);
		}
	}

	async uploadFile(xpath: string, filePath: string) {
		await this.waitForElement(xpath);
		try {
			await Base.page.locator(xpath).setInputFiles(filePath);
			Base.logger.info("File uploaded successfully: " + filePath);
		} catch (error) {
			Base.logger.error("Error uploading file at " + xpath + ": " + error);
		}
	}

	/**
	 * This method is used to click element using dispatchEvent
	 * @param xpath xpath of the element
	 * @param object name of the element
	 */
	async dispatchEventclickElement(xpath: string, object: string) {
		await this.waitForElement(xpath);
		try {
			await Base.page.locator(xpath).dispatchEvent("click");
			Base.logger.info("Clicked on " + object + " with xpath " + xpath);
		} catch (error) {
			Base.logger.error("Error clicking element: " + xpath + " : " + error);
		}
	}

	/**
	 * This method is used to click only visible element from list of elements
	 * @param xpath xpath of the element
	 * @param object name of the element
	 */
	async clickOnlyVisibleElement(xpath: string, object: string) {
		try {
			const elements = await this.getAllElements(xpath); // Replace with your XPath expression
			for (const element of elements) {
				const isVisible = await element.isVisible();
				if (isVisible) {
					await element.click(); // Click the visible element
					Base.logger.info("click on '" + object + " with xpath " + xpath);
					break; // Exit the loop after clicking the first visible element
				}
			}
		} catch (error) {
			Base.logger.error("Error clicking element: " + xpath + " : " + error);
		}
	}

	/**
	 * This method is used to enter text in an input fieldl̥
	 * @param xpath xpath of the input field
	 * @param input text to be entered
	 * @param object name of the input field
	 */
	async enterText(xpath: string, input: string, object: string) {
		await this.waitForElement(xpath);
		try {
			await Base.page.locator(xpath).fill(input);
			Base.logger.info("Entered text '" + input + "' in " + object + " with xpath " + xpath);
		} catch (error) {
			Base.logger.error("Error entering text in element: " + xpath + " : " + error);
		}
	}

	async enterTextsequentially(xpath: string, input: string, object: string) {
		await this.waitForElement(xpath);
		try {
			await Base.page.locator(xpath).pressSequentially(input);
			Base.logger.info("Entered text '" + input + "' in " + object + " with xpath " + xpath);
		} catch (error) {
			Base.logger.error("Error entering text in element: " + xpath + " : " + error);
		}
	}

	/**
	 * This method is used to remove text from an input fieldl̥
	 * @param xpath xpath of the input field
	 * @param object name of the input field
	 */
	async clearText(xpath: string, object: string) {
		await this.waitForElement(xpath);
		try {
			await Base.page.locator(xpath).clear();
			Base.logger.info("Cleared text from" + object + " with xpath " + xpath);
		} catch (error) {
			Base.logger.error("Error in clearing text in element: " + xpath + " : " + error);
		}
	}

	/**
	 * This method will extract test from the xpath
	 * @param xpath xpath of the input field
	 */
	async getText(xpath: string) {
		await this.waitForElement(xpath);
		try {
			const text: string = await Base.page.locator(xpath).innerText();
			Base.logger.info("Text from " + xpath + " is " + text);
			return text;
		} catch (error) {
			Base.logger.error("Error getting text from element: " + xpath + " : " + error);
		}
	}

	async getTextByIndex(xpath: string, index: number) {
		await this.waitForElement(xpath);
		try {
			const text: string = await Base.page.locator(xpath).nth(index).innerText();
			Base.logger.info("Text from " + xpath + " is " + text);
			return text;
		} catch (error) {
			Base.logger.error("Error getting text from element: " + xpath + " : " + error);
		}
	}

	async getTextContent(xpath: string) {
		await this.waitForElement(xpath);
		try {
			const text: string = await Base.page.locator(xpath).textContent();
			Base.logger.info("Text from " + xpath + " is " + text);
			return text;
		} catch (error) {
			Base.logger.error("Error getting text from element: " + xpath + " : " + error);
		}
	}
	/**
	 * This method is used to get attribute value for an HTML element
	 * @param xpath xpath of the element
	 * @param attributeName attribute name i.e aria-label, value etc.
	 * @returns string value of the html attribute
	 */
	async getHtmlAttributeByXPath(xpath: string, attributeName: string): Promise<string | null> {
		try {
			const element = Base.page.locator(xpath);
			if (element) {
				const attributeValue = await element.getAttribute(attributeName);
				Base.logger.info(attributeName + " for " + xpath + " is " + attributeValue);
				return attributeValue;
			} else {
				Base.logger.info("Element not found with XPath:", xpath);
				return null;
			}
		} catch (error) {
			Base.logger.error("Error retrieving HTML attribute:", error);
			return null;
		}
	}

	async getHtmlAttributeByXPathUsingIndex(xpath: string, attributeName: string, index: number): Promise<string | null> {
		try {
			const element = Base.page.locator(xpath).nth(index);
			if (element) {
				const attributeValue = await element.getAttribute(attributeName);
				Base.logger.info(attributeName + " for " + xpath + " is " + attributeValue);
				return attributeValue;
			} else {
				Base.logger.info("Element not found with XPath:", xpath);
				return null;
			}
		} catch (error) {
			Base.logger.error("Error retrieving HTML attribute:", error);
			return null;
		}
	}

	/**
	 * This mthod return the number of elements associated with the xpath
	 * @param xpath
	 * @returns
	 */
	async getElementCount(xpath: string): Promise<number> {
		try {
			const count: number = await Base.page.locator(xpath).count();
			Base.logger.info("Element count for " + xpath + " : " + count);
			return count;
		} catch (error) {
			Base.logger.error("Error getting element count for element: " + xpath + " : " + error);
		}
	}

	/**
	 * This method is used in case we need multiple elements associated to an xpath
	 * @param xpath
	 * @returns
	 */
	async getAllElements(xpath: string) {
		try {
			const elements = await Base.page.locator(xpath).all();
			Base.logger.info("Returning all elements for " + xpath);
			return elements;
		} catch (error) {
			Base.logger.error("Error getting all elements for element: " + xpath + " : " + error);
			return [];
		}
	}

	/**
	 * This method return test from all elements associated to an xpath
	 * @param xpath
	 * @returns
	 */
	async getTextFromAllElements(xpath: string): Promise<string[]> {
		try {
			const elements = await this.getAllElements(xpath);
			return await Promise.all(elements.map((row) => row.textContent()));
		} catch (error) {
			Base.logger.error("Error getting text from all elements for element: " + xpath + " : " + error);
		}
	}

	/**
	 * This method return test from all elements associated to an xpath
	 * @param xpath
	 * @returns
	 */
	async getTextFromAllVisibleElements(xpath: string) {
		try {
			const elements = await this.getAllElements(xpath);
			return await Promise.all(elements.map((row) => row.textContent()));
		} catch (error) {
			Base.logger.error("Error getting text from all elements for element: " + xpath + " : " + error);
		}
	}

	/**
	 * This method is used to see if element is enabled/clickable or not
	 * @param xpath
	 * @returns
	 */
	async isEnabled(xpath: string): Promise<boolean> {
		try {
			const enabled: boolean = await Base.page.locator(xpath).isEnabled();
			Base.logger.info("Element " + xpath + " enabled? : " + enabled);
			return enabled;
		} catch (error) {
			Base.logger.error("Error checking if element is enabled: " + xpath + " : " + error);
		}
	}

	async isDisabled(xpath: string): Promise<boolean> {
		try {
			const disabled: boolean = await Base.page.locator(xpath).isDisabled();
			Base.logger.info("Element " + xpath + " disabled? : " + disabled);
			return disabled;
		} catch (error) {
			Base.logger.error("Error checking if element is disabled: " + xpath + " : " + error);
		}
	}

	async expectElementToBeEnabled(xpath: string) {
		await expect(Base.page.locator(xpath)).toBeEnabled();
	}

	async expectElementToBeDisabled(xpath: string) {
		await expect(Base.page.locator(xpath)).toBeDisabled();
	}

	async expectElementToBeVisible(xpath: string) {
		await expect(Base.page.locator(xpath)).toBeVisible();
	}

	async expectElementToBehidden(xpath: string) {
		await expect(Base.page.locator(xpath)).toBeHidden();
	}

	async expectToHaveUrl(url: string) {
		await expect(Base.page).toHaveURL(url);
	}

	async expectToContainUrl(url: string) {
		expect(Base.page.url()).toContain(url);
	}

	/**
	 * This methods is used imitate pressing any key on keyboard
	 * https://playwright.dev/docs/api/class-keyboard
	 * @param key Key to be pressed
	 */
	async keyboardPress(key: string) {
		try {
			await Base.page.keyboard.press(key);

			Base.logger.info("Pressed " + key + " key");
		} catch (error) {
			Base.logger.error("Error pressing key: " + key + " : " + error);
		}
	}

	/**
	 * This method is used to imitate typing something on keyboard
	 * @param text Text to be typed
	 */
	async keyboardType(text: string) {
		try {
			await Base.page.keyboard.type(text);
			Base.logger.info("Typed " + text);
		} catch (error) {
			Base.logger.error("Error typing text: " + text + " : " + error);
		}
	}

	async getInputValue(selector: string) {
		try {
			const inputValue = await Base.page.locator(selector).inputValue();
			Base.logger.info("Input value: " + inputValue);
			return inputValue;
		} catch (error) {
			Base.logger.error("Error getting input value: " + error);
			throw error;
		}
	}

	async fillText(selector: string, text: string) {
		try {
			await Base.page.fill(selector, text);
			Base.logger.info("Typed " + text);
		} catch (error) {
			Base.logger.error("Error typing text: " + text + " : " + error);
		}
	}

	/**
	 * This method is used to imitate pressing mouse left key ithout lifting up
	 */
	async mouseDown() {
		try {
			await Base.page.mouse.down();
			Base.logger.info("Mouse down");
		} catch (error) {
			Base.logger.error("Error on mouse down method");
		}
	}

	/**
	 * This method is used to leave the mouse left key after pressing it
	 * To be used only after mouseDown method
	 */
	async mouseUp() {
		try {
			await Base.page.mouse.up();
			Base.logger.info("Mouse up");
		} catch (error) {
			Base.logger.error("Error on mouse up method");
		}
	}

	/**
	 * This method is used to move the pointer based the x and y coordinates
	 * @param x
	 * @param y
	 */
	async mouseMove(x: number, y: number) {
		try {
			await Base.page.mouse.move(x, y);
			Base.logger.info("Mouse move by " + x + " and " + y);
		} catch (error) {
			Base.logger.error("Error clicking element");
		}
	}

	/**
	 * This method will select the entire text
	 * @param selector
	 */
	async selectText(selector: string) {
		try {
			const element = await Base.page.waitForSelector(selector);
			const boundingBox = await element.boundingBox();
			if (boundingBox) {
				const { x, y, width, height } = boundingBox;
				await this.mouseMove(x + 5, y + height / 2);
				await Base.page.mouse.down();
				await this.mouseMove(x + width - 5, y + height / 2);
				await Base.page.mouse.up();
				Base.logger.info("Text selected in element: " + selector);
			} else {
				Base.logger.error("Bounding box not found for selector: " + selector);
			}
		} catch (error) {
			Base.logger.error("Error selecting text in element: " + selector);
		}
	}

	/**
	 * This method will uncheck the uncheckbox and do nothing if it is already checked
	 * @param selector
	 */
	async checkCheckbox(selector: string): Promise<void> {
		await this.waitForElement(selector);
		try {
			await Base.page.check(selector);
			Base.logger.info("Checked checkbox: " + selector);
		} catch (error) {
			Base.logger.error("Error unchecking checkbox: " + selector + " : " + error);
		}
	}

	/**
	 * This method will uncheck the checkbox and do nothing if it is already unchecked
	 * @param selector
	 */
	async uncheckCheckbox(xpath: string): Promise<void> {
		await this.waitForElement(xpath);
		try {
			await Base.page.uncheck(xpath);
			Base.logger.info("Unchecked checkbox: " + xpath);
		} catch (error) {
			Base.logger.error("Error unchecking checkbox: " + xpath + " : " + error);
		}
	}

	/**
	 * This method is used to reload the page
	 */
	async reloadPage() {
		Base.logger.info("Reloading page");
		await Base.page.reload();
	}

	/**
	 * This method will return current url
	 */
	async getCurrentUrl() {
		try {
			const url: string = Base.page.url();
			Base.logger.info("Url is " + url);
			return url;
		} catch (error) {
			Base.logger.error("Error getting current url: " + error);
		}
	}

	/**
	 * This method is used to hover pointer over an element
	 * @param xpath
	 */
	async hoverOverElement(xpath: string) {
		await this.waitForElement(xpath);
		try {
			await Base.page.locator(xpath).hover();
			Base.logger.info("Hovered over element: " + xpath);
		} catch (error) {
			Base.logger.error("Error hovering over element: " + xpath + " : " + error);
		}
	}

	async goBackButton() {
		try {
			await Base.page.goBack();
		} catch (error) {
			Base.logger.error("Error clicking back button: " + error);
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async dragAndDrop(sourceElement: any, targetElement: any) {
		try {
			await sourceElement.dragTo(targetElement);
			Base.logger.info("Drag and drop operation completed successfully");
		} catch (error) {
			Base.logger.error("Error performing drag and drop operation: " + error);
			throw error;
		}
	}
}

export const baseInstance = new BaseClass();
