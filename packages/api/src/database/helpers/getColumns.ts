/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import { ObjectLiteral, Repository } from 'typeorm';

/**
 * Return all columns for a repository.
 * @param repository The repository to get columns for.
 * @param columnNameFilterRegEx If true, filter out columns that start with `_`.
 */
export const getColumns = <T extends ObjectLiteral>(
	repository: Repository<T>,
	columnNameFilterRegEx?: RegExp,
): (keyof T)[] => {
	return repository.metadata.columns
		.filter((f) => (columnNameFilterRegEx ? !columnNameFilterRegEx.test(f.givenDatabaseName ?? f.propertyName) : true))
		.map((col) => col.propertyName) as (keyof T)[];
};
