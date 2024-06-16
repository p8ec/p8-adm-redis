/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

export type AsString<T> = {
	[K in keyof T]: string;
};
