/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

export enum PostgresErrorCodes {
	UniqueViolation = '23505',
	NotNullViolation = '23502',
	ForeignKeyViolation = '23503',
	InvalidTextRepresentation = '22P02',
	InvalidPassword = '28P01',
}
