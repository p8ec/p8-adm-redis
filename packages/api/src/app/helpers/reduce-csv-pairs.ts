/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 */

/**
 * Converts a CSV string into an object.
 * @param csv String to convert, e.g. 'key1=value1,key2=value2'
 * @param defaultValue Default value to return if csv is undefined or empty
 * @returns Object representation of the CSV string, e.g. {key1: 'value1', key2: 'value2'}
 */
export const reduceCSVPairs = <T extends object>(csv: string | undefined, defaultValue: T): T => {
	return (csv ?? '').split(',').reduce((acc, curr) => {
		const [key, value] = curr.split('=');
		return { ...acc, [key.toLowerCase()]: isNaN(Number(value)) ? value : Number(value) };
	}, defaultValue ?? {});
};
