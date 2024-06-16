/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 */

import { AppEnvSchemaInterface } from '@app/config/app.interface';
import { ThrottlerOptions } from '@nestjs/throttler';
import { appDefaults } from '@app/config/app.defaults';
import { OptionalModuleConfigInterface } from '@app/interfaces/optional-module-config.interface';
import { AsStringType } from '@p8ec/nestjs';

export interface ThrottlerConfigOptionsInterface extends OptionalModuleConfigInterface {
	limits: Array<ThrottlerOptions>;
}

interface ThrottlerConfigInterface {
	throttler: ThrottlerConfigOptionsInterface;
}

const parseThrottlerLimits = (limits: string): Array<ThrottlerOptions> => {
	return limits.split(',').map((limitAtom) => {
		const [name, limit, ttl] = limitAtom.split(':');

		return {
			name,
			limit: Number(limit),
			ttl: Number(ttl) * 1000,
		};
	});
};

export const appThrottler = (): ThrottlerConfigInterface => {
	const env = process.env as AsStringType<AppEnvSchemaInterface>;

	const enabled = (env.APP_THROTTLER_ENABLED ?? appDefaults.APP_THROTTLER_ENABLED) === 'true';

	return {
		throttler: {
			enabled,
			limits: enabled ? parseThrottlerLimits(env.APP_THROTTLER_LIMITS || appDefaults.APP_THROTTLER_LIMITS) : [],
		},
	};
};
