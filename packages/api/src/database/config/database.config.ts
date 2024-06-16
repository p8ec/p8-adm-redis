/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import { join } from 'path';
import { AsString } from '@common/types/as-string.type';
import { DatabaseEnvSchemaInterface, DatabaseConfigInterface } from '@database/config/database.interface';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { databaseDefaults } from '@database/config/database.defaults';

const csvContains = (s: string | undefined, t: string): boolean => String(s).split(',').includes(t);

export const databaseConfig = (): DatabaseConfigInterface => {
	const env = process.env as AsString<DatabaseEnvSchemaInterface>;
	const appRoot = join(__dirname, '..', '..');

	const typeorm: TypeOrmModuleOptions = {
		dropSchema: csvContains(env.DB_MODE, 'drop'),
		logging: (env.DB_LOGGING ?? databaseDefaults.DB_LOGGING) === 'true',
		maxQueryExecutionTime: Number(env.DB_TIMEOUT) ?? databaseDefaults.DB_TIMEOUT,
		ssl: csvContains(env.DB_MODE, 'ssl'),
		synchronize: csvContains(env.DB_MODE, 'sync'),
		entities: [join(appRoot, '**', '*.entity.{ts,js}')],
		autoLoadEntities: true,
		type: 'postgres',
		host: env.DB_HOST ?? databaseDefaults.DB_HOST,
		port: Number(env.DB_PORT) ?? databaseDefaults.DB_PORT,
		schema: env.DB_SCHEMA ?? databaseDefaults.DB_SCHEMA,
		database: env.DB_NAME,
		username: env.DB_USERNAME,
		password: env.DB_PASSWORD,
	};

	return {
		typeorm,
		datasource: {
			type: 'postgres',
			host: typeorm.host,
			port: typeorm.port,
			schema: typeorm.schema,
			database: typeorm.database,
			username: typeorm.username,
			password: typeorm.password,
			entities: typeorm.entities,
			migrations: [join(appRoot, 'database', 'migrations', '*.{ts,js}')],
		},
	};
};
