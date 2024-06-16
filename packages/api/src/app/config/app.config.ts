/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 */

import { appDefaults } from './app.defaults';
import { AppEnvSchemaInterface, AppConfigInterface } from '@app/config/app.interface';
import { AsStringType } from '@p8ec/nestjs';

export const appConfig = (): AppConfigInterface => {
	const env = process.env as AsStringType<AppEnvSchemaInterface>;

	return {
		name: env.APP_NAME || appDefaults.APP_NAME,
		code: env.APP_CODE || appDefaults.APP_CODE,
		port: Number(env.APP_PORT) || appDefaults.APP_PORT,
		prefix: env.APP_PREFIX || appDefaults.APP_PREFIX,
		cors: env.APP_CORS,
		production: process.env.NODE_ENV === 'production',
	};
};
