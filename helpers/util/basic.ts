/**
 * This method converts truthy string values to boolean value
 *
 * @format
 * @param str
 * @returns boolean equivalent of the string
 */

export function stringToBoolean(str: string): boolean {
	const truthyValues = ["true", "1", "yes", "on"];
	return truthyValues.includes(str.toLowerCase());
}

/**
 * This method is used to format strings for xpaths
 * @param input Word or phrase
 * @returns string with first letter of each word capitalized
 */
export function capitalizeFirstCharAllWords(input: string): string {
	return input.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * This method is used to format strings for xpaths
 * @param input Word or phrase
 * @returns string with first letter of first word capitalized
 */
export function capitalizeFirstChar(input: string): string {
	return input.charAt(0).toUpperCase() + input.slice(1);
}

/**
 * Get datetime method
 * @returns date and time in YYYY-MM-DD HH:MM:SS format
 */
export function getDateTime(): string {
	const date = new Date();
	const dateStr = date.toISOString().split("T")[0];
	const timeStr = date.toTimeString().split(" ")[0];
	return dateStr + " " + timeStr;
}

/**
 * Get datetime method
 * @returns date and time in YYYY-MM-DD HH:MM:SS format
 */
export function getDateTimeWithAddedMinutes(minutesToAdd: number): string {
	const date = new Date();
	date.setMinutes(date.getMinutes() + minutesToAdd);

	const dateStr = date.toISOString().split("T")[0];
	const timeStr = date.toTimeString().split(" ")[0];
	return dateStr + " " + timeStr;
}

/**
 * Get date method
 * @returns date in YYYY-MM-DD format
 */
export function getDate(): string {
	const date = new Date();
	const dateStr = date.toISOString().split("T")[0];
	return dateStr;
}

/**
 * This method is used to get the digits from a string discarding everything else
 * @param inputString
 * @returns string with only digits
 */
export function getDigitsFromString(inputString: string): string {
	// Use a regular expression to match digits (\d) and join them into a string
	const digits = inputString.match(/\d/g);
	if (digits) {
		return digits.join("");
	}
	return "";
}

/**
 * This method is used to get the digits from a string discarding everything else
 * @param inputString
 * @returns string with only digits
 */
export function getCurrentTimezone(): string {
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	return timeZone;
}

/**
 * This method is used to convert a date string from an ISO format (YYYY-MM-DDTHH:MM:SS.sssZ)
 * to a custom date format DD-Month-YYYY (e.g., 19-October-2024).
 * @param isoDate - The ISO date string to be formatted (e.g., "2024-10-19T14:08:08.646866Z").
 * @returns A string representing the date in the format DD-Month-YYYY (e.g., "19-October-2024").
 */
export function formatDate(isoDate: string) {
	const date = new Date(isoDate);

	let formattedDate = date
		.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "long",
			year: "numeric",
		})
		.replaceAll(" ", "-");

	if (formattedDate.startsWith("0")) {
		formattedDate = formattedDate.substring(1);
	}

	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const formattedTime = `${hours}:${minutes}`;

	return `${formattedDate} ${formattedTime}`;
}

export function trimStringToLength(input: string, maxLength: number): string {
	if (input.length <= maxLength) {
		return input; // Return the original string if it's already within or equal to the maxLength
	} else {
		return input.substring(0, maxLength); // Trim the string to the desired length
	}
}

export type ARIARole =
	| "alert"
	| "alertdialog"
	| "application"
	| "article"
	| "banner"
	| "button"
	| "cell"
	| "checkbox"
	| "columnheader"
	| "combobox"
	| "complementary"
	| "contentinfo"
	| "definition"
	| "dialog"
	| "directory"
	| "document"
	| "feed"
	| "figure"
	| "form"
	| "grid"
	| "gridcell"
	| "group"
	| "heading"
	| "img"
	| "link"
	| "list"
	| "listbox"
	| "listitem"
	| "log"
	| "main"
	| "marquee"
	| "math"
	| "menu"
	| "menubar"
	| "menuitem"
	| "menuitemcheckbox"
	| "menuitemradio"
	| "navigation"
	| "none"
	| "note"
	| "option"
	| "presentation"
	| "progressbar"
	| "radio"
	| "radiogroup"
	| "region"
	| "row"
	| "rowgroup"
	| "rowheader"
	| "scrollbar"
	| "search"
	| "searchbox"
	| "separator"
	| "slider"
	| "spinbutton"
	| "status"
	| "switch"
	| "tab"
	| "table"
	| "tablist"
	| "tabpanel"
	| "term"
	| "textbox"
	| "timer"
	| "toolbar"
	| "tooltip"
	| "tree"
	| "treegrid"
	| "treeitem";
