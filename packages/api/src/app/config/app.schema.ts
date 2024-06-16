/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 */

import * as Joi from 'joi';
import { appDefaults } from './app.defaults';
import { AppEnvSchemaInterface } from '@app/config/app.interface';

/* Environment variables validation schema */
export const appConfigSchema: AppEnvSchemaInterface = {
	/* app */
	APP_NAME: Joi.string().allow('').default(appDefaults.APP_NAME),
	APP_PREFIX: Joi.string().allow('').default(appDefaults.APP_PREFIX),
	APP_CODE: Joi.string().allow('').default(appDefaults.APP_CODE),
	APP_PORT: Joi.string().allow('').default(appDefaults.APP_PORT),
	APP_CORS: Joi.string().allow('').default(appDefaults.APP_CORS),

	/* swagger */
	APP_SWAGGER_ENABLED: Joi.string().allow('').default(appDefaults.APP_SWAGGER_ENABLED),
	APP_SWAGGER_PATH: Joi.string().allow('').default(appDefaults.APP_SWAGGER_PATH),

	/* throttler */
	APP_THROTTLER_ENABLED: Joi.string().allow('').default(appDefaults.APP_THROTTLER_ENABLED),
	APP_THROTTLER_LIMITS: Joi.string().allow('').default(appDefaults.APP_THROTTLER_LIMITS),
};

export const validationSchema = Joi.object(appConfigSchema);
