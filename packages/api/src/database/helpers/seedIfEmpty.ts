/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import { DeepPartial, ObjectLiteral, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

export const seedIfEmpty = async <R extends ObjectLiteral>(
	repo: Repository<R>,
	seed: Array<DeepPartial<R>>,
	logger?: Partial<Logger>,
): Promise<void> => {
	const count = await repo.count();
	const log = (message: string) => logger?.verbose && logger?.verbose(message);
	if (count == 0) {
		log(`Seeding ${seed.length} records`);
		return repo.save(seed.map((record) => repo.create(record))).then(() => log(`Seed completed`));
	} else {
		log(`Skipping seed, table "${repo.metadata.tableName}" is not empty`);
	}
};
