/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 */

import { redisDefaults } from './redis.defaults';
import { RedisEnvSchemaInterface, RedisConfigInterface } from './redis.interfaces';
import { AsStringType } from '@p8ec/nestjs';

/**
 * @function redisConfig
 * @description Returns the configuration for the module.
 */
export const redisConfig = (): Required<RedisConfigInterface> => {
	const env = process.env as AsStringType<RedisEnvSchemaInterface>;

	return {
		enabled: (env.REDIS_ENABLED ?? String(redisDefaults.enabled)) === 'true',
		url: env.REDIS_URL ?? redisDefaults.url,
		password: env.REDIS_PASSWORD ?? redisDefaults.password,
	};
};
