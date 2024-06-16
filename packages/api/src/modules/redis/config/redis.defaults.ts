/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 */

import { RedisConfigInterface } from './redis.interfaces';

export const redisDefaults: Required<RedisConfigInterface> = {
	enabled: false,
	url: 'redis://localhost:6379',
	password: '',
};
