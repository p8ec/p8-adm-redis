/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 */

import Joi from 'joi';
import { RedisEnvSchemaInterface } from './redis.interfaces';
import { redisDefaults } from './redis.defaults';

/**
 * Environment variables schema
 */
export const redisSchema: RedisEnvSchemaInterface = {
	REDIS_ENABLED: Joi.boolean().default(String(redisDefaults.enabled)),
	REDIS_URL: Joi.string().default(redisDefaults.url),
	REDIS_PASSWORD: Joi.string().default(redisDefaults.password),
};

/**
 * Environment variables validation schema
 */
export const validationSchema = Joi.object(redisSchema);
