/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

/* Add column specified as select:false as timestamp to queryBuilder */
export const addColumnAsTimestamp = <T extends ObjectLiteral>(
	qb: SelectQueryBuilder<T>,
	name: string,
): SelectQueryBuilder<T> =>
	qb.addSelect(
		`TRUNC(extract (epoch from ${qb.expressionMap.mainAlias?.name}.${name}) * 1000)`,
		`${qb.expressionMap.mainAlias?.name}_${name}`,
	);
