import { MailtrapClient } from "mailtrap";

// Function to initialize Mailtrap client
async function initializeMailtrap(): Promise<MailtrapClient> {
	const TOKEN = process.env.MAILTRAP_TOKEN;
	const TEST_INBOX_ID = process.env.MAILTRAP_INBOX ? parseInt(process.env.MAILTRAP_INBOX) : undefined;
	const ACCOUNT_ID = process.env.MAILTRAP_ACCOUNT_ID ? parseInt(process.env.MAILTRAP_ACCOUNT_ID) : undefined;
	return new MailtrapClient({ token: TOKEN, testInboxId: TEST_INBOX_ID, accountId: ACCOUNT_ID });
}

// Function to initialize Mailtrap inboxes client
async function getInboxes() {
	const client = await initializeMailtrap();
	return client.testing.inboxes;
}

// Function to get the list of inboxes
async function getInboxesList() {
	const inboxes = await getInboxes();
	return inboxes.getList();
}

async function getFirstInboxId(): Promise<number> {
	const inboxes = await getInboxesList();
	if (inboxes.length > 0) {
		return inboxes[0].id;
	}
	return undefined; // Return undefined if there are no inboxes
}

export async function cleanInbox() {
	const client = await initializeMailtrap();
	const firstInboxId = await getFirstInboxId();
	return client.testing.inboxes.cleanInbox(firstInboxId);
}

async function getMessages() {
	const client = await initializeMailtrap();
	return client.testing.messages;
}

async function getFirstInboxMessages() {
	const firstInboxId = await getFirstInboxId();
	const messages = await getMessages();
	return await messages.get(firstInboxId);
}

async function getMessageId(email: string) {
	const messages = await getFirstInboxMessages();
	const message = messages.find((message) => message.to_email === email);
	if (message) {
		return message.id;
	} else {
		throw new Error(`Message with email "${email}" not found.`);
	}
}

export async function getEmailMessageSubject(email: string) {
	const message = await getMessageId(email);
	const client = await initializeMailtrap();
	const firstInboxId = await getFirstInboxId();
	const messageHeader = await client.testing.messages.getMailHeaders(firstInboxId, message);
	return messageHeader.headers.subject;
}

export async function findMessageByEmail(email: string) {
	const messages = await getFirstInboxMessages();
	const message = messages.find((message) => message.to_email === email);
	if (message) {
		return message;
	} else {
		throw new Error(`Message with email "${email}" not found.`);
	}
}

async function getEmailBody(email: string): Promise<string> {
	const message = await findMessageByEmail(email);
	const client = await initializeMailtrap();
	const firstInboxId = await getFirstInboxId();
	return await client.testing.messages.getTextMessage(firstInboxId, message.id);
}

export async function getTokenFromEmail(email: string): Promise<string> {
	const emailBody = await getEmailBody(email);
	const tokenMatch = emailBody.match(/token=([a-zA-Z0-9-]+)/);
	if (tokenMatch) {
		return tokenMatch[1];
	} else {
		throw new Error(`Token not found in the email sent to "${email}".`);
	}
}

export async function getLatestResetLinkFromEmail(email: string): Promise<string> {
	const emailBody = await getEmailBody(email);

	const urlMatch = emailBody.match(/(https?:\/\/(?!exIQtive\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/\S*)?)/);

	if (urlMatch) {
		return urlMatch[0];
	} else {
		throw new Error(`Reset link not found in the email sent to "${email}".`);
	}
}

export async function getUserInviteLinkFromEmail(email: string): Promise<string> {
	const emailBody = await getEmailBody(email);

	// Adjusted regex to match URLs including "exiqtive.com"
	const urlMatch = emailBody.match(/(https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/\S*)?)/);

	if (urlMatch) {
		return urlMatch[0];
	} else {
		throw new Error(`Reset link not found in the email sent to "${email}".`);
	}
}

export async function getLatestResetPasswordLinkFromEmail(email: string): Promise<string> {
	const emailBody = await getEmailBody(email);

	// Regular expression specifically targeting the reset link pattern
	const urlMatch = emailBody.match(
		/https?:\/\/[\w.-]+\/(?:setup|reset)\/password\?token=[a-zA-Z0-9-]+/,
	);

	if (urlMatch) {
		return urlMatch[0];
	} else {
		throw new Error(`Reset link not found in the email sent to "${email}".`);
	}
}

export async function getResetLinkFromFirstEmail(email: string): Promise<string | null> {
	const client = await initializeMailtrap();
	const firstInboxId = await getFirstInboxId();

	const messages = await client.testing.messages.get(firstInboxId);

	const filteredMessages = messages.filter((message) => {
		return message.to_email === email;
	});

	if (filteredMessages.length < 2) {
		console.log(`Less than two messages found for "${email}".`);
		return null;
	}

	const secondEmailMessage = filteredMessages[filteredMessages.length - 1];

	const emailBody = await client.testing.messages.getTextMessage(firstInboxId, secondEmailMessage.id);

	const urlMatch = emailBody.match(/(?:https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/\S*)?/);

	if (urlMatch) {
		const resetLink = urlMatch[0];
		console.log("Extracted Reset Link from the Second Email:", resetLink);
		return resetLink;
	} else {
		console.log(`No reset link found in the second email sent to "${email}".`);
		return null;
	}
}
