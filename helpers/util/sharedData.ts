interface SharedData {
	[key: string]: string;
}

const sharedData: SharedData = {};

const setSharedData = (key: string, value: string): void => {
	sharedData[key] = value;
};

const getSharedData = (key: string): string => {
	return sharedData[key];
};

export { setSharedData, getSharedData };