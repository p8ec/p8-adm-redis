/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import { authDefaults } from './auth.defaults';
import { AuthEnvSchemaInterface, AuthConfigInterface } from './auth.interfaces';
import { AsString } from '@common/types/as-string.type';

/**
 * @function authConfig
 * @description Returns the configuration for the module.
 */
export const authConfig = (): AuthConfigInterface => {
	const env = process.env as AsString<AuthEnvSchemaInterface>;

	return {
		enabled: (env.AUTH_ENABLED ?? authDefaults.enabled) === 'true',
		jwtSecret: env.AUTH_JWT_SECRET,
	};
};
