/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import * as Joi from 'joi';
import { databaseDefaults } from './database.defaults';
import { DatabaseEnvSchemaInterface } from '@database/config/database.interface';

export const databaseSchema: DatabaseEnvSchemaInterface = {
	DB_HOST: Joi.string().default(databaseDefaults.DB_HOST),
	DB_PORT: Joi.string().default(databaseDefaults.DB_PORT),
	DB_SCHEMA: Joi.string().default(databaseDefaults.DB_SCHEMA),
	DB_NAME: Joi.string().required(),
	DB_USERNAME: Joi.string().required(),
	DB_PASSWORD: Joi.string().required(),
	DB_LOGGING: Joi.boolean().default(databaseDefaults.DB_LOGGING),
	DB_MODE: Joi.string().allow('').optional(),
	DB_TIMEOUT: Joi.number().default(databaseDefaults.DB_TIMEOUT),
	DB_ENTITIES_PATH: Joi.string().optional(),
};

export const validationSchema = Joi.object(databaseSchema);
