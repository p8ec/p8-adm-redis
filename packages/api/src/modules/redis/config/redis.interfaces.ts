/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 */

import Joi from 'joi';

export interface RedisConfigInterface {
	enabled: boolean;
	url: string;
	password?: string;
}

export interface RedisEnvSchemaInterface {
	REDIS_ENABLED: Joi.BooleanSchema;
	REDIS_URL: Joi.StringSchema<string>;
	REDIS_PASSWORD: Joi.StringSchema<string>;
}
