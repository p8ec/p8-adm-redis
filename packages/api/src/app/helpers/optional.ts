/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 */

export const Optional = (condition: boolean, satisfied: any, unsatisfied?: any): any => {
	return condition ? satisfied : unsatisfied;
};
