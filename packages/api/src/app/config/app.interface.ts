/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 */

import Joi from 'joi';

export interface AppConfigInterface {
	id?: string;
	name: string;
	code: string;
	port: number;
	prefix: string;
	cors?: string;
	production: boolean;
}

export interface AppEnvSchemaInterface {
	APP_NAME: Joi.StringSchema<string>;
	APP_CODE: Joi.StringSchema<string>;
	APP_PORT: Joi.StringSchema<string>;
	APP_PREFIX: Joi.StringSchema<string>;
	APP_CORS: Joi.StringSchema<string>;
	APP_SWAGGER_ENABLED: Joi.StringSchema<string>;
	APP_SWAGGER_PATH: Joi.StringSchema<string>;
	APP_THROTTLER_ENABLED: Joi.StringSchema<string>;
	APP_THROTTLER_LIMITS: Joi.StringSchema<string>;
}
