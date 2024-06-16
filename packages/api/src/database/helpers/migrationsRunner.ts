/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';
import { databaseConfig } from '@database/config';

/**
 * Database migrations runner.
 */
(async () => {
	const config = databaseConfig();
	const connection = await new DataSource(config.datasource).initialize();

	try {
		const successMigrations = await connection.runMigrations({
			transaction: 'all',
		});

		console.log('Loading migrations from: ', config.datasource.migrations);

		/* tslint:disable-next-line:no-console */
		console.log(
			Boolean(successMigrations?.length)
				? `Success. Migrations list: \n${successMigrations?.map((m) => m.name).join('\n')}`
				: 'Success. No new migrations.',
		);
	} finally {
		await connection.destroy();
	}
})();
