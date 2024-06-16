/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import Joi from 'joi';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export interface DatabaseConfigInterface {
	typeorm: TypeOrmModuleOptions;
	datasource: PostgresConnectionOptions;
}

export interface DatabaseEnvSchemaInterface {
	DB_HOST: Joi.StringSchema<string>;
	DB_PORT: Joi.StringSchema<string>;
	DB_SCHEMA: Joi.StringSchema<string>;
	DB_NAME: Joi.StringSchema<string>;
	DB_USERNAME: Joi.StringSchema<string>;
	DB_PASSWORD: Joi.StringSchema<string>;
	DB_LOGGING: Joi.BooleanSchema;
	DB_MODE: Joi.StringSchema<string>;
	DB_TIMEOUT: Joi.NumberSchema;
	DB_ENTITIES_PATH: Joi.StringSchema<string>;
}
