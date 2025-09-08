import { faker } from "@faker-js/faker";

export interface UserData {
	email: string;
	firstName: string;
	lastName: string;
	state: string;
	password: string;
	confirmPassword: string;
}

export function generateRandomUserData(): UserData {
	const password = faker.internet.password() + "!";
	return {
		email: faker.internet.email().toLowerCase(),
		firstName: `${faker.person.firstName()} ${faker.number.int()}`,
		lastName: faker.person.lastName(),
		state: "Operational",
		password: password,
		confirmPassword: password,
	};
}

export interface EmployeeData {
	email: string;
	firstName: string;
	lastName: string;
	title: string;
}

export interface AccountData {
	email: string;
	firstName: string;
	lastName: string;
}

export interface PositionData {
	position: string;
}

export interface RolesData {
	name: string;
	description: string;
}

export interface ResponsibilityData {
	name: string;
	description: string;
}

export interface FeatureCategory {
	categoryName: string;
}

export interface RemovableBannerData {
	text: string;
	subText: string;
	learnMore: string;
}

export function generateRandomBannerData(): RemovableBannerData {
	return {
		text: faker.word.words(),
		subText: faker.word.words(),
		learnMore: faker.internet.url(),
	};
}

export function generateRandomEmployeeData(): EmployeeData {
	return {
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		title: faker.person.jobTitle(),
		email: faker.internet.email(),
	};
}

export function getRandomPosition(): PositionData {
	return {
		position: faker.person.firstName() + " " + faker.number.int(),
	};
}

export function getRandomRole(): RolesData {
	return {
		name: faker.person.firstName() + " " + faker.number.int(),
		description: faker.person.jobDescriptor(),
	};
}

export function getRandomResponsibility(): ResponsibilityData {
	return {
		name: faker.person.firstName() + " $%^& " + faker.number.int(),
		description: faker.person.jobDescriptor(),
	};
}

export function getRandomAccount(): AccountData {
	return {
		email: faker.internet.email(),
		firstName: faker.person.firstName() + " & " + faker.number.int(),
		lastName: faker.person.lastName(),
	};
}

export function getRandomNumber(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomPhrase() {
	return faker.lorem.sentence();
}

export function generateRandomCategory(): FeatureCategory {
	return {
		categoryName: `feature_category_${faker.person.firstName() + " " + faker.number.int()}`,
	};
}
